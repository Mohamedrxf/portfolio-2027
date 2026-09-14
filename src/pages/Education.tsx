import { Layout } from '@/components/layout';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { Education as EducationSection } from '@/components/sections';

export function Education() {
  return (
    <Layout header={<Header sticky={true} />} footer={<Footer />}>
      <EducationSection />
    </Layout>
  );
}
