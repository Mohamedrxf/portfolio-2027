import { useState } from 'react'
import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Badge } from '@/components/ui/Badge'
import { usePortfolio } from '@/hooks'

export const ContactInfo = () => {
  const { contactInfo } = usePortfolio()
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyEmailToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <AnimatedCard delay={0.2} cardVariant="default" className="h-full">
      <div className="space-y-4">
        {contactInfo.map((contact) => {
          const getIcon = (type: string) => {
            switch (type) {
              case 'email':
                return (
                  <svg
                    className="w-5 h-5 text-[var(--color-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )
              case 'phone':
                return (
                  <svg
                    className="w-5 h-5 text-[var(--color-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                )
              case 'location':
                return (
                  <svg
                    className="w-5 h-5 text-[var(--color-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )
              case 'availability':
                return (
                  <svg
                    className="w-5 h-5 text-[var(--color-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )
              default:
                return null
            }
          }

          const getBadgeVariant = (type: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' => {
            switch (type) {
              case 'email':
                return 'outline'
              case 'phone':
                return 'secondary'
              case 'location':
                return 'outline'
              case 'availability':
                return 'success'
              default:
                return 'outline'
            }
          }

          const getBadgeText = (type: string) => {
            switch (type) {
              case 'email':
                return 'Primary'
              case 'phone':
                return 'Available'
              case 'location':
                return 'Remote Friendly'
              case 'availability':
                return 'Open to Projects'
              default:
                return ''
            }
          }

          return (
            <div key={contact.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                {getIcon(contact.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  {contact.label}
                </h4>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {contact.value}
                  </p>
                  {contact.type === 'email' && (
                    <button
                      onClick={() => copyEmailToClipboard(contact.value)}
                      className="text-xs text-[var(--color-primary)] hover:underline"
                      aria-label="Copy email to clipboard"
                    >
                      {copiedEmail ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <Badge variant={getBadgeVariant(contact.type)} size="sm" className="mt-2">
                  {getBadgeText(contact.type)}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    </AnimatedCard>
  )
}
