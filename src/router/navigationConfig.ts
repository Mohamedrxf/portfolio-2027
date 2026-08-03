// Navigation configuration
// Centralized navigation items for the application

import { routes } from './routes'

export interface NavItemConfig {
  label: string
  path: string
  icon?: React.ReactNode // Future icon support
}

export const navigationConfig: NavItemConfig[] = [
  {
    label: 'Home',
    path: routes.home,
  },
  {
    label: 'About',
    path: routes.about,
  },
  {
    label: 'Skills',
    path: routes.skills,
  },
  {
    label: 'Projects',
    path: routes.projects,
  },
  {
    label: 'Experience',
    path: routes.experience,
  },
  {
    label: 'Certifications',
    path: routes.certifications,
  },
  {
    label: 'Contact',
    path: routes.contact,
  },
] as const