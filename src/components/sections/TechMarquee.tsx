import { useMemo } from 'react';
import { useSkills } from '@/hooks';

function MarqueeRow({ items, dir }: { items: string[]; dir: 'right' | 'left' }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      <span className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <span className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
      <div
        className={`flex items-center gap-8 whitespace-nowrap ${dir === 'right' ? 'marquee-track-right' : 'marquee-track-left'}`}
        style={{ animationDuration: dir === 'right' ? '28s' : '34s' }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-sm font-mono tracking-[0.15em] uppercase text-[var(--color-text-tertiary)] hover:text-[var(--color-cyan)] transition-colors cursor-default"
          >
            {name}
            <span className="mx-8 text-[var(--color-accent)] opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export const TechMarquee = () => {
  const { skills } = useSkills();

  const items = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    skills.forEach((s) => {
      if (!seen.has(s.name)) {
        seen.add(s.name);
        list.push(s.name);
      }
    });
    return list;
  }, [skills]);

  const row1 = useMemo(() => items.slice(0, Math.ceil(items.length / 2)), [items]);
  const row2 = useMemo(() => items.slice(Math.ceil(items.length / 2)), [items]);

  return (
    <section
      id="tech"
      className="py-16 bg-[var(--color-bg)] border-y border-[var(--color-border)] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
            Technology Stack
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>
        <MarqueeRow items={row1} dir="right" />
        <MarqueeRow items={row2} dir="left" />
      </div>
    </section>
  );
};

export default TechMarquee;
