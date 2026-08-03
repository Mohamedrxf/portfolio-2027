import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  copyright?: React.ReactNode
  social?: React.ReactNode
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ copyright, social, className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'w-full bg-[var(--color-surface)] border-t border-[var(--color-border)]',
          className
        )}
        {...props}
      >
        <div className="max-w-[var(--container-xl)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright placeholder */}
            {copyright ? (
              <div className="text-sm text-[var(--color-text-secondary)]">
                {copyright}
              </div>
            ) : (
              <div className="text-sm text-[var(--color-text-secondary)]">
                © 2027 Portfolio. All rights reserved.
              </div>
            )}

            {/* Social placeholder */}
            {social ? (
              <div className="flex items-center space-x-4">{social}</div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-[var(--color-border)] rounded-full" />
                <div className="w-8 h-8 bg-[var(--color-border)] rounded-full" />
                <div className="w-8 h-8 bg-[var(--color-border)] rounded-full" />
              </div>
            )}
          </div>
        </div>
      </footer>
    )
  }
)

Footer.displayName = 'Footer'
