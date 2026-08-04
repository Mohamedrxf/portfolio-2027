import { TimelineItem } from './TimelineItem'

export const Timeline = () => {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />
      
      <div className="space-y-8">
        <TimelineItem
          position="Senior Software Engineer"
          company="Tech Company A"
          duration="2021 - Present"
          description="Placeholder description of responsibilities and achievements in this role."
          technologies={['React', 'TypeScript', 'Node.js', 'AWS']}
          delay={0.2}
        />

        <TimelineItem
          position="Software Engineer"
          company="Tech Company B"
          duration="2019 - 2021"
          description="Placeholder description of responsibilities and achievements in this role."
          technologies={['Vue.js', 'Python', 'PostgreSQL', 'Docker']}
          delay={0.3}
        />

        <TimelineItem
          position="Junior Developer"
          company="Tech Company C"
          duration="2017 - 2019"
          description="Placeholder description of responsibilities and achievements in this role."
          technologies={['JavaScript', 'PHP', 'MySQL', 'Git']}
          delay={0.4}
        />

        <TimelineItem
          position="Intern Developer"
          company="Tech Company D"
          duration="2016 - 2017"
          description="Placeholder description of responsibilities and achievements in this role."
          technologies={['HTML', 'CSS', 'jQuery', 'Bootstrap']}
          delay={0.5}
        />
      </div>
    </div>
  )
}
