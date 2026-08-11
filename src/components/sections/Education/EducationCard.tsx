import { useReducedMotion } from '@/hooks'
import { Badge } from '@/components/ui/Badge'
import { SpotlightCard } from '@/components/animations/SpotlightCard'
import { motion } from 'framer-motion'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

interface EducationCardProps {
  institution: string
  degree: string
  duration: string
  description: string
  achievements: string[]
  gpa: string
  location?: string
  delay: number
}

export const EducationCard = ({
  institution,
  degree,
  duration,
  description,
  achievements,
  gpa,
  location,
  delay,
}: EducationCardProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_CONSTANTS.duration.normal,
        delay: prefersReducedMotion ? 0 : delay,
        ease: ANIMATION_CONSTANTS.easing.easeOut,
      }}
    >
      <SpotlightCard
        className={`
          relative p-6 rounded-2xl backdrop-blur-xl 
          bg-gradient-to-br from-white/10 to-white/5 
          border border-white/20 shadow-2xl 
          transition-all duration-500 ease-out
          hover:shadow-lg hover:scale-[1.01]
          focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50
        `}
        disabled={prefersReducedMotion}
      >
        <div className="space-y-4" role="article" aria-label={`Education at ${institution}: ${degree}`}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                {institution}
              </h3>
              <p className="text-lg font-semibold text-[var(--color-primary)]">
                {degree}
              </p>
              {location && (
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {location}
                </p>
              )}
            </div>
            <Badge variant="outline" size="sm" className="shrink-0">
              {duration}
            </Badge>
          </div>

          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>

          {(gpa && gpa !== 'N/A') && (
            <div className="flex items-center justify-between bg-[var(--color-primary)]/5 rounded-lg p-3 border border-[var(--color-primary)]/20">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                CGPA:
              </span>
              <Badge variant="primary" size="lg" className="text-base font-bold">
                {gpa}
              </Badge>
            </div>
          )}

          {achievements && achievements.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">
                Key Achievements
              </h4>
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
      </SpotlightCard>
    </motion.div>
  )
}
