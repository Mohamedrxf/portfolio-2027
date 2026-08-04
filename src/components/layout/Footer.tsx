import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { FooterBrand } from './Footer/FooterBrand'
import { FooterNavigation } from './Footer/FooterNavigation'
import { FooterSocials } from './Footer/FooterSocials'
import { FooterCopyright } from './Footer/FooterCopyright'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  showBrand?: boolean
  showNavigation?: boolean
  showSocials?: boolean
  showCopyright?: boolean
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({
    showBrand = true,
    showNavigation = true,
    showSocials = true,
    showCopyright = true,
    className,
    ...props
  }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'w-full bg-[var(--color-surface)] border-t border-[var(--color-border)]',
          className
        )}
        {...props}
      >
        <div className="max-w-[var(--container-xl)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showBrand && <FooterBrand />}
            {showNavigation && <FooterNavigation />}
            {showSocials && <FooterSocials />}
          </div>
          {showCopyright && <FooterCopyright />}
        </div>
      </footer>
    )
  }
)

Footer.displayName = 'Footer'
