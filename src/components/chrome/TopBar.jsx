import { useEffect, useState } from 'react'

import { CATEGORIES } from '../../data/categories.js'
import { navigate } from '../../lib/router.jsx'

function DecoMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3 L28 19 H4 Z" fill="currentColor" opacity="0.9" />
      <rect x="14.4" y="18" width="3.2" height="12" fill="currentColor" opacity="0.7" />
      <circle cx="16" cy="10.5" r="2.4" fill="var(--cream)" />
    </svg>
  )
}

export default function TopBar({ route }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [route])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (path, intent) => (event) => {
    event.preventDefault()
    setOpen(false)
    navigate(path, intent)
  }

  return (
    <>
      <header className="topbar" data-scrolled={scrolled} data-open={open}>
        <a className="brand" href="#/" onClick={go('/')}>
          <DecoMark />
          <span className="brand__text">
            <span className="brand__title deco">Srismurti Burgul</span>
            <span className="brand__sub">An illustrated journey</span>
          </span>
        </a>

        <nav className="topbar__nav" aria-label="Primary">
          <a className="ghost-link" href="#/" onClick={go('/', { landAt: 'signpost' })}>
            The Signpost
          </a>
          <a className="ghost-link" href="#/about" onClick={go('/about')}>
            About
          </a>
          <a className="ghost-link" href="#/contact" onClick={go('/contact')}>
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="topbar__menu"
          aria-expanded={open}
          aria-controls="journey-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="topbar__menu-label">{open ? 'Close' : 'Menu'}</span>
          <span className="topbar__menu-bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div className="menu" id="journey-menu" data-open={open} aria-hidden={!open}>
        <div className="menu__inner">
          <p className="eyebrow menu__kicker">Four directions from one signpost</p>
          <ul className="menu__list">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <a
                  href={`#/world/${category.id}`}
                  className="menu__link"
                  tabIndex={open ? 0 : -1}
                  onClick={go(`/world/${category.id}`)}
                >
                  <span className="menu__numeral numeral">{category.numeral}</span>
                  <span className="menu__label deco">{category.label}</span>
                  <span className="menu__tagline">{category.tagline}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <a className="ghost-link" href="#/" tabIndex={open ? 0 : -1} onClick={go('/', { landAt: 'signpost' })}>
              Back to the signpost
            </a>
            <a className="ghost-link" href="#/about" tabIndex={open ? 0 : -1} onClick={go('/about')}>
              About
            </a>
            <a className="ghost-link" href="#/contact" tabIndex={open ? 0 : -1} onClick={go('/contact')}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
