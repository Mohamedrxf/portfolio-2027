// Route configuration
// Task 1.7.1 - Routing Architecture Cleanup

import { lazy } from 'react';
import { routes } from './routes';

// Lazy load page components for code splitting
const Home = lazy(() => import('@/pages/Home').then((module) => ({ default: module.Home })));
const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })));
const Skills = lazy(() => import('@/pages/Skills').then((module) => ({ default: module.Skills })));
const Projects = lazy(() =>
  import('@/pages/Projects').then((module) => ({ default: module.Projects }))
);
const Experience = lazy(() =>
  import('@/pages/Experience').then((module) => ({ default: module.Experience }))
);
const Certifications = lazy(() =>
  import('@/pages/Certifications').then((module) => ({ default: module.Certifications }))
);
const Education = lazy(() =>
  import('@/pages/Education').then((module) => ({ default: module.Education }))
);
const Achievements = lazy(() =>
  import('@/pages/Achievements').then((module) => ({ default: module.Achievements }))
);
const Contact = lazy(() =>
  import('@/pages/Contact').then((module) => ({ default: module.Contact }))
);
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound }))
);

export const routeConfig = [
  {
    path: routes.home,
    Component: Home,
  },
  {
    path: routes.about,
    Component: About,
  },
  {
    path: routes.skills,
    Component: Skills,
  },
  {
    path: routes.projects,
    Component: Projects,
  },
  {
    path: routes.experience,
    Component: Experience,
  },
  {
    path: routes.certifications,
    Component: Certifications,
  },
  {
    path: routes.education,
    Component: Education,
  },
  {
    path: routes.achievements,
    Component: Achievements,
  },
  {
    path: routes.contact,
    Component: Contact,
  },
  {
    path: '*',
    Component: NotFound,
  },
] as const;
