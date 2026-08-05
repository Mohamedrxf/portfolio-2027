import { FloatingAccent } from './FloatingAccent'

interface AboutBackgroundProps {
  children: React.ReactNode
}

export const AboutBackground = ({ children }: AboutBackgroundProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-surface)]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <FloatingAccent position="top-left" size="lg" color="var(--color-primary)" />
        <FloatingAccent position="top-right" size="md" color="var(--color-primary)" />
        <FloatingAccent position="bottom-left" size="md" color="var(--color-primary)" />
        <FloatingAccent position="bottom-right" size="lg" color="var(--color-primary)" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
