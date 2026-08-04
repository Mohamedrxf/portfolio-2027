import { BaseEntity, Describable, Imageable, StatItem, HighlightItem } from './types'

export interface Portfolio extends BaseEntity, Describable, Imageable {
  name: string
  tagline: string
  role: string
  bio: string
  location: string
  availability: string
  stats: StatItem[]
  highlights: HighlightItem[]
}

export const portfolio: Portfolio = {
  id: 'portfolio-1',
  name: 'John Doe',
  tagline: 'Hello, I\'m',
  role: 'Full Stack Developer',
  title: 'Portfolio',
  description: 'Professional portfolio showcasing projects, skills, and experience',
  bio: 'I build exceptional digital experiences that combine beautiful design with powerful functionality. Passionate about creating user-centric solutions that make a real impact.',
  location: 'San Francisco, CA',
  availability: 'Open to Projects',
  image: undefined,
  alt: 'Profile picture',
  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
    { value: '10+', label: 'Awards Won' },
  ],
  highlights: [
    {
      title: 'Expertise',
      description: 'Placeholder highlight about technical expertise and specialization areas.',
      badge: 'Expertise',
    },
    {
      title: 'Experience',
      description: 'Placeholder highlight about professional experience and industry knowledge.',
      badge: 'Experience',
    },
    {
      title: 'Approach',
      description: 'Placeholder highlight about methodology and work approach.',
      badge: 'Approach',
    },
    {
      title: 'Values',
      description: 'Placeholder highlight about core values and professional principles.',
      badge: 'Values',
    },
  ],
}
