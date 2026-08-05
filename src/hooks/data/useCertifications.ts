import { certifications, type Certification } from '@/data'
import {
  filterByField,
  filterByTechnology,
  first,
  unique,
  flatten,
  searchByText,
  searchByFields,
  sortAlphabetically,
  sortByDate,
  paginate,
} from '@/lib/query'

export const useCertifications = () => {
  const getAllCertifications = (): Certification[] => {
    return [...certifications]
  }

  const searchCertifications = (query: string): Certification[] => {
    return searchByText(certifications, query)
  }

  const searchCertificationsByFields = (query: string, fields: (keyof Certification)[]): Certification[] => {
    return searchByFields(certifications, query, fields)
  }

  const filterCertifications = (predicate: (cert: Certification) => boolean): Certification[] => {
    return certifications.filter(predicate)
  }

  const filterCertificationsByOrganization = (organization: string): Certification[] => {
    return filterByField(certifications, 'organization' as keyof Certification, organization)
  }

  const filterCertificationsByTechnology = (technology: string): Certification[] => {
    return filterByTechnology(certifications, technology)
  }

  const sortCertifications = (field: keyof Certification, direction: 'asc' | 'desc' = 'asc'): Certification[] => {
    return sortAlphabetically(certifications, field, direction)
  }

  const sortCertificationsByDate = (direction: 'asc' | 'desc' = 'desc'): Certification[] => {
    return sortByDate(certifications, 'issueDate' as keyof Certification, direction)
  }

  const paginateCertifications = (page: number, pageSize: number) => {
    return paginate(certifications, page, pageSize)
  }

  const getCertificationById = (id: string): Certification | undefined => {
    return certifications.find((cert) => cert.id === id)
  }

  const getCertificationsByOrganization = (organization: string): Certification[] => {
    return filterByField(certifications, 'organization' as keyof Certification, organization)
  }

  const getCertificationsByTechnology = (technology: string): Certification[] => {
    return filterByTechnology(certifications, technology)
  }

  const getRecentCertifications = (limit: number = 5): Certification[] => {
    return first(certifications, limit)
  }

  const getValidCertifications = (): Certification[] => {
    const now = new Date()
    return certifications.filter((cert) => {
      if (!cert.expirationDate) return true
      const expiration = new Date(cert.expirationDate)
      return expiration > now
    })
  }

  const getExpiredCertifications = (): Certification[] => {
    const now = new Date()
    return certifications.filter((cert) => {
      if (!cert.expirationDate) return false
      const expiration = new Date(cert.expirationDate)
      return expiration <= now
    })
  }

  const getAllOrganizations = (): string[] => {
    return unique(certifications.map((cert) => cert.organization))
  }

  const getAllTechnologies = (): string[] => {
    return unique(flatten(certifications.map((cert) => cert.technologies))).sort()
  }

  const getAllCredentials = (): string[] => {
    return certifications.map((cert) => cert.credential || '').filter(Boolean)
  }

  return {
    certifications: getAllCertifications(),
    recentCertifications: getRecentCertifications(),
    validCertifications: getValidCertifications(),
    expiredCertifications: getExpiredCertifications(),
    searchCertifications,
    searchCertificationsByFields,
    filterCertifications,
    filterCertificationsByOrganization,
    filterCertificationsByTechnology,
    sortCertifications,
    sortCertificationsByDate,
    paginateCertifications,
    getCertificationById,
    getCertificationsByOrganization,
    getCertificationsByTechnology,
    getAllOrganizations,
    getAllTechnologies,
    getAllCredentials,
  }
}
