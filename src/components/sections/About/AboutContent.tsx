import { AnimatedText } from '@/components/animations/AnimatedText'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { AboutHighlights } from './AboutHighlights'
import { AboutStats } from './AboutStats'

export const AboutContent = () => {
  return (
    <div className="space-y-8">
      <AnimatedHeading delay={0.2}>
        <Heading level={2} size="4xl">
          About Me
        </Heading>
      </AnimatedHeading>

      <AnimatedText variant="slide-up" delay={0.3}>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          Placeholder introduction text. This section will contain a brief overview 
          of professional background, expertise, and passion for creating exceptional 
          digital experiences.
        </p>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.4}>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          Additional placeholder content about approach to work, values, and what 
          drives professional excellence in building meaningful solutions.
        </p>
      </AnimatedText>

      <AboutHighlights />

      <AboutStats />
    </div>
  )
}
