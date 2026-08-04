import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { usePortfolio } from '@/hooks'

export const AboutStats = () => {
  const { stats } = usePortfolio()

  return (
    <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <AnimatedContainer key={stat.label} delay={1.0 + index * 0.1}>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {stat.label}
              </div>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </div>
  )
}
