import { ProjectCard } from './ProjectCard'

export const ProjectsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        title="E-Commerce Platform"
        description="Placeholder description of a full-stack e-commerce solution with modern features."
        technologies={['React', 'Node.js', 'PostgreSQL']}
        category="Web App"
        status="Completed"
        delay={0.4}
      />

      <ProjectCard
        title="Task Management App"
        description="Placeholder description of a productivity application for team collaboration."
        technologies={['Vue.js', 'Firebase', 'Tailwind']}
        category="SaaS"
        status="Live"
        delay={0.5}
      />

      <ProjectCard
        title="Weather Dashboard"
        description="Placeholder description of a real-time weather forecasting application."
        technologies={['React', 'API', 'D3.js']}
        category="Data Visualization"
        status="Completed"
        delay={0.6}
      />

      <ProjectCard
        title="Social Media Manager"
        description="Placeholder description of a social media scheduling and analytics tool."
        technologies={['Next.js', 'MongoDB', 'Chart.js']}
        category="Marketing"
        status="In Progress"
        delay={0.7}
      />

      <ProjectCard
        title="Fitness Tracker"
        description="Placeholder description of a health and fitness monitoring application."
        technologies={['React Native', 'GraphQL', 'AWS']}
        category="Mobile"
        status="Live"
        delay={0.8}
      />

      <ProjectCard
        title="Portfolio Generator"
        description="Placeholder description of a tool for creating professional portfolios."
        technologies={['TypeScript', 'Vite', 'Tailwind']}
        category="Developer Tool"
        status="Completed"
        delay={0.9}
      />
    </div>
  )
}
