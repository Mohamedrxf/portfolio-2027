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
    company: 'AI/ML Security Intern',
    position: 'AI/ML Security Intern',
    description: 'Developed machine learning models for cybersecurity threat detection and vulnerability classification, improving real-time security monitoring capabilities. Developed real-time security prediction pipelines and optimized inference performance.',
    startDate: '2024-09',
    endDate: '2024-11',
    date: 'Sep 2024 - Nov 2024',
    location: '',
    type: 'Internship',
    current: false,
    technologies: ['Python', 'TensorFlow'],
    url: undefined,
    responsibilities: [
      'Developed machine learning models for cybersecurity threat detection',
      'Implemented real-time security prediction pipelines',
      'Optimized model inference performance for production deployment',
      'Collaborated with security team to integrate ML solutions'
    ],
    achievements: [
      'Improved threat detection accuracy by 25%',
      'Reduced inference latency by 40% through optimization',
      'Successfully deployed models to production environment'
    ],
  },
  {
    id: 'experience-2',
    title: 'Full Stack Developer Intern',
    company: 'Full Stack Developer Intern',
    position: 'Full Stack Developer Intern',
    description: 'Developed scalable full-stack applications using React and FastAPI while integrating multiple REST APIs and implementing secure authentication mechanisms. Configured Linux firewall rules and implemented authentication mechanisms to strengthen application security. Troubleshot distributed application connectivity and improved backend reliability.',
    startDate: '2024-04',
    endDate: '2024-06',
    date: 'Apr 2024 - Jun 2024',
    location: '',
    type: 'Internship',
    current: false,
    technologies: ['React', 'FastAPI', 'REST APIs', 'Linux'],
    url: undefined,
    responsibilities: [
      'Developed full-stack applications using React and FastAPI',
      'Integrated multiple REST APIs for data synchronization',
      'Implemented secure authentication mechanisms',
      'Configured Linux firewall rules for enhanced security'
    ],
    achievements: [
      'Successfully integrated 5+ external APIs',
      'Improved application security through authentication implementation',
      'Resolved distributed system connectivity issues',
      'Enhanced backend reliability by 30%'
    ],
  },
]
