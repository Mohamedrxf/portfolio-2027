import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Button } from '@/components/ui/Button'

export const CertificationFilters = () => {
  return (
    <AnimatedContainer delay={0.15}>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="primary" size="sm">
          All
        </Button>
        <Button variant="outline" size="sm">
          Cloud
        </Button>
        <Button variant="outline" size="sm">
          Development
        </Button>
        <Button variant="outline" size="sm">
          DevOps
        </Button>
        <Button variant="outline" size="sm">
          Data Science
        </Button>
        <Button variant="outline" size="sm">
          Security
        </Button>
        <Button variant="outline" size="sm">
          Mobile
        </Button>
      </div>
    </AnimatedContainer>
  )
}
