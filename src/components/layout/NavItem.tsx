import { forwardRef, HTMLAttributes, ElementRef } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface NavItemProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

export const NavItem = forwardRef<ElementRef<typeof NavLink>, NavItemProps>(
  ({ to, label, icon, onClick, className, ...props }, ref) => {
    return (
      <NavLink
        ref={ref}
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            'relative px-3 py-2 text-sm font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
            'rounded-md',
            isActive
              ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]',
            className
          )
        }
        {...props}
      >
        {({ isActive }) => (
          <span className="flex items-center gap-2">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-full" />
            )}
          </span>
        )}
      </NavLink>
    )
  }
)

NavItem.displayName = 'NavItem'