import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport, ViewportConfig } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export interface FadeProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  delay?: number
  duration?: number
  once?: boolean
  viewport?: ViewportConfig
  from?: number
  to?: number
}

export const Fade = forwardRef<HTMLDivElement, FadeProps>(
  (
    {
      as = 'div',
      from = 0,
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

    const variants: Variants = {
      hidden: { opacity: from },
      visible: { opacity: to },
      exit: { opacity: from },
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

Fade.displayName = 'Fade'
