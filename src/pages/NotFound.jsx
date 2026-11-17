import { ArcStack, Sunburst } from '../art/primitives.jsx'
import { navigate } from '../lib/router.jsx'

/**
 * Off the map.
 *
 * Not a dead end — a lost traveller still gets the signpost, which is the only
 * navigation this site really needs.
 */

const go = (path, intent) => (event) => {
  if (event) event.preventDefault()
  navigate(path, intent)
}

export default function NotFound() {
  return (
    <div className="page doc doc--dark doc--lost">
      <svg className="doc__atmos" viewBox="0 0 900 520" aria-hidden="true">
        <Sunburst cx={450} cy={300} r={250} rays={30} color="rgba(200,162,76,0.34)" inner={0.32} />
        <ArcStack cx={450} cy={310} r0={130} count={4} step={26} color="rgba(243,231,207,0.4)" stroke={3} />
      </svg>

      <header className="doc__masthead">
        <p className="eyebrow doc__kicker">Off the map</p>
        <h1 className="doc__title deco">This Road Isn&rsquo;t Drawn</h1>
        <p className="doc__lede lede">
          Whatever was meant to be here, the illustration stops short. The lake road only goes to
          one place, and it is back the way you came.
        </p>
      </header>

      <div className="doc__body">
        <nav className="doc__index" aria-label="Where you can go instead">
          <a className="doc__index-link" href="#/" onClick={go('/', { landAt: 'signpost' })}>
            <span className="deco doc__index-label">The Signpost</span>
            <span className="doc__index-note">Four directions, one pole</span>
          </a>
          <a className="doc__index-link" href="#/about" onClick={go('/about')}>
            <span className="deco doc__index-label">About</span>
            <span className="doc__index-note">Why this is a ride</span>
          </a>
          <a className="doc__index-link" href="#/contact" onClick={go('/contact')}>
            <span className="deco doc__index-label">Contact</span>
            <span className="doc__index-note">Opening the conversation</span>
          </a>
        </nav>
      </div>
    </div>
  )
}
