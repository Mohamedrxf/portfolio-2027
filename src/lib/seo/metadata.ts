/**
 * General metadata utilities
 * Provides utilities for building and combining metadata
 */

import { truncate } from '@/lib/content';

export interface MetadataConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  language?: string;
  canonical?: string;
  themeColor?: string;
  viewport?: string;
  charset?: string;
}

export const defaultMetadata: Partial<MetadataConfig> = {
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
};

export const getBasicMetadata = (config: MetadataConfig = {}): Record<string, string> => {
  const merged = { ...defaultMetadata, ...config };

  const metadata: Record<string, string> = {};

  if (merged.title) {
    metadata.title = merged.title;
  }

  if (merged.description) {
    metadata.description = merged.description;
  }

  if (merged.keywords && merged.keywords.length > 0) {
    metadata.keywords = merged.keywords.join(', ');
  }

  if (merged.author) {
    metadata.author = merged.author;
  }

  if (merged.language) {
    metadata['http-equiv'] = 'content-language';
    metadata.content = merged.language;
  }

  if (merged.canonical) {
    metadata.canonical = merged.canonical;
  }

  if (merged.themeColor) {
    metadata['theme-color'] = merged.themeColor;
  }

  if (merged.viewport) {
    metadata.viewport = merged.viewport;
  }

  if (merged.charset) {
    metadata.charset = merged.charset;
  }

  return metadata;
};

export const mergeMetadata = (
  ...metadataObjects: Record<string, string>[]
): Record<string, string> => {
  return metadataObjects.reduce((merged, current) => {
    return { ...merged, ...current };
  }, {});
};

export const formatTitle = (title: string, template?: string): string => {
  if (!template) {
    return title;
  }
  return template.replace('%s', title);
};

export const truncateDescription = (description: string, maxLength: number = 160): string => {
  return truncate(description, maxLength);
};
