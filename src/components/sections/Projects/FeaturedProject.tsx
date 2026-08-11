import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { useProjects } from '@/hooks'

export const FeaturedProject = () => {
  const { featuredProjects } = useProjects()
  const featuredProject = featuredProjects[0]

  if (!featuredProject) return null

  return (
    <AnimatedCard 
      delay={0.2} 
      cardVariant="elevated" 
      className="h-full hover:shadow-xl transition-shadow duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredProject.image && (
          <div className="aspect-video lg:aspect-auto bg-[var(--color-surface-elevated)] rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={featuredProject.image} 
              alt={featuredProject.alt || featuredProject.title} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div className="space-y-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="primary" size="sm">
              Featured
            </Badge>
            <Badge variant="outline" size="sm">
              {featuredProject.status}
            </Badge>
            {featuredProject.award && (
              <Badge variant="warning" size="sm">
                🏆 {featuredProject.award}
              </Badge>
            )}
          </div>

          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {featuredProject.title}
          </h3>

          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            {featuredProject.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {featuredProject.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" size="sm">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {featuredProject.url && (
              <a
                href={featuredProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-md transition-colors"
                aria-label="View GitHub repository"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimatedCard>
  )
}
