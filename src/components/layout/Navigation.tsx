import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { NavItem } from './NavItem';

export interface NavigationProps extends HTMLAttributes<HTMLElement> {
  items?: { label: string; path: string }[];
}

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ items, className, ...props }, ref) => {
    const defaultItems = [
      { label: 'About', path: '#about' },
      { label: 'Work', path: '#projects' },
      { label: 'Experience', path: '#experience' },
      { label: 'Contact', path: '#contact' },
    ];

    const navItems = items || defaultItems;

    return (
      <nav
        ref={ref}
        className={cn('flex items-center gap-8', className)}
        aria-label="Main navigation"
        {...props}
      >
        {navItems.map((item) => (
          <NavItem key={item.path} to={item.path} label={item.label} />
        ))}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';
