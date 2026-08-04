import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Button } from '@/components/ui/Button'

export const ProjectFilters = () => {
  return (
    <AnimatedContainer delay={0.25}>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="primary" size="sm">
          All
        </Button>
        <Button variant="outline" size="sm">
          Web App
        </Button>
        <Button variant="outline" size="sm">
          SaaS
        </Button>
        <Button variant="outline" size="sm">
          Mobile
        </Button>
        <Button variant="outline" size="sm">
          Data Visualization
        </Button>
        <Button variant="outline" size="sm">
          Developer Tool
        </Button>
      </div>
    </AnimatedContainer>
  )
}
