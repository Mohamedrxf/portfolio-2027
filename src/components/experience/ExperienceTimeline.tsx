import { useRef, useEffect, useState, useCallback } from 'react'
import { useExperience } from '@/hooks'
import { useReducedMotion } from '@/hooks'
import { TimelineCard } from './TimelineCard'
import { TimelineLine } from './TimelineLine'
import { TimelineIndicator } from './TimelineIndicator'
import { TimelineBackground } from './TimelineBackground'

export const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { experiences } = useExperience()
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const createMouseEnterHandler = useCallback((index: number) => {
    return () => setHoveredIndex(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const cards = document.querySelectorAll('[data-timeline-card]')
      let newActiveIndex = 0

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const centerY = window.innerHeight / 2
        if (rect.top <= centerY && rect.bottom >= centerY) {
          newActiveIndex = index
        }
      })

      setActiveIndex(newActiveIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [experiences.length, prefersReducedMotion])

  if (experiences.length === 0) {
    return null
  }

  return (
    <TimelineBackground>
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto px-4 py-12"
        role="list"
        aria-label="Professional experience timeline"
      >
        <div className="relative">
          <TimelineLine totalItems={experiences.length} activeIndex={activeIndex} />

          <div className="space-y-8 md:space-y-16">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                id={`experience-card-${index}`}
                className={`
                  relative pl-20 md:pl-0
                  transition-all duration-500 ease-out
                  ${prefersReducedMotion ? '' : 'opacity-0 translate-y-8'}
                  ${prefersReducedMotion || index <= activeIndex ? 'opacity-100 translate-y-0' : ''}
                `}
                data-timeline-card
              >
                <div 
                  className="absolute left-0 top-6 md:left-1/2 md:-translate-x-1/2 z-10"
                  data-timeline-indicator
                >
                  <TimelineIndicator
                    isActive={activeIndex === index || hoveredIndex === index}
                  />
                </div>

                <div className="md:ml-8 lg:ml-16">
                  <TimelineCard
                    experience={experience}
                    isActive={activeIndex === index || hoveredIndex === index}
                    onMouseEnter={createMouseEnterHandler(index)}
                    onMouseLeave={handleMouseLeave}
                    index={index}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TimelineBackground>
  )
}
