import { useMemo } from 'react';
import { useCertifications } from '@/hooks';
import { Reveal } from '@/components/animations/Reveal';

export const Certifications = () => {
  const { certifications } = useCertifications();

  const sorted = useMemo(
    () => [...certifications].sort((a, b) => a.title.localeCompare(b.title)),
    [certifications]
  );

  return (
    <section id="certifications" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <Reveal direction="up" distance={24}>
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  Credentials / 06
                </span>
              </span>
              <h2 className="display-type text-white leading-none">Certifications</h2>
              <p className="text-[var(--color-text-secondary)] mt-8 text-lg leading-relaxed">
                Industry-recognized credentials across networking, cloud, security, and development.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-[var(--color-border)]">
              {sorted.map((cert, index) => (
                <CertificationRow key={cert.id} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function CertificationRow({ cert, index }: { cert: any; index: number }) {
  return (
    <Reveal direction="up" distance={20} delay={index * 0.05}>
      <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-7 border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/30 transition-colors">
        <div className="md:col-span-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="md:col-span-5">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[var(--color-cyan)] transition-colors">
            {cert.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{cert.organization}</p>
        </div>
        <div className="md:col-span-3">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
            {cert.category}
          </span>
        </div>
        <div className="md:col-span-2 flex md:justify-end">
          {cert.url ? (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors flex items-center gap-2"
            >
              Verify
              <span className="text-[var(--color-text-tertiary)]">↗</span>
            </a>
          ) : (
            <span className="text-sm text-[var(--color-text-tertiary)]">{cert.date}</span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
