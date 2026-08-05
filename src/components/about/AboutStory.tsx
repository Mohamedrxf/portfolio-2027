import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { usePortfolio } from '@/hooks'
import { useReducedMotion } from '@/hooks'
import { AboutBackground } from './AboutBackground'
import { StorySection } from './StorySection'
import { JourneyTimeline } from './JourneyTimeline'
import { JourneyProgress } from './JourneyProgress'
import { JourneyNavigation } from './JourneyNavigation'
import { StoryHighlights } from './StoryHighlights'
import { Slide } from '@/components/animations/Slide'
import { Fade } from '@/components/animations/Fade'

export const AboutStory = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { personalInfo } = usePortfolio()
  const prefersReducedMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState(0)

  const storySections = useMemo(() => [
    { id: 'hello', title: 'Hello' },
    { id: 'who-i-am', title: 'Who I Am' },
    { id: 'my-journey', title: 'My Journey' },
    { id: 'vision', title: 'Vision' },
    { id: 'future', title: 'Future' },
  ], [])

  const handleNavigate = useCallback((index: number) => {
    setActiveSection(index)
    const sectionElement = document.getElementById(storySections[index].id)
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [storySections])

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const sections = storySections.map((s) => document.getElementById(s.id))
      let newActiveSection = 0

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          const centerY = window.innerHeight / 2
          if (rect.top <= centerY && rect.bottom >= centerY) {
            newActiveSection = index
          }
        }
      })

      setActiveSection(newActiveSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [storySections, prefersReducedMotion])

  return (
    <AboutBackground>
      <div ref={containerRef} className="relative">
        <JourneyNavigation
          sections={storySections}
          currentIndex={activeSection}
          onNavigate={handleNavigate}
        />

        <JourneyProgress
          currentIndex={activeSection}
          totalItems={storySections.length}
        />

        <StorySection id="hello" title="Hello" delay={0}>
          <Slide direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-text-primary)] mb-6">
                {personalInfo.tagline}
              </h1>
              <p className="text-2xl md:text-3xl text-[var(--color-text-secondary)]">
                {personalInfo.name}
              </p>
            </div>
          </Slide>
        </StorySection>

        <StorySection id="who-i-am" title="Who I Am" delay={0.2} alternate>
          <Fade delay={0.3}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8">
                {personalInfo.bio}
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                <span className="text-[var(--color-primary)] font-medium">
                  {personalInfo.availability}
                </span>
              </div>
            </div>
          </Fade>
          <div className="mt-12">
            <StoryHighlights />
          </div>
        </StorySection>

        <StorySection id="my-journey" title="My Journey" delay={0.4}>
          <JourneyTimeline />
        </StorySection>

        <StorySection id="vision" title="Vision" delay={0.6} alternate>
          <Fade delay={0.7}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                I believe in building technology that solves real problems and makes a meaningful impact. My vision is to create scalable, secure, and user-centric solutions that bridge the gap between complex systems and human experience.
              </p>
            </div>
          </Fade>
        </StorySection>

        <StorySection id="future" title="Future" delay={0.8}>
          <Slide direction="up" delay={0.9}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8">
                Looking ahead, I am excited to continue growing in cloud architecture, AI/ML security, and enterprise infrastructure. I am always open to new challenges and opportunities to collaborate on innovative projects.
              </p>
              <div className="flex justify-center gap-4">
                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[var(--color-text-secondary)]">
                  Based in {personalInfo.location}
                </span>
              </div>
            </div>
          </Slide>
        </StorySection>
      </div>
    </AboutBackground>
  )
}
