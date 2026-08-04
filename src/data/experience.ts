import { BaseEntity, Describable, Datable, TechStack, Linkable } from './types'

export interface Experience extends BaseEntity, Describable, Datable, TechStack, Linkable {
  company: string
  position: string
  location?: string
  type?: string
  current?: boolean
}

export const experience: Experience[] = [
  {
    id: 'experience-1',
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc',
    position: 'Senior Full Stack Developer',
    description: 'Lead development of enterprise web applications, mentoring junior developers, and implementing best practices for code quality and performance.',
    startDate: '2022-01',
    endDate: undefined,
    date: '2022 - Present',
    location: 'San Francisco, CA',
    type: 'Full-time',
    current: true,
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    url: 'https://techsolutions.com',
  },
  {
    id: 'experience-2',
    title: 'Full Stack Developer',
    company: 'Digital Agency Co',
    position: 'Full Stack Developer',
    description: 'Developed and maintained client projects ranging from e-commerce platforms to content management systems. Collaborated with design teams to implement pixel-perfect interfaces.',
    startDate: '2019-06',
    endDate: '2021-12',
    date: '2019 - 2021',
    location: 'New York, NY',
    type: 'Full-time',
    current: false,
    technologies: ['Vue.js', 'Python', 'Django', 'MongoDB', 'Redis'],
    url: 'https://digitalagency.com',
  },
  {
    id: 'experience-3',
    title: 'Frontend Developer',
    company: 'Startup XYZ',
    position: 'Frontend Developer',
    description: 'Built responsive web applications from scratch, implemented state management solutions, and optimized application performance for better user experience.',
    startDate: '2018-01',
    endDate: '2019-05',
    date: '2018 - 2019',
    location: 'Austin, TX',
    type: 'Full-time',
    current: false,
    technologies: ['React', 'JavaScript', 'CSS', 'Firebase'],
    url: 'https://startupxyz.com',
  },
  {
    id: 'experience-4',
    title: 'Web Developer',
    company: 'Freelance',
    position: 'Web Developer',
    description: 'Provided web development services to various clients, including small businesses and startups. Delivered projects on time and within budget while maintaining high code quality.',
    startDate: '2017-01',
    endDate: '2017-12',
    date: '2017',
    location: 'Remote',
    type: 'Contract',
    current: false,
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    url: undefined,
  },
]
