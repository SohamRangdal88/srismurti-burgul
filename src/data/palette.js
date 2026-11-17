/**
 * The single source of truth for the entire colour world.
 * Every illustrated layer, generated artwork and CSS token reads from here,
 * so the Art Deco palette can never drift out of tune.
 */
export const PALETTE = {
  paper: '#f7efdd',
  cream: '#f3e7cf',
  creamDeep: '#e8d8b8',
  sand: '#dcc9a2',
  gold: '#c8a24c',
  goldDeep: '#a8823a',
  olive: '#6d7647',
  oliveDeep: '#4d5735',
  forest: '#2c3d31',
  forestDeep: '#1e2a22',
  teal: '#2f6b62',
  tealDeep: '#1f4a45',
  dustyBlue: '#7b93a6',
  dustyBlueDeep: '#546c80',
  terracotta: '#b25c3b',
  terracottaDeep: '#8b422a',
  burnt: '#c8792f',
  brown: '#6a4a31',
  brownDeep: '#452e1e',
  ink: '#291f16'
}

/** Per-category accents used by arrows, worlds and generated artwork. */
export const CATEGORY_PALETTES = {
  weaving: ['#b25c3b', '#c8792f', '#c8a24c', '#6a4a31', '#8b422a', '#6d7647'],
  print: ['#2f6b62', '#b25c3b', '#2c3d31', '#c8a24c', '#7b93a6', '#8b422a'],
  graphic: ['#c8792f', '#2f6b62', '#b25c3b', '#2c3d31', '#c8a24c', '#546c80'],
  innovation: ['#7b93a6', '#2f6b62', '#c8a24c', '#2c3d31', '#b25c3b', '#4d5735'],
  journey: ['#6d7647', '#2f6b62', '#7b93a6', '#c8a24c', '#c8792f']
}

/** Atmospheric gradient stops per category world (sky + ground). */
export const CATEGORY_SKIES = {
  weaving: { top: '#efd9b4', mid: '#dcb98c', low: '#b9794f', ground: '#4a3a28' },
  print: { top: '#cfd9d2', mid: '#9fb6ae', low: '#4f6b66', ground: '#26302b' },
  graphic: { top: '#f0d7ac', mid: '#e0a86f', low: '#b25c3b', ground: '#3a2c24' },
  innovation: { top: '#c6d2da', mid: '#8fa3b3', low: '#4a5f6e', ground: '#212a2e' }
}
