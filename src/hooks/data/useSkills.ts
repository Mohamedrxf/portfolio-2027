import { skillCategories, skills, type Skill, type SkillCategory } from '@/data'
import {
  filterByCategory,
  filterByField,
  filterByMin,
  first,
  unique,
  searchByText,
  searchByFields,
  sortAlphabetically,
  paginate,
} from '@/lib/query'

export const useSkills = () => {
  const getAllSkills = (): Skill[] => {
    return [...skills]
  }

  const getAllSkillCategories = (): SkillCategory[] => {
    return [...skillCategories]
  }

  const searchSkills = (query: string): Skill[] => {
    return searchByText(skills, query)
  }

  const searchSkillsByFields = (query: string, fields: (keyof Skill)[]): Skill[] => {
    return searchByFields(skills, query, fields)
  }

  const filterSkills = (predicate: (skill: Skill) => boolean): Skill[] => {
    return skills.filter(predicate)
  }

  const filterSkillsByCategory = (category: string): Skill[] => {
    return filterByCategory(skills, category)
  }

  const filterSkillsByBadge = (badge: string): Skill[] => {
    return filterByField(skills, 'badge' as keyof Skill, badge)
  }

  const filterSkillsByLevel = (minLevel: number): Skill[] => {
    return filterByMin(skills, 'level' as keyof Skill, minLevel)
  }

  const sortSkills = (field: keyof Skill, direction: 'asc' | 'desc' = 'asc'): Skill[] => {
    return sortAlphabetically(skills, field, direction)
  }

  const sortSkillsByLevel = (direction: 'asc' | 'desc' = 'desc'): Skill[] => {
    return skills.sort((a, b) => {
      const aLevel = a.level ?? 0
      const bLevel = b.level ?? 0
      return direction === 'asc' ? aLevel - bLevel : bLevel - aLevel
    })
  }

  const sortSkillsByName = (direction: 'asc' | 'desc' = 'asc'): Skill[] => {
    return sortAlphabetically(skills, 'name' as keyof Skill, direction)
  }

  const paginateSkills = (page: number, pageSize: number) => {
    return paginate(skills, page, pageSize)
  }

  const getSkillsByCategory = (category: string): Skill[] => {
    return filterByCategory(skills, category)
  }

  const getSkillById = (id: string): Skill | undefined => {
    return skills.find((skill) => skill.id === id)
  }

  const getSkillCategoryById = (id: string): SkillCategory | undefined => {
    return skillCategories.find((category) => category.id === id)
  }

  const getTopSkills = (limit: number = 10): Skill[] => {
    return first(filterByField(skills, 'badge' as keyof Skill, 'Expert'), limit)
  }

  const getSkillsByLevel = (minLevel: number): Skill[] => {
    return filterByMin(skills, 'level' as keyof Skill, minLevel)
  }

  const getSkillsWithBadge = (badge: string): Skill[] => {
    return filterByField(skills, 'badge' as keyof Skill, badge)
  }

  const getAllCategories = (): string[] => {
    return skillCategories.map((category) => category.name)
  }

  const getAllBadges = (): string[] => {
    return unique(
      skills
        .map((skill) => skill.badge)
        .filter((badge): badge is string => badge !== undefined)
    )
  }

  return {
    skills: getAllSkills(),
    skillCategories: getAllSkillCategories(),
    searchSkills,
    searchSkillsByFields,
    filterSkills,
    filterSkillsByCategory,
    filterSkillsByBadge,
    filterSkillsByLevel,
    sortSkills,
    sortSkillsByLevel,
    sortSkillsByName,
    paginateSkills,
    getSkillsByCategory,
    getSkillById,
    getSkillCategoryById,
    getTopSkills,
    getSkillsByLevel,
    getSkillsWithBadge,
    getAllCategories,
    getAllBadges,
  }
}
