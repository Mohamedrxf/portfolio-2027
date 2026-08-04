import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const FeaturedProject = () => {
  return (
    <AnimatedCard delay={0.2} cardVariant="elevated" className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-video lg:aspect-auto bg-[var(--color-surface-elevated)] rounded-lg flex items-center justify-center">
          <span className="text-[var(--color-text-secondary)] text-sm">
            Featured Project Image Placeholder
          </span>
        </div>

        <div className="space-y-4 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Featured
            </Badge>
            <Badge variant="outline" size="sm">
              Live
            </Badge>
          </div>

          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Enterprise CRM Solution
          </h3>

          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Placeholder description of a comprehensive customer relationship management system 
            with advanced analytics, automation features, and seamless integrations.
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              React
            </Badge>
            <Badge variant="secondary" size="sm">
              Node.js
            </Badge>
            <Badge variant="secondary" size="sm">
              PostgreSQL
            </Badge>
            <Badge variant="secondary" size="sm">
              AWS
            </Badge>
            <Badge variant="secondary" size="sm">
              Docker
            </Badge>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="md">
              View on GitHub
            </Button>
            <Button variant="primary" size="md">
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </AnimatedCard>
  )
}
