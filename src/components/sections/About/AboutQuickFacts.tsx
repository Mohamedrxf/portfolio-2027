import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { StaggerContainer } from '@/components/animations/StaggerContainer'
import { SpotlightCard } from '@/components/animations/SpotlightCard'
import { usePortfolio } from '@/hooks'

export const AboutQuickFacts = () => {
  const { personalInfo } = usePortfolio()

  const quickFacts = [
    {
      label: 'Location',
      value: personalInfo.location || 'Available Worldwide',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Location icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Availability',
      value: personalInfo.availability,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Work icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Role',
      value: personalInfo.role,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="ID card icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
    },
    {
      label: 'Focus',
      value: 'Full Stack & Network Engineering',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Lightning bolt icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-12 border-t border-[var(--color-border)] relative" aria-labelledby="quick-facts-heading">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-50" aria-hidden="true" />
      
      <AnimatedHeading delay={0.1}>
        <h2 id="quick-facts-heading" className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">
          Quick Facts
        </h2>
      </AnimatedHeading>

      <StaggerContainer stagger={0.1} delayChildren={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
          {quickFacts.map((fact) => (
            <SpotlightCard
              key={fact.label}
              className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]" aria-hidden="true">
                  {fact.icon}
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wide">
                    {fact.label}
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] mt-1">
                    {fact.value}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </StaggerContainer>
    </section>
  )
}
