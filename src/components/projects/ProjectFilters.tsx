import { AnimatedContainer } from '@/components/animations/AnimatedContainer';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  categories: string[];
  technologies: string[];
  activeCategory: string;
  activeTechnology: string | null;
  showFeaturedOnly: boolean;
  onCategoryChange: (category: string) => void;
  onTechnologyChange: (technology: string | null) => void;
  onFeaturedToggle: (featured: boolean) => void;
}

export const ProjectFilters = ({
  categories,
  technologies,
  activeCategory,
  activeTechnology,
  showFeaturedOnly,
  onCategoryChange,
  onTechnologyChange,
  onFeaturedToggle,
}: ProjectFiltersProps) => {
  return (
    <div className="space-y-6 px-4">
      {/* Category Filters */}
      <AnimatedContainer delay={0.2}>
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => onCategoryChange('all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              'border border-slate-300 dark:border-slate-600',
              'hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400',
              activeCategory === 'all'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            )}
          >
            All Projects
          </button>
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                'border border-slate-300 dark:border-slate-600',
                'hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400',
                activeCategory === category
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </AnimatedContainer>

      {/* Technology & Featured Filters */}
      <AnimatedContainer delay={0.25}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Technology Dropdown */}
          <div className="relative">
            <select
              value={activeTechnology || ''}
              onChange={(e) => onTechnologyChange(e.target.value || null)}
              className="appearance-none px-4 py-2 pr-8 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              aria-label="Filter by technology"
            >
              <option value="">All Technologies</option>
              {technologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Featured Toggle */}
          <button
            onClick={() => onFeaturedToggle(!showFeaturedOnly)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              'border border-slate-300 dark:border-slate-600',
              'hover:border-amber-500 dark:hover:border-amber-400',
              showFeaturedOnly
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            )}
            aria-label={showFeaturedOnly ? 'Show all projects' : 'Show featured only'}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Featured Only
            </span>
          </button>
        </div>
      </AnimatedContainer>
    </div>
  );
};