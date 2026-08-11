/**
 * useSmoothScroll Hook
 * 
 * Integrates Lenis smooth scrolling with hash navigation.
 * Compatible with IntersectionObserver and Framer Motion.
 * Disabled on touch devices and when reduced motion is preferred.
 */

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from './useReducedMotion'
import { useMediaQuery } from './useMediaQuery'

interface UseSmoothScrollOptions {
  duration?: number
  easing?: (t: number) => number
  touchMultiplier?: number
  infinite?: boolean
}

export const useSmoothScroll = (options: UseSmoothScrollOptions = {}) => {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const isTouch = useMediaQuery('(pointer: coarse)')

  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier = 2,
    infinite = false,
  } = options

  const disabled = prefersReducedMotion || isTouch

  useEffect(() => {
    if (disabled) return

    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration,
      easing,
      touchMultiplier,
      infinite,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
    })

    // Integrate with requestAnimationFrame
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time)
      }
      requestAnimationFrame(raf)
    }

    const animationId = requestAnimationFrame(raf)

    // Handle hash navigation for smooth scrolling
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element as HTMLElement)
        }
      }
    }

    // Handle initial hash on load
    if (window.location.hash) {
      setTimeout(handleHashChange, 100)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('hashchange', handleHashChange)

      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [disabled, duration, easing, touchMultiplier, infinite])

  // Expose scrollTo method for programmatic scrolling
  const scrollTo = (target: string | number | HTMLElement, offset?: number) => {
    if (disabled || !lenisRef.current) {
      // Fallback to native scroll
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    if (typeof target === 'string') {
      const element = document.querySelector(target)
      if (element) {
        const htmlElement = element as HTMLElement
        if (offset !== undefined) {
          const targetPosition = htmlElement.getBoundingClientRect().top + window.scrollY - offset
          lenisRef.current.scrollTo(targetPosition)
        } else {
          lenisRef.current.scrollTo(htmlElement)
        }
      }
    } else if (typeof target === 'number') {
      lenisRef.current.scrollTo(target)
    } else if (target instanceof HTMLElement) {
      if (offset !== undefined) {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
        lenisRef.current.scrollTo(targetPosition)
      } else {
        lenisRef.current.scrollTo(target)
      }
    }
  }

  return { scrollTo, lenis: lenisRef.current }
}

