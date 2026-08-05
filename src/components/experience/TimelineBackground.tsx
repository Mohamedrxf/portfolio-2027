import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks'

interface TimelineBackgroundProps {
  children: React.ReactNode
}

export const TimelineBackground = ({ children }: TimelineBackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !backgroundRef.current) return

    const background = backgroundRef.current
    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20
    }

    const animate = () => {
      if (background) {
        background.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={backgroundRef}
      className="relative"
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute -top-1/2 -right-1/2 w-full h-full
            bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent
            rounded-full blur-3xl
            transition-transform duration-700 ease-out
            ${prefersReducedMotion ? 'transform-none' : ''}
          `}
        />
        <div
          className={`
            absolute -bottom-1/2 -left-1/2 w-full h-full
            bg-gradient-to-tr from-[var(--color-primary)]/5 to-transparent
            rounded-full blur-3xl
            transition-transform duration-700 ease-out
            ${prefersReducedMotion ? 'transform-none' : ''}
          `}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
