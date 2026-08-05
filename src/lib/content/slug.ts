/**
 * Slug utilities
 * Pure functions for slug creation and comparison
 */

import { kebabCase } from './strings'

/**
 * Create a URL-friendly slug from a string
 */
export function createSlug(text: string): string {
  return kebabCase(text)
    .replace(/[^\w-]+/g, '') // Remove non-word chars except hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .toLowerCase()
}

/**
 * Parse a slug back to a readable string
 */
export function parseSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Compare two slugs for equality (case-insensitive)
 */
export function compareSlug(slug1: string, slug2: string): boolean {
  return slug1.toLowerCase() === slug2.toLowerCase()
}
