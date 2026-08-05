import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks'

interface FloatingAccentProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const FloatingAccent = ({ position, size = 'md', color = 'var(--color-primary)' }: FloatingAccentProps) => {
  const accentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !accentRef.current) return

    const accent = accentRef.current
    let animationFrameId: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      const x = Math.sin(elapsed * 0.001) * 20
      const y = Math.cos(elapsed * 0.0015) * 20

      accent.style.transform = 'translate(' + String(x) + 'px, ' + String(y) + 'px)'
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion])

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  }

  const positionClasses = {
    'top-left': 'top-10 left-10',
    'top-right': 'top-10 right-10',
    'bottom-left': 'bottom-10 left-10',
    'bottom-right': 'bottom-10 right-10',
  }

  const baseClasses = 'absolute rounded-full blur-3xl opacity-20'
  const sizeClass = sizeClasses[size]
  const positionClass = positionClasses[position]
  const reducedMotionClass = prefersReducedMotion ? '' : ''

  const className = baseClasses + ' ' + sizeClass + ' ' + positionClass + ' ' + reducedMotionClass

  return (
    <div
      ref={accentRef}
      className={className}
      style={{
        backgroundColor: color,
        transition: prefersReducedMotion ? 'none' : 'transform 0.3s ease-out',
      }}
      aria-hidden="true"
    />
  )
}
