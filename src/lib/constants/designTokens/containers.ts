/**
 * Design Tokens - Containers
 * 
 * Centralized container width tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const containers = {
  xs: 'var(--container-xs)', // 100%
  sm: 'var(--container-sm)', // 640px
  md: 'var(--container-md)', // 768px
  lg: 'var(--container-lg)', // 1024px
  xl: 'var(--container-xl)', // 1280px
  '2xl': 'var(--container-2xl)', // 1536px
} as const;

// Type exports for TypeScript
export type Container = keyof typeof containers;
