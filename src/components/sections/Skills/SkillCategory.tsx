import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { SkillCard } from './SkillCard'

interface Skill {
  name: string
  badge: string | null
}

interface SkillCategoryProps {
  title: string
  skills: Skill[]
  delay: number
}

export const SkillCategory = ({ title, skills, delay }: SkillCategoryProps) => {
  return (
    <AnimatedCard delay={delay} cardVariant="default" className="h-full">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              badge={skill.badge}
              delay={delay + 0.1 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </AnimatedCard>
  )
}
