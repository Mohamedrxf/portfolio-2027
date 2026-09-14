import { Reveal } from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

interface Service {
  number: string;
  title: string;
  description: string;
  accent: string;
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Software Engineering',
    description:
      'Designing and building robust, maintainable software systems from the ground up — object-oriented architecture, clean abstractions, and production-grade code.',
    accent: 'var(--color-cyan)',
  },
  {
    number: '02',
    title: 'Full Stack Development',
    description:
      'End-to-end applications spanning React and TypeScript frontends with FastAPI, Node.js, and REST backends — wired through real authentication and SQL data layers.',
    accent: 'var(--color-accent)',
  },
  {
    number: '03',
    title: 'AI / ML Systems',
    description:
      'Machine learning pipelines for threat detection and vulnerability classification — LLaMA3, FAISS, RAG pipelines, and real-time inference systems.',
    accent: 'var(--color-violet)',
  },
  {
    number: '04',
    title: 'Cybersecurity',
    description:
      'Security-first engineering: dependency and vulnerability analysis, attack-path identification, threat detection models, and secure sandboxed execution.',
    accent: 'var(--color-warning)',
  },
  {
    number: '05',
    title: 'Networking & Distributed Systems',
    description:
      'Computer networking, distributed applications, real-time WebSocket telemetry, and infrastructure that connects PC → switch → router → firewall → cloud.',
    accent: 'var(--color-success)',
  },
];

function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="group relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 bg-[var(--color-surface)]/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      <div className="relative grid grid-cols-12 gap-6 items-center py-7 px-2">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-sm font-mono tracking-[0.3em]" style={{ color: service.accent }}>
            {service.number}
          </span>
        </div>
        <div className="col-span-7 sm:col-span-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-[var(--color-text-primary)] transition-colors">
            {service.title}
          </h3>
        </div>
        <div className="col-span-5 sm:col-span-5">
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
            {service.description}
          </p>
        </div>
        <div className="hidden sm:flex col-span-1 justify-end">
          <span className="text-[var(--color-text-tertiary)] group-hover:text-white transition-colors duration-300">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}

export const Services = () => {
  return (
    <section id="services" className="scroll-mt-16 bg-[var(--color-bg)]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <Reveal direction="up" distance={24}>
              <span className="section-meta mb-8 block">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12" />
                  What I Do / 02
                </span>
              </span>
              <h2 className="display-type text-white leading-none">
                <span className="block">Capabilities</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] mt-8 text-lg leading-relaxed">
                Engineering across the full stack — from low-level systems and networking to AI
                pipelines and user interfaces.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <StaggerContainer stagger={0.1} delayChildren={0.2} className="space-y-0">
              {SERVICES.map((service) => (
                <StaggerItem key={service.number}>
                  <ServiceRow service={service} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
