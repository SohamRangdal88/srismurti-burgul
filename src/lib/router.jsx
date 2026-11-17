import { useEffect, useState } from 'react'

/**
 * Tiny hash router. The journey is a single continuous experience, so a
 * heavyweight router would fight the storytelling. Hash routes keep every
 * world and project deep-linkable without a server.
 */

let pendingIntent = null

export function setIntent(intent) {
  pendingIntent = intent || null
}

export function takeIntent() {
  const intent = pendingIntent
  pendingIntent = null
  return intent
}

export function parseHash(hash) {
  const parts = String(hash || '')
    .replace(/^#/, '')
    .split('/')
    .filter(Boolean)

  if (parts.length === 0) return { name: 'journey' }
  if (parts[0] === 'about') return { name: 'about' }
  if (parts[0] === 'contact') return { name: 'contact' }
  if (parts[0] === 'world' && parts[1]) {
    return parts[2]
      ? { name: 'project', categoryId: parts[1], projectId: parts[2] }
      : { name: 'world', categoryId: parts[1] }
  }
  return { name: 'notFound' }
}

export function navigate(path, intent) {
  setIntent(intent)
  const target = path.startsWith('#') ? path : `#${path}`
  if (window.location.hash === target) {
    // Same route: nudge listeners so intent-driven scroll still happens.
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    return
  }
  window.location.hash = target
}

/** Global key so every route is remounted (and re-animated) on change. */
export function routeKey(route) {
  if (route.name === 'project') return `project:${route.categoryId}:${route.projectId}`
  if (route.name === 'world') return `world:${route.categoryId}`
  return route.name
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
