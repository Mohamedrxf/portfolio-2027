import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks'

interface JourneyNavigationProps {
  sections: Array<{ id: string; title: string }>
  currentIndex: number
  onNavigate: (index: number) => void
}

export const JourneyNavigation = ({ sections, currentIndex, onNavigate }: JourneyNavigationProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
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
        if (index < sections.length - 1) onNavigate(index + 1)
        break
      case 'Home':
        e.preventDefault()
        onNavigate(0)
        break
      case 'End':
        e.preventDefault()
        onNavigate(sections.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        onNavigate(index)
        break
    }
  }

  const navClass = 'fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 hidden md:flex ' + (isSticky ? 'opacity-100' : 'opacity-50')

  return (
    <nav
      className={navClass}
      aria-label="Story navigation"
    >
      <div className="flex flex-col gap-3">
        {sections.map((section, index) => {
          const isActive = index === currentIndex
          const buttonClass = 'w-3 h-3 rounded-full transition-all duration-300 ' + (isActive ? 'bg-[var(--color-primary)] scale-125 shadow-lg' : 'bg-[var(--color-border)] hover:bg-[var(--color-primary)]/50')
          
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={buttonClass}
              aria-current={isActive ? 'true' : 'false'}
              aria-label={'Navigate to ' + section.title}
              tabIndex={0}
            />
          )
        })}
      </div>
    </nav>
  )
}
