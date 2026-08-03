/**
 * Design Tokens - Colors
 * 
 * Centralized color palette tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const colors = {
  // Primary Color Palette (Indigo-based)
  primary: {
    50: '#e0e7ff',
    100: '#c7d2fe',
    200: '#a5b4fc',
    300: '#818cf8',
    400: '#6366f1',
    500: '#4f46e5',
    600: '#4338ca',
    700: '#3730a3',
    800: '#312e81',
    900: '#1e1b4b',
  } as const,

  // Secondary Color Palette (Teal-based)
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  } as const,

  // Accent Color Palette (Red-based)
  accent: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  } as const,

  // Neutral Color Palette (Grayscale)
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  } as const,

  // Semantic Colors - Light Theme
  semantic: {
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    surfaceElevated: 'var(--color-surface-elevated)',
    border: 'var(--color-border)',
    borderSubtle: 'var(--color-border-subtle)',
  } as const,

  // Text Colors - Light Theme
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    inverse: 'var(--color-text-inverse)',
  } as const,

  // Interactive Colors
  interactive: {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    primaryActive: 'var(--color-primary-active)',
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    secondaryActive: 'var(--color-secondary-active)',
  } as const,

  // Status Colors
  status: {
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    info: 'var(--color-info)',
  } as const,
} as const;

// Type exports for TypeScript
export type ColorPalette = typeof colors.primary;
export type ColorShade = keyof ColorPalette;
export type SemanticColor = keyof typeof colors.semantic;
export type TextColor = keyof typeof colors.text;
export type InteractiveColor = keyof typeof colors.interactive;
export type StatusColor = keyof typeof colors.status;
