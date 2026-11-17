import { useState } from 'react'

import { CATEGORIES } from '../../data/categories.js'
import { PALETTE } from '../../data/palette.js'

/**
 * The one signpost.
 *
 * A single pole with four arrow boards — not four signs, not a menu in
 * disguise. It is drawn entirely in world units with the foot of the pole at
 * the origin, so the scene can plant it on the road with one translate, and
 * its line weight follows the same `--pw` pen as the rest of the landscape.
 * Drawn inside the scene SVG so the post can be approached by the ride.
 */

const INK = PALETTE.ink

/* Board geometry, in world units. `reach` matches projection.SIGNPOST.reach. */
const BOARD = { tail: 30, body: 590, tip: 132, half: 58, chamfer: 22 }
const ROW_TOP = -905
const ROW_STEP = 130

/** Chamfered plank with a pointed nose, mirrored by `dir`. */
function boardPath(dir, inset = 0) {
  const { tail, body, tip, half, chamfer } = BOARD
  const x0 = dir * (tail + inset)
  const x1 = dir * (tail + body - inset)
  const x2 = dir * (tail + body + tip - inset * 1.7)
  const h = half - inset
  const c = dir * chamfer
  return [
    `M${x0 + c} ${-h}`,
    `L${x1} ${-h}`,
    `L${x2} 0`,
    `L${x1} ${h}`,
    `L${x0 + c} ${h}`,
    `L${x0} ${h - chamfer}`,
    `L${x0} ${-h + chamfer}`,
    'Z'
  ].join(' ')
}

/** A small deco diamond, centred on `cy`, spanning `half` in every direction. */
function diamond(cy, half) {
  return `M0 ${cy - half} L${half} ${cy} L0 ${cy + half} L${-half} ${cy} Z`
}

export default function Signpost({ onChoose, onHover, live = true }) {
  const [hovered, setHovered] = useState(null)

  const enter = (id) => {
    setHovered(id)
    if (onHover) onHover(id)
  }

  const leave = () => {
    setHovered(null)
    if (onHover) onHover(null)
  }

  return (
    <g className="signpost">
      {/* the ground the post is planted in */}
      <ellipse className="signpost__shadow" cx="0" cy="8" rx="176" ry="26" />
      <path className="signpost__mound" d={diamond(6, 90)} />
      <rect className="signpost__base" x="-66" y="-42" width="132" height="42" rx="6" />

      {/* the pole */}
      <rect className="signpost__pole" x="-27" y="-1000" width="54" height="1000" />
      <path className="signpost__grain" d="M-9 -986 L-9 -30 M9 -986 L9 -30" />
      <g className="signpost__bands">
        {[-360, -560, -760, -960].map((y) => (
          <rect key={y} className="signpost__band" x="-31" y={y} width="62" height="14" rx="3" />
        ))}
      </g>
      <rect className="signpost__collar" x="-42" y="-1016" width="84" height="20" rx="4" />
      <rect className="signpost__capital" x="-56" y="-1038" width="112" height="24" rx="5" />
      <path className="signpost__finial" d={diamond(-1030, 28)} />

      {/* four boards, four directions, each one its own control */}
      {CATEGORIES.map((category, index) => {
        const dir = category.side === 'right' ? 1 : -1
        const y = ROW_TOP + index * ROW_STEP
        const active = hovered === category.id
        const centre = dir * (BOARD.tail + BOARD.body / 2)

        return (
          <g
            key={category.id}
            className="signpost-arrow"
            data-active={active}
            data-side={category.side}
            data-cursor="active"
            transform={`translate(0 ${y}) scale(${active ? 1.055 : 1})`}
            style={{ '--accent': category.accent }}
            role="button"
            tabIndex={live ? 0 : -1}
            aria-label={`${category.label} — ${category.tagline}`}
            onPointerEnter={() => enter(category.id)}
            onPointerLeave={leave}
            onFocus={() => enter(category.id)}
            onBlur={leave}
            onClick={() => onChoose && onChoose(category.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault()
                if (onChoose) onChoose(category.id)
              }
            }}
          >
            <path className="signpost-arrow__board" d={boardPath(dir)} />
            <path className="signpost-arrow__field" d={boardPath(dir, 10)} />
            <path className="signpost-arrow__rule" d={boardPath(dir, 18)} />
            <line
              className="signpost-arrow__edge"
              x1={dir * (BOARD.tail + 26)}
              y1={-(BOARD.half - 26)}
              x2={dir * (BOARD.tail + BOARD.body - 26)}
              y2={-(BOARD.half - 26)}
            />
            <line
              className="signpost-arrow__edge"
              x1={dir * (BOARD.tail + 26)}
              y1={BOARD.half - 26}
              x2={dir * (BOARD.tail + BOARD.body - 26)}
              y2={BOARD.half - 26}
            />
            {/* a hit area a little larger than the board, for thumbs */}
            <rect
              className="signpost-arrow__hit"
              x={dir > 0 ? -BOARD.tail : -(BOARD.tail + BOARD.body + BOARD.tip)}
              y={-BOARD.half - 26}
              width={BOARD.tail + BOARD.body + BOARD.tip}
              height={BOARD.half * 2 + 52}
            />
            <text
              className="signpost-arrow__label"
              x={centre}
              y="0"
              dominantBaseline="central"
              textAnchor="middle"
            >
              {category.label}
            </text>
            <path className="signpost-arrow__medal" d={diamond(0, 34)} />
            <text className="signpost-arrow__numeral" x="0" y="0" dominantBaseline="central" textAnchor="middle">
              {category.numeral}
            </text>
          </g>
        )
      })}
    </g>
  )
}
