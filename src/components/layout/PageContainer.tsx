import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ maxWidth = 'xl', padding = 'md', className, children, ...props }, ref) => {
    const maxWidthStyles = {
      sm: 'max-w-[var(--container-sm)]',
      md: 'max-w-[var(--container-md)]',
      lg: 'max-w-[var(--container-lg)]',
      xl: 'max-w-[var(--container-xl)]',
      '2xl': 'max-w-[var(--container-2xl)]',
      full: 'max-w-full',
    }

    const paddingStyles = {
      none: '',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto',
          maxWidthStyles[maxWidth],
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

PageContainer.displayName = 'PageContainer'