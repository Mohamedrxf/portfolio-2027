import { ProjectCard } from './ProjectCard'
import type { Project } from '@/data'

interface ProjectsGridProps {
  projects: Project[]
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          category={project.category}
          status={project.status}
          url={project.url}
          github={project.github}
          delay={0.4 + index * 0.1}
        />
      ))}
    </div>
  )
}
