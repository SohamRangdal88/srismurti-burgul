import { motion, useReducedMotion } from 'framer-motion'

import Artwork, { ratioValue } from '../art/Artwork.jsx'
import { ArcStack } from '../art/primitives.jsx'
import { getCategory } from '../data/categories.js'
import { getProject, getProjectNeighbours } from '../data/projects.js'
import { navigate } from '../lib/router.jsx'
import NotFound from './NotFound.jsx'

/**
 * A single work, read like a catalogue entry.
 *
 * The supporting plates are the same motif engine re-seeded at other canvas
 * shapes, so a project shows several genuinely different compositions of the
 * same idea instead of one image repeated.
 */

const EASE = [0.16, 0.84, 0.32, 1]
const GALLERY_RATIOS = ['landscape', 'portrait', 'square', 'wide', 'tall']

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
  const plates = GALLERY_RATIOS.filter((ratio) => ratio !== project.ratio).slice(0, 4)

  return (
    <div className="page work" style={{ '--accent': project.accent }}>
      <header className="work__hero">
        <div className="work__hero-art">
          <Artwork
            motif={project.motif}
            ratio={project.ratio}
            category={project.category}
            seed={project.id}
            title={`${project.title} — principal artwork`}
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
            <span>{project.year}</span>
          </p>

          <h1 className="work__title deco">{project.title}</h1>
          <p className="work__sub serif">{project.subtitle}</p>
          <p className="eyebrow work__strap">{category.strap}</p>

          <dl className="work__facts">
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{project.medium}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
          </dl>
        </motion.div>
      </header>

      <div className="work__body">
        <div className="work__intro">
          <p className="lede work__intro-lede">{project.intro}</p>

          <Section index={1} eyebrow="Objective" title="What it had to do">
            <p className="body-text">{project.objective}</p>
          </Section>

          <Section index={2} eyebrow="Challenge" title="The difficulty at the centre">
            <p className="body-text">{project.challenge}</p>
          </Section>

          <Section index={3} eyebrow="Inspiration" title="Where it came from">
            <p className="body-text">{project.inspiration}</p>
          </Section>
        </div>

        <aside className="work__aside" aria-label="Materials and techniques">
          <p className="eyebrow">Tools &amp; techniques</p>
          <ul className="work__tools">
            {project.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </aside>
      </div>

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

      <section className="work__gallery" aria-label="Project gallery">
        <div className="work__gallery-head">
          <p className="eyebrow">Gallery</p>
          <h2 className="work__section-title serif">Studies from the same idea</h2>
        </div>

        <ol className="work__plates">
          {plates.map((ratio, index) => (
            <motion.li
              key={ratio}
              className={`plate work__plate work__plate--${ratio}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: EASE, delay: (index % 2) * 0.08 }}
            >
              <span className="plate__media" style={{ '--ratio': ratioValue(ratio) }}>
                <Artwork
                  motif={project.motif}
                  ratio={ratio}
                  category={project.category}
                  seed={`${project.id}-study-${index + 1}`}
                  title={`${project.title} — study ${index + 1}`}
                />
              </span>
              <span className="work__plate-label eyebrow">
                Study {String(index + 1).padStart(2, '0')} · {ratio}
              </span>
            </motion.li>
          ))}
        </ol>
      </section>

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

      <section className="work__outcome" aria-label="Outcome">
        <p className="eyebrow">Final outcome</p>
        <p className="work__outcome-text serif">{project.outcome}</p>
      </section>

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
