import { AnimatedText } from '@/components/animations/AnimatedText'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { AboutHighlights } from './AboutHighlights'
import { AboutStats } from './AboutStats'
import { usePortfolio } from '@/hooks'

export const AboutContent = () => {
  const { personalInfo } = usePortfolio()

  return (
    <div className="space-y-8">
      <AnimatedHeading delay={0.2}>
        <Heading level={2} size="4xl">
          About Me
        </Heading>
      </AnimatedHeading>

      <AnimatedText variant="slide-up" delay={0.3}>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          {personalInfo.bio}
        </p>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.4}>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          Based in {personalInfo.location}, I'm {personalInfo.availability} and passionate about 
          creating exceptional digital experiences that make a real impact.
        </p>
      </AnimatedText>

      <AboutHighlights />

      <AboutStats />
    </div>
  )
}
