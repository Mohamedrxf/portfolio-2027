import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

interface PremiumSkillCardProps {
  name: string
  level: number
  badge?: string
  years?: number
  delay: number
}

export const PremiumSkillCard = ({
  name,
  level,
  badge,
  years,
  delay,
}: PremiumSkillCardProps) => {
  const getLevelLabel = (lvl: number) => {
    if (lvl >= 5) return 'Expert'
    if (lvl >= 4) return 'Advanced'
    if (lvl >= 3) return 'Intermediate'
    return 'Beginner'
  }

  const getLevelColor = (lvl: number) => {
    if (lvl >= 5) return 'var(--color-primary)'
    if (lvl >= 4) return 'var(--color-secondary)'
    if (lvl >= 3) return 'var(--color-warning)'
    return 'var(--color-accent)'
  }

  return (
    <AnimatedContainer delay={delay}>
      <motion.div
        className="relative p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          borderColor: 'var(--color-primary)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl overflow-hidden">
          <motion.div
            className="h-full"
            style={{ backgroundColor: getLevelColor(level) }}
            initial={{ width: 0 }}
            animate={{ width: `${(level / 5) * 100}%` }}
            transition={{ duration: 1, delay: delay + 0.2 }}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-[var(--color-text-primary)] font-semibold">
                {name}
              </h4>
              {years && (
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  {years} {years === 1 ? 'year' : 'years'} experience
                </p>
              )}
            </div>
            {badge && (
              <Badge variant="primary" size="sm">
                {badge}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-secondary)]">
                {getLevelLabel(level)}
              </span>
              <span className="text-[var(--color-text-secondary)]">
                {level}/5
              </span>
            </div>
            <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: getLevelColor(level) }}
                initial={{ width: 0 }}
                animate={{ width: `${(level / 5) * 100}%` }}
                transition={{ duration: 1, delay: delay + 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedContainer>
  )
}
