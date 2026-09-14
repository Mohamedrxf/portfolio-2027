import { useMemo } from 'react';
import { useExperience } from '@/hooks';
import { usePortfolio } from '@/hooks';
import { Reveal } from '@/components/animations/Reveal';
import { MagneticButton } from '@/components/animations';

export const Experience = () => {
  const { experiences } = useExperience();
  const { portfolio } = usePortfolio();

  const sorted = useMemo(() => {
    return [...experiences].sort((a: any, b: any) => {
      const sa = a.startDate || '';
      const sb = b.startDate || '';
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
  }, [experiences]);

  return (
    <section id="experience" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <Reveal direction="up" distance={24}>
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  Career / 04
                </span>
              </span>
              <h2 className="display-type text-white leading-none">Experience</h2>
              <p className="text-[var(--color-text-secondary)] mt-8 text-lg leading-relaxed">
                Two internships shaping my engineering practice — from threat-detection ML to
                production full-stack services.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {sorted.map((exp, index) => (
                <ExperienceRow key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal direction="up" distance={20}>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Currently pursuing a Bachelor of Engineering in Computer Science at SRM Easwari
              Engineering College, focusing on software development, networking, and cybersecurity.
            </p>
          </Reveal>
          <MagneticButton
            variant="outline"
            size="md"
            onClick={() => window.open(portfolio.resume, '_blank')}
            className="px-6 py-3 text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] transition-colors flex-shrink-0"
          >
            Download Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

function ExperienceRow({ exp, index }: { exp: any; index: number }) {
  return (
    <Reveal direction="up" distance={24} delay={index * 0.08}>
      <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 border-b border-[var(--color-border)]">
        {/* Left meta */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
            {exp.type}
          </span>
          <span className="text-sm font-mono text-[var(--color-text-secondary)]">{exp.date}</span>
        </div>

        {/* Main content */}
        <div className="lg:col-span-9">
          <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2 mb-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-[var(--color-cyan)] transition-colors">
              {exp.position}
            </h3>
            <span className="text-[var(--color-text-secondary)] text-lg font-light flex-shrink-0">
              {exp.company}
            </span>
          </div>

          <p className="text-[var(--color-text-secondary)] text-base leading-relaxed max-w-3xl mb-5">
            {exp.description}
          </p>

          {/* Achievements */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="mb-5 space-y-2">
              {exp.achievements.map((a: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                >
                  <span className="text-[var(--color-success)] mt-1 flex-shrink-0">▸</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {exp.technologies.map((tech: string) => (
              <span
                key={tech}
                className="text-xs font-mono tracking-wide text-[var(--color-text-tertiary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
