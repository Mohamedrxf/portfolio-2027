import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks'
import { Badge } from '@/components/ui/Badge'

interface JourneyCardProps {
  title: string
  subtitle: string
  description: string
  date: string
  tags?: string[]
  isActive: boolean
  index: number
  alternate: boolean
}

export const JourneyCard = ({
  title,
  subtitle,
  description,
  date,
  tags = [],
  isActive,
  index,
  alternate,
}: JourneyCardProps) => {
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
        transform: `perspective(1000px) rotateX(${-mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg) scale3d(${isActive ? 1.02 : 1}, ${isActive ? 1.02 : 1}, 1)`,
        transition: 'transform 0.3s ease-out',
      }

  const baseClasses = 'relative p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl transition-all duration-500 ease-out'
  const activeClasses = isActive ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--color-surface)]' : 'hover:ring-1 hover:ring-[var(--color-primary)]/50'
  const cardClassName = baseClasses + ' ' + activeClasses

  const layoutClass = alternate ? 'md:ml-auto' : 'md:mr-auto'

  return (
    <div
      ref={cardRef}
      className={`max-w-2xl ${layoutClass}`}
      style={{ marginTop: index > 0 ? '2rem' : '0' }}
    >
      <div
        className={cardClassName}
        style={parallaxStyle}
        role="article"
        aria-label={`${title} - ${subtitle}`}
        tabIndex={0}
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-lg">
                {subtitle}
              </p>
            </div>
            <Badge variant="outline" size="sm">
              {date}
            </Badge>
          </div>

          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
