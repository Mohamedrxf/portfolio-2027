/**
 * Animation Motion Helpers and Constants
 * 
 * Reusable motion constants and helper wrappers for Framer Motion.
 * These provide a consistent API for common animation patterns.
 */

import { MotionProps } from 'framer-motion'
import { fade, fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, scaleOut, slideUp, slideDown } from './variants'
import { normal, fast, slow, spring, smooth } from './transitions'
import { defaultViewport } from './viewport'

// ============================================================================
// MOTION CONSTANTS
// ============================================================================

export const motionConstants = {
  // Duration constants (in seconds)
  duration: {
    instant: 0.05,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
    slowest: 1.0,
  },

  // Delay constants (in seconds)
  delay: {
    none: 0,
    short: 0.1,
    normal: 0.2,
    long: 0.3,
    longer: 0.5,
  },

  // Stagger constants (in seconds)
  stagger: {
    none: 0,
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    slower: 0.2,
  },

  // Easing constants (cubic-bezier)
  easing: {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  },
} as const

// ============================================================================
// HELPER WRAPPERS
// ============================================================================

/**
 * Fade in animation props
 */
export const fadeInProps = (customDelay?: number): MotionProps => ({
  variants: fade,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...normal, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Fade up animation props
 */
export const fadeUpProps = (customDelay?: number): MotionProps => ({
  variants: fadeUp,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...normal, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Fade down animation props
 */
export const fadeDownProps = (customDelay?: number): MotionProps => ({
  variants: fadeDown,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...normal, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Fade left animation props
 */
export const fadeLeftProps = (customDelay?: number): MotionProps => ({
  variants: fadeLeft,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...normal, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Fade right animation props
 */
export const fadeRightProps = (customDelay?: number): MotionProps => ({
  variants: fadeRight,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...normal, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Scale in animation props
 */
export const scaleInProps = (customDelay?: number): MotionProps => ({
  variants: scaleIn,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...spring, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Scale out animation props
 */
export const scaleOutProps = (customDelay?: number): MotionProps => ({
  variants: scaleOut,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...spring, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Slide up animation props
 */
export const slideUpProps = (customDelay?: number): MotionProps => ({
  variants: slideUp,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...slow, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Slide down animation props
 */
export const slideDownProps = (customDelay?: number): MotionProps => ({
  variants: slideDown,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...slow, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Stagger container props
 */
export const staggerContainerProps = (staggerDelay?: number): MotionProps => ({
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay || motionConstants.stagger.normal,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay || motionConstants.stagger.normal,
        staggerDirection: -1,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  viewport: defaultViewport as any,
})

/**
 * Stagger item props
 */
export const staggerItemProps = (customDelay?: number): MotionProps => ({
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: customDelay },
    },
    exit: {
      opacity: 0,
      y: 20,
    },
  },
  viewport: defaultViewport as any,
})

/**
 * Quick fade animation props (faster transition)
 */
export const quickFadeProps = (customDelay?: number): MotionProps => ({
  variants: fade,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...fast, delay: customDelay },
  viewport: defaultViewport as any,
})

/**
 * Smooth fade animation props (smoother transition)
 */
export const smoothFadeProps = (customDelay?: number): MotionProps => ({
  variants: fade,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  transition: { ...smooth, delay: customDelay },
  viewport: defaultViewport as any,
})