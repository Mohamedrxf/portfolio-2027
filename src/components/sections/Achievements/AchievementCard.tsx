import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'

interface AchievementCardProps {
  title: string
  description: string
  date: string
  category: string
  status?: string
  delay: number
}

export const AchievementCard = ({
  title,
  description,
  date,
  category,
  status,
  delay,
}: AchievementCardProps) => {
  return (
    <AnimatedCard delay={delay} cardVariant="default" className="h-full">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[var(--color-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" size="sm">
            {date}
          </Badge>
          <Badge variant="secondary" size="sm">
            {category}
          </Badge>
          {status && (
            <Badge variant="success" size="sm">
              {status}
            </Badge>
          )}
        </div>
      </div>
    </AnimatedCard>
  )
}
