import { BaseEntity, Describable, Datable, Linkable } from './types'

export interface Education extends BaseEntity, Describable, Datable, Linkable {
  institution: string
  degree: string
  field?: string
  location?: string
  gpa?: string
  achievements?: string[]
}

export const education: Education[] = [
  {
    id: 'education-1',
    title: 'Bachelor of Engineering - Computer Science and Engineering',
    institution: 'Bachelor of Engineering',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science and Engineering',
    description: 'Pursuing Bachelor of Engineering in Computer Science and Engineering with focus on software development, networking, and cybersecurity.',
    startDate: '2023',
    endDate: '2027',
    date: '2023 - 2027',
    location: '',
    gpa: undefined,
    achievements: undefined,
    url: undefined,
  },
]
