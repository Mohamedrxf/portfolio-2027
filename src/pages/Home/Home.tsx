import { Layout } from '@/components/layout'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import { Hero } from '@/components/sections'
import { About } from '@/components/sections'
import { Skills } from '@/components/sections'
import { Experience } from '@/components/sections'
import { Education } from '@/components/sections'
import { Certifications } from '@/components/sections'
import { Projects } from '@/components/sections'
import { Achievements } from '@/components/sections'
import { Contact } from '@/components/sections'

export function Home() {
  return (
    <Layout
      header={<Header sticky={true} />}
      footer={<Footer />}
    >
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Projects />
      <Achievements />
      <Contact />
    </Layout>
  )
}
