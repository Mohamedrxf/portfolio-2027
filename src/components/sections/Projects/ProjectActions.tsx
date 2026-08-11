interface ProjectActionsProps {
  url?: string
  github?: string
}

export const ProjectActions = ({ url, github }: ProjectActionsProps) => {
  // Use url field for GitHub since that's how the data is structured
  const githubUrl = url || github

  return (
    <div className="flex gap-2">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border-2 border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] rounded-md transition-colors"
          aria-label="View GitHub repository"
        >
          GitHub
        </a>
      )}
    </div>
  )
}
