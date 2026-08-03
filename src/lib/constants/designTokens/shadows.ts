/**
 * Design Tokens - Shadows
 * 
 * Centralized shadow tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const shadows = {
  // Base Shadows
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  base: 'var(--shadow-base)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  inner: 'var(--shadow-inner)',

  // Colored Shadows
  primary: 'var(--shadow-primary)',
  secondary: 'var(--shadow-secondary)',
  accent: 'var(--shadow-accent)',
} as const;

// Type exports for TypeScript
export type Shadow = keyof typeof shadows;
