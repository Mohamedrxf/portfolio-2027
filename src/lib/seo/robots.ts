/**
 * Robots metadata configuration
 * Provides reusable robots metadata for search engine crawling
 */

export interface RobotsConfig {
  index?: boolean;
  follow?: boolean;
  googleBot?: {
    index?: boolean;
    follow?: boolean;
    noSnippet?: boolean;
    noImageIndex?: boolean;
  };
  bingBot?: {
    index?: boolean;
    follow?: boolean;
    noSnippet?: boolean;
    noImageIndex?: boolean;
  };
}

export const defaultRobots: RobotsConfig = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
  bingBot: {
    index: true,
    follow: true,
  },
};

export const getRobotsMetadata = (config: RobotsConfig = {}): Record<string, string> => {
  const merged = { ...defaultRobots, ...config };

  const metadata: Record<string, string> = {};

  const directives: string[] = [];

  if (merged.index !== undefined) {
    directives.push(merged.index ? 'index' : 'noindex');
  }

  if (merged.follow !== undefined) {
    directives.push(merged.follow ? 'follow' : 'nofollow');
  }

  if (directives.length > 0) {
    metadata.robots = directives.join(', ');
  }

  if (merged.googleBot) {
    const googleBotDirectives: string[] = [];

    if (merged.googleBot.index !== undefined) {
      googleBotDirectives.push(merged.googleBot.index ? 'index' : 'noindex');
    }

    if (merged.googleBot.follow !== undefined) {
      googleBotDirectives.push(merged.googleBot.follow ? 'follow' : 'nofollow');
    }

    if (merged.googleBot.noSnippet) {
      googleBotDirectives.push('nosnippet');
    }

    if (merged.googleBot.noImageIndex) {
      googleBotDirectives.push('noimageindex');
    }

    if (googleBotDirectives.length > 0) {
      metadata['googlebot'] = googleBotDirectives.join(', ');
    }
  }

  if (merged.bingBot) {
    const bingBotDirectives: string[] = [];

    if (merged.bingBot.index !== undefined) {
      bingBotDirectives.push(merged.bingBot.index ? 'index' : 'noindex');
    }

    if (merged.bingBot.follow !== undefined) {
      bingBotDirectives.push(merged.bingBot.follow ? 'follow' : 'nofollow');
    }

    if (merged.bingBot.noSnippet) {
      bingBotDirectives.push('nosnippet');
    }

    if (merged.bingBot.noImageIndex) {
      bingBotDirectives.push('noimageindex');
    }

    if (bingBotDirectives.length > 0) {
      metadata['bingbot'] = bingBotDirectives.join(', ');
    }
  }

  return metadata;
};
