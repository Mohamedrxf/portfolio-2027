import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { Card, CardProps } from '@/components/ui/Card'
import { defaultViewport, fade, fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export type AnimatedCardVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'

export interface AnimatedCardProps {
  variant?: AnimatedCardVariant
  className?: string
  children?: React.ReactNode
  delay?: number
  duration?: number
  once?: boolean
  customVariants?: Variants
  header?: React.ReactNode
  footer?: React.ReactNode
  cardVariant?: CardProps['variant']
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      variant = 'fade',
      className,
      children,
      delay = 0,
      duration,
      once = true,
      customVariants,
      header,
      footer,
      cardVariant = 'default',
    },
    ref
  ) => {
    const MotionCard = motion(Card)
    const prefersReducedMotion = useReducedMotion()

    const getVariants = (): Variants => {
      if (customVariants) return customVariants

      switch (variant) {
        case 'fade':
          return fade
        case 'slide-up':
          return fadeUp
        case 'slide-down':
          return fadeDown
        case 'slide-left':
          return fadeLeft
        case 'slide-right':
          return fadeRight
        case 'scale':
          return scaleIn
        default:
          return fade
      }
    }

    const transition: MotionProps['transition'] = duration !== undefined ? { duration, delay } : { delay }

    if (prefersReducedMotion) {
      return (
        <MotionCard
          ref={ref}
          className={className}
          variant={cardVariant}
          header={header}
          footer={footer}
          initial="visible"
          animate="visible"
        >
          {children}
        </MotionCard>
      )
    }

    return (
      <MotionCard
        ref={ref}
        className={className}
        variant={cardVariant}
        header={header}
        footer={footer}
        variants={getVariants()}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transition}
        viewport={once ? (defaultViewport as any) : undefined}
      >
        {children}
      </MotionCard>
    )
  }
)

AnimatedCard.displayName = 'AnimatedCard'
