import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { EducationGrid } from './EducationGrid'
import { EducationHighlights } from './EducationHighlights'

export const Education = () => {
  return (
    <section id="education" className="scroll-mt-16">
      <AnimatedSection
        spacing="xl"
        background="default"
        withContainer={true}
        containerPadding="lg"
      >
      <div className="space-y-12">
        <AnimatedHeading delay={0.1}>
          <Heading level={2} size="4xl" align="center">
            Education
          </Heading>
        </AnimatedHeading>

        <EducationGrid />

        <EducationHighlights />
      </div>
    </AnimatedSection>
    </section>
  )
}
