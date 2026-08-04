// Search utilities for querying data
// Pure functions for text-based search operations

import type { SearchOptions } from './types'

/**
 * Search an array of objects by text query across all string fields
 */
export function searchByText<T>(
  items: readonly T[],
  query: string,
  options: SearchOptions = {}
): T[] {
  if (!query) return [...items]

  const { caseSensitive = false, exactMatch = false } = options
  const searchQuery = caseSensitive ? query : query.toLowerCase()

  return items.filter((item) => {
    return Object.values(item as Record<string, unknown>).some((value) => {
      if (typeof value !== 'string') return false

      const text = caseSensitive ? value : value.toLowerCase()

      if (exactMatch) {
        return text === searchQuery
      }

      return text.includes(searchQuery)
    })
  })
}

/**
 * Fuzzy search using simple string similarity
 * Returns items that contain any part of the query words
 */
export function fuzzySearch<T>(
  items: readonly T[],
  query: string,
  options: SearchOptions = {}
): T[] {
  if (!query) return [...items]

  const { caseSensitive = false } = options
  const searchWords = query.split(/\s+/).filter(Boolean)
  const normalizedWords = caseSensitive
    ? searchWords
    : searchWords.map((w) => w.toLowerCase())

  return items.filter((item) => {
    const allValues = Object.values(item as Record<string, unknown>).filter((v) => typeof v === 'string') as string[]

    return normalizedWords.some((searchWord) =>
      allValues.some((value) => {
        const text = caseSensitive ? value : value.toLowerCase()
        return text.includes(searchWord)
      })
    )
  })
}

/**
 * Search by specific fields only
 */
export function searchByFields<T>(
  items: readonly T[],
  query: string,
  fields: (keyof T)[],
  options: SearchOptions = {}
): T[] {
  if (!query) return [...items]
  if (!fields.length) return [...items]

  const { caseSensitive = false, exactMatch = false } = options
  const searchQuery = caseSensitive ? query : query.toLowerCase()

  return items.filter((item) => {
    return fields.some((field) => {
      const value = (item as Record<keyof T, unknown>)[field]

      if (typeof value !== 'string') return false

      const text = caseSensitive ? value : value.toLowerCase()

      if (exactMatch) {
        return text === searchQuery
      }

      return text.includes(searchQuery)
    })
  })
}

/**
 * Search by a single field with exact match
 */
export function searchByField<T>(
  items: readonly T[],
  query: string,
  field: keyof T,
  options: SearchOptions = {}
): T[] {
  return searchByFields(items, query, [field], options)
}
