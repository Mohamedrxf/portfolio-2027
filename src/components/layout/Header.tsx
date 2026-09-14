import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ sticky = false, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'w-full transition-all duration-500',
          sticky
            ? 'sticky top-0 z-[var(--z-index-sticky)] bg-[var(--color-bg)]/70 backdrop-blur-xl border-b border-transparent hover:border-[var(--color-border)]'
            : 'bg-transparent border-b border-transparent',
          className
        )}
        {...props}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo — minimal monogram */}
            <a href="#home" className="flex-shrink-0 flex items-center gap-3 group">
              <span className="font-[var(--font-family-display)] font-black text-lg tracking-tight text-white">
                MRK
              </span>
              <span className="hidden md:block text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-text-tertiary)] group-hover:text-[var(--color-cyan)] transition-colors">
                Mohamed Rafeeq Khan
              </span>
            </a>

            {/* Desktop Navigation — minimal */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <Navigation />
            </div>

            {/* Right side — minimal */}
            <div className="flex items-center gap-4">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';
