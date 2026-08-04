import { SkillCategory } from './SkillCategory'
import { useSkills } from '@/hooks'

export const SkillsGrid = () => {
  const { skillCategories } = useSkills()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillCategories.map((category, index) => (
        <SkillCategory
          key={category.id}
          title={category.name}
          delay={0.2 + index * 0.1}
          skills={category.skills.map((skill) => ({
            name: skill.name,
            badge: skill.badge || null,
          }))}
        />
      ))}
    </div>
  )
}
