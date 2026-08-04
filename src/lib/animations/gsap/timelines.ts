/**
 * GSAP Timeline Helpers
 * 
 * Reusable functions for creating GSAP timelines with consistent configurations.
 */

import gsap from 'gsap'
import { defaultConfig } from './defaults'

// ============================================================================
// TIMELINE CONFIGURATION TYPES
// ============================================================================

export interface TimelineConfig {
  paused?: boolean
  reversed?: boolean
  delay?: number
  repeat?: number
  repeatDelay?: number
  yoyo?: boolean
  defaults?: gsap.TweenVars
  onComplete?: () => void
  onStart?: () => void
  onUpdate?: () => void
  onRepeat?: () => void
  onReverseComplete?: () => void
}

// ============================================================================
// BASIC TIMELINE CREATION
// ============================================================================

/**
 * Create a basic GSAP timeline with default configuration
 */
export const createTimeline = (config?: TimelineConfig): any => {
  return gsap.timeline({
    paused: config?.paused ?? false,
    reversed: config?.reversed ?? false,
    delay: config?.delay ?? 0,
    repeat: config?.repeat ?? 0,
    repeatDelay: config?.repeatDelay ?? 0,
    yoyo: config?.yoyo ?? false,
    defaults: {
      ...defaultConfig,
      ...config?.defaults,
    },
    onComplete: config?.onComplete,
    onStart: config?.onStart,
    onUpdate: config?.onUpdate,
    onRepeat: config?.onRepeat,
    onReverseComplete: config?.onReverseComplete,
  })
}

// ============================================================================
// SEQUENTIAL TIMELINE
// ============================================================================

/**
 * Create a sequential timeline (animations play one after another)
 * Accepts an array of tween configurations
 */
export const createSequentialTimeline = (
  tweens: Array<{
    target: gsap.TweenTarget
    props: gsap.TweenVars
    position?: string | number
  }>,
  config?: TimelineConfig
): any => {
  const timeline = createTimeline(config)

  tweens.forEach(({ target, props, position }) => {
    timeline.to(target, props, position)
  })

  return timeline
}

// ============================================================================
// PARALLEL TIMELINE
// ============================================================================

/**
 * Create a parallel timeline (animations play simultaneously)
 * Accepts an array of tween configurations
 */
export const createParallelTimeline = (
  tweens: Array<{
    target: gsap.TweenTarget
    props: gsap.TweenVars
  }>,
  config?: TimelineConfig
): any => {
  const timeline = createTimeline(config)

  tweens.forEach(({ target, props }) => {
    timeline.to(target, props, '<') // '<' makes animations start at the same time
  })

  return timeline
}

// ============================================================================
// STAGGERED TIMELINE
// ============================================================================

/**
 * Create a staggered timeline (animations play with stagger delay)
 * Accepts an array of targets and tween configuration
 */
export const createStaggeredTimeline = (
  targets: gsap.TweenTarget,
  props: gsap.TweenVars,
  stagger: number | gsap.StaggerVars,
  config?: TimelineConfig
): any => {
  const timeline = createTimeline(config)

  timeline.to(targets, {
    ...props,
    stagger,
  })

  return timeline
}

// ============================================================================
// LABELED TIMELINE
// ============================================================================

/**
 * Create a timeline with labeled positions for easier control
 */
export const createLabeledTimeline = (
  labels: Record<string, string | number>,
  tweens: Array<{
    target: gsap.TweenTarget
    props: gsap.TweenVars
    position?: string
  }>,
  config?: TimelineConfig
): any => {
  const timeline = createTimeline(config)

  // Add labels to timeline
  Object.entries(labels).forEach(([label, position]) => {
    timeline.addLabel(label, position)
  })

  // Add tweens at labeled positions
  tweens.forEach(({ target, props, position }) => {
    timeline.to(target, props, position)
  })

  return timeline
}

// ============================================================================
// TIMELINE CONTROL HELPERS
// ============================================================================

/**
 * Play a timeline and return it
 */
export const playTimeline = (timeline: any): any => {
  timeline.play()
  return timeline
}

/**
 * Pause a timeline and return it
 */
export const pauseTimeline = (timeline: any): any => {
  timeline.pause()
  return timeline
}

/**
 * Reverse a timeline and return it
 */
export const reverseTimeline = (timeline: any): any => {
  timeline.reverse()
  return timeline
}

/**
 * Restart a timeline and return it
 */
export const restartTimeline = (timeline: any): any => {
  timeline.restart()
  return timeline
}

/**
 * Kill a timeline (cleanup)
 */
export const killTimeline = (timeline: any): void => {
  timeline.kill()
}

/**
 * Get timeline progress (0-1)
 */
export const getTimelineProgress = (timeline: any): number => {
  return timeline.progress()
}

/**
 * Set timeline progress
 */
export const setTimelineProgress = (
  timeline: any,
  progress: number
): any => {
  timeline.progress(progress)
  return timeline
}

/**
 * Get timeline time
 */
export const getTimelineTime = (timeline: any): number => {
  return timeline.time()
}

/**
 * Set timeline time
 */
export const setTimelineTime = (
  timeline: any,
  time: number
): any => {
  timeline.time(time)
  return timeline
}