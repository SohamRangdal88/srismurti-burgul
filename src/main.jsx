import { createRoot } from 'react-dom/client'

import '@fontsource/poiret-one/latin-400.css'
import '@fontsource/fraunces/latin-400.css'
import '@fontsource/fraunces/latin-500.css'
import '@fontsource/fraunces/latin-600.css'
import '@fontsource/fraunces/latin-700.css'
import '@fontsource/fraunces/latin-900.css'
import '@fontsource/fraunces/latin-400-italic.css'
import '@fontsource/source-sans-3/latin-400.css'
import '@fontsource/source-sans-3/latin-600.css'
import '@fontsource/source-sans-3/latin-700.css'

import './styles/tokens.css'
import './styles/global.css'
import './styles/chrome.css'
import './styles/journey.css'
import './styles/world.css'
import './styles/project.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
