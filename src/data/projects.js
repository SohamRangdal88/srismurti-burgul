/**
 * The exhibition catalogue.
 *
 * Each project is a standalone artwork rendered by the generative SVG art
 * engine (`src/art`), seeded by `seed` so it is stable across renders.
 * `motif` selects the composition engine, `ratio` its canvas shape, which is
 * what lets the galleries hang work at genuinely different sizes.
 */
export const PROJECTS = [
  /* ------------------------------------------------------------------ WEAVING */
  {
    id: 'loom-songs',
    category: 'weaving',
    title: 'Loom Songs',
    subtitle: 'A series of handwoven panels scored like music',
    year: '2025',
    medium: 'Handloom cotton, natural dye, supplementary weft',
    role: 'Designer & weaver',
    motif: 'weaveGrid',
    ratio: 'portrait',
    accent: '#b25c3b',
    featured: true,
    intro:
      'Six woven panels that translate the rhythmic counting songs sung by weavers into visible structure. Each panel is one verse.',
    objective:
      'Preserve an oral weaving rhythm as a physical object, so the sound of the loom survives even when nobody is at the loom.',
    challenge:
      'A song has duration; a cloth has width. Translating one into the other without turning the result into a literal diagram.',
    inspiration:
      'Recordings collected in Solapur weaving houses, where the shuttle keeps time and the counting is spoken out loud.',
    process: [
      { step: 'Listen', note: 'Recorded nine counting songs and mapped syllable stress to beat counts.' },
      { step: 'Score', note: 'Drew each verse as a linear score: duration on the warp, pitch on the weft.' },
      { step: 'Draft', note: 'Converted the score into a thread-by-thread loom draft of 240 ends.' },
      { step: 'Weave', note: 'Wove all six panels on a pit loom, one verse per panel, adjusting tension by ear.' }
    ],
    tools: ['Pit loom', 'Natural indigo & madder', 'Syllable-to-grid scoring', 'Hand-drawn loom drafts'],
    iterations: [
      { label: 'First draft', note: 'Too literal — the panels read as graphs, not cloth.' },
      { label: 'Second draft', note: 'Removed all notation from the surface; kept only the rhythm.' },
      { label: 'Final', note: 'Stress marks appear only where the song breaks its own pattern.' }
    ],
    outcome:
      'The series hangs as a single continuous rhythm when read left to right, and is now used as a teaching aid for new weavers learning the songs.'
  },
  {
    id: 'thread-atlas',
    category: 'weaving',
    title: 'Thread Atlas',
    subtitle: 'The weaving district, redrawn in warp and weft',
    year: '2024',
    medium: 'Woven jacquard map, mercerised cotton',
    role: 'Concept & textile design',
    motif: 'threadMap',
    ratio: 'wide',
    accent: '#c8792f',
    intro:
      'A 4 metre woven map of the weaving district: every street a warp thread, every river a weft, every workshop a small dense knot.',
    objective:
      'Make a map you can touch — one that carries the density of the neighbourhood rather than just its outline.',
    challenge:
      'Density is the whole story. A conventional map flattens it; the weave had to make the number of looms visible at a glance.',
    inspiration:
      'Walking the district at dusk and watching lamp-lit windows count themselves street by street.',
    process: [
      { step: 'Survey', note: 'Logged 312 workshops by hand, noting active loom counts.' },
      { step: 'Encode', note: 'Assigned loom density to picks-per-centimetre across the cloth.' },
      { step: 'Proof', note: 'Wove six small proofs to test how much density the eye could actually read.' },
      { step: 'Weave', note: 'Produced the final map in three connected panels on a jacquard loom.' }
    ],
    tools: ['Jacquard loom', 'Field survey notes', 'Density encoding system', 'Panel joining'],
    iterations: [
      { label: 'Version A', note: 'Roads too even — the district looked like a grid city.' },
      { label: 'Version B', note: 'Introduced irregular warp spacing to reflect the real street widths.' },
      { label: 'Final', note: 'Added a weft of raw silk to mark the river so it glints in raking light.' }
    ],
    outcome:
      'Exhibited at a district craft fair where weavers found their own workshops on it, then used to argue about which streets had grown.'
  },
  {
    id: 'indigo-index',
    category: 'weaving',
    title: 'Indigo Index',
    subtitle: 'A dye library, catalogued as cloth',
    year: '2024',
    medium: 'Dyed cotton swatches, paper index, wooden box',
    role: 'Material research',
    motif: 'swatchGrid',
    ratio: 'square',
    accent: '#2f6b62',
    intro:
      'Ninety-six dye swatches arranged as a physical index, each one a single variable changed against its neighbour.',
    objective:
      'Build a reference that lets a dyer find a colour by reasoning, not by guessing.',
    challenge:
      'Indigo shifts with every dip, bath and drying hour. The index had to be honest about that instead of pretending to be a fixed catalogue.',
    inspiration:
      'The way old dye houses keep their formula books — cramped handwriting, corrections, a stain on every page.',
    process: [
      { step: 'Standardise', note: 'Fixed water, temperature and cloth so only dip count changed.' },
      { step: 'Dip', note: 'Produced a 12-step value ladder of 96 swatches across eight dye baths.' },
      { step: 'Record', note: 'Wrote a variable card for every swatch, including the days it changed.' },
      { step: 'Box', note: 'Housed the index in a hand-cut wooden box with a sliding lid.' }
    ],
    tools: ['Indigo vats', 'Colour measurement', 'Cotton scouring', 'Box joinery'],
    iterations: [
      { label: 'Alpha', note: 'Swatches faded unevenly — needed a wash-fastness check.' },
      { label: 'Beta', note: 'Added a two-week re-measure column so fading became data, not error.' },
      { label: 'Final', note: 'Reordered the ladder by perceived value rather than dip number.' }
    ],
    outcome:
      'Now used by three small studios as a shared reference, with blank cards left in the box for their own additions.'
  },
  {
    id: 'warp-and-weft',
    category: 'weaving',
    title: 'Warp & Weft Studies',
    subtitle: 'Forty-eight constructive weave experiments',
    year: '2023',
    medium: 'Cotton and linen samples mounted on board',
    role: 'Designer',
    motif: 'loomDraft',
    ratio: 'square',
    accent: '#6a4a31',
    intro:
      'A study grid of interlacements: every sample changes exactly one structural decision from the one before it.',
    objective:
      'Understand — visually rather than theoretically — how a small structural change reads at a distance.',
    challenge:
      'Most weave structures look identical from three metres away. The studies had to find the ones that do not.',
    inspiration:
      'Loom draft notation itself: a language of tiny marks that predicts a whole cloth.',
    process: [
      { step: 'Define', note: 'Chose six base structures and eight variables to cross against them.' },
      { step: 'Draft', note: 'Drew all forty-eight drafts before touching a loom.' },
      { step: 'Weave', note: 'Wove each sample at identical sett so comparisons stayed fair.' },
      { step: 'Mount', note: 'Mounted them in reading order with the draft printed beside each.' }
    ],
    tools: ['Four-shaft loom', 'Drafting software', 'Sett gauge', 'Board mounting'],
    iterations: [
      { label: 'Set 1', note: 'Too uniform — needed more contrast in yarn thickness.' },
      { label: 'Set 2', note: 'Introduced a thicker weft to exaggerate structure.' },
      { label: 'Final', note: 'Kept nine samples that still read as different from six metres.' }
    ],
    outcome:
      'A working reference board in the studio; the nine surviving samples became the structural vocabulary for later work.'
  },
  {
    id: 'sari-geometry',
    category: 'weaving',
    title: 'Sari Geometry',
    subtitle: 'Reading a traditional border as a drawing',
    year: '2025',
    medium: 'Silk, zari, woven borders',
    role: 'Designer',
    motif: 'wovenBorder',
    ratio: 'tall',
    accent: '#c8a24c',
    intro:
      'A study of border composition: one traditional band, redrawn thirty times at different widths and densities.',
    objective:
      'Show that a border is not decoration but a proportional system, and that it can be composed with intent.',
    challenge:
      'Respect the tradition while still finding something new in it. Imitation would be easy and useless.',
    inspiration:
      'Unfolding a family sari on the floor and noticing how the border quietly controls where the eye rests.',
    process: [
      { step: 'Measure', note: 'Measured eleven heirloom borders and documented their proportions.' },
      { step: 'Reduce', note: 'Reduced each to its underlying geometric intervals.' },
      { step: 'Compose', note: 'Recomposed the intervals at new widths, from 2cm to 40cm.' },
      { step: 'Weave', note: 'Wove the strongest six as standalone bands on a silk warp.' }
    ],
    tools: ['Handloom', 'Silk & zari', 'Proportional grid', 'Heirloom documentation'],
    iterations: [
      { label: 'Round 1', note: 'Borders became too abstract and lost their origin entirely.' },
      { label: 'Round 2', note: 'Reintroduced one recognisable motif per band as an anchor.' },
      { label: 'Final', note: 'Let the width of the band decide the motif scale, never the reverse.' }
    ],
    outcome:
      'The bands are used as teaching pieces for border proportion, and one design entered production with a local weaver.'
  },

  /* ---------------------------------------------------------------------- PRINT */
  {
    id: 'monsoon-press',
    category: 'print',
    title: 'Monsoon Press',
    subtitle: 'A letterpress poster series for the first rains',
    year: '2025',
    medium: 'Letterpress on cotton rag, two-colour',
    role: 'Designer & printer',
    motif: 'pressPoster',
    ratio: 'portrait',
    accent: '#2f6b62',
    featured: true,
    intro:
      'Five posters printed slowly, one on each day the monsoon arrived late. The ink dries at the speed of the weather.',
    objective:
      'Make a series where the printing constraint — humidity, drying time, registration drift — is legible in the final object.',
    challenge:
      'Letterpress rewards precision, and rain destroys it. The series had to turn that conflict into the visual idea.',
    inspiration:
      'Watching rain hit a hot street, and the way the smell arrives before the water does.',
    process: [
      { step: 'Cut', note: 'Cut wooden type and lino blocks for cloud forms and rain line.' },
      { step: 'Mix', note: 'Mixed a green-black ink that shifts under different drying humidity.' },
      { step: 'Print', note: 'Printed each day, letting the rain buffet the drying sheets.' },
      { step: 'Record', note: 'Noted date, humidity and temperature on the reverse of every sheet.' }
    ],
    tools: ['Vandercook press', 'Wood type', 'Linocut', 'Cotton rag stock'],
    iterations: [
      { label: 'Proof 1', note: 'Rain line too uniform — looked like a pattern, not weather.' },
      { label: 'Proof 2', note: 'Varied line pressure by hand, block by block.' },
      { label: 'Final', note: 'Added a single misregistered second colour to mark the storm day.' }
    ],
    outcome:
      'The series reads as a weather diary when hung in order; the fifth print is the only one that stayed perfectly dry.'
  },
  {
    id: 'paper-almanac',
    category: 'print',
    title: 'The Paper Almanac',
    subtitle: 'A quarterly on craft, seasons and slow work',
    year: '2024',
    medium: 'Editorial design, 96 pages, uncoated stock',
    role: 'Art direction & layout',
    motif: 'editorialSpread',
    ratio: 'landscape',
    accent: '#b25c3b',
    intro:
      'A 96-page quarterly about people who make things with their hands, laid out to be read slowly.',
    objective:
      'Design for sustained reading — long-form layouts that give an essay room to breathe rather than chasing skimmability.',
    challenge:
      'Paper must justify itself against a phone. The answer had to be in layout rhythm, not in decoration.',
    inspiration:
      'Old technical annuals: generous margins, small captions, diagrams that assume a patient reader.',
    process: [
      { step: 'Structure', note: 'Built a baseline grid flexible enough for both essays and diagrams.' },
      { step: 'Pace', note: 'Assigned each feature a "breath" length — the spread where nothing happens.' },
      { step: 'Commission', note: 'Briefed illustrators with a palette and a single instruction: restraint.' },
      { step: 'Proof', note: 'Printed four dummy issues on the final stock before press.' }
    ],
    tools: ['Baseline grid', 'Uncoated stock', 'Illustration briefs', 'InDesign → plates'],
    iterations: [
      { label: 'Issue 1', note: 'Too dense; captions fought the body text.' },
      { label: 'Issue 2', note: 'Moved all captions to a wide outer margin.' },
      { label: 'Issue 3', note: 'Introduced a quiet spread before every feature as a pause.' }
    ],
    outcome:
      'The almanac settled into a stable rhythm by issue three and now sells mostly to people who keep every copy.'
  },
  {
    id: 'type-specimen',
    category: 'print',
    title: 'Solapur Specimen',
    subtitle: 'A specimen booklet for a revived Devanagari text face',
    year: '2024',
    medium: 'Type specimen, 32 pages, letterpress cover',
    role: 'Typesetting & specimen design',
    motif: 'typeSpecimen',
    ratio: 'tall',
    accent: '#2c3d31',
    intro:
      'A specimen that tests a revived text face in the only place it matters: long paragraphs at reading size.',
    objective:
      'Judge the type by how it behaves across a page, not by how large its first letter can be set.',
    challenge:
      'Specimens usually celebrate display sizes. This face had to be defended at 9 point.',
    inspiration:
      'Foundry specimens from the 1950s, where proof after proof was printed simply to catch a single bad shape.',
    process: [
      { step: 'Set', note: 'Set 14 passages from three languages at four sizes each.' },
      { step: 'Compare', note: 'Interleaved the new face with two established colleagues, page by page.' },
      { step: 'Annotate', note: 'Marked every shape that broke rhythm across line breaks.' },
      { step: 'Document', note: 'Wrote up corrections as notes rather than rules.' }
    ],
    tools: ['Letterpress cover', 'Text-setting proofs', 'Character-set comparison', 'Optical size testing'],
    iterations: [
      { label: 'Draft A', note: 'Only Latin text — hid the face\'s real problems entirely.' },
      { label: 'Draft B', note: 'Added Devanagari passages and two conjunct-heavy samples.' },
      { label: 'Final', note: 'Reduced the numerals to tabular and fixed the matra clearance.' }
    ],
    outcome:
      'The specimen led to eleven corrections in the typeface, which now sets comfortably in a 300-page book.'
  },
  {
    id: 'riso-notes',
    category: 'print',
    title: 'Risograph Field Notes',
    subtitle: 'A two-colour zine of plants found beside the lake',
    year: '2023',
    medium: 'Risograph, two inks, 24 pages, saddle stitched',
    role: 'Author & printer',
    motif: 'risoZine',
    ratio: 'square',
    accent: '#c8792f',
    intro:
      'Twenty-four pages of hand-drawn observations of lakeside plants, printed in two inks that never quite line up.',
    objective:
      'Make a field guide that feels like a notebook rather than a reference book.',
    challenge:
      'Risograph punishes precision, so the drawings had to be composed for misregistration instead of fighting it.',
    process: [
      { step: 'Draw', note: 'Drew 61 plants from life, in pen, in a single notebook.' },
      { step: 'Separate', note: 'Split each drawing into two flat ink layers.' },
      { step: 'Overprint', note: 'Designed overlaps so the second ink would build the darkest tone.' },
      { step: 'Bind', note: 'Printed and hand-bound 200 copies, numbering each in pencil.' }
    ],
    tools: ['Risograph', 'Fluorescent orange + teal inks', 'Pen & ink drawing', 'Saddle stitch'],
    iterations: [
      { label: 'Test 1', note: 'Drawings too fine; the drum filled in the hatching.' },
      { label: 'Test 2', note: 'Thickened line weight and cut all stippling.' },
      { label: 'Final', note: 'Left a deliberate 1mm offset on every page as a printing signature.' }
    ],
    outcome:
      'Sold out in three weeks; a second printing was made with a new cover, and the offset stayed.'
  },
  {
    id: 'water-and-stone',
    category: 'print',
    title: 'Water & Stone',
    subtitle: 'Exhibition catalogue for a lakeside sculpture show',
    year: '2025',
    medium: 'Catalogue, 64 pages, gatefold cover',
    role: 'Designer',
    motif: 'wideCover',
    ratio: 'wide',
    accent: '#7b93a6',
    intro:
      'A catalogue for a sculpture exhibition staged along a shoreline, typeset as a slow pan across the water.',
    objective:
      'Make the book read like a walk along the bank rather than an inventory of objects.',
    challenge:
      'Sculpture resists flat reproduction. The layout had to give weight and light rather than detail.',
    inspiration:
      'The way a shoreline changes what you see — reflection first, object second.',
    process: [
      { step: 'Sequence', note: 'Ordered works by the actual walking route, not by catalogue number.' },
      { step: 'Frame', note: 'Shot everything in raking light so silhouette carried the form.' },
      { step: 'Panel', note: 'Broke the gatefold so it opened like the horizon flattening out.' },
      { step: 'Print', note: 'Matched a cold grey and a warm sand so the paper felt like wet stone.' }
    ],
    tools: ['Gatefold binding', 'Duotone reproduction', 'Walking-route sequencing', 'Uncoated text stock'],
    iterations: [
      { label: 'Sequence 1', note: 'Chronological order killed the walk entirely.' },
      { label: 'Sequence 2', note: 'Reordered by route; added two "quiet" spreads of shoreline only.' },
      { label: 'Final', note: 'Removed all page numbers so the sequence couldn\'t be indexed.' }
    ],
    outcome:
      'Visitors were seen using the catalogue as a map, matching spreads to landmarks as they walked.'
  },

  /* -------------------------------------------------------------------- GRAPHIC */
  {
    id: 'chowk-identity',
    category: 'graphic',
    title: 'Chowk Identity',
    subtitle: 'Visual identity for a neighbourhood festival',
    year: '2025',
    medium: 'Identity system, signage, print',
    role: 'Identity designer',
    motif: 'identitySystem',
    ratio: 'landscape',
    accent: '#c8792f',
    featured: true,
    intro:
      'An identity for a street festival built entirely from one square: the chowk, the crossing, the shared floor of the neighbourhood.',
    objective:
      'Create a system flexible enough for both a 12-metre banner and a hand-painted stall sign.',
    challenge:
      'The festival is painted by volunteers, so the identity had to be teachable in ten minutes and unforgeable in feel.',
    inspiration:
      'Hand-painted shop boards where the same square is drawn a hundred ways by a hundred painters.',
    process: [
      { step: 'Reduce', note: 'Reduced every street marker to one square and four rules.' },
      { step: 'Rule', note: 'Fixed line weight and corner radius; left colour and rotation free.' },
      { step: 'Teach', note: 'Ran two stencil workshops so painters could reproduce the mark.' },
      { step: 'Deploy', note: 'Rolled it across banners, bunting, menus, wayfinding and floor paint.' }
    ],
    tools: ['Stencil kits', 'Signage system', 'Painted banners', 'Volunteer workshops'],
    iterations: [
      { label: 'System 1', note: 'Too rigid — painters kept adding detail to fill empty space.' },
      { label: 'System 2', note: 'Introduced an optional inner mark so expression had a home.' },
      { label: 'Final', note: 'Locked the outer square and freed everything inside it.' }
    ],
    outcome:
      'The mark appeared on 400 painted surfaces in four days, and the workshops have become an annual fixture.'
  },
  {
    id: 'devanagari-rhythm',
    category: 'graphic',
    title: 'Devanagari Rhythm',
    subtitle: 'Experimental typographic posters',
    year: '2024',
    medium: 'Screenprint posters, three colours',
    role: 'Designer & printer',
    motif: 'brushRhythm',
    ratio: 'tall',
    accent: '#b25c3b',
    intro:
      'A poster series where letterforms are treated as stroke and rhythm only — legibility abandoned on purpose, then rebuilt.',
    objective:
      'Find the point where a script stops being readable but still unmistakably keeps its identity.',
    challenge:
      'Devanagari depends on a hanging baseline. Break it carelessly and the writing simply looks broken.',
    inspiration:
      'Calligraphers warming up: pages of strokes that are not yet words but already have personality.',
    process: [
      { step: 'Stroke', note: 'Drew 200 wet-brush strokes on newsprint, no letters intended.' },
      { step: 'Scan', note: 'Selected 40 strokes with the strongest rhythm.' },
      { step: 'Compose', note: 'Assembled them into posters that hold the baseline without stating it.' },
      { step: 'Screen', note: 'Screenprinted three colours with deliberate overprints.' }
    ],
    tools: ['Brush & ink', 'Screenprinting', 'Stroke library', 'Baseline studies'],
    iterations: [
      { label: 'Sheet 1', note: 'Felt accidental; strokes needed a shared angle of attack.' },
      { label: 'Sheet 2', note: 'Fixed the pen angle and the series found its voice.' },
      { label: 'Final', note: 'Left one poster deliberately unreadable as the series\' loudest note.' }
    ],
    outcome:
      'The series was shown as a wall of six, and the stroke library is reused in packaging and title work.'
  },
  {
    id: 'kite-season',
    category: 'graphic',
    title: 'Kite Season',
    subtitle: 'Festival brand for the windy month',
    year: '2024',
    medium: 'Brand system, posters, tissue kites',
    role: 'Designer',
    motif: 'kiteSky',
    ratio: 'portrait',
    accent: '#2f6b62',
    intro:
      'A brand for a kite festival that treats the sky as the page and the string as the grid.',
    objective:
      'Build a visual system that works on flat print and on a paper object actually flying in the wind.',
    challenge:
      'A printed kite must be read from below, against bright sky, while moving. Everything had to be simplified twice.',
    inspiration:
      'Old kite-makers\' patterns, cut from memory and slightly different every year.',
    process: [
      { step: 'Silhouette', note: 'Designed the mark so it stays readable in pure silhouette.' },
      { step: 'Test', note: 'Flew 20 proof kites and eliminated every design that turned to mush.' },
      { step: 'Scale', note: 'Rebuilt the survivors for posters and tickets.' },
      { step: 'Release', note: 'Printed 3,000 kites and gave them away to attendees.' }
    ],
    tools: ['Kite prototyping', 'Tissue & bamboo', 'Silhouette testing', 'Poster system'],
    iterations: [
      { label: 'Fleet 1', note: 'Beautiful on paper, invisible in the sky.' },
      { label: 'Fleet 2', note: 'Doubled the shape size and cut half the detail.' },
      { label: 'Final', note: 'Kept one long tail as the only moving element.' }
    ],
    outcome:
      'The festival sky filled with the same repeated shape, and the poster still works framed on a wall indoors.'
  },
  {
    id: 'tamarind-packaging',
    category: 'graphic',
    title: 'Tamarind & Co.',
    subtitle: 'Packaging for a small-batch condiment maker',
    year: '2023',
    medium: 'Packaging system, labels, cartons',
    role: 'Designer',
    motif: 'packagingSet',
    ratio: 'square',
    accent: '#6a4a31',
    intro:
      'A packaging system for eight preserves, where the pattern on the label is generated from the recipe itself.',
    objective:
      'Give a tiny producer a shelf presence that reads as a family of products, not as eight unrelated jars.',
    challenge:
      'Small runs mean no expensive finishes. Everything had to work with two inks on a paper label.',
    inspiration:
      'Marginalia in a cookbook — quantities crossed out, notes in the margin, one page stained permanently.',
    process: [
      { step: 'Encode', note: 'Mapped each recipe to a repeating pattern by ingredient weight.' },
      { step: 'Draw', note: 'Drew one small motif per ingredient in a single weight.' },
      { step: 'Test', note: 'Labeled blank jars and reviewed them on a real shelf.' },
      { step: 'Specify', note: 'Wrote a two-ink spec any local printer could hold.' }
    ],
    tools: ['Pattern generation', 'Two-ink labelling', 'Shelf testing', 'Carton dielines'],
    iterations: [
      { label: 'Batch 1', note: 'Patterns too subtle at 40mm.' },
      { label: 'Batch 2', note: 'Increased motif scale and contrast.' },
      { label: 'Final', note: 'Gave every jar one shared band so the range reads as a set.' }
    ],
    outcome:
      'The range was picked up by two stores, and the pattern system made new flavours cheap to launch.'
  },
  {
    id: 'signal-and-noise',
    category: 'graphic',
    title: 'Signal & Noise',
    subtitle: 'Poster studies in interference',
    year: '2025',
    medium: 'Digital print, edition of 12',
    role: 'Designer',
    motif: 'signalWaves',
    ratio: 'square',
    accent: '#546c80',
    intro:
      'Twelve posters built from concentric wave systems that interfere with each other until the composition settles.',
    objective:
      'Generate composition — not decoration — from a simple rule, then intervene by hand where it fails.',
    challenge:
      'Pure rule-based work is usually dull. The series had to leave room for deliberate breaking.',
    inspiration:
      'Radio static between stations, where two transmissions briefly become one pattern.',
    process: [
      { step: 'Rule', note: 'Defined a wave rule with two frequencies and one fixed origin.' },
      { step: 'Generate', note: 'Printed 60 rule-only outputs and pinned them all to a wall.' },
      { step: 'Break', note: 'Marked 12 where a single intervention would resolve the tension.' },
      { step: 'Finish', note: 'Reprinted those 12 with one hand-added element each.' }
    ],
    tools: ['Wave generation', 'Large-format print', 'Wall selection', 'Hand intervention'],
    iterations: [
      { label: 'Set 1', note: 'Too even; nothing was at stake.' },
      { label: 'Set 2', note: 'Introduced frequency collision—patterns began to fight.' },
      { label: 'Final', note: 'Kept only the twelve where the fight was interesting.' }
    ],
    outcome:
      'The series opened a lecture on generative design, and the failure wall became the most discussed part of the show.'
  },

  /* ----------------------------------------------------------------- INNOVATION */
  {
    id: 'loom-os',
    category: 'innovation',
    title: 'Loom OS',
    subtitle: 'A control interface for handloom weavers',
    year: '2025',
    medium: 'Interface concept, hardware prototype',
    role: 'Product & interface design',
    motif: 'controlPanel',
    ratio: 'landscape',
    accent: '#7b93a6',
    featured: true,
    intro:
      'A control surface for a semi-automatic loom that keeps the weaver\'s hands where they belong — on the cloth.',
    objective:
      'Replace a screen-based control panel with physical controls that can be operated by feel, in low light, with dusty hands.',
    challenge:
      'Every existing interface assumed a clean, seated, sighted operator. Looms are loud, bright and hands busy.',
    inspiration:
      'Old sewing machines and drum kits: controls that became muscle memory within a week.',
    process: [
      { step: 'Observe', note: 'Shadowed six weavers for eleven days, logging every hesitation.' },
      { step: 'Map', note: 'Mapped all 14 frequent actions onto six physical controls.' },
      { step: 'Build', note: 'Built a plywood and brass control panel with detented dials.' },
      { step: 'Test', note: 'Ran a two-week trial and removed three controls that were never used.' }
    ],
    tools: ['Field observation', 'Plywood & brass prototyping', 'Detent mechanisms', 'Usability trials'],
    iterations: [
      { label: 'V1', note: 'Too many controls; weavers kept reaching for the wrong dial.' },
      { label: 'V2', note: 'Reduced to six and shaped each control differently by function.' },
      { label: 'V3', note: 'Added a raised edge so a control can be found without looking.' }
    ],
    outcome:
      'Trial weavers cut changeover time by roughly a third without any training beyond a single demonstration.'
  },
  {
    id: 'paper-circuits',
    category: 'innovation',
    title: 'Paper Circuits',
    subtitle: 'Conductive ink printed on handmade paper',
    year: '2024',
    medium: 'Conductive ink, handmade paper, LEDs',
    role: 'Material experimentation',
    motif: 'paperCircuit',
    ratio: 'square',
    accent: '#c8792f',
    intro:
      'An experiment in printing circuits directly onto handmade paper, so electronics can be folded, torn and thrown away.',
    objective:
      'Produce a working circuit with no board, no solder and no plastic — only paper, ink and light.',
    challenge:
      'Handmade paper is uneven, absorbent and inconsistent. The ink had to cope with all three.',
    inspiration:
      'Cheap printed and immediately discarded: a birthday card that lights up and then becomes waste like everything else.',
    process: [
      { step: 'Formulate', note: 'Mixed three conductive inks and tested resistance on paper.' },
      { step: 'Screen', note: 'Screenprinted traces onto five paper types at three thicknesses.' },
      { step: 'Fold', note: 'Tested whether printed traces survive creasing and folding.' },
      { step: 'Seal', note: 'Added a brushed sealant that survives tearing.' }
    ],
    tools: ['Conductive ink formulation', 'Screenprinting', 'Flex testing', 'Low-voltage LEDs'],
    iterations: [
      { label: 'Ink 1', note: 'Cracked on the first fold; unusable in a card.' },
      { label: 'Ink 2', note: 'Added a flexible binder — survived 200 creases.' },
      { label: 'Final', note: 'Printed a working light-up card that still works after being torn in half.' }
    ],
    outcome:
      'A working paper circuit that lights an LED, folds flat into an envelope and can be recycled with the rest of the card.'
  },
  {
    id: 'kinetic-signage',
    category: 'innovation',
    title: 'Kinetic Signage',
    subtitle: 'A mechanical wayfinding prototype',
    year: '2024',
    medium: 'Mechanical prototype, wood, brass',
    role: 'Designer & maker',
    motif: 'kineticArms',
    ratio: 'portrait',
    accent: '#b25c3b',
    intro:
      'A single physical signpost whose arrows rotate to point the correct way, driven only by brass gears and a key.',
    objective:
      'Test whether a signpost can reconfigure itself, so one object serves a building with changing exhibitions.',
    challenge:
      'Mechanical reliability with zero power. The geometry had to work from a single clock input.',
    inspiration:
      'Railway signal boxes and clock towers: public information delivered by pure mechanism.',
    process: [
      { step: 'Solve', note: 'Worked out the gear ratio needed for four independent arrow positions.' },
      { step: 'Cut', note: 'Cut brass gears and a wooden escapement by hand.' },
      { step: 'Assemble', note: 'Built the hub so arrows rotate on a single central shaft.' },
      { step: 'Wind', note: 'Added a key and a one-day spring so it needs no wiring.' }
    ],
    tools: ['Brass gear cutting', 'Wood joinery', 'Escapement design', 'Hand assembly'],
    iterations: [
      { label: 'Mk 1', note: 'Arrows collided at shared positions.' },
      { label: 'Mk 2', note: 'Staggered the arrows in depth to allow overlap.' },
      { label: 'Mk 3', note: 'Added detents so each arrow snaps loudly into a true direction.' }
    ],
    outcome:
      'The prototype reconfigures between four exhibition layouts in under 20 seconds, powered by one turn of a key.'
  },
  {
    id: 'field-recorder',
    category: 'innovation',
    title: 'Field Recorder',
    subtitle: 'An instrument for mapping sound onto place',
    year: '2023',
    medium: 'Instrument prototype, brass, paper charts',
    role: 'Designer & maker',
    motif: 'soundRings',
    ratio: 'wide',
    accent: '#2f6b62',
    intro:
      'A hand instrument that records the shape of a sound as concentric rings on a paper disc, producing a physical map of an afternoon.',
    objective:
      'Make sound tangible — something you can hold, file and compare without a screen.',
    challenge:
      'Turning time into radius changes how a sound reads. Loud becomes wide, not tall.',
    inspiration:
      'Old barographs and seismographs: paper slowly receiving a continuous event.',
    process: [
      { step: 'Design', note: 'Designed a rotating stylus head that plots amplitude as radius.' },
      { step: 'Build', note: 'Machined the hub in brass and mounted it on a wooden base.' },
      { step: 'Chart', note: 'Cut paper discs with a printed time ring so charts could be compared.' },
      { step: 'Record', note: 'Recorded twelve afternoons: markets, a lake, a loom shed, a train.' }
    ],
    tools: ['Brass machining', 'Mechanical linkage', 'Paper chart design', 'Field recording'],
    iterations: [
      { label: 'Mk 1', note: 'Stylus cut through the paper on loud passages.' },
      { label: 'Mk 2', note: 'Added a spring tensioner; charts became readable.' },
      { label: 'Final', note: 'Colour-coded the paper edge by hour so long recordings stay navigable.' }
    ],
    outcome:
      'Twelve paper discs now describe twelve places, and the lake recording is legible as water long before it is heard.'
  },
  {
    id: 'museum-in-a-box',
    category: 'innovation',
    title: 'Museum in a Box',
    subtitle: 'A portable exhibition for schools without galleries',
    year: '2025',
    medium: 'Box, foldout panels, printed artefacts',
    role: 'Concept & design',
    motif: 'exhibitionKit',
    ratio: 'landscape',
    accent: '#c8a24c',
    intro:
      'A single box that unfolds into a complete exhibition, designed for schools that will never have a gallery.',
    objective:
      'Package curation itself — the sequencing, the labels, the lighting — into something that fits under a desk.',
    challenge:
      'An exhibition is a room. The box had to reproduce the experience of walking an exhibition with almost no room at all.',
    inspiration:
      'Travelling magic lantern shows and museum loan kits sent to small towns in the 1930s.',
    process: [
      { step: 'Curate', note: 'Selected 24 artefacts and wrote the argument of the exhibition first.' },
      { step: 'Fold', note: 'Designed panels that unfold into a three-sided room in 30 seconds.' },
      { step: 'Print', note: 'Printed scaled artefacts with a matte finish so they read as objects.' },
      { step: 'Test', note: 'Ran it in four classrooms and cut everything students ignored.' }
    ],
    tools: ['Paper engineering', 'Dieline prototyping', 'Label system', 'Classroom trials'],
    iterations: [
      { label: 'Box 1', note: 'Beautiful but slow to assemble — students lost interest.' },
      { label: 'Box 2', note: 'Rebuilt as a pop-up: one motion, three walls.' },
      { label: 'Final', note: 'Printed the curatorial route onto the floor panel so the path is obvious.' }
    ],
    outcome:
      'Four schools now run the exhibition independently, and the box survives being packed and moved eleven times.'
  }
]

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
