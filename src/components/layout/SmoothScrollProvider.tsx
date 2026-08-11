/**
 * SmoothScrollProvider Component
 * 
 * Provides smooth scrolling using Lenis across the application.
 * Integrates with hash navigation and is compatible with Framer Motion.
 * Disabled on touch devices and when reduced motion is preferred.
 */

import { useEffect } from 'react'
import { useSmoothScroll } from '@/hooks'

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const { scrollTo } = useSmoothScroll({
    duration: 1.2,
  })

  useEffect(() => {
    // Expose scrollTo globally for hash navigation
    ;(window as any).scrollToSection = scrollTo
  }, [scrollTo])

  return <>{children}</>
}
