import { useMemo } from 'react'

import { ArtworkDefs } from './primitives.jsx'
import { MOTIFS } from './motifs.jsx'
import { makeRng } from '../lib/random.js'
import { CATEGORY_PALETTES } from '../data/palette.js'

/**
 * Canvas shapes the exhibition hangs work at. Because every project owns a
 * different motif *and* a different ratio, the galleries are asymmetric by
 * construction rather than by hand-placed exceptions.
 */
export const RATIO_DIMENSIONS = {
  square: [1000, 1000],
  portrait: [840, 1120],
  tall: [720, 1200],
  landscape: [1220, 840],
  wide: [1440, 760]
}

export const ratioValue = (ratio) => {
  const [w, h] = RATIO_DIMENSIONS[ratio] || RATIO_DIMENSIONS.square
  return w / h
}

export default function Artwork({
  motif,
  ratio = 'square',
  category = 'weaving',
  seed,
  colors,
  title,
  className = ''
}) {
  const [w, h] = RATIO_DIMENSIONS[ratio] || RATIO_DIMENSIONS.square
  const key = String(seed ?? motif).replace(/[^a-z0-9]+/gi, '-').toLowerCase()
  const uid = `${key}-${ratio}`

  const node = useMemo(() => {
    const engine = MOTIFS[motif]
    if (!engine) return null
    const rng = makeRng(`${seed ?? motif}::${ratio}`)
    const palette = colors || CATEGORY_PALETTES[category] || CATEGORY_PALETTES.weaving
    return engine({ rng, w, h, colors: palette, uid })
  }, [motif, ratio, seed, colors, category, uid, w, h])

  if (!node) return null

  return (
    <svg
      className={`artwork ${className}`.trim()}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title || `${motif} artwork`}
    >
      <ArtworkDefs uid={uid} />
      {node}
    </svg>
  )
}
