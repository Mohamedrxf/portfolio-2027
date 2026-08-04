// Route constants and types
// Task 1.7.1 - Routing Architecture Cleanup

export const routes = {
  home: '/',
  about: '/about',
  skills: '/skills',
  projects: '/projects',
  experience: '/experience',
  education: '/education',
  certifications: '/certifications',
  achievements: '/achievements',
  contact: '/contact',
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];
