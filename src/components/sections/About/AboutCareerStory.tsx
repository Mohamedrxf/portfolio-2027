import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { TimelineItem } from '@/components/sections/Experience/TimelineItem'
import { useExperience } from '@/hooks'

export const AboutCareerStory = () => {
  const { experiences } = useExperience()

  // Take top 3 experiences for the career story section
  const careerHighlights = experiences.slice(0, 3)

  return (
    <section className="py-12 border-t border-[var(--color-border)] relative" aria-labelledby="career-journey-heading">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" aria-hidden="true" />
      
      <AnimatedHeading delay={0.1}>
        <h2 id="career-journey-heading" className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">
          Career Journey
        </h2>
      </AnimatedHeading>

      <div className="relative max-w-3xl">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" aria-hidden="true" />
        
        <StaggerContainer stagger={0.15} delayChildren={0.2}>
          <div className="space-y-8" role="list">
            {careerHighlights.map((exp) => (
              <StaggerItem key={exp.id}>
                <TimelineItem
                  position={exp.position}
                  company={exp.company}
                  duration={exp.date}
                  description={exp.description}
                  technologies={exp.technologies}
                  delay={0}
                />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
