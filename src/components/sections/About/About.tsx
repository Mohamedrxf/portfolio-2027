import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AboutImage } from './AboutImage'
import { AboutContent } from './AboutContent'

export const About = () => {
  return (
    <AnimatedSection
      spacing="xl"
      background="surface"
      withContainer={true}
      containerPadding="lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <AboutImage />
        <AboutContent />
      </div>
    </AnimatedSection>
  )
}
