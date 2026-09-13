// Navigation configuration
// Centralized navigation items for the application

export interface NavItemConfig {
  label: string;
  path: string;
  icon?: React.ReactNode; // Future icon support
}

export const navigationConfig: NavItemConfig[] = [
  { label: 'About', path: '#about' },
  { label: 'Skills', path: '#skills' },
  { label: 'Experience', path: '#experience' },
  { label: 'Projects', path: '#projects' },
  { label: 'Education', path: '#education' },
  { label: 'Certifications', path: '#certifications' },
  { label: 'Achievements', path: '#achievements' },
  { label: 'Contact', path: '#contact' },
] as const;
