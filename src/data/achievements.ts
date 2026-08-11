import { BaseEntity, Describable, Datable, Categorizable, Statusable, Linkable } from './types'

export interface Achievement extends BaseEntity, Describable, Datable, Categorizable, Statusable, Linkable {
  issuer?: string
  credential?: string
}

export const achievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Hacknova Special Jury Award',
    description: 'Special Jury Award in Cybersecurity for developing an AI-powered cybersecurity platform.',
    date: '2026',
    category: 'Competition',
    status: 'Awarded',
    issuer: 'Hacknova',
  },
  {
    id: 'achievement-2',
    title: 'Smart India Hackathon Finalist',
    description: 'Nominated Finalist at Smart India Hackathon 2025.',
    date: '2025',
    category: 'Competition',
    status: 'Finalist',
    issuer: 'Smart India Hackathon',
  },
  {
    id: 'achievement-3',
    title: 'Geonova First Prize',
    description: 'First Prize winner at Geonova Hackathon.',
    date: '2026',
    category: 'Competition',
    status: 'Awarded',
    issuer: 'Geonova',
  },
]
