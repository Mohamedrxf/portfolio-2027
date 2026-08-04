// Common TypeScript interfaces for portfolio data
// These interfaces are reused across multiple data files

export interface BaseEntity {
  id: string
}

export interface TimestampedEntity extends BaseEntity {
  createdAt?: string
  updatedAt?: string
}

export interface Taggable {
  tags: string[]
}

export interface Categorizable {
  category: string
}

export interface Datable {
  date: string
  startDate?: string
  endDate?: string
}

export interface Linkable {
  url?: string
  link?: string
}

export interface Describable {
  title: string
  description: string
}

export interface Imageable {
  image?: string
  alt?: string
}

export interface TechStack {
  technologies: string[]
}

export interface Statusable {
  status: string
}

export interface ContactInfo {
  type: string
  value: string
  label: string
  primary?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  username?: string
  icon?: string
}

export interface StatItem {
  value: string
  label: string
}

export interface HighlightItem {
  title: string
  description: string
  badge: string
}
