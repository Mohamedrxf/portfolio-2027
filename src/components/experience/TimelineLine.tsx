import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

interface TimelineLineProps {
  totalItems: number
  activeIndex: number
}

export const TimelineLine = ({ totalItems, activeIndex }: TimelineLineProps) => {
  const prefersReducedMotion = useReducedMotion()
  const progress = (activeIndex + 1) / totalItems

  return (
    <div
      className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--color-border)]"
      aria-hidden="true"
    >
      <motion.div
        className={`
          absolute top-0 left-0 w-full
          bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary)]/80 to-[var(--color-primary)]/50
          shadow-[0_0_10px_var(--color-primary)]
        `}
        initial={{ height: 0 }}
        animate={{
          height: prefersReducedMotion ? '100%' : `${progress * 100}%`,
        }}
        transition={{
          duration: ANIMATION_CONSTANTS.duration.slow,
          ease: ANIMATION_CONSTANTS.easing.easeOut,
        }}
      />
    </div>
  )
}
