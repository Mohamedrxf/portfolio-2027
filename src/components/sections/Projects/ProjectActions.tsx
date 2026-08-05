interface ProjectActionsProps {
  url?: string
  github?: string
}

export const ProjectActions = ({ url, github }: ProjectActionsProps) => {
  return (
    <div className="flex gap-2">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border-2 border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] rounded-md transition-colors"
          aria-label="View GitHub repository"
        >
          GitHub
        </a>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-md transition-colors"
          aria-label="View live demo"
        >
          Live Demo
        </a>
      )}
    </div>
  )
}
