/**
 * Centralized Animation Constants
 * 
 * Single source of truth for all animation timing, easing, and configuration
 * across the portfolio. Reuse these constants throughout the application.
 */

export const ANIMATION_CONSTANTS = {
  // Duration constants (in seconds)
  duration: {
    instant: 0.05,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
    slowest: 1.0,
  },

  // Delay constants (in seconds)
  delay: {
    none: 0,
    short: 0.1,
    normal: 0.2,
    long: 0.3,
    longer: 0.5,
  },

  // Stagger constants (in seconds)
  stagger: {
    none: 0,
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    slower: 0.2,
  },

  // Easing constants (cubic-bezier)
  easing: {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  },

  // Spring constants for magnetic and interactive effects
  spring: {
    subtle: {
      stiffness: 300,
      damping: 30,
    },
    normal: {
      stiffness: 400,
      damping: 25,
    },
    bouncy: {
      stiffness: 500,
      damping: 15,
    },
  },

  // Magnetic effect constants
  magnetic: {
    strength: 0.3, // How strongly the button follows the cursor
    damping: 0.15, // Smoothness of the movement
    radius: 100, // Distance threshold for magnetic effect
  },

  // Cursor animation constants
  cursor: {
    dotSize: 8,
    followerSize: 40,
    smoothness: 0.15,
    clickScale: 0.8,
  },

  // Spotlight effect constants
  spotlight: {
    size: 400,
    opacity: 0.15,
    smoothness: 0.1,
  },

  // Parallax constants
  parallax: {
    speed: 0.5,
    threshold: 0.1,
  },

  // Section-specific animation presets
  sections: {
    hero: {
      duration: 1.0,
      delay: 0.2,
      stagger: 0.15,
    },
    about: {
      duration: 0.7,
      delay: 0.1,
      stagger: 0.1,
    },
    skills: {
      duration: 0.5,
      delay: 0.15,
      stagger: 0.05,
    },
    projects: {
      duration: 0.5,
      delay: 0.1,
      stagger: 0.1,
    },
    experience: {
      duration: 0.6,
      delay: 0.1,
      stagger: 0.15,
    },
    contact: {
      duration: 0.5,
      delay: 0.1,
      stagger: 0.1,
    },
  },
} as const

// Re-export for convenience
export const {
  duration,
  delay,
  stagger,
  easing,
  spring,
  magnetic,
  cursor,
  spotlight,
  parallax,
  sections,
} = ANIMATION_CONSTANTS
