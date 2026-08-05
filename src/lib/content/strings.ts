/**
 * String manipulation utilities
 * Pure functions for string operations and transformations
 */

/**
 * Check if a string is empty (length === 0)
 */
export function isEmpty(text: string): boolean {
  return text.length === 0
}

/**
 * Check if a string is blank (empty or only whitespace)
 */
export function isBlank(text: string): boolean {
  return text.trim().length === 0
}

/**
 * Remove extra spaces (collapse multiple spaces to single, trim)
 */
export function removeExtraSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/**
 * Convert string to kebab-case (lowercase with hyphens)
 */
export function kebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Convert string to camelCase (lowercase first, then capitalize words)
 */
export function camelCase(text: string): string {
  const kebab = kebabCase(text)
  return kebab
    .split('-')
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

/**
 * Convert string to PascalCase (capitalize all words)
 */
export function pascalCase(text: string): string {
  const kebab = kebabCase(text)
  return kebab
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Convert string to snake_case (lowercase with underscores)
 */
export function snakeCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}
