import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { AnimatedHeading } from '@/components/animations/AnimatedHeading';
import { Heading } from '@/components/ui/Heading';
import { ContactContent } from './ContactContent';
import { ContactForm } from './ContactForm';
import { ContactMap } from './ContactMap';

export const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-16 bg-[var(--color-bg)]">
      <AnimatedSection spacing="xl" background="default" withContainer={true} containerPadding="lg">
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <AnimatedHeading delay={0.1}>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
                Get In Touch
              </span>
            </AnimatedHeading>
            <AnimatedHeading delay={0.2}>
              <Heading level={2} size="5xl" className="text-white">
                Let's Build Something
              </Heading>
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <ContactContent />
            <ContactForm />
          </div>

          <ContactMap />
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Contact;
