import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { cn } from '@/lib/utils'

interface ProjectFiltersProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export const ProjectFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFiltersProps) => {
  return (
    <AnimatedContainer delay={0.25}>
      <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Project categories">
        <button
          role="tab"
          aria-selected={activeCategory === 'all'}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            'border border-[var(--color-border)]',
            'hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
            activeCategory === 'all'
              ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] border-[var(--color-primary)]'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
          )}
          onClick={() => onCategoryChange('all')}
        >
          All Projects
        </button>
        {categories.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={activeCategory === category}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              'border border-[var(--color-border)]',
              'hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
              activeCategory === category
                ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] border-[var(--color-primary)]'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            )}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </AnimatedContainer>
  )
}
