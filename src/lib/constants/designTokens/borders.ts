/**
 * Design Tokens - Borders
 * 
 * Centralized border radius tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const borders = {
  // Border Radius
  radius: {
    none: 'var(--radius-none)', // 0
    sm: 'var(--radius-sm)', // 2px
    base: 'var(--radius-base)', // 4px
    md: 'var(--radius-md)', // 6px
    lg: 'var(--radius-lg)', // 8px
    xl: 'var(--radius-xl)', // 12px
    '2xl': 'var(--radius-2xl)', // 16px
    '3xl': 'var(--radius-3xl)', // 24px
    full: 'var(--radius-full)', // 9999px
  } as const,
} as const;

// Type exports for TypeScript
export type BorderRadius = keyof typeof borders.radius;
