import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { PremiumSkillCard } from './PremiumSkillCard'

interface SkillsByCategoryProps {
  skills: Array<{
    id: string
    name: string
    level: number
    badge?: string
    years?: number
  }>
}

export const SkillsByCategory = ({ skills }: SkillsByCategoryProps) => {
  return (
    <StaggerContainer stagger={0.05} delayChildren={0.2}>
      <div id="skills-panel" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="tabpanel" aria-live="polite">
        {skills.map((skill) => (
          <StaggerItem key={skill.id}>
            <PremiumSkillCard
              name={skill.name}
              level={skill.level}
              badge={skill.badge}
              years={skill.years}
              delay={0}
            />
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  )
}
