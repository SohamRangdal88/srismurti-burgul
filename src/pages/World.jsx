import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import Artwork, { ratioValue } from '../art/Artwork.jsx'
import { ArcStack, Sunburst } from '../art/primitives.jsx'
import { CATEGORIES, getCategory } from '../data/categories.js'
import { PROJECTS_BY_CATEGORY } from '../data/projects.js'
import { CATEGORY_SKIES } from '../data/palette.js'
import { navigate } from '../lib/router.jsx'
import NotFound from './NotFound.jsx'

/**
 * A world.
 *
 * One of the four directions, hung as an exhibition. Every canvas keeps the
 * ratio its own motif was composed for, so the wall is asymmetric because the
 * work is asymmetric — not because cards were nudged around to look casual.
 */

const EASE = [0.16, 0.84, 0.32, 1]

const go = (path, intent) => (event) => {
  if (event) event.preventDefault()
  navigate(path, intent)
}

/** One hung piece: framed artwork, scroll-linked drift, museum label. */
function WallItem({ project, large = false, index = 0, reduceMotion }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['-6.5%', '6.5%'])

  return (
    <motion.li
      ref={ref}
      className={`wall__item ${large ? 'wall__item--feature' : `wall__item--${project.ratio}`}`}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 54, rotate: index % 2 ? 1.1 : -1.1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: reduceMotion ? 0.3 : 1.05, ease: EASE, delay: (index % 2) * 0.07 }}
    >
      <a
        className={`plate wall__plate ${large ? 'wall__plate--feature' : ''}`}
        href={`#/world/${project.category}/${project.id}`}
        onClick={go(`/world/${project.category}/${project.id}`)}
        style={{ '--accent': project.accent }}
      >
        <span className="plate__media" style={{ '--ratio': ratioValue(project.ratio) }}>
          <motion.span className="wall__shift" style={{ y: reduceMotion ? 0 : drift }}>
            <Artwork
              motif={project.motif}
              ratio={project.ratio}
              category={project.category}
              seed={project.id}
              title={project.title}
            />
          </motion.span>
        </span>

        <span className="wall__label">
          <span className="wall__label-top">
            <span className="eyebrow wall__meta">
              {project.year} · {project.role}
            </span>
            {project.featured ? <span className="wall__flag">Feature</span> : null}
          </span>
          <span className="wall__title serif">{project.title}</span>
          <span className="wall__sub">{project.subtitle}</span>
          <span className="wall__medium">{project.medium}</span>
          <span className="wall__more" aria-hidden="true">
            Read the work →
          </span>
        </span>
      </a>
    </motion.li>
  )
}

export default function World({ categoryId }) {
  const reduceMotion = useReducedMotion()
  const category = getCategory(categoryId)

  if (!category) return <NotFound />

  const projects = PROJECTS_BY_CATEGORY[category.id] || []
  const featureIndex = Math.max(0, projects.findIndex((project) => project.featured))
  const sky = CATEGORY_SKIES[category.id]
  const others = CATEGORIES.filter((item) => item.id !== category.id)

  return (
    <div
      className="page world"
      style={{
        '--accent': category.accent,
        '--accent-soft': category.accentSoft,
        '--sky-top': sky.top,
        '--sky-mid': sky.mid,
        '--sky-low': sky.low,
        '--sky-ground': sky.ground
      }}
    >
      <header className="world__masthead">
        <svg className="world__atmos" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <Sunburst cx={600} cy={452} r={430} rays={40} color={category.accentSoft} inner={0.3} opacity={0.34} />
          <ArcStack cx={600} cy={470} r0={220} count={5} step={30} color={category.accent} stroke={3} opacity={0.4} />
          <Sunburst cx={600} cy={452} r={172} rays={24} color={category.accent} inner={0.42} opacity={0.5} />
        </svg>

        <div className="world__masthead-inner">
          <motion.p
            className="eyebrow world__kicker"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Direction {category.numeral} · {category.strap}
          </motion.p>

          <motion.h1
            className="world__title deco"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.06 }}
          >
            {category.label}
          </motion.h1>

          <motion.p
            className="world__entry serif"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.14 }}
          >
            {category.entryLine}
          </motion.p>

          <motion.p
            className="lede world__lede"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
          >
            {category.description}
          </motion.p>

          <motion.p
            className="eyebrow world__atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
            {category.atmosphere}
          </motion.p>
        </div>
      </header>

      <section className="world__gallery" aria-label={`${category.label} — works on show`}>
        <div className="world__gallery-head">
          <p className="eyebrow">
            {String(projects.length).padStart(2, '0')} works on show
          </p>
          <span className="deco-rule" aria-hidden="true">
            <span className="deco-rule__diamond" />
          </span>
          <p className="eyebrow world__gallery-note">Every canvas opens</p>
        </div>

        <ol className="wall">
          {projects.map((project, index) => (
            <WallItem
              key={project.id}
              project={project}
              index={index}
              large={index === featureIndex}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </ol>
      </section>

      <footer className="world__foot">
        <div className="world__foot-inner">
          <a className="ghost-link" href="#/" onClick={go('/', { landAt: 'signpost' })}>
            ← Return to the signpost
          </a>

          <nav className="world__cross" aria-label="Other directions">
            <p className="eyebrow">Other directions</p>
            <ul>
              {others.map((item) => (
                <li key={item.id}>
                  <a
                    className="world__cross-link"
                    href={`#/world/${item.id}`}
                    onClick={go(`/world/${item.id}`)}
                    style={{ '--accent': item.accent }}
                  >
                    <span className="numeral world__cross-numeral">{item.numeral}</span>
                    <span className="deco world__cross-label">{item.label}</span>
                    <span className="world__cross-tag">{item.tagline}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}
