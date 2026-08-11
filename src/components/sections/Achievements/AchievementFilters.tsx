import { useMemo } from 'react'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Button } from '@/components/ui/Button'
import { useAchievements } from '@/hooks'

interface AchievementFiltersProps {
  onFilterChange: (filter: string) => void
  activeFilter: string
}

export const AchievementFilters = ({ onFilterChange, activeFilter }: AchievementFiltersProps) => {
  const { achievements } = useAchievements()

  const categories = useMemo(() => {
    if (!achievements || achievements.length === 0) {
      return ['All']
    }
    return ['All', ...Array.from(new Set(achievements.map(a => a.category).filter(Boolean)))]
  }, [achievements])

  return (
    <AnimatedContainer delay={0.15}>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(category)}
            aria-pressed={activeFilter === category}
          >
            {category}
          </Button>
        ))}
      </div>
    </AnimatedContainer>
  )
}
