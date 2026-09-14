import { useMemo } from 'react';
import { usePortfolio } from '@/hooks';
import { AboutBackground } from './AboutBackground';
import { StoryHighlights } from './StoryHighlights';
import { Reveal } from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export const AboutStory = () => {
  const { personalInfo, highlights } = usePortfolio();

  const statements = useMemo(() => ['I BUILD', 'SOFTWARE', 'THAT CONNECTS', 'SYSTEMS.'], []);

  return (
    <AboutBackground>
      <section id="about" className="scroll-mt-16">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left — editorial statement */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  About / 01
                </span>
              </span>

              <h2 className="display-type text-white leading-none mb-8">
                {statements.map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h2>

              <Reveal direction="up" distance={20} delay={0.4}>
                <p className="text-[var(--color-text-secondary)] text-lg md:text-xl leading-relaxed max-w-xl mt-8">
                  {personalInfo.bio}
                </p>
              </Reveal>

              <div className="mt-10">
                <StoryHighlights highlights={highlights} />
              </div>
            </div>

            {/* Right — supporting copy + stats */}
            <div className="space-y-16 pt-8 lg:pt-16">
              <Reveal direction="up" distance={24} delay={0.2}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[var(--color-text-tertiary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
                    <span className="text-xs font-mono tracking-[0.3em] uppercase">
                      Focus Areas
                    </span>
                  </div>
                  <StaggerContainer stagger={0.08} delayChildren={0.3}>
                    {[
                      'Full Stack Development',
                      'AI / ML Systems',
                      'Cybersecurity',
                      'Networking & Distributed Systems',
                    ].map((f) => (
                      <StaggerItem key={f}>
                        <p className="text-xl md:text-2xl font-light text-[var(--color-text-primary)] tracking-tight">
                          {f}
                        </p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </Reveal>

              <Reveal direction="up" distance={24} delay={0.35}>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[var(--color-border)]">
                  <div>
                    <p className="text-4xl md:text-5xl font-black text-white leading-none mb-2">
                      2200<span className="text-[var(--color-accent)]">+</span>
                    </p>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
                      Problems Solved
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-black text-white leading-none mb-2">
                      1750<span className="text-[var(--color-cyan)]">+</span>
                    </p>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
                      LeetCode Rating
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" distance={24} delay={0.5}>
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--color-surface)]/60 border border-[var(--color-border)]">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60 animate-ping"
                      style={{ animationDuration: '2.4s' }}
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
                  </span>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {personalInfo.availability}
                  </span>
                  <span className="text-[var(--color-text-tertiary)]">·</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {personalInfo.location}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </AboutBackground>
  );
};
