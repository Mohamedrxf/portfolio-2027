/**
 * useEscapeKey hook
 * Handles Escape key press for closing modals, dropdowns, etc.
 */

import { useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import { isEscapeKey } from '@/lib/accessibility/keyboard';

export interface UseEscapeKeyOptions {
  enabled?: boolean;
  target?: RefObject<HTMLElement> | HTMLElement | Document;
  stopPropagation?: boolean;
  preventDefault?: boolean;
}

export const useEscapeKey = (
  callback: () => void,
  options: UseEscapeKeyOptions = {}
): void => {
  const {
    enabled = true,
    target,
    stopPropagation = false,
    preventDefault = false,
  } = options;

  const handleKeyDown = useCallback(
    (event: Event) => {
      if (!enabled) return;

      if (isEscapeKey(event as KeyboardEvent)) {
        if (stopPropagation) {
          event.stopPropagation();
        }

        if (preventDefault) {
          event.preventDefault();
        }

        callback();
      }
    },
    [enabled, stopPropagation, preventDefault, callback]
  );

  useEffect(() => {
    if (!enabled) return;

    const element = target && 'current' in target ? target.current : target || document;

    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, target, handleKeyDown]);
};

/**
 * useEscapeKeyWithRef hook
 * Escape key handler with automatic target reference
 */
export const useEscapeKeyWithRef = (
  callback: () => void,
  targetRef: RefObject<HTMLElement>,
  options: Omit<UseEscapeKeyOptions, 'target'> = {}
): void => {
  useEscapeKey(callback, {
    ...options,
    target: targetRef,
  });
};
