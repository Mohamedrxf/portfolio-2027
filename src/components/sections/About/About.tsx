import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AboutStory } from '@/components/about/AboutStory'

export const About = () => {
  return (
    <section id="about" className="scroll-mt-16">
      <AnimatedSection
        spacing="none"
        background="default"
        withContainer={false}
      >
        <AboutStory />
      </AnimatedSection>
    </section>
  )
}
