import { forwardRef, useState } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { defaultViewport, fade, scaleIn } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

export interface AnimatedImageProps {
  className?: string
  src?: string
  alt?: string
  delay?: number
  duration?: number
  once?: boolean
  customVariants?: Variants
  fadeIn?: boolean
  scale?: boolean
  lazy?: boolean
}

export const AnimatedImage = forwardRef<HTMLImageElement, AnimatedImageProps>(
  (
    {
      className,
      src,
      alt,
      delay = 0,
      duration,
      once = true,
      customVariants,
      fadeIn = true,
      scale = false,
      lazy = true,
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    const getVariants = (): Variants => {
      if (customVariants) return customVariants

      if (fadeIn && scale) {
        return scaleIn
      }

      if (fadeIn) {
        return fade
      }

      return {}
    }

    const transition: MotionProps['transition'] = duration !== undefined ? { duration, delay } : { delay }

    const MotionImage = motion.img

    if (prefersReducedMotion) {
      return (
        <MotionImage
          ref={ref}
          className={cn(className)}
          src={src}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          initial="visible"
          animate="visible"
          onLoad={() => setIsLoaded(true)}
        />
      )
    }

    return (
      <MotionImage
        ref={ref}
        className={cn(className)}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        variants={getVariants()}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        exit="exit"
        transition={transition}
        viewport={once ? (defaultViewport as any) : undefined}
        onLoad={() => setIsLoaded(true)}
      />
    )
  }
)

AnimatedImage.displayName = 'AnimatedImage'
