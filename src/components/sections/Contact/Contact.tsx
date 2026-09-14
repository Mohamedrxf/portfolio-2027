import { usePortfolio, useSocials } from '@/hooks';
import { Reveal } from '@/components/animations/Reveal';
import { MagneticButton } from '@/components/animations';

export const Contact = () => {
  const { portfolio, contactInfo } = usePortfolio();
  const { socials } = useSocials();

  const email = contactInfo.find((c) => c.type === 'email');
  const github = socials.find((s) => s.platform === 'GitHub');
  const linkedin = socials.find((s) => s.platform === 'LinkedIn');

  return (
    <section id="contact" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal direction="up" distance={24}>
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  Get In Touch / 07
                </span>
              </span>
            </Reveal>
            <Reveal direction="up" distance={32} delay={0.1}>
              <h2 className="display-type text-white leading-none mb-8">
                <span className="block">LET'S</span>
                <span className="block">BUILD</span>
                <span className="block">SOMETHING</span>
                <span className="block text-[var(--color-accent)]">GREAT.</span>
              </h2>
            </Reveal>
            <Reveal direction="up" distance={24} delay={0.25}>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-xl mt-8">
                Have a project in mind, an interesting problem, or just want to talk about
                engineering? I'm always open to collaboration and new opportunities.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className="space-y-10">
              {email && (
                <Reveal direction="up" distance={20} delay={0.3}>
                  <div>
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-text-tertiary)] mb-3">
                      Email
                    </p>
                    <a
                      href={`mailto:${email.value}`}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight hover:text-[var(--color-cyan)] transition-colors"
                    >
                      {email.value}
                    </a>
                  </div>
                </Reveal>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {github && (
                  <Reveal direction="up" distance={20} delay={0.35}>
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-text-tertiary)] mb-3">
                        GitHub
                      </p>
                      <a
                        href={github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold text-white tracking-tight hover:text-[var(--color-cyan)] transition-colors flex items-center gap-2"
                      >
                        {github.username || 'GitHub'}
                        <span className="text-[var(--color-text-tertiary)]">↗</span>
                      </a>
                    </div>
                  </Reveal>
                )}
                {linkedin && (
                  <Reveal direction="up" distance={20} delay={0.4}>
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-text-tertiary)] mb-3">
                        LinkedIn
                      </p>
                      <a
                        href={linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold text-white tracking-tight hover:text-[var(--color-cyan)] transition-colors flex items-center gap-2"
                      >
                        {linkedin.username || 'LinkedIn'}
                        <span className="text-[var(--color-text-tertiary)]">↗</span>
                      </a>
                    </div>
                  </Reveal>
                )}
              </div>

              <Reveal direction="up" distance={20} delay={0.45}>
                <MagneticButton
                  variant="primary"
                  size="lg"
                  onClick={() => portfolio.resume && window.open(portfolio.resume, '_blank')}
                  className="px-8 py-4 text-base font-semibold bg-white text-black hover:bg-[var(--color-cyan)] transition-colors"
                >
                  Download Resume
                </MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
