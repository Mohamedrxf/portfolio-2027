import { useEffect, useCallback, useRef } from 'react';

export interface UseResizeConfig {
  onResize?: (width: number, height: number) => void;
  debounceMs?: number;
}

export function useResize(config: UseResizeConfig = {}): void {
  const { onResize, debounceMs = 100 } = config;
  const onResizeRef = useRef(onResize);
  const debounceMsRef = useRef(debounceMs);

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    debounceMsRef.current = debounceMs;
  }, [debounceMs]);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    onResizeRef.current?.(width, height);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const debouncedResize = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleResize, debounceMsRef.current);
    };

    window.addEventListener('resize', debouncedResize);

    handleResize();

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize, debounceMs]);
}
