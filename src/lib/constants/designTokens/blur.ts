/**
 * Design Tokens - Blur
 * 
 * Centralized blur scale tokens for the design system.
 * These values provide a consistent blur scale for backdrop filters and blur effects.
 */

export const blur = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 40,
  '3xl': 64,
} as const;

// Type exports for TypeScript
export type Blur = keyof typeof blur;
