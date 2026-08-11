import { EducationCard } from './EducationCard'
import { useEducation } from '@/hooks'

export const EducationGrid = () => {
  const { education } = useEducation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {education.map((edu, index) => (
        <EducationCard
          key={edu.id}
          institution={edu.institution}
          degree={edu.field ? `${edu.degree} in ${edu.field}` : edu.degree}
          duration={edu.date}
          description={edu.description}
          achievements={edu.achievements || []}
          gpa={edu.gpa || 'N/A'}
          location={edu.location}
          delay={0.2 + index * 0.1}
        />
      ))}
    </div>
  )
}
