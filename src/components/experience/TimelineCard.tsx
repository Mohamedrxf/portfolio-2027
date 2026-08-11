import { useReducedMotion } from '@/hooks'
import { Badge } from '@/components/ui/Badge'
import { SpotlightCard } from '@/components/animations/SpotlightCard'
import { motion } from 'framer-motion'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'
import type { Experience } from '@/data'

interface TimelineCardProps {
  experience: Experience
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  index: number
}

export const TimelineCard = ({
  experience,
  isActive,
  onMouseEnter,
  onMouseLeave,
  index,
}: TimelineCardProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_CONSTANTS.duration.normal,
        delay: index * ANIMATION_CONSTANTS.stagger.normal,
        ease: ANIMATION_CONSTANTS.easing.easeOut,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SpotlightCard
        className={`
          relative p-6 rounded-2xl backdrop-blur-xl 
          bg-gradient-to-br from-white/10 to-white/5 
          border border-white/20 shadow-2xl 
          transition-all duration-500 ease-out
          ${isActive ? 'shadow-[var(--color-primary)]/20 scale-[1.02]' : 'hover:shadow-lg hover:scale-[1.01]'}
        `}
        disabled={prefersReducedMotion}
      >
        <div className='space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
            <div className='flex-1'>
              <h3 className='text-2xl font-bold text-[var(--color-text-primary)] mb-1'>
                {experience.company}
              </h3>
              <p className='text-lg font-semibold text-[var(--color-primary)]'>
                {experience.position}
              </p>
            </div>
            <Badge variant='outline' size='sm' className='shrink-0'>
              {experience.date}
            </Badge>
          </div>

          {experience.achievements && experience.achievements.length > 0 && (
            <div className='space-y-2'>
              <h4 className='text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wide'>
                Key Achievements
              </h4>
              <ul className='space-y-2'>
                {experience.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className='text-sm text-[var(--color-text-secondary)] flex items-start gap-2 font-medium'
                  >
                    <span className='text-[var(--color-primary)] mt-0.5 text-base'>✓</span>
                    <span className='leading-relaxed'>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <div className='space-y-2'>
              <h4 className='text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wide'>
                Responsibilities
              </h4>
              <ul className='space-y-1'>
                {experience.responsibilities.map((responsibility, idx) => (
                  <li
                    key={idx}
                    className='text-sm text-[var(--color-text-secondary)] flex items-start gap-2'
                  >
                    <span className='text-[var(--color-primary)] mt-1'>•</span>
                    <span className='leading-relaxed'>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.technologies && experience.technologies.length > 0 && (
            <div className='pt-2'>
              <div className='flex flex-wrap gap-2'>
                {experience.technologies.map((tech) => (
                  <Badge key={tech} variant='secondary' size='sm'>
                    {tech}
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
