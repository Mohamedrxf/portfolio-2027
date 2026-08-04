import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { usePortfolio } from '@/hooks'

export const HeroStats = () => {
  const { stats } = usePortfolio()

  return (
    <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <AnimatedContainer key={stat.label} delay={0.8 + index * 0.1}>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                {stat.label}
              </div>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </div>
  )
}
