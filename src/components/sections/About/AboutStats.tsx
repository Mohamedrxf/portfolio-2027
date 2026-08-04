import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const AboutStats = () => {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <AnimatedContainer delay={1.0}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              10+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Years Experience
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={1.1}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              100+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Projects Delivered
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={1.2}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              50+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Happy Clients
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={1.3}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              15+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Awards Won
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}
