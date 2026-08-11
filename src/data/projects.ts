import { BaseEntity, Describable, Categorizable, TechStack, Statusable, Imageable, Linkable } from './types'

export interface Project extends BaseEntity, Describable, Categorizable, TechStack, Statusable, Imageable, Linkable {
  featured?: boolean
  duration?: string
  client?: string
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'OS3 – AI-Powered Cybersecurity Platform',
    description: 'AI-powered cybersecurity platform using LLaMA3, RAG pipelines, and vector search for intelligent vulnerability analysis. Built RAG-based retrieval pipelines using FAISS for context-aware information retrieval. Designed scalable FastAPI microservices and REST APIs for AI-driven workflows. Implemented JWT authentication. Optimized retrieval pipelines to achieve sub-300ms response times.',
    category: 'Cybersecurity',
    status: 'Completed',
    featured: true,
    technologies: ['React', 'FastAPI', 'FAISS', 'LLaMA3'],
    url: 'https://github.com/KR0079384/OS3',
  },
  {
    id: 'project-2',
    title: 'Universal Code Executor',
    description: 'Docker-based multi-language code execution platform with PostgreSQL-backed execution infrastructure. Secure sandboxing for isolated code execution with concurrent execution handling. Real-time communication using WebSockets. Resource management and execution monitoring with sub-2-second execution latency and fault isolation.',
    category: 'DevOps',
    status: 'Completed',
    technologies: ['React.js', 'Node.js', 'Docker', 'WebSockets', 'Python'],
    url: 'https://github.com/KR0079384/UniversalCodeExecutor',
  },
  {
    id: 'project-3',
    title: 'CityFlow – Real-Time Traffic Monitoring System',
    description: 'Real-time distributed monitoring platform handling concurrent event streams with low latency. Scalable FastAPI and WebSocket backend services. Event-driven workflows for improved responsiveness and throughput. Optimized data processing pipelines for reliable monitoring and alert generation.',
    category: 'Networking',
    status: 'Completed',
    technologies: ['React', 'FastAPI', 'WebSockets', 'Python'],
    url: 'https://github.com/KR0079384/CityFlow',
  },
  {
    id: 'project-4',
    title: 'Portfolio Website',
    description: 'Responsive portfolio website with optimized routing and SEO practices. Features project showcases, technical blogs, GitHub repositories, achievement sections, reusable components, and responsive cross-device layouts.',
    category: 'Web Development',
    status: 'Completed',
    featured: false,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
]
