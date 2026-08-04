import { Button } from '@/components/ui/Button'

export const ProjectActions = () => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        GitHub
      </Button>
      <Button variant="primary" size="sm">
        Live Demo
      </Button>
    </div>
  )
}
