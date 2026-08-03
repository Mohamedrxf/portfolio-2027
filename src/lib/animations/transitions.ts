/**
 * Animation Transitions
 * 
 * Reusable transition presets for Framer Motion animations.
 * These use centralized design tokens where possible for consistency.
 */

import { Transition } from 'framer-motion'

// Fast transition (150ms)
export const fast: Transition = {
  duration: 0.15,
  ease: [0, 0, 0.2, 1], // ease-out
}

// Normal transition (300ms)
export const normal: Transition = {
  duration: 0.3,
  ease: [0, 0, 0.2, 1], // ease-out
}

// Slow transition (500ms)
export const slow: Transition = {
  duration: 0.5,
  ease: [0, 0, 0.2, 1], // ease-out
}

// Spring transition (bouncy)
export const spring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// Smooth transition (ease-in-out)
export const smooth: Transition = {
  duration: 0.4,
  ease: [0.42, 0, 0.58, 1], // ease-in-out
}

// Bounce transition
export const bounce: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
}

// Instant transition (50ms)
export const instant: Transition = {
  duration: 0.05,
  ease: [0.4, 0, 0.2, 1], // ease-out
}

// Slower transition (700ms)
export const slower: Transition = {
  duration: 0.7,
  ease: [0, 0, 0.2, 1], // ease-out
}

// Slowest transition (1000ms)
export const slowest: Transition = {
  duration: 1,
  ease: [0, 0, 0.2, 1], // ease-out
}

// Elastic transition
export const elastic: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 20,
}

// Linear transition
export const linear: Transition = {
  duration: 0.3,
  ease: 'linear',
}

// Ease-in transition
export const easeIn: Transition = {
  duration: 0.3,
  ease: [0.42, 0, 1, 1], // cubic-bezier(0.42, 0, 1, 1) - ease-in
}

// Ease-out transition
export const easeOut: Transition = {
  duration: 0.3,
  ease: [0, 0, 0.58, 1], // cubic-bezier(0, 0, 0.58, 1) - ease-out
}

// Ease-in-out transition
export const easeInOut: Transition = {
  duration: 0.3,
  ease: [0.42, 0, 0.58, 1], // cubic-bezier(0.42, 0, 0.58, 1) - ease-in-out
}