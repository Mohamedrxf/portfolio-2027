import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { HeroContent } from './HeroContent'
import { HeroImage } from './HeroImage'
import { HeroStats } from './HeroStats'

export const Hero = () => {
  return (
    <AnimatedSection
      spacing="xl"
      background="default"
      withContainer={true}
      containerPadding="lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <HeroContent />
        <HeroImage />
      </div>
      <HeroStats />
    </AnimatedSection>
  )
}
