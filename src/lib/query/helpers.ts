// Helper utilities for querying data
// Pure functions for common data transformations

/**
 * Get unique values from an array
 */
export function unique<T>(items: readonly T[]): T[] {
  return Array.from(new Set(items))
}

/**
 * Get unique values by a field
 */
export function uniqueBy<T>(items: readonly T[], field: keyof T): T[] {
  const seen = new Set<unknown>()
  return items.filter((item) => {
    const value = (item as Record<keyof T, unknown>)[field]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

/**
 * Group items by a field value
 */
export function groupBy<T>(
  items: readonly T[],
  field: keyof T
): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const key = String((item as Record<keyof T, unknown>)[field])
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

/**
 * Group items by a custom extractor function
 */
export function groupByCustom<T, K extends string | number>(
  items: readonly T[],
  extractor: (item: T) => K
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = extractor(item)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<K, T[]>)
}

/**
 * Count items by a field value
 */
export function countBy<T>(
  items: readonly T[],
  field: keyof T
): Record<string, number> {
  return items.reduce((acc, item) => {
    const key = String((item as Record<keyof T, unknown>)[field])
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * Count items by a custom extractor function
 */
export function countByCustom<T, K extends string | number>(
  items: readonly T[],
  extractor: (item: T) => K
): Record<K, number> {
  return items.reduce((acc, item) => {
    const key = extractor(item)
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {} as Record<K, number>)
}

/**
 * Flatten nested arrays
 */
export function flatten<T>(items: readonly T[][]): T[] {
  return items.flat()
}

/**
 * Flatten deeply nested arrays
 */
export function flattenDeep<T>(items: readonly unknown[]): T[] {
  return items.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flattenDeep<T>(item))
    } else {
      acc.push(item as T)
    }
    return acc
  }, [])
}

/**
 * Chunk array into smaller arrays of specified size
 */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) return []
  const result: T[][] = []

  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }

  return result
}

/**
 * Remove duplicate items from array
 */
export function removeDuplicates<T>(items: readonly T[]): T[] {
  return unique(items)
}

/**
 * Remove duplicates by a field
 */
export function removeDuplicatesBy<T>(items: readonly T[], field: keyof T): T[] {
  return uniqueBy(items, field)
}

/**
 * Get first N items
 */
export function first<T>(items: readonly T[], n: number = 1): T[] {
  return items.slice(0, n)
}

/**
 * Get last N items
 */
export function last<T>(items: readonly T[], n: number = 1): T[] {
  return items.slice(-n)
}

/**
 * Get items at specific indices
 */
export function at<T>(items: readonly T[], indices: number[]): T[] {
  return indices.map((index) => items[index]).filter((item): item is T => item !== undefined)
}

/**
 * Sample random items from array
 */
export function sample<T>(items: readonly T[], n: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, items.length))
}

/**
 * Shuffle array
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Partition array by predicate
 */
export function partition<T>(items: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  return items.reduce(
    (acc, item) => {
      if (predicate(item)) {
        acc[0].push(item)
      } else {
        acc[1].push(item)
      }
      return acc
    },
    [[], []] as [T[], T[]]
  )
}

/**
 * Find intersection of two arrays
 */
export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
  const setB = new Set(b)
  return a.filter((item) => setB.has(item))
}

/**
 * Find difference of two arrays (items in a not in b)
 */
export function difference<T>(a: readonly T[], b: readonly T[]): T[] {
  const setB = new Set(b)
  return a.filter((item) => !setB.has(item))
}

/**
 * Find union of two arrays
 */
export function union<T>(a: readonly T[], b: readonly T[]): T[] {
  return unique([...a, ...b])
}
