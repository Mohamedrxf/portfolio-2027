import { useRef, useEffect, useState } from 'react'
import { useExperience } from '@/hooks'
import { useAchievements } from '@/hooks'
import { usePortfolio } from '@/hooks'
import { useReducedMotion } from '@/hooks'
import { JourneyCard } from './JourneyCard'

interface JourneyItem {
  id: string
  title: string
  subtitle: string
  description: string
  date: string
  tags?: string[]
}

export const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { experiences } = useExperience()
  const { achievements } = useAchievements()
  const { personalInfo } = usePortfolio()
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const journeyItems: JourneyItem[] = [
    {
      id: 'education',
      title: 'Education',
      subtitle: 'Current Studies',
      description: 'Pursuing degree in Computer Science with focus on software engineering and network systems.',
      date: 'Present',
      tags: ['Computer Science', 'Networking'],
    },
    ...(experiences.slice(0, 2).map((exp) => ({
      id: exp.id,
      title: exp.position,
      subtitle: exp.company,
      description: exp.description,
      date: exp.date,
      tags: exp.technologies.slice(0, 3),
    }))),
    ...(achievements.slice(0, 2).map((achievement) => ({
      id: achievement.id,
      title: achievement.title,
      subtitle: achievement.category,
      description: achievement.description,
      date: achievement.date,
      tags: [achievement.issuer || 'Award'],
    }))),
    {
      id: 'current-focus',
      title: 'Current Focus',
      subtitle: personalInfo.role,
      description: 'Building scalable distributed systems and enterprise networking solutions.',
      date: 'Present',
      tags: ['Software Engineering', 'Networking'],
    },
    {
      id: 'future-goal',
      title: 'Future Vision',
      subtitle: 'Next Steps',
      description: 'Expanding expertise in cloud architecture, AI/ML security, and enterprise infrastructure.',
      date: 'Future',
      tags: ['Cloud', 'AI Security', 'Infrastructure'],
    },
  ]



  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const cards = document.querySelectorAll('[data-journey-card]')
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
  }, [journeyItems.length, prefersReducedMotion])

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-16">
        {journeyItems.map((item, index) => {
          const cardId = 'journey-card-' + index
          const baseClasses = 'relative transition-all duration-500 ease-out'
          const animationClasses = prefersReducedMotion ? '' : 'opacity-0 translate-y-8'
          const visibleClasses = prefersReducedMotion || index <= activeIndex ? 'opacity-100 translate-y-0' : ''
          const className = baseClasses + ' ' + animationClasses + ' ' + visibleClasses

          return (
            <div
              key={item.id}
              id={cardId}
              className={className}
              data-journey-card
            >
              <JourneyCard
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                date={item.date}
                tags={item.tags}
                isActive={activeIndex === index}
                index={index}
                alternate={index % 2 === 1}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
