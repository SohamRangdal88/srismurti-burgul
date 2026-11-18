import { motion, useReducedMotion } from 'framer-motion'

import { ArcStack } from '../art/primitives.jsx'
import { getCategory } from '../data/categories.js'
import { ART_RATIO, getProject, getProjectNeighbours } from '../data/projects.js'
import { navigate } from '../lib/router.jsx'
import NotFound from './NotFound.jsx'

/**
 * A single work, read like a catalogue entry.
 *
 * The hero and the gallery are the project's own images — never re-drawn or
 * substituted. Every written section is rendered only when the corresponding
 * field exists in `src/data/projects.js`, so a project with notes still to come
 * shows its work without a single invented sentence.
 */

const EASE = [0.16, 0.84, 0.32, 1]

const go = (path, intent) => (event) => {
  if (event) event.preventDefault()
  navigate(path, intent)
}

function Section({ eyebrow, title, children, index }) {
  return (
    <motion.section
      className="work__section"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <p className="eyebrow work__section-eyebrow">
        <span className="numeral">{String(index).padStart(2, '0')}</span>
        {eyebrow}
      </p>
      <h2 className="work__section-title serif">{title}</h2>
      <div className="work__section-body">{children}</div>
    </motion.section>
  )
}

export default function ProjectPage({ categoryId, projectId }) {
  const reduceMotion = useReducedMotion()
  const project = getProject(projectId)
  const category = getCategory(categoryId)

  if (!project || !category || project.category !== category.id) return <NotFound />

  const { previous, next } = getProjectNeighbours(project.id)

  const facts = [
    ['Year', project.year],
    ['Medium', project.medium],
    ['Role', project.role]
  ].filter(([, value]) => Boolean(value))

  const narrative = [
    { eyebrow: 'Objective', title: 'What it had to do', body: project.objective },
    { eyebrow: 'Challenge', title: 'The difficulty at the centre', body: project.challenge },
    { eyebrow: 'Inspiration', title: 'Where it came from', body: project.inspiration }
  ].filter((entry) => Boolean(entry.body))

  const hasNotes =
    Boolean(project.intro) || narrative.length > 0 || project.process.length > 0 || project.outcome

  return (
    <div className="page work" style={{ '--accent': project.accent }}>
      <header className="work__hero">
        <div className="work__hero-art">
          <img
            className="work__hero-img"
            src={project.cover}
            alt={`${project.title} — principal image`}
            decoding="async"
          />
          <svg className="work__hero-atmos" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <ArcStack cx={420} cy={520} r0={280} count={4} step={34} color={project.accent} stroke={4} opacity={0.5} />
          </svg>
        </div>

        <motion.div
          className="work__hero-plate"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
        >
          <p className="eyebrow work__crumb">
            <a className="work__crumb-link" href={`#/world/${category.id}`} onClick={go(`/world/${category.id}`)}>
              {category.label}
            </a>
            <span aria-hidden="true">/</span>
            <span>{project.year || 'Catalogue'}</span>
          </p>

          <h1 className="work__title deco">{project.title}</h1>
          {project.subtitle ? <p className="work__sub serif">{project.subtitle}</p> : null}
          <p className="eyebrow work__strap">{category.strap}</p>

          {facts.length ? (
            <dl className="work__facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </motion.div>
      </header>

      <div className="work__body" data-aside={project.tools.length > 0}>
        <div className="work__intro">
          {project.intro ? <p className="lede work__intro-lede">{project.intro}</p> : null}

          {narrative.map((entry, index) => (
            <Section key={entry.eyebrow} index={index + 1} eyebrow={entry.eyebrow} title={entry.title}>
              <p className="body-text">{entry.body}</p>
            </Section>
          ))}

          {!hasNotes ? (
            <p className="work__pending serif">
              The written notes for this project are still being prepared. Until they are ready, the
              plates below are the work itself.
            </p>
          ) : null}
        </div>

        {project.tools.length ? (
          <aside className="work__aside" aria-label="Materials and techniques">
            <p className="eyebrow">Tools &amp; techniques</p>
            <ul className="work__tools">
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>

      {project.process.length ? (
        <section className="work__process" aria-label="Creative process">
          <div className="work__process-head">
            <p className="eyebrow">Creative process</p>
            <span className="deco-rule" aria-hidden="true">
              <span className="deco-rule__diamond" />
            </span>
          </div>
          <ol className="work__steps">
            {project.process.map((step, index) => (
              <motion.li
                key={step.step}
                className="work__step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
              >
                <span className="numeral work__step-numeral">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="work__step-title deco">{step.step}</h3>
                <p className="work__step-note">{step.note}</p>
              </motion.li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.gallery.length ? (
        <section className="work__gallery" aria-label="Project gallery">
          <div className="work__gallery-head">
            <p className="eyebrow">Gallery</p>
            <h2 className="work__section-title serif">Images from the project</h2>
          </div>

          <ol className="work__plates">
            {project.gallery.map((image, index) => (
              <motion.li
                key={image}
                className="work__plate"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, ease: EASE, delay: (index % 2) * 0.08 }}
              >
                <span className="plate__media" style={{ '--ratio': ART_RATIO }}>
                  <img
                    className="plate__img"
                    src={image}
                    alt={`${project.title} — plate ${String(index + 2).padStart(2, '0')}`}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="work__plate-label eyebrow">
                  Plate {String(index + 2).padStart(2, '0')} · {project.title}
                </span>
              </motion.li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.iterations.length ? (
        <section className="work__iterations" aria-label="Design iterations">
          <p className="eyebrow work__iterations-kicker">Design iterations</p>
          <ol className="work__iteration-list">
            {project.iterations.map((entry, index) => (
              <li key={entry.label} className="work__iteration">
                <span className="work__iteration-index numeral">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="work__iteration-label deco">{entry.label}</h3>
                <p className="work__iteration-note">{entry.note}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.outcome ? (
        <section className="work__outcome" aria-label="Outcome">
          <p className="eyebrow">Final outcome</p>
          <p className="work__outcome-text serif">{project.outcome}</p>
        </section>
      ) : null}

      <nav className="work__nav" aria-label="More work">
        <a className="work__nav-card work__nav-card--prev" href={`#/world/${category.id}/${previous.id}`} onClick={go(`/world/${category.id}/${previous.id}`)}>
          <span className="eyebrow">Previous</span>
          <span className="work__nav-title serif">{previous.title}</span>
        </a>

        <a className="work__nav-card work__nav-card--index" href={`#/world/${category.id}`} onClick={go(`/world/${category.id}`)}>
          <span className="eyebrow">Back to</span>
          <span className="work__nav-title deco">{category.label}</span>
        </a>

        <a className="work__nav-card work__nav-card--next" href={`#/world/${category.id}/${next.id}`} onClick={go(`/world/${category.id}/${next.id}`)}>
          <span className="eyebrow">Next</span>
          <span className="work__nav-title serif">{next.title}</span>
        </a>
      </nav>

      <footer className="work__foot">
        <a className="ghost-link" href="#/" onClick={go('/', { landAt: 'signpost' })}>
          ← Return to the signpost
        </a>
        <p className="eyebrow work__foot-note">Four directions, one ride</p>
      </footer>
    </div>
  )
}
