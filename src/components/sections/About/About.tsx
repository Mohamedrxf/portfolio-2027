import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AboutImage } from './AboutImage'
import { AboutContent } from './AboutContent'
import { AboutCareerStory } from './AboutCareerStory'
import { AboutEducation } from './AboutEducation'
import { AboutAchievements } from './AboutAchievements'
import { AboutQuickFacts } from './AboutQuickFacts'

export const About = () => {
  return (
    <AnimatedSection
      spacing="xl"
      background="surface"
      withContainer={true}
      containerPadding="lg"
    >
      {/* Two-column layout for introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
        <AboutImage />
        <AboutContent />
      </div>

      {/* Career Story - Timeline-inspired layout */}
      <AboutCareerStory />

      {/* Education Summary */}
      <AboutEducation />

      {/* Achievement Cards */}
      <AboutAchievements />

      {/* Quick Facts */}
      <AboutQuickFacts />
    </AnimatedSection>
  )
}
