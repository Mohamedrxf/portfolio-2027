import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const SkillsLegend = () => {
  return (
    <AnimatedContainer delay={0.8} className="mt-8">
      <div className="flex flex-wrap justify-center gap-6 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)]">
            Expert
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)]">
            Advanced
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)]">
            Intermediate
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)]">
            Beginner
          </span>
        </div>
      </div>
    </AnimatedContainer>
  )
}
