import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { usePortfolio } from '@/hooks'

export const AboutHighlights = () => {
  const { highlights } = usePortfolio()

  return (
    <div className="space-y-4">
      <AnimatedContainer delay={0}>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Key Highlights
        </h3>
      </AnimatedContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((highlight) => (
          <AnimatedCard key={highlight.title} delay={0} cardVariant="hoverable" className="h-full">
            <div className="space-y-3">
              <Badge variant="primary" size="sm">
                {highlight.badge}
              </Badge>
              <p className="text-[var(--color-text-secondary)] text-sm">
                {highlight.description}
              </p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  )
}
