import { useMemo } from 'react';
import { useSkills } from '@/hooks';
import { Reveal } from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { SkillsGalaxy } from '@/components/three';

// Editorial category ordering
const CATEGORY_ORDER = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'AI & ML',
  'Tools & Platforms',
  'Core CS',
  'Programming Concepts',
  'AI-Assisted Development',
];

export const Skills = () => {
  const { skillCategories } = useSkills();

  const ordered = useMemo(
    () =>
      [...skillCategories].sort(
        (a, b) => CATEGORY_ORDER.indexOf(a.name) - CATEGORY_ORDER.indexOf(b.name)
      ),
    [skillCategories]
  );

  return (
    <section id="skills" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — header + galaxy */}
          <div className="lg:col-span-4">
            <Reveal direction="up" distance={24}>
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  Expertise / 03
                </span>
              </span>
              <h2 className="display-type text-white leading-none mb-8">Skills &amp; Expertise</h2>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mt-8">
                A breadth of engineering knowledge — from low-level systems to modern AI-assisted
                development workflows.
              </p>
            </Reveal>

            <div className="mt-12 h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]/40">
              <SkillsGalaxy onSkillSelect={() => {}} onSkillHover={() => {}} />
            </div>
          </div>

          {/* Right — editorial category rows */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {ordered.map((category, ci) => (
                <CategoryRow key={category.id} category={category} index={ci} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function CategoryRow({ category, index }: { category: any; index: number }) {
  const accent = CATEGORY_ACCENT[index % CATEGORY_ACCENT.length];
  return (
    <Reveal direction="up" distance={20} delay={index * 0.04}>
      <div className="group relative border-b border-[var(--color-border)] py-7">
        <div className="flex items-baseline gap-6 mb-5">
          <span
            className="text-[10px] font-mono tracking-[0.3em] uppercase"
            style={{ color: accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            {category.name.toUpperCase()}
          </h3>
          <span className="ml-auto text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
            {category.skills.length} tools
          </span>
        </div>
        <StaggerContainer
          stagger={0.05}
          delayChildren={0.05}
          className="flex flex-wrap gap-x-8 gap-y-3"
        >
          {category.skills.map((skill: any) => (
            <StaggerItem key={skill.id}>
              <span className="text-[var(--color-text-secondary)] text-base sm:text-lg font-light tracking-tight hover:text-white transition-colors cursor-default">
                {skill.name}
                {skill.badge && (
                  <span
                    className="ml-2 text-[10px] font-mono tracking-[0.2em] uppercase"
                    style={{ color: accent }}
                  >
                    {skill.badge}
                  </span>
                )}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Reveal>
  );
}

const CATEGORY_ACCENT = [
  'var(--color-cyan)',
  'var(--color-accent)',
  'var(--color-violet)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-info)',
  'var(--color-secondary)',
  'var(--color-text-tertiary)',
  'var(--color-cyan)',
];
