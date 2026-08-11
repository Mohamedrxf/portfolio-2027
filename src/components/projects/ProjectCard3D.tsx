import { ProjectTilt } from './ProjectTilt';
import { ProjectSpotlight } from './ProjectSpotlight';
import { ProjectPreview } from './ProjectPreview';
import { ProjectStack } from './ProjectStack';
import { ProjectActions } from './ProjectActions';
import { useMediaQuery } from '@/hooks';
import type { Project } from '@/data/projects';

interface ProjectCard3DProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard3D = ({ project, onClick }: ProjectCard3DProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <ProjectTilt disabled={!isDesktop} maxTilt={8}>
      <ProjectSpotlight disabled={!isDesktop}>
        <div
          onClick={onClick}
          className={`
            relative rounded-2xl p-6 cursor-pointer
            transition-all duration-300 hover:scale-[1.02]
            bg-white/70 dark:bg-slate-900/70
            backdrop-blur-xl
            border border-white/20 dark:border-white/10
            shadow-lg hover:shadow-2xl
            overflow-hidden
            group
          `}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
          
          {/* Content */}
          <div className="relative space-y-4">
            {/* Preview */}
            <div className="relative -mx-6 -mt-6 mb-4">
              <ProjectPreview
                image={project.image}
                alt={project.alt || project.title}
                className="rounded-t-2xl"
              />
              
              {/* Featured badge */}
              <div className="absolute top-3 right-3 flex gap-2">
                {project.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Featured
                  </span>
                )}
                {project.award && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    🏆 Award
                  </span>
                )}
              </div>
            </div>

            {/* Title and status */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap">
                {project.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
              {project.description}
            </p>

            {/* Technology stack */}
            <ProjectStack
              technologies={project.technologies}
              maxVisible={isMobile ? 3 : 5}
            />

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {project.category}
              </span>
              <ProjectActions
                url={project.url}
              />
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </ProjectSpotlight>
    </ProjectTilt>
  );
};