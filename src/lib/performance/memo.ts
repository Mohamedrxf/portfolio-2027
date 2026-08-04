/**
 * Memoization helpers
 * Provides utilities for memoizing functions and caching results
 */

import { PERFORMANCE_CONSTANTS } from './constants';

export interface MemoOptions {
  maxSize?: number;
  ttl?: number;
  keyGenerator?: (...args: unknown[]) => string;
}

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  accessCount: number;
}

/**
 * Simple memoization function with cache
 */
export const memoize = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: MemoOptions = {}
): T => {
  const {
    maxSize = PERFORMANCE_CONSTANTS.MEMO_CACHE_SIZE,
    ttl = PERFORMANCE_CONSTANTS.MEMO_TTL,
    keyGenerator = (...args: unknown[]) => JSON.stringify(args),
  } = options;

  const cache = new Map<string, CacheEntry<ReturnType<T>>>();

  const memoized = ((...args: unknown[]) => {
    const key = keyGenerator(...args);
    const now = Date.now();

    // Check if cached value exists and is not expired
    const entry = cache.get(key);
    if (entry && (ttl === 0 || now - entry.timestamp < ttl)) {
      entry.accessCount++;
      return entry.value;
    }

    // Compute and cache the result
    const result = fn(...args) as ReturnType<T>;

    // Evict oldest entries if cache is full
    if (cache.size >= maxSize) {
      let oldestKey: string | null = null;
      let oldestTimestamp = Infinity;

      for (const [k, v] of cache.entries()) {
        if (v.timestamp < oldestTimestamp) {
          oldestTimestamp = v.timestamp;
          oldestKey = k;
        }
      }

      if (oldestKey) {
        cache.delete(oldestKey);
      }
    }

    cache.set(key, {
      value: result,
      timestamp: now,
      accessCount: 0,
    });

    return result;
  }) as T;

  // Attach cache control methods
  (memoized as T & { cache: Map<string, CacheEntry<ReturnType<T>>>; clear: () => void; size: () => number }).cache = cache;
  (memoized as T & { cache: Map<string, CacheEntry<ReturnType<T>>>; clear: () => void; size: () => number }).clear = () => cache.clear();
  (memoized as T & { cache: Map<string, CacheEntry<ReturnType<T>>>; clear: () => void; size: () => number }).size = () => cache.size;

  return memoized;
};

/**
 * Creates a memoized version of an async function
 */
export const memoizeAsync = <T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  options: MemoOptions = {}
): T => {
  const {
    maxSize = PERFORMANCE_CONSTANTS.MEMO_CACHE_SIZE,
    ttl = PERFORMANCE_CONSTANTS.MEMO_TTL,
    keyGenerator = (...args: unknown[]) => JSON.stringify(args),
  } = options;

  const cache = new Map<string, CacheEntry<ReturnType<T>>>();
  const pending = new Map<string, Promise<unknown>>();

  const memoized = (async (...args: unknown[]) => {
    const key = keyGenerator(...args);
    const now = Date.now();

    // Check if there's a pending request
    if (pending.has(key)) {
      return pending.get(key);
    }

    // Check if cached value exists and is not expired
    const entry = cache.get(key);
    if (entry && (ttl === 0 || now - entry.timestamp < ttl)) {
      entry.accessCount++;
      return entry.value;
    }

    // Create and cache the promise
    const promise = fn(...args);
    pending.set(key, promise);

    try {
      const result = (await promise) as ReturnType<T>;

      // Evict oldest entries if cache is full
      if (cache.size >= maxSize) {
        let oldestKey: string | null = null;
        let oldestTimestamp = Infinity;

        for (const [k, v] of cache.entries()) {
          if (v.timestamp < oldestTimestamp) {
            oldestTimestamp = v.timestamp;
            oldestKey = k;
          }
        }

        if (oldestKey) {
          cache.delete(oldestKey);
        }
      }

      cache.set(key, {
        value: result,
        timestamp: now,
        accessCount: 0,
      });

      return result;
    } finally {
      pending.delete(key);
    }
  }) as T;

  // Attach cache control methods
  (memoized as T & { cache: Map<string, CacheEntry<ReturnType<T>>>; clear: () => void; size: () => number }).cache = cache;
  (memoized as T & { cache: Map<string, CacheEntry<ReturnType<T>>>; clear: () => void; size: () => number }).clear = () => cache.clear();
  (memoized as T & { cache: Map<string, CacheEntry<ReturnType<T>>>; clear: () => void; size: () => number }).size = () => cache.size;

  return memoized;
};

/**
 * Creates a simple LRU cache
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number = PERFORMANCE_CONSTANTS.MEMO_CACHE_SIZE) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // Remove if exists to update position
    this.cache.delete(key);

    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * Creates a time-based cache with TTL
 */
export class TTLCache<K, V> {
  private cache: Map<K, { value: V; expiry: number }>;
  private defaultTTL: number;

  constructor(defaultTTL: number = PERFORMANCE_CONSTANTS.MEMO_TTL) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set(key: K, value: V, ttl?: number): void {
    const expiry = Date.now() + (ttl ?? this.defaultTTL);
    this.cache.set(key, { value, expiry });
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Clean expired entries before counting
    this.cleanExpired();
    return this.cache.size;
  }

  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * Throttle memoization - only memoize for a short time
 */
export const throttleMemo = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = PERFORMANCE_CONSTANTS.THROTTLE_DELAY
): T => {
  let lastCall = 0;
  let lastResult: ReturnType<T>;

  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall < delay) {
      return lastResult;
    }
    lastCall = now;
    lastResult = fn(...args) as ReturnType<T>;
    return lastResult;
  }) as T;
};
