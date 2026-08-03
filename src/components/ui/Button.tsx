import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { spacing, borders } from '@/lib/constants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      primary: 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)]',
      secondary: 'bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary-hover)] focus:ring-[var(--color-secondary)]',
      outline: 'border-2 border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] focus:ring-[var(--color-border)]',
      ghost: 'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] focus:ring-[var(--color-surface)]',
    }

    const sizeStyles = {
      sm: `px-3 py-1.5 text-sm rounded-[${borders.radius.md}]`,
      md: `px-4 py-2 text-base rounded-[${borders.radius.base}]`,
      lg: `px-6 py-3 text-lg rounded-[${borders.radius.lg}]`,
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      >
        {leftIcon && <span style={{ marginRight: spacing[2] }}>{leftIcon}</span>}
        {loading ? 'Loading...' : children}
        {rightIcon && <span style={{ marginLeft: spacing[2] }}>{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
