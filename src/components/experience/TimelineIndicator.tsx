import { motion } from 'framer-motion'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

interface TimelineIndicatorProps {
  isActive: boolean
}

export const TimelineIndicator = ({ isActive }: TimelineIndicatorProps) => {
  return (
    <motion.div
      className={`
        w-4 h-4 rounded-full
        bg-[var(--color-primary)] border-4 border-[var(--color-surface)]
        transition-all duration-500 ease-out
        ${isActive ? 'z-10' : 'z-0'}
      `}
      initial={false}
      animate={{
        scale: isActive ? 1.5 : 1,
        boxShadow: isActive ? '0 0 20px var(--color-primary), 0 0 40px var(--color-primary)/50' : 'none',
      }}
      transition={{
        duration: ANIMATION_CONSTANTS.duration.normal,
        ease: ANIMATION_CONSTANTS.easing.easeOut,
      }}
      aria-hidden="true"
    />
  )
}
