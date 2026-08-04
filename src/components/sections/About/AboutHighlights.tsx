import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const AboutHighlights = () => {
  return (
    <div className="space-y-4">
      <AnimatedContainer delay={0.5}>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Key Highlights
        </h3>
      </AnimatedContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatedCard delay={0.6} cardVariant="default" className="h-full">
          <div className="space-y-3">
            <Badge variant="primary" size="sm">
              Expertise
            </Badge>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Placeholder highlight about technical expertise and specialization areas.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.7} cardVariant="default" className="h-full">
          <div className="space-y-3">
            <Badge variant="secondary" size="sm">
              Experience
            </Badge>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Placeholder highlight about professional experience and industry knowledge.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.8} cardVariant="default" className="h-full">
          <div className="space-y-3">
            <Badge variant="outline" size="sm">
              Approach
            </Badge>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Placeholder highlight about methodology and work approach.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.9} cardVariant="default" className="h-full">
          <div className="space-y-3">
            <Badge variant="primary" size="sm">
              Values
            </Badge>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Placeholder highlight about core values and professional principles.
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
