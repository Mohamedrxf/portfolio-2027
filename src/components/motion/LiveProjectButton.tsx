import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * LiveProjectButton
 *
 * Reusable button matching the MotionSites reference visual language.
 *
 * - rounded-full
 * - border-2
 * - border #D7E2EA
 * - text #D7E2EA
 * - uppercase
 * - tracking-widest
 * - font-medium
 * - Hover: background #D7E2EA / 10%
 * - Label: LIVE PROJECT
 *
 * Only rendered when a real project URL exists.
 */
export interface LiveProjectButtonProps {
  href: string;
  className?: string;
  label?: string;
  external?: boolean;
}

export const LiveProjectButton = forwardRef<HTMLAnchorElement, LiveProjectButtonProps>(
  ({ href, className, label = 'LIVE PROJECT', external = true }: LiveProjectButtonProps, ref) => {
    const target = external ? '_blank' : '_self';
    const rel = external ? 'noopener noreferrer' : undefined;

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={cn(
          'inline-flex items-center gap-2.5 rounded-full border-2 px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] border-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10',
          className
        )}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-60 animate-ping"
            style={{ animationDuration: '2s' }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]" />
        </span>
        {label}
      </a>
    );
  }
);

LiveProjectButton.displayName = 'LiveProjectButton';
