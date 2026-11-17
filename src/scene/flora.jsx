import { PALETTE } from '../data/palette.js'

/**
 * Roadside illustration set.
 *
 * Every shape is drawn at world scale with its base at the origin and growing
 * upward in negative y, so the scene can place it with a single
 * `translate(x y) scale(k)`. Outlines are inherited from the parent group (see
 * `.scene-prop` in journey.css), which keeps one consistent pen weight across
 * the whole world no matter how near or far a thing is.
 */

const INK = PALETTE.ink

const FOLIAGE = [PALETTE.olive, PALETTE.oliveDeep, PALETTE.forest, PALETTE.teal]
const FOLIAGE_HI = [PALETTE.gold, PALETTE.olive, PALETTE.sand, PALETTE.oliveDeep]
const TRUNK = [PALETTE.brown, PALETTE.brownDeep, PALETTE.brownDeep, PALETTE.brown]
const STONE_TONE = [PALETTE.dustyBlue, PALETTE.sand, PALETTE.dustyBlueDeep, PALETTE.olive]
const WATER_TONE = [PALETTE.cream, PALETTE.sand, PALETTE.dustyBlue, PALETTE.cream]

const at = (list, tone) => list[((tone % list.length) + list.length) % list.length]

/* ------------------------------------------------------------------- trees */

function RoundTree({ tone, flip }) {
  const leaf = at(FOLIAGE, tone)
  const hi = at(FOLIAGE_HI, tone)
  const wood = at(TRUNK, tone)
  return (
    <g transform={`scale(${flip} 1)`}>
      <path d="M-20 0 L-13 -168 L13 -168 L20 0 Z" fill={wood} stroke={INK} />
      <path d="M-13 -150 L-78 -208" fill="none" stroke={wood} strokeWidth="9" />
      <path d="M13 -158 L74 -222" fill="none" stroke={wood} strokeWidth="9" />
      <path
        d="M0 -700 C-124 -700 -196 -616 -182 -522 C-252 -470 -236 -372 -162 -338 C-176 -244 -92 -186 0 -186 C92 -186 176 -244 162 -338 C236 -372 252 -470 182 -522 C196 -616 124 -700 0 -700 Z"
        fill={leaf}
        stroke={INK}
      />
      <path d="M-104 -560 C-60 -610 20 -620 74 -586 C40 -520 -46 -508 -104 -560 Z" fill={hi} opacity="0.5" />
      <path d="M-70 -382 C-26 -424 46 -424 88 -386 C50 -330 -32 -332 -70 -382 Z" fill={hi} opacity="0.32" />
      <path d="M-14 -196 L0 -640" fill="none" stroke={INK} strokeWidth="6" opacity="0.22" />
    </g>
  )
}

function TallTree({ tone, flip }) {
  const leaf = at(FOLIAGE, tone)
  const hi = at(FOLIAGE_HI, tone)
  const wood = at(TRUNK, tone)
  return (
    <g transform={`scale(${flip} 1)`}>
      <path d="M-16 0 L-10 -140 L10 -140 L16 0 Z" fill={wood} stroke={INK} />
      <path
        d="M0 -880 C62 -800 92 -690 84 -570 C78 -452 52 -262 0 -140 C-52 -262 -78 -452 -84 -570 C-92 -690 -62 -800 0 -880 Z"
        fill={leaf}
        stroke={INK}
      />
      <path d="M-40 -700 C-12 -740 16 -742 44 -706 C22 -640 -18 -638 -40 -700 Z" fill={hi} opacity="0.42" />
      <path d="M-30 -520 C-8 -552 12 -554 34 -524 C16 -470 -14 -468 -30 -520 Z" fill={hi} opacity="0.3" />
      <path d="M0 -846 L0 -160" fill="none" stroke={INK} strokeWidth="5" opacity="0.2" />
    </g>
  )
}

function Bush({ tone, flip }) {
  const leaf = at(FOLIAGE, tone + 1)
  const hi = at(FOLIAGE_HI, tone)
  return (
    <g transform={`scale(${flip} 1)`}>
      <path
        d="M-260 0 C-280 -96 -206 -166 -124 -152 C-96 -232 -4 -244 34 -178 C112 -222 218 -168 216 -84 C262 -60 254 0 214 0 Z"
        fill={leaf}
        stroke={INK}
      />
      <path d="M-140 -112 C-104 -168 -26 -180 18 -136 C-24 -76 -102 -66 -140 -112 Z" fill={hi} opacity="0.4" />
      <path d="M60 -104 C92 -150 156 -146 186 -104 C150 -58 88 -58 60 -104 Z" fill={hi} opacity="0.26" />
    </g>
  )
}

function Palm({ tone, flip }) {
  const leaf = at(FOLIAGE, tone)
  const hi = at(FOLIAGE_HI, tone)
  const wood = at(TRUNK, tone)
  const fronds = []
  for (let i = 0; i < 7; i++) {
    const angle = -158 + i * 26
    const rad = (angle * Math.PI) / 180
    const len = 300 - Math.abs(i - 3) * 26
    const tipX = Math.cos(rad) * len
    const tipY = Math.sin(rad) * len
    fronds.push(
      <path
        key={i}
        d={`M0 0 Q${tipX * 0.5} ${tipY * 0.82} ${tipX} ${tipY} Q${tipX * 0.46} ${tipY * 0.5} 0 0 Z`}
        fill={i % 2 === 0 ? leaf : hi}
        opacity={i % 2 === 0 ? 1 : 0.7}
        stroke={INK}
      />
    )
  }
  return (
    <g transform={`scale(${flip} 1)`}>
      <path d="M-22 0 L-8 -430 L14 -430 L26 0 Z" fill={wood} stroke={INK} />
      <path d="M-6 -430 L-14 -382 M8 -430 L16 -386 M-4 -300 L-10 -256 M10 -300 L16 -252" fill="none" stroke={INK} strokeWidth="5" opacity="0.3" />
      <g transform="translate(2 -430)">{fronds}</g>
      <circle cx="2" cy="-430" r="20" fill={wood} stroke={INK} />
    </g>
  )
}

function Reed({ tone, flip }) {
  const leaf = at(FOLIAGE, tone + 2)
  const hi = at(FOLIAGE_HI, tone)
  const blades = []
  for (let i = 0; i < 9; i++) {
    const x = -70 + i * 17
    const lean = (i - 4) * 12
    const h = 180 + ((i * 37) % 90)
    blades.push(
      <path
        key={i}
        d={`M${x} 0 Q${x + lean * 0.4} ${-h * 0.6} ${x + lean} ${-h} Q${x + lean * 0.2} ${-h * 0.5} ${x} 0 Z`}
        fill={i % 3 === 0 ? hi : leaf}
        opacity={0.86}
        stroke={INK}
      />
    )
  }
  return <g transform={`scale(${flip} 1)`}>{blades}</g>
}

/* ------------------------------------------------------------------ ground */

function Tuft({ tone, flip }) {
  const leaf = at(FOLIAGE, tone + 1)
  const blades = []
  for (let i = 0; i < 6; i++) {
    const x = -34 + i * 14
    const lean = (i - 2.5) * 16
    const h = 80 + ((i * 29) % 52)
    blades.push(
      <path
        key={i}
        d={`M${x} 0 Q${x + lean * 0.4} ${-h * 0.62} ${x + lean} ${-h} Q${x + lean * 0.16} ${-h * 0.5} ${x} 0 Z`}
        fill={leaf}
        stroke={INK}
      />
    )
  }
  return <g transform={`scale(${flip} 1)`}>{blades}</g>
}

function Flower({ tone, flip }) {
  const leaf = at(FOLIAGE, tone + 1)
  const bloom = at([PALETTE.gold, PALETTE.terracotta, PALETTE.cream, PALETTE.burnt], tone)
  const heads = [[-26, -104], [4, -132], [30, -96], [-6, -74]]
  return (
    <g transform={`scale(${flip} 1)`}>
      <Tuft tone={tone} flip={1} />
      {heads.map(([x, y], i) => (
        <g key={i}>
          <path d={`M0 0 Q${x * 0.5} ${y * 0.6} ${x} ${y}`} fill="none" stroke={leaf} strokeWidth="6" />
          <circle cx={x} cy={y} r={15} fill={bloom} stroke={INK} />
          <circle cx={x} cy={y} r={5} fill={PALETTE.cream} />
        </g>
      ))}
    </g>
  )
}

function Stone({ tone, flip }) {
  const body = at(STONE_TONE, tone)
  return (
    <g transform={`scale(${flip} 1)`}>
      <path
        d="M-96 0 C-112 -52 -70 -96 -18 -100 C34 -108 92 -74 96 -30 C98 -6 84 0 66 0 Z"
        fill={body}
        stroke={INK}
      />
      <path d="M-54 -66 C-30 -88 12 -90 40 -70 C8 -48 -30 -46 -54 -66 Z" fill={PALETTE.cream} opacity="0.3" />
    </g>
  )
}

function Ripple({ tone, flip }) {
  const line = at(WATER_TONE, tone)
  return (
    <g stroke={line} fill="none" opacity="0.75">
      <ellipse cx="0" cy="0" rx="190" ry="30" strokeWidth="7" />
      <ellipse cx="34" cy="16" rx="112" ry="18" strokeWidth="5" opacity="0.7" />
      <ellipse cx="-40" cy="26" rx="72" ry="12" strokeWidth="4" opacity="0.55" />
    </g>
  )
}

function Dash({ tone }) {
  const paint = tone % 3 === 0 ? PALETTE.cream : PALETTE.sand
  return (
    <path
      d="M-13 0 L-13 -150 Q0 -170 13 -150 L13 0 Z"
      fill={paint}
      opacity="0.72"
      stroke={INK}
    />
  )
}

/* --------------------------------------------------------------- dispatcher */

const VARIANTS = {
  round: RoundTree,
  tall: TallTree,
  bush: Bush,
  palm: Palm,
  reed: Reed,
  tuft: Tuft,
  flower: Flower,
  stone: Stone,
  ripple: Ripple,
  dash: Dash
}

export default function Flora({ variant, tone = 0, flip = 1 }) {
  const Shape = VARIANTS[variant] || Meadow
  return <Shape tone={tone} flip={flip} />
}

function Meadow() {
  return <path d="M-40 0 C-20 -44 20 -44 40 0 Z" fill={PALETTE.olive} stroke={INK} />
}
