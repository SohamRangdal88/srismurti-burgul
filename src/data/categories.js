/**
 * The four directions of the signpost. Order in this array is the order the
 * arrow boards are stacked on the pole, top to bottom.
 */
export const CATEGORIES = [
  {
    id: 'weaving',
    label: 'WEAVING',
    numeral: 'I',
    side: 'left',
    yaw: -32,
    accent: '#b25c3b',
    accentSoft: '#c8792f',
    strap: 'Thread · Loom · Material',
    tagline: 'Where thread becomes structure.',
    description:
      'Textile work, woven surfaces and material research. Cloth treated as a way of thinking: grids, tension, repetition, patience.',
    atmosphere:
      'Warm and tactile. Late afternoon light falling through a loom shed onto dust and fibre.',
    motif: 'weave',
    entryLine: 'The loom is the first grid ever invented.'
  },
  {
    id: 'print',
    label: 'PRINT DESIGN',
    numeral: 'II',
    side: 'right',
    yaw: 30,
    accent: '#2f6b62',
    accentSoft: '#7b93a6',
    strap: 'Paper · Ink · Press',
    tagline: 'Ink that has to commit.',
    description:
      'Posters, editorial spreads, type specimens and print texture. Work that lives on paper, where every mark is a decision you cannot undo.',
    atmosphere:
      'Cool and considered. A print room at dawn, ink rollers, damp paper, registration marks.',
    motif: 'print',
    entryLine: 'Paper forgives nothing, and that is the point.'
  },
  {
    id: 'graphic',
    label: 'GRAPHIC DESIGN',
    numeral: 'III',
    side: 'left',
    yaw: -44,
    accent: '#c8792f',
    accentSoft: '#c8a24c',
    strap: 'Mark · Type · Identity',
    tagline: 'Shape as an argument.',
    description:
      'Visual identity, experimental typography, poster systems and geometric illustration. Design used to make an idea impossible to ignore.',
    atmosphere:
      'Bold and declarative. A painted festival wall vibrating in the heat of the afternoon.',
    motif: 'deco',
    entryLine: 'A mark is only good if it survives being made small.'
  },
  {
    id: 'innovation',
    label: 'INNOVATION',
    numeral: 'IV',
    side: 'right',
    yaw: 42,
    accent: '#7b93a6',
    accentSoft: '#2f6b62',
    strap: 'Ideas · Systems · Play',
    tagline: 'Prototypes before opinions.',
    description:
      'Conceptual work, speculative systems and experiments. Interfaces, instruments and objects built to test whether an idea is worth keeping.',
    atmosphere:
      'Curious and open. A workshop bench at night, dials ticking, blueprints half unfolded.',
    motif: 'diagram',
    entryLine: 'Build the smallest version of the idea that can still surprise you.'
  }
]

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || null
