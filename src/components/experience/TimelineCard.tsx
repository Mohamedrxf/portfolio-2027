import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks'
import { Badge } from '@/components/ui/Badge'
import type { Experience } from '@/data'

interface TimelineCardProps {
  experience: Experience
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const TimelineCard = ({
  experience,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: TimelineCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return

    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  const parallaxStyle = prefersReducedMotion
    ? {}
    : {
        transform: 'perspective(1000px) rotateX(' + String(-mousePosition.y * 5) + 'deg) rotateY(' + String(mousePosition.x * 5) + 'deg) scale3d(' + String(isActive ? 1.02 : 1) + ', ' + String(isActive ? 1.02 : 1) + ', 1)',
        transition: 'transform 0.3s ease-out',
      }

  return (
    <div
      ref={cardRef}
      className={'relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl transition-all duration-500 ease-out ' + (isActive ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--color-surface)]' : 'hover:ring-1 hover:ring-[var(--color-primary)]/50')}
      style={parallaxStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role='article'
      aria-label={experience.position + ' at ' + experience.company}
      tabIndex={0}
    >
      <div className='space-y-4'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
          <div>
            <h3 className='text-xl font-semibold text-[var(--color-text-primary)]'>
              {experience.position}
            </h3>
            <p className='text-[var(--color-text-secondary)]'>
              {experience.company}
            </p>
          </div>
          <Badge variant='outline' size='sm'>
            {experience.date}
          </Badge>
        </div>

        <p className='text-[var(--color-text-secondary)] leading-relaxed'>
          {experience.description}
        </p>

        {experience.responsibilities && experience.responsibilities.length > 0 && (
          <div>
            <h4 className='text-sm font-semibold text-[var(--color-text-primary)] mb-2'>
              Responsibilities
            </h4>
            <ul className='space-y-1'>
              {experience.responsibilities.map((responsibility, idx) => (
                <li
                  key={idx}
                  className='text-sm text-[var(--color-text-secondary)] flex items-start gap-2'
                >
                  <span className='text-[var(--color-primary)] mt-1'>•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className='text-sm font-semibold text-[var(--color-text-primary)] mb-2'>
              Key Achievements
            </h4>
            <ul className='space-y-1'>
              {experience.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className='text-sm text-[var(--color-text-secondary)] flex items-start gap-2'
                >
                  <span className='text-[var(--color-primary)] mt-1'>✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className='flex flex-wrap gap-2'>
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant='secondary' size='sm'>
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
