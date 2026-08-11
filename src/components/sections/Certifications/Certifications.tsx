import { useState } from 'react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { CertificationGrid } from './CertificationGrid'
import { CertificationFilters } from './CertificationFilters'

export const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <section id="certifications" className="scroll-mt-16">
      <AnimatedSection
        spacing="xl"
        background="surface"
        withContainer={true}
        containerPadding="lg"
      >
      <div className="space-y-12">
        <AnimatedHeading delay={0.1}>
          <Heading level={2} size="4xl" align="center">
            Certifications
          </Heading>
        </AnimatedHeading>

        <CertificationFilters onFilterChange={setActiveFilter} />

        <CertificationGrid activeFilter={activeFilter} />
      </div>
    </AnimatedSection>
    </section>
  )
}
