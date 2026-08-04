import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const ContactMap = () => {
  return (
    <AnimatedContainer delay={0.4}>
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
        <div className="w-full h-48 bg-[var(--color-surface)] rounded-lg border-2 border-dashed border-[var(--color-border)] flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-[var(--color-text-tertiary)] mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              Map Placeholder
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            San Francisco, California
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
            Map integration coming soon
          </p>
        </div>
      </div>
    </AnimatedContainer>
  )
}
