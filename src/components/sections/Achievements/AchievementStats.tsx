import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const AchievementStats = () => {
  return (
    <div className="mb-12 pb-8 border-b border-[var(--color-border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <AnimatedContainer delay={0.2}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              10+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Awards
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.25}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              5+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Competitions
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              3+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Hackathons
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.35}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
              8+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              Recognitions
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}
