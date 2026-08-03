/**
 * Design Tokens - Breakpoints
 * 
 * Centralized responsive breakpoint tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const breakpoints = {
  xs: 'var(--breakpoint-xs)', // 0
  sm: 'var(--breakpoint-sm)', // 640px
  md: 'var(--breakpoint-md)', // 768px
  lg: 'var(--breakpoint-lg)', // 1024px
  xl: 'var(--breakpoint-xl)', // 1280px
  '2xl': 'var(--breakpoint-2xl)', // 1536px
} as const;

// Type exports for TypeScript
export type Breakpoint = keyof typeof breakpoints;
