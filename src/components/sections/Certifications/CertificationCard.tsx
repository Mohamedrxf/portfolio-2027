import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

interface CertificationCardProps {
  title: string
  organization: string
  issueDate: string
  credential: string
  technologies: string[]
  url?: string
  category?: string
  isSelected: boolean
  onClick: () => void
  delay: number
}

const getDomainAccent = (category?: string) => {
  switch (category) {
    case 'Cloud':
      return 'from-blue-500 to-cyan-500'
    case 'Security':
      return 'from-red-500 to-orange-500'
    case 'Development':
      return 'from-green-500 to-emerald-500'
    case 'DevOps':
      return 'from-purple-500 to-pink-500'
    case 'Data Science':
      return 'from-yellow-500 to-amber-500'
    case 'Mobile':
      return 'from-indigo-500 to-violet-500'
    default:
      return 'from-gray-500 to-slate-500'
  }
}

const getDomainIcon = (category?: string) => {
  switch (category) {
    case 'Cloud':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    case 'Security':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'Development':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    case 'DevOps':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      )
    case 'Data Science':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case 'Mobile':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

export const CertificationCard = ({
  title,
  organization,
  issueDate,
  credential,
  technologies,
  url,
  category,
  isSelected,
  onClick,
  delay,
}: CertificationCardProps) => {
  const accentGradient = getDomainAccent(category)
  const domainIcon = getDomainIcon(category)

  return (
    <div
      onClick={onClick}
      className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${
        isSelected ? 'ring-2 ring-[var(--color-primary)] shadow-xl' : ''
      }`}
    >
      <AnimatedCard
        delay={delay}
        cardVariant="default"
        className="h-full"
      >
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${accentGradient}`} />
        
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded bg-gradient-to-br ${accentGradient} text-white`}>
                  {domainIcon}
                </div>
                {category && (
                  <Badge variant="outline" size="sm" className="text-xs">
                    {category}
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                {organization}
              </p>
            </div>
            <Badge variant="outline" size="sm">
              {issueDate}
            </Badge>
          </div>

          {isSelected && credential && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 pt-2 border-t border-[var(--color-border)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-secondary)]">
                  Credential:
                </span>
                <span className="text-xs font-mono text-[var(--color-text-primary)]">
                  {credential}
                </span>
              </div>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" size="sm">
                {tech}
              </Badge>
            ))}
          </div>

          {url && (
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={(e) => {
                e.stopPropagation()
                window.open(url, '_blank')
              }}
            >
              Verify Credential
            </Button>
          )}
        </div>
      </AnimatedCard>
    </div>
  )
}
