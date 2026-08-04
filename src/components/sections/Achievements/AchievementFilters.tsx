import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Button } from '@/components/ui/Button'

export const AchievementFilters = () => {
  return (
    <AnimatedContainer delay={0.15}>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="primary" size="sm">
          All
        </Button>
        <Button variant="outline" size="sm">
          Awards
        </Button>
        <Button variant="outline" size="sm">
          Competitions
        </Button>
        <Button variant="outline" size="sm">
          Hackathons
        </Button>
        <Button variant="outline" size="sm">
          Recognitions
        </Button>
      </div>
    </AnimatedContainer>
  )
}
