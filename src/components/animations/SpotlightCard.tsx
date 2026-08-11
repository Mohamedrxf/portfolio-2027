/**
 * SpotlightCard Component
 * 
 * A card with a pointer spotlight effect that follows the cursor.
 * Uses CSS variables for performance (no React state on every pointermove).
 * Disabled on touch devices and when reduced motion is preferred.
 */

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useSpotlight } from '@/hooks'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: number
  opacity?: number
  disabled?: boolean
}

export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  (
    {
      children,
      className,
      size = ANIMATION_CONSTANTS.spotlight.size,
      opacity = ANIMATION_CONSTANTS.spotlight.opacity,
      disabled: manualDisabled,
      ...props
    },
    externalRef
  ) => {
    const spotlightRef = useSpotlight({
      size,
      opacity,
      disabled: manualDisabled,
    })

    return (
      <div
        ref={(node) => {
          spotlightRef.current = node
          if (typeof externalRef === 'function') {
            externalRef(node)
          } else if (externalRef) {
            externalRef.current = node
          }
        }}
        className={cn(
          'relative overflow-hidden rounded-xl',
          // Spotlight gradient background
          'before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity',
          'before:bg-[radial-gradient(circle_at_var(--spotlight-x)_var(--spotlight-y),var(--spotlight-color),transparent_70%)]',
          'style-spotlight',
          className
        )}
        style={{
          '--spotlight-color': 'rgba(255, 255, 255, 0.1)' as any,
          '--spotlight-size': `${size}px` as any,
          '--spotlight-opacity': opacity.toString() as any,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SpotlightCard.displayName = 'SpotlightCard'
