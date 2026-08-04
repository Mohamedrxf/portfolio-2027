import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const EducationHighlights = () => {
  return (
    <AnimatedContainer delay={0.7} className="mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-[var(--color-text-primary)]">
            4+
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            Degrees Earned
          </div>
        </div>

        <div className="text-center p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-[var(--color-text-primary)]">
            3.85
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            Average GPA
          </div>
        </div>

        <div className="text-center p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-[var(--color-text-primary)]">
            10+
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            Certifications
          </div>
        </div>

        <div className="text-center p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-2xl font-bold text-[var(--color-text-primary)]">
            5+
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            Awards
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
