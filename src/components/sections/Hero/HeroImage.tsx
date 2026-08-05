import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Badge } from '@/components/ui/Badge'
import { HeroScene } from '@/components/three'
import { usePortfolio, useSkills } from '@/hooks'

export const HeroImage = () => {
  const { stats, personalInfo } = usePortfolio()
  const { getTopSkills } = useSkills()

  const topSkills = getTopSkills(6)
  const availability = personalInfo.availability

  return (
    <AnimatedContainer delay={0.4} className="flex justify-center lg:justify-end relative">
      <div className="relative w-full max-w-md aspect-square">
        {/* 3D Hero Scene */}
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <HeroScene className="w-full h-full" />
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
