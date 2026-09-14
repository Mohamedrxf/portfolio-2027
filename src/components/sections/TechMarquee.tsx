import { forwardRef, useEffect, useRef } from 'react';

/**
 * Scroll-reactive marquee — TWO ROWS.
 *
 * Row 1 moves RIGHT based on page scroll.
 * Row 2 moves LEFT based on page scroll.
 *
 * Offset calculated as:
 *   (window.scrollY - sectionTop + window.innerHeight) * 0.3
 *
 * Uses a passive scroll listener and willChange: transform.
 * Uses seamless repeated arrays.
 */
interface Tile {
  id: string;
  label: string;
  sub?: string;
  accent: string;
}

const TILES: Tile[] = [
  { id: 'os3', label: 'OS3', sub: 'Supply Chain Security', accent: '#F97316' },
  { id: 'uce', label: 'Universal Code Executor', sub: 'Sandboxed Execution', accent: '#22D3EE' },
  { id: 'cityflow', label: 'CityFlow', sub: 'Intelligent Traffic', accent: '#3B82F6' },
  { id: 'portfolio', label: 'Portfolio', sub: '3D Network Env', accent: '#8B5CF6' },
  { id: 'java', label: 'Java', sub: 'Backend Systems', accent: '#FBBF24' },
  { id: 'react', label: 'React', sub: 'Frontend', accent: '#22D3EE' },
  { id: 'fastapi', label: 'FastAPI', sub: 'Backend APIs', accent: '#10B981' },
  { id: 'docker', label: 'Docker', sub: 'Containers', accent: '#22D3EE' },
  { id: 'aws', label: 'AWS', sub: 'Cloud', accent: '#3B82F6' },
  { id: 'cyber', label: 'Cybersecurity', sub: 'Threat Intel', accent: '#F97316' },
  { id: 'net', label: 'Networking', sub: 'Distributed Systems', accent: '#8B5CF6' },
  { id: 'dist', label: 'Distributed Systems', sub: 'Scalability', accent: '#10B981' },
];

const MarqueeRow = forwardRef<HTMLDivElement, { tiles: Tile[]; dir: 'right' | 'left' }>(
  ({ tiles, dir }, ref) => {
    const doubled = [...tiles, ...tiles, ...tiles];

    return (
      <div className="relative overflow-hidden py-2 marquee-row">
        <span className="absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent" />
        <span className="absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[#0C0C0C] to-transparent" />
        <div
          ref={ref}
          className={`flex items-center gap-3 ${dir === 'right' ? 'marquee-track-right' : 'marquee-track-left'}`}
          data-dir={dir}
        >
          {doubled.map((tile, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[420px] h-[270px] rounded-2xl overflow-hidden border border-[#D7E2EA]/15 bg-[#141414]"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${tile.accent}22 0%, transparent 60%), linear-gradient(135deg, #141414, #0C0C0C)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <span
                  className="text-4xl md:text-5xl font-black tracking-tight text-white"
                  style={{ fontFamily: 'var(--font-family-display)' }}
                >
                  {tile.label}
                </span>
                {tile.sub && (
                  <span className="mt-3 text-xs font-mono tracking-[0.2em] uppercase text-[#D7E2EA]/60">
                    {tile.sub}
                  </span>
                )}
                <span className="mt-4 h-px w-12" style={{ background: tile.accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

MarqueeRow.displayName = 'MarqueeRow';

export const TechMarquee = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const mid = Math.ceil(TILES.length / 2);
  const row1 = TILES.slice(0, mid);
  const row2 = TILES.slice(mid);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

        if (row1Ref.current) {
          row1Ref.current.style.willChange = 'transform';
          row1Ref.current.style.transform = `translateX(${offset}px)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.willChange = 'transform';
          row2Ref.current.style.transform = `translateX(${-offset}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="py-20 md:py-28 bg-[#0C0C0C] border-y border-[#D7E2EA]/10 overflow-hidden"
      aria-label="Technology marquee"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#22D3EE]">
            Engineering
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#22D3EE] via-[#D7E2EA]/20 to-transparent" />
        </div>

        <MarqueeRow ref={row1Ref} tiles={row1} dir="right" />
        <MarqueeRow ref={row2Ref} tiles={row2} dir="left" />
      </div>
    </section>
  );
};

export default TechMarquee;
