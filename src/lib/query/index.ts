// Public API for the query layer
// Centralized query utilities for all portfolio data

// Types
export type {
  SortDirection,
  SortOptions,
  FilterOptions,
  SearchOptions,
  PaginationOptions,
  PaginationResult,
  QueryOptions,
  Predicate,
  Comparator,
  Transformer,
} from './types'

// Search utilities
export {
  searchByText,
  fuzzySearch,
  searchByFields,
  searchByField,
} from './search'

// Filter utilities
export {
  filterByCategory,
  filterByStatus,
  filterByTechnology,
  filterByTag,
  filterByDate,
  filterByYear,
  filterByDateRange,
  filterByCustom,
  filterByField,
  filterByFieldIncludes,
  filterByFieldValues,
  filterByBoolean,
  filterByRange,
  filterByMin,
  filterByMax,
} from './filter'

// Sort utilities
export {
  sortByDate,
  sortAlphabetically,
  sortByOrder,
  sortByPriority,
  sortByCustom,
  sortByNumber,
  sortByBoolean,
  sortByMultiple,
  sortByArrayLength,
} from './sort'

// Pagination utilities
export {
  paginate,
  getPageCount,
  hasNext,
  hasPrevious,
  getNextPage,
  getPreviousPage,
  getFirstPage,
  getLastPage,
  getPageRange,
  getOffset,
  getLastPageLimit,
} from './pagination'

// Helper utilities
export {
  unique,
  uniqueBy,
  groupBy,
  groupByCustom,
  countBy,
  countByCustom,
  flatten,
  flattenDeep,
  chunk,
  removeDuplicates,
  removeDuplicatesBy,
  first,
  last,
  at,
  sample,
  shuffle,
  partition,
  intersection,
  difference,
  union,
} from './helpers'
