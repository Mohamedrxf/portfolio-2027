/**
 * useKeyboardNavigation hook
 * Provides keyboard navigation for interactive elements
 */

import { useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import { Keys } from '@/lib/accessibility/keyboard';
import { type FocusableSelector } from '@/lib/accessibility/focus';
import {
  focusNextElement,
  focusPreviousElement,
  focusFirstElement,
  focusLastElement,
} from '@/lib/accessibility/focus';

export interface UseKeyboardNavigationOptions extends FocusableSelector {
  enabled?: boolean;
  orientation?: 'horizontal' | 'vertical' | 'both';
  _loop?: boolean;
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
}

export const useKeyboardNavigation = (
  containerRef: RefObject<HTMLElement>,
  options: UseKeyboardNavigationOptions = {}
): void => {
  const {
    enabled = true,
    orientation = 'vertical',
    _loop = true,
    onEnter,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    ...focusOptions
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !containerRef.current) return;

      const container = containerRef.current;

      switch (event.key) {
        case Keys.ENTER:
          onEnter?.();
          break;

        case Keys.ESCAPE:
          onEscape?.();
          break;

        case Keys.ARROW_UP:
          if (orientation === 'vertical' || orientation === 'both') {
            event.preventDefault();
            if (onArrowUp) {
              onArrowUp();
            } else {
              focusPreviousElement(container, focusOptions);
            }
          }
          break;

        case Keys.ARROW_DOWN:
          if (orientation === 'vertical' || orientation === 'both') {
            event.preventDefault();
            if (onArrowDown) {
              onArrowDown();
            } else {
              focusNextElement(container, focusOptions);
            }
          }
          break;

        case Keys.ARROW_LEFT:
          if (orientation === 'horizontal' || orientation === 'both') {
            event.preventDefault();
            if (onArrowLeft) {
              onArrowLeft();
            } else {
              focusPreviousElement(container, focusOptions);
            }
          }
          break;

        case Keys.ARROW_RIGHT:
          if (orientation === 'horizontal' || orientation === 'both') {
            event.preventDefault();
            if (onArrowRight) {
              onArrowRight();
            } else {
              focusNextElement(container, focusOptions);
            }
          }
          break;

        case Keys.HOME:
          event.preventDefault();
          if (onHome) {
            onHome();
          } else {
            focusFirstElement(container, focusOptions);
          }
          break;

        case Keys.END:
          event.preventDefault();
          if (onEnd) {
            onEnd();
          } else {
            focusLastElement(container, focusOptions);
          }
          break;
      }
    },
    [
      enabled,
      containerRef,
      orientation,
      onEnter,
      onEscape,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
      onHome,
      onEnd,
      focusOptions,
    ]
  );

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, containerRef, handleKeyDown]);
};

/**
 * useListNavigation hook
 * Specialized hook for list navigation
 */
export const useListNavigation = (
  containerRef: RefObject<HTMLElement>,
  options: Omit<UseKeyboardNavigationOptions, 'orientation'> = {}
): void => {
  useKeyboardNavigation(containerRef, {
    ...options,
    orientation: 'vertical',
  });
};

/**
 * useGridNavigation hook
 * Specialized hook for grid navigation
 */
export const useGridNavigation = (
  containerRef: RefObject<HTMLElement>,
  options: Omit<UseKeyboardNavigationOptions, 'orientation'> = {}
): void => {
  useKeyboardNavigation(containerRef, {
    ...options,
    orientation: 'both',
  });
};

/**
 * useMenuNavigation hook
 * Specialized hook for menu navigation
 */
export const useMenuNavigation = (
  containerRef: RefObject<HTMLElement>,
  options: Omit<UseKeyboardNavigationOptions, 'orientation' | 'onEnter' | 'onEscape'> & {
    onSelect?: () => void;
    onClose?: () => void;
  } = {}
): void => {
  const { onSelect, onClose, ...navOptions } = options;

  useKeyboardNavigation(containerRef, {
    ...navOptions,
    orientation: 'vertical',
    onEnter: onSelect,
    onEscape: onClose,
  });
};
