/**
 * useIntersectionObserver hook
 * Tracks when an element enters or leaves the viewport
 */

import { useState, useEffect, useRef, RefObject } from 'react';
import { PERFORMANCE_CONSTANTS } from '@/lib/performance';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
  delay?: number;
}

export interface IntersectionResult {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
  observer: IntersectionObserver | null;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): [RefObject<HTMLElement>, IntersectionResult] => {
  const {
    threshold = PERFORMANCE_CONSTANTS.INTERSECTION_THRESHOLD,
    rootMargin = PERFORMANCE_CONSTANTS.INTERSECTION_ROOT_MARGIN,
    root = null,
    triggerOnce = false,
    delay = PERFORMANCE_CONSTANTS.INTERSECTION_TIMEOUT,
  } = options;

  const [result, setResult] = useState<IntersectionResult>({
    isIntersecting: false,
    entry: null,
    observer: null,
  });

  const elementRef = useRef<HTMLElement>(null);
  const hasIntersected = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (triggerOnce && hasIntersected.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (delay > 0) {
          setTimeout(() => {
            setResult({
              isIntersecting: entry.isIntersecting,
              entry,
              observer,
            });

            if (entry.isIntersecting) {
              hasIntersected.current = true;
            }
          }, delay);
        } else {
          setResult({
            isIntersecting: entry.isIntersecting,
            entry,
            observer,
          });

          if (entry.isIntersecting) {
            hasIntersected.current = true;
          }
        }

        if (triggerOnce && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    setResult((prev) => ({ ...prev, observer }));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, delay]);

  return [elementRef as RefObject<HTMLElement>, result];
};
