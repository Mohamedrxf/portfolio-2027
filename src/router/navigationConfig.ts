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
    path: '#home',
  },
  {
    label: 'About',
    path: '#about',
  },
  {
    label: 'Skills',
    path: '#skills',
  },
  {
    label: 'Projects',
    path: '#projects',
  },
  {
    label: 'Experience',
    path: '#experience',
  },
  {
    label: 'Education',
    path: '#education',
  },
  {
    label: 'Certifications',
    path: '#certifications',
  },
  {
    label: 'Achievements',
    path: '#achievements',
  },
  {
    label: 'Contact',
    path: '#contact',
  },
] as const