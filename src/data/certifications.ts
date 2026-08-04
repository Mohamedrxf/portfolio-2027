import { BaseEntity, Describable, Datable, TechStack, Linkable } from './types'

export interface Certification extends BaseEntity, Describable, Datable, TechStack, Linkable {
  organization: string
  credential: string
  credentialUrl?: string
  expirationDate?: string
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'AWS Solutions Architect Professional',
    organization: 'Amazon Web Services',
    description: 'Advanced certification for designing distributed systems on AWS. Validated expertise in deployment, security, and scalability.',
    credential: 'AWS-SAP-12345',
    startDate: '2023-06',
    date: 'June 2023',
    expirationDate: '2026-06',
    technologies: ['AWS', 'Cloud Computing', 'DevOps'],
    url: 'https://aws.amazon.com/certification/',
    credentialUrl: 'https://aws.amazon.com/verify/12345',
  },
  {
    id: 'cert-2',
    title: 'Google Cloud Professional Developer',
    organization: 'Google Cloud',
    description: 'Certification for developing applications on Google Cloud Platform. Covers cloud architecture, security, and data management.',
    credential: 'GCP-PD-67890',
    startDate: '2023-03',
    date: 'March 2023',
    expirationDate: '2025-03',
    technologies: ['Google Cloud', 'Kubernetes', 'Dataflow'],
    url: 'https://cloud.google.com/certification',
    credentialUrl: 'https://cloud.google.com/verify/67890',
  },
  {
    id: 'cert-3',
    title: 'Meta Front-End Developer Professional',
    organization: 'Meta',
    description: 'Professional certificate covering React, JavaScript, and modern front-end development practices.',
    credential: 'META-FE-11111',
    startDate: '2022-11',
    date: 'November 2022',
    technologies: ['React', 'JavaScript', 'CSS', 'UI/UX'],
    url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    credentialUrl: 'https://coursera.org/verify/11111',
  },
  {
    id: 'cert-4',
    title: 'Certified Kubernetes Administrator',
    organization: 'Cloud Native Computing Foundation',
    description: 'Certification for Kubernetes administration, covering cluster architecture, installation, and troubleshooting.',
    credential: 'CKA-22222',
    startDate: '2022-08',
    date: 'August 2022',
    expirationDate: '2025-08',
    technologies: ['Kubernetes', 'Docker', 'Containers', 'DevOps'],
    url: 'https://www.cncf.io/certification/cka/',
    credentialUrl: 'https://www.cncf.io/certification/verify/22222',
  },
  {
    id: 'cert-5',
    title: 'MongoDB Certified Developer',
    organization: 'MongoDB',
    description: 'Certification demonstrating expertise in MongoDB development, including data modeling, aggregation, and performance optimization.',
    credential: 'MONGO-DEV-33333',
    startDate: '2022-05',
    date: 'May 2022',
    technologies: ['MongoDB', 'NoSQL', 'Database', 'Node.js'],
    url: 'https://www.mongodb.com/docs/manual/administration/developer-certificate/',
    credentialUrl: 'https://mongodb.com/verify/33333',
  },
]
