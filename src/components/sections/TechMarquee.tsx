import { useMemo } from 'react';
import { useSkills } from '@/hooks';
import { useReducedMotion } from '@/hooks';

const TECH = [
  'JAVA',
  'PYTHON',
  'TYPESCRIPT',
  'REACT',
  'FASTAPI',
  'NODE.JS',
  'POSTGRESQL',
  'DOCKER',
  'AWS',
  'LINUX',
  'NETWORKING',
  'CYBERSECURITY',
  'DISTRIBUTED SYSTEMS',
  'OPEN CV',
  'LLAMA 3',
];

function MarqueeRow({ items, dir }: { items: string[]; dir: 'right' | 'left' }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2">
      <span className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <span className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
      <div
        className={`flex items-center whitespace-nowrap ${dir === 'right' ? 'marquee-track-right-lg' : 'marquee-track-left-lg'}`}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="mx-10 text-[clamp(1.6rem, 3.4vw, 3.4rem)] font-black tracking-tight text-[var(--color-text-primary)] opacity-85 hover:opacity-100 transition-opacity cursor-default"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            {name}
            <span className="mx-10 text-[var(--color-accent)] opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export const TechMarquee = () => {
  const { skills } = useSkills();
  const prefersReducedMotion = useReducedMotion();

  const items = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    skills.forEach((s) => {
      if (!seen.has(s.name)) {
        seen.add(s.name);
        list.push(s.name.toUpperCase());
      }
    });
    return list;
  }, [skills]);

  // Combine real skills with curated highlight terms, deduped
  const combined = useMemo(() => {
    const all = [...items, ...TECH];
    const seen = new Set<string>();
    return all.filter((t) => {
      const k = t.trim();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [items]);

  const mid = Math.ceil(combined.length / 2);
  const row1 = combined.slice(0, mid);
  const row2 = combined.slice(mid);

  return (
    <section
      id="tech"
      className="py-20 md:py-28 bg-[var(--color-bg)] border-y border-[var(--color-border)] overflow-hidden"
      aria-label="Technology stack"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[var(--color-accent)]">
            Technology Stack
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-border)] to-transparent" />
        </div>

        {prefersReducedMotion ? (
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {combined.slice(0, 12).map((t) => (
              <span
                key={t}
                className="text-2xl md:text-3xl font-black text-[var(--color-text-primary)] opacity-70"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          <>
            <MarqueeRow items={row1} dir="right" />
            <MarqueeRow items={row2} dir="left" />
          </>
        )}
      </div>
    </section>
  );
};

export default TechMarquee;
