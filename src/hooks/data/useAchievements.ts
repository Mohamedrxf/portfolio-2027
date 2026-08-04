import { achievements, type Achievement } from '@/data'
import {
  filterByCategory,
  filterByField,
  filterByFieldValues,
  first,
  unique,
  searchByText,
  searchByFields,
  sortAlphabetically,
  sortByDate,
  paginate,
} from '@/lib/query'

export const useAchievements = () => {
  const getAllAchievements = (): Achievement[] => {
    return [...achievements]
  }

  const searchAchievements = (query: string): Achievement[] => {
    return searchByText(achievements, query)
  }

  const searchAchievementsByFields = (query: string, fields: (keyof Achievement)[]): Achievement[] => {
    return searchByFields(achievements, query, fields)
  }

  const filterAchievements = (predicate: (achievement: Achievement) => boolean): Achievement[] => {
    return achievements.filter(predicate)
  }

  const filterAchievementsByCategory = (category: string): Achievement[] => {
    return filterByCategory(achievements, category)
  }

  const filterAchievementsByStatus = (status: string): Achievement[] => {
    return filterByField(achievements, 'status' as keyof Achievement, status)
  }

  const filterAchievementsByIssuer = (issuer: string): Achievement[] => {
    return filterByField(achievements, 'issuer' as keyof Achievement, issuer)
  }

  const sortAchievements = (field: keyof Achievement, direction: 'asc' | 'desc' = 'asc'): Achievement[] => {
    return sortAlphabetically(achievements, field, direction)
  }

  const sortAchievementsByDate = (direction: 'asc' | 'desc' = 'desc'): Achievement[] => {
    return sortByDate(achievements, 'date' as keyof Achievement, direction)
  }

  const paginateAchievements = (page: number, pageSize: number) => {
    return paginate(achievements, page, pageSize)
  }

  const getAchievementById = (id: string): Achievement | undefined => {
    return achievements.find((achievement) => achievement.id === id)
  }

  const getAchievementsByCategory = (category: string): Achievement[] => {
    return filterByCategory(achievements, category)
  }

  const getAchievementsByStatus = (status: string): Achievement[] => {
    return filterByField(achievements, 'status' as keyof Achievement, status)
  }

  const getAchievementsByIssuer = (issuer: string): Achievement[] => {
    return filterByField(achievements, 'issuer' as keyof Achievement, issuer)
  }

  const getRecentAchievements = (limit: number = 6): Achievement[] => {
    return first(achievements, limit)
  }

  const getActiveAchievements = (): Achievement[] => {
    return filterByFieldValues(achievements, 'status' as keyof Achievement, ['Active', 'Awarded'])
  }

  const getAllCategories = (): string[] => {
    return unique(achievements.map((achievement) => achievement.category))
  }

  const getAllStatuses = (): string[] => {
    return unique(achievements.map((achievement) => achievement.status))
  }

  const getAllIssuers = (): string[] => {
    return unique(
      achievements.map((achievement) => achievement.issuer).filter((issuer): issuer is string => issuer !== undefined)
    )
  }

  return {
    achievements: getAllAchievements(),
    recentAchievements: getRecentAchievements(),
    activeAchievements: getActiveAchievements(),
    searchAchievements,
    searchAchievementsByFields,
    filterAchievements,
    filterAchievementsByCategory,
    filterAchievementsByStatus,
    filterAchievementsByIssuer,
    sortAchievements,
    sortAchievementsByDate,
    paginateAchievements,
    getAchievementById,
    getAchievementsByCategory,
    getAchievementsByStatus,
    getAchievementsByIssuer,
    getAllCategories,
    getAllStatuses,
    getAllIssuers,
  }
}
