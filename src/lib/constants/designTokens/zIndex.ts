/**
 * Design Tokens - Z-Index
 * 
 * Centralized z-index scale tokens for the design system.
 * These values match the CSS custom properties defined in the theme files.
 * Theme files should consume these tokens to avoid duplication.
 */

export const zIndex = {
  dropdown: 'var(--z-index-dropdown)', // 1000
  sticky: 'var(--z-index-sticky)', // 1020
  fixed: 'var(--z-index-fixed)', // 1030
  modalBackdrop: 'var(--z-index-modal-backdrop)', // 1040
  modal: 'var(--z-index-modal)', // 1050
  popover: 'var(--z-index-popover)', // 1060
  tooltip: 'var(--z-index-tooltip)', // 1070
  toast: 'var(--z-index-toast)', // 1080
} as const;

// Type exports for TypeScript
export type ZIndex = keyof typeof zIndex;
