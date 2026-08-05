import { useReducedMotion } from '@/hooks'

interface TimelineProgressProps {
  currentIndex: number
  totalItems: number
}

export const TimelineProgress = ({ currentIndex, totalItems }: TimelineProgressProps) => {
  const prefersReducedMotion = useReducedMotion()
  const progress = ((currentIndex + 1) / totalItems) * 100

  return (
    <div
      className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
      role="status"
      aria-live="polite"
      aria-label={`Timeline progress: ${currentIndex + 1} of ${totalItems}`}
    >
      <div className="relative w-32 h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className={`
            absolute top-0 left-0 h-full
            bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/70
            rounded-full transition-all duration-500 ease-out
          `}
          style={{
            width: `${progress}%`,
            transition: prefersReducedMotion ? 'none' : 'width 0.5s ease-out',
          }}
        />
      </div>
      <span className="font-medium">
        {currentIndex + 1} / {totalItems}
      </span>
    </div>
  )
}
