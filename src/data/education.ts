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
    title: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    description: 'Comprehensive computer science curriculum with focus on software engineering, algorithms, and data structures. Active in coding competitions and hackathons.',
    startDate: '2014-09',
    endDate: '2018-05',
    date: '2014 - 2018',
    location: 'Berkeley, CA',
    gpa: '3.8/4.0',
    achievements: ['Dean\'s List', 'Hackathon Winner', 'CS Club President'],
    url: 'https://berkeley.edu',
  },
  {
    id: 'education-2',
    title: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    degree: 'Master of Science',
    field: 'Computer Science',
    description: 'Advanced studies in machine learning, distributed systems, and software architecture. Completed capstone project on scalable web applications.',
    startDate: '2018-09',
    endDate: '2020-06',
    date: '2018 - 2020',
    location: 'Stanford, CA',
    gpa: '3.9/4.0',
    achievements: ['Research Assistant', 'Published Paper', 'Teaching Assistant'],
    url: 'https://stanford.edu',
  },
]
