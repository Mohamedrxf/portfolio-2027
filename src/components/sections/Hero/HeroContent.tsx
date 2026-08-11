import { AnimatedText } from '@/components/animations/AnimatedText'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'
import { HeroActions } from './HeroActions'
import { usePortfolio } from '@/hooks'

export const HeroContent = () => {
  const { personalInfo, highlights } = usePortfolio()

  return (
    <div className="space-y-6">
      <AnimatedText as="p" variant="slide-up" delay={0.1}>
        <p className="text-[var(--color-primary)] font-medium text-lg">
          {personalInfo.tagline}
        </p>
      </AnimatedText>

      <AnimatedText as="div" variant="slide-up" delay={0.2}>
        <Heading level={1} size="5xl" className="text-[var(--color-text-primary)]">
          {personalInfo.name}
        </Heading>
      </AnimatedText>

      <AnimatedText as="div" variant="slide-up" delay={0.3}>
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-2xl text-[var(--color-text-secondary)] font-normal">
            {personalInfo.role}
          </p>
          <Badge variant="primary" size="md" className="animate-pulse">
            {personalInfo.availability}
          </Badge>
        </div>
      </AnimatedText>

      <AnimatedText as="p" variant="slide-up" delay={0.4}>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-xl">
          {personalInfo.bio}
        </p>
      </AnimatedText>

      <AnimatedText as="div" variant="slide-up" delay={0.5}>
        <div className="flex flex-wrap gap-2 mb-6">
          {highlights.slice(0, 3).map((highlight) => (
            <Badge key={highlight.title} variant="outline" size="sm" className="text-xs">
              {highlight.badge}
            </Badge>
          ))}
        </div>
      </AnimatedText>

      <AnimatedText as="div" variant="slide-up" delay={0.6}>
        <HeroActions />
      </AnimatedText>
    </div>
  )
}
