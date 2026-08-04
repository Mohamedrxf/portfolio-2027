import { BaseEntity } from './types'

export interface Social extends BaseEntity {
  platform: string
  url: string
  username?: string
  icon?: string
  visible: boolean
  order: number
}

export const socials: Social[] = [
  {
    id: 'social-1',
    platform: 'GitHub',
    url: 'https://github.com/johndoe',
    username: 'johndoe',
    icon: 'github',
    visible: true,
    order: 1,
  },
  {
    id: 'social-2',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/johndoe',
    username: 'johndoe',
    icon: 'linkedin',
    visible: true,
    order: 2,
  },
  {
    id: 'social-3',
    platform: 'Twitter',
    url: 'https://twitter.com/johndoe',
    username: 'johndoe',
    icon: 'twitter',
    visible: true,
    order: 3,
  },
  {
    id: 'social-4',
    platform: 'Email',
    url: 'mailto:contact@example.com',
    username: undefined,
    icon: 'email',
    visible: true,
    order: 4,
  },
]
