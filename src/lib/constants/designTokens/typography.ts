/**
 * Design Tokens - Typography
 * 
 * Centralized typography tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const typography = {
  // Font Families
  fontFamily: {
    display: 'var(--font-family-display)',
    body: 'var(--font-family-body)',
    mono: 'var(--font-family-mono)',
  } as const,

  // Font Sizes (rem-based)
  fontSize: {
    xs: 'var(--font-size-xs)', // 12px
    sm: 'var(--font-size-sm)', // 14px
    base: 'var(--font-size-base)', // 16px
    lg: 'var(--font-size-lg)', // 18px
    xl: 'var(--font-size-xl)', // 20px
    '2xl': 'var(--font-size-2xl)', // 24px
    '3xl': 'var(--font-size-3xl)', // 30px
    '4xl': 'var(--font-size-4xl)', // 36px
    '5xl': 'var(--font-size-5xl)', // 48px
    '6xl': 'var(--font-size-6xl)', // 60px
    '7xl': 'var(--font-size-7xl)', // 72px
    '8xl': 'var(--font-size-8xl)', // 96px
    '9xl': 'var(--font-size-9xl)', // 128px
  } as const,

  // Font Weights
  fontWeight: {
    thin: 'var(--font-weight-thin)', // 100
    extralight: 'var(--font-weight-extralight)', // 200
    light: 'var(--font-weight-light)', // 300
    normal: 'var(--font-weight-normal)', // 400
    medium: 'var(--font-weight-medium)', // 500
    semibold: 'var(--font-weight-semibold)', // 600
    bold: 'var(--font-weight-bold)', // 700
    extrabold: 'var(--font-weight-extrabold)', // 800
    black: 'var(--font-weight-black)', // 900
  } as const,

  // Line Heights
  lineHeight: {
    none: 'var(--line-height-none)', // 1
    tight: 'var(--line-height-tight)', // 1.25
    snug: 'var(--line-height-snug)', // 1.375
    normal: 'var(--line-height-normal)', // 1.5
    relaxed: 'var(--line-height-relaxed)', // 1.625
    loose: 'var(--line-height-loose)', // 2
  } as const,

  // Letter Spacing
  letterSpacing: {
    tighter: 'var(--letter-spacing-tighter)', // -0.05em
    tight: 'var(--letter-spacing-tight)', // -0.025em
    normal: 'var(--letter-spacing-normal)', // 0
    wide: 'var(--letter-spacing-wide)', // 0.025em
    wider: 'var(--letter-spacing-wider)', // 0.05em
    widest: 'var(--letter-spacing-widest)', // 0.1em
  } as const,
} as const;

// Type exports for TypeScript
export type FontFamily = keyof typeof typography.fontFamily;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
export type LetterSpacing = keyof typeof typography.letterSpacing;
