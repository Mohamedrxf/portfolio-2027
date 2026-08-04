import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

interface TimelineNodeProps {
  delay: number
}

export const TimelineNode = ({ delay }: TimelineNodeProps) => {
  return (
    <AnimatedContainer delay={delay}>
      <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-surface)] shadow-lg" />
    </AnimatedContainer>
  )
}
