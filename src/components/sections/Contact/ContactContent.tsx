import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Heading } from '@/components/ui/Heading'
import { ContactInfo } from './ContactInfo'
import { ContactSocials } from './ContactSocials'

export const ContactContent = () => {
  return (
    <div className="space-y-8">
      <AnimatedContainer delay={0.15}>
        <div className="space-y-4">
          <Heading level={3} size="2xl">
            Let's work together
          </Heading>

          <p className="text-[var(--color-text-secondary)]">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            Fill out the form or reach out directly through any of the channels below.
          </p>
        </div>
      </AnimatedContainer>

      <ContactInfo />

      <ContactSocials />
    </div>
  )
}
