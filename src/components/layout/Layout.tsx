import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { CursorFollower } from '@/components/animations';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  enableCursor?: boolean;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ header, footer, children, className, enableCursor = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]',
          className
        )}
        {...props}
      >
        {enableCursor && <CursorFollower />}
        <SmoothScrollProvider>
          {header && <header>{header}</header>}
          <main className="flex-1">{children}</main>
          {footer && <footer>{footer}</footer>}
        </SmoothScrollProvider>
      </div>
    );
  }
);

Layout.displayName = 'Layout';
