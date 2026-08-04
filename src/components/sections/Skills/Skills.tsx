import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { SkillsGrid } from './SkillsGrid'
import { SkillsLegend } from './SkillsLegend'

export const Skills = () => {
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

        <SkillsGrid />

        <SkillsLegend />
      </div>
    </AnimatedSection>
  )
}
