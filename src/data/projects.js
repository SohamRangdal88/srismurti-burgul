/**
 * The exhibition catalogue — built from the actual portfolio material.
 *
 * Every entry below corresponds to one folder in `Portfolio/`. The images are
 * the real project images (copied into `src/assets/portfolio/<category>/<id>`),
 * imported through Vite so they are hashed and served with a correct, relative
 * URL. Nothing here is generated: the plates show the original artwork.
 *
 * Titles are the original folder names. Written fields (intro, objective,
 * process, …) are intentionally left empty until the real notes are available —
 * see "ADDING YOUR OWN NOTES" at the bottom of this file. The interface hides
 * any field that has not been filled in yet, so nothing is invented on screen.
 *
 * Folder → category mapping (as agreed):
 *   WEAVING     ← Weave design/Weaving · Surface development/Embroidery
 *   PRINT       ← Surface development/Print design 1 · Print design 2
 *   GRAPHIC     ← Graphic Design/Blinkit shoot · IDM Shoot · Craft and Innovation/Craft
 *   INNOVATION  ← Craft and Innovation/Innovation · Surface development/Classroom project
 */

const IMAGE_MODULES = import.meta.glob('../assets/portfolio/**/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default'
})

/** Ordered image URLs for one portfolio folder, e.g. `imagesFrom('weaving/weaving')`. */
const imagesFrom = (folder) =>
  Object.entries(IMAGE_MODULES)
    .filter(([path]) => path.includes(`/portfolio/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url)

/**
 * Every project photograph in the portfolio was captured at 1024 × 726, so the
 * frames are built at that true ratio. Nothing is stretched or cropped.
 */
export const ART_RATIO = 1024 / 726

const RAW = [
  /* ------------------------------------------------------------------ WEAVING */
  {
    id: 'weaving',
    category: 'weaving',
    title: 'Weaving',
    folder: 'Weave design/Weaving',
    accent: '#b25c3b',
    featured: true,
    images: imagesFrom('weaving/weaving'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },
  {
    id: 'embroidery',
    category: 'weaving',
    title: 'Embroidery',
    folder: 'Surface development/Embroidery',
    accent: '#c8792f',
    images: imagesFrom('weaving/embroidery'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },

  /* -------------------------------------------------------------------- PRINT */
  {
    id: 'print-design-1',
    category: 'print',
    title: 'Print Design 1',
    folder: 'Surface development/Print design 1',
    accent: '#2f6b62',
    featured: true,
    images: imagesFrom('print/print-design-1'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },
  {
    id: 'print-design-2',
    category: 'print',
    title: 'Print Design 2',
    folder: 'Surface development/Print design 2',
    accent: '#546c80',
    images: imagesFrom('print/print-design-2'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },

  /* ------------------------------------------------------------------ GRAPHIC */
  {
    id: 'blinkit-shoot',
    category: 'graphic',
    title: 'Blinkit Shoot',
    folder: 'Graphic Design/Blinkit shoot',
    accent: '#c8792f',
    featured: true,
    images: imagesFrom('graphic/blinkit-shoot'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },
  {
    id: 'idm-shoot',
    category: 'graphic',
    title: 'IDM Shoot',
    folder: 'Graphic Design/IDM Shoot',
    accent: '#2f6b62',
    images: imagesFrom('graphic/idm-shoot'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },
  {
    id: 'craft',
    category: 'graphic',
    title: 'Craft',
    folder: 'Craft and Innovation/Craft',
    accent: '#b25c3b',
    images: imagesFrom('graphic/craft'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },

  /* --------------------------------------------------------------- INNOVATION */
  {
    id: 'innovation',
    category: 'innovation',
    title: 'Innovation',
    folder: 'Craft and Innovation/Innovation',
    accent: '#7b93a6',
    featured: true,
    images: imagesFrom('innovation/innovation'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  },
  {
    id: 'classroom-project',
    category: 'innovation',
    title: 'Classroom Project',
    folder: 'Surface development/Classroom project',
    accent: '#2f6b62',
    images: imagesFrom('innovation/classroom-project'),
    subtitle: '',
    year: '',
    medium: '',
    role: '',
    intro: '',
    objective: '',
    challenge: '',
    inspiration: '',
    process: [],
    tools: [],
    iterations: [],
    outcome: ''
  }
]

export const PROJECTS = RAW.map((project) => ({
  ...project,
  cover: project.images[0] ?? null,
  gallery: project.images.slice(1)
}))

export const PROJECTS_BY_CATEGORY = PROJECTS.reduce((acc, project) => {
  if (!acc[project.category]) acc[project.category] = []
  acc[project.category].push(project)
  return acc
}, {})

export const getProject = (id) => PROJECTS.find((p) => p.id === id) || null

export const getProjectNeighbours = (id) => {
  const index = PROJECTS.findIndex((p) => p.id === id)
  if (index === -1) return { previous: null, next: null }
  const list = PROJECTS_BY_CATEGORY[PROJECTS[index].category]
  const localIndex = list.findIndex((p) => p.id === id)
  return {
    previous: list[(localIndex - 1 + list.length) % list.length],
    next: list[(localIndex + 1) % list.length]
  }
}

/**
 * ADDING YOUR OWN NOTES
 *
 * The written fields are empty on purpose — no description, objective, process
 * or outcome has been invented. To fill a project in, edit its entry above:
 *
 *   subtitle:    'A one-line description of the work',
 *   year:        '2025',
 *   medium:      'Materials, process, format',
 *   role:        'What you did on it',
 *   intro:       'An opening paragraph.',
 *   objective:   'What the project had to do.',
 *   challenge:   'The central difficulty.',
 *   inspiration: 'Where it came from.',
 *   process:     [{ step: 'Step name', note: 'What happened in that step.' }],
 *   tools:       ['Tool or technique', '…'],
 *   iterations:  [{ label: 'Draft name', note: 'What changed.' }],
 *   outcome:     'How it ended.'
 *
 * Any field left empty is simply not rendered, so you can add notes a few at a
 * time without ever showing a half-finished page.
 */
