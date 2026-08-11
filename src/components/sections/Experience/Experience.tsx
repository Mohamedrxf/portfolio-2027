import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline'

export const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-16">
      <AnimatedSection
        spacing="none"
        background="default"
        withContainer={false}
      >
        <ExperienceTimeline />
      </AnimatedSection>
    </section>
  )
}
