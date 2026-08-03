import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full'

    const variantStyles = {
      primary: 'bg-[var(--color-primary)] text-[var(--color-text-inverse)]',
      secondary: 'bg-[var(--color-secondary)] text-[var(--color-text-inverse)]',
      success: 'bg-[var(--color-success)] text-[var(--color-text-inverse)]',
      warning: 'bg-[var(--color-warning)] text-[var(--color-text-inverse)]',
      danger: 'bg-[var(--color-error)] text-[var(--color-text-inverse)]',
      outline: 'bg-transparent border-2 border-[var(--color-border)] text-[var(--color-text-primary)]',
    }

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
