import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface MainProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

export const Main = forwardRef<HTMLElement, MainProps>(
  ({ spacing = 'md', className, children, ...props }, ref) => {
    const spacingStyles = {
      none: '',
      sm: 'py-4',
      md: 'py-8',
      lg: 'py-12',
    }

    return (
      <main
        ref={ref}
        className={cn(spacingStyles[spacing], className)}
        {...props}
      >
        {children}
      </main>
    )
  }
)

Main.displayName = 'Main'