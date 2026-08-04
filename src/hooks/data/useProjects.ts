import { projects, type Project } from '@/data'
import {
  filterByBoolean,
  filterByCategory,
  filterByTechnology,
  filterByField,
  first,
  unique,
  flatten,
  sortAlphabetically,
  searchByText,
  searchByFields,
  paginate,
} from '@/lib/query'

export const useProjects = () => {
  const getAllProjects = (): Project[] => {
    return [...projects]
  }

  const searchProjects = (query: string): Project[] => {
    return searchByText(projects, query)
  }

  const searchProjectsByFields = (query: string, fields: (keyof Project)[]): Project[] => {
    return searchByFields(projects, query, fields)
  }

  const filterProjects = (predicate: (project: Project) => boolean): Project[] => {
    return projects.filter(predicate)
  }

  const filterProjectsByCategory = (category: string): Project[] => {
    return filterByCategory(projects, category)
  }

  const filterProjectsByStatus = (status: string): Project[] => {
    return filterByField(projects, 'status' as keyof Project, status)
  }

  const filterProjectsByTechnology = (technology: string): Project[] => {
    return filterByTechnology(projects, technology)
  }

  const sortProjects = (field: keyof Project, direction: 'asc' | 'desc' = 'asc'): Project[] => {
    return sortAlphabetically(projects, field, direction)
  }

  const sortProjectsByDate = (direction: 'asc' | 'desc' = 'desc'): Project[] => {
    return sortAlphabetically(projects, 'date' as keyof Project, direction)
  }

  const paginateProjects = (page: number, pageSize: number) => {
    return paginate(projects, page, pageSize)
  }

  const getFeaturedProjects = (): Project[] => {
    return filterByBoolean(projects, 'featured' as keyof Project, true)
  }

  const getRecentProjects = (limit: number = 3): Project[] => {
    return first(projects, limit)
  }

  const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.id === id)
  }

  const getProjectsByCategory = (category: string): Project[] => {
    return filterByCategory(projects, category)
  }

  const getProjectsByStatus = (status: string): Project[] => {
    return filterByField(projects, 'status' as keyof Project, status)
  }

  const getProjectsByTechnology = (technology: string): Project[] => {
    return filterByTechnology(projects, technology)
  }

  const getAllCategories = (): string[] => {
    return unique(projects.map((project) => project.category))
  }

  const getAllTechnologies = (): string[] => {
    return unique(flatten(projects.map((project) => project.technologies))).sort()
  }

  const getAllStatuses = (): string[] => {
    return unique(projects.map((project) => project.status))
  }

  return {
    projects: getAllProjects(),
    featuredProjects: getFeaturedProjects(),
    recentProjects: getRecentProjects(),
    searchProjects,
    searchProjectsByFields,
    filterProjects,
    filterProjectsByCategory,
    filterProjectsByStatus,
    filterProjectsByTechnology,
    sortProjects,
    sortProjectsByDate,
    paginateProjects,
    getProjectById,
    getProjectsByCategory,
    getProjectsByStatus,
    getProjectsByTechnology,
    getAllCategories,
    getAllTechnologies,
    getAllStatuses,
  }
}
