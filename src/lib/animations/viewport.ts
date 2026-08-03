/**
 * Animation Viewport Presets
 * 
 * Reusable viewport configuration for scroll-triggered animations.
 * These presets define when animations should trigger based on viewport intersection.
 */

export type ViewportConfig = {
  once?: boolean
  amount?: number | 'some' | 'all' | 'most'
  margin?: string
}

// Animate once - animation triggers once when element enters viewport
export const once: ViewportConfig = {
  once: true,
  amount: 0.3, // Trigger when 30% of element is visible
}

// Always - animation triggers every time element enters viewport
export const always: ViewportConfig = {
  once: false,
  amount: 0.3,
}

// Partial - triggers when element is partially visible (20%)
export const partial: ViewportConfig = {
  once: true,
  amount: 0.2,
}

// Full - triggers when element is fully visible (100%)
export const full: ViewportConfig = {
  once: true,
  amount: 1,
}

// Half - triggers when element is 50% visible
export const half: ViewportConfig = {
  once: true,
  amount: 0.5,
}

// Margin - triggers with margin offset (triggers before element enters viewport)
export const margin: ViewportConfig = {
  once: true,
  amount: 0.3,
  margin: '-100px', // Trigger 100px before element enters viewport
}

// Always partial - triggers every time element is partially visible
export const alwaysPartial: ViewportConfig = {
  once: false,
  amount: 0.2,
}

// Always full - triggers every time element is fully visible
export const alwaysFull: ViewportConfig = {
  once: false,
  amount: 1,
}

// Near - triggers when element is near viewport (margin offset)
export const near: ViewportConfig = {
  once: true,
  amount: 0.1,
  margin: '-50px',
}

// Default viewport preset for most use cases
export const defaultViewport: ViewportConfig = {
  once: true,
  amount: 0.3,
}