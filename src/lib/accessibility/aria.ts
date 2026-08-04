/**
 * ARIA helpers
 * Provides utilities for ARIA attribute management
 */

export interface ARIAAttributes {
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-expanded'?: boolean | 'true' | 'false';
  'aria-selected'?: boolean | 'true' | 'false';
  'aria-checked'?: boolean | 'true' | 'false' | 'mixed';
  'aria-pressed'?: boolean | 'true' | 'false' | 'mixed';
  'aria-disabled'?: boolean | 'true' | 'false';
  'aria-required'?: boolean | 'true' | 'false';
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean | 'true' | 'false';
  'aria-busy'?: boolean | 'true' | 'false';
  'aria-current'?: boolean | 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-controls'?: string;
  'aria-haspopup'?: boolean | 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-modal'?: boolean | 'true' | 'false';
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
}

/**
 * Generates ARIA attributes object
 */
export const getAriaAttributes = (attributes: Partial<ARIAAttributes>): Record<string, string | boolean | number> => {
  const ariaProps: Record<string, string | boolean | number> = {};

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      ariaProps[key] = value;
    }
  });

  return ariaProps;
};

/**
 * Combines multiple ARIA attribute objects
 */
export const combineAriaAttributes = (
  ...attributes: Partial<ARIAAttributes>[]
): Record<string, string | boolean | number> => {
  return attributes.reduce((combined, current) => {
    return { ...combined, ...getAriaAttributes(current) };
  }, {});
};

/**
 * Creates ARIA attributes for interactive elements
 */
export const getInteractiveAria = (
  label?: string,
  describedBy?: string,
  disabled?: boolean
): Record<string, string | boolean | number> => {
  const aria: Record<string, string | boolean | number> = {};

  if (label) {
    aria['aria-label'] = label;
  }

  if (describedBy) {
    aria['aria-describedby'] = describedBy;
  }

  if (disabled) {
    aria['aria-disabled'] = true;
  }

  return aria;
};

/**
 * Creates ARIA attributes for expanded/collapsed states
 */
export const getExpandedAria = (
  expanded: boolean,
  controls?: string
): Record<string, string | boolean | number> => {
  const aria: Record<string, string | boolean> = {
    'aria-expanded': expanded,
  };

  if (controls) {
    aria['aria-controls'] = controls;
  }

  return aria;
};

/**
 * Creates ARIA attributes for selected states
 */
export const getSelectedAria = (selected: boolean): Record<string, string | boolean | number> => {
  return {
    'aria-selected': selected,
  };
};

/**
 * Creates ARIA attributes for checked states
 */
export const getCheckedAria = (
  checked: boolean | 'mixed'
): Record<string, string | boolean | number> => {
  return {
    'aria-checked': checked,
  };
};

/**
 * Creates ARIA attributes for pressed states
 */
export const getPressedAria = (
  pressed: boolean | 'mixed'
): Record<string, string | boolean | number> => {
  return {
    'aria-pressed': pressed,
  };
};

/**
 * Creates ARIA attributes for live regions
 */
export const getLiveRegionAria = (
  polite: boolean = true,
  atomic: boolean = false
): Record<string, string | boolean | number> => {
  return {
    'aria-live': polite ? 'polite' : 'assertive',
    'aria-atomic': atomic,
  };
};

/**
 * Creates ARIA attributes for modal dialogs
 */
export const getModalAria = (
  labelledBy?: string,
  describedBy?: string
): Record<string, string | boolean | number> => {
  const aria: Record<string, string | boolean> = {
    'aria-modal': true,
    role: 'dialog',
  };

  if (labelledBy) {
    aria['aria-labelledby'] = labelledBy;
  }

  if (describedBy) {
    aria['aria-describedby'] = describedBy;
  }

  return aria;
};

/**
 * Creates ARIA attributes for current page/item
 */
export const getCurrentAria = (
  current: boolean | 'page' | 'step' | 'location' | 'date' | 'time' = true
): Record<string, string | boolean | number> => {
  return {
    'aria-current': current,
  };
};

/**
 * Creates ARIA attributes for loading/busy states
 */
export const getBusyAria = (busy: boolean = true): Record<string, string | boolean | number> => {
  return {
    'aria-busy': busy,
  };
};

/**
 * Creates ARIA attributes for invalid states
 */
export const getInvalidAria = (
  invalid: boolean,
  describedBy?: string
): Record<string, string | boolean | number> => {
  const aria: Record<string, string | boolean> = {
    'aria-invalid': invalid,
  };

  if (invalid && describedBy) {
    aria['aria-describedby'] = describedBy;
  }

  return aria;
};

/**
 * Creates ARIA attributes for range/slider components
 */
export const getRangeAria = (
  valueNow: number,
  valueMin?: number,
  valueMax?: number,
  valueText?: string
): Record<string, string | boolean | number> => {
  const aria: Record<string, string | boolean | number> = {
    'aria-valuenow': valueNow,
  };

  if (valueMin !== undefined) {
    aria['aria-valuemin'] = valueMin;
  }

  if (valueMax !== undefined) {
    aria['aria-valuemax'] = valueMax;
  }

  if (valueText) {
    aria['aria-valuetext'] = valueText;
  }

  return aria;
};

/**
 * Removes ARIA attributes from an element
 */
export const removeAriaAttributes = (element: HTMLElement): void => {
  const ariaAttributes = Array.from(element.attributes).filter((attr) =>
    attr.name.startsWith('aria-') || attr.name === 'role'
  );

  ariaAttributes.forEach((attr) => {
    element.removeAttribute(attr.name);
  });
};

/**
 * Checks if element has ARIA attributes
 */
export const hasAriaAttributes = (element: HTMLElement): boolean => {
  return Array.from(element.attributes).some(
    (attr) => attr.name.startsWith('aria-') || attr.name === 'role'
  );
};
