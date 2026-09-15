import { usePortfolio } from '@/hooks';
import { FadeIn } from '@/components/motion';
import { ContactButton } from '@/components/motion';
import { HeroPortrait } from './HeroPortrait';

const heroGradient = 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)';

export const HeroContent = () => {
  const { personalInfo } = usePortfolio();

  // Split name: first word on line 1, rest on line 2
  const firstName = personalInfo.name.split(' ')[0] ?? '';
  const restName = personalInfo.name.slice(firstName.length).trim();

  const description =
    'A software engineer building scalable systems across full stack, AI/ML, cybersecurity and distributed infrastructure.';

  return (
    <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8">
      {/* Metadata / eyebrow */}
      <FadeIn delay={0.1} duration={0.8} y={20}>
        <p className="text-[#D7E2EA] font-mono text-xs sm:text-sm tracking-[0.35em] uppercase">
          {personalInfo.tagline}
        </p>
      </FadeIn>

      {/* Hero name — two-line composition, controlled clamp, no overlap */}
      <FadeIn delay={0.2} duration={1.0} y={40}>
        <h1
          className="font-[var(--font-family-display)] font-black tracking-tight text-white leading-[0.9]"
          style={{
            fontSize: 'clamp(1.8rem, 9vw, 7rem)',
            background: heroGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.25)',
          }}
        >
          <span className="block">{firstName}</span>
          <span className="block">{restName}</span>
        </h1>
      </FadeIn>

      {/* Description — readable, normal case, constrained width */}
      <FadeIn delay={0.5} duration={0.8} y={20}>
        <p className="text-[#D7E2EA] font-light tracking-wide leading-relaxed max-w-lg text-sm sm:text-base md:text-lg">
          {description}
        </p>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.65} duration={0.8} y={20}>
        <ContactButton label="CONTACT ME" href="#contact" size="lg" />
      </FadeIn>

      {/* Portrait — renders in its own bounded area on mobile only.
          On desktop the portrait is rendered in Hero.tsx's right grid column. */}
      <div className="lg:hidden pt-4">
        <HeroPortrait />
      </div>
    </div>
  );
};

export default HeroContent;
