import { useMemo } from 'react';
import { usePortfolio } from '@/hooks';
import { MagneticButton } from '@/components/animations';

const heroGradient = 'linear-gradient(180deg, #F4F7FB 0%, #9FB2C8 55%, #5E6B7C 100%)';

export const HeroContent = () => {
  const { personalInfo, highlights } = usePortfolio();

  const techChips = useMemo(() => highlights.slice(0, 4), [highlights]);

  const domains = ['Networking', 'Cybersecurity', 'Distributed Systems'];

  return (
    <div className="relative min-h-screen flex flex-col justify-center w-full">
      {/* Tagline + meta row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-7">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-cyan)] opacity-60 animate-ping"
              style={{ animationDuration: '2.4s' }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-cyan)]" />
          </span>
          <p className="text-[var(--color-cyan)] font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
            {personalInfo.tagline}
          </p>
        </div>
        <span className="hidden sm:block h-px flex-1 max-w-[220px] bg-gradient-to-r from-[var(--color-border)] to-transparent" />
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[var(--color-text-tertiary)]">
          Software Engineering Portfolio / 2027
        </span>
      </div>

      {/* Massive name — cinematic hero type */}
      <h1
        className="font-[var(--font-family-display)] font-black tracking-tight text-white leading-[0.88] mb-8"
        style={{
          fontSize: 'var(--font-size-hero-lg)',
          background: heroGradient,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 30px rgba(0,0,0,0.35))',
        }}
      >
        {personalInfo.name.split(' ').map((word, i) => (
          <span key={i} className="inline-block">
            {word}
          </span>
        ))}
      </h1>

      {/* Identity positioning line */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-10">
        <p className="text-[var(--color-text-secondary)] text-xl sm:text-2xl md:text-3xl font-light tracking-tight">
          {personalInfo.role}
        </p>
        <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
        <div className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <span
              key={d}
              className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-3 py-1.5"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Bio + tech chips */}
      <div className="max-w-3xl mb-12">
        <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed mb-8">
          {personalInfo.bio}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {techChips.map((chip) => (
            <span
              key={chip.title}
              className="text-xs font-mono tracking-wide text-[var(--color-text-secondary)] border border-[var(--color-border)] px-3 py-1.5 bg-[var(--color-surface)]/40"
            >
              {chip.badge}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <MagneticButton
          variant="primary"
          size="lg"
          onClick={() =>
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="View my projects"
          className="px-9 py-4 text-base font-semibold bg-[var(--color-text-primary)] text-[var(--color-bg)] hover:bg-[var(--color-cyan)] transition-colors"
        >
          View My Work
        </MagneticButton>
        <MagneticButton
          variant="outline"
          size="lg"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Contact me"
          className="px-9 py-4 text-base font-semibold border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] transition-colors"
        >
          Contact Me
        </MagneticButton>
      </div>
    </div>
  );
};

export default HeroContent;
