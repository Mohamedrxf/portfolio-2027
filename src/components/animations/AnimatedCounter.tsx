import { forwardRef, useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

export interface AnimatedCounterProps {
  value: number | string
  duration?: number
  delay?: number
  className?: string
  suffix?: string
  prefix?: string
}

export const AnimatedCounter = forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  (
    {
      value,
      duration = 2,
      delay = 0,
      className,
      suffix = '',
      prefix = '',
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<number | string>(0)
    const prefersReducedMotion = useReducedMotion()
    const localRef = useRef<HTMLSpanElement>(null)
    const isInView = useInView(localRef, { once: true })

    const numericValue = typeof value === 'string' ? parseInt(value, 10) : value
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
      duration: duration * 1000,
      bounce: 0,
    })

    const display = useTransform(springValue, (latest) => {
      return Math.round(latest).toLocaleString()
    })

    useEffect(() => {
      if (prefersReducedMotion) {
        setDisplayValue(numericValue)
        return
      }

      if (isInView) {
        motionValue.set(numericValue)
      }
    }, [isInView, motionValue, numericValue, prefersReducedMotion])

    useEffect(() => {
      const unsubscribe = display.on('change', (latest) => {
        setDisplayValue(latest)
      })
      return () => unsubscribe()
    }, [display])

    if (prefersReducedMotion) {
      return (
        <span ref={ref} className={className}>
          {prefix}{numericValue}{suffix}
        </span>
      )
    }

    return (
      <motion.span
        ref={ref || localRef}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay }}
      >
        {prefix}{displayValue}{suffix}
      </motion.span>
    )
  }
)

AnimatedCounter.displayName = 'AnimatedCounter'
