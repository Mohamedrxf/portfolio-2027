import { CertificationCard } from './CertificationCard'

export const CertificationGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CertificationCard
        title="Cloud Architecture Professional"
        organization="Cloud Provider A"
        issueDate="2023"
        credential="Credential ID: ABC123"
        technologies={['AWS', 'Azure', 'GCP']}
        delay={0.2}
      />

      <CertificationCard
        title="Full Stack Web Developer"
        organization="Tech Academy B"
        issueDate="2022"
        credential="Credential ID: DEF456"
        technologies={['React', 'Node.js', 'MongoDB']}
        delay={0.3}
      />

      <CertificationCard
        title="DevOps Engineer"
        organization="DevOps Institute C"
        issueDate="2022"
        credential="Credential ID: GHI789"
        technologies={['Docker', 'Kubernetes', 'CI/CD']}
        delay={0.4}
      />

      <CertificationCard
        title="Data Science Specialist"
        organization="Data University D"
        issueDate="2021"
        credential="Credential ID: JKL012"
        technologies={['Python', 'TensorFlow', 'Pandas']}
        delay={0.5}
      />

      <CertificationCard
        title="Cybersecurity Analyst"
        organization="Security Institute E"
        issueDate="2021"
        credential="Credential ID: MNO345"
        technologies={['Security', 'Network', 'Compliance']}
        delay={0.6}
      />

      <CertificationCard
        title="Mobile App Developer"
        organization="Mobile Academy F"
        issueDate="2020"
        credential="Credential ID: PQR678"
        technologies={['React Native', 'Flutter', 'iOS']}
        delay={0.7}
      />
    </div>
  )
}
