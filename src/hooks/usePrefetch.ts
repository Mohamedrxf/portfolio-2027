/**
 * usePrefetch hook
 * Prefetches resources when certain conditions are met
 */

import { useEffect, useRef, useState, RefObject } from 'react';
import { prefetchResource, prefetchOnIdle, type PrefetchOptions, type PrefetchResult } from '@/lib/performance';

export interface UsePrefetchOptions extends PrefetchOptions {
  enabled?: boolean;
  hoverDelay?: number;
}

export const usePrefetch = (
  href: string,
  options: UsePrefetchOptions = {}
): PrefetchResult & { trigger: () => void } => {
  const { enabled = true, onIdle = false, hoverDelay = 100 } = options;

  const [result, setResult] = useState<PrefetchResult>({
    isPrefetched: false,
    isPrefetching: false,
    error: null,
    abort: () => {},
  });

  const prefetchRef = useRef<PrefetchResult | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || !href) return;

    if (onIdle) {
      prefetchRef.current = prefetchOnIdle(href, options);
      setResult(prefetchRef.current);
    }

    return () => {
      if (prefetchRef.current) {
        prefetchRef.current.abort();
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [href, enabled, onIdle, options]);

  const trigger = () => {
    if (!enabled || !href || result.isPrefetched) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      if (!prefetchRef.current || !prefetchRef.current.isPrefetching) {
        prefetchRef.current = prefetchResource(href, options);
        setResult(prefetchRef.current);
      }
    }, hoverDelay);
  };

  const cancel = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  return {
    ...result,
    trigger,
    abort: () => {
      cancel();
      result.abort();
    },
  };
};

/**
 * usePrefetchOnHover hook
 * Prefetches resource when element is hovered
 */
export const usePrefetchOnHover = (
  href: string,
  options: UsePrefetchOptions = {}
): { ref: React.RefObject<HTMLElement>; result: PrefetchResult } => {
  const { enabled = true, hoverDelay = 100 } = options;
  const elementRef = useRef<HTMLElement>(null);
  const [result, setResult] = useState<PrefetchResult>({
    isPrefetched: false,
    isPrefetching: false,
    error: null,
    abort: () => {},
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled || !href) return;

    const handleMouseEnter = () => {
      if (result.isPrefetched) return;

      const timeoutId = setTimeout(() => {
        const prefetchResult = prefetchResource(href, options);
        setResult(prefetchResult);
      }, hoverDelay);

      return () => clearTimeout(timeoutId);
    };

    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [href, enabled, hoverDelay, options, result.isPrefetched]);

  return { ref: elementRef as RefObject<HTMLElement>, result };
};

/**
 * usePrefetchOnViewport hook
 * Prefetches resource when element enters viewport
 */
export const usePrefetchOnViewport = (
  href: string,
  options: UsePrefetchOptions = {}
): { ref: React.RefObject<HTMLElement>; result: PrefetchResult } => {
  const { enabled = true } = options;
  const elementRef = useRef<HTMLElement>(null);
  const [result, setResult] = useState<PrefetchResult>({
    isPrefetched: false,
    isPrefetching: false,
    error: null,
    abort: () => {},
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled || !href) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !result.isPrefetched) {
          const prefetchResult = prefetchResource(href, options);
          setResult(prefetchResult);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [href, enabled, options, result.isPrefetched]);

  return { ref: elementRef as RefObject<HTMLElement>, result };
};
