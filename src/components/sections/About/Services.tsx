import { FadeIn } from '@/components/motion';

/**
 * Engineering capabilities — white section with rounded top corners.
 *
 * Background: #FFFFFF
 * Rounded top corners: 40px mobile / 50px sm / 60px md
 * Large centered SERVICES heading style.
 * Five editorial rows with huge numbers.
 */
interface Service {
  number: string;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'SOFTWARE ENGINEERING',
    description:
      'Designing and building robust, maintainable software systems from the ground up — object-oriented architecture, clean abstractions, and production-grade code.',
  },
  {
    number: '02',
    title: 'FULL STACK DEVELOPMENT',
    description:
      'End-to-end applications spanning React and TypeScript frontends with FastAPI, Node.js, and REST backends — wired through real authentication and SQL data layers.',
  },
  {
    number: '03',
    title: 'AI / ML SYSTEMS',
    description:
      'Machine learning pipelines for threat detection and vulnerability classification — LLaMA3, FAISS, RAG pipelines, and real-time inference systems.',
  },
  {
    number: '04',
    title: 'CYBERSECURITY',
    description:
      'Security-first engineering: dependency and vulnerability analysis, attack-path identification, threat detection models, and secure sandboxed execution.',
  },
  {
    number: '05',
    title: 'NETWORKING & DISTRIBUTED SYSTEMS',
    description:
      'Computer networking, distributed applications, real-time WebSocket telemetry, and infrastructure that connects PC → switch → router → firewall → cloud.',
  },
];

function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="group relative overflow-hidden border-b border-black/10">
      <div className="absolute inset-0 bg-black/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      <div className="relative grid grid-cols-12 gap-6 items-center py-8 px-2">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-sm font-mono tracking-[0.3em] text-black/40">{service.number}</span>
        </div>
        <div className="col-span-7 sm:col-span-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight leading-none">
            {service.title}
          </h3>
        </div>
        <div className="col-span-5 sm:col-span-5">
          <p className="text-black/60 text-sm md:text-base leading-relaxed">
            {service.description}
          </p>
        </div>
        <div className="hidden sm:flex col-span-1 justify-end">
          <span className="text-black/30 group-hover:text-black transition-colors duration-300">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}

export const Services = () => {
  return (
    <section
      id="services"
      className="scroll-mt-16 bg-white text-black relative"
      style={{
        borderRadius: 'clamp(40px, 7.5vw, 60px) 60px 0 0',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <FadeIn delay={0.1} duration={0.7} y={30}>
              <span className="section-meta mb-8 block text-black/40">
                <span className="inline-flex items-center gap-3">
                  <span className="section-accent-line w-12 bg-gradient-to-r from-black/40 to-transparent" />
                  Engineering / 02
                </span>
              </span>
              <h2
                className="display-type text-black leading-none"
                style={{ fontFamily: 'var(--font-family-display)' }}
              >
                <span className="block">Capabilities</span>
              </h2>
              <p className="text-black/60 mt-8 text-lg leading-relaxed">
                Engineering across the full stack — from low-level systems and networking to AI
                pipelines and user interfaces.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {SERVICES.map((service, index) => (
                <FadeIn key={service.number} delay={0.15 + index * 0.08} duration={0.7} y={30}>
                  <ServiceRow service={service} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
