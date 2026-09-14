import { useMemo } from 'react';
import { usePortfolio, useSocials } from '@/hooks';
import { FadeIn } from '@/components/motion';
import { ContactButton } from '@/components/motion';

export const ContactSection = () => {
  const { personalInfo, contactInfo } = usePortfolio();
  const { visibleSocials } = useSocials();

  const email = contactInfo.find((c) => c.type === 'email');
  const phone = contactInfo.find((c) => c.type === 'phone');
  const location = contactInfo.find((c) => c.type === 'location');

  const ctaWords = useMemo(() => ["LET'S", 'BUILD', 'SOMETHING', 'GREAT.'], []);

  return (
    <section id="contact" className="scroll-mt-16 bg-[#0C0C0C] relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, #D946EF 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D7E2EA 1px, transparent 1px),
              linear-gradient(to bottom, #D7E2EA 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7">
            <FadeIn delay={0.1} duration={0.9} y={40}>
              <span className="section-meta mb-8 block text-[#D7E2EA]/50">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  Contact / 09
                </span>
              </span>
            </FadeIn>

            <h2
              className="display-type text-white leading-none mb-10"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              {ctaWords.map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h2>

            <FadeIn delay={0.3} duration={0.8} y={30}>
              <p className="text-[#D7E2EA]/70 text-lg leading-relaxed max-w-xl mb-10">
                Whether it is a security audit, a distributed system, or a new product — I am open
                to conversations that build something meaningful.
              </p>
            </FadeIn>

            <FadeIn delay={0.45} duration={0.8} y={30}>
              <div className="flex flex-wrap gap-4">
                <ContactButton
                  label="CONTACT ME"
                  href={email ? `mailto:${email.value}` : '#'}
                  size="lg"
                />
                {visibleSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-7 py-3 text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors duration-200"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.3} duration={0.8} y={30}>
              <div className="space-y-0 border-t border-[#D7E2EA]/15">
                {email && (
                  <ContactInfoRow
                    label="Email"
                    value={email.value}
                    href={`mailto:${email.value}`}
                  />
                )}
                {phone && (
                  <ContactInfoRow label="Phone" value={phone.value} href={`tel:${phone.value}`} />
                )}
                {location && <ContactInfoRow label="Location" value={location.value} />}
                <ContactInfoRow label="Availability" value={personalInfo.availability} />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

function ContactInfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="group flex items-center justify-between py-6 border-b border-[#D7E2EA]/10 hover:pl-3 transition-all duration-300">
      <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#22D3EE]">{label}</span>
      <span className="text-lg font-light text-[#D7E2EA]/80 group-hover:text-white transition-colors">
        {value}
      </span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

export default ContactSection;
