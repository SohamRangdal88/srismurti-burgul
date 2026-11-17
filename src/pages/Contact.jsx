import { motion, useReducedMotion } from 'framer-motion'

import { CATEGORIES } from '../data/categories.js'
import { navigate } from '../lib/router.jsx'

const EASE = [0.16, 0.84, 0.32, 1]

/**
 * Where correspondence goes.
 *
 * Set `EMAIL` to a real address and the page offers a mailto as well as the
 * profile link. Left empty, it shows only the link that actually resolves —
 * a contact page should never offer a door that does not open.
 */
const EMAIL = ''
const PROFILE = 'https://github.com/sohamrangdal88'

const go = (path, intent) => (event) => {
  if (event) event.preventDefault()
  navigate(path, intent)
}

export default function Contact() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="page doc doc--dark">
      <header className="doc__masthead">
        <motion.p
          className="eyebrow doc__kicker"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Contact
        </motion.p>
        <motion.h1
          className="doc__title deco"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.06 }}
        >
          Say Hello
        </motion.h1>
        <motion.p
          className="doc__lede lede"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.14 }}
        >
          For a commission, a collaboration, a question about how any of this was drawn, or simply
          to point out that a road should not bend that way.
        </motion.p>
      </header>

      <div className="doc__body">
        <section className="doc__section doc__section--wide">
          <p className="eyebrow doc__section-kicker">Opening the conversation</p>
          <h2 className="doc__section-title serif">Choose a direction, or just write</h2>
          <p className="body-text doc__paragraph">
            You can begin anywhere. Pick whichever of the four directions is closest to what you
            have in mind and read the work first — it usually answers more than an introduction
            would.
          </p>

          <ul className="doc__links">
            {EMAIL ? (
              <li>
                <a className="doc__link" href={`mailto:${EMAIL}`}>
                  <span className="eyebrow doc__link-kicker">Email</span>
                  <span className="doc__link-value serif">{EMAIL}</span>
                </a>
              </li>
            ) : null}
            <li>
              <a className="doc__link" href={PROFILE} target="_blank" rel="noreferrer">
                <span className="eyebrow doc__link-kicker">Profile</span>
                <span className="doc__link-value serif">github.com/sohamrangdal88</span>
              </a>
            </li>
          </ul>
        </section>

        <section className="doc__section doc__section--wide">
          <p className="eyebrow doc__section-kicker">Four ways in</p>
          <h2 className="doc__section-title serif">The signpost, again</h2>
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
                  <span className="doc__direction-tag">{category.strap}</span>
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
        <a className="ghost-link" href="#/about" onClick={go('/about')}>
          About →
        </a>
      </footer>
    </div>
  )
}
