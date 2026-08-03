import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { NavItem } from './NavItem'
import { navigationConfig } from '@/router'

export interface NavigationProps extends HTMLAttributes<HTMLElement> {
  items?: typeof navigationConfig
}

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ items = navigationConfig, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('flex items-center space-x-1', className)}
        aria-label="Main navigation"
        {...props}
      >
        {items.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>
    )
  }
)

Navigation.displayName = 'Navigation'
