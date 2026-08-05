import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { TimelineNode } from './TimelineNode'
import { ExperienceCard } from './ExperienceCard'

interface TimelineItemProps {
  position: string
  company: string
  duration: string
  description: string
  technologies: string[]
  responsibilities?: string[]
  achievements?: string[]
  delay: number
}

export const TimelineItem = ({
  position,
  company,
  duration,
  description,
  technologies,
  responsibilities,
  achievements,
  delay,
}: TimelineItemProps) => {
  return (
    <AnimatedContainer delay={delay}>
      <div className="relative pl-20 md:pl-0">
        <TimelineNode delay={delay} />
        
        <div className="md:ml-8">
          <ExperienceCard
            position={position}
            company={company}
            duration={duration}
            description={description}
            technologies={technologies}
            responsibilities={responsibilities}
            achievements={achievements}
            delay={delay}
          />
        </div>
      </div>
    </AnimatedContainer>
  )
}
