import { BaseEntity, Describable, Datable, Categorizable, Statusable, Linkable } from './types'

export interface Achievement extends BaseEntity, Describable, Datable, Categorizable, Statusable, Linkable {
  issuer?: string
  credential?: string
}

export const achievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Hackathon Winner',
    description: 'First place in Global Tech Hackathon 2023 for building an innovative AI-powered solution.',
    date: '2023-11',
    category: 'Competition',
    status: 'Awarded',
    issuer: 'Global Tech',
    credential: 'HACK-2023-001',
    url: 'https://hackathon.global/winners/2023',
  },
  {
    id: 'achievement-2',
    title: 'Open Source Contributor',
    description: 'Recognized for significant contributions to major open source projects with 500+ commits merged.',
    date: '2023-08',
    category: 'Open Source',
    status: 'Active',
    issuer: 'GitHub',
    credential: undefined,
    url: 'https://github.com/contributors',
  },
  {
    id: 'achievement-3',
    title: 'Tech Speaker',
    description: 'Delivered talks at major tech conferences including React Conf and JSConf on modern web development.',
    date: '2023-05',
    category: 'Speaking',
    status: 'Completed',
    issuer: 'React Conf',
    credential: 'SPEAKER-2023-001',
    url: 'https://reactconf.com/speakers/2023',
  },
  {
    id: 'achievement-4',
    title: 'Best Startup Award',
    description: 'Received Best Startup Award for innovative product design and user experience.',
    date: '2022-12',
    category: 'Business',
    status: 'Awarded',
    issuer: 'Startup Awards',
    credential: 'STARTUP-2022-001',
    url: 'https://startupawards.com/winners/2022',
  },
  {
    id: 'achievement-5',
    title: 'Research Publication',
    description: 'Published research paper on machine learning applications in web development in IEEE journal.',
    date: '2022-09',
    category: 'Research',
    status: 'Published',
    issuer: 'IEEE',
    credential: 'IEEE-2022-12345',
    url: 'https://ieeexplore.ieee.org/document/12345',
  },
  {
    id: 'achievement-6',
    title: 'Community Leader',
    description: 'Recognized as community leader for organizing tech meetups and mentoring junior developers.',
    date: '2022-06',
    category: 'Community',
    status: 'Active',
    issuer: 'Tech Community',
    credential: undefined,
    url: 'https://techcommunity.org/leaders',
  },
]
