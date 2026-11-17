import { PALETTE } from '../data/palette.js'
import { ArcStack, ArrowBoard, Cloud, CropMarks, DecoFrame, Leaf, Sunburst, TextLines } from './primitives.jsx'

/**
 * Twenty composition engines — one per project.
 *
 * Each engine receives a seeded rng, the canvas box, the category palette and
 * a namespaced uid, and returns a complete SVG artwork. They deliberately
 * differ in structure (grid, poster, spread, diagram, mechanism) so the
 * galleries never look like variations of one template.
 */

const ink = PALETTE.ink

/* ------------------------------------------------------------------- WEAVING */

const weaveGrid = ({ rng, w, h, colors }) => {
  const pad = Math.round(w * 0.09)
  const fx = pad
  const fy = h * 0.24
  const fw = w - pad * 2
  const fh = h * 0.53
  const cols = 16
  const rows = 22
  const cw = fw / cols
  const ch = fh / rows
  const cells = []
  const warps = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rng.chance(0.44)) continue
      cells.push(
        <rect
          key={`w${r}-${c}`}
          x={fx + c * cw}
          y={fy + r * ch}
          width={cw}
          height={ch}
          fill={colors[rng.int(0, colors.length - 1)]}
          opacity={rng.range(0.2, 0.95)}
        />
      )
    }
  }
  for (let c = 1; c < cols; c++) {
    warps.push(
      <line
        key={`t${c}`}
        x1={fx + c * cw}
        y1={fy}
        x2={fx + c * cw}
        y2={fy + fh}
        stroke={ink}
        strokeWidth="1.1"
        opacity="0.22"
      />
    )
  }

  const stress = [4, 11, 17].map((row) => (
    <rect
      key={`s${row}`}
      x={fx}
      y={fy + row * ch}
      width={fw}
      height={ch * 1.6}
      fill={PALETTE.cream}
      opacity="0.9"
    />
  ))

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <Sunburst cx={w / 2} cy={h * 0.135} r={w * 0.19} rays={20} color={colors[0]} opacity="0.5" inner={0.36} />
      <circle cx={w / 2} cy={h * 0.135} r={w * 0.085} fill={PALETTE.cream} />
      <circle cx={w / 2} cy={h * 0.135} r={w * 0.085} fill="none" stroke={ink} strokeWidth="3" />
      <rect x={fx} y={fy} width={fw} height={fh} fill={PALETTE.creamDeep} />
      <g>{cells}</g>
      {stress}
      <g>{warps}</g>
      <rect x={fx} y={fy} width={fw} height={fh} fill="none" stroke={ink} strokeWidth="3.4" />
      <rect x={fx - 16} y={fy - 16} width={fw + 32} height="14" fill={colors[1]} opacity="0.75" />
      <rect x={fx - 16} y={fy + fh + 2} width={fw + 32} height="14" fill={colors[1]} opacity="0.75" />
      <TextLines rng={rng} x={fx} y={fy + fh + 52} w={fw * 0.62} rows={3} opacity={0.42} />
      <DecoFrame w={w} h={h} color={ink} weight={2.2} inset={22} />
    </g>
  )
}

const threadMap = ({ rng, w, h, colors }) => {
  const roads = []
  const clusters = []
  let x = 60
  while (x < w - 60) {
    const thickness = rng.range(1.2, 7)
    roads.push(
      <line
        key={`r${x}`}
        x1={x}
        y1={40}
        x2={x + rng.signed(18)}
        y2={h - 40}
        stroke={PALETTE.brown}
        strokeWidth={thickness}
        opacity={rng.range(0.25, 0.75)}
      />
    )
    if (rng.chance(0.55)) {
      const cy = rng.range(h * 0.25, h * 0.8)
      const r = rng.range(5, 15)
      clusters.push(
        <g key={`c${x}`}>
          <circle cx={x} cy={cy} r={r} fill={colors[0]} opacity="0.9" />
          <circle cx={x} cy={cy} r={r * 0.45} fill={PALETTE.paper} />
        </g>
      )
    }
    x += rng.range(22, 54)
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x="26" y="26" width={w - 52} height={h - 52} fill={PALETTE.cream} />
      <g opacity="0.85">{roads}</g>
      <path
        d={`M26 ${h * 0.62} C ${w * 0.22} ${h * 0.42}, ${w * 0.34} ${h * 0.86}, ${w * 0.52} ${h * 0.6} S ${w * 0.8} ${h * 0.34}, ${w - 26} ${h * 0.5}`}
        fill="none"
        stroke={PALETTE.teal}
        strokeWidth="16"
        opacity="0.85"
      />
      <path
        d={`M26 ${h * 0.62} C ${w * 0.22} ${h * 0.42}, ${w * 0.34} ${h * 0.86}, ${w * 0.52} ${h * 0.6} S ${w * 0.8} ${h * 0.34}, ${w - 26} ${h * 0.5}`}
        fill="none"
        stroke={PALETTE.paper}
        strokeWidth="4"
        opacity="0.7"
      />
      {clusters}
      <Sunburst cx={w - 120} cy={h - 110} r={72} rays={12} color={colors[1]} startAngle={180} sweep={90} inner={0.3} />
      <circle cx={w - 120} cy={h - 110} r="72" fill="none" stroke={ink} strokeWidth="2.5" opacity="0.7" />
      <rect x="26" y="26" width={w - 52} height={h - 52} fill="none" stroke={ink} strokeWidth="3" />
      <rect x="40" y="40" width={w - 80} height={h - 80} fill="none" stroke={ink} strokeWidth="1.2" opacity="0.6" />
      <TextLines rng={rng} x={54} y={h - 74} w={w * 0.32} rows={2} opacity={0.5} />
    </g>
  )
}

const swatchGrid = ({ rng, w, h, colors }) => {
  const cols = 12
  const rows = 8
  const pad = 70
  const gw = (w - pad * 2) / cols
  const gh = (h - pad * 2 - 150) / rows
  const steps = []
  const order = [PALETTE.tealDeep, PALETTE.teal, PALETTE.olive, PALETTE.oliveDeep, PALETTE.dustyBlue, PALETTE.cream]

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const base = order[(c + r) % order.length]
      const t = (r * cols + c) / (rows * cols)
      steps.push(
        <g key={`s${r}-${c}`}>
          <rect x={pad + c * gw} y={pad + r * gh} width={gw - 5} height={gh - 5} fill={base} />
          <rect
            x={pad + c * gw}
            y={pad + r * gh}
            width={gw - 5}
            height={gh - 5}
            fill={PALETTE.paper}
            opacity={t * 0.72}
          />
        </g>
      )
    }
  }

  const pinned = [1, 4, 6].map((i) => {
    const c = rng.int(0, cols - 1)
    const r = rng.int(0, rows - 1)
    return (
      <g key={`p${i}`} transform={`rotate(${rng.range(-9, 9)} ${pad + c * gw + gw / 2} ${pad + r * gh + gh / 2})`}>
        <rect
          x={pad + c * gw + 6}
          y={pad + r * gh + 6}
          width={gw - 17}
          height={gh - 17}
          fill={colors[rng.int(2, colors.length - 1)]}
          opacity="0.92"
        />
        <circle cx={pad + c * gw + gw / 2 - 2} cy={pad + r * gh + gh / 2 - 2} r="3.4" fill={ink} />
      </g>
    )
  })

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x={pad - 18} y={pad - 18} width={w - (pad - 18) * 2} height={h - (pad - 18) * 2 - 114} fill={PALETTE.creamDeep} />
      <g>{steps}</g>
      <g>{pinned}</g>
      <rect x={pad - 18} y={pad - 18} width={w - (pad - 18) * 2} height={h - (pad - 18) * 2 - 114} fill="none" stroke={ink} strokeWidth="2.6" />
      <rect x={pad} y={h - 118} width={w - pad * 2} height="74" fill={PALETTE.cream} stroke={ink} strokeWidth="2.4" />
      <TextLines rng={rng} x={pad + 18} y={h - 100} w={w * 0.5} rows={3} rowHeight={13} thickness={3} opacity={0.55} />
      <TextLines rng={rng} x={w - pad - 190} y={h - 100} w={172} rows={3} rowHeight={13} thickness={3} opacity={0.55} />
      <DecoFrame w={w} h={h} color={ink} weight={2} inset={24} />
    </g>
  )
}

const loomDraft = ({ rng, w, h, colors }) => {
  const pad = 78
  const fw = w - pad * 2
  const threadRows = 6
  const rowH = 16
  const draftTop = h * 0.12
  const planTop = draftTop + threadRows * rowH + 34
  const weaveTop = planTop + 150

  const threading = []
  for (let r = 0; r < threadRows; r++) {
    for (let c = 0; c < 46; c++) {
      if (rng.chance(0.52)) continue
      const shaft = rng.int(0, threadRows - 1)
      threading.push(
        <rect
          key={`th${r}-${c}`}
          x={pad + (c * fw) / 46 + 2}
          y={draftTop + shaft * rowH}
          width={fw / 46 - 4}
          height={rowH - 5}
          fill={COLORS_SAFE(rng, colors)}
        />
      )
    }
  }

  const treadling = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 14; c++) {
      if (rng.chance(0.5)) continue
      treadling.push(
        <rect
          key={`tr${r}-${c}`}
          x={pad + (c * fw) / 14 + 3}
          y={planTop + r * 17}
          width={fw / 14 - 6}
          height="12"
          fill={rng.chance(0.5) ? colors[0] : colors[2]}
        />
      )
    }
  }

  const cloth = []
  const step = fw / 40
  for (let r = 0; r < 22; r++) {
    for (let c = 0; c < 40; c++) {
      const on = (r + Math.floor(c / 3)) % 4 !== 0
      cloth.push(
        <rect
          key={`cl${r}-${c}`}
          x={pad + c * step}
          y={weaveTop + r * step}
          width={step}
          height={step}
          fill={on ? PALETTE.oliveDeep : PALETTE.paper}
          opacity={on ? 0.9 : 1}
        />
      )
    }
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x={40} y={40} width={w - 80} height={h - 80} fill={PALETTE.cream} />
      <TextLines rng={rng} x={pad} y={h * 0.075} w={fw * 0.4} rows={1} thickness={3} opacity={0.5} />
      <g>{threading}</g>
      <line x1={pad} y1={planTop - 22} x2={w - pad} y2={planTop - 22} stroke={ink} strokeWidth="2" opacity="0.5" />
      <g>{treadling}</g>
      <line x1={pad} y1={weaveTop - 22} x2={w - pad} y2={weaveTop - 22} stroke={ink} strokeWidth="2" opacity="0.5" />
      <g>{cloth}</g>
      <rect x={pad} y={weaveTop} width={fw} height={22 * step} fill="none" stroke={ink} strokeWidth="3" />
      <rect x={pad - 20} y={h - 132} width={fw + 40} height="66" fill={colors[1]} opacity="0.22" />
      <TextLines rng={rng} x={pad} y={h - 112} w={fw * 0.55} rows={3} rowHeight={14} thickness={3} opacity={0.5} />
      <DecoFrame w={w} h={h} color={ink} weight={2.2} inset={22} />
    </g>
  )
}

const wovenBorder = ({ rng, w, h, colors }) => {
  const bands = [
    { x: 96, width: 96, count: 14 },
    { x: w / 2 - 130, width: 260, count: 8 },
    { x: w - 192, width: 96, count: 14 }
  ]

  const layers = bands.map((band, bi) => {
    const cell = (h - 200) / band.count
    const motifs = []
    for (let i = 0; i < band.count; i++) {
      const cy = 100 + i * cell + cell / 2
      const color = colors[(i + bi) % colors.length]
      motifs.push(
        <g key={`m${bi}-${i}`}>
          <rect x={band.x} y={cy - cell * 0.32} width={band.width} height={cell * 0.64} fill={color} opacity="0.85" />
          <path
            d={`M${band.x} ${cy} L${band.x + band.width * 0.5} ${cy - cell * 0.32} L${band.x + band.width} ${cy} L${band.x + band.width * 0.5} ${cy + cell * 0.32} Z`}
            fill={PALETTE.paper}
            opacity="0.85"
          />
          <circle cx={band.x + band.width / 2} cy={cy} r={cell * 0.12} fill={ink} opacity="0.7" />
        </g>
      )
    }
    return (
      <g key={`b${bi}`}>
        <rect x={band.x} y={88} width={band.width} height={h - 176} fill={PALETTE.creamDeep} />
        {motifs}
        <rect x={band.x} y={88} width={band.width} height={h - 176} fill="none" stroke={ink} strokeWidth="3" />
        <rect x={band.x - 10} y={78} width={band.width + 20} height="10" fill={PALETTE.gold} />
        <rect x={band.x - 10} y={h - 88} width={band.width + 20} height="10" fill={PALETTE.gold} />
      </g>
    )
  })

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <g opacity="0.5">
        <Sunburst cx={w / 2} cy={h / 2} r={w * 0.75} rays={36} color={PALETTE.sand} inner={0.82} />
      </g>
      {layers}
      <CropMarks w={w} h={h} color={ink} inset={20} len={30} />
      <DecoFrame w={w} h={h} color={ink} weight={2} inset={30} />
    </g>
  )
}

/* ---------------------------------------------------------------------- PRINT */

const pressPoster = ({ rng, w, h, colors }) => {
  const horizon = h * 0.535
  const rain = []
  let x = 96
  while (x < w - 96) {
    const length = rng.range(h * 0.06, h * 0.2)
    rain.push(
      <line
        key={`r${x}`}
        x1={x}
        y1={horizon + rng.range(0, 30)}
        x2={x + rng.signed(6)}
        y2={horizon + length}
        stroke={colors[0]}
        strokeWidth={rng.range(2, 7)}
        strokeLinecap="round"
        opacity={rng.range(0.35, 0.95)}
      />
    )
    x += rng.range(18, 42)
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x="58" y="58" width={w - 116} height={h - 116} fill={PALETTE.cream} />
      <Sunburst cx={w / 2} cy={h * 0.3} r={w * 0.33} rays={24} color={colors[2]} opacity="0.32" inner={0.6} />
      <Cloud x={w * 0.19} y={h * 0.34} scale={1.35} color={colors[1]} opacity="0.95" />
      <Cloud x={w * 0.52} y={h * 0.25} scale={0.9} color={colors[1]} opacity="0.7" />
      <rect x="58" y={horizon} width={w - 116} height={h - horizon - 58} fill={colors[0]} opacity="0.16" />
      <line x1="58" y1={horizon} x2={w - 58} y2={horizon} stroke={ink} strokeWidth="4" />
      <g>{rain}</g>
      <rect x="58" y={h - 168} width={w - 116} height="110" fill={PALETTE.creamDeep} />
      <TextLines rng={rng} x={94} y={h - 150} w={w * 0.42} rows={3} rowHeight={17} thickness={4} opacity={0.6} />
      <TextLines rng={rng} x={w - 94 - 150} y={h - 150} w={150} rows={3} rowHeight={17} thickness={4} opacity={0.6} />
      <rect x="58" y="58" width={w - 116} height={h - 116} fill="none" stroke={ink} strokeWidth="4" />
      <CropMarks w={w} h={h} color={ink} inset={22} len={24} />
    </g>
  )
}

const editorialSpread = ({ rng, w, h, colors }) => {
  const m = 54
  const pw = (w - m * 2) / 2
  const pageT = h * 0.11
  const pageB = h * 0.89

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.brownDeep} opacity="0.35" />
      <rect width={w} height={h} fill={PALETTE.sand} />
      <rect x={m} y={pageT} width={pw} height={pageB - pageT} fill={PALETTE.paper} />
      <rect x={m + pw} y={pageT} width={pw} height={pageB - pageT} fill={PALETTE.cream} />
      <rect x={m + pw - 14} y={pageT} width="28" height={pageB - pageT} fill={ink} opacity="0.1" />
      <g>
        <TextLines rng={rng} x={m + 46} y={pageT + 44} w={pw - 92} rows={4} rowHeight={17} thickness={4} opacity={0.62} />
        <rect x={m + 46} y={pageT + 140} width={pw - 92} height={(pageB - pageT) * 0.34} fill={colors[2]} opacity="0.2" />
        <Leaf x={m + pw / 2 - 20} y={pageT + 140 + (pageB - pageT) * 0.34} size={2.1} color={colors[0]} />
        <TextLines rng={rng} x={m + 46} y={pageT + 150 + (pageB - pageT) * 0.34} w={pw - 92} rows={4} rowHeight={17} thickness={4} opacity={0.62} />
      </g>
      <g>
        <rect x={m + pw + 46} y={pageT + 44} width={pw - 92} height={(pageB - pageT) * 0.5} fill={PALETTE.sand} />
        <rect x={m + pw + 46} y={pageT + 44 + (pageB - pageT) * 0.34} width={pw - 92} height={(pageB - pageT) * 0.16} fill={PALETTE.teal} opacity="0.85" />
        <Sunburst cx={m + pw + 46 + (pw - 92) * 0.7} cy={pageT + 44 + (pageB - pageT) * 0.3} r={70} rays={16} color={colors[1]} opacity="0.75" />
        <TextLines rng={rng} x={m + pw + 46} y={pageT + 74 + (pageB - pageT) * 0.5} w={pw - 92} rows={5} rowHeight={17} thickness={4} opacity={0.62} />
      </g>
      <rect x={m} y={pageT} width={pw} height={pageB - pageT} fill="none" stroke={ink} strokeWidth="1.6" opacity="0.5" />
      <rect x={m + pw} y={pageT} width={pw} height={pageB - pageT} fill="none" stroke={ink} strokeWidth="1.6" opacity="0.5" />
      <TextLines rng={rng} x={m + 26} y={pageT - 26} w={90} rows={1} thickness={3} opacity={0.5} />
      <TextLines rng={rng} x={w - m - 116} y={pageT - 26} w={90} rows={1} thickness={3} opacity={0.5} />
      <CropMarks w={w} h={h} color={ink} inset={18} len={22} weight={1.8} />
    </g>
  )
}

const typeSpecimen = ({ rng, w, h, colors }) => {
  const barW = w * 0.16
  const glyphTop = h * 0.1
  const glyphH = h * 0.28

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x="0" y={glyphTop + glyphH + 40} width={w} height="2" fill={ink} opacity="0.4" />
      <g>
        <rect x={w * 0.18} y={glyphTop} width={barW} height={glyphH} fill={colors[2]} />
        <path
          d={`M${w * 0.34} ${glyphTop} L${w * 0.72} ${glyphTop} L${w * 0.72} ${glyphTop + barW} L${w * 0.34 + barW} ${glyphTop + barW} L${w * 0.34 + barW} ${glyphTop + glyphH * 0.62} L${w * 0.62} ${glyphTop + glyphH * 0.62} L${w * 0.62} ${glyphTop + glyphH * 0.62 + barW} L${w * 0.34 + barW} ${glyphTop + glyphH * 0.62 + barW}`}
          fill="none"
          stroke={ink}
          strokeWidth="4"
          opacity="0.75"
        />
        <path
          d={`M${w * 0.18} ${glyphTop + glyphH} m0 0 a${glyphH * 0.5} ${glyphH * 0.5} 0 0 1 ${glyphH} 0`}
          fill="none"
          stroke={colors[0]}
          strokeWidth="12"
          opacity="0.8"
        />
        <circle cx={w * 0.78} cy={glyphTop + glyphH * 0.5} r={glyphH * 0.34} fill="none" stroke={colors[0]} strokeWidth="10" />
      </g>
      <TextLines rng={rng} x={w * 0.12} y={glyphTop + glyphH + 96} w={w * 0.76} rows={6} rowHeight={19} thickness={4.4} opacity={0.6} />
      <line x1={w * 0.12} y1={glyphTop + glyphH + 216} x2={w * 0.88} y2={glyphTop + glyphH + 216} stroke={ink} strokeWidth="1.4" opacity="0.4" />
      <TextLines rng={rng} x={w * 0.12} y={glyphTop + glyphH + 244} w={w * 0.36} rows={7} rowHeight={18} thickness={4.2} opacity={0.52} />
      <TextLines rng={rng} x={w * 0.53} y={glyphTop + glyphH + 244} w={w * 0.35} rows={7} rowHeight={18} thickness={4.2} opacity={0.52} />
      <g>
        {Array.from({ length: 14 }, (_, i) => (
          <rect
            key={`n${i}`}
            x={w * 0.12 + i * (w * 0.76) / 14}
            y={h - 190 - rng.range(10, 90)}
            width={(w * 0.76) / 14 - 14}
            height={rng.range(20, 96)}
            fill={colors[i % colors.length]}
            opacity="0.8"
          />
        ))}
      </g>
      <DecoFrame w={w} h={h} color={ink} weight={2.2} inset={26} />
    </g>
  )
}

const risoZine = ({ rng, w, h, colors, uid }) => {
  const stems = [0.24, 0.44, 0.63, 0.79]
  const draw = (offset) =>
    stems.map((sx, i) => {
      const baseX = w * sx
      const baseY = h * 0.86 - i * 12
      const topY = h * rng.range(0.3, 0.44)
      const leaves = Array.from({ length: 4 }, (_, k) => (
        <Leaf
          key={`l${i}-${k}`}
          x={baseX + (k % 2 === 0 ? -6 : 6)}
          y={baseY - (k + 1) * (baseY - topY) * 0.2}
          size={rng.range(0.55, 0.95)}
          angle={k % 2 === 0 ? -34 : 30}
          color={k % 2 === 0 ? colors[0] : colors[1]}
        />
      ))
      return (
        <g key={`s${i}`} transform={`translate(${offset} ${offset * 0.6})`}>
          <path
            d={`M${baseX} ${baseY} C ${baseX + 12} ${(baseY + topY) / 2}, ${baseX - 14} ${(baseY + topY) / 2}, ${baseX} ${topY}`}
            fill="none"
            stroke={colors[i % colors.length]}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {leaves}
          <ellipse cx={baseX} cy={topY} rx="10" ry="24" fill={colors[(i + 1) % colors.length]} />
        </g>
      )
    })

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <circle cx={w * 0.5} cy={h * 0.47} r={w * 0.33} fill={colors[1]} opacity="0.3" />
      <rect x={w * 0.12} y={h * 0.1} width={w * 0.76} height={h * 0.8} fill="none" stroke={colors[0]} strokeWidth="3" opacity="0.7" />
      <g opacity="0.9">{draw(12)}</g>
      <g opacity="0.78">{draw(-10)}</g>
      <line x1={w * 0.12} y1={h * 0.86} x2={w * 0.88} y2={h * 0.86} stroke={colors[0]} strokeWidth="5" />
      <g opacity="0.4">
        <rect width={w} height={h} fill={`url(#grain-${uid})`} />
      </g>
      <TextLines rng={rng} x={w * 0.16} y={h * 0.9} w={w * 0.4} rows={2} rowHeight={15} thickness={3.4} opacity={0.55} />
      <CropMarks w={w} h={h} color={ink} inset={16} len={20} weight={1.8} />
    </g>
  )
}

const wideCover = ({ rng, w, h, colors }) => {
  const horizon = h * 0.56
  const ripples = []
  for (let i = 0; i < 16; i++) {
    const y = horizon + 16 + i * ((h - horizon - 30) / 16)
    const inset = 60 + i * 6
    ripples.push(
      <path
        key={`rp${i}`}
        d={`M${inset} ${y} Q ${w / 2} ${y - 9} ${w - inset} ${y}`}
        fill="none"
        stroke={colors[0]}
        strokeWidth={rng.range(2, 5)}
        opacity={rng.range(0.25, 0.6)}
      />
    )
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect width={w} height={horizon} fill={PALETTE.cream} />
      <ArcStack cx={w * 0.5} cy={horizon + 40} r0={w * 0.16} count={4} step={34} color={colors[2]} stroke={3} opacity="0.45" />
      <rect y={horizon} width={w} height={h - horizon} fill={PALETTE.dustyBlue} opacity="0.3" />
      <g>{ripples}</g>
      <g>
        {[0, 1, 2].map((i) => (
          <ellipse
            key={`st${i}`}
            cx={w * 0.5}
            cy={horizon - 22 - i * 34}
            rx={70 - i * 16}
            ry={20 - i * 3}
            fill={PALETTE.brown}
            opacity={0.85 - i * 0.1}
          />
        ))}
      </g>
      <line x1={w / 2} y1="24" x2={w / 2} y2={h - 24} stroke={ink} strokeWidth="1.4" strokeDasharray="10 12" opacity="0.45" />
      <line x1="0" y1={horizon} x2={w} y2={horizon} stroke={ink} strokeWidth="3" opacity="0.8" />
      <TextLines rng={rng} x={54} y={h - 78} w={w * 0.24} rows={2} rowHeight={14} thickness={3.2} opacity={0.55} />
      <TextLines rng={rng} x={w - 54 - w * 0.24} y={h - 78} w={w * 0.24} rows={2} rowHeight={14} thickness={3.2} opacity={0.55} />
      <CropMarks w={w} h={h} color={ink} inset={20} len={26} />
    </g>
  )
}

/* -------------------------------------------------------------------- GRAPHIC */

const identitySystem = ({ rng, w, h, colors }) => {
  const cols = 4
  const rows = 3
  const gx = 62
  const gy = 62
  const bannerW = w * 0.28
  const cellW = (w - gx * 2 - bannerW - 40) / cols
  const cellH = (h - gy * 2 - 40) / rows
  const marks = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const size = Math.min(cellW, cellH) * 0.62
      const cx = gx + c * cellW + cellW / 2
      const cy = gy + r * cellH + cellH / 2
      const inverted = rng.chance(0.35)
      const rot = rng.pick([0, 45, 90, 135])
      marks.push(
        <g key={`m${r}-${c}`}>
          <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} fill={inverted ? ink : 'none'} stroke={ink} strokeWidth="4" />
          <g transform={`rotate(${rot} ${cx} ${cy})`}>
            <rect
              x={cx - size / 2 + 12}
              y={cy - size / 2 + 12}
              width={size - 24}
              height={size - 24}
              fill={inverted ? PALETTE.paper : colors[(r + c) % colors.length]}
            />
          </g>
        </g>
      )
    }
  }

  const bannerX = w - gx - bannerW
  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <g>{marks}</g>
      <rect x={bannerX} y={gy} width={bannerW} height={h - gy * 2} fill={colors[0]} />
      <g transform={`translate(${bannerX + bannerW / 2} ${h / 2 - 40})`}>
        <rect x="-56" y="-56" width="112" height="112" fill={PALETTE.cream} />
        <rect x="-38" y="-38" width="76" height="76" fill={ink} transform="rotate(45)" />
      </g>
      <TextLines rng={rng} x={bannerX + 22} y={h - gy - 96} w={bannerW - 44} rows={4} rowHeight={15} thickness={3.4} opacity={0.6} />
      <line x1={gx} y1={gy} x2={w - gx} y2={gy} stroke={ink} strokeWidth="1.6" opacity="0.45" />
      <line x1={gx} y1={h - gy} x2={w - gx} y2={h - gy} stroke={ink} strokeWidth="1.6" opacity="0.45" />
      <CropMarks w={w} h={h} color={ink} inset={18} len={22} weight={1.8} />
    </g>
  )
}

const brushRhythm = ({ rng, w, h, colors }) => {
  const strokes = []
  const baseline = h * 0.72
  for (let i = 0; i < 9; i++) {
    const x = 78 + i * ((w - 156) / 9)
    const top = rng.range(h * 0.2, h * 0.44)
    const width = rng.range(28, 62)
    const lean = rng.range(-0.22, 0.22)
    const color = colors[i % colors.length]
    strokes.push(
      <path
        key={`b${i}`}
        d={`M${x} ${baseline}
            C ${x + lean * 40} ${baseline - (baseline - top) * 0.4},
              ${x + width * 0.5 + lean * 30} ${top + (baseline - top) * 0.18},
              ${x + width * 0.42 + lean * 60} ${top}
            C ${x + width * 0.78 + lean * 50} ${top + (baseline - top) * 0.3},
              ${x + width * 0.62 + lean * 20} ${baseline - (baseline - top) * 0.24},
              ${x + width * 0.5} ${baseline}
            Z`}
        fill={color}
        opacity={rng.range(0.72, 1)}
      />
    )
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x="0" y={h * 0.72} width={w} height="3" fill={ink} opacity="0.35" />
      <g transform="translate(0 -6)" opacity="0.5">
        {strokes.map((s, i) => (
          <g key={`ghost${i}`} transform="translate(14 10) scale(1 0.98)">
            {s}
          </g>
        ))}
      </g>
      <g>{strokes}</g>
      <line x1="78" y1={h * 0.84} x2={w - 78} y2={h * 0.84} stroke={ink} strokeWidth="1.4" opacity="0.3" />
      <TextLines rng={rng} x={78} y={h * 0.88} w={w * 0.42} rows={3} rowHeight={14} thickness={3.2} opacity={0.5} />
      <DecoFrame w={w} h={h} color={ink} weight={2} inset={28} />
    </g>
  )
}

const kiteSky = ({ rng, w, h, colors }) => {
  const kites = []
  const count = 7
  for (let i = 0; i < count; i++) {
    const x = rng.range(w * 0.12, w * 0.88)
    const y = rng.range(h * 0.12, h * 0.62)
    const s = rng.range(0.6, 1.35)
    const rot = rng.range(-26, 26)
    const color = colors[i % colors.length]
    const tail = Array.from({ length: 5 }, (_, k) => (
      <path
        key={`t${i}-${k}`}
        d={`M0 ${(k * 34).toFixed(1)} q ${(rng.signed(26)).toFixed(0)} 17 0 34`}
        fill="none"
        stroke={ink}
        strokeWidth="1.6"
        opacity="0.5"
        transform={`translate(${rng.signed(4).toFixed(0)} 42)`}
      />
    ))
    kites.push(
      <g key={`k${i}`} transform={`translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${rot.toFixed(0)}) scale(${s.toFixed(2)})`}>
        <path d="M0 -52 L44 0 L0 52 L-44 0 Z" fill={color} stroke={ink} strokeWidth="3" />
        <line x1="0" y1="-52" x2="0" y2="52" stroke={ink} strokeWidth="2" opacity="0.6" />
        <line x1="-44" y1="0" x2="44" y2="0" stroke={ink} strokeWidth="2" opacity="0.6" />
        <path d="M0 52 L0 92" stroke={ink} strokeWidth="2" opacity="0.7" />
        {tail}
      </g>
    )
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.cream} />
      <ArcStack cx={w * 0.92} cy={h * 0.06} r0={90} count={7} step={62} color={colors[0]} stroke={3} opacity="0.3" sweep={140} startAngle={140} />
      <Cloud x={w * 0.06} y={h * 0.74} scale={1.5} color={PALETTE.sand} opacity="0.85" />
      <Cloud x={w * 0.48} y={h * 0.83} scale={1.1} color={PALETTE.sand} opacity="0.6" />
      {kites}
      <ellipse cx={w * 0.5} cy={h * 0.95} rx={w * 0.5} ry={h * 0.06} fill={colors[1]} opacity="0.25" />
      <TextLines rng={rng} x={84} y={h - 96} w={w * 0.42} rows={3} rowHeight={15} thickness={3.4} opacity={0.55} />
      <DecoFrame w={w} h={h} color={ink} weight={2.2} inset={24} />
    </g>
  )
}

const packagingSet = ({ rng, w, h, colors }) => {
  const shelf = h * 0.76
  const jars = [0, 1, 2].map((i) => {
    const bw = 130
    const bh = 180 + i * 16
    const x = 96 + i * 190
    const y = shelf - bh
    const labelColor = colors[i % colors.length]
    return (
      <g key={`j${i}`}>
        <rect x={x} y={y} width={bw} height={bh} rx="16" fill={PALETTE.creamDeep} stroke={ink} strokeWidth="3.4" />
        <rect x={x - 8} y={y - 26} width={bw + 16} height="30" rx="8" fill={colors[(i + 2) % colors.length]} stroke={ink} strokeWidth="3" />
        <rect x={x + 10} y={y + bh * 0.28} width={bw - 20} height={bh * 0.42} fill={labelColor} opacity="0.9" />
        <g opacity="0.6">
          {Array.from({ length: 5 }, (_, k) => (
            <line
              key={`ln${i}-${k}`}
              x1={x + 22}
              y1={y + bh * 0.34 + k * 12}
              x2={x + bw - 22 - rng.range(0, 40)}
              y2={y + bh * 0.34 + k * 12}
              stroke={PALETTE.paper}
              strokeWidth="4"
            />
          ))}
        </g>
        <rect x={x} y={y} width={bw} height={bh} rx="16" fill="none" stroke={ink} strokeWidth="3.4" />
      </g>
    )
  })

  const cartonX = 96 + 3 * 190 + 30
  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect y={shelf} width={w} height={h - shelf} fill={PALETTE.brown} opacity="0.22" />
      <line x1="0" y1={shelf} x2={w} y2={shelf} stroke={ink} strokeWidth="5" />
      <g>{jars}</g>
      <g>
        <rect x={cartonX} y={shelf - 230} width={150} height={230} fill={PALETTE.cream} stroke={ink} strokeWidth="3.4" />
        <path d={`M${cartonX} ${shelf - 230} l75 -44 l75 44`} fill={colors[1]} stroke={ink} strokeWidth="3.4" />
        <rect x={cartonX + 16} y={shelf - 178} width={118} height={110} fill={colors[0]} opacity="0.85" />
        <path
          d={`M${cartonX + 16} ${shelf - 68} L${cartonX + 134} ${shelf - 178} M${cartonX + 16} ${shelf - 118} L${cartonX + 84} ${shelf - 178}`}
          stroke={PALETTE.paper}
          strokeWidth="4"
          opacity="0.7"
        />
      </g>
      <TextLines rng={rng} x={96} y={h - 110} w={w * 0.3} rows={2} rowHeight={15} thickness={3.4} opacity={0.55} />
      <TextLines rng={rng} x={w - 96 - w * 0.24} y={h - 110} w={w * 0.24} rows={2} rowHeight={15} thickness={3.4} opacity={0.55} />
      <DecoFrame w={w} h={h} color={ink} weight={2.2} inset={24} />
    </g>
  )
}

const signalWaves = ({ rng, w, h, colors }) => {
  const origins = [
    { x: w * 0.36, y: h * 0.44, color: colors[0] },
    { x: w * 0.66, y: h * 0.6, color: colors[1] }
  ]
  const rings = []
  origins.forEach((o, oi) => {
    for (let i = 1; i <= 26; i++) {
      rings.push(
        <circle
          key={`r${oi}-${i}`}
          cx={o.x}
          cy={o.y}
          r={i * (w * 0.022) + rng.range(-3, 3)}
          fill="none"
          stroke={o.color}
          strokeWidth={rng.range(1.4, 4.2)}
          opacity={Math.max(0.08, 0.85 - i * 0.028)}
        />
      )
    }
  })

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x="30" y="30" width={w - 60} height={h - 60} fill={PALETTE.cream} />
      {rings}
      {origins.map((o, i) => (
        <circle key={`o${i}`} cx={o.x} cy={o.y} r="9" fill={ink} />
      ))}
      <g opacity="0.9">
        <path
          d={`M${w * 0.1} ${h * 0.86} L${w * 0.44} ${h * 0.68} L${w * 0.6} ${h * 0.78} L${w * 0.9} ${h * 0.52}`}
          fill="none"
          stroke={colors[2]}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <rect x="30" y="30" width={w - 60} height={h - 60} fill="none" stroke={ink} strokeWidth="3" />
      <TextLines rng={rng} x={64} y={h - 104} w={w * 0.34} rows={3} rowHeight={14} thickness={3.2} opacity={0.5} />
      <CropMarks w={w} h={h} color={ink} inset={16} len={20} weight={1.8} />
    </g>
  )
}

/* ----------------------------------------------------------------- INNOVATION */

const controlPanel = ({ rng, w, h, colors }) => {
  const panel = { x: 48, y: 48, w: w - 96, h: h - 96 }
  const screws = [
    [panel.x + 26, panel.y + 26],
    [panel.x + panel.w - 26, panel.y + 26],
    [panel.x + 26, panel.y + panel.h - 26],
    [panel.x + panel.w - 26, panel.y + panel.h - 26]
  ]

  const dial = (cx, cy, r, ticks, color) => (
    <g key={`d${cx}${cy}`}>
      <circle cx={cx} cy={cy} r={r} fill={PALETTE.creamDeep} stroke={ink} strokeWidth="4" />
      {Array.from({ length: ticks }, (_, i) => {
        const a = (i / ticks) * Math.PI * 2 - Math.PI / 2
        return (
          <line
            key={`tk${i}`}
            x1={cx + Math.cos(a) * (r - 6)}
            y1={cy + Math.sin(a) * (r - 6)}
            x2={cx + Math.cos(a) * (r - 20)}
            y2={cy + Math.sin(a) * (r - 20)}
            stroke={ink}
            strokeWidth="3"
            opacity="0.75"
          />
        )
      })}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(-Math.PI / 3) * (r - 26)}
        y2={cy + Math.sin(-Math.PI / 3) * (r - 26)}
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r * 0.2} fill={PALETTE.gold} stroke={ink} strokeWidth="3" />
    </g>
  )

  const buttons = [
    { x: panel.x + 90, y: panel.y + panel.h - 92, shape: 'circle' },
    { x: panel.x + 170, y: panel.y + panel.h - 92, shape: 'square' },
    { x: panel.x + 250, y: panel.y + panel.h - 92, shape: 'diamond' }
  ].map((b, i) => (
    <g key={`bt${i}`}>
      {b.shape === 'circle' && <circle cx={b.x} cy={b.y} r="28" fill={colors[i % colors.length]} stroke={ink} strokeWidth="4" />}
      {b.shape === 'square' && <rect x={b.x - 25} y={b.y - 25} width="50" height="50" rx="9" fill={colors[i % colors.length]} stroke={ink} strokeWidth="4" />}
      {b.shape === 'diamond' && <rect x={b.x - 22} y={b.y - 22} width="44" height="44" fill={colors[i % colors.length]} stroke={ink} strokeWidth="4" transform={`rotate(45 ${b.x} ${b.y})`} />}
    </g>
  ))

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx="18" fill={PALETTE.brown} />
      <rect x={panel.x + 12} y={panel.y + 12} width={panel.w - 24} height={panel.h - 24} rx="12" fill={PALETTE.brownDeep} opacity="0.55" />
      <line x1={panel.x + 40} y1={panel.y + 130} x2={panel.x + panel.w - 40} y2={panel.y + 130} stroke={PALETTE.gold} strokeWidth="3" opacity="0.6" />
      {dial(panel.x + 150, panel.y + 240, 78, 12, colors[0])}
      {dial(panel.x + panel.w * 0.5, panel.y + 240, 78, 12, colors[1])}
      <g>
        <rect x={panel.x + panel.w - 300} y={panel.y + 180} width="220" height="26" rx="13" fill={PALETTE.creamDeep} stroke={ink} strokeWidth="3" />
        <rect x={panel.x + panel.w - 230} y={panel.y + 172} width="42" height="42" rx="8" fill={colors[2]} stroke={ink} strokeWidth="3.4" />
      </g>
      {buttons}
      <g>
        {screws.map(([sx, sy], i) => (
          <g key={`sc${i}`}>
            <circle cx={sx} cy={sy} r="12" fill={PALETTE.gold} stroke={ink} strokeWidth="3" />
            <line x1={sx - 6} y1={sy} x2={sx + 6} y2={sy} stroke={ink} strokeWidth="3" />
          </g>
        ))}
      </g>
      <TextLines rng={rng} x={panel.x + 300} y={panel.y + panel.h - 96} w={panel.w * 0.28} rows={3} rowHeight={14} thickness={3.2} opacity={0.7} color={PALETTE.cream} />
      <CropMarks w={w} h={h} color={ink} inset={16} len={22} weight={1.8} />
    </g>
  )
}

const paperCircuit = ({ rng, w, h, colors, uid }) => {
  const traces = []
  const nodes = []
  let cursorX = 120
  for (let i = 0; i < 5; i++) {
    const y = 170 + i * 150
    const bend = cursorX + rng.range(90, 190)
    const endX = bend + rng.range(90, 210)
    traces.push(
      <path
        key={`p${i}`}
        d={`M120 ${y} L${bend} ${y} L${bend + 40} ${y - 40} L${endX} ${y - 40}`}
        fill="none"
        stroke={PALETTE.goldDeep}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
    nodes.push(<circle key={`n${i}`} cx={bend} cy={y} r="13" fill={PALETTE.gold} stroke={ink} strokeWidth="3" />)
    nodes.push(<circle key={`n2${i}`} cx={endX} cy={y - 40} r="10" fill={colors[i % colors.length]} stroke={ink} strokeWidth="3" />)
    cursorX += 20
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect width={w} height={h} fill={`url(#dots-${uid})`} opacity="0.25" />
      <g>{traces}</g>
      <g>{nodes}</g>
      <g transform={`translate(${w * 0.72} ${h * 0.3})`}>
        <circle cx="0" cy="0" r="66" fill={PALETTE.creamDeep} stroke={ink} strokeWidth="4" />
        <circle cx="0" cy="0" r="44" fill={PALETTE.gold} opacity="0.7" />
        <text x="0" y="9" textAnchor="middle" fontSize="26" fontFamily="monospace" fill={ink} opacity="0.7">+</text>
      </g>
      <g transform={`translate(${w * 0.72} ${h * 0.72})`}>
        <path d="M-34 24 L0 -30 L34 24 Z" fill={colors[1]} stroke={ink} strokeWidth="3.4" />
        <line x1="-34" y1="24" x2="34" y2="24" stroke={ink} strokeWidth="7" />
        <line x1="0" y1="-30" x2="0" y2="-62" stroke={PALETTE.goldDeep} strokeWidth="7" />
        <line x1="0" y1="24" x2="0" y2="58" stroke={PALETTE.goldDeep} strokeWidth="7" />
      </g>
      <line x1={w * 0.5} y1="40" x2={w * 0.5} y2={h - 40} stroke={ink} strokeWidth="2" strokeDasharray="12 14" opacity="0.4" />
      <TextLines rng={rng} x={110} y={h - 128} w={w * 0.34} rows={3} rowHeight={14} thickness={3.2} opacity={0.5} />
      <CropMarks w={w} h={h} color={ink} inset={18} len={22} weight={1.8} />
    </g>
  )
}

const kineticArms = ({ rng, w, h, colors }) => {
  const gears = [
    { x: w * 0.34, y: h * 0.2, r: 96, teeth: 16, color: colors[1] },
    { x: w * 0.66, y: h * 0.3, r: 68, teeth: 12, color: colors[2] },
    { x: w * 0.5, y: h * 0.13, r: 44, teeth: 10, color: colors[0] }
  ].map((g, gi) => (
    <g key={`g${gi}`} opacity="0.75">
      <circle cx={g.x} cy={g.y} r={g.r} fill={g.color} />
      {Array.from({ length: g.teeth }, (_, i) => {
        const a = (i / g.teeth) * Math.PI * 2
        return (
          <rect
            key={`t${gi}-${i}`}
            x={g.x + Math.cos(a) * g.r - 8}
            y={g.y + Math.sin(a) * g.r - 8}
            width="16"
            height="16"
            fill={g.color}
            transform={`rotate(${(a * 180) / Math.PI} ${g.x + Math.cos(a) * g.r} ${g.y + Math.sin(a) * g.r})`}
          />
        )
      })}
      <circle cx={g.x} cy={g.y} r={g.r * 0.24} fill={PALETTE.paper} />
    </g>
  ))

  const arms = [
    { y: h * 0.38, angle: -14, len: 320 },
    { y: h * 0.5, angle: 10, len: 260 },
    { y: h * 0.61, angle: 26, len: 300 },
    { y: h * 0.72, angle: -6, len: 230 }
  ].map((a, i) => (
    <g key={`a${i}`} transform={`translate(${w / 2} ${a.y}) rotate(${a.angle})`} opacity={1 - i * 0.07}>
      <rect x={-14} y={-16} width="28" height="32" fill={ink} />
      <ArrowBoard x={0} y={-22} w={a.len} h={44} dir={i % 2 === 0 ? 1 : -1} color={colors[i % colors.length]} />
      {Array.from({ length: rng.int(4, 8) }, (_, k) => (
        <circle
          key={`dot${i}-${k}`}
          cx={a.len * 0.28 + k * 26}
          cy={0}
          r="5"
          fill={PALETTE.paper}
          opacity="0.75"
        />
      ))}
    </g>
  ))

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.cream} />
      <Sunburst cx={w / 2} cy={h * 0.12} r={w * 0.5} rays={28} color={PALETTE.sand} opacity="0.35" inner={0.7} />
      {gears}
      <rect x={w / 2 - 16} y={h * 0.1} width="32" height={h * 0.86} fill={PALETTE.brown} stroke={ink} strokeWidth="3" />
      {arms}
      <g transform={`translate(${w / 2} ${h * 0.9})`}>
        <circle r="40" fill="none" stroke={PALETTE.gold} strokeWidth="12" />
        <rect x="-8" y="34" width="16" height="60" fill={PALETTE.gold} />
        <rect x="-30" y="78" width="34" height="14" fill={PALETTE.gold} />
      </g>
      <TextLines rng={rng} x={64} y={h - 84} w={w * 0.4} rows={2} rowHeight={15} thickness={3.4} opacity={0.5} />
      <DecoFrame w={w} h={h} color={ink} weight={2.2} inset={24} />
    </g>
  )
}

const soundRings = ({ rng, w, h, colors }) => {
  const cx = w * 0.44
  const cy = h * 0.52
  const rings = []
  let r = 40
  for (let i = 0; i < 34; i++) {
    const wobble = rng.range(-0.06, 0.06)
    r += rng.range(9, 22)
    const d = []
    const steps = 72
    for (let s = 0; s <= steps; s++) {
      const a = (s / steps) * Math.PI * 2
      const rr = r * (1 + wobble * Math.sin(a * rng.int(2, 5)) * 0.5)
      d.push(`${s === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`)
    }
    rings.push(
      <path
        key={`sr${i}`}
        d={`${d.join(' ')} Z`}
        fill="none"
        stroke={colors[i % colors.length]}
        strokeWidth={rng.range(1.6, 5)}
        opacity={Math.max(0.12, 0.9 - i * 0.022)}
      />
    )
  }

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect x="34" y="34" width={w - 68} height={h - 68} fill={PALETTE.cream} />
      {rings}
      <circle cx={cx} cy={cy} r="9" fill={ink} />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2
        const r0 = Math.min(w, h) * 0.44
        return (
          <line
            key={`ot${i}`}
            x1={cx + Math.cos(a) * (r0 - 12)}
            y1={cy + Math.sin(a) * (r0 - 12)}
            x2={cx + Math.cos(a) * r0}
            y2={cy + Math.sin(a) * r0}
            stroke={ink}
            strokeWidth="2"
            opacity="0.45"
          />
        )
      })}
      <line x1="34" y1={h - 78} x2={w - 34} y2={h - 78} stroke={ink} strokeWidth="2" opacity="0.5" />
      <g transform={`translate(${cx} ${cy - Math.min(w, h) * 0.44 - 26})`}>
        <path d="M-14 22 L0 -10 L14 22 Z" fill={colors[1]} stroke={ink} strokeWidth="3" />
      </g>
      <TextLines rng={rng} x={70} y={h - 60} w={w * 0.3} rows={1} thickness={3.4} opacity={0.55} />
      <TextLines rng={rng} x={w - 70 - w * 0.22} y={h - 60} w={w * 0.22} rows={1} thickness={3.4} opacity={0.55} />
      <rect x="34" y="34" width={w - 68} height={h - 68} fill="none" stroke={ink} strokeWidth="3" />
    </g>
  )
}

const exhibitionKit = ({ rng, w, h, colors }) => {
  const floorY = h * 0.82
  const artefacts = Array.from({ length: 5 }, (_, i) => {
    const x = 120 + i * 170
    const s = rng.range(0.7, 1.15)
    return (
      <g key={`ar${i}`} transform={`translate(${x} ${floorY - 10}) scale(${s})`}>
        <rect x="-42" y="-92" width="84" height="92" fill={colors[i % colors.length]} stroke={ink} strokeWidth="3.4" />
        <rect x="-30" y="-80" width="60" height="60" fill={PALETTE.paper} opacity="0.85" />
        <rect x="-46" y="-100" width="92" height="12" fill={PALETTE.gold} stroke={ink} strokeWidth="2.4" />
      </g>
    )
  })

  const panels = [
    { x: 90, skew: 12 },
    { x: w * 0.5 - 130, skew: 0 },
    { x: w - 320, skew: -12 }
  ].map((p, i) => (
    <g key={`pn${i}`} transform={`translate(${p.x} ${h * 0.14})`} opacity="0.96">
      <path
        d={`M0 0 L${230} ${p.skew} L${230} ${h * 0.5 + p.skew} L0 ${h * 0.5} Z`}
        fill={i === 1 ? PALETTE.creamDeep : PALETTE.cream}
        stroke={ink}
        strokeWidth="3.4"
      />
      <rect x="22" y="26" width="120" height="14" fill={ink} opacity="0.55" />
      <TextLines rng={rng} x={22} y={70} w={186} rows={5} rowHeight={22} thickness={5} opacity={0.4} />
      <circle cx={160} cy={h * 0.34} r="34" fill={colors[i % colors.length]} opacity="0.8" />
    </g>
  ))

  return (
    <g>
      <rect width={w} height={h} fill={PALETTE.paper} />
      <rect y={floorY} width={w} height={h - floorY} fill={PALETTE.sand} />
      <g>{panels}</g>
      <line x1="0" y1={floorY} x2={w} y2={floorY} stroke={ink} strokeWidth="4" />
      <path d={`M60 ${floorY + 40} L${w - 60} ${floorY + 40} M120 ${h - 40} L${w - 120} ${h - 40}`} stroke={ink} strokeWidth="2" strokeDasharray="14 12" opacity="0.4" fill="none" />
      {artefacts}
      <g transform={`translate(${w - 150} ${h - 78})`}>
        <path d="M-56 0 L56 0 L44 44 L-44 44 Z" fill={PALETTE.brown} stroke={ink} strokeWidth="3.4" />
        <path d="M-56 0 L56 0 L64 -18 L-64 -18 Z" fill={PALETTE.brownDeep} stroke={ink} strokeWidth="3" />
      </g>
      <TextLines rng={rng} x={70} y={h - 70} w={w * 0.26} rows={2} rowHeight={14} thickness={3.2} opacity={0.5} />
      <CropMarks w={w} h={h} color={ink} inset={18} len={22} weight={1.8} />
    </g>
  )
}

/** Guard against palettes with fewer entries than a motif expects. */
function COLORS_SAFE(rng, colors) {
  return colors[rng.int(0, colors.length - 1)]
}

export const MOTIFS = {
  weaveGrid,
  threadMap,
  swatchGrid,
  loomDraft,
  wovenBorder,
  pressPoster,
  editorialSpread,
  typeSpecimen,
  risoZine,
  wideCover,
  identitySystem,
  brushRhythm,
  kiteSky,
  packagingSet,
  signalWaves,
  controlPanel,
  paperCircuit,
  kineticArms,
  soundRings,
  exhibitionKit
}
