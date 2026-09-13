import { useMemo } from 'react';
import { usePortfolio } from '@/hooks';
import { MagneticButton } from '@/components/animations';

const heroGradient = 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)';

export const HeroContent = () => {
  const { personalInfo, highlights, stats } = usePortfolio();

  const techChips = useMemo(() => highlights.slice(0, 4), [highlights]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
      {/* Tagline */}
      <div className="flex items-center gap-3 mb-8">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-cyan)] opacity-60 animate-ping"
            style={{ animationDuration: '2s' }}
          />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-cyan)]" />
        </span>
        <p className="text-[var(--color-cyan)] font-mono text-sm tracking-[0.2em] uppercase">
          {personalInfo.tagline}
        </p>
        <span className="hidden sm:inline-block h-px flex-1 max-w-[120px] bg-[var(--color-border)]" />
      </div>

      {/* Hero title */}
      <h1
        className="font-[var(--font-family-display)] font-black tracking-tight text-white leading-[0.92] mb-6"
        style={{
          fontSize: 'var(--font-size-hero)',
          background: heroGradient,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {personalInfo.name.split(' ').map((word, i) => (
          <span key={i} className="inline-block">
            {word}
          </span>
        ))}
      </h1>

      {/* Role + domain */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <p className="text-[var(--color-text-secondary)] text-xl sm:text-2xl md:text-3xl font-light tracking-tight">
          {personalInfo.role}
        </p>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
        <div className="flex flex-wrap gap-2">
          {['Networking', 'Cybersecurity', 'Distributed Systems'].map((d) => (
            <span
              key={d}
              className="text-xs sm:text-sm font-mono tracking-[0.15em] uppercase text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-3 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
        {personalInfo.bio}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {techChips.map((chip) => (
          <span
            key={chip.title}
            className="text-xs font-mono tracking-wide text-[var(--color-text-secondary)] border border-[var(--color-border)] px-3 py-1.5 rounded-full bg-[var(--color-surface)]/50"
          >
            {chip.badge}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <MagneticButton
          variant="primary"
          size="lg"
          onClick={() =>
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="View my projects"
          className="px-8 py-4 text-base font-semibold rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 transition-all shadow-[var(--shadow-primary)]"
        >
          View My Work
        </MagneticButton>
        <MagneticButton
          variant="outline"
          size="lg"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Contact me"
          className="px-8 py-4 text-base font-semibold rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all"
        >
          Contact Me
        </MagneticButton>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--color-text-tertiary)]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
            {personalInfo.availability}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
            {personalInfo.location}
          </span>
        </div>
        <div className="flex items-center gap-6">
          {stats.slice(0, 2).map((s) => (
            <span key={s.label} className="flex items-center gap-2">
              <span className="text-[var(--color-text-primary)] font-bold">{s.value}</span>
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
