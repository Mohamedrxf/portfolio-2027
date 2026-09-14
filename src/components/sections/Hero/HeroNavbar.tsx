import { FadeIn } from '@/components/motion';

/**
 * HeroNavbar
 *
 * Minimal horizontal navbar matching the MotionSites reference structure:
 *   About / Work / Experience / Contact
 *
 * Visual behavior:
 * - flex, justify-between
 * - uppercase, tracking-wider, medium weight
 * - color #D7E2EA
 * - responsive typography
 * - px-6, md:px-10
 * - pt-6, md:pt-8
 * - hover opacity 70%
 * - 200ms transition
 */
const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const HeroNavbar = () => {
  return (
    <div className="relative z-[var(--z-index-hero-content)] w-full">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-6 md:pt-8">
        <nav className="flex items-center justify-between" aria-label="Primary">
          <a
            href="#home"
            className="font-[var(--font-family-display)] font-medium text-[#D7E2EA] tracking-wider text-sm md:text-base hover:opacity-70 transition-opacity duration-200"
          >
            MRK
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-[var(--font-family-display)] font-medium text-[#D7E2EA] tracking-wider text-sm hover:opacity-70 transition-opacity duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <FadeIn delay={0.4} duration={0.6} x={20}>
            <span className="hidden sm:inline-flex items-center gap-2 text-[#D7E2EA]/60 text-xs font-mono tracking-[0.2em] uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-60 animate-ping"
                  style={{ animationDuration: '2s' }}
                />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22D3EE]" />
              </span>
              Available
            </span>
          </FadeIn>
        </nav>
      </div>
    </div>
  );
};

export default HeroNavbar;
