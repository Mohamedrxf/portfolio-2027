import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

export const ScrollIndicator = () => {
  const prefersReducedMotion = useReducedMotion()

  const handleClick = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (prefersReducedMotion) {
    return (
      <button
        onClick={handleClick}
        className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="sr-only">Scroll to next section</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    )
  }

  return (
    <AnimatedContainer delay={1.2}>
      <button
        onClick={handleClick}
        className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="sr-only">Scroll to next section</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </button>
    </AnimatedContainer>
  )
}
