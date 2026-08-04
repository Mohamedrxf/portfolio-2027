/**
 * useDebounce hook
 * Debounces a value, only updating it after a delay
 */

import { useState, useEffect } from 'react';
import { PERFORMANCE_CONSTANTS } from '@/lib/performance';

export interface UseDebounceOptions {
  delay?: number;
}

export const useDebounce = <T>(
  value: T,
  options: UseDebounceOptions = {}
): T => {
  const { delay = PERFORMANCE_CONSTANTS.DEBOUNCE_DELAY } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
