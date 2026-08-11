import { useState } from 'react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { SkillCategoryTabs } from './SkillCategoryTabs'
import { CategoryStatistics } from './CategoryStatistics'
import { FeaturedSkills } from './FeaturedSkills'
import { SkillsByCategory } from './SkillsByCategory'
import { SkillsGalaxy } from '@/components/three'
import { useSkills } from '@/hooks'
import type { Skill } from '@/data/skills'

export const Skills = () => {
  const { skills, skillCategories, filterSkillsByCategory, getSkillsByLevel } = useSkills()
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : filterSkillsByCategory(activeCategory)

  const expertSkills = getSkillsByLevel(5)
  const maxYears = Math.max(...skills.map(s => s.years || 0))

  const handleSkillSelect = (skill: Skill | null) => {
    if (skill) {
      setActiveCategory(skill.category)
    }
  }

  const handleSkillHover = (_skill: Skill | null) => {
    // Optional: handle hover state
  }

  return (
    <section id="skills" className="scroll-mt-16">
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

        <div className="h-[400px] sm:h-[500px] md:h-[600px] w-full rounded-lg overflow-hidden border border-border/20 bg-card/50 backdrop-blur-sm">
          <SkillsGalaxy
            onSkillSelect={handleSkillSelect}
            onSkillHover={handleSkillHover}
          />
        </div>

        <SkillsByCategory skills={filteredSkills} />
      </div>
    </AnimatedSection>
    </section>
  )
}
