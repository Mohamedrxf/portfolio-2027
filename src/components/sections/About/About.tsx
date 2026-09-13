import { TechMarquee } from '@/components/sections/TechMarquee';
import { AboutStory } from '@/components/about/AboutStory';

export const About = () => {
  return (
    <section id="about" className="scroll-mt-16 bg-[var(--color-bg)]">
      <TechMarquee />
      <AboutStory />
    </section>
  );
};

export default About;
