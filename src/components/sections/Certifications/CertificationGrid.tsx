import { CertificationCard } from './CertificationCard'
import { useCertifications } from '@/hooks'

export const CertificationGrid = () => {
  const { certifications } = useCertifications()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <CertificationCard
          key={cert.id}
          title={cert.title}
          organization={cert.organization}
          issueDate={cert.date}
          credential={cert.credential || ''}
          technologies={cert.technologies}
          delay={0.2 + index * 0.1}
        />
      ))}
    </div>
  )
}
