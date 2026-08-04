/**
 * Route prefetch helpers
 * Provides utilities for prefetching routes and resources
 */

import { PERFORMANCE_CONSTANTS } from './constants';

export interface PrefetchOptions {
  priority?: 'high' | 'low' | 'auto';
  timeout?: number;
  onIdle?: boolean;
}

export interface PrefetchResult {
  isPrefetched: boolean;
  isPrefetching: boolean;
  error: Error | null;
  abort: () => void;
}

/**
 * Prefetches a resource using link prefetch
 */
export const prefetchResource = (
  href: string,
  options: PrefetchOptions = {}
): PrefetchResult => {
  const { priority = PERFORMANCE_CONSTANTS.PREFETCH_PRIORITY } = options;

  const result: PrefetchResult = {
    isPrefetched: false,
    isPrefetching: true,
    error: null,
    abort: () => {
      // Remove prefetch link if still prefetching
      const link = document.querySelector(`link[href="${href}"][rel="prefetch"]`);
      if (link) {
        link.remove();
      }
      result.isPrefetching = false;
    },
  };

  try {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';

    if (priority === 'high') {
      link.setAttribute('importance', 'high');
    }

    link.onload = () => {
      result.isPrefetched = true;
      result.isPrefetching = false;
    };

    link.onerror = () => {
      result.error = new Error(`Failed to prefetch ${href}`);
      result.isPrefetching = false;
    };

    document.head.appendChild(link);
  } catch (error) {
    result.error = error as Error;
    result.isPrefetching = false;
  }

  return result;
};

/**
 * Prefetches a resource using requestIdleCallback
 */
export const prefetchOnIdle = (
  href: string,
  options: PrefetchOptions = {}
): PrefetchResult => {
  const { timeout = PERFORMANCE_CONSTANTS.PREFETCH_IDLE_TIMEOUT } = options;

  const result: PrefetchResult = {
    isPrefetched: false,
    isPrefetching: true,
    error: null,
    abort: () => {
      // Idle callback will be cancelled automatically if component unmounts
      result.isPrefetching = false;
    },
  };

  const prefetch = () => {
    const prefetchResult = prefetchResource(href, options);
    Object.assign(result, prefetchResult);
  };

  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (callback: () => void, options: { timeout: number }) => void }).requestIdleCallback(
      () => {
        prefetch();
      },
      { timeout }
    );
  } else {
    // Fallback to setTimeout
    setTimeout(prefetch, timeout);
  }

  return result;
};

/**
 * Prefetches multiple resources
 */
export const prefetchResources = (
  hrefs: string[],
  options: PrefetchOptions = {}
): PrefetchResult[] => {
  return hrefs.map((href) => prefetchResource(href, options));
};

/**
 * Preconnects to a domain
 */
export const preconnectDomain = (domain: string): void => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  document.head.appendChild(link);
};

/**
 * DNS prefetches a domain
 */
export const dnsPrefetch = (domain: string): void => {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = domain;
  document.head.appendChild(link);
};

/**
 * Preloads a resource
 */
export const preloadResource = (
  href: string,
  as: string = 'fetch',
  options: PrefetchOptions = {}
): PrefetchResult => {
  const { priority = PERFORMANCE_CONSTANTS.PREFETCH_PRIORITY } = options;

  const result: PrefetchResult = {
    isPrefetched: false,
    isPrefetching: true,
    error: null,
    abort: () => {
      const link = document.querySelector(`link[href="${href}"][rel="preload"]`);
      if (link) {
        link.remove();
      }
      result.isPrefetching = false;
    },
  };

  try {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;

    if (priority === 'high') {
      link.setAttribute('importance', 'high');
    }

    link.onload = () => {
      result.isPrefetched = true;
      result.isPrefetching = false;
    };

    link.onerror = () => {
      result.error = new Error(`Failed to preload ${href}`);
      result.isPrefetching = false;
    };

    document.head.appendChild(link);
  } catch (error) {
    result.error = error as Error;
    result.isPrefetching = false;
  }

  return result;
};

/**
 * Gets resource hint type based on browser support
 */
export const getResourceHintType = (): 'prefetch' | 'preload' | 'preconnect' => {
  return 'prefetch';
};

/**
 * Checks if resource hint is supported
 */
export const supportsResourceHints = (): boolean => {
  return 'relList' in document && 'supports' in (document as unknown as { relList: { supports: (rel: string) => boolean } }).relList;
};
