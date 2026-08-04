/**
 * Twitter Card metadata configuration
 * Provides reusable Twitter Card metadata for Twitter sharing
 */

export interface TwitterConfig {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string;
  description?: string;
  image?: string;
  creator?: string;
}

export const defaultTwitter: TwitterConfig = {
  card: 'summary_large_image',
};

export const getTwitterMetadata = (
  config: TwitterConfig = {}
): Record<string, string> => {
  const merged = { ...defaultTwitter, ...config };

  const metadata: Record<string, string> = {};

  if (merged.card) {
    metadata['twitter:card'] = merged.card;
  }

  if (merged.title) {
    metadata['twitter:title'] = merged.title;
  }

  if (merged.description) {
    metadata['twitter:description'] = merged.description;
  }

  if (merged.image) {
    metadata['twitter:image'] = merged.image;
  }

  if (merged.creator) {
    metadata['twitter:creator'] = merged.creator;
  }

  return metadata;
};
