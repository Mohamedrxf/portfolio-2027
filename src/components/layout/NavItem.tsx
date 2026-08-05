import { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface NavItemProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ to, label, icon, onClick, className, ...props }, ref) => {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
        if (to.startsWith('#')) {
          const sectionId = to.substring(1)
          const section = document.getElementById(sectionId)
          if (section) {
            const rect = section.getBoundingClientRect()
            const isActive = rect.top <= 100 && rect.bottom >= 100
            setIsActive(isActive)
          }
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Initial check

      return () => window.removeEventListener('scroll', handleScroll)
    }, [to])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (to.startsWith('#')) {
        const sectionId = to.substring(1)
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }
      onClick?.()
    }

    return (
      <a
        ref={ref}
        href={to}
        onClick={handleClick}
        className={cn(
          'relative px-3 py-2 text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
          'rounded-md cursor-pointer',
          isActive
            ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]',
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {label}
          {isActive && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-full" />
          )}
        </span>
      </a>
    )
  }
)

NavItem.displayName = 'NavItem'