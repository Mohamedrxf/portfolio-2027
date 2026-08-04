import { AnimatedText } from '@/components/animations/AnimatedText'

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="pt-8 border-t border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <AnimatedText variant="fade" delay={0.25} as="p" className="text-sm text-[var(--color-text-secondary)]">
          © {currentYear} Portfolio. All rights reserved.
        </AnimatedText>
        <AnimatedText variant="fade" delay={0.3} as="p" className="text-xs text-[var(--color-text-tertiary)]">
          Built with modern web technologies
        </AnimatedText>
      </div>
    </div>
  )
}
