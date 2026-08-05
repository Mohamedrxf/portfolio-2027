import { useRef, useEffect, useState, useCallback } from 'react'
import { useExperience } from '@/hooks'
import { useReducedMotion } from '@/hooks'
import { TimelineCard } from './TimelineCard'
import { TimelineLine } from './TimelineLine'
import { TimelineIndicator } from './TimelineIndicator'
import { TimelineProgress } from './TimelineProgress'
import { TimelineNavigation } from './TimelineNavigation'
import { TimelineBackground } from './TimelineBackground'

export const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { experiences } = useExperience()
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleNavigate = useCallback((index: number) => {
    setActiveIndex(index)
    const cardElement = document.getElementById(`experience-card-${index}`)
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

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
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [experiences.length, prefersReducedMotion])

  if (experiences.length === 0) {
    return null
  }

  return (
    <TimelineBackground>
      <div
        ref={containerRef}
        className="relative max-w-4xl mx-auto px-4 py-8"
        role="list"
        aria-label="Professional experience timeline"
      >
        <TimelineNavigation
          items={experiences}
          currentIndex={activeIndex}
          onNavigate={handleNavigate}
        />

        <div className="flex items-center gap-4 mb-8">
          <TimelineProgress currentIndex={activeIndex} totalItems={experiences.length} />
        </div>

        <div className="relative">
          <TimelineLine totalItems={experiences.length} activeIndex={activeIndex} />

          <div className="space-y-8 md:space-y-12">
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
                <div data-timeline-indicator>
                  <TimelineIndicator
                    isActive={activeIndex === index || hoveredIndex === index}
                  />
                </div>

                <div className="md:ml-8">
                  <TimelineCard
                    experience={experience}
                    isActive={activeIndex === index || hoveredIndex === index}
                    onMouseEnter={createMouseEnterHandler(index)}
                    onMouseLeave={handleMouseLeave}
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
