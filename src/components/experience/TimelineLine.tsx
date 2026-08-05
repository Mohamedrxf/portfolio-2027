import { useReducedMotion } from '@/hooks'

interface TimelineLineProps {
  totalItems: number
  activeIndex: number
}

export const TimelineLine = ({ totalItems, activeIndex }: TimelineLineProps) => {
  const prefersReducedMotion = useReducedMotion()
  const progress = (activeIndex + 1) / totalItems

  return (
    <div
      className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--color-border)]"
      aria-hidden="true"
    >
      <div
        className={`
          absolute top-0 left-0 w-full
          bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/50
          transition-all duration-500 ease-out
        `}
        style={{
          height: prefersReducedMotion ? '100%' : `${progress * 100}%`,
        }}
      />
    </div>
  )
}
