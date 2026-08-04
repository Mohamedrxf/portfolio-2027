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
      { id: 'skill-1', name: 'React', level: 5, years: 5, badge: 'Expert', category: 'Frontend' },
      { id: 'skill-2', name: 'TypeScript', level: 5, years: 4, badge: 'Expert', category: 'Frontend' },
      { id: 'skill-3', name: 'Vue.js', level: 4, years: 3, category: 'Frontend' },
      { id: 'skill-4', name: 'Tailwind CSS', level: 5, years: 4, badge: 'Expert', category: 'Frontend' },
      { id: 'skill-5', name: 'Next.js', level: 4, years: 3, category: 'Frontend' },
    ],
  },
  {
    id: 'category-backend',
    name: 'Backend',
    skills: [
      { id: 'skill-6', name: 'Node.js', level: 5, years: 5, badge: 'Expert', category: 'Backend' },
      { id: 'skill-7', name: 'Python', level: 4, years: 4, category: 'Backend' },
      { id: 'skill-8', name: 'PostgreSQL', level: 4, years: 4, category: 'Backend' },
      { id: 'skill-9', name: 'MongoDB', level: 4, years: 3, category: 'Backend' },
      { id: 'skill-10', name: 'GraphQL', level: 3, years: 2, category: 'Backend' },
    ],
  },
  {
    id: 'category-devops',
    name: 'DevOps',
    skills: [
      { id: 'skill-11', name: 'Docker', level: 4, years: 3, category: 'DevOps' },
      { id: 'skill-12', name: 'AWS', level: 4, years: 3, category: 'DevOps' },
      { id: 'skill-13', name: 'CI/CD', level: 4, years: 4, category: 'DevOps' },
      { id: 'skill-14', name: 'Kubernetes', level: 3, years: 2, category: 'DevOps' },
    ],
  },
  {
    id: 'category-tools',
    name: 'Tools',
    skills: [
      { id: 'skill-15', name: 'Git', level: 5, years: 5, badge: 'Expert', category: 'Tools' },
      { id: 'skill-16', name: 'VS Code', level: 5, years: 5, badge: 'Expert', category: 'Tools' },
      { id: 'skill-17', name: 'Figma', level: 3, years: 2, category: 'Tools' },
      { id: 'skill-18', name: 'Jest', level: 4, years: 3, category: 'Tools' },
    ],
  },
  {
    id: 'category-mobile',
    name: 'Mobile',
    skills: [
      { id: 'skill-19', name: 'React Native', level: 4, years: 3, category: 'Mobile' },
      { id: 'skill-20', name: 'iOS', level: 3, years: 2, category: 'Mobile' },
      { id: 'skill-21', name: 'Android', level: 3, years: 2, category: 'Mobile' },
    ],
  },
]

export const skills: Skill[] = skillCategories.flatMap((category) => category.skills)
