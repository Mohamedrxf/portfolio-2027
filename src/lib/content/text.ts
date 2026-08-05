/**
 * Text processing utilities
 * Pure functions for text manipulation and formatting
 */

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength - suffix.length).trim() + suffix
}

/**
 * Extract an excerpt from text (first N words)
 */
export function excerpt(text: string, wordCount: number = 30): string {
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length <= wordCount) {
    return text
  }
  return words.slice(0, wordCount).join(' ') + '...'
}

/**
 * Capitalize the first character of a string
 */
export function capitalize(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Capitalize the first character of each word
 */
export function capitalizeWords(text: string): string {
  return text.split(/\s+/).map(capitalize).join(' ')
}

/**
 * Convert text to sentence case (first letter capitalized, rest lowercase)
 */
export function sentenceCase(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Convert text to title case (major words capitalized)
 */
export function titleCase(text: string): string {
  const minorWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of']
  
  return text
    .split(/\s+/)
    .map((word, index) => {
      const lowerWord = word.toLowerCase()
      if (index === 0 || !minorWords.includes(lowerWord)) {
        return capitalize(lowerWord)
      }
      return lowerWord
    })
    .join(' ')
}

/**
 * Remove HTML tags from text
 */
export function removeHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '')
}

/**
 * Count the number of words in text
 */
export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

/**
 * Estimate reading time in minutes (based on average 200 words per minute)
 */
export function readingTime(text: string, wordsPerMinute: number = 200): number {
  const words = wordCount(text)
  return Math.ceil(words / wordsPerMinute)
}
