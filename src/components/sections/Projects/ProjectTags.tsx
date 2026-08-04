import { Badge } from '@/components/ui/Badge'

interface ProjectTagsProps {
  technologies: string[]
}

export const ProjectTags = ({ technologies }: ProjectTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Badge key={tech} variant="primary" size="sm">
          {tech}
        </Badge>
      ))}
    </div>
  )
}
