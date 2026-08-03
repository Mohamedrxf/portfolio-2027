/**
 * Design Tokens - Transitions
 * 
 * Centralized transition duration and easing function tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const transitions = {
  // Transition Durations
  duration: {
    instant: 'var(--duration-instant)', // 50ms
    fast: 'var(--duration-fast)', // 150ms
    normal: 'var(--duration-normal)', // 300ms
    slow: 'var(--duration-slow)', // 500ms
    slower: 'var(--duration-slower)', // 700ms
    slowest: 'var(--duration-slowest)', // 1000ms
  } as const,

  // Transition Timing Functions (Easing)
  easing: {
    linear: 'var(--ease-linear)',
    in: 'var(--ease-in)',
    out: 'var(--ease-out)',
    inOut: 'var(--ease-in-out)',
    bounce: 'var(--ease-bounce)',
    elastic: 'var(--ease-elastic)',
  } as const,
} as const;

// Type exports for TypeScript
export type TransitionDuration = keyof typeof transitions.duration;
export type TransitionEasing = keyof typeof transitions.easing;
