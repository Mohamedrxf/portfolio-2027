import { experience, type Experience } from '@/data'
import {
  filterByBoolean,
  filterByField,
  filterByTechnology,
  unique,
  flatten,
  searchByText,
  searchByFields,
  sortAlphabetically,
  sortByDate,
  paginate,
} from '@/lib/query'

export const useExperience = () => {
  const getAllExperience = (): Experience[] => {
    return [...experience]
  }

  const searchExperience = (query: string): Experience[] => {
    return searchByText(experience, query)
  }

  const searchExperienceByFields = (query: string, fields: (keyof Experience)[]): Experience[] => {
    return searchByFields(experience, query, fields)
  }

  const filterExperience = (predicate: (exp: Experience) => boolean): Experience[] => {
    return experience.filter(predicate)
  }

  const filterExperienceByCompany = (company: string): Experience[] => {
    return filterByField(experience, 'company' as keyof Experience, company)
  }

  const filterExperienceByType = (type: string): Experience[] => {
    return filterByField(experience, 'type' as keyof Experience, type)
  }

  const filterExperienceByLocation = (location: string): Experience[] => {
    return filterByField(experience, 'location' as keyof Experience, location)
  }

  const filterExperienceByTechnology = (technology: string): Experience[] => {
    return filterByTechnology(experience, technology)
  }

  const sortExperience = (field: keyof Experience, direction: 'asc' | 'desc' = 'asc'): Experience[] => {
    return sortAlphabetically(experience, field, direction)
  }

  const sortExperienceByDate = (direction: 'asc' | 'desc' = 'desc'): Experience[] => {
    return sortByDate(experience, 'startDate' as keyof Experience, direction)
  }

  const paginateExperience = (page: number, pageSize: number) => {
    return paginate(experience, page, pageSize)
  }

  const getCurrentExperience = (): Experience | undefined => {
    return experience.find((exp) => exp.current)
  }

  const getPastExperience = (): Experience[] => {
    return filterByBoolean(experience, 'current' as keyof Experience, false)
  }

  const getExperienceById = (id: string): Experience | undefined => {
    return experience.find((exp) => exp.id === id)
  }

  const getExperienceByCompany = (company: string): Experience[] => {
    return filterByField(experience, 'company' as keyof Experience, company)
  }

  const getExperienceByType = (type: string): Experience[] => {
    return filterByField(experience, 'type' as keyof Experience, type)
  }

  const getExperienceByLocation = (location: string): Experience[] => {
    return filterByField(experience, 'location' as keyof Experience, location)
  }

  const getExperienceByTechnology = (technology: string): Experience[] => {
    return filterByTechnology(experience, technology)
  }

  const getAllCompanies = (): string[] => {
    return unique(experience.map((exp) => exp.company))
  }

  const getAllTypes = (): string[] => {
    return unique(
      experience.map((exp) => exp.type).filter((type): type is string => type !== undefined)
    )
  }

  const getAllLocations = (): string[] => {
    return unique(
      experience.map((exp) => exp.location).filter((location): location is string => location !== undefined)
    )
  }

  const getAllTechnologies = (): string[] => {
    return unique(flatten(experience.map((exp) => exp.technologies))).sort()
  }

  return {
    experiences: getAllExperience(),
    currentExperience: getCurrentExperience(),
    pastExperience: getPastExperience(),
    searchExperience,
    searchExperienceByFields,
    filterExperience,
    filterExperienceByCompany,
    filterExperienceByType,
    filterExperienceByLocation,
    filterExperienceByTechnology,
    sortExperience,
    sortExperienceByDate,
    paginateExperience,
    getExperienceById,
    getExperienceByCompany,
    getExperienceByType,
    getExperienceByLocation,
    getExperienceByTechnology,
    getAllCompanies,
    getAllTypes,
    getAllLocations,
    getAllTechnologies,
  }
}
