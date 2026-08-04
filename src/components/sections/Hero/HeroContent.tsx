import { AnimatedText } from '@/components/animations/AnimatedText'
import { Heading } from '@/components/ui/Heading'
import { HeroActions } from './HeroActions'
import { usePortfolio } from '@/hooks'

export const HeroContent = () => {
  const { personalInfo } = usePortfolio()

  return (
    <div className="space-y-6">
      <AnimatedText variant="slide-up" delay={0.1}>
        <p className="text-[var(--color-primary)] font-medium text-lg">
          {personalInfo.tagline}
        </p>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.2}>
        <Heading level={1} size="5xl" className="text-[var(--color-text-primary)]">
          {personalInfo.name}
        </Heading>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.3}>
        <Heading level={2} size="2xl" className="text-[var(--color-text-secondary)] font-normal">
          {personalInfo.role}
        </Heading>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.4}>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-xl">
          {personalInfo.bio}
        </p>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.5}>
        <HeroActions />
      </AnimatedText>
    </div>
  )
}
