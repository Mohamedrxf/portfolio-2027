/**
 * Sitemap utilities
 * Provides reusable sitemap entry generators for building sitemaps
 */

export interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const defaultSitemapEntry: Partial<SitemapEntry> = {
  changeFrequency: 'monthly',
  priority: 0.5,
};

export const createSitemapEntry = (entry: SitemapEntry): SitemapEntry => {
  return {
    ...defaultSitemapEntry,
    ...entry,
  };
};

export const createSitemapEntries = (entries: SitemapEntry[]): SitemapEntry[] => {
  return entries.map(createSitemapEntry);
};

export const formatLastModified = (date: string | Date): string => {
  if (typeof date === 'string') {
    return date;
  }
  return date.toISOString();
};

export const validateSitemapEntry = (entry: SitemapEntry): boolean => {
  if (!entry.url || typeof entry.url !== 'string') {
    return false;
  }

  if (entry.priority !== undefined) {
    if (typeof entry.priority !== 'number' || entry.priority < 0 || entry.priority > 1) {
      return false;
    }
  }

  if (entry.changeFrequency) {
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    if (!validFrequencies.includes(entry.changeFrequency)) {
      return false;
    }
  }

  return true;
};

export const filterValidSitemapEntries = (entries: SitemapEntry[]): SitemapEntry[] => {
  return entries.filter(validateSitemapEntry);
};
