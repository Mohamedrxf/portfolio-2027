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
  resume?: string
}

export const portfolio: Portfolio = {
  id: 'portfolio-1',
  name: 'Your Name',
  tagline: 'Hello, I\'m',
  role: 'Aspiring Software and Network Engineer',
  title: 'Portfolio',
  description: 'Professional portfolio showcasing projects, skills, and experience',
  bio: 'Aspiring Software and Network Engineer with hands-on experience in building secure full-stack applications, AI-powered platforms, and distributed systems. Strong foundation in enterprise networking, TCP/IP, routing, switching, Linux, REST APIs, cloud technologies, virtualization, and cybersecurity. Passionate about solving enterprise networking, infrastructure, automation, and customer-facing technical challenges through scalable and secure solutions.',
  location: 'Remote / Worldwide',
  availability: 'Open to Opportunities',
  image: undefined,
  alt: 'Profile picture',
  resume: '/resume.pdf',
  stats: [
    { value: '3', label: 'Projects' },
    { value: '2', label: 'Internships' },
    { value: '5', label: 'Certifications' },
    { value: '3', label: 'Hackathon Awards' },
  ],
  highlights: [
    {
      title: 'Enterprise Networking',
      description: 'Strong foundation in TCP/IP, routing, switching, VLANs, ACLs, NAT, VPN, DNS, DHCP, and network troubleshooting.',
      badge: 'Networking',
    },
    {
      title: 'Full Stack Development',
      description: 'Experience building secure full-stack applications using React, FastAPI, Node.js, and REST APIs with proper authentication mechanisms.',
      badge: 'Development',
    },
    {
      title: 'AI & Security',
      description: 'Developed machine learning models for cybersecurity threat detection and vulnerability classification using TensorFlow and FAISS.',
      badge: 'AI Security',
    },
    {
      title: 'Cloud & DevOps',
      description: 'Proficient in AWS, Azure, Docker, Linux, Git, and containerization for building scalable distributed systems.',
      badge: 'Cloud',
    },
  ],
}
