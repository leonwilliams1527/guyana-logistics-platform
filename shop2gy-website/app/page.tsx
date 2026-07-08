import QuoteCalculator from '@/components/QuoteCalculator'
import { Automations, Footer, Header, Hero, PortalPreview, Services, Signup, Tracking } from '@/components/Sections'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <section className="mx-auto max-w-7xl px-5 py-16"><QuoteCalculator /></section>
      <Tracking />
      <PortalPreview />
      <Signup />
      <Automations />
      <Footer />
    </main>
  )
}
