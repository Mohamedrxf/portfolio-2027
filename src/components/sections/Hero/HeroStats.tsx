import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const HeroStats = () => {
  return (
    <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <AnimatedContainer delay={0.8}>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              5+
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1">
              Years Experience
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.9}>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              50+
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1">
              Projects Completed
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={1.0}>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              30+
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1">
              Happy Clients
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={1.1}>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              10+
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1">
              Awards Won
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}
