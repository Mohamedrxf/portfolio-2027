import { AnimatedContainer } from '@/components/animations/AnimatedContainer'
import { useEducation } from '@/hooks'

export const EducationHighlights = () => {
  const { education } = useEducation()

  if (!education || education.length === 0) {
    return null
  }

  const primaryEducation = education[0]
  const gpa = primaryEducation.gpa

  if (!gpa || gpa === 'N/A') {
    return null
  }

  return (
    <AnimatedContainer delay={0.7} className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 backdrop-blur-xl">
          <div className="text-3xl font-bold text-[var(--color-primary)]">
            {gpa}
          </div>
          <div className="text-sm text-[var(--color-text-secondary)] mt-2 font-medium">
            Current CGPA
          </div>
        </div>

        <div className="text-center p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-3xl font-bold text-[var(--color-text-primary)]">
            {primaryEducation.field || 'Computer Science'}
          </div>
          <div className="text-sm text-[var(--color-text-secondary)] mt-2 font-medium">
            Field of Study
          </div>
        </div>

        <div className="text-center p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="text-3xl font-bold text-[var(--color-text-primary)]">
            {primaryEducation.endDate?.split('-')[0] || '2027'}
          </div>
          <div className="text-sm text-[var(--color-text-secondary)] mt-2 font-medium">
            Expected Graduation
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
