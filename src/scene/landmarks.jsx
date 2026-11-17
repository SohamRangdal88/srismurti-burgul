import { PALETTE } from '../data/palette.js'

const INK = PALETTE.ink

/**
 * Landmarks on the far bank — a Nagara-style temple silhouette with its
 * stepped shikhara, a small ghat, and the sky furniture that sits behind
 * everything. Drawn at world scale, base at the origin.
 */

export function Temple({ scale = 1, tone = 0 }) {
  const stone = tone % 2 === 0 ? PALETTE.sand : PALETTE.creamDeep
  const shadow = PALETTE.brown
  const bands = []
  for (let i = 1; i < 9; i++) {
    const t = i / 9
    const y = -180 - t * 336
    const halfWidth = 74 - t * 30
    bands.push(<path key={i} d={`M${-halfWidth} ${y} L${halfWidth} ${y}`} stroke={INK} strokeWidth="4" opacity="0.28" fill="none" />)
  }
  return (
    <g transform={`scale(${scale})`}>
      {/* plinth */}
      <rect x="-172" y="-44" width="344" height="44" fill={shadow} stroke={INK} />
      <rect x="-140" y="-70" width="280" height="30" fill={stone} stroke={INK} />
      {/* mandapa */}
      <path d="M-106 -70 L-106 -196 L-72 -232 L72 -232 L106 -196 L106 -70 Z" fill={stone} stroke={INK} />
      <path d="M-72 -196 L-72 -232 L72 -232 L72 -196 Z" fill={shadow} opacity="0.5" />
      <path d="M-34 -70 L-34 -150 Q0 -178 34 -150 L34 -70 Z" fill={PALETTE.brownDeep} stroke={INK} />
      {/* shikhara */}
      <path
        d="M-74 -232 C-58 -320 -46 -420 -22 -500 L-14 -522 L14 -522 L22 -500 C46 -420 58 -320 74 -232 Z"
        fill={stone}
        stroke={INK}
      />
      <g>{bands}</g>
      {/* amalaka + kalasha */}
      <ellipse cx="0" cy="-528" rx="30" ry="13" fill={shadow} stroke={INK} />
      <path d="M-9 -538 L-9 -566 L9 -566 L9 -538 Z" fill={stone} stroke={INK} />
      <path d="M0 -566 L0 -596" stroke={INK} strokeWidth="6" fill="none" />
      <circle cx="0" cy="-602" r="7" fill={PALETTE.gold} stroke={INK} />
      {/* side shrines */}
      <path d="M-160 -70 L-160 -150 L-136 -176 L-112 -150 L-112 -70 Z" fill={stone} stroke={INK} opacity="0.95" />
      <path d="M112 -70 L112 -150 L136 -176 L160 -150 L160 -70 Z" fill={stone} stroke={INK} opacity="0.95" />
    </g>
  )
}

export function Ghat({ scale = 1 }) {
  const steps = []
  for (let i = 0; i < 7; i++) {
    steps.push(
      <rect
        key={i}
        x={-120 + i * 9}
        y={-16 - i * 15}
        width={240 - i * 18}
        height={16}
        fill={i % 2 === 0 ? PALETTE.sand : PALETTE.creamDeep}
        stroke={INK}
      />
    )
  }
  return <g transform={`scale(${scale})`}>{steps}</g>
}

/** Art Deco sun with a halo of stepped rings and a fan of rays. */
export function Sky({ defs, sunX = -420, sunY = 300, sunR = 88 }) {
  const rays = []
  for (let i = 0; i < 30; i++) {
    const a = (i / 30) * Math.PI * 2
    const r0 = sunR + 26
    const r1 = sunR + (i % 3 === 0 ? 168 : i % 2 === 0 ? 116 : 74)
    rays.push(
      <line
        key={i}
        x1={sunX + Math.cos(a) * r0}
        y1={sunY + Math.sin(a) * r0}
        x2={sunX + Math.cos(a) * r1}
        y2={sunY + Math.sin(a) * r1}
        stroke={PALETTE.gold}
        strokeWidth={i % 3 === 0 ? 4 : 2.4}
        opacity={i % 3 === 0 ? 0.5 : 0.32}
        strokeLinecap="round"
      />
    )
  }
  return (
    <g>
      <circle cx={sunX} cy={sunY} r={sunR * 2.5} fill={`url(#glow)`} />
      <g>{rays}</g>
      <circle cx={sunX} cy={sunY} r={sunR} fill={PALETTE.cream} stroke={INK} strokeWidth="5" />
      <circle cx={sunX} cy={sunY} r={sunR - 20} fill={PALETTE.gold} opacity="0.55" />
      <circle cx={sunX} cy={sunY} r={sunR - 44} fill={PALETTE.burnt} opacity="0.5" />
    </g>
  )
}

export function Clouds({ clouds }) {
  return (
    <g>
      {clouds.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) scale(${c.s})`} opacity={c.o}>
          <path
            d="M0 0 C0 -40 34 -66 70 -58 C84 -96 142 -100 160 -66 C202 -70 226 -36 216 -2 Z"
            fill={PALETTE.cream}
            stroke={INK}
            strokeWidth="5"
          />
          <path d="M28 -6 C28 -30 52 -46 76 -42" stroke={PALETTE.gold} strokeWidth="4" fill="none" opacity="0.6" />
        </g>
      ))}
    </g>
  )
}
