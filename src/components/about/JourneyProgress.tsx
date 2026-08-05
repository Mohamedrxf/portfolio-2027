import { useReducedMotion } from '@/hooks'

interface JourneyProgressProps {
  currentIndex: number
  totalItems: number
}

export const JourneyProgress = ({ currentIndex, totalItems }: JourneyProgressProps) => {
  const prefersReducedMotion = useReducedMotion()
  const progress = ((currentIndex + 1) / totalItems) * 100

  return (
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
      role="navigation"
      aria-label="Journey progress"
    >
      <div className="relative w-1 h-48 bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/50 rounded-full"
          style={{
            height: prefersReducedMotion ? '100%' : `${progress}%`,
            transition: prefersReducedMotion ? 'none' : 'height 0.5s ease-out',
          }}
        />
      </div>

      <div className="text-xs text-[var(--color-text-secondary)] font-medium text-center">
        {currentIndex + 1} / {totalItems}
      </div>
    </div>
  )
}
