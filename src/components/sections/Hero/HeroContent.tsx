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
    <div className="relative min-h-screen flex flex-col items-center justify-center w-full text-center px-6">
      {/* Tagline */}
      <FadeIn delay={0.1} duration={0.9} y={30}>
        <p className="text-[#D7E2EA] font-mono text-xs sm:text-sm tracking-[0.35em] uppercase mb-8">
          {personalInfo.tagline}
        </p>
      </FadeIn>

      {/* Massive name — dominates the top of the viewport, two-line composition */}
      <FadeIn delay={0.2} duration={1.0} y={60}>
        <h1
          className="font-[var(--font-family-display)] font-black tracking-tight text-white leading-[0.88]"
          style={{
            fontSize: 'clamp(3.2rem, 15vw, 10rem)',
            background: heroGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <span className="block">{firstName}</span>
          <span className="block">{restName}</span>
        </h1>
      </FadeIn>

      {/* Central magnetic portrait — the dominant visual of the composition */}
      <FadeIn delay={0.32} duration={1.0} y={40}>
        <div className="mt-6">
          <HeroPortrait />
        </div>
      </FadeIn>

      {/* Bottom editorial description + CTA */}
      <FadeIn delay={0.5} duration={0.8} y={30}>
        <p className="text-[#D7E2EA] font-light tracking-wide leading-snug mt-8 max-w-xl text-sm sm:text-base md:text-lg uppercase">
          {description}
        </p>
      </FadeIn>

      <FadeIn delay={0.65} duration={0.8} y={30}>
        <div className="mt-8">
          <ContactButton label="CONTACT ME" href="#contact" size="lg" />
        </div>
      </FadeIn>
    </div>
  );
};

export default HeroContent;
