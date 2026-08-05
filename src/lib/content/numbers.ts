/**
 * Number formatting utilities
 * Pure functions for number manipulation and formatting
 */

/**
 * Format a number with locale-specific formatting
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return value.toLocaleString(locale, options)
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return value.toLocaleString(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  })
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Round a number to specified decimal places
 */
export function round(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Generate a random number between min and max (inclusive)
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1))
}
