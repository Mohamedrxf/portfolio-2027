import { AnimatedText } from '@/components/animations/AnimatedText'
import { Heading } from '@/components/ui/Heading'
import { HeroActions } from './HeroActions'

export const HeroContent = () => {
  return (
    <div className="space-y-6">
      <AnimatedText variant="slide-up" delay={0.1}>
        <p className="text-[var(--color-primary)] font-medium text-lg">
          Hello, I'm
        </p>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.2}>
        <Heading level={1} size="5xl" className="text-[var(--color-text-primary)]">
          John Doe
        </Heading>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.3}>
        <Heading level={2} size="2xl" className="text-[var(--color-text-secondary)] font-normal">
          Full Stack Developer
        </Heading>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.4}>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-xl">
          I build exceptional digital experiences that combine beautiful design with 
          powerful functionality. Passionate about creating user-centric solutions 
          that make a real impact.
        </p>
      </AnimatedText>

      <AnimatedText variant="slide-up" delay={0.5}>
        <HeroActions />
      </AnimatedText>
    </div>
  )
}
