import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export interface AnimatedContainerProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
  variants?: Variants
  delay?: number
  duration?: number
  once?: boolean
  initial?: string
  animate?: string
  exit?: string
  style?: React.CSSProperties
}

export const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  (
    {
      as = 'div',
      className,
      children,
      variants,
      delay = 0,
      duration,
      once = true,
      initial = 'hidden',
      animate = 'visible',
      exit = 'exit',
      style,
    },
    ref
  ) => {
    const MotionComponent = motion[as as keyof typeof motion] as any
    const prefersReducedMotion = useReducedMotion()

    const transition: MotionProps['transition'] = duration !== undefined ? { duration, delay } : { delay }

    if (prefersReducedMotion) {
      return (
        <motion.div
          ref={ref}
          className={cn(className)}
          initial="visible"
          animate="visible"
          style={style}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <MotionComponent
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        viewport={once ? (defaultViewport as any) : undefined}
        style={style}
      >
        {children}
      </MotionComponent>
    )
  }
)

AnimatedContainer.displayName = 'AnimatedContainer'
