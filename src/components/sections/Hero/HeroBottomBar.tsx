import { FadeIn } from '@/components/motion';

/**
 * HeroBottomBar
 *
 * Reference composition:
 * - LEFT: small editorial description (uppercase, font-light, tracking-wide,
 *   leading-snug, restrained width)
 * - RIGHT: rounded Contact button
 */
const description =
  'A software engineer building scalable systems across full stack, AI/ML, cybersecurity and distributed infrastructure.';

export const HeroBottomBar = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <FadeIn delay={0.5} duration={0.8} y={30}>
          <p className="text-[#D7E2EA] font-light tracking-wide leading-snug max-w-xl text-sm sm:text-base md:text-lg uppercase">
            {description}
          </p>
        </FadeIn>

        <FadeIn delay={0.65} duration={0.8} y={30}>
          <div className="flex items-center gap-6 text-[#D7E2EA]/50 text-xs font-mono tracking-[0.2em] uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
              Chennai, India
            </span>
            <span className="w-px h-4 bg-[#D7E2EA]/20" />
            <span>GMT+5:30</span>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default HeroBottomBar;
