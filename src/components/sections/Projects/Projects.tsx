import { useState, useMemo } from 'react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Heading } from '@/components/ui/Heading'
import { FeaturedProject } from './FeaturedProject'
import { ProjectFilters } from './ProjectFilters'
import { ProjectsGrid } from './ProjectsGrid'
import { useProjects } from '@/hooks'
import { sortAlphabetically } from '@/lib/query'

export const Projects = () => {
  const { projects, getAllCategories, filterProjectsByCategory, searchProjects, sortProjectsByDate } = useProjects()
  const categories = getAllCategories()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'>('date-desc')

  const filteredProjects = useMemo(() => {
    let result = activeCategory === 'all' ? [...projects] : filterProjectsByCategory(activeCategory)
    
    if (searchQuery) {
      result = searchProjects(searchQuery)
    }

    if (sortBy === 'date-desc') {
      result = sortProjectsByDate('desc')
    } else if (sortBy === 'date-asc') {
      result = sortProjectsByDate('asc')
    } else if (sortBy === 'name-asc') {
      result = sortAlphabetically(result, 'title' as any, 'asc')
    } else if (sortBy === 'name-desc') {
      result = sortAlphabetically(result, 'title' as any, 'desc')
    }

    return result
  }, [activeCategory, searchQuery, sortBy, projects, filterProjectsByCategory, searchProjects, sortProjectsByDate])

  return (
    <AnimatedSection
      spacing="xl"
      background="default"
      withContainer={true}
      containerPadding="lg"
    >
      <div className="space-y-12">
        <AnimatedHeading delay={0.1}>
          <Heading level={2} size="4xl" align="center">
            Projects
          </Heading>
        </AnimatedHeading>

        <FeaturedProject />

        <AnimatedContainer delay={0.2}>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              aria-label="Search projects"
            />
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.22}>
          <div className="flex justify-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              aria-label="Sort projects"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>
        </AnimatedContainer>

        <ProjectFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProjectsGrid projects={filteredProjects} />
      </div>
    </AnimatedSection>
  )
}
