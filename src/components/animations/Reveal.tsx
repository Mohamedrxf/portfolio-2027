import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport, ViewportConfig } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export type RevealDirection = 'up' | 'down' | 'left' | 'right'

export interface RevealProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  direction?: RevealDirection
  distance?: number
  delay?: number
  duration?: number
  once?: boolean
  viewport?: ViewportConfig
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  (
    {
      as = 'div',
      direction = 'up',
      distance = 30,
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
        hidden: {
          opacity: 0,
          ...directionMap[direction],
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
        },
        exit: {
          opacity: 0,
          ...directionMap[direction],
        },
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

Reveal.displayName = 'Reveal'
