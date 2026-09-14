import { Layout } from '@/components/layout';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { Certifications as CertificationsSection } from '@/components/sections';

export function Certifications() {
  return (
    <Layout header={<Header sticky={true} />} footer={<Footer />}>
      <CertificationsSection />
    </Layout>
  );
}
