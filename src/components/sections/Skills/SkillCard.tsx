import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Badge } from '@/components/ui/Badge'

interface SkillCardProps {
  name: string
  badge: string | null
  delay: number
}

export const SkillCard = ({ name, badge, delay }: SkillCardProps) => {
  return (
    <AnimatedContainer delay={delay}>
      <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-text-primary)] font-medium">
            {name}
          </span>
          {badge && (
            <Badge variant="primary" size="sm">
              {badge}
            </Badge>
          )}
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
        </div>
      </div>
    </AnimatedContainer>
  )
}
