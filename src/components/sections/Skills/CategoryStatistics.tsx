import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'

interface CategoryStatisticsProps {
  totalSkills: number
  expertSkills: number
  categories: number
  yearsOfExperience: number
}

export const CategoryStatistics = ({
  totalSkills,
  expertSkills,
  categories,
  yearsOfExperience,
}: CategoryStatisticsProps) => {
  const stats = [
    {
      label: 'Total Skills',
      value: totalSkills,
      color: 'var(--color-primary)',
    },
    {
      label: 'Expert Level',
      value: expertSkills,
      color: 'var(--color-secondary)',
    },
    {
      label: 'Categories',
      value: categories,
      color: 'var(--color-warning)',
    },
    {
      label: 'Years Exp',
      value: yearsOfExperience,
      color: 'var(--color-accent)',
    },
  ]

  return (
    <AnimatedCard cardVariant="default" className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: stat.color }}
            >
              <AnimatedCounter value={stat.value} duration={1.5} delay={0.5 + index * 0.1} />
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </AnimatedCard>
  )
}
