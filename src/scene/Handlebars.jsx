import { PALETTE } from '../data/palette.js'

const INK = PALETTE.ink
const SKIN = '#d8a97f'
const SKIN_SHADE = '#b8834f'
const SLEEVE = PALETTE.olive
const SLEEVE_DEEP = PALETTE.oliveDeep

/**
 * First-person bicycle POV.
 *
 * The bar, grips, hands and sleeves are drawn once in screen space at the
 * bottom of the frame. The whole group is later swung by the camera turn, so
 * the rider's hands steer into whichever direction they chose.
 */

function Hand({ side = 1 }) {
  return (
    <g transform={`scale(${side} 1)`}>
      {/* forearm falling out of frame */}
      <path
        d="M44 116 C14 178 6 244 18 322 L182 322 C196 236 190 166 168 108 Z"
        fill={SLEEVE}
        stroke={INK}
      />
      <path d="M30 250 L188 250" stroke={SLEEVE_DEEP} strokeWidth="10" fill="none" opacity="0.7" />
      {/* cuff */}
      <path d="M26 112 C70 66 146 62 186 108 L172 150 C138 112 76 116 42 154 Z" fill={SLEEVE_DEEP} stroke={INK} />
      {/* back of hand */}
      <path
        d="M-58 38 C-78 0 -62 -50 -14 -64 C48 -82 126 -64 142 -18 C154 24 116 62 60 64 C14 66 -42 62 -58 38 Z"
        fill={SKIN}
        stroke={INK}
      />
      {/* knuckles */}
      <path d="M-16 -56 C-6 -22 -6 14 -16 44" stroke={SKIN_SHADE} strokeWidth="7" fill="none" opacity="0.8" />
      <path d="M30 -60 C40 -24 40 16 30 48" stroke={SKIN_SHADE} strokeWidth="7" fill="none" opacity="0.8" />
      <path d="M74 -58 C82 -24 82 16 74 46" stroke={SKIN_SHADE} strokeWidth="7" fill="none" opacity="0.8" />
      {/* fingertips curling over the front of the bar */}
      <path d="M100 -40 C128 -36 142 -12 136 14" stroke={INK} strokeWidth="5" fill="none" />
      <path d="M58 -62 C86 -62 108 -44 114 -18" stroke={INK} strokeWidth="5" fill="none" />
      {/* thumb */}
      <path d="M-44 -10 C-84 -14 -106 18 -96 52 C-86 84 -40 92 -16 70 Z" fill={SKIN} stroke={INK} />
      <path d="M-70 22 C-52 10 -30 10 -18 20" stroke={SKIN_SHADE} strokeWidth="6" fill="none" opacity="0.75" />
    </g>
  )
}

function Grip({ side = 1 }) {
  return (
    <g transform={`scale(${side} 1)`}>
      <rect x="-30" y="-30" width="300" height="60" rx="30" fill={PALETTE.brownDeep} stroke={INK} />
      <path d="M-6 -14 L242 -14 M-6 14 L242 14" stroke={PALETTE.brown} strokeWidth="6" fill="none" opacity="0.65" />
      <circle cx="286" cy="0" r="34" fill={PALETTE.brown} stroke={INK} />
      <circle cx="286" cy="0" r="13" fill={PALETTE.ink} opacity="0.6" />
    </g>
  )
}

export default function Handlebars() {
  return (
    <g>
      {/* front fork + lamp peeking into frame */}
      <path d="M-34 1200 L-22 976 L22 976 L34 1200 Z" fill={PALETTE.forest} stroke={INK} />
      <path d="M-22 976 C-46 926 -32 878 0 866 C32 878 46 926 22 976 Z" fill={PALETTE.forestDeep} stroke={INK} />
      <circle cx="0" cy="920" r="26" fill={PALETTE.gold} stroke={INK} />
      <circle cx="0" cy="920" r="11" fill={PALETTE.cream} stroke={INK} />

      {/* head tube + stem */}
      <path d="M-30 1000 L-26 870 L26 870 L30 1000 Z" fill={PALETTE.forest} stroke={INK} />
      <path d="M-46 990 L46 990 L38 1032 L-38 1032 Z" fill={PALETTE.forestDeep} stroke={INK} />

      {/* the bar itself — a broad sweeping arc */}
      <path d="M-724 1108 C-382 1024 382 1024 724 1108" fill="none" stroke={INK} strokeWidth="46" strokeLinecap="round" />
      <path d="M-724 1108 C-382 1024 382 1024 724 1108" fill="none" stroke={PALETTE.brown} strokeWidth="30" strokeLinecap="round" />
      <path d="M-700 1098 C-378 1026 378 1026 700 1098" fill="none" stroke={PALETTE.sand} strokeWidth="7" opacity="0.4" />

      {/* brake levers */}
      <path d="M-404 1044 C-462 1078 -486 1148 -452 1188" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
      <path d="M-404 1044 C-462 1078 -486 1148 -452 1188" fill="none" stroke={PALETTE.sand} strokeWidth="10" strokeLinecap="round" />
      <path d="M404 1044 C462 1078 486 1148 452 1188" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
      <path d="M404 1044 C462 1078 486 1148 452 1188" fill="none" stroke={PALETTE.sand} strokeWidth="10" strokeLinecap="round" />

      {/* bell */}
      <g transform="translate(-330 1024)">
        <path d="M-42 26 C-42 -26 42 -26 42 26 Z" fill={PALETTE.gold} stroke={INK} />
        <rect x="-48" y="24" width="96" height="14" rx="7" fill={PALETTE.goldDeep} stroke={INK} />
        <circle cx="0" cy="-16" r="9" fill={PALETTE.cream} stroke={INK} />
      </g>

      {/* hands on the grips */}
      <g transform="translate(-690 1100) rotate(-12)">
        <Grip side={-1} />
        <Hand side={-1} />
      </g>
      <g transform="translate(690 1100) rotate(12)">
        <Grip side={1} />
        <Hand side={1} />
      </g>
    </g>
  )
}
