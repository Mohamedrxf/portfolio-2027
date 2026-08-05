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
        {/* Professional illustration placeholder */}
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] dark:from-[var(--color-primary-900)] dark:to-[var(--color-secondary-900)] flex items-center justify-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-text-primary) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>
          
          {/* Profile placeholder */}
          <div className="relative z-10 text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {availability === 'Open to Opportunities' ? '👋' : '👤'}
            </div>
            <p className="mt-4 text-[var(--color-text-secondary)] text-sm">Professional Illustration</p>
          </div>

          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-primary)] opacity-20 blur-3xl rounded-full" />
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
