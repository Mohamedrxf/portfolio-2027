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
  name: 'Mohamed Rafeeq Khan A',
  tagline: 'Hello, I\'m',
  role: 'Software Engineering Student',
  title: 'Portfolio',
  description: 'Professional portfolio showcasing projects, skills, and experience',
  bio: 'Computer Science Engineering student with internship experience in software development and AI-based applications. Strong analytical and problem-solving skills with experience building secure full-stack applications, AI-powered systems, backend services, REST APIs, real-time systems, and distributed applications. Solved 2200+ coding problems across LeetCode, CodeChef, HackerRank and other platforms.',
  location: 'Chennai, India',
  availability: 'Open to Opportunities',
  image: undefined,
  alt: 'Profile picture',
  resume: '/resume.pdf',
  stats: [
    { value: '2200+', label: 'Coding Problems' },
    { value: '750+', label: 'LeetCode' },
    { value: '1750+', label: 'LeetCode Rating' },
    { value: '4', label: 'Projects' },
  ],
  highlights: [
    {
      title: 'Full Stack Development',
      description: 'Experience building secure full-stack applications using React, FastAPI, Node.js, and REST APIs with proper authentication mechanisms.',
      badge: 'Development',
    },
    {
      title: 'AI & Security',
      description: 'Developed machine learning models for cybersecurity threat detection and vulnerability classification using LLaMA3, FAISS, and RAG pipelines.',
      badge: 'AI Security',
    },
    {
      title: 'Backend Systems',
      description: 'Built scalable FastAPI microservices, REST APIs, real-time WebSocket systems, and distributed applications.',
      badge: 'Backend',
    },
    {
      title: 'Problem Solving',
      description: 'Solved 2200+ coding problems across LeetCode, CodeChef, HackerRank with 1750+ LeetCode contest rating.',
      badge: 'Algorithms',
    },
  ],
}
