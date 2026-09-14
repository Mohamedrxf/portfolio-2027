import { BaseEntity } from './types';

export interface Social extends BaseEntity {
  platform: string;
  url: string;
  username?: string;
  icon?: string;
  visible: boolean;
  order: number;
}

export const socials: Social[] = [
  {
    id: 'social-1',
    platform: 'GitHub',
    url: 'https://github.com/Mohamedrxf',
    username: 'Mohamedrxf',
    icon: 'github',
    visible: true,
    order: 1,
  },
  {
    id: 'social-2',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mohamed-rafeeq-khan-278202326',
    username: 'mohamed-rafeeq-khan',
    icon: 'linkedin',
    visible: true,
    order: 2,
  },
];
