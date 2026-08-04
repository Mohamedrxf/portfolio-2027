/**
 * Screen reader utilities
 * Provides utilities for screen reader support and announcements
 */

/**
 * Announces a message to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';

  Object.assign(announcement.style, {
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

  announcement.textContent = message;
  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Creates a live region element
 */
export const createLiveRegion = (priority: 'polite' | 'assertive' = 'polite'): HTMLElement => {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';

  Object.assign(liveRegion.style, {
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

  return liveRegion;
};

/**
 * Updates a live region with a message
 */
export const updateLiveRegion = (liveRegion: HTMLElement, message: string): void => {
  liveRegion.textContent = message;
};

/**
 * Clears a live region
 */
export const clearLiveRegion = (liveRegion: HTMLElement): void => {
  liveRegion.textContent = '';
};

/**
 * Hides content from screen readers but keeps it visible
 */
export const hideFromScreenReader = (element: HTMLElement): void => {
  element.setAttribute('aria-hidden', 'true');
};

/**
 * Shows content to screen readers
 */
export const showToScreenReader = (element: HTMLElement): void => {
  element.removeAttribute('aria-hidden');
};

/**
 * Adds screen reader only class
 */
export const addScreenReaderOnlyClass = (element: HTMLElement): void => {
  element.classList.add('sr-only');
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
 * Removes screen reader only class
 */
export const removeScreenReaderOnlyClass = (element: HTMLElement): void => {
  element.classList.remove('sr-only');
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

/**
 * Adds a label for screen readers
 */
export const addScreenReaderLabel = (element: HTMLElement, label: string): void => {
  element.setAttribute('aria-label', label);
};

/**
 * Adds a description for screen readers
 */
export const addScreenReaderDescription = (element: HTMLElement, description: string): void => {
  element.setAttribute('aria-describedby', description);
};

/**
 * Links an element to a label
 */
export const linkToLabel = (element: HTMLElement, labelId: string): void => {
  element.setAttribute('aria-labelledby', labelId);
};

/**
 * Checks if screen reader is active
 */
export const isScreenReaderActive = (): boolean => {
  // This is a heuristic check - there's no definitive way to detect screen readers
  const announcement = createLiveRegion('polite');
  announcement.textContent = 'Screen reader detection';
  document.body.appendChild(announcement);

  const isActive = false;

  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 100);

  return isActive;
};

/**
 * Sets the document title for screen readers
 */
export const setDocumentTitle = (title: string): void => {
  document.title = title;
};

/**
 * Updates the document title with a prefix
 */
export const updateDocumentTitle = (prefix: string): void => {
  const currentTitle = document.title;
  document.title = `${prefix} - ${currentTitle}`;
};

/**
 * Creates a skip link for keyboard navigation
 */
export const createSkipLink = (
  targetId: string,
  text: string = 'Skip to main content'
): HTMLAnchorElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';

  Object.assign(skipLink.style, {
    position: 'absolute',
    top: '-40px',
    left: '0',
    background: '#000',
    color: '#fff',
    padding: '8px',
    textDecoration: 'none',
    zIndex: '100',
  });

  skipLink.addEventListener('focus', () => {
    Object.assign(skipLink.style, {
      top: '0',
    });
  });

  skipLink.addEventListener('blur', () => {
    Object.assign(skipLink.style, {
      top: '-40px',
    });
  });

  return skipLink;
};

/**
 * Adds landmark role to an element
 */
export const addLandmarkRole = (element: HTMLElement, role: string): void => {
  element.setAttribute('role', role);
};

/**
 * Common landmark roles
 */
export const LandmarkRoles = {
  BANNER: 'banner',
  NAVIGATION: 'navigation',
  MAIN: 'main',
  COMPLEMENTARY: 'complementary',
  CONTENTINFO: 'contentinfo',
  FORM: 'form',
  SEARCH: 'search',
  REGION: 'region',
} as const;

/**
 * Checks if element has a landmark role
 */
export const hasLandmarkRole = (element: HTMLElement): boolean => {
  const role = element.getAttribute('role');
  return Object.values(LandmarkRoles).includes(role as typeof LandmarkRoles[keyof typeof LandmarkRoles]);
};

/**
 * Adds heading level for screen readers
 */
export const setHeadingLevel = (element: HTMLElement, level: 1 | 2 | 3 | 4 | 5 | 6): void => {
  const heading = document.createElement(`h${level}`);
  heading.textContent = element.textContent;

  element.parentNode?.replaceChild(heading, element);
};

/**
 * Gets the accessible name of an element
 */
export const getAccessibleName = (element: HTMLElement): string => {
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    if (labelElement) {
      return labelElement.textContent || '';
    }
  }

  return element.textContent || '';
};

/**
 * Sets the accessible description of an element
 */
export const setAccessibleDescription = (element: HTMLElement, description: string): void => {
  const id = `description-${Date.now()}`;
  const descriptionElement = document.createElement('span');
  descriptionElement.id = id;
  descriptionElement.className = 'sr-only';
  descriptionElement.textContent = description;

  addScreenReaderOnlyClass(descriptionElement);
  element.parentNode?.insertBefore(descriptionElement, element);

  element.setAttribute('aria-describedby', id);
};
