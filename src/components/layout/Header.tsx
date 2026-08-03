import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui'
import { Navigation } from './Navigation'
import { MobileNavigation } from './MobileNavigation'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean
  logo?: React.ReactNode
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ sticky = false, logo, className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'w-full bg-[var(--color-surface)] border-b border-[var(--color-border)]',
          sticky && 'sticky top-0 z-[var(--z-index-sticky)]',
          className
        )}
        {...props}
      >
        <div className="max-w-[var(--container-xl)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo placeholder */}
            {logo ? (
              <div className="flex-shrink-0">{logo}</div>
            ) : (
              <div className="flex-shrink-0 w-32 h-8 bg-[var(--color-border)] rounded" />
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <Navigation />
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <MobileNavigation />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    )
  }
)

Header.displayName = 'Header'
