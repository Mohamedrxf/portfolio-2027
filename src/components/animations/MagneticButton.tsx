/**
 * MagneticButton Component
 * 
 * A button with a subtle magnetic effect that follows the cursor.
 * Only applies to important CTAs to avoid overwhelming the interface.
 * Disabled on touch devices and when reduced motion is preferred.
 */

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMagnetic } from '@/hooks'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

export interface MagneticButtonProps extends Omit<HTMLMotionProps<'button'>, 'whileHover' | 'whileTap'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  strength?: number
  disabled?: boolean
  fullWidth?: boolean
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      strength,
      disabled: buttonDisabled,
      fullWidth = false,
      ...props
    },
    externalRef
  ) => {
    const magneticRef = useMagnetic({
      strength: strength || ANIMATION_CONSTANTS.magnetic.strength,
      disabled: buttonDisabled,
    })

    const variants = {
      primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]',
      secondary: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)]',
      outline: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <motion.button
        ref={(node) => {
          magneticRef.current = node
          if (typeof externalRef === 'function') {
            externalRef(node)
          } else if (externalRef) {
            externalRef.current = node
          }
        }}
        className={cn(
          'relative inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
          variants[variant],
          sizes[size],
          widthClass,
          buttonDisabled && 'opacity-50 cursor-not-allowed',
          // Magnetic effect styles
          'transform-gpu',
          'style-magnetic',
          className
        )}
        style={{
          transform: `translate(var(--magnetic-x, 0px), var(--magnetic-y, 0px))`,
          transition: `transform ${ANIMATION_CONSTANTS.magnetic.damping}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
        disabled={buttonDisabled}
        whileHover={{ scale: buttonDisabled ? 1 : 1.05 }}
        whileTap={{ scale: buttonDisabled ? 1 : 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

MagneticButton.displayName = 'MagneticButton'

