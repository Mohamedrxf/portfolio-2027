import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { usePortfolio } from '@/hooks'

export const AboutStats = () => {
  const { stats } = usePortfolio()

  return (
    <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <AnimatedContainer key={stat.label} delay={0}>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                <AnimatedCounter 
                  value={stat.value} 
                  duration={1.5} 
                  delay={0}
                />
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
