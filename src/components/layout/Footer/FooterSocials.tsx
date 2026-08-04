import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Button } from '@/components/ui/Button'

export const FooterSocials = () => {
  return (
    <AnimatedContainer delay={0.2}>
      <div>
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">
          Connect
        </h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            GitHub
          </Button>
          <Button variant="outline" size="sm">
            LinkedIn
          </Button>
          <Button variant="outline" size="sm">
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            Email
          </Button>
        </div>
      </div>
    </AnimatedContainer>
  )
}
