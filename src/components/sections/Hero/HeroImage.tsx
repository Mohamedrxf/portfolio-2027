import { useState } from 'react';
import { usePortfolio, useSkills } from '@/hooks';

// Drop your photo at: public/assets/images/hero/portrait.jpg
const PORTRAIT_SRC = '/assets/images/hero/portrait.jpg';

export const HeroImage = () => {
  const { personalInfo, stats } = usePortfolio();
  const { getTopSkills } = useSkills();

  const topSkills = getTopSkills(6);
  const availability = personalInfo.availability;
  const [imageError, setImageError] = useState(false);
  const showImage = !imageError;

  const initials = personalInfo.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="relative w-full max-w-[480px] aspect-[4/5] mx-auto lg:mx-0">
      <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-md shadow-2xl">
        {/* Portrait */}
        <div className="absolute inset-0 flex items-center justify-center">
          {showImage ? (
            <img
              src={PORTRAIT_SRC}
              alt={personalInfo.name}
              loading="eager"
              decoding="async"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)]">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)] flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                {initials}
              </div>
              <p className="mt-6 text-[var(--color-text-tertiary)] text-xs font-mono tracking-widest uppercase">
                Add portrait.jpg
              </p>
            </div>
          )}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 30%, rgba(12,12,12,0.4) 70%, rgba(12,12,12,0.85) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(34,211,238,0.25) 0%, transparent 40%, rgba(59,130,246,0.25) 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-[var(--color-cyan)]/60 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-[var(--color-accent)]/60 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-[var(--color-accent)]/60 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-[var(--color-cyan)]/60 rounded-br-lg" />

        <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--color-border)]">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60 animate-ping"
              style={{ animationDuration: '2s' }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
          </span>
          <span className="text-xs font-mono tracking-wide text-white">{availability}</span>
        </div>

        {stats.length > 0 && (
          <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--color-border)]">
            <span className="text-xs font-mono text-white">
              <span className="font-bold text-[var(--color-cyan)]">{stats[0]?.value}</span>{' '}
              <span className="text-[var(--color-text-secondary)]">{stats[0]?.label}</span>
            </span>
          </div>
        )}
      </div>

      {topSkills.length > 0 &&
        topSkills.slice(0, 5).map((skill, index) => {
          const positions = [
            '-left-6 top-[15%]',
            '-left-4 top-[45%]',
            '-right-6 top-[20%]',
            '-right-4 top-[55%]',
            'right-[-2%] bottom-[15%]',
          ];
          return (
            <div
              key={skill.id}
              className={`absolute ${positions[index] || ''} px-3 py-2 rounded-full bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] shadow-xl animate-float-loop`}
              style={{ animationDelay: `${index * 0.6}s` }}
            >
              <span className="text-xs font-mono text-[var(--color-text-primary)] font-semibold">
                {skill.name}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default HeroImage;
