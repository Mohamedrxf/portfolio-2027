import { BaseEntity, Describable, Categorizable, TechStack, Statusable, Imageable, Linkable } from './types'

export interface Project extends BaseEntity, Describable, Categorizable, TechStack, Statusable, Imageable, Linkable {
  featured?: boolean
  duration?: string
  client?: string
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'OS³ – Open Source Security Score Platform',
    description: 'Developed an AI-powered software supply-chain security platform detecting vulnerabilities across 1,000+ software packages. Built an AI Security Copilot using FAISS and LLMs for attack-path analysis, risk scoring, and remediation recommendations. Implemented RBAC and secure authentication.',
    category: 'Cybersecurity',
    status: 'Completed',
    featured: true,
    technologies: ['React', 'FastAPI', 'FAISS', 'LLaMA3', 'Supabase'],
    duration: '',
    client: undefined,
    image: undefined,
    alt: 'OS³ Security Platform',
    url: undefined,
    github: undefined,
  },
  {
    id: 'project-2',
    title: 'CityFlow – Real-Time Network Infrastructure System',
    description: 'Designed a low-latency monitoring platform using FastAPI and WebSockets. Applied TCP/IP communication principles for real-time infrastructure monitoring. Optimized asynchronous communication for scalable performance.',
    category: 'Networking',
    status: 'Completed',
    technologies: ['React', 'FastAPI', 'YOLOv8', 'OpenCV', 'WebSockets', 'Python'],
    duration: '',
    image: undefined,
    alt: 'CityFlow Network System',
    url: undefined,
    github: undefined,
  },
  {
    id: 'project-3',
    title: 'Universal Code Executor',
    description: 'Designed a Docker-based secure sandbox for isolated code execution. Implemented permission-based execution, resource isolation, and container lifecycle management.',
    category: 'DevOps',
    status: 'Completed',
    technologies: ['React.js', 'Node.js', 'Docker', 'Python', 'WebSockets'],
    duration: '',
    image: undefined,
    alt: 'Universal Code Executor',
    url: undefined,
    github: undefined,
  },
]
