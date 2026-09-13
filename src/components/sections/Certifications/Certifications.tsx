import { useState } from 'react';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { Heading } from '@/components/ui/Heading';
import { CertificationGrid } from './CertificationGrid';
import { CertificationFilters } from './CertificationFilters';

export const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section id="certifications" className="scroll-mt-16 bg-[var(--color-bg)]">
      <AnimatedSection spacing="xl" background="default" withContainer={true} containerPadding="lg">
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
              Credentials
            </span>
            <Heading level={2} size="4xl" className="text-white">
              Certifications
            </Heading>
          </div>

          <CertificationFilters onFilterChange={setActiveFilter} activeFilter={activeFilter} />

          <CertificationGrid activeFilter={activeFilter} />
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Certifications;
