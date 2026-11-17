import { clamp } from './random.js'

/**
 * Journey maths.
 *
 * The rider must push off, cruise, then ease to a stop in front of the
 * signpost. Instead of faking that with a plain easing curve (which would
 * make the ride start already at full speed), we integrate a velocity
 * profile: a smooth accelerate ramp, a long cruise, and a long decelerate
 * ramp. The result is a normalised 0..1 "distance travelled" curve.
 */

const ACCEL = 0.1 // fraction of the ride spent picking up speed
const DECEL = 0.34 // fraction of the ride spent slowing to a halt
const SAMPLES = 320

function buildTravelTable() {
  const table = new Float64Array(SAMPLES + 1)
  const dt = 1 / SAMPLES
  const ramp = (x) => {
    const t = clamp(x, 0, 1)
    return t * t * (3 - 2 * t)
  }

  let total = 0
  let previous = 0
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    const velocity = ramp(t / ACCEL) * ramp((1 - t) / DECEL)
    if (i > 0) total += ((previous + velocity) / 2) * dt
    previous = velocity
    table[i] = total
  }
  for (let i = 0; i <= SAMPLES; i++) table[i] /= total

  return { table, cruiseVelocity: table[SAMPLES] - table[SAMPLES - 1] }
}

const { table: TRAVEL_TABLE } = buildTravelTable()

/** Scroll progress (0..1) -> normalised distance travelled (0..1). */
export function travel(progress) {
  const p = clamp(progress, 0, 1)
  const x = p * SAMPLES
  const i = Math.floor(x)
  if (i >= SAMPLES) return 1
  const frac = x - i
  return TRAVEL_TABLE[i] + (TRAVEL_TABLE[i + 1] - TRAVEL_TABLE[i]) * frac
}

/** Instantaneous speed (derivative of travel) — drives motion blur + sway. */
export function speed(progress) {
  const delta = 0.004
  const a = travel(clamp(progress - delta, 0, 1))
  const b = travel(clamp(progress + delta, 0, 1))
  return (b - a) / (2 * delta)
}

/** Where the signpost settles on the road, in ride progress. */
export const SIGNPOST_IN = 0.72
export const SIGNPOST_SETTLED = 0.985

/** Total world distance covered by the fastest-moving (road) layer. */
export const RIDE_DISTANCE = 9600

/** Parallax speed per depth band. Nearer layers race past the camera. */
export const DEPTH_SPEED = {
  sky: 0.008,
  sun: 0.016,
  farHills: 0.05,
  temple: 0.062,
  lake: 0.1,
  farTrees: 0.2,
  midTrees: 0.42,
  nearTrees: 0.95,
  road: 1.3,
  foreground: 1.85
}

/** Virtual scene space: 1200 units tall, horizon fixed, camera at x = 0. */
export const VIEW = {
  height: 1200,
  horizon: 604,
  ground: 1200,
  minWidth: 1180,
  maxWidth: 2800
}

export function viewBoxFor(aspect) {
  const width = clamp(VIEW.height * aspect, VIEW.minWidth, VIEW.maxWidth)
  return `${(-width / 2).toFixed(1)} 0 ${width.toFixed(1)} ${VIEW.height}`
}

/** Seamless wrap for tiled horizons: keeps a band of width `tile` repeating. */
export function wrapOffset(distance, tile) {
  const offset = distance % tile
  return offset < 0 ? offset + tile : offset
}

/** Responsive scaling factor for foreground props (mobile gets a wider frame). */
export function frameScale(aspect) {
  return clamp(1.1 - (aspect - 1) * 0.12, 0.78, 1.1)
}
