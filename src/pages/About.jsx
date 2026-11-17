import { motion, useReducedMotion } from 'framer-motion'

import { CATEGORIES } from '../data/categories.js'
import { navigate } from '../lib/router.jsx'

const EASE = [0.16, 0.84, 0.32, 1]

const go = (path, intent) => (event) => {
  if (event) event.preventDefault()
  navigate(path, intent)
}

const CHAPTERS = [
  {
    kicker: 'Why a journey',
    title: 'A portfolio you have to travel through',
    body: [
      'A list of projects tells you what was made. It does not tell you why any of it happened, or how the maker thinks. So this one is built as a ride: you push off, the lakeside goes past, and you only get to choose a direction once you have arrived somewhere.',
      'The whole thing is drawn — every tree, the lake, the temple on the far bank, the hands on the bars. Nothing here is a photograph of a real place; it is the illustrated version of the one in my head.'
    ]
  },
  {
    kicker: 'How it is drawn',
    title: 'Illustration, then geometry',
    body: [
      'The world is a genuine perspective scene, not a set of parallax strips. Roadside objects sit on a ground plane with a real distance ahead of the rider, so they sweep out from the vanishing point, grow, and slip under the handlebars at the correct moment.',
      'The artwork in the galleries is generated: each project owns a composition engine and a seed, so every canvas is stable, and every one is different in shape and structure rather than a grid of identical frames.'
    ]
  },
  {
    kicker: 'How it moves',
    title: 'Scroll is the throttle',
    body: [
      'There are no fades standing in for motion. Scrolling integrates a velocity profile — a push-off, a long cruise, and a slow arrival — so the bicycle decelerates into the signpost instead of arriving at speed.',
      'If you have asked your system for reduced motion, the ride holds still and the world simply changes around you.'
    ]
  }
]

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="page doc">
      <header className="doc__masthead">
        <motion.p
          className="eyebrow doc__kicker"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          About
        </motion.p>
        <motion.h1
          className="doc__title deco"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.06 }}
        >
          Srismurti Burgul
        </motion.h1>
        <motion.p
          className="doc__lede lede"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.14 }}
        >
          An illustrated journey through four ways of working — weaving, print, graphic design and
          innovation — told as one bicycle ride along a lake.
        </motion.p>
      </header>

      <div className="doc__body">
        {CHAPTERS.map((chapter, index) => (
          <motion.section
            key={chapter.kicker}
            className="doc__section"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.05 }}
          >
            <p className="eyebrow doc__section-kicker">{chapter.kicker}</p>
            <h2 className="doc__section-title serif">{chapter.title}</h2>
            {chapter.body.map((paragraph) => (
              <p className="body-text doc__paragraph" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </motion.section>
        ))}

        <section className="doc__section doc__section--wide">
          <p className="eyebrow doc__section-kicker">The four directions</p>
          <h2 className="doc__section-title serif">One signpost, four ways in</h2>
          <ul className="doc__directions">
            {CATEGORIES.map((category) => (
              <li key={category.id} style={{ '--accent': category.accent }}>
                <a
                  className="doc__direction"
                  href={`#/world/${category.id}`}
                  onClick={go(`/world/${category.id}`)}
                >
                  <span className="numeral doc__direction-numeral">{category.numeral}</span>
                  <span className="deco doc__direction-label">{category.label}</span>
                  <span className="doc__direction-tag">{category.tagline}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="doc__foot">
        <a className="ghost-link" href="#/" onClick={go('/', { landAt: 'signpost' })}>
          ← Return to the signpost
        </a>
        <a className="ghost-link" href="#/contact" onClick={go('/contact')}>
          Contact →
        </a>
      </footer>
    </div>
  )
}
