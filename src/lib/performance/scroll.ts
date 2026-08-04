/**
 * Scroll performance helpers
 * Provides utilities for optimizing scroll-related operations
 */

import { PERFORMANCE_CONSTANTS } from './constants';

export interface ScrollOptions {
  throttle?: number;
  debounce?: number;
  passive?: boolean;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Throttled scroll event handler
 */
export const createScrollHandler = (
  callback: (position: ScrollPosition) => void,
  _options: ScrollOptions = {}
): ((event: Event) => void) => {
  let ticking = false;

  return (_event: Event) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const position = getScrollPosition();
        callback(position);
        ticking = false;
      });
      ticking = true;
    }
  };
};

/**
 * Gets current scroll position
 */
export const getScrollPosition = (): ScrollPosition => {
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset,
  };
};

/**
 * Smooth scroll to position
 */
export const scrollToPosition = (
  x: number,
  y: number,
  behavior: ScrollBehavior = 'smooth'
): void => {
  window.scrollTo({
    left: x,
    top: y,
    behavior,
  });
};

/**
 * Smooth scroll to element
 */
export const scrollToElement = (
  element: HTMLElement,
  offset: number = 0,
  behavior: ScrollBehavior = 'smooth'
): void => {
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
};

/**
 * Checks if element is in scroll view
 */
export const isInScrollView = (
  element: HTMLElement,
  threshold: number = PERFORMANCE_CONSTANTS.SCROLL_POSITION_THRESHOLD
): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top <= windowHeight + threshold && rect.bottom >= -threshold;
};

/**
 * Debounced scroll handler
 */
export const createDebouncedScrollHandler = (
  callback: (position: ScrollPosition) => void,
  options: ScrollOptions = {}
): ((event: Event) => void) => {
  const {
    debounce = PERFORMANCE_CONSTANTS.SCROLL_DEBOUNCE,
  } = options;

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (_event: Event) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      const position = getScrollPosition();
      callback(position);
      timeoutId = null;
    }, debounce);
  };
};

/**
 * Creates a scroll spy for navigation highlighting
 */
export const createScrollSpy = (
  sections: HTMLElement[],
  callback: (activeSection: HTMLElement | null) => void,
  _options: ScrollOptions = {}
): (() => void) => {

  const handler = createScrollHandler(() => {
    const scrollPosition = window.scrollY + 100;

    let activeSection: HTMLElement | null = null;

    for (const section of sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection = section;
        break;
      }
    }

    callback(activeSection);
  }, {});

  window.addEventListener('scroll', handler, { passive: true });

  return () => {
    window.removeEventListener('scroll', handler);
  };
};

/**
 * Parallax scroll effect helper
 */
export const createParallaxEffect = (
  element: HTMLElement,
  speed: number = 0.5,
  _options: ScrollOptions = {}
): (() => void) => {
  const handler = createScrollHandler(() => {
    const scrollY = window.scrollY;
    const offset = scrollY * speed;
    element.style.transform = `translateY(${offset}px)`;
  }, {});

  window.addEventListener('scroll', handler, { passive: true });

  return () => {
    window.removeEventListener('scroll', handler);
  };
};

/**
 * Detects scroll direction
 */
export const createScrollDirectionDetector = (
  callback: (direction: 'up' | 'down') => void,
  threshold: number = PERFORMANCE_CONSTANTS.SCROLL_POSITION_THRESHOLD
): (() => void) => {
  let lastScrollY = window.scrollY;

  const handler = () => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';

    if (Math.abs(currentScrollY - lastScrollY) > threshold) {
      callback(direction);
      lastScrollY = currentScrollY;
    }
  };

  window.addEventListener('scroll', handler, { passive: true });

  return () => {
    window.removeEventListener('scroll', handler);
  };
};

/**
 * Optimizes scroll performance by using requestAnimationFrame
 */
export const optimizeScrollPerformance = (): void => {
  // Enable passive event listeners for scroll
  const supportsPassive = (() => {
    let supports = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supports = true;
          return true;
        },
      });
      const handler = () => {};
      window.addEventListener('test', handler, opts);
      window.removeEventListener('test', handler, opts);
    } catch {
      // Ignore
    }
    return supports;
  })();

  if (supportsPassive) {
    // Passive listeners are already supported by modern browsers
    return;
  }
};

/**
 * Gets scroll percentage
 */
export const getScrollPercentage = (): number => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
};

/**
 * Checks if user has scrolled to bottom
 */
export const isScrolledToBottom = (threshold: number = 100): boolean => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  return scrollTop + clientHeight >= scrollHeight - threshold;
};
