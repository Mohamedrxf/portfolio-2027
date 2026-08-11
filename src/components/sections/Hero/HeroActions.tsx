import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/animations'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { useSocials } from '@/hooks'

export const HeroActions = () => {
  const { visibleSocials } = useSocials()

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <AnimatedContainer delay={0.1}>
        <MagneticButton
          variant="primary"
          size="lg"
          onClick={() => window.location.href = '#projects'}
          aria-label="View my projects"
        >
          View My Work
        </MagneticButton>
      </AnimatedContainer>

      <AnimatedContainer delay={0.2}>
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.href = '#contact'}
          aria-label="Contact me"
        >
          Contact Me
        </Button>
      </AnimatedContainer>

      {visibleSocials.length > 0 && (
        <div className="flex gap-4 items-center mt-4 sm:mt-0">
          {visibleSocials.slice(0, 3).map((social, index) => (
            <AnimatedContainer key={social.id} delay={0.3 + index * 0.1}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.platform} profile`}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <span className="sr-only">{social.platform}</span>
                {/* Icon would be rendered here based on social.icon */}
                <span className="text-2xl">{social.platform[0]}</span>
              </a>
            </AnimatedContainer>
          ))}
        </div>
      )}
    </div>
  )
}
