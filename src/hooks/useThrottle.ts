/**
 * useThrottle hook
 * Throttles a value, only updating it at most once per delay
 */

import { useState, useEffect, useRef } from 'react';
import { PERFORMANCE_CONSTANTS } from '@/lib/performance';

export interface UseThrottleOptions {
  delay?: number;
}

export const useThrottle = <T>(
  value: T,
  options: UseThrottleOptions = {}
): T => {
  const { delay = PERFORMANCE_CONSTANTS.THROTTLE_DELAY } = options;
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRun = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;

    if (timeSinceLastRun >= delay) {
      setThrottledValue(value);
      lastRun.current = now;
    } else {
      const timeoutId = setTimeout(() => {
        setThrottledValue(value);
        lastRun.current = Date.now();
      }, delay - timeSinceLastRun);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [value, delay]);

  return throttledValue;
};

/**
 * useThrottleCallback hook
 * Returns a throttled version of the callback function
 */
export const useThrottleCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  options: UseThrottleOptions = {}
): T => {
  const { delay = PERFORMANCE_CONSTANTS.THROTTLE_DELAY } = options;
  const lastRun = useRef(0);

  const throttledCallback = ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback(...args);
    }
  }) as T;

  return throttledCallback;
};
