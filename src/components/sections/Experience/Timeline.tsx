import { TimelineItem } from './TimelineItem'
import { useExperience } from '@/hooks'

export const Timeline = () => {
  const { experiences } = useExperience()

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            position={exp.position}
            company={exp.company}
            duration={exp.date}
            description={exp.description}
            technologies={exp.technologies}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}
