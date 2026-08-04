import { forwardRef } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport } from '@/lib/animations'
import { Section, SectionProps } from '@/components/ui/Section'
import { useReducedMotion } from '@/hooks'

export interface AnimatedSectionProps {
  className?: string
  children?: React.ReactNode
  variants?: Variants
  delay?: number
  duration?: number
  once?: boolean
  initial?: string
  animate?: string
  exit?: string
  spacing?: SectionProps['spacing']
  background?: SectionProps['background']
  withContainer?: SectionProps['withContainer']
  containerPadding?: SectionProps['containerPadding']
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  (
    {
      className,
      children,
      variants,
      delay = 0,
      duration,
      once = true,
      initial = 'hidden',
      animate = 'visible',
      exit = 'exit',
      spacing = 'md',
      background = 'default',
      withContainer = true,
      containerPadding = 'md',
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const transition: MotionProps['transition'] = duration !== undefined ? { duration, delay } : { delay }

    if (prefersReducedMotion) {
      return (
        <motion.section
          ref={ref}
          className={cn(className)}
          initial="visible"
          animate="visible"
        >
          <Section
            spacing={spacing}
            background={background}
            withContainer={withContainer}
            containerPadding={containerPadding}
          >
            {children}
          </Section>
        </motion.section>
      )
    }

    return (
      <motion.section
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        viewport={once ? (defaultViewport as any) : undefined}
      >
        <Section
          spacing={spacing}
          background={background}
          withContainer={withContainer}
          containerPadding={containerPadding}
        >
          {children}
        </Section>
      </motion.section>
    )
  }
)

AnimatedSection.displayName = 'AnimatedSection'
