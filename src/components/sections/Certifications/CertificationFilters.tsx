import { useMemo } from 'react'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useCertifications } from '@/hooks'

interface CertificationFiltersProps {
  onFilterChange: (filter: string) => void
  activeFilter: string
}

export const CertificationFilters = ({ onFilterChange, activeFilter }: CertificationFiltersProps) => {
  const { certifications } = useCertifications()

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()
    categoryMap.set('All', certifications.length)

    certifications.forEach((cert) => {
      if (cert.category) {
        categoryMap.set(cert.category, (categoryMap.get(cert.category) || 0) + 1)
      }
    })

    return Array.from(categoryMap.entries())
  }, [certifications])

  const handleFilterClick = (category: string) => {
    onFilterChange(category)
  }

  return (
    <AnimatedContainer delay={0.15}>
      <div className="flex flex-wrap justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(([category, count]) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Button
              variant={activeFilter === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleFilterClick(category)}
              aria-pressed={activeFilter === category}
              className="min-w-fit"
            >
              {category} <span className="ml-1 opacity-70">({count})</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </AnimatedContainer>
  )
}
