import { makeRng, clamp, lerp, smoothstep, easeInOutCubic } from '../lib/random.js'
import { RIDE_DISTANCE } from '../lib/journey.js'

/**
 * A small perspective camera.
 *
 * Rather than faking depth with horizontal parallax bands, every roadside
 * object lives on a real ground plane with a lateral offset `L` and a distance
 * `z` ahead of the rider. Projecting those two numbers gives position *and*
 * scale, so scenery genuinely sweeps out from the vanishing point, grows as it
 * passes, and slips under the handlebars. All distances are in world units and
 * props are drawn at world scale, so one scale factor is all a transform needs.
 */

export const FOCAL = 900
export const CAM_H = 320
export const HORIZON = 604
export const Z_NEAR = 300
export const Z_FAR = 6000
export const SPAN = Z_FAR - Z_NEAR
export const ROAD_HALF = 460
export const BANK = 210

/** The lake ends at the far bank; beyond it sits land, temple and shore trees. */
export const LAKE_Z_FAR = 3400

const ROAD_WAVE = 220
const ROAD_PERIOD = 2200

export const SCENE_SEED = 'the-long-way-round'

/** Ground point -> screen point. `k` is the perspective scale factor. */
export function project(lateral, z) {
  const k = FOCAL / Math.max(z, 1)
  return { x: lateral * k, y: HORIZON + CAM_H * k, k }
}

/** How much of the road's wander is left, given how far the ride has come. */
function wander(travelled) {
  return 1 - smoothstep(clamp(travelled / RIDE_DISTANCE, 0, 1))
}

/**
 * Gentle curve so the road winds instead of running dead straight — then
 * straightens out completely as the rider arrives at the signpost, so the
 * journey lands square on its destination instead of off to one side.
 */
export function roadCentre(z, travelled) {
  return ROAD_WAVE * Math.sin((z + travelled) / ROAD_PERIOD) * wander(travelled)
}

/** Closed polygon for the road surface, rebuilt as the rider advances. */
export function roadPath(travelled, samples = 24) {
  const zNear = 470
  const right = []
  const left = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const z = Z_FAR * Math.pow(zNear / Z_FAR, t)
    const centre = roadCentre(z, travelled)
    right.push(project(centre + ROAD_HALF, z))
    left.push(project(centre - ROAD_HALF, z))
  }
  return closedPolygon(right, left)
}

/** Closed polygon for the lake on the rider's left, hugging the road. */
export function lakePath(travelled, samples = 20) {
  const zNear = 720
  const zFar = LAKE_Z_FAR
  const inner = []
  const outer = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const z = zFar * Math.pow(zNear / zFar, t)
    const centre = roadCentre(z, travelled)
    inner.push(project(centre - ROAD_HALF - BANK, z))
    outer.push(project(centre - ROAD_HALF - BANK - 7000, z))
  }
  return closedPolygon(inner, outer)
}

/** Thin ribbon along the left edge of the road where the bank greens over. */
export function bankStripePath(travelled, side = -1, width = 230, samples = 20) {
  const zNear = 500
  const zFar = 5200
  const a = []
  const b = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const z = zFar * Math.pow(zNear / zFar, t)
    const centre = roadCentre(z, travelled)
    const edge = centre + side * ROAD_HALF
    a.push(project(edge, z))
    b.push(project(edge + side * width, z))
  }
  return closedPolygon(a, b)
}

function closedPolygon(near, far) {
  const commands = []
  near.forEach((p, i) => commands.push(`${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`))
  for (let i = far.length - 1; i >= 0; i--) {
    commands.push(`L${far[i].x.toFixed(1)} ${far[i].y.toFixed(1)}`)
  }
  commands.push('Z')
  return commands.join(' ')
}

/** Broad silhouette line standing in for a distant hill ridge. */
export function ridgePath(y, amplitude, phase, samples = 16, xSpan = 4200) {
  const points = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const x = -xSpan + t * xSpan * 2
    const yy = y - amplitude * (0.5 + 0.5 * Math.sin(t * Math.PI * 2 + phase)) - amplitude * 0.3 * Math.sin(t * Math.PI * 5 + phase * 2)
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${yy.toFixed(1)}`)
  }
  points.push(`L${xSpan} ${HORIZON + 60} L${-xSpan} ${HORIZON + 60} Z`)
  return points.join(' ')
}

/* -------------------------------------------------------------------- the ride */

/**
 * Distance travelled reduces every prop's `z`, wrapping inside the prop's own
 * band. Because the cast is laid out at even spacing across exactly that band,
 * the wrapped order is a pure rotation of the sorted order — so drawing the
 * pool in its original document order is *always* correct painter's order, and
 * no per-frame re-sorting is ever needed.
 */
export function propZ(prop, travelled) {
  const [lo, hi] = prop.band
  const span = hi - lo
  const raw = prop.z0 - travelled - lo
  const cycle = Math.floor(raw / span)
  return lo + (raw - cycle * span)
}

/** Props fade in and out at the edges of their band so wraps are never seen. */
export function propOpacity(z, band) {
  const [lo, hi] = band
  const span = hi - lo
  const fadeIn = span * 0.07
  const fadeOut = span * 0.12
  const rise = smoothstep((z - lo) / fadeIn)
  const fall = 1 - smoothstep((z - (hi - fadeOut)) / fadeOut)
  return rise * fall
}

/* --------------------------------------------------------------------- pools */

function buildPool(rng, config) {
  const {
    key,
    count,
    band = [Z_NEAR, Z_FAR],
    lateral,
    variants,
    scaleMin = 0.85,
    scaleMax = 1.25,
    group = 'mid',
    jitter = 60
  } = config

  const [lo, hi] = band
  const span = hi - lo
  const spacing = span / count

  return Array.from({ length: count }, (_, index) => {
    const lane = lateral[index % lateral.length]
    const L = Array.isArray(lane) ? rng.range(lane[0], lane[1]) : lane + rng.signed(jitter)
    return {
      id: `${key}-${index}`,
      key,
      group,
      band,
      L,
      z0: lo + (index + rng.range(0.2, 0.8)) * spacing,
      variant: variants[index % variants.length],
      tone: rng.int(0, 3),
      flip: rng.chance(0.5) ? -1 : 1,
      s: rng.range(scaleMin, scaleMax)
    }
  })
}

/**
 * One deterministic cast of roadside scenery. Seeded, so the world is
 * identical on every device and every reload.
 */
export function buildSceneProps() {
  const rng = makeRng(SCENE_SEED)

  const rightTrees = buildPool(rng, {
    key: 'right',
    count: 30,
    band: [Z_NEAR, Z_FAR],
    lateral: [430, 545, 670, 830, 1060, 1400, 1900],
    variants: ['round', 'tall', 'bush', 'palm', 'round', 'tall', 'bush'],
    group: 'mid'
  })

  const bankTrees = buildPool(rng, {
    key: 'bank',
    count: 16,
    band: [340, 4600],
    lateral: [-520, -575, -625, -470],
    variants: ['bush', 'round', 'reed', 'bush'],
    scaleMin: 0.62,
    scaleMax: 0.98,
    group: 'mid'
  })

  const farShore = buildPool(rng, {
    key: 'shore',
    count: 24,
    band: [LAKE_Z_FAR, 6600],
    lateral: [[-6400, -1300]],
    variants: ['tall', 'round', 'bush', 'tall'],
    scaleMin: 0.9,
    scaleMax: 1.5,
    group: 'far'
  })

  const ripples = buildPool(rng, {
    key: 'ripple',
    count: 28,
    band: [760, LAKE_Z_FAR],
    lateral: [[-6800, -780]],
    variants: ['ripple'],
    scaleMin: 0.55,
    scaleMax: 1.6,
    group: 'far'
  })

  const centreMarks = buildPool(rng, {
    key: 'mark',
    count: 26,
    band: [520, 5600],
    lateral: [0],
    variants: ['dash'],
    scaleMin: 0.8,
    scaleMax: 1.2,
    group: 'road'
  })

  const tufts = buildPool(rng, {
    key: 'tuft',
    count: 22,
    band: [470, 2200],
    lateral: [560, -540, 500, 660, 720, 520],
    variants: ['tuft', 'tuft', 'flower', 'tuft'],
    scaleMin: 0.7,
    scaleMax: 1.15,
    group: 'near',
    jitter: 46
  })

  const stones = buildPool(rng, {
    key: 'stone',
    count: 18,
    band: [460, 1900],
    lateral: [478, -478, 462, -462],
    variants: ['stone'],
    scaleMin: 0.7,
    scaleMax: 1.35,
    group: 'road',
    jitter: 18
  })

  return { rightTrees, bankTrees, farShore, ripples, centreMarks, tufts, stones }
}

/* ----------------------------------------------------------------- the signpost */

export const SIGNPOST = {
  /** Where the post stands when the rider has stopped: dead ahead, on the road. */
  zNear: 1360,
  /** Where it first appears, far down the lakeside path. */
  zFar: 5400,
  /** World height of the finished post, finial included. */
  height: 1060,
  /** How far a board reaches out from the pole, tip included. */
  reach: 752
}

/** Half the width of the visible frame, in world units, for a given aspect. */
export function visibleHalf(aspect) {
  return clamp(1200 * aspect, 1180, 2800) / 2
}

/**
 * The perspective scale the signpost settles at. It is chosen so the post
 * always fills a comfortable share of the frame — bounded by height on a wide
 * window and by width on a narrow one, so the boards never run off the edge of
 * a phone screen — and it is what keeps the arrows tappable at every size.
 */
export function signpostScale(half) {
  const byHeight = (1200 * 0.62) / SIGNPOST.height
  const byWidth = (half * 0.86) / SIGNPOST.reach
  return Math.min(byHeight, byWidth)
}

/** The signpost drifts closer with the ride and is on station before the end. */
export function signpostZ(travelled, zNear = SIGNPOST.zNear) {
  const t = clamp(travelled / RIDE_DISTANCE, 0, 1)
  const approach = easeInOutCubic(clamp((t - 0.42) / 0.5, 0, 1))
  return lerp(SIGNPOST.zFar, zNear, approach)
}

export { clamp, lerp, smoothstep }
