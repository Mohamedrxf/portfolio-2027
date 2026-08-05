import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'
import { ContactInfo } from './ContactInfo'
import { ContactSocials } from './ContactSocials'
import { usePortfolio } from '@/hooks'

export const ContactContent = () => {
  const { portfolio } = usePortfolio()

  const downloadResume = () => {
    if (portfolio.resume) {
      window.open(portfolio.resume, '_blank')
    }
  }

  return (
    <div className="space-y-8">
      <AnimatedContainer delay={0.15}>
        <div className="space-y-4">
          <Heading level={3} size="2xl">
            Let's work together
          </Heading>

          <p className="text-[var(--color-text-secondary)]">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            Fill out the form or reach out directly through any of the channels below.
          </p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.18}>
        <Button 
          variant="primary" 
          size="md" 
          onClick={downloadResume}
          className="w-full sm:w-auto"
          disabled={!portfolio.resume}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Resume
        </Button>
      </AnimatedContainer>

      <ContactInfo />

      <ContactSocials />
    </div>
  )
}
