import { BaseEntity, ContactInfo } from './types'

export interface Site extends BaseEntity {
  name: string
  description: string
  url: string
  author: string
  contact: ContactInfo[]
  navigation: NavigationItem[]
  seo: SEOConfig
}

export interface NavigationItem {
  label: string
  href: string
  order: number
}

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  twitterHandle?: string
}

export const site: Site = {
  id: 'site-1',
  name: 'Portfolio',
  description: 'Professional portfolio showcasing projects, skills, and experience',
  url: 'https://johndoe.com',
  author: 'John Doe',
  contact: [
    {
      type: 'email',
      value: 'contact@example.com',
      label: 'Email',
      primary: true,
    },
    {
      type: 'phone',
      value: '+1 (555) 123-4567',
      label: 'Phone',
      primary: false,
    },
    {
      type: 'location',
      value: 'San Francisco, CA',
      label: 'Location',
      primary: false,
    },
    {
      type: 'availability',
      value: 'Mon - Fri, 9AM - 6PM PST',
      label: 'Availability',
      primary: false,
    },
  ],
  navigation: [
    { label: 'Home', href: '/', order: 1 },
    { label: 'About', href: '/about', order: 2 },
    { label: 'Projects', href: '/projects', order: 3 },
    { label: 'Skills', href: '/skills', order: 4 },
    { label: 'Experience', href: '/experience', order: 5 },
    { label: 'Education', href: '/education', order: 6 },
    { label: 'Certifications', href: '/certifications', order: 7 },
    { label: 'Achievements', href: '/achievements', order: 8 },
    { label: 'Contact', href: '/contact', order: 9 },
  ],
  seo: {
    title: 'John Doe - Full Stack Developer',
    description: 'Portfolio of John Doe, a Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    keywords: ['Full Stack Developer', 'React', 'Node.js', 'TypeScript', 'Web Development', 'Portfolio'],
    ogImage: undefined,
    twitterHandle: '@johndoe',
  },
}
