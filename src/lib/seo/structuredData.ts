/**
 * Structured Data (JSON-LD) generators
 * Provides reusable JSON-LD structured data for search engines
 */

export interface PersonData {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: string;
  sameAs?: string[];
  description?: string;
}

export interface WebSiteData {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    type: string;
    target: string;
    'query-input'?: string;
  };
}

export interface OrganizationData {
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    type: string;
    telephone?: string;
    email?: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface BreadcrumbData {
  itemListElement: BreadcrumbItem[];
}

export interface ProjectData {
  name: string;
  description: string;
  url?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  applicationCategory?: string;
  operatingSystem?: string;
}

export interface ArticleData {
  headline: string;
  description?: string;
  image?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url?: string;
  keywords?: string[];
}

export const generatePersonStructuredData = (data: PersonData): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    url: data.url,
    image: data.image,
    jobTitle: data.jobTitle,
    worksFor: data.worksFor,
    sameAs: data.sameAs,
    description: data.description,
  };
};

export const generateWebSiteStructuredData = (data: WebSiteData): object => {
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
  };

  if (data.description) {
    structuredData.description = data.description;
  }

  if (data.potentialAction) {
    structuredData.potentialAction = {
      '@type': 'SearchAction',
      target: data.potentialAction.target,
      'query-input': data.potentialAction['query-input'] || 'required name=search_term_string',
    };
  }

  return structuredData;
};

export const generateOrganizationStructuredData = (data: OrganizationData): object => {
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
  };

  if (data.url) {
    structuredData.url = data.url;
  }

  if (data.logo) {
    structuredData.logo = data.logo;
  }

  if (data.description) {
    structuredData.description = data.description;
  }

  if (data.sameAs) {
    structuredData.sameAs = data.sameAs;
  }

  if (data.contactPoint) {
    structuredData.contactPoint = {
      '@type': 'ContactPoint',
      ...data.contactPoint,
    };
  }

  return structuredData;
};

export const generateBreadcrumbStructuredData = (data: BreadcrumbData): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.itemListElement.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
};

export const generateProjectStructuredData = (data: ProjectData): object => {
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
  };

  if (data.url) {
    structuredData.url = data.url;
  }

  if (data.image) {
    structuredData.image = data.image;
  }

  if (data.author) {
    structuredData.author = {
      '@type': 'Person',
      name: data.author,
    };
  }

  if (data.datePublished) {
    structuredData.datePublished = data.datePublished;
  }

  if (data.dateModified) {
    structuredData.dateModified = data.dateModified;
  }

  if (data.keywords) {
    structuredData.keywords = data.keywords.join(', ');
  }

  if (data.applicationCategory) {
    structuredData.applicationCategory = data.applicationCategory;
  }

  if (data.operatingSystem) {
    structuredData.operatingSystem = data.operatingSystem;
  }

  return structuredData;
};

export const generateArticleStructuredData = (data: ArticleData): object => {
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
  };

  if (data.description) {
    structuredData.description = data.description;
  }

  if (data.image) {
    structuredData.image = data.image;
  }

  if (data.dateModified) {
    structuredData.dateModified = data.dateModified;
  }

  if (data.url) {
    structuredData.url = data.url;
  }

  if (data.keywords) {
    structuredData.keywords = data.keywords.join(', ');
  }

  return structuredData;
};
