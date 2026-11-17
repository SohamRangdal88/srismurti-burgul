import { useEffect, useMemo, useRef, useState } from 'react'

import { PALETTE } from '../data/palette.js'
import { travel, speed, RIDE_DISTANCE } from '../lib/journey.js'
import { clamp } from '../lib/random.js'
import {
  buildSceneProps,
  project,
  propZ,
  propOpacity,
  roadPath,
  roadCentre,
  lakePath,
  bankStripePath,
  ridgePath,
  signpostZ,
  visibleHalf,
  signpostScale,
  FOCAL,
  HORIZON,
  LAKE_Z_FAR
} from './projection.js'
import Flora from './flora.jsx'
import Handlebars from './Handlebars.jsx'
import { Temple, Ghat, Sky, Clouds } from './landmarks.jsx'
import Signpost from '../components/signpost/Signpost.jsx'

const CLOUDS = [
  { x: -1980, y: 196, s: 1.5, o: 0.85 },
  { x: -900, y: 322, s: 0.95, o: 0.72 },
  { x: 320, y: 168, s: 1.22, o: 0.8 },
  { x: 1420, y: 288, s: 1.04, o: 0.66 },
  { x: 2260, y: 214, s: 1.36, o: 0.78 }
]

const RIDGES = [
  { y: 600, amp: 186, phase: 0.5, fill: PALETTE.sand, opacity: 0.85 },
  { y: 606, amp: 122, phase: 2.3, fill: PALETTE.dustyBlue, opacity: 0.7 },
  { y: 610, amp: 68, phase: 4.1, fill: PALETTE.oliveDeep, opacity: 0.9 }
]

function useAspect(ref) {
  const [aspect, setAspect] = useState(16 / 9)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () => {
      const rect = node.getBoundingClientRect()
      if (rect.height > 0) setAspect(rect.width / rect.height)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])
  return aspect
}

export default function BicycleScene({
  progressRef,
  turnRef,
  reduceMotion = false,
  interactive = true,
  onChoose,
  onHover,
  onStage
}) {
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const cameraRef = useRef(null)
  const povRef = useRef(null)
  const veilRef = useRef(null)
  const lakeRef = useRef(null)
  const roadRef = useRef(null)
  const bankRef = useRef(null)
  const signRef = useRef(null)
  const stageRef = useRef('ride')

  const aspect = useAspect(wrapRef)

  const cast = useMemo(() => buildSceneProps(), [])
  const dense = useMemo(() => (typeof window === 'undefined' ? true : window.innerWidth > 760), [])

  const pools = useMemo(() => {
    const step = dense ? 1 : 2
    return {
      right: cast.rightTrees.filter((_, i) => i % step === 0),
      bank: cast.bankTrees.filter((_, i) => i % step === 0),
      shore: cast.farShore.filter((_, i) => i % step === 0),
      ripple: cast.ripples.filter((_, i) => i % step === 0),
      mark: cast.centreMarks.filter((_, i) => i % step === 0),
      tuft: cast.tufts.filter((_, i) => i % step === 0),
      stone: cast.stones.filter((_, i) => i % step === 0)
    }
  }, [cast, dense])

  const refs = useMemo(() => {
    const make = (n) => ({ current: new Array(n).fill(null) })
    return {
      right: make(pools.right.length),
      bank: make(pools.bank.length),
      shore: make(pools.shore.length),
      ripple: make(pools.ripple.length),
      mark: make(pools.mark.length),
      tuft: make(pools.tuft.length),
      stone: make(pools.stone.length)
    }
  }, [pools])

  const half = visibleHalf(aspect)
  const signScale = signpostScale(half)
  const signZNear = FOCAL / signScale
  const viewBox = `${(-clamp(1200 * aspect, 1180, 2800) / 2).toFixed(1)} 0 ${clamp(1200 * aspect, 1180, 2800).toFixed(1)} 1200`

  const ridges = useMemo(() => RIDGES.map((r) => ridgePath(r.y, r.amp, r.phase, 18, 4400)), [])

  useEffect(() => {
    let raf = 0
    let lastKey = ''
    const stageRefOut = stageRef

    const place = (node, prop, dist, centre) => {
      const z = propZ(prop, dist)
      const o = propOpacity(z, prop.band)
      if (o < 0.014) {
        if (node.style.display !== 'none') node.style.display = 'none'
        return
      }
      if (node.style.display === 'none') node.style.display = ''
      const p = project(prop.L + centre, z)
      const scale = p.k * prop.s
      node.setAttribute(
        'transform',
        `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${scale.toFixed(4)})`
      )
      node.setAttribute('opacity', o.toFixed(3))
      node.style.setProperty('--pw', clamp(3.5 * Math.pow(p.k, 0.42), 1.1, 7).toFixed(2))
    }

    const render = () => {
      raf = window.requestAnimationFrame(render)
      const svg = svgRef.current
      if (!svg) return

      const p = clamp(progressRef.current, 0, 1)
      const turn = turnRef.current || { yaw: 0, amount: 0, forward: 0 }
      const key = `${p.toFixed(5)}|${turn.yaw.toFixed(3)}|${turn.amount.toFixed(3)}|${turn.forward.toFixed(2)}|${aspect}|${interactive}`
      if (key === lastKey) return
      lastKey = key

      const t = travel(p)
      const dist = t * RIDE_DISTANCE + turn.forward
      const sp = clamp(speed(p), 0, 1.6)

      /* ---- camera: a slide plus a whisper of roll reads as a head turn ---- */
      const bobPhase = dist / 240
      const bob = reduceMotion ? 0 : Math.sin(bobPhase) * 4.4 * sp
      const roll = reduceMotion ? 0 : Math.sin(bobPhase * 0.5) * 0.34 * sp
      const dx = -turn.yaw * 10.5
      if (cameraRef.current) {
        cameraRef.current.setAttribute(
          'transform',
          `translate(${dx.toFixed(2)} ${bob.toFixed(2)}) rotate(${(roll - turn.yaw * 0.075).toFixed(3)} 0 ${HORIZON})`
        )
      }
      if (povRef.current) {
        povRef.current.setAttribute(
          'transform',
          `translate(${(turn.yaw * -5).toFixed(2)} ${(bob * 1.5).toFixed(2)}) rotate(${(-turn.yaw * 0.52).toFixed(3)} 0 1360)`
        )
      }

      /* ---- the road, the lake and the bank, rebuilt every frame ---- */
      const centreNear = roadCentre(1500, dist)
      if (roadRef.current) roadRef.current.setAttribute('d', roadPath(dist))
      if (lakeRef.current) lakeRef.current.setAttribute('d', lakePath(dist))
      if (bankRef.current) bankRef.current.setAttribute('d', bankStripePath(dist))

      /* ---- the cast ---- */
      place2(refs.right.current, pools.right, dist, centreNear, place)
      place2(refs.bank.current, pools.bank, dist, centreNear, place)
      place2(refs.shore.current, pools.shore, dist, centreNear, place)
      place2(refs.ripple.current, pools.ripple, dist, centreNear, place)
      place2(refs.mark.current, pools.mark, dist, centreNear, place)
      place2(refs.tuft.current, pools.tuft, dist, centreNear, place)
      place2(refs.stone.current, pools.stone, dist, centreNear, place)

      /* ---- the signpost, drifting closer with the ride ---- */
      const zSign = signpostZ(dist, signZNear)
      if (signRef.current) {
        const s = project(roadCentre(zSign, dist), zSign)
        signRef.current.setAttribute('transform', `translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) scale(${s.k.toFixed(4)})`)
        signRef.current.style.setProperty('--pw', clamp(3.5 * Math.pow(s.k, 0.42), 1.1, 7).toFixed(2))
        const live = interactive && s.k > signScale * 0.86 && turn.amount < 0.02
        const next = live ? 'true' : 'false'
        if (signRef.current.dataset.live !== next) signRef.current.dataset.live = next
      }

      /* ---- motion-blur veil during a turn ---- */
      if (veilRef.current) {
        veilRef.current.setAttribute('opacity', (turn.amount * 0.9).toFixed(3))
      }

      /* ---- report the stage so chrome can respond ---- */
      if (onStage) {
        const next = t > 0.955 ? 'signpost' : t > 0.5 ? 'arrive' : 'ride'
        if (stageRefOut.current !== next) {
          stageRefOut.current = next
          onStage(next)
        }
      }
    }

    function place2(nodes, list, dist, centre, fn) {
      for (let i = 0; i < list.length; i++) {
        const node = nodes[i]
        if (node) fn(node, list[i], dist, centre)
      }
    }

    raf = window.requestAnimationFrame(render)
    return () => window.cancelAnimationFrame(raf)
  }, [aspect, refs, pools, progressRef, turnRef, interactive, reduceMotion, onStage, signScale, signZNear])

  const veilColor = PALETTE.terracotta

  return (
    <div className="scene" ref={wrapRef}>
      <svg
        ref={svgRef}
        className="scene__svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        role="group"
        aria-label="An illustrated ride along a lakeside road"
        focusable="false"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5e3bd" />
            <stop offset="42%" stopColor="#eccfa4" />
            <stop offset="74%" stopColor="#dfb389" />
            <stop offset="100%" stopColor="#c9906a" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9d9a6b" />
            <stop offset="26%" stopColor="#7f8452" />
            <stop offset="100%" stopColor="#4b4a30" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7fa6a3" />
            <stop offset="48%" stopColor="#3f7d78" />
            <stop offset="100%" stopColor="#245b57" />
          </linearGradient>
          <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfa987" />
            <stop offset="55%" stopColor="#a58f6e" />
            <stop offset="100%" stopColor="#7d6a4e" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PALETTE.cream} stopOpacity="0.85" />
            <stop offset="55%" stopColor={PALETTE.gold} stopOpacity="0.32" />
            <stop offset="100%" stopColor={PALETTE.gold} stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        {/* sky, sun and cloud */}
        <g aria-hidden="true">
          <rect x="-4600" y="-900" width="9200" height={HORIZON + 900} fill="url(#sky)" />
          <Sky sunX={-560} sunY={268} sunR={92} />
          <Clouds clouds={CLOUDS} />
        </g>

        {/* camera-bound world — pure illustration */}
        <g ref={cameraRef} aria-hidden="true">
          {/* far ridges */}
          <g className="scene__ridges">
            {ridges.map((d, i) => (
              <path key={i} d={d} fill={RIDGES[i].fill} opacity={RIDGES[i].opacity} stroke={PALETTE.ink} strokeWidth="2" />
            ))}
          </g>

          {/* land below the horizon */}
          <rect x="-4600" y={HORIZON - 4} width="9200" height="1800" fill="url(#ground)" />

          {/* the lake */}
          <path ref={lakeRef} fill="url(#water)" stroke={PALETTE.ink} strokeWidth="2.4" />
          <g className="scene__pool">
            {pools.ripple.map((prop, i) => (
              <g key={prop.id} className="scene-prop" ref={(el) => (refs.ripple.current[i] = el)}>
                <Flora variant={prop.variant} tone={prop.tone} />
              </g>
            ))}
          </g>

          {/* far bank */}
          <rect x="-4600" y={HORIZON - 4} width="9200" height={700 * 320 / LAKE_Z_FAR + 6} fill="#8c8b58" stroke={PALETTE.ink} strokeWidth="2.4" />
          <rect x="-4600" y={HORIZON - 4} width="9200" height="7" fill={PALETTE.oliveDeep} opacity="0.55" />
          <Landmarks dist={0} />
          <g className="scene__pool">
            {pools.shore.map((prop, i) => (
              <g key={prop.id} className="scene-prop" ref={(el) => (refs.shore.current[i] = el)}>
                <Flora variant={prop.variant} tone={prop.tone} flip={prop.flip} />
              </g>
            ))}
          </g>

          {/* the roadside */}
          <path ref={bankRef} fill="#6c7444" stroke={PALETTE.ink} strokeWidth="2" opacity="0.94" />
          <path ref={roadRef} fill="url(#asphalt)" stroke={PALETTE.ink} strokeWidth="2.6" />

          <g className="scene__pool">
            {pools.mark.map((prop, i) => (
              <g key={prop.id} className="scene-prop" ref={(el) => (refs.mark.current[i] = el)}>
                <Flora variant={prop.variant} tone={prop.tone} />
              </g>
            ))}
          </g>
          <g className="scene__pool">
            {pools.stone.map((prop, i) => (
              <g key={prop.id} className="scene-prop" ref={(el) => (refs.stone.current[i] = el)}>
                <Flora variant={prop.variant} tone={prop.tone} flip={prop.flip} />
              </g>
            ))}
          </g>
          <g className="scene__pool">
            {pools.bank.map((prop, i) => (
              <g key={prop.id} className="scene-prop" ref={(el) => (refs.bank.current[i] = el)}>
                <Flora variant={prop.variant} tone={prop.tone} flip={prop.flip} />
              </g>
            ))}
          </g>
          <g className="scene__pool">
            {pools.right.map((prop, i) => (
              <g key={prop.id} className="scene-prop" ref={(el) => (refs.right.current[i] = el)}>
                <Flora variant={prop.variant} tone={prop.tone} flip={prop.flip} />
              </g>
            ))}
          </g>
          <g className="scene__pool">
            {pools.tuft.map((prop, i) => (
              <g key={prop.id} className="scene-prop" ref={(el) => (refs.tuft.current[i] = el)}>
                <Flora variant={prop.variant} tone={prop.tone} flip={prop.flip} />
              </g>
            ))}
          </g>

        </g>

        {/* the signpost — the one thing in the world that answers to touch.
            It sits outside the camera group so the post holds dead still while
            the rider's head sways at the end of the ride. */}
        <g ref={signRef} className="signpost-anchor" data-live="false">
          <Signpost onChoose={onChoose} onHover={onHover} live={interactive} />
        </g>

        {/* rider's own machine, fixed to the camera */}
        <g ref={povRef} className="scene__pov" aria-hidden="true">
          <Handlebars />
        </g>

        {/* motion-blur veil used for the turn into a world */}
        <g className="scene__veil" ref={veilRef} opacity="0" aria-hidden="true">
          <rect
            x={viewBox.split(' ')[0] - 1}
            y="-200"
            width={clamp(1200 * aspect, 1180, 2800) + 2}
            height="1700"
            fill={veilColor}
            filter="url(#softBlur)"
          />
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={i}
              x1={-clamp(1200 * aspect, 1180, 2800) / 2}
              x2={clamp(1200 * aspect, 1180, 2800) / 2}
              y1={-120 + i * 108}
              y2={-120 + i * 108}
              stroke={PALETTE.cream}
              strokeWidth={i % 3 === 0 ? 22 : 11}
              opacity="0.5"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

/** The far-bank landmarks. Kept in a child so the anchor maths stays readable. */
function Landmarks({ dist }) {
  const a = project(-1500 + roadCentre(3600, dist), 3600)
  const b = project(2400 + roadCentre(4300, dist), 4300)
  const g = project(-880 + roadCentre(3050, dist), 3050)
  return (
    <g className="scene__landmarks">
      <g transform={`translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) scale(${(a.k * 1.55).toFixed(4)})`}>
        <Temple scale={1} tone={0} />
      </g>
      <g transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) scale(${(b.k * 1.2).toFixed(4)})`}>
        <Temple scale={1} tone={1} />
      </g>
      <g transform={`translate(${g.x.toFixed(1)} ${g.y.toFixed(1)}) scale(${(g.k * 1.1).toFixed(4)})`}>
        <Ghat scale={1} />
      </g>
    </g>
  )
}
