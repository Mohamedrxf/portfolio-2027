import { BaseEntity, Describable, Datable, Categorizable, Statusable, Linkable } from './types'

export interface Achievement extends BaseEntity, Describable, Datable, Categorizable, Statusable, Linkable {
  issuer?: string
  credential?: string
}

export const achievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Hacknova Special Jury Award',
    description: 'Recognized for developing an AI-powered cybersecurity platform.',
    date: '2026',
    category: 'Competition',
    status: 'Awarded',
    issuer: 'Hacknova',
    credential: undefined,
    url: undefined,
  },
  {
    id: 'achievement-2',
    title: 'Smart India Hackathon Nominee',
    description: 'National Level Nominee for innovative solution development.',
    date: '2026',
    category: 'Competition',
    status: 'Nominee',
    issuer: 'Smart India Hackathon',
    credential: undefined,
    url: undefined,
  },
  {
    id: 'achievement-3',
    title: 'Geonova First Prize',
    description: 'First Prize winner at Geonova Hackathon.',
    date: '2026',
    category: 'Competition',
    status: 'Awarded',
    issuer: 'Geonova',
    credential: undefined,
    url: undefined,
  },
  {
    id: 'achievement-4',
    title: 'CodeChef 3★',
    description: 'Solved 650+ algorithmic and data structure problems demonstrating strong algorithmic and problem-solving ability.',
    date: '2026',
    category: 'Problem Solving',
    status: 'Active',
    issuer: 'CodeChef',
    credential: undefined,
    url: undefined,
  },
]
