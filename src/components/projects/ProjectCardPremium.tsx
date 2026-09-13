import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

const CATEGORY_LABELS: Record<string, string> = {
  Cybersecurity: 'SECURITY',
  DevOps: 'DEVOPS',
  Networking: 'NETWORKING',
  'Web Development': 'WEB',
};

export function ProjectCardPremium({ project, index }: { project: Project; index: number }) {
  const category = CATEGORY_LABELS[project.category] || project.category.toUpperCase();
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div data-project-card className="group relative" style={{ willChange: 'transform' }}>
      <div className="relative rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-md shadow-2xl">
        {/* Giant project number */}
        <div
          className="absolute top-6 left-6 z-20 pointer-events-none select-none"
          style={{
            fontSize: 'clamp(5rem, 14vw, 13rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            WebkitTextStroke: '2px rgba(255,255,255,0.08)',
            color: 'transparent',
            fontFamily: 'var(--font-family-display)',
          }}
        >
          {number}
        </div>

        {/* Category pill */}
        <div className="absolute top-6 right-6 z-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[var(--color-border)] text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-cyan)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
            {category}
          </span>
        </div>

        {/* Visual preview */}
        <div className="relative h-[320px] sm:h-[420px] overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />
          {/* Status + award */}
          <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-text-tertiary)]">
              {project.status}
            </span>
            {project.award && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--color-warning)]" />
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-warning)]">
                  Award
                </span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 sm:p-8 pt-4">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3"
            style={{ lineHeight: 0.95 }}
          >
            {project.title}
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono tracking-wide text-[var(--color-text-secondary)] border border-[var(--color-border)] px-2.5 py-1 rounded-md bg-[var(--color-surface)]/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-[var(--color-cyan)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10 6H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              GitHub
            </a>
            <span className="text-[11px] font-mono text-[var(--color-text-tertiary)]">
              {project.technologies.length} technologies
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCardPremium;
