/**
 * Performance constants
 * Contains configuration values for performance optimization
 */

export const PERFORMANCE_CONSTANTS = {
  // Image optimization
  IMAGE_QUALITY: {
    LOW: 60,
    MEDIUM: 75,
    HIGH: 85,
    ULTRA: 95,
  },
  IMAGE_FORMATS: {
    WEBP: 'image/webp',
    AVIF: 'image/avif',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
  },
  IMAGE_SIZES: {
    THUMBNAIL: 150,
    SMALL: 300,
    MEDIUM: 600,
    LARGE: 1200,
    XLARGE: 1920,
  },

  // Lazy loading
  LAZY_LOAD_THRESHOLD: 0.1, // 10% visibility threshold
  LAZY_LOAD_ROOT_MARGIN: '50px',
  LAZY_LOAD_TIMEOUT: 3000, // 3 seconds fallback

  // Debounce/Throttle
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  DEBOUNCE_SEARCH_DELAY: 500,
  THROTTLE_SCROLL_DELAY: 16, // ~60fps

  // Prefetch
  PREFETCH_IDLE_TIMEOUT: 2000,
  PREFETCH_HOVER_DELAY: 100,
  PREFETCH_PRIORITY: 'low',

  // Memoization
  MEMO_CACHE_SIZE: 100,
  MEMO_TTL: 60000, // 1 minute

  // Scroll
  SCROLL_THROTTLE: 16, // ~60fps
  SCROLL_DEBOUNCE: 100,
  SCROLL_POSITION_THRESHOLD: 10,

  // Intersection Observer
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '0px',
  INTERSECTION_TIMEOUT: 0,

  // Resource hints
  RESOURCE_HINT_TIMEOUT: 3000,
} as const;

export type ImageQuality = (typeof PERFORMANCE_CONSTANTS.IMAGE_QUALITY)[keyof typeof PERFORMANCE_CONSTANTS.IMAGE_QUALITY];
export type ImageFormat = (typeof PERFORMANCE_CONSTANTS.IMAGE_FORMATS)[keyof typeof PERFORMANCE_CONSTANTS.IMAGE_FORMATS];
export type ImageSize = (typeof PERFORMANCE_CONSTANTS.IMAGE_SIZES)[keyof typeof PERFORMANCE_CONSTANTS.IMAGE_SIZES];
