import { useState } from 'react';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { Heading } from '@/components/ui/Heading';
import { SkillCategoryTabs } from './SkillCategoryTabs';
import { CategoryStatistics } from './CategoryStatistics';
import { FeaturedSkills } from './FeaturedSkills';
import { SkillsByCategory } from './SkillsByCategory';
import { SkillsGalaxy } from '@/components/three';
import { useSkills } from '@/hooks';
import type { Skill } from '@/data/skills';

export const Skills = () => {
  const { skills, skillCategories, filterSkillsByCategory, getSkillsByLevel } = useSkills();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all' ? skills : filterSkillsByCategory(activeCategory);

  const expertSkills = getSkillsByLevel(5);
  const maxYears = Math.max(...skills.map((s) => s.years || 0));

  const handleSkillSelect = (skill: Skill | null) => {
    if (skill) {
      setActiveCategory(skill.category);
    }
  };

  return (
    <section id="skills" className="scroll-mt-16 bg-[var(--color-bg)]">
      <AnimatedSection spacing="xl" background="default" withContainer={true} containerPadding="lg">
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
              Expertise
            </span>
            <Heading level={2} size="4xl" className="text-white">
              Skills & Expertise
            </Heading>
          </div>

          <CategoryStatistics
            totalSkills={skills.length}
            expertSkills={expertSkills.length}
            categories={skillCategories.length}
            yearsOfExperience={maxYears}
          />

          <FeaturedSkills />

          <SkillCategoryTabs
            categories={skillCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="h-[420px] sm:h-[520px] md:h-[640px] w-full rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
            <SkillsGalaxy onSkillSelect={handleSkillSelect} onSkillHover={() => {}} />
          </div>

          <SkillsByCategory skills={filteredSkills} />
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Skills;
