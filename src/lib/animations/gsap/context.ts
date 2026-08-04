/**
 * GSAP Context Helpers
 * 
 * Reusable helpers for GSAP.context() with automatic cleanup
 * Designed for React compatibility and proper memory management.
 */

import gsap from 'gsap'

// ============================================================================
// CONTEXT HELPER FUNCTIONS
// ============================================================================

/**
 * Create a GSAP context with automatic cleanup
 * Returns the context and a cleanup function
 */
export const createGSAPContext = (
  scope: HTMLElement,
  callback: (context: gsap.Context) => void
): { context: gsap.Context; cleanup: () => void } => {
  const context = gsap.context(callback, scope)

  const cleanup = () => {
    context.revert()
  }

  return { context, cleanup }
}

/**
 * Safe context creation with error handling
 */
export const safeContext = (
  scope: HTMLElement | null | undefined,
  callback: (context: gsap.Context) => void
): gsap.Context | null => {
  if (!scope) {
    console.warn('GSAP context: scope is null or undefined')
    return null
  }

  try {
    return gsap.context(callback, scope)
  } catch (error) {
    console.error('GSAP context creation failed:', error)
    return null
  }
}

// ============================================================================
// CONTEXT UTILITIES
// ============================================================================

/**
 * Get all animations in a context
 */
export const getContextAnimations = (context: gsap.Context): gsap.core.Animation[] => {
  return context.data?.map((data: any) => data.animation) || []
}

/**
 * Kill all animations in a context
 */
export const killContextAnimations = (context: gsap.Context): void => {
  const animations = getContextAnimations(context)
  animations.forEach((animation) => animation.kill())
}

/**
 * Pause all animations in a context
 */
export const pauseContextAnimations = (context: gsap.Context): void => {
  const animations = getContextAnimations(context)
  animations.forEach((animation) => animation.pause())
}

/**
 * Resume all animations in a context
 */
export const resumeContextAnimations = (context: gsap.Context): void => {
  const animations = getContextAnimations(context)
  animations.forEach((animation) => animation.resume())
}

/**
 * Restart all animations in a context
 */
export const restartContextAnimations = (context: gsap.Context): void => {
  const animations = getContextAnimations(context)
  animations.forEach((animation) => animation.restart())
}

// ============================================================================
// CONTEXT SELECTOR HELPERS
// ============================================================================

/**
 * Select elements within a context scope
 */
export const selectInContext = (
  context: gsap.Context,
  selector: string
): Element[] => {
  return gsap.utils.selector(context.data?.scope || document)(selector)
}

/**
 * Select element within a context scope
 */
export const selectOneInContext = (
  context: gsap.Context,
  selector: string
): Element | null => {
  const elements = selectInContext(context, selector)
  return elements[0] || null
}

// ============================================================================
// CONTEXT VALIDATION
// ============================================================================

/**
 * Check if context is valid and active
 */
export const isContextValid = (context: gsap.Context | null): boolean => {
  return context !== null && typeof context.revert === 'function'
}

/**
 * Get context scope element
 */
export const getContextScope = (context: gsap.Context): HTMLElement | null => {
  return context.data?.scope || null
}