import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { AnimatedHeading } from '@/components/animations/AnimatedHeading';
import { Heading } from '@/components/ui/Heading';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';

export const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-16 bg-[var(--color-bg)]">
      <AnimatedSection spacing="xl" background="default" withContainer={true} containerPadding="lg">
        <div className="text-center space-y-3 mb-12">
          <AnimatedHeading delay={0.1}>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
              Career Path
            </span>
          </AnimatedHeading>
          <AnimatedHeading delay={0.2}>
            <Heading level={2} size="4xl" className="text-white">
              Experience
            </Heading>
          </AnimatedHeading>
        </div>
        <ExperienceTimeline />
      </AnimatedSection>
    </section>
  );
};

export default Experience;
