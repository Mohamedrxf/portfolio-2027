import { useState } from 'react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { AchievementFilters } from './AchievementFilters'
import { AchievementStats } from './AchievementStats'
import { AchievementGrid } from './AchievementGrid'

export const Achievements = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <section id="achievements" className="scroll-mt-16">
      <AnimatedSection
        spacing="xl"
        background="surface"
        withContainer={true}
        containerPadding="lg"
      >
      <div className="space-y-12">
        <AnimatedHeading delay={0.1}>
          <Heading level={2} size="4xl" align="center">
            Achievements
          </Heading>
        </AnimatedHeading>

        <AchievementStats />

        <AchievementFilters 
          onFilterChange={setActiveFilter} 
          activeFilter={activeFilter} 
        />

        <AchievementGrid activeFilter={activeFilter} />
      </div>
    </AnimatedSection>
    </section>
  )
}
