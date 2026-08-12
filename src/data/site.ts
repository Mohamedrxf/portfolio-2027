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
  url: '',
  author: 'Mohamed Rafeeq Khan A',
  contact: [
    {
      type: 'email',
      value: 'mohamedrafeeqkhanrafeeq@gmail.com',
      label: 'Email',
      primary: true,
    },
    {
      type: 'phone',
      value: '7358179896',
      label: 'Phone',
      primary: false,
    },
    {
      type: 'location',
      value: 'Chennai, India',
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
    title: 'Mohamed Rafeeq Khan A - Software Engineering Student',
    description: 'Portfolio of Mohamed Rafeeq Khan A, a Computer Science Engineering student and software developer specializing in full-stack development, AI/ML, cybersecurity, and problem solving.',
    keywords: ['Software Engineer', 'Full Stack Developer', 'React', 'Python', 'FastAPI', 'AI/ML', 'Cybersecurity', 'Node.js', 'TypeScript'],
    ogImage: undefined,
    twitterHandle: undefined,
  },
}
