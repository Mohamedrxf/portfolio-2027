import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { HeroContent } from './HeroContent'
import { HeroImage } from './HeroImage'
import { HeroStats } from './HeroStats'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero section">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-text-primary) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
        
        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E")'
          }}
        />
        
        {/* Glow accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary)] opacity-10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-secondary)] opacity-10 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <AnimatedSection
        spacing="xl"
        background="default"
        withContainer={true}
        containerPadding="lg"
        className="relative z-10 bg-transparent"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <HeroContent />
          <HeroImage />
        </div>
        <HeroStats />
      </AnimatedSection>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator />
      </div>
    </section>
  )
}
