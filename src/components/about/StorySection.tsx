import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Reveal } from '@/components/animations/Reveal'

interface StorySectionProps {
  id: string
  title: string
  children: React.ReactNode
  delay?: number
  alternate?: boolean
}

export const StorySection = ({ id, title, children, delay = 0, alternate = false }: StorySectionProps) => {
  const sectionClass = 'relative py-20 px-4 ' + (alternate ? 'bg-white/5' : '')
  const headingId = id + '-heading'

  return (
    <section
      id={id}
      className={sectionClass}
      aria-labelledby={headingId}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal delay={delay}>
          <h2
            id={headingId}
            className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-12 text-center"
          >
            {title}
          </h2>
        </Reveal>

        <AnimatedContainer delay={delay + 0.1}>
          {children}
        </AnimatedContainer>
      </div>
    </section>
  )
}
