import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { TimelineNode } from './TimelineNode'
import { ExperienceCard } from './ExperienceCard'

interface TimelineItemProps {
  position: string
  company: string
  duration: string
  description: string
  technologies: string[]
  delay: number
}

export const TimelineItem = ({
  position,
  company,
  duration,
  description,
  technologies,
  delay,
}: TimelineItemProps) => {
  return (
    <AnimatedContainer delay={delay}>
      <div className="relative pl-12 md:pl-0">
        <TimelineNode delay={delay} />
        
        <ExperienceCard
          position={position}
          company={company}
          duration={duration}
          description={description}
          technologies={technologies}
          delay={delay}
        />
      </div>
    </AnimatedContainer>
  )
}
