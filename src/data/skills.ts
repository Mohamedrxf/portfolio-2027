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
    id: 'category-frontend',
    name: 'Frontend',
    skills: [
      { id: 'skill-1', name: 'React.js', level: 4, years: 1, category: 'Frontend' },
      { id: 'skill-2', name: 'Next.js', level: 3, years: 1, category: 'Frontend' },
      { id: 'skill-3', name: 'TypeScript', level: 4, years: 1, category: 'Frontend' },
      { id: 'skill-4', name: 'JavaScript', level: 4, years: 2, category: 'Frontend' },
      { id: 'skill-5', name: 'HTML', level: 4, years: 2, category: 'Frontend' },
      { id: 'skill-6', name: 'CSS', level: 4, years: 2, category: 'Frontend' },
      { id: 'skill-7', name: 'Tailwind CSS', level: 3, years: 1, category: 'Frontend' },
    ],
  },
  {
    id: 'category-backend',
    name: 'Backend',
    skills: [
      { id: 'skill-8', name: 'Node.js', level: 4, years: 1, category: 'Backend' },
      { id: 'skill-9', name: 'FastAPI', level: 4, years: 1, category: 'Backend' },
      { id: 'skill-10', name: 'REST APIs', level: 5, years: 2, badge: 'Expert', category: 'Backend' },
      { id: 'skill-11', name: 'WebSockets', level: 4, years: 1, category: 'Backend' },
    ],
  },
  {
    id: 'category-databases',
    name: 'Databases',
    skills: [
      { id: 'skill-12', name: 'PostgreSQL', level: 3, years: 1, category: 'Databases' },
      { id: 'skill-13', name: 'MySQL', level: 3, years: 1, category: 'Databases' },
      { id: 'skill-14', name: 'MongoDB', level: 3, years: 1, category: 'Databases' },
    ],
  },
  {
    id: 'category-ai-ml',
    name: 'AI & ML',
    skills: [
      { id: 'skill-15', name: 'LLaMA3', level: 4, years: 1, category: 'AI & ML' },
      { id: 'skill-16', name: 'FAISS', level: 4, years: 1, category: 'AI & ML' },
      { id: 'skill-17', name: 'RAG Pipelines', level: 4, years: 1, category: 'AI & ML' },
      { id: 'skill-18', name: 'Vector Search', level: 4, years: 1, category: 'AI & ML' },
      { id: 'skill-19', name: 'TensorFlow', level: 4, years: 1, category: 'AI & ML' },
    ],
  },
  {
    id: 'category-tools-platforms',
    name: 'Tools & Platforms',
    skills: [
      { id: 'skill-20', name: 'Git', level: 4, years: 2, category: 'Tools & Platforms' },
      { id: 'skill-21', name: 'Docker', level: 4, years: 1, category: 'Tools & Platforms' },
      { id: 'skill-22', name: 'Linux', level: 4, years: 2, category: 'Tools & Platforms' },
      { id: 'skill-23', name: 'Postman', level: 4, years: 1, category: 'Tools & Platforms' },
      { id: 'skill-24', name: 'AWS', level: 3, years: 1, category: 'Tools & Platforms' },
      { id: 'skill-25', name: 'Azure', level: 3, years: 1, category: 'Tools & Platforms' },
    ],
  },
  {
    id: 'category-ai-assisted-dev',
    name: 'AI-Assisted Development',
    skills: [
      { id: 'skill-26', name: 'Claude Code', level: 4, years: 1, category: 'AI-Assisted Development' },
      { id: 'skill-27', name: 'Cursor', level: 4, years: 1, category: 'AI-Assisted Development' },
      { id: 'skill-28', name: 'ChatGPT', level: 4, years: 1, category: 'AI-Assisted Development' },
      { id: 'skill-29', name: 'GitHub Copilot', level: 4, years: 1, category: 'AI-Assisted Development' },
      { id: 'skill-30', name: 'Prompt Engineering', level: 4, years: 1, category: 'AI-Assisted Development' },
      { id: 'skill-31', name: 'AI-Driven Debugging', level: 4, years: 1, category: 'AI-Assisted Development' },
      { id: 'skill-32', name: 'Code Generation', level: 4, years: 1, category: 'AI-Assisted Development' },
    ],
  },
  {
    id: 'category-languages',
    name: 'Languages',
    skills: [
      { id: 'skill-33', name: 'Java', level: 4, years: 2, category: 'Languages' },
      { id: 'skill-34', name: 'Python', level: 5, years: 2, badge: 'Expert', category: 'Languages' },
      { id: 'skill-35', name: 'C++', level: 3, years: 1, category: 'Languages' },
      { id: 'skill-36', name: 'SQL', level: 3, years: 1, category: 'Languages' },
    ],
  },
  {
    id: 'category-core-cs',
    name: 'Core CS',
    skills: [
      { id: 'skill-37', name: 'OOP', level: 4, years: 2, category: 'Core CS' },
      { id: 'skill-38', name: 'DBMS', level: 3, years: 1, category: 'Core CS' },
      { id: 'skill-39', name: 'Operating Systems', level: 3, years: 1, category: 'Core CS' },
      { id: 'skill-40', name: 'Computer Networks', level: 4, years: 2, category: 'Core CS' },
    ],
  },
  {
    id: 'category-programming-concepts',
    name: 'Programming Concepts',
    skills: [
      { id: 'skill-41', name: 'Multithreading', level: 3, years: 1, category: 'Programming Concepts' },
      { id: 'skill-42', name: 'Concurrency', level: 3, years: 1, category: 'Programming Concepts' },
      { id: 'skill-43', name: 'Java Collections Framework', level: 4, years: 2, category: 'Programming Concepts' },
      { id: 'skill-44', name: 'Exception Handling', level: 4, years: 2, category: 'Programming Concepts' },
    ],
  },
]

export const skills: Skill[] = skillCategories.flatMap((category) => category.skills)
