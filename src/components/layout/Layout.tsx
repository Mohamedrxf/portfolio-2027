import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ header, footer, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('min-h-screen flex flex-col', className)}
        {...props}
      >
        {header && <header>{header}</header>}
        <main className="flex-1">{children}</main>
        {footer && <footer>{footer}</footer>}
      </div>
    )
  }
)

Layout.displayName = 'Layout'
