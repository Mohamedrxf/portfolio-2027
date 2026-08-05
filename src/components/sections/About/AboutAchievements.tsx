import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { StaggerContainer } from '@/components/animations/StaggerContainer'
import { AchievementCard } from '@/components/sections/Achievements/AchievementCard'
import { useAchievements } from '@/hooks'

export const AboutAchievements = () => {
  const { achievements } = useAchievements()

  // Take top 3 achievements for the about section
  const achievementHighlights = achievements.slice(0, 3)

  return (
    <section className="py-12 border-t border-[var(--color-border)] relative" aria-labelledby="achievements-heading">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" aria-hidden="true" />
      
      <AnimatedHeading delay={0.1}>
        <h2 id="achievements-heading" className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">
          Achievements
        </h2>
      </AnimatedHeading>

      <StaggerContainer stagger={0.15} delayChildren={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          {achievementHighlights.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              date={achievement.date}
              category={achievement.category}
              delay={0}
            />
          ))}
        </div>
      </StaggerContainer>
    </section>
  )
}
