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
  url: 'https://yourportfolio.com',
  author: 'Your Name',
  contact: [
    {
      type: 'email',
      value: 'your.email@example.com',
      label: 'Email',
      primary: true,
    },
    {
      type: 'location',
      value: '',
      label: 'Location',
      primary: false,
    },
    {
      type: 'availability',
      value: 'Open to Opportunities',
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
    title: 'Your Name - Aspiring Software and Network Engineer',
    description: 'Portfolio of an Aspiring Software and Network Engineer with hands-on experience in building secure full-stack applications, AI-powered platforms, and distributed systems.',
    keywords: ['Software Engineer', 'Network Engineer', 'Full Stack Developer', 'Cybersecurity', 'React', 'Python', 'FastAPI', 'AWS', 'Networking', 'AI/ML'],
    ogImage: undefined,
    twitterHandle: undefined,
  },
}
