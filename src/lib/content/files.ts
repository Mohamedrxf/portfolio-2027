/**
 * File utilities
 * Pure functions for file-related operations
 */

/**
 * Format file size to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return ''
  }
  return filename.slice(lastDotIndex + 1).toLowerCase()
}

/**
 * Check if file is an image based on extension
 */
export function isImage(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'avif', 'heic']
  const ext = getFileExtension(filename)
  return imageExtensions.includes(ext)
}

/**
 * Check if file is a PDF based on extension
 */
export function isPdf(filename: string): boolean {
  return getFileExtension(filename) === 'pdf'
}
