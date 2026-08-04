import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'

interface ExperienceCardProps {
  position: string
  company: string
  duration: string
  description: string
  technologies: string[]
  delay: number
}

export const ExperienceCard = ({
  position,
  company,
  duration,
  description,
  technologies,
  delay,
}: ExperienceCardProps) => {
  return (
    <AnimatedCard delay={delay} cardVariant="default" className="h-full">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
              {position}
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              {company}
            </p>
          </div>
          <Badge variant="outline" size="sm">
            {duration}
          </Badge>
        </div>

        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedCard>
  )
}
