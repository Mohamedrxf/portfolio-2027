import { BaseEntity, Describable, Datable, TechStack, Linkable } from './types';

export interface Certification extends BaseEntity, Describable, Datable, TechStack, Linkable {
  organization: string;
  credential?: string;
  credentialUrl?: string;
  expirationDate?: string;
  category?: string;
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'CCNA',
    organization: 'Cisco',
    description:
      'Cisco Certified Network Associate certification covering networking fundamentals, routing and switching, and network security.',
    startDate: '2026',
    date: '2026',
    technologies: ['Networking', 'Routing', 'Switching', 'Security'],
    url: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html',
    category: 'Security',
  },
  {
    id: 'cert-2',
    title: 'Introduction to Cybersecurity',
    organization: 'Cisco',
    description:
      'Foundational cybersecurity certification covering security concepts, network security, and threat intelligence.',
    startDate: '2026',
    date: '2026',
    technologies: ['Cybersecurity', 'Network Security', 'Threat Intelligence'],
    url: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/cybersecurity/index.html',
    category: 'Security',
  },
  {
    id: 'cert-3',
    title: 'Python Essentials 1 & 2',
    organization: 'Cisco',
    description:
      'Python programming certification covering fundamentals, data structures, and object-oriented programming.',
    startDate: '2026',
    date: '2026',
    technologies: ['Python', 'Programming', 'Data Structures'],
    url: 'https://www.netacad.com/courses/python-essentials-1?courseLang=en-US',
    category: 'Development',
  },
  {
    id: 'cert-4',
    title: 'AWS Cloud Practitioner',
    organization: 'Amazon Web Services',
    description:
      'Foundational AWS certification covering cloud concepts, security, and core AWS services.',
    startDate: '2026',
    date: '2026',
    technologies: ['AWS', 'Cloud Computing', 'Security'],
    url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    category: 'Cloud',
  },
  {
    id: 'cert-5',
    title: 'Azure Fundamentals',
    organization: 'Microsoft',
    description:
      'Foundational Microsoft Azure certification covering cloud concepts, Azure services, and Azure management tools.',
    startDate: '2026',
    date: '2026',
    technologies: ['Azure', 'Cloud Computing', 'Microsoft'],
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    category: 'Cloud',
  },
];
