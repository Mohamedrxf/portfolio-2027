import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { StaggerContainer } from '@/components/animations/StaggerContainer'
import { EducationCard } from '@/components/sections/Education/EducationCard'
import { useEducation } from '@/hooks'

export const AboutEducation = () => {
  const { education } = useEducation()

  // Take top 2 education entries for the summary
  const educationHighlights = education.slice(0, 2)

  return (
    <section className="py-12 border-t border-[var(--color-border)] relative" aria-labelledby="education-heading">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-50" aria-hidden="true" />
      
      <AnimatedHeading delay={0.1}>
        <h2 id="education-heading" className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">
          Education
        </h2>
      </AnimatedHeading>

      <StaggerContainer stagger={0.15} delayChildren={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
          {educationHighlights.map((edu) => (
            <EducationCard
              key={edu.id}
              institution={edu.institution}
              degree={edu.field || edu.degree}
              duration={edu.date}
              description={edu.description}
              achievements={edu.achievements || []}
              gpa={edu.gpa || ''}
              delay={0}
            />
          ))}
        </div>
      </StaggerContainer>
    </section>
  )
}
