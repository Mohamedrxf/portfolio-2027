/**
 * URL utilities
 * Pure functions for URL manipulation and validation
 */

/**
 * Normalize a URL by ensuring it has a protocol
 */
export function normalizeUrl(url: string, protocol: string = 'https://'): string {
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return protocol + url
}

/**
 * Check if a URL is external (different domain)
 */
export function isExternalUrl(url: string, currentDomain?: string): boolean {
  if (!url) return false
  
  try {
    const urlObj = new URL(url)
    if (!currentDomain) {
      // If no current domain provided, check if it's absolute
      return urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:'
    }
    return urlObj.hostname !== currentDomain
  } catch {
    // Invalid URL, assume it's internal/relative
    return false
  }
}

/**
 * Get the domain from a URL
 */
export function getDomain(url: string): string | null {
  if (!url) return null
  
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return null
  }
}

/**
 * Open a URL in a new tab (returns the window reference or null)
 * Note: This should be called from a user interaction event handler
 */
export function openInNewTab(url: string): Window | null {
  if (typeof window === 'undefined') return null
  
  try {
    return window.open(url, '_blank', 'noopener,noreferrer')
  } catch {
    return null
  }
}
