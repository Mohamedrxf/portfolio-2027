import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui';
import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  logo?: React.ReactNode;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ sticky = false, logo, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl',
          sticky && 'sticky top-0 z-[var(--z-index-sticky)]',
          className
        )}
        {...props}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {logo ? (
              <div className="flex-shrink-0">{logo}</div>
            ) : (
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)] flex items-center justify-center">
                  <span className="text-white font-black text-sm">&lt;/&gt;</span>
                </div>
                <span className="font-[var(--font-family-display)] font-bold text-[var(--color-text-primary)] tracking-tight">
                  MRK
                </span>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <Navigation />
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <MobileNavigation />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';
