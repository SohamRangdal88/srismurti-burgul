/**
 * Deterministic pseudo-random helpers.
 * Every illustration is seeded from a stable string so artwork is
 * identical on every render, every device, every reload.
 */

export function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function mulberry32(seed) {
  let a = seed >>> 0
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Small, friendly rng wrapper used by the artwork generators. */
export function makeRng(seedInput) {
  const seed = typeof seedInput === 'number' ? seedInput : hashString(String(seedInput))
  const rand = mulberry32(seed)
  return {
    seed,
    next: rand,
    range: (min, max) => min + rand() * (max - min),
    int: (min, max) => Math.floor(min + rand() * (max - min + 1)),
    pick: (arr) => arr[Math.floor(rand() * arr.length) % arr.length],
    chance: (p) => rand() < p,
    signed: (amount) => (rand() * 2 - 1) * amount
  }
}

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

export const lerp = (a, b, t) => a + (b - a) * t

/** Remap a value from one range to another, clamped. */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  lerp(outMin, outMax, clamp((v - inMin) / (inMax - inMin), 0, 1))

export const smoothstep = (t) => {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

export const easeOutCubic = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3)

export const easeInOutCubic = (t) => {
  const x = clamp(t, 0, 1)
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
