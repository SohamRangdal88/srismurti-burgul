import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { Sunburst } from '../../art/primitives.jsx'

/**
 * A short opening veil. It gives the illustrated world a moment to arrive and
 * covers the font swap, then lifts away like a theatre curtain.
 */
export default function Curtain() {
  const [lifted, setLifted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setLifted(true), 1500)
    const release = () => setLifted(true)
    window.addEventListener('keydown', release)
    window.addEventListener('pointerdown', release)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', release)
      window.removeEventListener('pointerdown', release)
    }
  }, [])

  return (
    <AnimatePresence>
      {!lifted && (
        <motion.div
          className="curtain"
          key="curtain"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { y: '-101%', transition: { duration: 1.05, ease: [0.76, 0, 0.24, 1] } }
          }
          aria-hidden="true"
        >
          <div className="curtain__art">
            <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <Sunburst cx={200} cy={230} r={150} rays={26} color="rgba(200,162,76,0.4)" inner={0.34} />
              <circle cx={200} cy={230} r={54} fill="none" stroke="rgba(243,231,207,0.55)" strokeWidth="1.5" />
              <line x1="30" y1="330" x2="370" y2="330" stroke="rgba(243,231,207,0.35)" strokeWidth="1" />
            </svg>
          </div>
          <p className="curtain__title deco">The Long Way Round</p>
          <p className="curtain__sub eyebrow">Weaving · Print · Graphic · Innovation</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
