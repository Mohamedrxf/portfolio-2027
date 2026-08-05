import { useEffect, useRef } from 'react';

export interface UseAnimationFrameConfig {
  callback: (delta: number) => void;
  enabled?: boolean;
}

export function useAnimationFrame(config: UseAnimationFrameConfig): void {
  const { callback, enabled = true } = config;
  const callbackRef = useRef(callback);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const animate = (time: number): void => {
      if (previousTimeRef.current !== 0) {
        const delta = (time - previousTimeRef.current) / 1000;
        callbackRef.current(delta);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [enabled]);
}
