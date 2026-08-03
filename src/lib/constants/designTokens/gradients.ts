/**
 * Design Tokens - Gradients
 * 
 * Centralized gradient definitions for the design system.
 * These values provide common gradient patterns using the color palette.
 */

export const gradients = {
  // Primary Gradients
  primary: {
    light: 'linear-gradient(135deg, var(--color-primary-300) 0%, var(--color-primary-500) 100%)',
    default: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)',
    dark: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-900) 100%)',
  } as const,

  // Secondary Gradients
  secondary: {
    light: 'linear-gradient(135deg, var(--color-secondary-300) 0%, var(--color-secondary-500) 100%)',
    default: 'linear-gradient(135deg, var(--color-secondary-500) 0%, var(--color-secondary-700) 100%)',
    dark: 'linear-gradient(135deg, var(--color-secondary-600) 0%, var(--color-secondary-900) 100%)',
  } as const,

  // Accent Gradients
  accent: {
    light: 'linear-gradient(135deg, var(--color-accent-300) 0%, var(--color-accent-500) 100%)',
    default: 'linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-accent-700) 100%)',
    dark: 'linear-gradient(135deg, var(--color-accent-600) 0%, var(--color-accent-900) 100%)',
  } as const,

  // Neutral Gradients
  neutral: {
    light: 'linear-gradient(135deg, var(--color-neutral-100) 0%, var(--color-neutral-300) 100%)',
    default: 'linear-gradient(135deg, var(--color-neutral-200) 0%, var(--color-neutral-400) 100%)',
    dark: 'linear-gradient(135deg, var(--color-neutral-700) 0%, var(--color-neutral-900) 100%)',
  } as const,

  // Mixed Gradients
  mixed: {
    primarySecondary: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%)',
    primaryAccent: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
    secondaryAccent: 'linear-gradient(135deg, var(--color-secondary-500) 0%, var(--color-accent-500) 100%)',
  } as const,

  // Special Effects
  effects: {
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    shimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
    glow: 'radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%)',
  } as const,
} as const;

// Type exports for TypeScript
export type GradientType = keyof typeof gradients;
export type PrimaryGradient = keyof typeof gradients.primary;
export type SecondaryGradient = keyof typeof gradients.secondary;
export type AccentGradient = keyof typeof gradients.accent;
export type NeutralGradient = keyof typeof gradients.neutral;
export type MixedGradient = keyof typeof gradients.mixed;
export type EffectGradient = keyof typeof gradients.effects;
