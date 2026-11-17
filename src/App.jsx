import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { routeKey, useRoute } from './lib/router.jsx'
import TopBar from './components/chrome/TopBar.jsx'
import Grain from './components/chrome/Grain.jsx'
import Cursor from './components/chrome/Cursor.jsx'
import Curtain from './components/chrome/Curtain.jsx'

import Journey from './pages/Journey.jsx'
import World from './pages/World.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function renderRoute(route) {
  switch (route.name) {
    case 'journey':
      return <Journey />
    case 'world':
      return <World categoryId={route.categoryId} />
    case 'project':
      return <ProjectPage categoryId={route.categoryId} projectId={route.projectId} />
    case 'about':
      return <About />
    case 'contact':
      return <Contact />
    default:
      return <NotFound />
  }
}

export default function App() {
  const route = useRoute()
  const key = routeKey(route)
  const reduceMotion = useReducedMotion()

  return (
    <>
      <a className="skip-link" href="#experience">
        Skip to the journey
      </a>

      <TopBar route={route} />

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
      >
        <motion.main
          id="experience"
          key={key}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.014, y: 26 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.994, y: -18 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.72, ease: [0.16, 0.84, 0.32, 1] }}
        >
          {renderRoute(route)}
        </motion.main>
      </AnimatePresence>

      <Grain />
      <Cursor />
      <Curtain />
    </>
  )
}
