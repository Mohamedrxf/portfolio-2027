import { useReducedMotion } from '@/hooks'
import { Badge } from '@/components/ui/Badge'
import { SpotlightCard } from '@/components/animations/SpotlightCard'
import { motion } from 'framer-motion'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

interface AchievementCardProps {
  title: string
  description: string
  date: string
  category: string
  status?: string
  issuer?: string
  delay: number
  isFeatured?: boolean
}

export const AchievementCard = ({
  title,
  description,
  date,
  category,
  status,
  issuer,
  delay,
  isFeatured = false,
}: AchievementCardProps) => {
  const prefersReducedMotion = useReducedMotion()

  const isMajorAward = isFeatured || status === 'Awarded' || status === '1st Prize' || status?.includes('Winner')

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
          ${isMajorAward ? 'border-[var(--color-primary)]/30' : ''}
        `}
        disabled={prefersReducedMotion}
      >
        <div className="space-y-4" role="article" aria-label={`Achievement: ${title} from ${issuer || category}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                ${isMajorAward 
                  ? 'bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 border border-[var(--color-primary)]/30' 
                  : 'bg-[var(--color-primary)]/10'}
              `}>
                {isMajorAward ? (
                  <svg
                    className="w-6 h-6 text-[var(--color-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-[var(--color-primary)]"
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
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                  {title}
                </h3>
                {issuer && (
                  <p className="text-sm text-[var(--color-primary)] font-medium mt-1">
                    {issuer}
                  </p>
                )}
                <p className="text-[var(--color-text-secondary)] text-sm mt-2 leading-relaxed">
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
              <Badge 
                variant={isMajorAward ? "primary" : "success"} 
                size="sm"
                className={isMajorAward ? 'font-semibold' : ''}
              >
                {status}
              </Badge>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
