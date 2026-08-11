/**
 * CursorFollower Component
 * 
 * A custom cursor with a dot and follower that tracks pointer movement.
 * Desktop-only with pointer-events:none to never interfere with interactions.
 * Disabled on touch devices and when reduced motion is preferred.
 * 
 * Uses CSS variables for performance (no React state on every pointermove).
 */

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks'
import { useMediaQuery } from '@/hooks'
import { ANIMATION_CONSTANTS } from '@/lib/constants/animations'

export const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isTouch = useMediaQuery('(pointer: coarse)')

  const disabled = prefersReducedMotion || isTouch

  useEffect(() => {
    if (disabled) return

    const dot = dotRef.current
    const follower = followerRef.current

    if (!dot || !follower) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let followerX = 0
    let followerY = 0

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Smooth dot movement
      const dotSmoothness = 0.5
      dotX += (mouseX - dotX) * dotSmoothness
      dotY += (mouseY - dotY) * dotSmoothness

      // Smooth follower movement with delay
      const followerSmoothness = ANIMATION_CONSTANTS.cursor.smoothness
      followerX += (mouseX - followerX) * followerSmoothness
      followerY += (mouseY - followerY) * followerSmoothness

      dot.style.transform = `translate(${dotX}px, ${dotY}px)`
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`

      requestAnimationFrame(animate)
    }

    const handleClick = () => {
      if (!dot) return

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${ANIMATION_CONSTANTS.cursor.clickScale})`
      setTimeout(() => {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`
      }, 150)
    }

    const handleLinkHover = () => {
      if (!follower) return
      follower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`
    }

    const handleLinkLeave = () => {
      if (!follower) return
      follower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`
    }

    // Start animation loop
    const animationId = requestAnimationFrame(animate)

    // Add event listeners
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('click', handleClick)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover)
      el.addEventListener('mouseleave', handleLinkLeave)
    })

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('click', handleClick)

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover)
        el.removeEventListener('mouseleave', handleLinkLeave)
      })

      // Restore default cursor
      document.body.style.cursor = ''
    }
  }, [disabled])

  if (disabled) return null

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-primary)] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: `${ANIMATION_CONSTANTS.cursor.dotSize}px`,
          height: `${ANIMATION_CONSTANTS.cursor.dotSize}px`,
        }}
      />

      {/* Follower cursor */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[var(--color-primary)] mix-blend-difference"
        style={{
          width: `${ANIMATION_CONSTANTS.cursor.followerSize}px`,
          height: `${ANIMATION_CONSTANTS.cursor.followerSize}px`,
          transition: 'transform 0.15s ease-out',
        }}
      />
    </>
  )
}

