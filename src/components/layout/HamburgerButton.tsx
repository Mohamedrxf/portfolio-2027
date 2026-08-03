import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface HamburgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean
  controls?: string
}

export const HamburgerButton = forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  ({ isOpen = false, controls, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        aria-controls={controls}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-md',
          'text-[var(--color-text-primary)]',
          'hover:bg-[var(--color-surface-elevated)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            // Close icon (X)
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            // Hamburger icon
            <>
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </>
          )}
        </svg>
      </button>
    )
  }
)

HamburgerButton.displayName = 'HamburgerButton'