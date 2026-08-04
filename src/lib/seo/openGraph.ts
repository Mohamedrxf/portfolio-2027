/**
 * Open Graph metadata configuration
 * Provides reusable Open Graph metadata for social media sharing
 */

export interface OpenGraphConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

export const defaultOpenGraph: OpenGraphConfig = {
  type: 'website',
  locale: 'en_US',
};

export const getOpenGraphMetadata = (
  config: OpenGraphConfig = {}
): Record<string, string> => {
  const merged = { ...defaultOpenGraph, ...config };

  const metadata: Record<string, string> = {};

  if (merged.title) {
    metadata['og:title'] = merged.title;
  }

  if (merged.description) {
    metadata['og:description'] = merged.description;
  }

  if (merged.image) {
    metadata['og:image'] = merged.image;
  }

  if (merged.url) {
    metadata['og:url'] = merged.url;
  }

  if (merged.type) {
    metadata['og:type'] = merged.type;
  }

  if (merged.siteName) {
    metadata['og:site_name'] = merged.siteName;
  }

  if (merged.locale) {
    metadata['og:locale'] = merged.locale;
  }

  return metadata;
};
