import { HeroScene } from '@/components/three';
import { HeroContent } from './HeroContent';
import { HeroNavbar } from './HeroNavbar';
import { HeroBottomBar } from './HeroBottomBar';

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen overflow-x-hidden overflow-y-hidden bg-[#0C0C0C] scroll-mt-16"
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
              'radial-gradient(ellipse at 50% 45%, transparent 0%, rgba(12,12,12,0.45) 50%, rgba(12,12,12,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D7E2EA 1px, transparent 1px),
              linear-gradient(to bottom, #D7E2EA 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Minimal hero navbar */}
      <HeroNavbar />

      {/* Central composition: portrait + typography */}
      <div className="relative z-[var(--z-index-hero-content)] h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <HeroContent />
          </div>
        </div>

        <HeroBottomBar />
      </div>
    </section>
  );
};

export default Hero;
