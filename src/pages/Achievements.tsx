import { Layout } from '@/components/layout';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { Achievements as AchievementsSection } from '@/components/sections';

export function Achievements() {
  return (
    <Layout header={<Header sticky={true} />} footer={<Footer />}>
      <AchievementsSection />
    </Layout>
  );
}
