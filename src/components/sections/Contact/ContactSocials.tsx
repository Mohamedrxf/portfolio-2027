import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Button } from '@/components/ui/Button'

export const ContactSocials = () => {
  return (
    <AnimatedContainer delay={0.25}>
      <div className="space-y-3">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">
          Connect with me
        </h4>
        <div className="flex flex-wrap gap-3">
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
