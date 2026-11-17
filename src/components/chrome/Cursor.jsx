import { useEffect, useRef, useState } from 'react'

/**
 * A custom crosshair reticle drawn in difference blend mode, in the spirit of
 * a viewfinder on a long ride. Pointer devices only, and never for people who
 * have asked for reduced motion.
 */
export default function Cursor() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('cursor-none')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: target.x, y: target.y }
    let frame = 0
    let firstMove = true

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      if (firstMove) {
        firstMove = false
        current.x = target.x
        current.y = target.y
        setVisible(true)
      }
    }

    const onOver = (event) => {
      const node = event.target instanceof Element ? event.target.closest('a, button, [data-cursor="active"]') : null
      setActive(Boolean(node))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const tick = () => {
      current.x += (target.x - current.x) * 0.24
      current.y += (target.y - current.y) * 0.24
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`
      }
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    frame = window.requestAnimationFrame(tick)
    tick()

    return () => {
      document.documentElement.classList.remove('cursor-none')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      className="cursor"
      data-visible={visible}
      data-active={active}
      aria-hidden="true"
    >
      <span className="cursor__ring" />
      <span className="cursor__cross" />
    </div>
  )
}
