import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { cn } from '@/lib/utils'

interface SkillCategoryTabsProps {
  categories: { id: string; name: string }[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export const SkillCategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: SkillCategoryTabsProps) => {
  return (
    <AnimatedContainer delay={0.2} className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Skill categories">
        <button
          role="tab"
          aria-selected={activeCategory === 'all'}
          aria-controls="skills-panel"
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
          All Skills
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            role="tab"
            aria-selected={activeCategory === category.id}
            aria-controls="skills-panel"
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              'border border-[var(--color-border)]',
              'hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
              activeCategory === category.id
                ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] border-[var(--color-primary)]'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </AnimatedContainer>
  )
}
