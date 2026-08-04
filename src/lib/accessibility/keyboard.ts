/**
 * Keyboard navigation helpers
 * Provides utilities for keyboard navigation and key handling
 */

export type KeyHandler = (event: KeyboardEvent) => void;

export interface KeyboardMap {
  [key: string]: KeyHandler;
}

export interface KeyboardOptions {
  stopPropagation?: boolean;
  preventDefault?: boolean;
  target?: HTMLElement | Document;
}

/**
 * Common keyboard keys
 */
export const Keys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
} as const;

/**
 * Checks if a key is pressed
 */
export const isKey = (event: KeyboardEvent, key: string): boolean => {
  return event.key === key;
};

/**
 * Checks if Enter key is pressed
 */
export const isEnterKey = (event: KeyboardEvent): boolean => {
  return isKey(event, Keys.ENTER);
};

/**
 * Checks if Space key is pressed
 */
export const isSpaceKey = (event: KeyboardEvent): boolean => {
  return isKey(event, Keys.SPACE);
};

/**
 * Checks if Escape key is pressed
 */
export const isEscapeKey = (event: KeyboardEvent): boolean => {
  return isKey(event, Keys.ESCAPE);
};

/**
 * Checks if Tab key is pressed
 */
export const isTabKey = (event: KeyboardEvent): boolean => {
  return isKey(event, Keys.TAB);
};

/**
 * Checks if arrow key is pressed
 */
export const isArrowKey = (event: KeyboardEvent): boolean => {
  const arrowKeys: readonly string[] = [Keys.ARROW_UP, Keys.ARROW_DOWN, Keys.ARROW_LEFT, Keys.ARROW_RIGHT];
  return arrowKeys.includes(event.key);
};

/**
 * Checks if Home or End key is pressed
 */
export const isHomeEndKey = (event: KeyboardEvent): boolean => {
  const homeEndKeys: readonly string[] = [Keys.HOME, Keys.END];
  return homeEndKeys.includes(event.key);
};

/**
 * Checks if modifier key is pressed
 */
export const isModifierKey = (event: KeyboardEvent): boolean => {
  return event.ctrlKey || event.altKey || event.metaKey || event.shiftKey;
};

/**
 * Checks if Ctrl key is pressed
 */
export const isCtrlKey = (event: KeyboardEvent): boolean => {
  return event.ctrlKey;
};

/**
 * Checks if Alt key is pressed
 */
export const isAltKey = (event: KeyboardEvent): boolean => {
  return event.altKey;
};

/**
 * Checks if Shift key is pressed
 */
export const isShiftKey = (event: KeyboardEvent): boolean => {
  return event.shiftKey;
};

/**
 * Checks if Meta (Command) key is pressed
 */
export const isMetaKey = (event: KeyboardEvent): boolean => {
  return event.metaKey;
};

/**
 * Creates a keyboard event handler
 */
export const createKeyboardHandler = (
  keyMap: KeyboardMap,
  options: KeyboardOptions = {}
): KeyHandler => {
  const { stopPropagation = false, preventDefault = false } = options;

  return (event: KeyboardEvent) => {
    const handler = keyMap[event.key];

    if (handler) {
      if (stopPropagation) {
        event.stopPropagation();
      }

      if (preventDefault) {
        event.preventDefault();
      }

      handler(event);
    }
  };
};

/**
 * Attaches keyboard event listener
 */
export const attachKeyboardListener = (
  keyMap: KeyboardMap,
  options: KeyboardOptions = {}
): (() => void) => {
  const { target = document } = options;
  const handler = createKeyboardHandler(keyMap, options);

  target.addEventListener('keydown', handler as EventListener);

  return () => {
    target.removeEventListener('keydown', handler as EventListener);
  };
};

/**
 * Creates an Enter key handler
 */
export const createEnterHandler = (
  handler: () => void,
  options: KeyboardOptions = {}
): KeyHandler => {
  return (event: KeyboardEvent) => {
    if (isEnterKey(event)) {
      if (options.stopPropagation) {
        event.stopPropagation();
      }

      if (options.preventDefault) {
        event.preventDefault();
      }

      handler();
    }
  };
};

/**
 * Creates an Escape key handler
 */
export const createEscapeHandler = (
  handler: () => void,
  options: KeyboardOptions = {}
): KeyHandler => {
  return (event: KeyboardEvent) => {
    if (isEscapeKey(event)) {
      if (options.stopPropagation) {
        event.stopPropagation();
      }

      if (options.preventDefault) {
        event.preventDefault();
      }

      handler();
    }
  };
};

/**
 * Creates a Space key handler
 */
export const createSpaceHandler = (
  handler: () => void,
  options: KeyboardOptions = {}
): KeyHandler => {
  return (event: KeyboardEvent) => {
    if (isSpaceKey(event)) {
      if (options.stopPropagation) {
        event.stopPropagation();
      }

      if (options.preventDefault) {
        event.preventDefault();
      }

      handler();
    }
  };
};

/**
 * Creates an arrow key handler
 */
export const createArrowHandler = (
  handlers: {
    up?: () => void;
    down?: () => void;
    left?: () => void;
    right?: () => void;
  },
  options: KeyboardOptions = {}
): KeyHandler => {
  return (event: KeyboardEvent) => {
    if (!isArrowKey(event)) return;

    if (options.stopPropagation) {
      event.stopPropagation();
    }

    if (options.preventDefault) {
      event.preventDefault();
    }

    switch (event.key) {
      case Keys.ARROW_UP:
        handlers.up?.();
        break;
      case Keys.ARROW_DOWN:
        handlers.down?.();
        break;
      case Keys.ARROW_LEFT:
        handlers.left?.();
        break;
      case Keys.ARROW_RIGHT:
        handlers.right?.();
        break;
    }
  };
};

/**
 * Creates a Home/End key handler
 */
export const createHomeEndHandler = (
  handlers: {
    home?: () => void;
    end?: () => void;
  },
  options: KeyboardOptions = {}
): KeyHandler => {
  return (event: KeyboardEvent) => {
    if (!isHomeEndKey(event)) return;

    if (options.stopPropagation) {
      event.stopPropagation();
    }

    if (options.preventDefault) {
      event.preventDefault();
    }

    switch (event.key) {
      case Keys.HOME:
        handlers.home?.();
        break;
      case Keys.END:
        handlers.end?.();
        break;
    }
  };
};

/**
 * Checks if keyboard navigation is supported
 */
export const isKeyboardNavigationSupported = (): boolean => {
  return 'addEventListener' in window;
};

/**
 * Gets the current keyboard layout
 */
export const getKeyboardLayout = (): string | Promise<string> => {
  if ((navigator as unknown as { keyboard?: { getLayoutMap: () => Promise<{ get: (key: string) => string | undefined }> } }).keyboard) {
    return (navigator as unknown as { keyboard: { getLayoutMap: () => Promise<{ get: (key: string) => string | undefined }> } }).keyboard.getLayoutMap().then((layout) => {
      return layout.get('KeyA') || 'en-US';
    });
  }
  return 'en-US';
};

/**
 * Prevents default behavior for a key
 */
export const preventDefaultForKey = (event: KeyboardEvent, key: string): void => {
  if (isKey(event, key)) {
    event.preventDefault();
  }
};

/**
 * Checks if event is from a keyboard (not a virtual keyboard)
 */
export const isPhysicalKeyboard = (event: KeyboardEvent): boolean => {
  return event.isTrusted;
};
