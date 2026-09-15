import { FadeIn } from '@/components/motion';

/**
 * HeroBottomBar
 *
 * Bottom editorial metadata — location and timezone as technical metadata.
 * The description lives in HeroContent to avoid duplication.
 *
 * Visual behavior:
 * - flex, justify-between
 * - uppercase, tracking-wide, medium weight
 * - color #D7E2EA/50
 * - responsive typography
 * - px-6, md:px-10
 * - pb-8
 */
export const HeroBottomBar = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-8">
      <FadeIn delay={0.5} duration={0.8} y={20}>
        <div className="flex items-center justify-center lg:justify-start gap-6 text-[#D7E2EA]/50 text-xs font-mono tracking-[0.2em] uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
            Chennai, India
          </span>
          <span className="w-px h-4 bg-[#D7E2EA]/20" />
          <span>GMT+5:30</span>
        </div>
      </FadeIn>
    </div>
  );
};

export default HeroBottomBar;
