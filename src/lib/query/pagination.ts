// Pagination utilities for querying data
// Pure functions for pagination operations

import type { PaginationResult } from './types'

/**
 * Paginate an array of items
 */
export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number
): PaginationResult<T> {
  const totalCount = items.length
  const totalPages = Math.ceil(totalCount / pageSize)

  const validPage = Math.max(1, Math.min(page, totalPages || 1))
  const startIndex = (validPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const data = items.slice(startIndex, endIndex)

  return {
    data,
    page: validPage,
    pageSize,
    totalCount,
    totalPages,
    hasNext: validPage < totalPages,
    hasPrevious: validPage > 1,
  }
}

/**
 * Get total page count for a given page size
 */
export function getPageCount(totalItems: number, pageSize: number): number {
  if (pageSize <= 0) return 0
  return Math.ceil(totalItems / pageSize)
}

/**
 * Check if there's a next page
 */
export function hasNext(currentPage: number, totalPages: number): boolean {
  return currentPage < totalPages
}

/**
 * Check if there's a previous page
 */
export function hasPrevious(currentPage: number): boolean {
  return currentPage > 1
}

/**
 * Get the next page number
 */
export function getNextPage(currentPage: number, totalPages: number): number {
  return hasNext(currentPage, totalPages) ? currentPage + 1 : currentPage
}

/**
 * Get the previous page number
 */
export function getPreviousPage(currentPage: number): number {
  return hasPrevious(currentPage) ? currentPage - 1 : currentPage
}

/**
 * Get the first page number
 */
export function getFirstPage(): number {
  return 1
}

/**
 * Get the last page number
 */
export function getLastPage(totalItems: number, pageSize: number): number {
  return Math.max(1, getPageCount(totalItems, pageSize))
}

/**
 * Get page range (array of page numbers)
 */
export function getPageRange(currentPage: number, totalPages: number, range: number = 2): number[] {
  const pages: number[] = []

  const start = Math.max(1, currentPage - range)
  const end = Math.min(totalPages, currentPage + range)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

/**
 * Get offset for a given page
 */
export function getOffset(page: number, pageSize: number): number {
  return (page - 1) * pageSize
}

/**
 * Get limit for the last page
 */
export function getLastPageLimit(totalItems: number, pageSize: number): number {
  const remainder = totalItems % pageSize
  return remainder === 0 ? pageSize : remainder
}
