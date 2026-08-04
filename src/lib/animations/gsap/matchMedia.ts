/**
 * GSAP MatchMedia Helpers
 * 
 * Reusable helpers for responsive animations using GSAP MatchMedia.
 * Supports desktop, tablet, mobile, and reduced motion preferences.
 */

import gsap from 'gsap'

// ============================================================================
// BREAKPOINT DEFINITIONS
// ============================================================================

export const mediaBreakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  largeDesktop: '(min-width: 1280px)',
} as const

// ============================================================================
// REDUCED MOTION
// ============================================================================

export const reducedMotion = '(prefers-reduced-motion: reduce)'

// ============================================================================
// MATCHMEDIA CONFIGURATION TYPES
// ============================================================================

export interface MatchMediaConfig {
  isDesktop?: (context: any) => void
  isTablet?: (context: any) => void
  isMobile?: (context: any) => void
  isLargeDesktop?: (context: any) => void
  prefersReducedMotion?: (context: any) => void
}

// ============================================================================
// DESKTOP HELPER
// ============================================================================

/**
 * Create animation that only runs on desktop
 */
export const desktop = (
  callback: (context: gsap.Context) => void,
  breakpoint: string = mediaBreakpoints.desktop
): any => {
  return gsap.matchMedia({
    [breakpoint]: callback,
  })
}

// ============================================================================
// TABLET HELPER
// ============================================================================

/**
 * Create animation that only runs on tablet
 */
export const tablet = (
  callback: (context: gsap.Context) => void,
  breakpoint: string = mediaBreakpoints.tablet
): any => {
  return gsap.matchMedia({
    [breakpoint]: callback,
  })
}

// ============================================================================
// MOBILE HELPER
// ============================================================================

/**
 * Create animation that only runs on mobile
 */
export const mobile = (
  callback: (context: gsap.Context) => void,
  breakpoint: string = mediaBreakpoints.mobile
): any => {
  return gsap.matchMedia({
    [breakpoint]: callback,
  })
}

// ============================================================================
// LARGE DESKTOP HELPER
// ============================================================================

/**
 * Create animation that only runs on large desktop
 */
export const largeDesktop = (
  callback: (context: gsap.Context) => void,
  breakpoint: string = mediaBreakpoints.largeDesktop
): any => {
  return gsap.matchMedia({
    [breakpoint]: callback,
  })
}

// ============================================================================
// REDUCED MOTION HELPER
// ============================================================================

/**
 * Create animation that respects reduced motion preference
 */
export const prefersReducedMotion = (
  normalAnimation: (context: any) => void,
  reducedAnimation?: (context: any) => void
): any => {
  return gsap.matchMedia({
    // Normal animation
    [reducedMotion]: () => {
      if (reducedAnimation) {
        reducedAnimation({} as any)
      } else {
        // Skip animation entirely or use instant duration
        normalAnimation({} as any)
      }
    },
    // Reduced motion animation
    all: () => {
      normalAnimation({} as any)
    },
  })
}

// ============================================================================
// RESPONSIVE ANIMATION HELPER
// ============================================================================

/**
 * Create responsive animation with different behaviors per breakpoint
 */
export const responsive = (
  config: MatchMediaConfig
): any => {
  const matchMediaConfig: Record<string, (context: gsap.Context) => void> = {}

  if (config.isMobile) {
    matchMediaConfig[mediaBreakpoints.mobile] = config.isMobile
  }

  if (config.isTablet) {
    matchMediaConfig[mediaBreakpoints.tablet] = config.isTablet
  }

  if (config.isDesktop) {
    matchMediaConfig[mediaBreakpoints.desktop] = config.isDesktop
  }

  if (config.isLargeDesktop) {
    matchMediaConfig[mediaBreakpoints.largeDesktop] = config.isLargeDesktop
  }

  if (config.prefersReducedMotion) {
    matchMediaConfig[reducedMotion] = config.prefersReducedMotion
  }

  return gsap.matchMedia(matchMediaConfig)
}

// ============================================================================
// MOBILE FIRST HELPER
// ============================================================================

/**
 * Create mobile-first responsive animation
 * Applies mobile animation by default, overrides for larger screens
 */
export const mobileFirst = (
  mobileCallback: (context: gsap.Context) => void,
  tabletCallback?: (context: gsap.Context) => void,
  desktopCallback?: (context: gsap.Context) => void
): any => {
  const config: MatchMediaConfig = {
    isMobile: mobileCallback,
  }

  if (tabletCallback) {
    config.isTablet = tabletCallback
  }

  if (desktopCallback) {
    config.isDesktop = desktopCallback
  }

  return responsive(config)
}

// ============================================================================
// DESKTOP FIRST HELPER
// ============================================================================

/**
 * Create desktop-first responsive animation
 * Applies desktop animation by default, overrides for smaller screens
 */
export const desktopFirst = (
  desktopCallback: (context: gsap.Context) => void,
  tabletCallback?: (context: gsap.Context) => void,
  mobileCallback?: (context: gsap.Context) => void
): any => {
  const config: MatchMediaConfig = {
    isDesktop: desktopCallback,
  }

  if (tabletCallback) {
    config.isTablet = tabletCallback
  }

  if (mobileCallback) {
    config.isMobile = mobileCallback
  }

  return responsive(config)
}

// ============================================================================
// CUSTOM BREAKPOINT HELPER
// ============================================================================

/**
 * Create animation for custom breakpoint
 */
export const customBreakpoint = (
  breakpoint: string,
  callback: (context: gsap.Context) => void
): any => {
  return gsap.matchMedia({
    [breakpoint]: callback,
  })
}

// ============================================================================
// MATCHMEDIA UTILITIES
// ============================================================================

/**
 * Check if current viewport matches breakpoint
 */
export const matchesBreakpoint = (breakpoint: string): boolean => {
  return window.matchMedia(breakpoint).matches
}

/**
 * Get current breakpoint
 */
export const getCurrentBreakpoint = (): keyof typeof mediaBreakpoints | null => {
  if (matchesBreakpoint(mediaBreakpoints.mobile)) return 'mobile'
  if (matchesBreakpoint(mediaBreakpoints.tablet)) return 'tablet'
  if (matchesBreakpoint(mediaBreakpoints.largeDesktop)) return 'largeDesktop'
  if (matchesBreakpoint(mediaBreakpoints.desktop)) return 'desktop'
  return null
}

/**
 * Check if user prefers reduced motion
 */
export const isReducedMotion = (): boolean => {
  return window.matchMedia(reducedMotion).matches
}