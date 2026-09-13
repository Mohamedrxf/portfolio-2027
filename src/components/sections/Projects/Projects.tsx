import { useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useProjects } from '@/hooks';
import { ProjectCardPremium } from '@/components/projects';

const EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function StackedProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: any;
  index: number;
  total: number;
  progress: any;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(progress, [start, end, 1], [1, 0.92 - index * 0.03, 0.88]);
  const opacity = useTransform(progress, [start - 0.05, start, end], [0.3, 1, 0.55]);
  const y = useTransform(progress, [start, end], [0, 40 * (total - index)]);

  return (
    <motion.div style={{ scale, opacity, y }} transition={{ duration: 0.2, ease: EASING }}>
      <ProjectCardPremium project={project} index={index} />
    </motion.div>
  );
}

export const Projects = () => {
  const { projects } = useProjects();
  const sorted = useMemo(() => [...projects].sort((a, b) => a.id.localeCompare(b.id)), [projects]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="projects" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="sticky top-20 z-10 py-8 pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
              Selected Work
            </span>
            <span className="h-px flex-1 bg-[var(--color-border)]" />
            <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">
              {String(sorted.length).padStart(2, '0')} Projects
            </span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10 lg:space-y-16 pb-32">
          {sorted.map((project, index) => (
            <StackedProjectCard
              key={project.id}
              project={project}
              index={index}
              total={sorted.length}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
