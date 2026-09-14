import { Layout } from '@/components/layout';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { Experience as ExperienceSection } from '@/components/sections';

export function Experience() {
  return (
    <Layout header={<Header sticky={true} />} footer={<Footer />}>
      <ExperienceSection />
    </Layout>
  );
}
