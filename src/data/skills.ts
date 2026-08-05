import { BaseEntity, Categorizable } from './types'

export interface Skill extends BaseEntity, Categorizable {
  name: string
  level: number
  years?: number
  badge?: string
}

export interface SkillCategory extends BaseEntity {
  name: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'category-programming',
    name: 'Programming',
    skills: [
      { id: 'skill-1', name: 'Java', level: 4, years: 2, category: 'Programming' },
      { id: 'skill-2', name: 'Python', level: 5, years: 2, badge: 'Expert', category: 'Programming' },
      { id: 'skill-3', name: 'C++', level: 3, years: 1, category: 'Programming' },
      { id: 'skill-4', name: 'JavaScript', level: 4, years: 2, category: 'Programming' },
      { id: 'skill-5', name: 'TypeScript', level: 4, years: 1, category: 'Programming' },
      { id: 'skill-6', name: 'SQL', level: 3, years: 1, category: 'Programming' },
    ],
  },
  {
    id: 'category-networking',
    name: 'Networking',
    skills: [
      { id: 'skill-7', name: 'TCP/IP', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-8', name: 'TCP/UDP', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-9', name: 'OSI Model', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-10', name: 'Routing', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-11', name: 'Switching', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-12', name: 'VLANs', level: 3, years: 1, category: 'Networking' },
      { id: 'skill-13', name: 'ACLs', level: 3, years: 1, category: 'Networking' },
      { id: 'skill-14', name: 'NAT', level: 3, years: 1, category: 'Networking' },
      { id: 'skill-15', name: 'VPN', level: 3, years: 1, category: 'Networking' },
      { id: 'skill-16', name: 'DNS', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-17', name: 'DHCP', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-18', name: 'Wireshark', level: 4, years: 2, category: 'Networking' },
      { id: 'skill-19', name: 'Network Troubleshooting', level: 4, years: 2, category: 'Networking' },
    ],
  },
  {
    id: 'category-backend',
    name: 'Backend',
    skills: [
      { id: 'skill-20', name: 'FastAPI', level: 4, years: 1, category: 'Backend' },
      { id: 'skill-21', name: 'Node.js', level: 4, years: 1, category: 'Backend' },
      { id: 'skill-22', name: 'Spring Boot', level: 3, years: 1, category: 'Backend' },
      { id: 'skill-23', name: 'REST APIs', level: 5, years: 2, badge: 'Expert', category: 'Backend' },
      { id: 'skill-24', name: 'WebSockets', level: 4, years: 1, category: 'Backend' },
      { id: 'skill-25', name: 'Distributed Systems', level: 3, years: 1, category: 'Backend' },
    ],
  },
  {
    id: 'category-frontend',
    name: 'Frontend',
    skills: [
      { id: 'skill-26', name: 'React.js', level: 4, years: 1, category: 'Frontend' },
      { id: 'skill-27', name: 'Next.js', level: 3, years: 1, category: 'Frontend' },
      { id: 'skill-28', name: 'HTML5', level: 4, years: 2, category: 'Frontend' },
      { id: 'skill-29', name: 'CSS3', level: 4, years: 2, category: 'Frontend' },
    ],
  },
  {
    id: 'category-cloud-devops',
    name: 'Cloud & DevOps',
    skills: [
      { id: 'skill-30', name: 'AWS', level: 3, years: 1, category: 'Cloud & DevOps' },
      { id: 'skill-31', name: 'Microsoft Azure', level: 3, years: 1, category: 'Cloud & DevOps' },
      { id: 'skill-32', name: 'Docker', level: 4, years: 1, category: 'Cloud & DevOps' },
      { id: 'skill-33', name: 'Linux', level: 4, years: 2, category: 'Cloud & DevOps' },
      { id: 'skill-34', name: 'Git', level: 4, years: 2, category: 'Cloud & DevOps' },
      { id: 'skill-35', name: 'Postman', level: 4, years: 1, category: 'Cloud & DevOps' },
    ],
  },
  {
    id: 'category-ai-security',
    name: 'AI & Security',
    skills: [
      { id: 'skill-36', name: 'FAISS', level: 4, years: 1, category: 'AI & Security' },
      { id: 'skill-37', name: 'RAG', level: 4, years: 1, category: 'AI & Security' },
      { id: 'skill-38', name: 'TensorFlow', level: 4, years: 1, category: 'AI & Security' },
      { id: 'skill-39', name: 'YOLOv8', level: 3, years: 1, category: 'AI & Security' },
      { id: 'skill-40', name: 'RBAC', level: 3, years: 1, category: 'AI & Security' },
      { id: 'skill-41', name: 'Threat Detection', level: 4, years: 1, category: 'AI & Security' },
      { id: 'skill-42', name: 'Vulnerability Assessment', level: 4, years: 1, category: 'AI & Security' },
    ],
  },
  {
    id: 'category-development-tools',
    name: 'Development Tools',
    skills: [
      { id: 'skill-43', name: 'Git', level: 4, years: 2, category: 'Development Tools' },
      { id: 'skill-44', name: 'GitHub', level: 4, years: 2, category: 'Development Tools' },
      { id: 'skill-45', name: 'Docker', level: 4, years: 1, category: 'Development Tools' },
      { id: 'skill-46', name: 'Postman', level: 4, years: 1, category: 'Development Tools' },
      { id: 'skill-47', name: 'Linux', level: 4, years: 2, category: 'Development Tools' },
      { id: 'skill-48', name: 'Wireshark', level: 4, years: 2, category: 'Development Tools' },
      { id: 'skill-49', name: 'VS Code', level: 5, years: 2, badge: 'Expert', category: 'Development Tools' },
    ],
  },
]

export const skills: Skill[] = skillCategories.flatMap((category) => category.skills)
