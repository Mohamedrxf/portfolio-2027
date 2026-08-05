import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { ProjectTags } from './ProjectTags'
import { ProjectActions } from './ProjectActions'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  category: string
  status: string
  url?: string
  github?: string
  delay: number
}

export const ProjectCard = ({
  title,
  description,
  technologies,
  category,
  status,
  url,
  github,
  delay,
}: ProjectCardProps) => {
  return (
    <AnimatedCard 
      delay={delay} 
      cardVariant="default" 
      className="h-full hover:shadow-lg transition-shadow duration-300"
    >
      <div className="space-y-4">
        <div className="aspect-video bg-[var(--color-surface-elevated)] rounded-lg flex items-center justify-center overflow-hidden">
          {url ? (
            <img 
              src={url} 
              alt={`${title} screenshot`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-[var(--color-text-secondary)] text-sm">
              Project Image Placeholder
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {title}
            </h3>
            <Badge variant="outline" size="sm">
              {status}
            </Badge>
          </div>

          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
            {description}
          </p>

          <ProjectTags technologies={technologies} />

          <div className="flex items-center justify-between pt-2">
            <Badge variant="secondary" size="sm">
              {category}
            </Badge>
            <ProjectActions url={url} github={github} />
          </div>
        </div>
      </div>
    </AnimatedCard>
  )
}
