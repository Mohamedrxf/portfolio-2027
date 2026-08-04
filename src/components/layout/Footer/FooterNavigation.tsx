import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { navigationConfig } from '@/router/navigationConfig'

export const FooterNavigation = () => {
  return (
    <AnimatedContainer delay={0.15}>
      <div>
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">
          Navigation
        </h4>
        <nav aria-label="Footer navigation">
          <ul className="space-y-2">
            {navigationConfig.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </AnimatedContainer>
  )
}
