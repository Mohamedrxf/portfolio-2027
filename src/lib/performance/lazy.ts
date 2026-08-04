/**
 * Lazy-loading helpers
 * Provides utilities for lazy loading resources and components
 */

import { PERFORMANCE_CONSTANTS } from './constants';

export interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  timeout?: number;
  fallback?: boolean;
}

export interface LazyLoadResult {
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
  load: () => void;
}

/**
 * Creates an Intersection Observer for lazy loading
 */
export const createLazyObserver = (
  callback: IntersectionObserverCallback,
  options: LazyLoadOptions = {}
): IntersectionObserver => {
  const {
    threshold = PERFORMANCE_CONSTANTS.LAZY_LOAD_THRESHOLD,
    rootMargin = PERFORMANCE_CONSTANTS.LAZY_LOAD_ROOT_MARGIN,
  } = options;

  return new IntersectionObserver(callback, {
    threshold,
    rootMargin,
  });
};

/**
 * Checks if element is in viewport
 */
export const isInViewport = (
  element: HTMLElement,
  threshold: number = PERFORMANCE_CONSTANTS.LAZY_LOAD_THRESHOLD
): boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalVisible = rect.top <= windowHeight * (1 - threshold) && rect.bottom >= threshold * windowHeight;
  const horizontalVisible = rect.left <= windowWidth * (1 - threshold) && rect.right >= threshold * windowWidth;

  return verticalVisible && horizontalVisible;
};

/**
 * Loads an image with lazy loading support
 */
export const lazyLoadImage = (
  imgElement: HTMLImageElement,
  src: string,
  options: LazyLoadOptions = {}
): LazyLoadResult => {
  const { fallback = true } = options;

  const result: LazyLoadResult = {
    isLoaded: false,
    isLoading: true,
    error: null,
    load: () => {
      if (result.isLoaded || result.isLoading) return;

      result.isLoading = true;
      result.error = null;

      const loadImage = () => {
        const tempImg = new Image();
        tempImg.src = src;

        tempImg.onload = () => {
          imgElement.src = src;
          result.isLoaded = true;
          result.isLoading = false;
        };

        tempImg.onerror = () => {
          result.error = new Error('Failed to load image');
          result.isLoading = false;
          if (fallback) {
            imgElement.src = '';
          }
        };
      };

      if ('loading' in HTMLImageElement.prototype) {
        imgElement.loading = 'lazy';
        loadImage();
      } else {
        loadImage();
      }
    },
  };

  return result;
};

/**
 * Creates a lazy loading wrapper for components
 */
export const createLazyComponent = <T extends () => Promise<unknown>>(
  importFn: T,
  _options: LazyLoadOptions = {}
): {
  load: () => Promise<unknown>;
  preload: () => Promise<unknown>;
} => {
  let loadedPromise: Promise<unknown> | null = null;

  const load = () => {
    if (loadedPromise) return loadedPromise;

    loadedPromise = importFn();
    return loadedPromise;
  };

  const preload = () => {
    return load();
  };

  return { load, preload };
};

/**
 * Debounced lazy load trigger
 */
export const debouncedLazyLoad = (
  callback: () => void,
  delay: number = PERFORMANCE_CONSTANTS.DEBOUNCE_DELAY
): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null;
    }, delay);
  };
};

/**
 * Checks if native lazy loading is supported
 */
export const supportsNativeLazyLoading = (): boolean => {
  return 'loading' in HTMLImageElement.prototype;
};

/**
 * Gets appropriate loading strategy based on browser support
 */
export const getLoadingStrategy = (): 'native' | 'observer' | 'scroll' => {
  if (supportsNativeLazyLoading()) {
    return 'native';
  }
  if ('IntersectionObserver' in window) {
    return 'observer';
  }
  return 'scroll';
};
