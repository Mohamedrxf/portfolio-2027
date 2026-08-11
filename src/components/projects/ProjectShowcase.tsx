import { useState, useMemo, useCallback } from 'react';
import { AnimatedContainer } from '@/components/animations/AnimatedContainer';
import { ProjectCard3D } from './ProjectCard3D';
import { ProjectModal } from './ProjectModal';
import { ProjectFilters } from './ProjectFilters';
import { ProjectBackground } from './ProjectBackground';
import { useProjects } from '@/hooks';
import { sortAlphabetically } from '@/lib/query';
import type { Project } from '@/data/projects';

interface ProjectShowcaseProps {
  className?: string;
  showBackground?: boolean;
  featuredOnly?: boolean;
}

export const ProjectShowcase = ({ 
  className = '',
  showBackground = true,
  featuredOnly: initialFeaturedOnly = false
}: ProjectShowcaseProps) => {
  const { 
    projects, 
    getAllCategories, 
    getAllTechnologies,
    filterProjectsByCategory,
    filterProjectsByTechnology,
    featuredProjects
  } = useProjects();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTechnology, setActiveTechnology] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(initialFeaturedOnly);
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'>('date-desc');

  const categories = getAllCategories();
  const technologies = getAllTechnologies();

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = showFeaturedOnly ? [...featuredProjects] : [...projects];

    // Filter by category
    if (activeCategory !== 'all') {
      result = filterProjectsByCategory(activeCategory);
    }

    // Filter by technology
    if (activeTechnology) {
      result = filterProjectsByTechnology(activeTechnology);
    }

    // Sort
    if (sortBy === 'date-desc') {
      result = result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === 'date-asc') {
      result = result.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortBy === 'name-asc') {
      result = sortAlphabetically(result, 'title' as keyof Project, 'asc');
    } else if (sortBy === 'name-desc') {
      result = sortAlphabetically(result, 'title' as keyof Project, 'desc');
    }

    return result;
  }, [
    projects,
    featuredProjects,
    showFeaturedOnly, 
    activeCategory, 
    activeTechnology, 
    sortBy,
    filterProjectsByCategory,
    filterProjectsByTechnology
  ]);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setActiveTechnology(null);
  }, []);

  const handleTechnologyChange = useCallback((technology: string | null) => {
    setActiveTechnology(technology);
  }, []);

  const handleFeaturedToggle = useCallback((featured: boolean) => {
    setShowFeaturedOnly(featured);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Background */}
      {showBackground && <ProjectBackground />}

      {/* Filters */}
      <ProjectFilters
        categories={categories}
        technologies={technologies}
        activeCategory={activeCategory}
        activeTechnology={activeTechnology}
        showFeaturedOnly={showFeaturedOnly}
        onCategoryChange={handleCategoryChange}
        onTechnologyChange={handleTechnologyChange}
        onFeaturedToggle={handleFeaturedToggle}
        projects={projects}
      />

      {/* Sort Controls */}
      <AnimatedContainer delay={0.3}>
        <div className="flex justify-center mb-6 px-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer w-full max-w-xs"
            aria-label="Sort projects"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </AnimatedContainer>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredProjects.map((project, index) => (
          <AnimatedContainer key={project.id} delay={0.4 + index * 0.1}>
            <ProjectCard3D
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          </AnimatedContainer>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <AnimatedContainer delay={0.5}>
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No projects found matching your filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveTechnology(null);
                setShowFeaturedOnly(false);
              }}
              className="mt-4 px-6 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </AnimatedContainer>
      )}

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};