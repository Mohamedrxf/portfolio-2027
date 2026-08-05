/**
 * Date formatting utilities
 * Pure functions for date manipulation and formatting
 */

export interface DateInput {
  date: Date | string | number
  locale?: string
  options?: Intl.DateTimeFormatOptions
}

/**
 * Format a date to a localized string
 */
export function formatDate(input: DateInput): string {
  const { date, locale = 'en-US', options = {} } = input
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

/**
 * Format a date to month and year only
 */
export function formatMonthYear(input: DateInput): string {
  const { date, locale = 'en-US', options = {} } = input
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    ...options,
  })
}

/**
 * Format a date as relative time (e.g., "2 days ago", "in 3 months")
 */
export function formatRelativeDate(input: DateInput): string {
  const { date, locale = 'en-US' } = input
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const now = new Date()
  
  const diffInSeconds = Math.floor((dateObj.getTime() - now.getTime()) / 1000)
  const absDiff = Math.abs(diffInSeconds)
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  
  if (absDiff < 60) {
    return rtf.format(Math.floor(diffInSeconds), 'second')
  }
  
  if (absDiff < 3600) {
    return rtf.format(Math.floor(diffInSeconds / 60), 'minute')
  }
  
  if (absDiff < 86400) {
    return rtf.format(Math.floor(diffInSeconds / 3600), 'hour')
  }
  
  if (absDiff < 2592000) {
    return rtf.format(Math.floor(diffInSeconds / 86400), 'day')
  }
  
  if (absDiff < 31536000) {
    return rtf.format(Math.floor(diffInSeconds / 2592000), 'month')
  }
  
  return rtf.format(Math.floor(diffInSeconds / 31536000), 'year')
}

/**
 * Format a duration in milliseconds to human-readable string
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days}d ${hours % 24}h`
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  }
  
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  }
  
  return `${seconds}s`
}

/**
 * Get the year from a date
 */
export function getYear(date: Date | string | number): number {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  return dateObj.getFullYear()
}

/**
 * Check if a date is in the current year
 */
export function isCurrent(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const currentYear = new Date().getFullYear()
  return dateObj.getFullYear() === currentYear
}
