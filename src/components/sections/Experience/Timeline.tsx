import { TimelineItem } from './TimelineItem'
import { useExperience } from '@/hooks'

export const Timeline = () => {
  const { experiences } = useExperience()

  return (
    <div className="relative max-w-4xl mx-auto px-4" role="list" aria-label="Professional experience timeline">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />
      
      <div className="space-y-8 md:space-y-12">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            position={exp.position}
            company={exp.company}
            duration={exp.date}
            description={exp.description}
            technologies={exp.technologies}
            responsibilities={exp.responsibilities}
            achievements={exp.achievements}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}
