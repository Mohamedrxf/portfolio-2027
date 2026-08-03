import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ fluid = false, padding = 'md', className, children, ...props }, ref) => {
    const maxWidthStyles = fluid
      ? 'max-w-none'
      : 'max-w-[var(--container-sm)] sm:max-w-[var(--container-md)] md:max-w-[var(--container-lg)] lg:max-w-[var(--container-xl)] xl:max-w-[var(--container-2xl)]'

    const paddingStyles = {
      none: 'px-0',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          maxWidthStyles,
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'
