import { TechMarquee } from '@/components/sections/TechMarquee';
import { AboutStory } from '@/components/about/AboutStory';
import { Services } from '@/components/sections/About/Services';

export const About = () => {
  return (
    <div className="bg-[var(--color-bg)]">
      <TechMarquee />
      <AboutStory />
      <Services />
    </div>
  );
};

export default About;
