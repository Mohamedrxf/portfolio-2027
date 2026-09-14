import { useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useProjects } from '@/hooks';
import { ProjectVisual } from './ProjectVisual';

const EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const CATEGORY_LABELS: Record<string, string> = {
  Cybersecurity: 'SECURITY',
  DevOps: 'DEVOPS',
  Networking: 'NETWORKING',
  'Web Development': 'WEB',
};

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

  const scale = useTransform(progress, [start, end, 1], [1, 0.94 - index * 0.025, 0.9]);
  const opacity = useTransform(progress, [start - 0.04, start, end], [0.25, 1, 0.5]);
  const y = useTransform(progress, [start, end], [0, 48 * (total - index)]);

  return (
    <motion.div
      style={{ scale, opacity, y, willChange: 'transform' }}
      transition={{ duration: 0.2, ease: EASING }}
    >
      <ProjectCard project={project} index={index} />
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const category = CATEGORY_LABELS[project.category] || project.category.toUpperCase();
  const number = String(index + 1).padStart(2, '0');
  const award = project.award;

  return (
    <div data-project-card className="group relative">
      <div className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]/70 backdrop-blur-md shadow-2xl">
        {/* Giant project number — background type */}
        <div
          className="absolute top-6 left-6 z-20 pointer-events-none select-none"
          style={{
            fontSize: 'clamp(5rem, 14vw, 13rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
            color: 'transparent',
            fontFamily: 'var(--font-family-display)',
          }}
        >
          {number}
        </div>

        {/* Category + status */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-[var(--color-border)] text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-cyan)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
            {category}
          </span>
          {award && (
            <span className="px-3 py-1.5 bg-[var(--color-warning)]/15 border border-[var(--color-warning)]/30 text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-warning)]">
              Award
            </span>
          )}
        </div>

        {/* Visual treatment */}
        <div className="relative h-[340px] sm:h-[460px] overflow-hidden">
          <ProjectVisual project={project} />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-4 left-6 z-20 flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-7 sm:p-9 pt-5">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4"
            style={{ lineHeight: 0.95 }}
          >
            {project.title}
          </h3>
          <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-6 max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.technologies.slice(0, 6).map((tech: string) => (
              <span
                key={tech}
                className="text-[11px] font-mono tracking-wide text-[var(--color-text-secondary)] border border-[var(--color-border)] px-2.5 py-1 bg-[var(--color-surface)]/60"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold hover:bg-[var(--color-cyan)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10 6H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Repository
              </a>
            )}
            <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">
              {project.technologies.length} technologies
            </span>
          </div>
        </div>
      </div>
    </div>
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
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="sticky top-24 z-10 py-8 pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[var(--color-accent)]">
              Selected Work / 05
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-border)] to-transparent" />
            <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">
              {String(sorted.length).padStart(2, '0')} Projects
            </span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 space-y-10 lg:space-y-16 pb-40">
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
