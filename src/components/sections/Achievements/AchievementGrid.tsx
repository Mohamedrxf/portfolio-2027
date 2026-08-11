import { AchievementCard } from './AchievementCard'
import { useAchievements } from '@/hooks'

interface AchievementGridProps {
  activeFilter?: string
}

export const AchievementGrid = ({ activeFilter = 'All' }: AchievementGridProps) => {
  const { achievements } = useAchievements()

  const filteredAchievements = activeFilter === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === activeFilter)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAchievements.map((achievement, index) => (
        <AchievementCard
          key={achievement.id}
          title={achievement.title}
          description={achievement.description}
          date={achievement.date}
          category={achievement.category}
          status={achievement.status}
          issuer={achievement.issuer}
          delay={0.4 + index * 0.05}
          isFeatured={achievement.status === 'Awarded' || achievement.status?.includes('1st')}
        />
      ))}
    </div>
  )
}
