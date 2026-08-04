import { education, type Education } from '@/data'
import {
  filterByField,
  first,
  unique,
  searchByText,
  searchByFields,
  sortAlphabetically,
  sortByDate,
  paginate,
} from '@/lib/query'

export const useEducation = () => {
  const getAllEducation = (): Education[] => {
    return [...education]
  }

  const searchEducation = (query: string): Education[] => {
    return searchByText(education, query)
  }

  const searchEducationByFields = (query: string, fields: (keyof Education)[]): Education[] => {
    return searchByFields(education, query, fields)
  }

  const filterEducation = (predicate: (edu: Education) => boolean): Education[] => {
    return education.filter(predicate)
  }

  const filterEducationByInstitution = (institution: string): Education[] => {
    return filterByField(education, 'institution' as keyof Education, institution)
  }

  const filterEducationByDegree = (degree: string): Education[] => {
    return filterByField(education, 'degree' as keyof Education, degree)
  }

  const filterEducationByField = (field: string): Education[] => {
    return filterByField(education, 'field' as keyof Education, field)
  }

  const filterEducationByLocation = (location: string): Education[] => {
    return filterByField(education, 'location' as keyof Education, location)
  }

  const sortEducation = (field: keyof Education, direction: 'asc' | 'desc' = 'asc'): Education[] => {
    return sortAlphabetically(education, field, direction)
  }

  const sortEducationByDate = (direction: 'asc' | 'desc' = 'desc'): Education[] => {
    return sortByDate(education, 'startDate' as keyof Education, direction)
  }

  const paginateEducation = (page: number, pageSize: number) => {
    return paginate(education, page, pageSize)
  }

  const getEducationById = (id: string): Education | undefined => {
    return education.find((edu) => edu.id === id)
  }

  const getEducationByInstitution = (institution: string): Education[] => {
    return filterByField(education, 'institution' as keyof Education, institution)
  }

  const getEducationByDegree = (degree: string): Education[] => {
    return filterByField(education, 'degree' as keyof Education, degree)
  }

  const getEducationByField = (field: string): Education[] => {
    return filterByField(education, 'field' as keyof Education, field)
  }

  const getEducationByLocation = (location: string): Education[] => {
    return filterByField(education, 'location' as keyof Education, location)
  }

  const getRecentEducation = (limit: number = 2): Education[] => {
    return first(education, limit)
  }

  const getAllInstitutions = (): string[] => {
    return education.map((edu) => edu.institution)
  }

  const getAllDegrees = (): string[] => {
    return unique(education.map((edu) => edu.degree))
  }

  const getAllFields = (): string[] => {
    return unique(
      education.map((edu) => edu.field).filter((field): field is string => field !== undefined)
    )
  }

  const getAllLocations = (): string[] => {
    return unique(
      education.map((edu) => edu.location).filter((location): location is string => location !== undefined)
    )
  }

  return {
    education: getAllEducation(),
    recentEducation: getRecentEducation(),
    searchEducation,
    searchEducationByFields,
    filterEducation,
    filterEducationByInstitution,
    filterEducationByDegree,
    filterEducationByField,
    filterEducationByLocation,
    sortEducation,
    sortEducationByDate,
    paginateEducation,
    getEducationById,
    getEducationByInstitution,
    getEducationByDegree,
    getEducationByField,
    getEducationByLocation,
    getAllInstitutions,
    getAllDegrees,
    getAllFields,
    getAllLocations,
  }
}
