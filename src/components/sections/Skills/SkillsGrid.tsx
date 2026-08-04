import { SkillCategory } from './SkillCategory'

export const SkillsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <SkillCategory
        title="Frontend"
        delay={0.2}
        skills={[
          { name: 'React', badge: 'Core' },
          { name: 'TypeScript', badge: 'Core' },
          { name: 'Vue.js', badge: null },
          { name: 'Next.js', badge: null },
          { name: 'Tailwind CSS', badge: null },
        ]}
      />

      <SkillCategory
        title="Backend"
        delay={0.3}
        skills={[
          { name: 'Node.js', badge: 'Core' },
          { name: 'Python', badge: null },
          { name: 'Express', badge: null },
          { name: 'NestJS', badge: null },
          { name: 'GraphQL', badge: null },
        ]}
      />

      <SkillCategory
        title="Languages"
        delay={0.4}
        skills={[
          { name: 'JavaScript', badge: 'Core' },
          { name: 'TypeScript', badge: 'Core' },
          { name: 'Python', badge: null },
          { name: 'Go', badge: null },
          { name: 'Rust', badge: null },
        ]}
      />

      <SkillCategory
        title="Databases"
        delay={0.5}
        skills={[
          { name: 'PostgreSQL', badge: 'Core' },
          { name: 'MongoDB', badge: null },
          { name: 'Redis', badge: null },
          { name: 'MySQL', badge: null },
          { name: 'SQLite', badge: null },
        ]}
      />

      <SkillCategory
        title="Cloud"
        delay={0.6}
        skills={[
          { name: 'AWS', badge: 'Core' },
          { name: 'GCP', badge: null },
          { name: 'Azure', badge: null },
          { name: 'Docker', badge: null },
          { name: 'Kubernetes', badge: null },
        ]}
      />

      <SkillCategory
        title="Tools"
        delay={0.7}
        skills={[
          { name: 'Git', badge: 'Core' },
          { name: 'CI/CD', badge: null },
          { name: 'Jest', badge: null },
          { name: 'Webpack', badge: null },
          { name: 'Vite', badge: null },
        ]}
      />
    </div>
  )
}
