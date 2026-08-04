import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { useSocials } from '@/hooks'

export const FooterSocials = () => {
  const { visibleSocials } = useSocials()

  return (
    <AnimatedContainer delay={0.2}>
      <div>
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">
          Connect
        </h4>
        <div className="flex flex-wrap gap-2">
          {visibleSocials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border-2 border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] rounded-md transition-colors"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </AnimatedContainer>
  )
}
