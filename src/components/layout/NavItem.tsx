import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface NavItemProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ to, label, icon, onClick, className, ...props }, ref) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (to.startsWith('#')) {
          const sectionId = to.substring(1);
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            setIsActive(rect.top <= 120 && rect.bottom >= 120);
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }, [to]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (to.startsWith('#')) {
        const sectionId = to.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
      onClick?.();
    };

    return (
      <a
        ref={ref}
        href={to}
        onClick={handleClick}
        className={cn(
          'relative group px-2 py-2 text-sm font-medium tracking-wide transition-colors duration-300',
          'focus:outline-none focus:text-[var(--color-cyan)]',
          isActive ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white',
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {label}
        </span>
        <span
          className={cn(
            'absolute left-0 bottom-0 h-px bg-[var(--color-cyan)] transition-all duration-300',
            isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
          )}
        />
      </a>
    );
  }
);

NavItem.displayName = 'NavItem';
