/**
 * useSpotlight Hook
 * 
 * Creates a pointer spotlight effect that follows the cursor within an element.
 * Uses CSS variables for performance (no React state on every pointermove).
 * 
 * @param size - Size of the spotlight in pixels
 * @param opacity - Opacity of the spotlight (0-1)
 * @param disabled - Manually disable the effect
 */

import { useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { useMediaQuery } from './useMediaQuery'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

interface UseSpotlightOptions {
  size?: number
  opacity?: number
  disabled?: boolean
}

export const useSpotlight = (options: UseSpotlightOptions = {}) => {
  const {
    size = ANIMATION_CONSTANTS.spotlight.size,
    opacity = ANIMATION_CONSTANTS.spotlight.opacity,
    disabled: manualDisabled = false,
  } = options

  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isTouch = useMediaQuery('(pointer: coarse)')
  const disabled = manualDisabled || prefersReducedMotion || isTouch

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (disabled || !ref.current) return

    const element = ref.current
    const rect = element.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    element.style.setProperty('--spotlight-x', `${x}px`)
    element.style.setProperty('--spotlight-y', `${y}px`)
    element.style.setProperty('--spotlight-active', '1')
  }, [disabled])

  const handlePointerEnter = useCallback(() => {
    if (disabled || !ref.current) return

    ref.current.style.setProperty('--spotlight-active', '1')
  }, [disabled])

  const handlePointerLeave = useCallback(() => {
    if (disabled || !ref.current) return

    ref.current.style.setProperty('--spotlight-active', '0')
  }, [disabled])

  useEffect(() => {
    if (disabled || !ref.current) return

    const element = ref.current

    // Initialize CSS variables
    element.style.setProperty('--spotlight-size', `${size}px`)
    element.style.setProperty('--spotlight-opacity', opacity.toString())
    element.style.setProperty('--spotlight-x', '-1000px')
    element.style.setProperty('--spotlight-y', '-1000px')
    element.style.setProperty('--spotlight-active', '0')

    element.addEventListener('pointermove', handlePointerMove, { passive: true })
    element.addEventListener('pointerenter', handlePointerEnter)
    element.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerenter', handlePointerEnter)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [disabled, size, opacity, handlePointerMove, handlePointerEnter, handlePointerLeave])

  return ref
}
