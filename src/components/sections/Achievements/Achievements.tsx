import { useState } from 'react';
import { useAchievements } from '@/hooks';
import { Reveal } from '@/components/animations/Reveal';

export const Achievements = () => {
  const { achievements } = useAchievements();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(achievements.map((a) => a.category).filter(Boolean))),
  ];
  const filtered =
    activeFilter === 'All' ? achievements : achievements.filter((a) => a.category === activeFilter);

  return (
    <section id="achievements" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <Reveal direction="up" distance={24}>
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  Achievements / 08
                </span>
              </span>
              <h2 className="display-type text-white leading-none">Achievements</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal direction="up" distance={20} delay={0.1}>
              <div className="flex flex-wrap gap-3 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 text-xs font-mono tracking-[0.2em] uppercase border transition-colors ${
                      activeFilter === cat
                        ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] border-[var(--color-border)] hover:text-white hover:border-[var(--color-cyan)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="border-t border-[var(--color-border)]">
              {filtered.map((achievement, index) => (
                <AchievementRow key={achievement.id} achievement={achievement} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function AchievementRow({ achievement, index }: { achievement: any; index: number }) {
  const statusColor =
    achievement.status === 'Awarded'
      ? 'var(--color-success)'
      : achievement.status === 'Finalist'
        ? 'var(--color-cyan)'
        : 'var(--color-warning)';

  return (
    <Reveal direction="up" distance={20} delay={index * 0.06}>
      <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-7 border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/30 transition-colors">
        <div className="md:col-span-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="md:col-span-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[var(--color-cyan)] transition-colors">
            {achievement.title}
          </h3>
          {achievement.issuer && (
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">{achievement.issuer}</p>
          )}
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mt-3 max-w-2xl">
            {achievement.description}
          </p>
        </div>
        <div className="md:col-span-2">
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-1 border"
            style={{ color: statusColor, borderColor: statusColor + '40' }}
          >
            {achievement.status}
          </span>
        </div>
        <div className="md:col-span-2 flex md:justify-end">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
            {achievement.date}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
