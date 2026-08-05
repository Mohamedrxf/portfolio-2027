import { usePortfolio } from '@/hooks'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { Fade } from '@/components/animations/Fade'

export const StoryHighlights = () => {
  const { highlights } = usePortfolio()

  return (
    <StaggerContainer stagger={0.1} delayChildren={0.2}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, index) => (
          <StaggerItem key={index}>
            <Fade delay={index * 0.1}>
              <div className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                    <span className="text-[var(--color-primary)] text-xl">✦</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                    {highlight.badge && (
                      <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                        {highlight.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Fade>
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  )
}
