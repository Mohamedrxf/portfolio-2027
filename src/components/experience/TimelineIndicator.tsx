import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks'

interface TimelineIndicatorProps {
  isActive: boolean
}

export const TimelineIndicator = ({ isActive }: TimelineIndicatorProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !indicatorRef.current) return

    if (isActive) {
      indicatorRef.current.style.transform = 'scale(1.5)'
      indicatorRef.current.style.boxShadow = '0 0 20px var(--color-primary)'
    } else {
      indicatorRef.current.style.transform = 'scale(1)'
      indicatorRef.current.style.boxShadow = 'none'
    }
  }, [isActive, prefersReducedMotion])

  return (
    <div
      ref={indicatorRef}
      className={`
        absolute left-6 top-6 w-4 h-4 rounded-full
        bg-[var(--color-primary)] border-4 border-[var(--color-surface)]
        transition-all duration-500 ease-out
        ${isActive ? 'z-10' : 'z-0'}
      `}
      style={{
        transform: prefersReducedMotion ? 'none' : isActive ? 'scale(1.5)' : 'scale(1)',
        boxShadow: prefersReducedMotion ? 'none' : isActive ? '0 0 20px var(--color-primary)' : 'none',
      }}
      aria-hidden="true"
    />
  )
}
