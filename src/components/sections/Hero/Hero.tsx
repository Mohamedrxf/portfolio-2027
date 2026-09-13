import { HeroScene } from '@/components/three';
import { HeroContent } from './HeroContent';
import { HeroImage } from './HeroImage';
import { HeroStats } from './HeroStats';

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] scroll-mt-16"
      aria-label="Hero section"
    >
      {/* 3D background scene */}
      <div className="absolute inset-0 z-[var(--z-index-hero-scene)]">
        <HeroScene />
      </div>

      {/* Subtle vignette + grid overlay */}
      <div
        className="absolute inset-0 z-[var(--z-index-hero-scene)] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(12,12,12,0.7) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-text-primary) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[var(--z-index-hero-content)] min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <HeroContent />
              </div>
              <div className="order-1 lg:order-2">
                <HeroImage />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-8">
          <HeroStats />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-index-hero-content)] pointer-events-none">
        <div className="flex flex-col items-center gap-2 text-[var(--color-text-tertiary)]">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--color-accent)] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
