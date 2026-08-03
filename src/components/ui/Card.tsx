import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'hoverable'
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      header,
      footer,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-lg overflow-hidden'

    const variantStyles = {
      default: 'bg-[var(--color-surface)] border border-[var(--color-border)]',
      outlined: 'bg-[var(--color-surface)] border-2 border-[var(--color-border)]',
      elevated: 'bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-lg',
      hoverable: 'bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-md hover:border-[var(--color-primary)] transition-all cursor-pointer',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {header && (
          <div className="px-6 py-4 border-b border-[var(--color-border)]">
            {header}
          </div>
        )}
        <div className="p-6">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-[var(--color-border)]">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'
