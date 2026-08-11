import { useEffect, useRef } from 'react';
import { AnimatedContainer } from '@/components/animations/AnimatedContainer';
import { ProjectPreview } from './ProjectPreview';
import { ProjectStack } from './ProjectStack';
import { ProjectActions } from './ProjectActions';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!project || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-6 p-6">
          {/* Preview */}
          <AnimatedContainer delay={0.1}>
            <ProjectPreview
              image={project.image}
              alt={project.alt || project.title}
              className="rounded-xl"
            />
          </AnimatedContainer>

          {/* Header */}
          <AnimatedContainer delay={0.15}>
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h2 id="project-title" className="text-2xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {project.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      Featured
                    </span>
                  )}
                  {project.award && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      🏆 {project.award}
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {project.category}
                </span>
                {project.duration && (
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {project.duration}
                  </span>
                )}
              </div>
            </div>
          </AnimatedContainer>

          {/* Description */}
          <AnimatedContainer delay={0.2}>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          </AnimatedContainer>

          {/* Technology Stack */}
          <AnimatedContainer delay={0.25}>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                Technology Stack
              </h3>
              <ProjectStack technologies={project.technologies} maxVisible={10} />
            </div>
          </AnimatedContainer>

          {/* Additional Info */}
          {project.client && (
            <AnimatedContainer delay={0.3}>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                  Client
                </h3>
                <p className="text-slate-700 dark:text-slate-300">{project.client}</p>
              </div>
            </AnimatedContainer>
          )}

          {/* Actions */}
          <AnimatedContainer delay={0.35}>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Click outside or press ESC to close
              </div>
              <ProjectActions
                url={project.url}
              />
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};