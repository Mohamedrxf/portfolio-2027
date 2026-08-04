import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport, fade, fadeUp, fadeDown, fadeLeft, fadeRight, staggerContainer, staggerItem } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export type AnimatedTextVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'stagger'

export interface AnimatedTextProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  variant?: AnimatedTextVariant
  delay?: number
  duration?: number
  once?: boolean
  customVariants?: Variants
  staggerChildren?: boolean
}

export const AnimatedText = forwardRef<HTMLParagraphElement, AnimatedTextProps>(
  (
    {
      as = 'p',
      variant = 'fade',
      className,
      children,
      delay = 0,
      duration,
      once = true,
      customVariants,
      staggerChildren = false,
    },
    ref
  ) => {
    const MotionComponent = motion[as as keyof typeof motion] as any
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
        case 'stagger':
          return staggerChildren ? staggerContainer : staggerItem
        default:
          return fade
      }
    }

    const transition: MotionProps['transition'] = duration !== undefined ? { duration, delay } : { delay }

    if (prefersReducedMotion) {
      return (
        <MotionComponent
          ref={ref}
          className={cn(className)}
          initial="visible"
          animate="visible"
        >
          {children}
        </MotionComponent>
      )
    }

    return (
      <MotionComponent
        ref={ref}
        className={cn(className)}
        variants={getVariants()}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transition}
        viewport={once ? defaultViewport : undefined}
      >
        {children}
      </MotionComponent>
    )
  }
)

AnimatedText.displayName = 'AnimatedText'
