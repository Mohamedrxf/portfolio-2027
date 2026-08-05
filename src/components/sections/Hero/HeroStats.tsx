import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { StaggerContainer } from '@/components/animations/StaggerContainer'
import { usePortfolio } from '@/hooks'

export const HeroStats = () => {
  const { stats } = usePortfolio()

  return (
    <div className="mt-12 md:mt-16 pt-8 border-t border-[var(--color-border)]">
      <StaggerContainer stagger={0.1} delayChildren={0.8} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat) => (
          <AnimatedContainer key={stat.label} delay={0.8 + stats.indexOf(stat) * 0.1}>
            <div className="text-center group cursor-default">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-[var(--color-text-secondary)] mt-1">
                {stat.label}
              </div>
            </div>
          </AnimatedContainer>
        ))}
      </StaggerContainer>
    </div>
  )
}
