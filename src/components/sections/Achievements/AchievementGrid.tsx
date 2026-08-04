import { AchievementCard } from './AchievementCard'

export const AchievementGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AchievementCard
        title="Outstanding Achievement Award"
        description="Recognized for exceptional performance in project delivery"
        date="2023"
        category="Awards"
        status="Completed"
        delay={0.4}
      />

      <AchievementCard
        title="National Coding Competition"
        description="Top performer in regional programming challenge"
        date="2022"
        category="Competitions"
        status="Finalist"
        delay={0.45}
      />

      <AchievementCard
        title="Innovation Hackathon"
        description="Created innovative solution for business challenge"
        date="2022"
        category="Hackathons"
        status="Winner"
        delay={0.5}
      />

      <AchievementCard
        title="Technical Excellence Recognition"
        description="Acknowledged for technical leadership and mentorship"
        date="2021"
        category="Recognitions"
        status="Completed"
        delay={0.55}
      />

      <AchievementCard
        title="Open Source Contribution"
        description="Significant contributions to major open source projects"
        date="2021"
        category="Recognitions"
        status="Ongoing"
        delay={0.6}
      />

      <AchievementCard
        title="Best Project Award"
        description="Awarded for outstanding project in annual showcase"
        date="2020"
        category="Awards"
        status="Completed"
        delay={0.65}
      />
    </div>
  )
}
