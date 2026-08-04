import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport, ViewportConfig } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export interface StaggerContainerProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  stagger?: number
  delayChildren?: number
  delay?: number
  duration?: number
  once?: boolean
  viewport?: ViewportConfig
  customVariants?: Variants
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  (
    {
      as = 'div',
      stagger = 0.1,
      delayChildren = 0,
      className,
      children,
      delay = 0,
      duration,
      once = true,
      viewport,
      customVariants,
    },
    ref
  ) => {
    const MotionComponent = motion[as as keyof typeof motion] as any
    const prefersReducedMotion = useReducedMotion()

    const variants: Variants = customVariants || {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          staggerChildren: stagger,
          staggerDirection: -1,
        },
      },
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

StaggerContainer.displayName = 'StaggerContainer'
