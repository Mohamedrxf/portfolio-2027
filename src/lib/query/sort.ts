// Sort utilities for querying data
// Pure functions for sorting operations

import type { SortDirection } from './types'

/**
 * Sort by date field (ascending)
 */
export function sortByDate<T>(
  items: readonly T[],
  dateField: keyof T = 'date' as keyof T,
  direction: SortDirection = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    const aDate = new Date((a as Record<keyof T, unknown>)[dateField] as string).getTime()
    const bDate = new Date((b as Record<keyof T, unknown>)[dateField] as string).getTime()

    return direction === 'asc' ? aDate - bDate : bDate - aDate
  })
}

/**
 * Sort alphabetically by string field
 */
export function sortAlphabetically<T>(
  items: readonly T[],
  field: keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const aValue = String((a as Record<keyof T, unknown>)[field] ?? '')
    const bValue = String((b as Record<keyof T, unknown>)[field] ?? '')

    const comparison = aValue.localeCompare(bValue)

    return direction === 'asc' ? comparison : -comparison
  })
}

/**
 * Sort by order/number field
 */
export function sortByOrder<T>(
  items: readonly T[],
  orderField: keyof T = 'order' as keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const aOrder = ((a as Record<keyof T, unknown>)[orderField] as number) ?? 0
    const bOrder = ((b as Record<keyof T, unknown>)[orderField] as number) ?? 0

    return direction === 'asc' ? aOrder - bOrder : bOrder - aOrder
  })
}

/**
 * Sort by priority field
 */
export function sortByPriority<T>(
  items: readonly T[],
  priorityField: keyof T = 'priority' as keyof T,
  direction: SortDirection = 'desc'
): T[] {
  return sortByOrder(items, priorityField, direction)
}

/**
 * Sort by custom comparator function
 */
export function sortByCustom<T>(items: readonly T[], comparator: (a: T, b: T) => number): T[] {
  return [...items].sort(comparator)
}

/**
 * Sort by numeric field
 */
export function sortByNumber<T>(
  items: readonly T[],
  field: keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const aValue = ((a as Record<keyof T, unknown>)[field] as number) ?? 0
    const bValue = ((b as Record<keyof T, unknown>)[field] as number) ?? 0

    return direction === 'asc' ? aValue - bValue : bValue - aValue
  })
}

/**
 * Sort by boolean field (true first)
 */
export function sortByBoolean<T>(
  items: readonly T[],
  field: keyof T,
  trueFirst: boolean = true
): T[] {
  return [...items].sort((a, b) => {
    const aValue = Boolean((a as Record<keyof T, unknown>)[field])
    const bValue = Boolean((b as Record<keyof T, unknown>)[field])

    if (trueFirst) {
      return aValue === bValue ? 0 : aValue ? -1 : 1
    } else {
      return aValue === bValue ? 0 : aValue ? 1 : -1
    }
  })
}

/**
 * Sort by multiple fields (primary, then secondary, etc.)
 */
export function sortByMultiple<T>(
  items: readonly T[],
  fields: Array<{ field: keyof T; direction?: SortDirection }>
): T[] {
  return [...items].sort((a, b) => {
    for (const { field, direction = 'asc' } of fields) {
      const aValue = (a as Record<keyof T, unknown>)[field]
      const bValue = (b as Record<keyof T, unknown>)[field]

      let comparison = 0

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue)
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        comparison = aValue === bValue ? 0 : aValue ? -1 : 1
      }

      if (comparison !== 0) {
        return direction === 'asc' ? comparison : -comparison
      }
    }

    return 0
  })
}

/**
 * Sort by array length (longest first)
 */
export function sortByArrayLength<T>(
  items: readonly T[],
  field: keyof T,
  direction: SortDirection = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    const aArray = (a as Record<keyof T, unknown>)[field] as unknown[]
    const bArray = (b as Record<keyof T, unknown>)[field] as unknown[]

    const aLength = Array.isArray(aArray) ? aArray.length : 0
    const bLength = Array.isArray(bArray) ? bArray.length : 0

    return direction === 'asc' ? aLength - bLength : bLength - aLength
  })
}
