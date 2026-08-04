import { socials, type Social } from '@/data'
import {
  filterByBoolean,
  filterByField,
  sortByOrder,
  unique,
  searchByText,
  searchByFields,
  sortAlphabetically,
  paginate,
} from '@/lib/query'

export const useSocials = () => {
  const getAllSocials = (): Social[] => {
    return [...socials]
  }

  const searchSocials = (query: string): Social[] => {
    return searchByText(socials, query)
  }

  const searchSocialsByFields = (query: string, fields: (keyof Social)[]): Social[] => {
    return searchByFields(socials, query, fields)
  }

  const filterSocials = (predicate: (social: Social) => boolean): Social[] => {
    return socials.filter(predicate)
  }

  const filterSocialsByPlatform = (platform: string): Social[] => {
    return filterByField(socials, 'platform' as keyof Social, platform)
  }

  const filterVisibleSocials = (): Social[] => {
    return filterByBoolean(socials, 'visible' as keyof Social, true)
  }

  const sortSocials = (field: keyof Social, direction: 'asc' | 'desc' = 'asc'): Social[] => {
    return sortAlphabetically(socials, field, direction)
  }

  const sortSocialsByOrder = (direction: 'asc' | 'desc' = 'asc'): Social[] => {
    return sortByOrder(socials, 'order' as keyof Social, direction)
  }

  const paginateSocials = (page: number, pageSize: number) => {
    return paginate(socials, page, pageSize)
  }

  const getVisibleSocials = (): Social[] => {
    return sortByOrder(filterByBoolean(socials, 'visible' as keyof Social, true), 'order' as keyof Social, 'asc')
  }

  const getSocialById = (id: string): Social | undefined => {
    return socials.find((social) => social.id === id)
  }

  const getSocialByPlatform = (platform: string): Social | undefined => {
    return socials.find((social) => social.platform === platform)
  }

  const getSocialsByOrder = (order: number): Social[] => {
    return filterByField(socials, 'order' as keyof Social, order)
  }

  const getAllPlatforms = (): string[] => {
    return socials.map((social) => social.platform)
  }

  const getAllIcons = (): string[] => {
    return unique(
      socials.map((social) => social.icon).filter((icon): icon is string => icon !== undefined)
    )
  }

  const getPrimarySocials = (): Social[] => {
    return sortByOrder(filterByBoolean(socials, 'visible' as keyof Social, true).filter((s) => s.order <= 2), 'order' as keyof Social, 'asc')
  }

  return {
    socials: getAllSocials(),
    visibleSocials: getVisibleSocials(),
    primarySocials: getPrimarySocials(),
    searchSocials,
    searchSocialsByFields,
    filterSocials,
    filterSocialsByPlatform,
    filterVisibleSocials,
    sortSocials,
    sortSocialsByOrder,
    paginateSocials,
    getSocialById,
    getSocialByPlatform,
    getSocialsByOrder,
    getAllPlatforms,
    getAllIcons,
  }
}
