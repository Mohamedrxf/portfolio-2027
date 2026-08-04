import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Heading } from '@/components/ui/Heading'

export const FooterBrand = () => {
  return (
    <AnimatedContainer delay={0.1}>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
            <span className="text-[var(--color-text-inverse)] font-bold text-lg">
              P
            </span>
          </div>
          <Heading level={4} size="lg" className="text-[var(--color-text-primary)]">
            Portfolio
          </Heading>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          A modern portfolio showcasing projects, skills, and professional achievements.
          Built with cutting-edge web technologies.
        </p>
      </div>
    </AnimatedContainer>
  )
}
