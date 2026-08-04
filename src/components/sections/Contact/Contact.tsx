import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { ContactContent } from './ContactContent'
import { ContactForm } from './ContactForm'
import { ContactMap } from './ContactMap'

export const Contact = () => {
  return (
    <AnimatedSection
      spacing="xl"
      background="surface"
      withContainer={true}
      containerPadding="lg"
    >
      <div className="space-y-12">
        <AnimatedHeading delay={0.1}>
          <Heading level={2} size="4xl" align="center">
            Get in Touch
          </Heading>
        </AnimatedHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ContactContent />
          <ContactForm />
        </div>

        <ContactMap />
      </div>
    </AnimatedSection>
  )
}
