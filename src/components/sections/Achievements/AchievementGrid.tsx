import { AchievementCard } from './AchievementCard'
import { useAchievements } from '@/hooks'

export const AchievementGrid = () => {
  const { achievements } = useAchievements()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement, index) => (
        <AchievementCard
          key={achievement.id}
          title={achievement.title}
          description={achievement.description}
          date={achievement.date}
          category={achievement.category}
          status={achievement.status}
          delay={0.4 + index * 0.05}
        />
      ))}
    </div>
  )
}
