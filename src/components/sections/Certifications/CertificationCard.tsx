import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface CertificationCardProps {
  title: string
  organization: string
  issueDate: string
  credential: string
  technologies: string[]
  delay: number
}

export const CertificationCard = ({
  title,
  organization,
  issueDate,
  credential,
  technologies,
  delay,
}: CertificationCardProps) => {
  return (
    <AnimatedCard delay={delay} cardVariant="default" className="h-full">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {title}
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              {organization}
            </p>
          </div>
          <Badge variant="outline" size="sm">
            {issueDate}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-secondary)]">
              Credential:
            </span>
            <span className="text-xs font-mono text-[var(--color-text-primary)]">
              {credential}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        <Button variant="ghost" size="sm" fullWidth>
          Verify Credential
        </Button>
      </div>
    </AnimatedCard>
  )
}
