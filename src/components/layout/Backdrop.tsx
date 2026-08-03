import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  onClick?: () => void
}

export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  ({ isOpen = false, onClick, className, ...props }, ref) => {
    if (!isOpen) return null

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 bg-black/50 z-[var(--z-index-modal-backdrop)]',
          'transition-opacity',
          className
        )}
        onClick={onClick}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Backdrop.displayName = 'Backdrop'