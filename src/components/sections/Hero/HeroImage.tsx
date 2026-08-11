import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Badge } from '@/components/ui/Badge'
import { usePortfolio, useSkills } from '@/hooks'

export const HeroImage = () => {
  const { stats, personalInfo } = usePortfolio()
  const { getTopSkills } = useSkills()

  const topSkills = getTopSkills(6)
  const availability = personalInfo.availability

  return (
    <AnimatedContainer delay={0.4} className="flex justify-center lg:justify-end relative">
      <div className="relative w-full max-w-md aspect-square">
        {/* Premium Tech Visual */}
        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] border border-[var(--color-border)] shadow-2xl">
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-secondary)]/20 animate-pulse" />
          </div>

          {/* Network/grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, var(--color-primary) 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, var(--color-secondary) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Central tech composition */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/30 animate-spin" style={{ animationDuration: '20s' }} />
              
              {/* Middle ring */}
              <div className="absolute inset-4 rounded-full border border-[var(--color-secondary)]/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              
              {/* Inner glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 blur-xl" />
              
              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Code brackets */}
                  <div className="text-6xl font-bold text-[var(--color-primary)]/80">
                    {'<'}
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[var(--color-secondary)]/80">
                    {'/'}
                  </div>
                  <div className="text-6xl font-bold text-[var(--color-primary)]/80 ml-2">
                    {'>'}
                  </div>
                </div>
              </div>

              {/* Floating nodes */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 rounded-full bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/50 animate-pulse" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-3 h-3 rounded-full bg-[var(--color-secondary)] shadow-lg shadow-[var(--color-secondary)]/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/50 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-secondary)] shadow-lg shadow-[var(--color-secondary)]/50 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--color-primary)]/50 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--color-secondary)]/50 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--color-secondary)]/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--color-primary)]/50 rounded-br-lg" />

          {/* Subtle scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/5 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
        </div>

        {/* Floating technology badges */}
        {topSkills.length > 0 && topSkills.map((skill, index) => (
          <AnimatedContainer
            key={skill.id}
            delay={0.6 + index * 0.1}
            className={`absolute hidden sm:block ${index % 2 === 0 ? 'right-[-5%]' : 'left-[-5%]'}`}
            style={{
              top: `${10 + (index % 3) * 25}%`,
            }}
          >
            <Badge variant="secondary" size="sm" className="shadow-lg">
              {skill.name}
            </Badge>
          </AnimatedContainer>
        ))}

        {/* Experience badge */}
        {stats.length > 0 && (
          <AnimatedContainer
            delay={0.9}
            className="absolute top-4 right-4"
          >
            <Badge variant="primary" size="md" className="shadow-lg">
              {stats[0]?.value}+ {stats[0]?.label}
            </Badge>
          </AnimatedContainer>
        )}

        {/* Availability badge */}
        <AnimatedContainer
          delay={1.0}
          className="absolute bottom-4 left-4"
        >
          <Badge variant="success" size="md" className="shadow-lg animate-pulse">
            {availability}
          </Badge>
        </AnimatedContainer>
      </div>
    </AnimatedContainer>
  )
}
