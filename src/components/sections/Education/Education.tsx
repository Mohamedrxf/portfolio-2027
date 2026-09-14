import { useMemo } from 'react';
import { useEducation } from '@/hooks';
import { Reveal } from '@/components/animations/Reveal';

export const Education = () => {
  const { education } = useEducation();
  const items = useMemo(() => {
    return [...education].sort((a: any, b: any) => {
      const sa = a.startDate || '';
      const sb = b.startDate || '';
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
  }, [education]);

  return (
    <section id="education" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <Reveal direction="up" distance={24}>
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  Education / 07
                </span>
              </span>
              <h2 className="display-type text-white leading-none">Education</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-[var(--color-border)]">
              {items.map((edu, index) => (
                <EducationRow key={edu.id} edu={edu} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function EducationRow({ edu, index }: { edu: any; index: number }) {
  return (
    <Reveal direction="up" distance={20} delay={index * 0.05}>
      <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 items-start py-8 border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/30 transition-colors">
        <div className="md:col-span-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="md:col-span-7">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-[var(--color-cyan)] transition-colors">
            {edu.degree}
          </h3>
          {edu.field && (
            <p className="text-[var(--color-text-secondary)] mt-1 text-lg">{edu.field}</p>
          )}
          <p className="text-[var(--color-text-tertiary)] text-sm mt-2">
            {edu.institution} · {edu.location}
          </p>
          {edu.description && (
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mt-4 max-w-2xl">
              {edu.description}
            </p>
          )}
          {edu.achievements && edu.achievements.length > 0 && (
            <div className="mt-4 space-y-2">
              {edu.achievements.map((a: string, i: number) => (
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
        </div>
        <div className="md:col-span-3 flex md:justify-end flex-col items-start md:items-end gap-2">
          {edu.gpa && <span className="text-xl font-black text-white">{edu.gpa}</span>}
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
            {edu.date}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
