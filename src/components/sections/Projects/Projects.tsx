import { useMemo, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useProjects } from '@/hooks';
import { FadeIn } from '@/components/motion';
import { LiveProjectButton } from '@/components/motion';
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

  // Each card scales down slightly and fades as the next one stacks on top.
  const scale = useTransform(progress, [start, end, 1], [1, 0.95 - index * 0.02, 0.9]);
  const opacity = useTransform(progress, [start - 0.05, start, end], [0.2, 1, 0.45]);
  const y = useTransform(progress, [start, end], [0, 56 * (total - index)]);

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

  return (
    <div data-project-card className="group relative">
      <div
        className="relative overflow-hidden border-2 border-[#D7E2EA]/85 bg-[#0C0C0C] shadow-2xl"
        style={{
          borderRadius: 'clamp(40px, 7vw, 60px)',
        }}
      >
        {/* Giant project number — background type */}
        <div
          className="absolute top-8 left-8 z-20 pointer-events-none select-none"
          style={{
            fontSize: 'clamp(5rem, 14vw, 13rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            WebkitTextStroke: '1.5px rgba(215,226,234,0.08)',
            color: 'transparent',
            fontFamily: 'var(--font-family-display)',
          }}
        >
          {number}
        </div>

        {/* Category badge */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-[#D7E2EA]/30 text-[10px] font-mono tracking-[0.2em] uppercase text-[#22D3EE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
            {category}
          </span>
        </div>

        {/* Large visual area */}
        <div className="relative pt-24 sm:pt-28">
          <div className="relative h-[380px] sm:h-[500px] overflow-hidden">
            <ProjectVisual project={project} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-95" />
          </div>

          {/* Content */}
          <div className="relative px-8 sm:px-12 pb-10 pt-6">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5"
              style={{ lineHeight: 0.95 }}
            >
              {project.title}
            </h3>
            <p className="text-[#D7E2EA]/70 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.slice(0, 6).map((tech: string) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono tracking-wide text-[#D7E2EA]/70 border border-[#D7E2EA]/20 px-3 py-1.5 bg-[#141414]/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {project.url && <LiveProjectButton href={project.url} />}
              <span className="text-[11px] font-mono text-[#D7E2EA]/40 tracking-wide">
                {project.technologies.length} technologies
              </span>
            </div>
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
    <section id="projects" className="scroll-mt-16 bg-[#0C0C0C]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="sticky top-24 z-10 py-8 pointer-events-none">
          <div className="flex items-center gap-4">
            <FadeIn delay={0.1} duration={0.7} y={30}>
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#22D3EE]">
                Selected Work / 05
              </span>
            </FadeIn>
            <span className="h-px flex-1 bg-gradient-to-r from-[#22D3EE] via-[#D7E2EA]/20 to-transparent" />
            <span className="text-[11px] font-mono text-[#D7E2EA]/50">
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
