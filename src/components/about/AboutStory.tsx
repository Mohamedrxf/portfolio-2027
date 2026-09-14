import { useMemo } from 'react';
import { usePortfolio } from '@/hooks';
import { AboutBackground } from '@/components/about/AboutBackground';
import { StoryHighlights } from '@/components/about/StoryHighlights';
import { AnimatedText } from '@/components/animations/AnimatedText';
import { FadeIn } from '@/components/motion';

export const AboutStory = () => {
  const { personalInfo, highlights } = usePortfolio();

  const statement = useMemo(() => ['I BUILD', 'SOFTWARE', 'THAT CONNECTS', 'SYSTEMS.'], []);

  const aboutParagraph =
    'I engineer full-stack systems that connect people to data, services to infrastructure, and ideas to production. From threat-detection machine learning models to sandboxed code-execution platforms, my work sits at the intersection of security, networking, and distributed software. I build things that are not just functional, but resilient.';

  return (
    <AboutBackground>
      <section id="about" className="scroll-mt-16">
        <div className="min-h-screen flex flex-col justify-center max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left — editorial statement */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <FadeIn delay={0.1} duration={0.7} y={30}>
                <span className="section-meta mb-8 block">
                  <span className="inline-flex items-center gap-3">
                    <span className="section-accent-line w-12" />
                    About / 01
                  </span>
                </span>
              </FadeIn>

              <h2 className="display-type text-white leading-none mb-8">
                {statement.map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h2>

              <FadeIn delay={0.35} duration={0.8} y={30}>
                <div className="mt-10">
                  <StoryHighlights highlights={highlights} />
                </div>
              </FadeIn>
            </div>

            {/* Right — animated character text + supporting copy */}
            <div className="lg:col-span-7 space-y-16 pt-8 lg:pt-16">
              <FadeIn delay={0.2} duration={0.8} y={30}>
                <AnimatedText
                  text={aboutParagraph}
                  className="text-[#D7E2EA] text-xl sm:text-2xl md:text-3xl font-light leading-snug tracking-tight"
                  elementClassName="max-w-2xl"
                />
              </FadeIn>

              <FadeIn delay={0.4} duration={0.8} y={30}>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#D7E2EA]/15">
                  <div>
                    <p className="text-4xl md:text-5xl font-black text-white leading-none mb-2">
                      2200<span className="text-[#22D3EE]">+</span>
                    </p>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#D7E2EA]/50">
                      Problems Solved
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-black text-white leading-none mb-2">
                      1750<span className="text-[#22D3EE]">+</span>
                    </p>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#D7E2EA]/50">
                      LeetCode Rating
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.55} duration={0.8} y={30}>
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#141414]/60 border border-[#D7E2EA]/15">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-60 animate-ping"
                      style={{ animationDuration: '2.4s' }}
                    />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]" />
                  </span>
                  <span className="text-sm text-[#D7E2EA]/80">{personalInfo.availability}</span>
                  <span className="text-[#D7E2EA]/30">·</span>
                  <span className="text-sm text-[#D7E2EA]/80">{personalInfo.location}</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </AboutBackground>
  );
};

export default AboutStory;
