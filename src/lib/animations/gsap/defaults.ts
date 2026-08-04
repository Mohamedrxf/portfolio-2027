/**
 * GSAP Default Configuration
 * 
 * Centralized default values for GSAP animations.
 * No magic numbers - all values are defined here for consistency.
 */

// ============================================================================
// DURATION DEFAULTS (in seconds)
// ============================================================================

export const duration = {
  instant: 0.05, // 50ms
  fast: 0.15, // 150ms
  normal: 0.3, // 300ms
  slow: 0.5, // 500ms
  slower: 0.7, // 700ms
  slowest: 1.0, // 1000ms
} as const

// ============================================================================
// EASING DEFAULTS
// ============================================================================

export const ease = {
  none: 'none' as string,
  power1: 'power1.out' as string,
  power2: 'power2.out' as string,
  power3: 'power3.out' as string,
  power4: 'power4.out' as string,
  back: 'back.out(1.7)' as string,
  elastic: 'elastic.out(1, 0.3)' as string,
  bounce: 'bounce.out' as string,
  circ: 'circ.out' as string,
  expo: 'expo.out' as string,
  sine: 'sine.out' as string,
  steps: 'steps(5)' as string,
} as const

// ============================================================================
// STAGGER DEFAULTS (in seconds)
// ============================================================================

export const stagger = {
  none: 0,
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  slower: 0.2,
} as const

// ============================================================================
// OVERWRITE DEFAULTS
// ============================================================================

export const overwrite = {
  auto: 'auto' as const,
  true: true as const,
  false: false as const,
} as const

// ============================================================================
// AUTO ALPHA DEFAULTS
// ============================================================================

export const autoAlpha = {
  enabled: 1,
  disabled: 0,
} as const

// ============================================================================
// DEFAULT CONFIGURATION OBJECT
// ============================================================================

export const defaultConfig = {
  duration: duration.normal,
  ease: ease.power2,
  stagger: stagger.normal,
  overwrite: overwrite.auto,
} as const

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

export const presets = {
  // Fast fade animation
  fastFade: {
    duration: duration.fast,
    ease: ease.power1,
  },

  // Normal fade animation
  normalFade: {
    duration: duration.normal,
    ease: ease.power2,
  },

  // Slow fade animation
  slowFade: {
    duration: duration.slow,
    ease: ease.power3,
  },

  // Bouncy animation
  bouncy: {
    duration: duration.normal,
    ease: ease.back,
  },

  // Elastic animation
  elastic: {
    duration: duration.slow,
    ease: ease.elastic,
  },

  // Smooth animation
  smooth: {
    duration: duration.normal,
    ease: ease.power3,
  },

  // Quick stagger
  quickStagger: {
    stagger: stagger.fast,
  },

  // Normal stagger
  normalStagger: {
    stagger: stagger.normal,
  },

  // Slow stagger
  slowStagger: {
    stagger: stagger.slow,
  },
} as const

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type DurationKey = keyof typeof duration
export type EaseKey = keyof typeof ease
export type StaggerKey = keyof typeof stagger
export type OverwriteKey = keyof typeof overwrite
export type PresetKey = keyof typeof presets