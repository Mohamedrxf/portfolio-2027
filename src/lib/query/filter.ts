// Filter utilities for querying data
// Pure functions for filtering operations

import type { Predicate } from './types'

/**
 * Filter by category field
 */
export function filterByCategory<T>(
  items: readonly T[],
  category: string,
  categoryField: keyof T = 'category' as keyof T
): T[] {
  return items.filter((item) => (item as Record<keyof T, unknown>)[categoryField] === category)
}

/**
 * Filter by status field
 */
export function filterByStatus<T>(
  items: readonly T[],
  status: string,
  statusField: keyof T = 'status' as keyof T
): T[] {
  return items.filter((item) => (item as Record<keyof T, unknown>)[statusField] === status)
}

/**
 * Filter by technology array field
 */
export function filterByTechnology<T>(
  items: readonly T[],
  technology: string,
  technologiesField: keyof T = 'technologies' as keyof T
): T[] {
  return items.filter((item) => {
    const technologies = (item as Record<keyof T, unknown>)[technologiesField]
    return Array.isArray(technologies) && technologies.includes(technology)
  })
}

/**
 * Filter by tag array field
 */
export function filterByTag<T>(
  items: readonly T[],
  tag: string,
  tagsField: keyof T = 'tags' as keyof T
): T[] {
  return items.filter((item) => {
    const tags = (item as Record<keyof T, unknown>)[tagsField]
    return Array.isArray(tags) && tags.includes(tag)
  })
}

/**
 * Filter by date field
 */
export function filterByDate<T>(
  items: readonly T[],
  date: string,
  dateField: keyof T = 'date' as keyof T
): T[] {
  return items.filter((item) => (item as Record<keyof T, unknown>)[dateField] === date)
}

/**
 * Filter by year extracted from date field
 */
export function filterByYear<T>(
  items: readonly T[],
  year: number,
  dateField: keyof T = 'date' as keyof T
): T[] {
  return items.filter((item) => {
    const dateValue = (item as Record<keyof T, unknown>)[dateField]
    if (typeof dateValue !== 'string') return false

    const itemYear = new Date(dateValue).getFullYear()
    return itemYear === year
  })
}

/**
 * Filter by date range
 */
export function filterByDateRange<T>(
  items: readonly T[],
  startDate: string,
  endDate: string,
  dateField: keyof T = 'date' as keyof T
): T[] {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()

  return items.filter((item) => {
    const dateValue = (item as Record<keyof T, unknown>)[dateField]
    if (typeof dateValue !== 'string') return false

    const itemTime = new Date(dateValue).getTime()
    return itemTime >= start && itemTime <= end
  })
}

/**
 * Filter by custom predicate
 */
export function filterByCustom<T>(items: readonly T[], predicate: Predicate<T>): T[] {
  return items.filter(predicate)
}

/**
 * Filter by field value equality
 */
export function filterByField<T>(
  items: readonly T[],
  field: keyof T,
  value: unknown
): T[] {
  return items.filter((item) => (item as Record<keyof T, unknown>)[field] === value)
}

/**
 * Filter by field value inclusion (for array fields)
 */
export function filterByFieldIncludes<T>(
  items: readonly T[],
  field: keyof T,
  value: unknown
): T[] {
  return items.filter((item) => {
    const fieldValue = (item as Record<keyof T, unknown>)[field]
    return Array.isArray(fieldValue) && fieldValue.includes(value)
  })
}

/**
 * Filter by multiple field values (OR logic)
 */
export function filterByFieldValues<T>(
  items: readonly T[],
  field: keyof T,
  values: unknown[]
): T[] {
  return items.filter((item) => values.includes((item as Record<keyof T, unknown>)[field]))
}

/**
 * Filter by boolean field
 */
export function filterByBoolean<T>(
  items: readonly T[],
  field: keyof T,
  value: boolean
): T[] {
  return items.filter((item) => (item as Record<keyof T, unknown>)[field] === value)
}

/**
 * Filter by numeric range
 */
export function filterByRange<T>(
  items: readonly T[],
  field: keyof T,
  min: number,
  max: number
): T[] {
  return items.filter((item) => {
    const value = (item as Record<keyof T, unknown>)[field]
    return typeof value === 'number' && value >= min && value <= max
  })
}

/**
 * Filter by minimum value
 */
export function filterByMin<T>(
  items: readonly T[],
  field: keyof T,
  min: number
): T[] {
  return items.filter((item) => {
    const value = (item as Record<keyof T, unknown>)[field]
    return typeof value === 'number' && value >= min
  })
}

/**
 * Filter by maximum value
 */
export function filterByMax<T>(
  items: readonly T[],
  field: keyof T,
  max: number
): T[] {
  return items.filter((item) => {
    const value = (item as Record<keyof T, unknown>)[field]
    return typeof value === 'number' && value <= max
  })
}
