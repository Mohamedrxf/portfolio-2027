/**
 * useSEO hook
 * Prepares SEO metadata for pages without DOM manipulation
 * Returns reusable metadata objects for use with any metadata solution
 */

import { useMemo } from 'react';
import { getSEODefaults, type SEODefaults } from './defaults';
import { getOpenGraphMetadata, type OpenGraphConfig } from './openGraph';
import { getTwitterMetadata, type TwitterConfig } from './twitter';
import { getRobotsMetadata, type RobotsConfig } from './robots';
import { getBasicMetadata, formatTitle, truncateDescription, type MetadataConfig } from './metadata';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  robots?: RobotsConfig;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
  robots: Record<string, string>;
  structuredData?: object;
  meta: Record<string, string>;
}

export const useSEO = (config: SEOConfig = {}, defaultsOverride?: Partial<SEODefaults>): SEOData => {
  const defaults = getSEODefaults(defaultsOverride);

  return useMemo(() => {
    const title = config.title || defaults.defaultTitle;
    const formattedTitle = formatTitle(title, defaults.titleTemplate);
    const description = config.description || defaults.defaultDescription;
    const truncatedDescription = truncateDescription(description);
    const keywords = config.keywords || defaults.keywords;
    const canonical = config.canonical || defaults.canonicalUrl;

    const robotsConfig: RobotsConfig = {
      ...config.robots,
      ...(config.noIndex !== undefined ? { index: !config.noIndex } : {}),
      ...(config.noFollow !== undefined ? { follow: !config.noFollow } : {}),
    };

    const openGraphConfig: OpenGraphConfig = {
      title: formattedTitle,
      description: truncatedDescription,
      url: canonical,
      siteName: defaults.siteName,
      locale: defaults.locale,
      ...config.openGraph,
    };

    const twitterConfig: TwitterConfig = {
      title: formattedTitle,
      description: truncatedDescription,
      ...config.twitter,
    };

    const basicMetadata: MetadataConfig = {
      title: formattedTitle,
      description: truncatedDescription,
      keywords,
      author: defaults.author,
      language: defaults.language,
      canonical,
      themeColor: defaults.themeColor,
    };

    const meta = getBasicMetadata(basicMetadata);
    const openGraph = getOpenGraphMetadata(openGraphConfig);
    const twitter = getTwitterMetadata(twitterConfig);
    const robots = getRobotsMetadata(robotsConfig);

    return {
      title: formattedTitle,
      description: truncatedDescription,
      keywords,
      canonical,
      openGraph,
      twitter,
      robots,
      structuredData: config.structuredData,
      meta,
    };
  }, [config, defaults]);
};
