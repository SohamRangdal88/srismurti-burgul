import { PALETTE } from '../data/palette.js'

/**
 * Shared illustration primitives for the generative artwork engine.
 * Everything here is pure SVG so it stays crisp at any size and costs
 * almost nothing to load.
 */

/** Texture + pattern definitions, namespaced so many artworks can coexist. */
export function ArtworkDefs({ uid, ink = PALETTE.ink, paper = PALETTE.paper }) {
  return (
    <defs>
      <pattern id={`dots-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="3.5" cy="3.5" r="1.3" fill={ink} opacity="0.55" />
      </pattern>
      <pattern
        id={`hatch-${uid}`}
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="8" stroke={ink} strokeWidth="1.7" opacity="0.4" />
      </pattern>
      <pattern id={`weave-${uid}`} width="12" height="12" patternUnits="userSpaceOnUse">
        <line x1="6" y1="0" x2="6" y2="12" stroke={ink} strokeWidth="2.6" opacity="0.28" />
        <line x1="0" y1="6" x2="12" y2="6" stroke={ink} strokeWidth="2.6" opacity="0.28" />
      </pattern>
      <pattern id={`rules-${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="26" stroke={ink} strokeWidth="1.1" opacity="0.32" />
      </pattern>
      <pattern id={`grain-${uid}`} width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.6" fill={ink} opacity="0.26" />
        <circle cx="3" cy="3" r="0.45" fill={paper} opacity="0.34" />
      </pattern>
      <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={paper} />
        <stop offset="100%" stopColor={PALETTE.sand} />
      </linearGradient>
    </defs>
  )
}

/** A fan of alternating wedges — the signature Art Deco sunburst. */
export function Sunburst({ cx, cy, r, rays = 22, color, inner = 0.42, opacity = 1, startAngle = 0, sweep = 360 }) {
  const wedges = []
  const step = sweep / rays
  for (let i = 0; i < rays; i++) {
    if (i % 2 !== 0) continue
    const a0 = ((startAngle + i * step) * Math.PI) / 180
    const a1 = ((startAngle + (i + 1) * step) * Math.PI) / 180
    const ri = r * inner
    const p = (a, rad) => `${cx + Math.cos(a) * rad} ${cy + Math.sin(a) * rad}`
    wedges.push(
      <path
        key={i}
        d={`M${p(a0, ri)} L${p(a0, r)} A${r} ${r} 0 0 1 ${p(a1, r)} L${p(a1, ri)} Z`}
        fill={color}
        opacity={opacity}
      />
    )
  }
  return <g>{wedges}</g>
}

/** Concentric arcs, used for clouds, ripples and hills across all motifs. */
export function ArcStack({ cx, cy, r0, count, step, color, stroke = 3, opacity = 1, sweep = 180, startAngle = 180 }) {
  const arcs = []
  for (let i = 0; i < count; i++) {
    const r = r0 + i * step
    const a0 = (startAngle * Math.PI) / 180
    const a1 = ((startAngle + sweep) * Math.PI) / 180
    const p = (a) => `${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}`
    arcs.push(
      <path
        key={i}
        d={`M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        opacity={opacity}
      />
    )
  }
  return <g>{arcs}</g>
}

/** Rows of broken rules standing in for typeset text (never real letterforms). */
export function TextLines({ rng, x, y, w, rows, rowHeight = 15, color = PALETTE.ink, opacity = 0.5, thickness = 3.6, gap = 10 }) {
  const lines = []
  for (let r = 0; r < rows; r++) {
    let cursor = x
    let guard = 0
    const last = r === rows - 1 && rows > 2
    while (cursor < x + w - gap * 2 && guard < 40) {
      guard++
      const raw = rng.range(w * 0.07, w * 0.19)
      const width = Math.min(raw, x + w - cursor)
      if (width < gap) break
      lines.push(
        <rect
          key={`${r}-${guard}`}
          x={cursor}
          y={y + r * rowHeight}
          width={width}
          height={thickness}
          rx={thickness / 2}
          fill={color}
          opacity={opacity}
        />
      )
      cursor += width + gap
      if (last && cursor > x + w * 0.7) break
    }
  }
  return <g>{lines}</g>
}

/** Nested Art Deco border with corner ticks. */
export function DecoFrame({ w, h, color = PALETTE.ink, weight = 3, inset = 20, corner = 0.05 }) {
  const x = inset
  const y = inset
  const iw = w - inset * 2
  const ih = h - inset * 2
  const s = Math.min(iw, ih) * corner
  const corners = [
    `M${x} ${y + s} L${x} ${y} L${x + s} ${y}`,
    `M${x + iw - s} ${y} L${x + iw} ${y} L${x + iw} ${y + s}`,
    `M${x + iw} ${y + ih - s} L${x + iw} ${y + ih} L${x + iw - s} ${y + ih}`,
    `M${x + s} ${y + ih} L${x} ${y + ih} L${x} ${y + ih - s}`
  ]
  return (
    <g fill="none" stroke={color}>
      <rect x={x} y={y} width={iw} height={ih} strokeWidth={weight} />
      <rect x={x + 8} y={y + 8} width={iw - 16} height={ih - 16} strokeWidth={weight * 0.45} opacity="0.55" />
      {corners.map((d, i) => (
        <path key={i} d={d} strokeWidth={weight * 1.7} />
      ))}
    </g>
  )
}

/** Registration / crop marks — a printer's fingerprint. */
export function CropMarks({ w, h, color = PALETTE.ink, inset = 14, len = 26, weight = 2 }) {
  const marks = [
    `M${inset} ${inset + len} L${inset} ${inset} L${inset + len} ${inset}`,
    `M${w - inset - len} ${inset} L${w - inset} ${inset} L${w - inset} ${inset + len}`,
    `M${w - inset} ${h - inset - len} L${w - inset} ${h - inset} L${w - inset - len} ${h - inset}`,
    `M${inset + len} ${h - inset} L${inset} ${h - inset} L${inset} ${h - inset - len}`
  ]
  return (
    <g fill="none" stroke={color} strokeWidth={weight} opacity="0.65">
      {marks.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  )
}

/** A stylised deco leaf, drawn from a spine and two mirrored blades. */
export function Leaf({ x, y, size, angle = 0, color, opacity = 1, stroke }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size / 100})`} opacity={opacity}>
      <path
        d="M0 0 C42 -18 74 -52 84 -96 C40 -84 8 -52 0 0 Z"
        fill={color}
        stroke={stroke || 'none'}
        strokeWidth={stroke ? 3 : 0}
      />
      <path
        d="M0 0 C-42 -18 -74 -52 -84 -96 C-40 -84 -8 -52 0 0 Z"
        fill={color}
        opacity="0.82"
        stroke={stroke || 'none'}
        strokeWidth={stroke ? 3 : 0}
      />
      <line x1="0" y1="0" x2="0" y2="-92" stroke={PALETTE.ink} strokeWidth="3" opacity="0.35" />
    </g>
  )
}

/** Stacked deco cloud. */
export function Cloud({ x, y, scale = 1, color, stroke, opacity = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <path
        d="M0 0 C0 -34 28 -56 58 -50 C70 -80 118 -84 134 -56 C168 -58 188 -30 180 -2 Z"
        fill={color}
        stroke={stroke || 'none'}
        strokeWidth={stroke ? 4 : 0}
      />
    </g>
  )
}

/** Arrow head shape used by signpost-flavoured motifs. */
export function ArrowBoard({ x, y, w, h, dir = 1, color, opacity = 1 }) {
  const tip = dir > 0 ? w : 0
  const tail = dir > 0 ? 0 : w
  return (
    <path
      d={`M${x + tail} ${y} L${x + tip - dir * h * 0.5} ${y} L${x + tip} ${y + h / 2} L${x + tip - dir * h * 0.5} ${y + h} L${x + tail} ${y + h} Z`}
      fill={color}
      opacity={opacity}
    />
  )
}
