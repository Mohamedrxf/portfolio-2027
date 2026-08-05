import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'

interface EducationCardProps {
  institution: string
  degree: string
  duration: string
  description: string
  achievements: string[]
  gpa: string
  delay: number
}

export const EducationCard = ({
  institution,
  degree,
  duration,
  description,
  achievements,
  gpa,
  delay,
}: EducationCardProps) => {
  return (
    <AnimatedCard delay={delay} cardVariant="default" className="h-full">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
              {institution}
            </h3>
            <p className="text-[var(--color-text-secondary)] font-medium">
              {degree}
            </p>
          </div>
          <Badge variant="outline" size="sm">
            {duration}
          </Badge>
        </div>

        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>

        {(gpa && gpa !== 'N/A') && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              GPA:
            </span>
            <Badge variant="primary" size="sm">
              {gpa}
            </Badge>
          </div>
        )}

        {achievements && achievements.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              Achievements:
            </span>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement) => (
                <Badge key={achievement} variant="secondary" size="sm">
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatedCard>
  )
}
