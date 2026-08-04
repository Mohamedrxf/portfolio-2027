import { portfolio, site, type StatItem, type HighlightItem, type ContactInfo } from '@/data'
import {
  filterByField,
  searchByText,
  searchByFields,
  sortAlphabetically,
  paginate,
} from '@/lib/query'

export const usePortfolio = () => {
  const personalInfo = {
    name: portfolio.name,
    tagline: portfolio.tagline,
    role: portfolio.role,
    bio: portfolio.bio,
    location: portfolio.location,
    availability: portfolio.availability,
  }

  const stats: StatItem[] = portfolio.stats

  const highlights: HighlightItem[] = portfolio.highlights

  const contactInfo: ContactInfo[] = site.contact

  const searchStats = (query: string): StatItem[] => {
    return searchByText(stats, query)
  }

  const searchStatsByFields = (query: string, fields: (keyof StatItem)[]): StatItem[] => {
    return searchByFields(stats, query, fields)
  }

  const searchHighlights = (query: string): HighlightItem[] => {
    return searchByText(highlights, query)
  }

  const searchHighlightsByFields = (query: string, fields: (keyof HighlightItem)[]): HighlightItem[] => {
    return searchByFields(highlights, query, fields)
  }

  const searchContactInfo = (query: string): ContactInfo[] => {
    return searchByText(contactInfo, query)
  }

  const searchContactInfoByFields = (query: string, fields: (keyof ContactInfo)[]): ContactInfo[] => {
    return searchByFields(contactInfo, query, fields)
  }

  const filterStats = (predicate: (stat: StatItem) => boolean): StatItem[] => {
    return stats.filter(predicate)
  }

  const filterHighlights = (predicate: (highlight: HighlightItem) => boolean): HighlightItem[] => {
    return highlights.filter(predicate)
  }

  const filterContactInfo = (predicate: (contact: ContactInfo) => boolean): ContactInfo[] => {
    return contactInfo.filter(predicate)
  }

  const filterContactInfoByType = (type: string): ContactInfo[] => {
    return filterByField(contactInfo, 'type' as keyof ContactInfo, type)
  }

  const filterPrimaryContactInfo = (): ContactInfo[] => {
    return contactInfo.filter((contact) => contact.primary)
  }

  const sortStats = (field: keyof StatItem, direction: 'asc' | 'desc' = 'asc'): StatItem[] => {
    return sortAlphabetically(stats, field, direction)
  }

  const sortHighlights = (field: keyof HighlightItem, direction: 'asc' | 'desc' = 'asc'): HighlightItem[] => {
    return sortAlphabetically(highlights, field, direction)
  }

  const sortContactInfo = (field: keyof ContactInfo, direction: 'asc' | 'desc' = 'asc'): ContactInfo[] => {
    return sortAlphabetically(contactInfo, field, direction)
  }

  const paginateStats = (page: number, pageSize: number) => {
    return paginate(stats, page, pageSize)
  }

  const paginateHighlights = (page: number, pageSize: number) => {
    return paginate(highlights, page, pageSize)
  }

  const paginateContactInfo = (page: number, pageSize: number) => {
    return paginate(contactInfo, page, pageSize)
  }

  const getStatByLabel = (label: string): StatItem | undefined => {
    return stats.find((stat) => stat.label === label)
  }

  const getHighlightByTitle = (title: string): HighlightItem | undefined => {
    return highlights.find((highlight) => highlight.title === title)
  }

  const getContactByType = (type: string): ContactInfo | undefined => {
    return contactInfo.find((contact) => contact.type === type)
  }

  return {
    personalInfo,
    stats,
    highlights,
    contactInfo,
    searchStats,
    searchStatsByFields,
    searchHighlights,
    searchHighlightsByFields,
    searchContactInfo,
    searchContactInfoByFields,
    filterStats,
    filterHighlights,
    filterContactInfo,
    filterContactInfoByType,
    filterPrimaryContactInfo,
    sortStats,
    sortHighlights,
    sortContactInfo,
    paginateStats,
    paginateHighlights,
    paginateContactInfo,
    getStatByLabel,
    getHighlightByTitle,
    getContactByType,
  }
}
