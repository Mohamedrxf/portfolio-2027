import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  align?: 'left' | 'center' | 'right'
  subtitle?: string
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 1,
      size,
      align = 'left',
      subtitle,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const defaultSizeForLevel: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base',
    }

    const sizeStyles: Record<string, string> = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    }

    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    const appliedSize = size ? sizeStyles[size] : defaultSizeForLevel[level]

    const HeadingTag = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : level === 4 ? 'h4' : level === 5 ? 'h5' : 'h6'

    return (
      <div className={cn('space-y-2', className)}>
        <HeadingTag
          ref={ref}
          className={cn(
            'font-bold text-[var(--color-text-primary)]',
            appliedSize,
            alignStyles[align]
          )}
          {...props}
        >
          {children}
        </HeadingTag>
        {subtitle && (
          <p
            className={cn(
              'text-[var(--color-text-secondary)]',
              alignStyles[align],
              level === 1 ? 'text-lg' : level === 2 ? 'text-base' : 'text-sm'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    )
  }
)

Heading.displayName = 'Heading'
