/**
 * Image optimization helpers
 * Provides utilities for optimizing images for performance
 */

import { PERFORMANCE_CONSTANTS, type ImageQuality, type ImageFormat, type ImageSize } from './constants';

export interface ImageOptimizationOptions {
  quality?: ImageQuality | number;
  format?: ImageFormat;
  width?: ImageSize | number;
  height?: number;
  enableWebP?: boolean;
  enableAvif?: boolean;
  placeholder?: boolean;
}

export interface ImageSrcSet {
  src: string;
  srcSet?: string;
  sizes?: string;
}

/**
 * Generates an optimized image URL with quality and format parameters
 */
export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  const {
    quality = PERFORMANCE_CONSTANTS.IMAGE_QUALITY.HIGH,
    format,
    width,
    height,
  } = options;

  if (!src) return '';

  const url = new URL(src, window.location.origin);
  const params = new URLSearchParams(url.search);

  if (quality) {
    params.set('q', quality.toString());
  }

  if (format) {
    params.set('f', format);
  }

  if (width) {
    params.set('w', width.toString());
  }

  if (height) {
    params.set('h', height.toString());
  }

  url.search = params.toString();
  return url.toString();
};

/**
 * Generates a responsive srcset for images
 */
export const generateSrcSet = (
  src: string,
  sizes: number[] = [300, 600, 1200, 1920],
  options: ImageOptimizationOptions = {}
): string => {
  return sizes
    .map((size) => {
      const optimizedUrl = getOptimizedImageUrl(src, { ...options, width: size });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
};

/**
 * Generates sizes attribute for responsive images
 */
export const generateSizes = (breakpoints: Record<string, number>): string => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(min-width: ${breakpoint}px) ${size}px`)
    .join(', ');
};

/**
 * Checks if browser supports modern image formats
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

export const supportsAvif = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  const avif = new Image();
  avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  return new Promise((resolve) => {
    avif.onload = () => resolve(avif.width > 0 && avif.height > 0);
    avif.onerror = () => resolve(false);
  });
};

/**
 * Gets the best supported image format
 */
export const getBestImageFormat = async (): Promise<ImageFormat> => {
  if (await supportsAvif()) {
    return PERFORMANCE_CONSTANTS.IMAGE_FORMATS.AVIF;
  }
  if (supportsWebP()) {
    return PERFORMANCE_CONSTANTS.IMAGE_FORMATS.WEBP;
  }
  return PERFORMANCE_CONSTANTS.IMAGE_FORMATS.JPEG;
};

/**
 * Creates a placeholder image URL
 */
export const createPlaceholderUrl = (
  width: number = PERFORMANCE_CONSTANTS.IMAGE_SIZES.MEDIUM,
  height: number = PERFORMANCE_CONSTANTS.IMAGE_SIZES.MEDIUM,
  color: string = 'e0e0e0'
): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23${color}'/%3E%3C/svg%3E`;
};

/**
 * Calculates aspect ratio for images
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

/**
 * Validates image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};
