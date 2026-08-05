import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Heading } from '@/components/ui/Heading'
import { ProjectShowcase } from '@/components/projects'
import { FeaturedProject } from './FeaturedProject'
import { useProjects } from '@/hooks'

export const Projects = () => {
  useProjects()

  return (
    <AnimatedSection
      spacing="xl"
      background="default"
      withContainer={true}
      containerPadding="lg"
    >
      <div className="space-y-12 relative">
        <AnimatedHeading delay={0.1}>
          <Heading level={2} size="4xl" align="center">
            Projects
          </Heading>
        </AnimatedHeading>

        <FeaturedProject />

        <ProjectShowcase showBackground={true} />
      </div>
    </AnimatedSection>
  )
}
