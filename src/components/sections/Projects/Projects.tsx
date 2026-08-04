import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { FeaturedProject } from './FeaturedProject'
import { ProjectFilters } from './ProjectFilters'
import { ProjectsGrid } from './ProjectsGrid'

export const Projects = () => {
  return (
    <AnimatedSection
      spacing="xl"
      background="default"
      withContainer={true}
      containerPadding="lg"
    >
      <div className="space-y-12">
        <AnimatedHeading delay={0.1}>
          <Heading level={2} size="4xl" align="center">
            Projects
          </Heading>
        </AnimatedHeading>

        <FeaturedProject />

        <ProjectFilters />

        <ProjectsGrid />
      </div>
    </AnimatedSection>
  )
}
