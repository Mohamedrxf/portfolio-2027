/**
 * useFocusTrap hook
 * Traps focus within a container for modals and dialogs
 */

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { trapFocus, getFirstFocusableElement, type FocusableSelector } from '@/lib/accessibility';

export interface UseFocusTrapOptions extends FocusableSelector {
  enabled?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
}

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  options: UseFocusTrapOptions = {}
): void => {
  const { enabled = true, autoFocus = true, restoreFocus = true, ...focusOptions } = options;
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    // Save previous focus
    if (restoreFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Auto focus first element
    if (autoFocus) {
      const firstElement = getFirstFocusableElement(container, focusOptions);
      if (firstElement) {
        firstElement.focus();
      }
    }

    // Trap focus
    const cleanup = trapFocus(container, focusOptions);

    return () => {
      cleanup();

      // Restore focus
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [enabled, autoFocus, restoreFocus, containerRef, focusOptions]);
};
