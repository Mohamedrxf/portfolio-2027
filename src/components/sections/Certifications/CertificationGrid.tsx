import { useState } from 'react'
import { CertificationCard } from './CertificationCard'
import { useCertifications } from '@/hooks'
import { motion, AnimatePresence } from 'framer-motion'

export const CertificationGrid = ({ activeFilter }: { activeFilter: string }) => {
  const { certifications } = useCertifications()
  const [selectedCert, setSelectedCert] = useState<string | null>(null)

  const filteredCertifications = activeFilter === 'All'
    ? certifications
    : certifications.filter(cert => cert.category === activeFilter)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredCertifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            layout
          >
            <CertificationCard
              title={cert.title}
              organization={cert.organization}
              issueDate={cert.date}
              credential={cert.credential || ''}
              technologies={cert.technologies}
              url={cert.url}
              category={cert.category}
              isSelected={selectedCert === cert.id}
              onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
              delay={0.2 + index * 0.1}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
