/**
 * GSAP Plugin Registration
 * 
 * Centralized plugin registration for GSAP.
 * Plugins are registered once to avoid duplicate registration issues.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginsRegistered = false

/**
 * Register GSAP plugins
 * Call this once at application startup
 */
export const registerGSAP = (): void => {
  if (pluginsRegistered) {
    return
  }

  try {
    // Register ScrollTrigger for scroll-based animations
    gsap.registerPlugin(ScrollTrigger)

    pluginsRegistered = true
  } catch (error) {
    console.warn('GSAP plugin registration failed:', error)
  }
}

/**
 * Check if plugins are registered
 */
export const arePluginsRegistered = (): boolean => {
  return pluginsRegistered
}

/**
 * Get registered plugins info
 */
export const getRegisteredPlugins = () => {
  return {
    scrollTrigger: ScrollTrigger,
  }
}