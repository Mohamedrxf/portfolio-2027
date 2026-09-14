import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Header } from './Header';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ header, footer, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen flex flex-col bg-[#0C0C0C] text-[#D7E2EA] overflow-x-hidden',
          className
        )}
        {...props}
      >
        <SmoothScrollProvider>
          {header ?? <Header sticky />}
          <main className="flex-1">{children}</main>
          {footer}
        </SmoothScrollProvider>
      </div>
    );
  }
);

Layout.displayName = 'Layout';
