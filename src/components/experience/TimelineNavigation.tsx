import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks'

interface TimelineNavigationProps {
  items: Array<{ id: string; company: string; position: string }>
  currentIndex: number
  onNavigate: (index: number) => void
}

export const TimelineNavigation = ({ items, currentIndex, onNavigate }: TimelineNavigationProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsSticky(scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) onNavigate(index - 1)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (index < items.length - 1) onNavigate(index + 1)
        break
      case 'Home':
        e.preventDefault()
        onNavigate(0)
        break
      case 'End':
        e.preventDefault()
        onNavigate(items.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        onNavigate(index)
        break
    }
  }

  return (
    <nav
      className={`
        mb-8 p-4 rounded-xl backdrop-blur-xl
        bg-gradient-to-br from-white/10 to-white/5
        border border-white/20 shadow-xl
        transition-all duration-300
        ${isSticky ? 'sticky top-4 z-50' : ''}
      `}
      aria-label="Timeline navigation"
    >
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-300
              ${index === currentIndex
                ? 'bg-[var(--color-primary)] text-white shadow-lg'
                : 'bg-white/5 text-[var(--color-text-secondary)] hover:bg-white/10'
              }
            `}
            aria-current={index === currentIndex ? 'true' : 'false'}
            aria-label={`Navigate to ${item.company} - ${item.position}`}
            tabIndex={0}
          >
            {item.company}
          </button>
        ))}
      </div>
    </nav>
  )
}
