import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { useAchievements } from '@/hooks'

export const AchievementStats = () => {
  const { achievements } = useAchievements()

  if (!achievements || achievements.length === 0) {
    return null
  }

  const totalAchievements = achievements.length
  const awardsCount = achievements.filter(a => a.status === 'Awarded' || a.status?.includes('Winner')).length
  const hackathonCount = achievements.filter(a => a.category === 'Competition').length
  const finalistCount = achievements.filter(a => a.status === 'Finalist').length

  return (
    <div className="mb-12 pb-8 border-b border-[var(--color-border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <AnimatedContainer delay={0.2}>
          <div className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              {totalAchievements}
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
              Total Achievements
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.25}>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
            <div className="text-3xl font-bold text-[var(--color-primary)]">
              {awardsCount}
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
              Awards Won
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3}>
          <div className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              {hackathonCount}
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
              Hackathons
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.35}>
          <div className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              {finalistCount}
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
              Finalist
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}
