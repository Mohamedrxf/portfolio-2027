import { HeroScene } from '@/components/three';
import { HeroContent } from './HeroContent';

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] scroll-mt-16"
      aria-label="Hero section"
    >
      {/* 3D cinematic environment — portrait + network live inside the scene */}
      <div className="absolute inset-0 z-[var(--z-index-hero-scene)]">
        <HeroScene portraitSrc="/assets/images/hero/portrait.jpg" />
      </div>

      {/* Atmospheric depth layers */}
      <div
        className="absolute inset-0 z-[var(--z-index-hero-scene)] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 62% 48%, transparent 0%, rgba(12,12,12,0.55) 55%, rgba(12,12,12,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-text-primary) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-[var(--z-index-hero-content)] min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8 lg:py-0">
            <HeroContent />
          </div>
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-10">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-tertiary)] tracking-[0.2em] uppercase">
            <span className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60 animate-ping"
                  style={{ animationDuration: '2.4s' }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              Available for work
            </span>
            <span className="hidden sm:inline-flex items-center gap-2">
              <span>Chennai, India</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]" />
              <span>GMT+5:30</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-index-hero-content)] pointer-events-none">
        <div className="flex flex-col items-center gap-3 text-[var(--color-text-tertiary)]">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--color-cyan)] via-[var(--color-accent)] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
