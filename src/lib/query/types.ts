// TypeScript types for the query layer
// Generic types for search, filter, sort, and pagination operations

export type SortDirection = 'asc' | 'desc'

export interface SortOptions<T> {
  field: keyof T
  direction?: SortDirection
}

export interface FilterOptions<T> {
  field: keyof T
  value: unknown
  operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'contains' | 'startsWith' | 'endsWith'
}

export interface SearchOptions {
  fields?: string[]
  caseSensitive?: boolean
  exactMatch?: boolean
}

export interface PaginationOptions {
  page: number
  pageSize: number
}

export interface PaginationResult<T> {
  data: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface QueryOptions<T> {
  filters?: FilterOptions<T>[]
  sort?: SortOptions<T>
  pagination?: PaginationOptions
  search?: {
    query: string
    options?: SearchOptions
  }
}

export type Predicate<T> = (item: T) => boolean

export type Comparator<T> = (a: T, b: T) => number

export type Transformer<T, R = T> = (item: T) => R
