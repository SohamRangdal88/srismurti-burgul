import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

import BicycleScene from '../scene/BicycleScene.jsx'
import { CATEGORIES } from '../data/categories.js'
import { navigate, takeIntent } from '../lib/router.jsx'
import { clamp, easeInOutCubic, lerp } from '../lib/random.js'
import { SIGNPOST_SETTLED } from '../lib/journey.js'

/**
 * The journey.
 *
 * One long scroll, one pinned illustrated world, one signpost. Scrolling is the
 * only thing that moves the bicycle; the scene never re-renders while you ride,
 * because scroll position lives in a ref that the scene's animation loop reads.
 *
 * The page owns three things the scene cannot know about: the invitation to
 * begin, the arrival notice, and what happens when an arrow is chosen.
 */

/** How many viewport-heights of scroll the whole ride is worth. */
const RIDE_VIEWPORTS = 6

/** Past this much scroll the signpost is near enough to be picked up by touch. */
const NEAR_ENOUGH = 0.6

export default function Journey() {
  const journeyRef = useRef(null)
  const railRef = useRef(null)
  const pctRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const progressRef = useRef(0)
  const turnRef = useRef({ yaw: 0, amount: 0, forward: 0 })
  const turningRef = useRef(false)
  const rafRef = useRef(0)

  const [started, setStarted] = useState(false)
  const [stage, setStage] = useState('ride')
  const [near, setNear] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  const hovered = hoveredId ? CATEGORIES.find((c) => c.id === hoveredId) : null

  /* ---- the scroll driver: document scroll -> ride progress ---------------- */

  useEffect(() => {
    const el = journeyRef.current
    if (!el) return

    let wasStarted = false
    let wasNear = false

    const onScroll = () => {
      const total = el.offsetHeight - window.innerHeight
      const travelled = total > 0 ? clamp(-el.getBoundingClientRect().top / total, 0, 1) : 0

      progressRef.current = travelled

      if (railRef.current) railRef.current.style.height = `${(travelled * 100).toFixed(2)}%`
      if (pctRef.current) {
        pctRef.current.textContent = `${String(Math.round(travelled * 100)).padStart(2, '0')}%`
      }

      const nextStarted = travelled > 0.012
      if (nextStarted !== wasStarted) {
        wasStarted = nextStarted
        setStarted(nextStarted)
      }

      const nextNear = travelled > NEAR_ENOUGH
      if (nextNear !== wasNear) {
        wasNear = nextNear
        setNear(nextNear)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  /* ---- landing on the signpost, either on arrival or on request ---------- */

  const rideToSignpost = useCallback(() => {
    const el = journeyRef.current
    if (!el) return
    const total = el.offsetHeight - window.innerHeight
    if (total <= 0) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: top + total * SIGNPOST_SETTLED,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const settle = (delay) => {
      const intent = takeIntent()
      if (intent && intent.landAt === 'signpost') {
        window.setTimeout(rideToSignpost, delay)
      }
    }

    // The parent resets the document to the top once the previous page has
    // finished leaving, so give it a beat before riding down to the post.
    window.requestAnimationFrame(() => settle(120))

    const onIntent = () => settle(0)
    window.addEventListener('hashchange', onIntent)
    return () => window.removeEventListener('hashchange', onIntent)
  }, [rideToSignpost])

  /* ---- choosing a direction: the handlebars turn, then the world opens --- */

  const choose = useCallback(
    (id) => {
      if (turningRef.current) return
      const category = CATEGORIES.find((c) => c.id === id)
      if (!category) return

      turningRef.current = true
      const turn = turnRef.current
      const fromYaw = turn.yaw
      const duration = reduceMotion ? 240 : 1500
      const began = performance.now()

      const step = (now) => {
        const k = clamp((now - began) / duration, 0, 1)
        const e = easeInOutCubic(k)
        turn.yaw = lerp(fromYaw, category.yaw, e)
        turn.amount = e
        turn.forward = e * 620
        if (k < 1) {
          rafRef.current = window.requestAnimationFrame(step)
        } else {
          navigate(`/world/${category.id}`)
        }
      }

      rafRef.current = window.requestAnimationFrame(step)
    },
    [reduceMotion]
  )

  useEffect(() => () => window.cancelAnimationFrame(rafRef.current), [])

  /* ---- callbacks the scene holds on to, so its loop never restarts ------- */

  const onStage = useCallback((next) => setStage(next), [])
  const onHover = useCallback((id) => setHoveredId(id), [])

  const arrived = stage === 'signpost'

  return (
    <div
      className="journey"
      ref={journeyRef}
      style={{ height: `${RIDE_VIEWPORTS * 100}svh` }}
    >
      <div className="journey__pin">
        <div className="journey__stage">
          <BicycleScene
            progressRef={progressRef}
            turnRef={turnRef}
            reduceMotion={Boolean(reduceMotion)}
            interactive={near}
            onChoose={choose}
            onHover={onHover}
            onStage={onStage}
          />
        </div>

        <div className="journey__intro" data-hidden={started} aria-hidden={started}>
          <p className="journey__intro-line serif">Every creative journey begins somewhere.</p>
          <p className="journey__hint eyebrow">Scroll to begin the journey ↓</p>
        </div>

        <div className="journey__arrival" data-show={arrived}>
          <p className="eyebrow">One signpost · four directions</p>
          <p className="journey__arrival-line serif">
            Take a board. Each one opens a different exhibition.
          </p>
        </div>

        <div
          className="signpost-label"
          data-show={Boolean(hovered)}
          style={hovered ? { '--accent': hovered.accent } : undefined}
          aria-hidden={!hovered}
        >
          <p className="eyebrow signpost-label__kicker">
            <span className="numeral">{hovered ? hovered.numeral : '·'}</span>
            {hovered ? hovered.strap : ''}
          </p>
          <p className="signpost-label__title serif">{hovered ? hovered.label : ''}</p>
          <p className="signpost-label__strap">{hovered ? hovered.tagline : ''}</p>
          <p className="signpost-label__text">{hovered ? hovered.description : ''}</p>
        </div>

        <div className="journey__rail" aria-hidden="true">
          <span className="journey__rail-fill" ref={railRef} />
        </div>
        <p className="journey__pct" ref={pctRef} aria-hidden="true">
          00%
        </p>
      </div>
    </div>
  )
}
