import { EducationCard } from './EducationCard'

export const EducationGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <EducationCard
        institution="University A"
        degree="Bachelor of Science in Computer Science"
        duration="2013 - 2017"
        description="Placeholder description of academic achievements, coursework, and relevant projects during undergraduate studies."
        achievements={['Dean\'s List', 'CS Club President', 'Hackathon Winner']}
        gpa="3.8/4.0"
        delay={0.2}
      />

      <EducationCard
        institution="University B"
        degree="Master of Science in Software Engineering"
        duration="2017 - 2019"
        description="Placeholder description of advanced studies, research focus, and thesis work completed during graduate program."
        achievements={['Research Assistant', 'Published Paper', 'Teaching Assistant']}
        gpa="3.9/4.0"
        delay={0.3}
      />

      <EducationCard
        institution="Technical Institute C"
        degree="Professional Certificate in Cloud Computing"
        duration="2020 - 2021"
        description="Placeholder description of specialized training, certifications earned, and practical skills developed."
        achievements={['AWS Certified', 'Capstone Project', 'Top Performer']}
        gpa="N/A"
        delay={0.4}
      />

      <EducationCard
        institution="Online Academy D"
        degree="Advanced Web Development Bootcamp"
        duration="2021 - 2022"
        description="Placeholder description of intensive training program covering modern web technologies and best practices."
        achievements={['Full Stack Certificate', 'Group Project Lead', 'Mentor Program']}
        gpa="N/A"
        delay={0.5}
      />
    </div>
  )
}
