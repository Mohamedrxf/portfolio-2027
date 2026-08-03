import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { NavItem } from './NavItem'
import { navigationConfig } from '@/router'

export interface MobileDrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  onClose?: () => void
  items?: typeof navigationConfig
  id?: string
}

export const MobileDrawer = forwardRef<HTMLDivElement, MobileDrawerProps>(
  ({ isOpen = false, onClose, items = navigationConfig, id, className, children, ...props }, ref) => {
    if (!isOpen) return null

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          'fixed inset-y-0 right-0 w-64 max-w-[80vw]',
          'bg-[var(--color-surface)] border-l border-[var(--color-border)]',
          'z-[var(--z-index-modal)]',
          'shadow-lg',
          className
        )}
        {...props}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Navigation
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-2">
              {items.map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={item.icon}
                  onClick={onClose}
                />
              ))}
            </div>
          </nav>

          {/* Custom content slot */}
          {children && (
            <div className="p-4 border-t border-[var(--color-border)]">
              {children}
            </div>
          )}
        </div>
      </div>
    )
  }
)

MobileDrawer.displayName = 'MobileDrawer'