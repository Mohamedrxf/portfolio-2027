import { forwardRef, ButtonHTMLAttributes } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

export interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ label = 'Toggle theme', className, ...props }, ref) => {
    const { theme, toggleTheme } = useTheme()

    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        aria-label={label}
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-lg',
          'bg-[var(--color-surface)] border border-[var(--color-border)]',
          'text-[var(--color-text-primary)]',
          'hover:bg-[var(--color-surface-elevated)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {theme === 'light' ? (
          // Moon icon for light mode (switch to dark)
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
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          // Sun icon for dark mode (switch to light)
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
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </button>
    )
  }
)

ThemeToggle.displayName = 'ThemeToggle'