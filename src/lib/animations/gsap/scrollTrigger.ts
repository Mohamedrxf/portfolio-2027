/**
 * GSAP ScrollTrigger Helpers
 * 
 * Reusable helper functions for creating ScrollTrigger configurations.
 * No page-specific logic - only reusable infrastructure.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { defaultConfig } from './defaults'

// ============================================================================
// SCROLLTRIGGER CONFIGURATION TYPES
// ============================================================================

export interface ScrollTriggerConfig {
  trigger?: Element | string
  start?: string | number
  end?: string | number
  scrub?: boolean | number
  pin?: boolean | string
  anticipatePin?: number
  toggleActions?: string
  toggleClass?: string | { targets: string | Element; className: string }
  id?: string
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  onUpdate?: (self: ScrollTrigger) => void
  onRefresh?: () => void
  onScrubComplete?: () => void
  onToggle?: (self: ScrollTrigger) => void
  progress?: number
  animation?: gsap.core.Animation
}

// ============================================================================
// BASIC TRIGGER
// ============================================================================

/**
 * Create a basic ScrollTrigger
 * Animates when element enters viewport
 */
export const createBasicTrigger = (
  target: gsap.TweenTarget,
  props: gsap.TweenVars,
  config?: ScrollTriggerConfig
): ScrollTrigger => {
  const tween = gsap.to(target, {
    ...defaultConfig,
    ...props,
    scrollTrigger: {
      start: 'top bottom-=100',
      end: 'bottom top+=100',
      toggleActions: 'play none none reverse',
      ...config,
    },
  })

  return tween.scrollTrigger as ScrollTrigger
}

// ============================================================================
// ONCE TRIGGER
// ============================================================================

/**
 * Create a once-only ScrollTrigger
 * Animation plays only once when element enters viewport
 */
export const createOnceTrigger = (
  target: gsap.TweenTarget,
  props: gsap.TweenVars,
  config?: ScrollTriggerConfig
): ScrollTrigger => {
  const tween = gsap.to(target, {
    ...defaultConfig,
    ...props,
    scrollTrigger: {
      start: 'top bottom-=100',
      toggleActions: 'play none none none',
      ...config,
    },
  })

  return tween.scrollTrigger as ScrollTrigger
}

// ============================================================================
// SCRUB TRIGGER
// ============================================================================

/**
 * Create a scrub ScrollTrigger
 * Animation scrubs based on scroll position
 */
export const createScrubTrigger = (
  target: gsap.TweenTarget,
  props: gsap.TweenVars,
  scrubValue: boolean | number = true,
  config?: ScrollTriggerConfig
): ScrollTrigger => {
  const tween = gsap.to(target, {
    ...defaultConfig,
    ...props,
    scrollTrigger: {
      start: 'top bottom',
      end: 'bottom top',
      scrub: scrubValue,
      ...config,
    },
  })

  return tween.scrollTrigger as ScrollTrigger
}

// ============================================================================
// PIN TRIGGER
// ============================================================================

/**
 * Create a pin ScrollTrigger
 * Pins element while animating
 */
export const createPinTrigger = (
  target: gsap.TweenTarget,
  props: gsap.TweenVars,
  pinConfig?: {
    pin?: boolean | string
    anticipatePin?: number
    end?: string | number
  },
  config?: ScrollTriggerConfig
): ScrollTrigger => {
  const tween = gsap.to(target, {
    ...defaultConfig,
    ...props,
    scrollTrigger: {
      start: 'top top',
      pin: pinConfig?.pin ?? true,
      anticipatePin: pinConfig?.anticipatePin ?? 1,
      end: pinConfig?.end ?? '+=100%',
      ...config,
    },
  })

  return tween.scrollTrigger as ScrollTrigger
}

// ============================================================================
// RESPONSIVE TRIGGER
// ============================================================================

/**
 * Create a responsive ScrollTrigger
 * Different behavior based on viewport size
 */
export const createResponsiveTrigger = (
  target: gsap.TweenTarget,
  props: gsap.TweenVars,
  breakpoints: {
    mobile?: ScrollTriggerConfig
    tablet?: ScrollTriggerConfig
    desktop?: ScrollTriggerConfig
  },
  config?: ScrollTriggerConfig
): ScrollTrigger[] => {
  const triggers: ScrollTrigger[] = []

  Object.entries(breakpoints).forEach(([breakpoint, bpConfig]) => {
    gsap.matchMedia({
      [breakpoint]: () => {
        const tween = gsap.to(target, {
          ...defaultConfig,
          ...props,
          scrollTrigger: {
            ...config,
            ...bpConfig,
          },
        })
        triggers.push(tween.scrollTrigger as ScrollTrigger)
      },
    })
  })

  return triggers
}

// ============================================================================
// BATCH TRIGGER
// ============================================================================

/**
 * Create a batch ScrollTrigger
 * Animates multiple elements in batch
 */
export const createBatchTrigger = (
  targets: string,
  props: gsap.TweenVars,
  config?: any
): ScrollTrigger => {
  ScrollTrigger.batch(targets, {
    onEnter: (elements: Element[]) => {
      gsap.to(elements, {
        ...defaultConfig,
        ...props,
      })
    },
    ...config,
  })

  // Return the last created trigger (or create a reference)
  return ScrollTrigger.getAll()[ScrollTrigger.getAll().length - 1]
}

// ============================================================================
// TIMELINE TRIGGER
// ============================================================================

/**
 * Create a ScrollTrigger for a timeline
 */
export const createTimelineTrigger = (
  timeline: any,
  config?: ScrollTriggerConfig
): ScrollTrigger => {
  const trigger = ScrollTrigger.create({
    animation: timeline,
    start: 'top bottom-=100',
    end: 'bottom top+=100',
    toggleActions: 'play none none reverse',
    ...config,
  })

  return trigger
}

// ============================================================================
// SCROLLTRIGGER UTILITIES
// ============================================================================

/**
 * Refresh all ScrollTriggers
 */
export const refreshScrollTriggers = (): void => {
  ScrollTrigger.refresh()
}

/**
 * Kill all ScrollTriggers
 */
export const killScrollTriggers = (): void => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

/**
 * Get all ScrollTriggers
 */
export const getAllScrollTriggers = (): ScrollTrigger[] => {
  return ScrollTrigger.getAll()
}

/**
 * Kill specific ScrollTrigger
 */
export const killScrollTrigger = (trigger: ScrollTrigger): void => {
  trigger.kill()
}

/**
 * Enable/disable ScrollTrigger
 */
export const toggleScrollTrigger = (
  trigger: ScrollTrigger,
  enabled: boolean
): void => {
  trigger.enable(enabled ? true : false)
}

/**
 * Update ScrollTrigger configuration
 */
export const updateScrollTrigger = (
  trigger: ScrollTrigger,
  config: Partial<ScrollTriggerConfig>
): void => {
  Object.entries(config).forEach(([key, value]) => {
    if (key in trigger) {
      (trigger as any)[key] = value
    }
  })
  // trigger.refresh() - removed as it may not exist
}