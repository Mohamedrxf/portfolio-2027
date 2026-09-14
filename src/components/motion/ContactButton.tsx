import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * ContactButton
 *
 * Reusable pill-shaped CTA matching the MotionSites reference.
 *
 * - Rounded pill
 * - Reference purple/magenta/orange gradient treatment integrated into the
 *   portfolio palette
 * - Text: CONTACT ME
 * - Used in Hero / About / Contact where appropriate
 */
export interface ContactButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
  label?: string;
  variant?: 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const GRADIENT = 'linear-gradient(120deg, #7C3AED 0%, #D946EF 45%, #F97316 100%)';

export const ContactButton = forwardRef<HTMLButtonElement, ContactButtonProps>(
  (
    {
      onClick,
      href,
      className,
      label = 'CONTACT ME',
      variant = 'gradient',
      size = 'md',
    }: ContactButtonProps,
    ref
  ) => {
    const sizes = {
      sm: 'px-5 py-2 text-xs',
      md: 'px-7 py-3 text-sm',
      lg: 'px-9 py-4 text-base',
    };

    const baseClass = cn(
      'inline-flex items-center justify-center gap-2.5 rounded-full font-medium uppercase tracking-widest transition-all duration-300',
      sizes[size],
      variant === 'gradient'
        ? 'text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.03]'
        : 'border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10',
      className
    );

    const style = variant === 'gradient' ? { background: GRADIENT } : undefined;

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          style={style}
        >
          {label}
        </a>
      );
    }

    return (
      <button ref={ref} type="button" onClick={onClick} className={baseClass} style={style}>
        {label}
      </button>
    );
  }
);

ContactButton.displayName = 'ContactButton';
