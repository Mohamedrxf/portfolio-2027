/**
 * Design Tokens - Spacing
 * 
 * Centralized spacing scale tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const spacing = {
  0: 'var(--spacing-0)',
  px: 'var(--spacing-px)',
  '0.5': 'var(--spacing-0-5)', // 2px
  1: 'var(--spacing-1)', // 4px
  '1.5': 'var(--spacing-1-5)', // 6px
  2: 'var(--spacing-2)', // 8px
  '2.5': 'var(--spacing-2-5)', // 10px
  3: 'var(--spacing-3)', // 12px
  '3.5': 'var(--spacing-3-5)', // 14px
  4: 'var(--spacing-4)', // 16px
  5: 'var(--spacing-5)', // 20px
  6: 'var(--spacing-6)', // 24px
  7: 'var(--spacing-7)', // 28px
  8: 'var(--spacing-8)', // 32px
  9: 'var(--spacing-9)', // 36px
  10: 'var(--spacing-10)', // 40px
  11: 'var(--spacing-11)', // 44px
  12: 'var(--spacing-12)', // 48px
  14: 'var(--spacing-14)', // 56px
  16: 'var(--spacing-16)', // 64px
  20: 'var(--spacing-20)', // 80px
  24: 'var(--spacing-24)', // 96px
  28: 'var(--spacing-28)', // 112px
  32: 'var(--spacing-32)', // 128px
  36: 'var(--spacing-36)', // 144px
  40: 'var(--spacing-40)', // 160px
  44: 'var(--spacing-44)', // 176px
  48: 'var(--spacing-48)', // 192px
  52: 'var(--spacing-52)', // 208px
  56: 'var(--spacing-56)', // 224px
  60: 'var(--spacing-60)', // 240px
  64: 'var(--spacing-64)', // 256px
  72: 'var(--spacing-72)', // 288px
  80: 'var(--spacing-80)', // 320px
  96: 'var(--spacing-96)', // 384px
} as const;

// Type exports for TypeScript
export type Spacing = keyof typeof spacing;
