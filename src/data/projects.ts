import {
  BaseEntity,
  Describable,
  Categorizable,
  TechStack,
  Statusable,
  Imageable,
  Linkable,
} from './types';

export interface Project
  extends BaseEntity, Describable, Categorizable, TechStack, Statusable, Imageable, Linkable {
  featured?: boolean;
  duration?: string;
  client?: string;
  award?: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'OS3 – Open Source Supply Chain Security Scanner',
    description:
      'Developer-first security tool for analyzing open-source packages before installation. Features dependency analysis, vulnerability detection, attack path identification, security scoring, and fake package detection. Includes CLI tool, web interface with dependency graph visualization, and AI-powered security assistant using LLaMA3.',
    category: 'Cybersecurity',
    status: 'Completed',
    featured: true,
    technologies: ['React', 'FastAPI', 'FAISS', 'LLaMA3', 'Firebase'],
    url: 'https://github.com/KR0079384/OS3',
    award: "Hacknova '26 Special Jury Award (Cybersecurity)",
  },
  {
    id: 'project-2',
    title: 'Universal Code Executor',
    description:
      'Secure, language-agnostic code execution platform with sandboxed Docker runtime environments. Features isolated execution, resource limiting, multi-language support, and prevention of security loopholes like infinite loops and fork bombs. Ideal for coding platforms, hackathons, and secure code testing environments.',
    category: 'DevOps',
    status: 'Completed',
    technologies: ['React', 'FastAPI', 'Docker', 'Python'],
    url: 'https://github.com/KR0079384/UniversalCodeExecutor',
  },
  {
    id: 'project-3',
    title: 'CityFlow – Intelligent Traffic Control System',
    description:
      'AI-powered traffic monitoring and emergency vehicle priority system using computer vision and real-time anomaly detection. Features YOLOv8-based ambulance detection, OpenCV traffic analysis, NetworkX path prediction, WebSocket telemetry monitoring, and LLaMA3-powered incident reporting for emergency response optimization.',
    category: 'Networking',
    status: 'Completed',
    technologies: ['React', 'FastAPI', 'YOLOv8', 'OpenCV', 'NetworkX', 'LLaMA3'],
    url: 'https://github.com/KR0079384/CityFlow',
  },
  {
    id: 'project-4',
    title: 'Portfolio Website',
    description:
      'Responsive portfolio website with optimized routing and SEO practices. Features project showcases, technical blogs, GitHub repositories, achievement sections, reusable components, and responsive cross-device layouts.',
    category: 'Web Development',
    status: 'Completed',
    featured: false,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
];
