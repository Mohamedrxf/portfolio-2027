import { useState } from 'react';
import { usePortfolio } from '@/hooks';
import { Magnet } from '@/components/motion';

const PORTRAIT_SRC = '/assets/images/hero/portrait.jpg';

export const HeroPortrait = () => {
  const { personalInfo } = usePortfolio();
  const [imageError, setImageError] = useState(false);
  const showImage = !imageError;

  const initials = personalInfo.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <Magnet padding={150} strength={3} className="relative inline-block">
      <div
        className="relative"
        style={{
          width: 'clamp(240px, 30vw, 460px)',
          aspectRatio: '4 / 5',
        }}
      >
        {/* Outer atmospheric glow halo — cinematic depth */}
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(34,211,238,0.22) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)',
            filter: 'blur(32px)',
          }}
        />

        {/* Portrait frame — dark, rounded, light border, no card UI.
            The rounded bezel reads as an embedded cinematic object, not a
            rectangular profile card. */}
        <div className="relative w-full h-full rounded-[40px] overflow-hidden border-2 border-[#D7E2EA]/70 bg-[#0C0C0C] shadow-2xl">
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
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0C0C0C]">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#7C3AED] flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                {initials}
              </div>
              <p className="mt-6 text-[#D7E2EA]/40 text-xs font-mono tracking-widest uppercase">
                Add portrait.jpg
              </p>
            </div>
          )}

          {/* Cinematic overlays — subtle vignette + gradient wash, no card chrome */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 20%, rgba(12,12,12,0.3) 60%, rgba(12,12,12,0.8) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50"
            style={{
              background:
                'linear-gradient(135deg, rgba(34,211,238,0.2) 0%, transparent 45%, rgba(124,58,237,0.2) 100%)',
            }}
          />

          {/* Thin inner highlight line — editorial bezel accent */}
          <div
            className="absolute inset-3 rounded-[34px] pointer-events-none"
            style={{
              border: '1px solid rgba(215,226,234,0.06)',
            }}
          />
        </div>
      </div>
    </Magnet>
  );
};

export default HeroPortrait;
