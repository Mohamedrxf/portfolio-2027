import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport, ViewportConfig } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export type ScaleDirection = 'in' | 'out'

export interface ScaleProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  direction?: ScaleDirection
  from?: number
  to?: number
  delay?: number
  duration?: number
  once?: boolean
  viewport?: ViewportConfig
}

export const Scale = forwardRef<HTMLDivElement, ScaleProps>(
  (
    {
      as = 'div',
      direction = 'in',
      from,
      to = 1,
      className,
      children,
      delay = 0,
      duration = 0.3,
      once = true,
      viewport,
    },
    ref
  ) => {
    const MotionComponent = motion[as as keyof typeof motion] as any
    const prefersReducedMotion = useReducedMotion()

    const defaultFrom = direction === 'in' ? 0.9 : 1.1
    const scaleFrom = from !== undefined ? from : defaultFrom

    const variants: Variants = {
      hidden: {
        opacity: 0,
        scale: scaleFrom,
      },
      visible: {
        opacity: 1,
        scale: to,
      },
      exit: {
        opacity: 0,
        scale: scaleFrom,
      },
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
        variants={variants}
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

Scale.displayName = 'Scale'
