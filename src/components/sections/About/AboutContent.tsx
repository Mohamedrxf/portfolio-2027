import { AnimatedText } from '@/components/animations/AnimatedText'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { StaggerContainer } from '@/components/animations/StaggerContainer'
import { Heading } from '@/components/ui/Heading'
import { AboutHighlights } from './AboutHighlights'
import { AboutStats } from './AboutStats'
import { usePortfolio } from '@/hooks'

export const AboutContent = () => {
  const { personalInfo } = usePortfolio()

  return (
    <StaggerContainer stagger={0.1} delayChildren={0.2}>
      <div className="space-y-8">
        <AnimatedHeading delay={0}>
          <Heading level={2} size="4xl">
            About Me
          </Heading>
        </AnimatedHeading>

        <AnimatedText as="p" variant="slide-up" delay={0}>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            {personalInfo.bio}
          </p>
        </AnimatedText>

        <AnimatedText as="p" variant="slide-up" delay={0}>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Based in {personalInfo.location}, I'm {personalInfo.availability} and passionate about 
            creating exceptional digital experiences that make a real impact.
          </p>
        </AnimatedText>

        <AboutHighlights />

        <AboutStats />
      </div>
    </StaggerContainer>
  )
}
