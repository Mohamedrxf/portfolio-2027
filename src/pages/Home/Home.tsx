import { Hero } from '@/components/sections';
import { About as AboutSection } from '@/components/sections';
import { Skills as SkillsSection } from '@/components/sections';
import { Experience as ExperienceSection } from '@/components/sections';
import { Education as EducationSection } from '@/components/sections';
import { Certifications as CertificationsSection } from '@/components/sections';
import { Projects as ProjectsSection } from '@/components/sections';
import { Achievements as AchievementsSection } from '@/components/sections';
import { Contact as ContactSection } from '@/components/sections';

export function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
