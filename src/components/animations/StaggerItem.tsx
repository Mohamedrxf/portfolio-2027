import { forwardRef } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'

export interface StaggerItemProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  delay?: number
  duration?: number
  customVariants?: Variants
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  (
    {
      as = 'div',
      className,
      children,
      delay,
      duration,
      customVariants,
    },
    ref
  ) => {
    const MotionComponent = motion[as as keyof typeof motion] as any
    const prefersReducedMotion = useReducedMotion()

    const variants: Variants = customVariants || {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
      },
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
      >
        {children}
      </MotionComponent>
    )
  }
)

StaggerItem.displayName = 'StaggerItem'
