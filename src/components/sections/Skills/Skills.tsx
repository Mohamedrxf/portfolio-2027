import { useState } from 'react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { SkillCategoryTabs } from './SkillCategoryTabs'
import { CategoryStatistics } from './CategoryStatistics'
import { FeaturedSkills } from './FeaturedSkills'
import { SkillsByCategory } from './SkillsByCategory'
import { useSkills } from '@/hooks'

export const Skills = () => {
  const { skills, skillCategories, filterSkillsByCategory, getSkillsByLevel } = useSkills()
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : filterSkillsByCategory(activeCategory)

  const expertSkills = getSkillsByLevel(5)
  const maxYears = Math.max(...skills.map(s => s.years || 0))

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
            Skills & Expertise
          </Heading>
        </AnimatedHeading>

        <CategoryStatistics
          totalSkills={skills.length}
          expertSkills={expertSkills.length}
          categories={skillCategories.length}
          yearsOfExperience={maxYears}
        />

        <FeaturedSkills />

        <SkillCategoryTabs
          categories={skillCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <SkillsByCategory skills={filteredSkills} />
      </div>
    </AnimatedSection>
  )
}
