import { BaseEntity, Describable, Datable, TechStack, Linkable } from './types'

export interface Experience extends BaseEntity, Describable, Datable, TechStack, Linkable {
  company: string
  position: string
  location?: string
  type?: string
  current?: boolean
  responsibilities?: string[]
  achievements?: string[]
}

export const experience: Experience[] = [
  {
    id: 'experience-1',
    title: 'AI/ML Security Intern',
    company: 'Novi Tech Pvt Ltd',
    position: 'AI/ML Security Intern',
    description: 'Built and deployed ML models for threat detection, improving accuracy by 18%. Developed real-time prediction and monitoring systems for continuous event processing. Optimized large-scale dataset processing and inference pipelines for execution efficiency.',
    startDate: '2024-09',
    endDate: '2024-11',
    date: 'Sep 2024 - Nov 2024',
    type: 'Internship',
    current: false,
    technologies: ['Python', 'TensorFlow', 'FastAPI'],
    responsibilities: [
      'Built and deployed ML models for threat detection',
      'Developed real-time prediction and monitoring systems',
      'Optimized large-scale dataset processing and inference pipelines',
    ],
    achievements: [
      'Improved threat detection accuracy by 18%',
    ],
  },
  {
    id: 'experience-2',
    title: 'Full Stack Developer Intern',
    company: 'Codebind Technology',
    position: 'Full Stack Developer Intern',
    description: 'Developed and deployed secure web applications, improving system reliability by 25%. Built and integrated 6+ RESTful APIs for authentication, backend communication, and real-time processing. Designed scalable FastAPI backend services with SQL integration for efficient request handling.',
    startDate: '2024-04',
    endDate: '2024-06',
    date: 'Apr 2024 - Jun 2024',
    type: 'Internship',
    current: false,
    technologies: ['React', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Node.js'],
    responsibilities: [
      'Developed and deployed secure web applications',
      'Built and integrated 6+ RESTful APIs',
      'Designed scalable FastAPI backend services with SQL integration',
      'Optimized backend bottlenecks',
    ],
    achievements: [
      'Improved system reliability by 25%',
    ],
  },
]
