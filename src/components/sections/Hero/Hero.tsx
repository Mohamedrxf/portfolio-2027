import { HeroScene } from '@/components/three';
import { ScrollIndicator } from '@/components/ui';
import { HeroContent } from './HeroContent';
import { HeroNavbar } from './HeroNavbar';
import { HeroBottomBar } from './HeroBottomBar';
import { HeroPortrait } from './HeroPortrait';

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen overflow-x-hidden overflow-y-hidden bg-[#0C0C0C] scroll-mt-16"
      aria-label="Hero section"
    >
      {/* 3D cinematic environment — subtle network topology + floating geometry
          remains fully behind typography as atmospheric depth. */}
      <div className="absolute inset-0 z-[var(--z-index-hero-scene)]">
        <HeroScene portraitSrc="/assets/images/hero/portrait.jpg" />
      </div>

      {/* Atmospheric depth layers — restrained vignette + micro grid.
          No additional gradients; preserves the 3D scene while deepening
          the edges so typography retains full contrast. */}
      <div
        className="absolute inset-0 z-[var(--z-index-hero-scene)] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(12,12,12,0.4) 55%, rgba(12,12,12,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D7E2EA 1px, transparent 1px),
              linear-gradient(to bottom, #D7E2EA 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Hero navbar */}
      <HeroNavbar />

      {/* Central composition: Grid layout for clear typographic hierarchy.
          Desktop — two-column (typography | portrait) editorial split.
          Tablet/Mobile — single column, natural vertical stack. */}
      <div className="relative z-[var(--z-index-hero-content)] h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24 items-center w-full">
              {/* Left: Typography block (metadata → name → CTA) */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <HeroContent />
              </div>

              {/* Right: Portrait — bounded, self-contained visual on desktop.
                  On mobile the portrait renders inside HeroContent per the stack. */}
              <div className="hidden lg:flex justify-end">
                <div className="pt-16">
                  <HeroPortrait />
                </div>
              </div>
            </div>
          </div>
        </div>

        <HeroBottomBar />

        {/* Scroll indicator — bottom center, smooth scroll to next section */}
        <div className="pb-6 flex justify-center">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
};

export default Hero;
