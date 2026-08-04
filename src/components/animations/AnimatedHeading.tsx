import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { Heading, HeadingProps } from '@/components/ui/Heading'
import { defaultViewport, fade, fadeUp, fadeDown, fadeLeft, fadeRight } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export type AnimatedHeadingVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'

export interface AnimatedHeadingProps {
  variant?: AnimatedHeadingVariant
  className?: string
  children?: React.ReactNode
  delay?: number
  duration?: number
  once?: boolean
  customVariants?: Variants
  level?: HeadingProps['level']
  size?: HeadingProps['size']
  align?: HeadingProps['align']
  subtitle?: HeadingProps['subtitle']
}

export const AnimatedHeading = forwardRef<HTMLHeadingElement, AnimatedHeadingProps>(
  (
    {
      variant = 'fade',
      className,
      children,
      delay = 0,
      duration,
      once = true,
      customVariants,
      level = 1,
      size,
      align = 'left',
      subtitle,
    },
    ref
  ) => {
    const MotionHeading = motion(Heading)
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
        default:
          return fade
      }
    }

    const transition: MotionProps['transition'] = duration !== undefined ? { duration, delay } : { delay }

    if (prefersReducedMotion) {
      return (
        <MotionHeading
          ref={ref}
          className={className}
          level={level}
          size={size}
          align={align}
          subtitle={subtitle}
          initial="visible"
          animate="visible"
        >
          {children}
        </MotionHeading>
      )
    }

    return (
      <MotionHeading
        ref={ref}
        className={className}
        level={level}
        size={size}
        align={align}
        subtitle={subtitle}
        variants={getVariants()}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transition}
        viewport={once ? (defaultViewport as any) : undefined}
      >
        {children}
      </MotionHeading>
    )
  }
)

AnimatedHeading.displayName = 'AnimatedHeading'
