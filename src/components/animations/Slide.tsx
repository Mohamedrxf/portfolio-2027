import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport, ViewportConfig } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export type SlideDirection = 'left' | 'right' | 'up' | 'down'

export interface SlideProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  direction?: SlideDirection
  distance?: number
  delay?: number
  duration?: number
  once?: boolean
  viewport?: ViewportConfig
}

export const Slide = forwardRef<HTMLDivElement, SlideProps>(
  (
    {
      as = 'div',
      direction = 'up',
      distance = 100,
      className,
      children,
      delay = 0,
      duration = 0.5,
      once = true,
      viewport,
    },
    ref
  ) => {
    const MotionComponent = motion[as as keyof typeof motion] as any
    const prefersReducedMotion = useReducedMotion()

    const getVariants = (): Variants => {
      const directionMap = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
      }

      return {
        hidden: directionMap[direction],
        visible: {
          x: 0,
          y: 0,
        },
        exit: directionMap[direction],
      }
    }

    const transition: MotionProps['transition'] = {
      duration,
      delay,
      ease: [0, 0, 0.2, 1],
    }

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
        viewport={viewport || (once ? defaultViewport : undefined)}
      >
        {children}
      </MotionComponent>
    )
  }
)

Slide.displayName = 'Slide'
