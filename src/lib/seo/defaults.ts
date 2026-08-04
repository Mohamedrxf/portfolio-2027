/**
 * Centralized SEO defaults
 * Contains default configuration for site-wide SEO settings
 */

export interface SEODefaults {
  siteName: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  author: string;
  language: string;
  locale: string;
  themeColor: string;
  canonicalUrl: string;
}

export const seoDefaults: SEODefaults = {
  siteName: 'Portfolio 2027',
  titleTemplate: '%s | Portfolio 2027',
  defaultTitle: 'Portfolio 2027',
  defaultDescription:
    'A modern portfolio showcasing projects, skills, and professional experience.',
  keywords: ['portfolio', 'developer', 'projects', 'skills', 'experience'],
  author: '',
  language: 'en',
  locale: 'en_US',
  themeColor: '#000000',
  canonicalUrl: 'https://example.com',
};

export const getSEODefaults = (overrides?: Partial<SEODefaults>): SEODefaults => {
  return {
    ...seoDefaults,
    ...overrides,
  };
};
