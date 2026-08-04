/**
 * GSAP Helper Utilities
 * 
 * Reusable helper functions that wrap GSAP APIs for common operations.
 * Provides a consistent interface for animation utilities.
 */

import gsap from 'gsap'
import { defaultConfig } from './defaults'

// ============================================================================
// FADE HELPERS
// ============================================================================

/**
 * Fade in animation
 */
export const fadeElement = (
  target: gsap.TweenTarget,
  duration: number = 0.3,
  opacity: number = 1
): gsap.core.Tween => {
  return gsap.to(target, {
    opacity,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Fade out animation
 */
export const fadeOutElement = (
  target: gsap.TweenTarget,
  duration: number = 0.3,
  opacity: number = 0
): gsap.core.Tween => {
  return gsap.to(target, {
    opacity,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Fade from animation
 */
export const fadeFromElement = (
  target: gsap.TweenTarget,
  fromOpacity: number = 0,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.from(target, {
    opacity: fromOpacity,
    duration,
    ease: defaultConfig.ease,
  })
}

// ============================================================================
// MOVE HELPERS
// ============================================================================

/**
 * Move animation (x, y)
 */
export const moveElement = (
  target: gsap.TweenTarget,
  x: number = 0,
  y: number = 0,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    x,
    y,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Move X animation
 */
export const moveXElement = (
  target: gsap.TweenTarget,
  x: number,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    x,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Move Y animation
 */
export const moveYElement = (
  target: gsap.TweenTarget,
  y: number,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    y,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Move from animation
 */
export const moveFromElement = (
  target: gsap.TweenTarget,
  fromX: number = 0,
  fromY: number = 0,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.from(target, {
    x: fromX,
    y: fromY,
    duration,
    ease: defaultConfig.ease,
  })
}

// ============================================================================
// SCALE HELPERS
// ============================================================================

/**
 * Scale animation
 */
export const scaleElement = (
  target: gsap.TweenTarget,
  scaleX: number = 1,
  scaleY: number = 1,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    scaleX,
    scaleY,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Scale from animation
 */
export const scaleFromElement = (
  target: gsap.TweenTarget,
  fromScale: number = 0,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.from(target, {
    scale: fromScale,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Scale to animation
 */
export const scaleToElement = (
  target: gsap.TweenTarget,
  toScale: number = 1,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    scale: toScale,
    duration,
    ease: defaultConfig.ease,
  })
}

// ============================================================================
// ROTATE HELPERS
// ============================================================================

/**
 * Rotate animation
 */
export const rotateElement = (
  target: gsap.TweenTarget,
  rotation: number,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    rotation,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Rotate X animation
 */
export const rotateXElement = (
  target: gsap.TweenTarget,
  rotationX: number,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    rotationX,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Rotate Y animation
 */
export const rotateYElement = (
  target: gsap.TweenTarget,
  rotationY: number,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    rotationY,
    duration,
    ease: defaultConfig.ease,
  })
}

// ============================================================================
// SET HELPERS
// ============================================================================

/**
 * Set properties instantly (no animation)
 */
export const setProperties = (
  target: gsap.TweenTarget,
  props: gsap.TweenVars
): gsap.core.Tween => {
  return gsap.set(target, props)
}

/**
 * Set opacity instantly
 */
export const setOpacity = (
  target: gsap.TweenTarget,
  opacity: number
): gsap.core.Tween => {
  return gsap.set(target, { opacity })
}

/**
 * Set position instantly
 */
export const setPosition = (
  target: gsap.TweenTarget,
  x: number = 0,
  y: number = 0
): gsap.core.Tween => {
  return gsap.set(target, { x, y })
}

/**
 * Set scale instantly
 */
export const setScale = (
  target: gsap.TweenTarget,
  scale: number = 1
): gsap.core.Tween => {
  return gsap.set(target, { scale })
}

// ============================================================================
// UTILITY HELPERS
// ============================================================================

/**
 * Kill animation(s)
 */
export const kill = (animation: gsap.core.Animation | gsap.core.Animation[]): void => {
  if (Array.isArray(animation)) {
    animation.forEach((anim) => anim.kill())
  } else {
    animation.kill()
  }
}

/**
 * Kill all animations on target
 */
export const killAll = (target: gsap.TweenTarget): void => {
  gsap.killTweensOf(target)
}

/**
 * Refresh all GSAP animations
 */
export const refresh = (): void => {
  // gsap.refresh() doesn't exist, use ScrollTrigger.refresh() if needed
}

/**
 * Revert all GSAP animations
 */
export const revert = (): void => {
  gsap.globalTimeline.revert()
}

/**
 * Clear all GSAP animations
 */
export const clear = (): void => {
  gsap.globalTimeline.clear()
}

/**
 * Pause all animations
 */
export const pauseAll = (): void => {
  gsap.globalTimeline.pause()
}

/**
 * Resume all animations
 */
export const resumeAll = (): void => {
  gsap.globalTimeline.resume()
}

/**
 * Get global timeline
 */
export const getGlobalTimeline = (): any => {
  return gsap.globalTimeline
}

/**
 * Get all tweens
 */
export const getAllTweens = (): any[] => {
  return gsap.globalTimeline.getChildren()
}

/**
 * Get time scale (playback speed)
 */
export const getTimeScale = (): number => {
  return gsap.globalTimeline.timeScale()
}

/**
 * Set time scale (playback speed)
 */
export const setTimeScale = (scale: number): void => {
  gsap.globalTimeline.timeScale(scale)
}

// ============================================================================
// COMBINED HELPERS
// ============================================================================

/**
 * Fade and move animation
 */
export const fadeAndMoveElement = (
  target: gsap.TweenTarget,
  opacity: number = 1,
  x: number = 0,
  y: number = 0,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    opacity,
    x,
    y,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Fade and scale animation
 */
export const fadeAndScaleElement = (
  target: gsap.TweenTarget,
  opacity: number = 1,
  scale: number = 1,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.to(target, {
    opacity,
    scale,
    duration,
    ease: defaultConfig.ease,
  })
}

/**
 * Fade from and move from animation
 */
export const fadeFromAndMoveFromElement = (
  target: gsap.TweenTarget,
  fromOpacity: number = 0,
  fromX: number = 0,
  fromY: number = 0,
  duration: number = 0.3
): gsap.core.Tween => {
  return gsap.from(target, {
    opacity: fromOpacity,
    x: fromX,
    y: fromY,
    duration,
    ease: defaultConfig.ease,
  })
}