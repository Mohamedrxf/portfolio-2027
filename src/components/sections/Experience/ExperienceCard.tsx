import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'

interface ExperienceCardProps {
  position: string
  company: string
  duration: string
  description: string
  technologies: string[]
  responsibilities?: string[]
  achievements?: string[]
  delay: number
}

export const ExperienceCard = ({
  position,
  company,
  duration,
  description,
  technologies,
  responsibilities,
  achievements,
  delay,
}: ExperienceCardProps) => {
  return (
    <AnimatedCard 
      delay={delay} 
      cardVariant="default" 
      className="h-full hover:shadow-lg transition-shadow duration-300"
    >
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

        {responsibilities && responsibilities.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
              Responsibilities
            </h4>
            <ul className="space-y-1">
              {responsibilities.map((responsibility, index) => (
                <li 
                  key={index} 
                  className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2"
                >
                  <span className="text-[var(--color-primary)] mt-1">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {achievements && achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {achievements.map((achievement, index) => (
                <li 
                  key={index} 
                  className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2"
                >
                  <span className="text-[var(--color-primary)] mt-1">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
