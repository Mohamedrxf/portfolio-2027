import { Button } from '@/components/ui/Button'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const HeroActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <AnimatedContainer delay={0.6}>
        <Button variant="primary" size="lg">
          View My Work
        </Button>
      </AnimatedContainer>

      <AnimatedContainer delay={0.7}>
        <Button variant="outline" size="lg">
          Contact Me
        </Button>
      </AnimatedContainer>

      <div className="flex gap-4 items-center mt-4 sm:mt-0">
        <AnimatedContainer delay={0.8}>
          <span className="text-[var(--color-text-secondary)] text-sm">
            Social links placeholder
          </span>
        </AnimatedContainer>
      </div>
    </div>
  )
}
