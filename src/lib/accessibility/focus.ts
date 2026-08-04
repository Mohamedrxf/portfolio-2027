/**
 * Focus management utilities
 * Provides utilities for managing focus in accessible applications
 */

export interface FocusableSelector {
  selector?: string;
  includeHidden?: boolean;
  includeDisabled?: boolean;
}

/**
 * Gets all focusable elements within a container
 */
export const getFocusableElements = (
  container: HTMLElement,
  options: FocusableSelector = {}
): HTMLElement[] => {
  const {
    selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    includeHidden = false,
    includeDisabled = false,
  } = options;

  const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));

  return elements.filter((element) => {
    // Check if element is visible
    if (!includeHidden) {
      const style = window.getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return false;
      }
    }

    // Check if element is disabled
    if (!includeDisabled && (element as HTMLInputElement | HTMLButtonElement).disabled) {
      return false;
    }

    // Check if element is focusable
    const tabIndex = parseInt(element.getAttribute('tabindex') || '0', 10);
    if (tabIndex < 0) {
      return false;
    }

    return true;
  });
};

/**
 * Gets the first focusable element in a container
 */
export const getFirstFocusableElement = (
  container: HTMLElement,
  options?: FocusableSelector
): HTMLElement | null => {
  const elements = getFocusableElements(container, options);
  return elements.length > 0 ? elements[0] : null;
};

/**
 * Gets the last focusable element in a container
 */
export const getLastFocusableElement = (
  container: HTMLElement,
  options?: FocusableSelector
): HTMLElement | null => {
  const elements = getFocusableElements(container, options);
  return elements.length > 0 ? elements[elements.length - 1] : null;
};

/**
 * Focuses an element with optional scroll
 */
export const focusElement = (
  element: HTMLElement,
  options: { scroll?: boolean; preventScroll?: boolean } = {}
): boolean => {
  try {
    element.focus(options);
    return true;
  } catch {
    return false;
  }
};

/**
 * Focuses the first focusable element in a container
 */
export const focusFirstElement = (
  container: HTMLElement,
  options?: FocusableSelector & { scroll?: boolean; preventScroll?: boolean }
): boolean => {
  const firstElement = getFirstFocusableElement(container, options);
  if (firstElement) {
    return focusElement(firstElement, { scroll: options?.scroll, preventScroll: options?.preventScroll });
  }
  return false;
};

/**
 * Focuses the last focusable element in a container
 */
export const focusLastElement = (
  container: HTMLElement,
  options?: FocusableSelector & { scroll?: boolean; preventScroll?: boolean }
): boolean => {
  const lastElement = getLastFocusableElement(container, options);
  if (lastElement) {
    return focusElement(lastElement, { scroll: options?.scroll, preventScroll: options?.preventScroll });
  }
  return false;
};

/**
 * Gets the currently focused element
 */
export const getActiveElement = (): HTMLElement | null => {
  return document.activeElement as HTMLElement;
};

/**
 * Checks if an element is focused
 */
export const isElementFocused = (element: HTMLElement): boolean => {
  return document.activeElement === element;
};

/**
 * Saves the currently focused element
 */
export const saveFocus = (): HTMLElement | null => {
  return getActiveElement();
};

/**
 * Restores focus to a previously saved element
 */
export const restoreFocus = (element: HTMLElement | null): boolean => {
  if (element && document.contains(element)) {
    return focusElement(element);
  }
  return false;
};

/**
 * Traps focus within a container
 */
export const trapFocus = (
  container: HTMLElement,
  options?: FocusableSelector
): (() => void) => {
  const firstElement = getFirstFocusableElement(container, options);
  const lastElement = getLastFocusableElement(container, options);

  if (!firstElement || !lastElement) {
    return () => {};
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        focusElement(lastElement);
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        focusElement(firstElement);
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Moves focus to the next focusable element
 */
export const focusNextElement = (
  container: HTMLElement,
  options?: FocusableSelector
): boolean => {
  const elements = getFocusableElements(container, options);
  const currentIndex = elements.findIndex((el) => isElementFocused(el));

  if (currentIndex === -1) {
    return focusFirstElement(container, options);
  }

  const nextIndex = (currentIndex + 1) % elements.length;
  return focusElement(elements[nextIndex]);
};

/**
 * Moves focus to the previous focusable element
 */
export const focusPreviousElement = (
  container: HTMLElement,
  options?: FocusableSelector
): boolean => {
  const elements = getFocusableElements(container, options);
  const currentIndex = elements.findIndex((el) => isElementFocused(el));

  if (currentIndex === -1) {
    return focusLastElement(container, options);
  }

  const prevIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
  return focusElement(elements[prevIndex]);
};

/**
 * Checks if an element can receive focus
 */
export const isFocusable = (element: HTMLElement): boolean => {
  const tabIndex = parseInt(element.getAttribute('tabindex') || '0', 10);
  if (tabIndex < 0) return false;

  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }

  if ((element as HTMLInputElement | HTMLButtonElement).disabled) {
    return false;
  }

  return true;
};

/**
 * Sets the tab index of an element
 */
export const setTabIndex = (element: HTMLElement, tabIndex: number): void => {
  element.setAttribute('tabindex', tabIndex.toString());
};

/**
 * Removes tab index from an element
 */
export const removeTabIndex = (element: HTMLElement): void => {
  element.removeAttribute('tabindex');
};

/**
 * Makes an element focusable
 */
export const makeFocusable = (element: HTMLElement, tabIndex: number = 0): void => {
  setTabIndex(element, tabIndex);
};

/**
 * Makes an element not focusable
 */
export const makeNotFocusable = (element: HTMLElement): void => {
  setTabIndex(element, -1);
};

/**
 * Hides an element from screen readers but keeps it focusable
 */
export const hideVisually = (element: HTMLElement): void => {
  Object.assign(element.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  });
};

/**
 * Shows a visually hidden element
 */
export const showVisually = (element: HTMLElement): void => {
  Object.assign(element.style, {
    position: '',
    width: '',
    height: '',
    padding: '',
    margin: '',
    overflow: '',
    clip: '',
    whiteSpace: '',
    border: '',
  });
};
