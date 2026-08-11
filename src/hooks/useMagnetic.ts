/**
 * useMagnetic Hook
 * 
 * Creates a magnetic effect that makes elements follow the cursor subtly.
 * Uses CSS variables for performance (no React state on every pointermove).
 * 
 * @param strength - How strongly the element follows the cursor (0-1)
 * @param damping - Smoothness of the movement (0-1)
 * @param radius - Distance threshold for magnetic effect in pixels
 */

import { useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

interface UseMagneticOptions {
  strength?: number
  damping?: number
  radius?: number
  disabled?: boolean
}

export const useMagnetic = (options: UseMagneticOptions = {}) => {
  const {
    strength = ANIMATION_CONSTANTS.magnetic.strength,
    damping = ANIMATION_CONSTANTS.magnetic.damping,
    radius = ANIMATION_CONSTANTS.magnetic.radius,
    disabled: manualDisabled = false,
  } = options

  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const disabled = manualDisabled || prefersReducedMotion

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (disabled || !ref.current) return

    const element = ref.current
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < radius) {
      const moveX = deltaX * strength
      const moveY = deltaY * strength

      element.style.setProperty('--magnetic-x', `${moveX}px`)
      element.style.setProperty('--magnetic-y', `${moveY}px`)
      element.style.setProperty('--magnetic-active', '1')
    } else {
      element.style.setProperty('--magnetic-x', '0px')
      element.style.setProperty('--magnetic-y', '0px')
      element.style.setProperty('--magnetic-active', '0')
    }
  }, [disabled, strength, radius])

  const handlePointerLeave = useCallback(() => {
    if (disabled || !ref.current) return

    ref.current.style.setProperty('--magnetic-x', '0px')
    ref.current.style.setProperty('--magnetic-y', '0px')
    ref.current.style.setProperty('--magnetic-active', '0')
  }, [disabled])

  useEffect(() => {
    if (disabled || !ref.current) return

    const element = ref.current

    // Initialize CSS variables
    element.style.setProperty('--magnetic-x', '0px')
    element.style.setProperty('--magnetic-y', '0px')
    element.style.setProperty('--magnetic-active', '0')
    element.style.setProperty('--magnetic-damping', damping.toString())

    element.addEventListener('pointermove', handlePointerMove, { passive: true })
    element.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [disabled, damping, handlePointerMove, handlePointerLeave])

  return ref
}
