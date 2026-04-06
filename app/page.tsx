import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import Credibility from "@/components/sections/Credibility"
import WhyNexo from "@/components/sections/WhyNexo"
import SitesDesactualizados from "@/components/sections/SitesDesactualizados"
import Portfolio from "@/components/sections/Portfolio"
import Process from "@/components/sections/Process"
import Results from "@/components/sections/Results"
import Testimonials from "@/components/sections/Testimonials"
import FAQ from "@/components/sections/FAQ"
import CTAFinal from "@/components/sections/CTAFinal"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="relative overflow-hidden page-transition">
      <Navbar />
      <Hero />
      <Credibility />
      <WhyNexo />
      <SitesDesactualizados />
      <Portfolio />
      <Process />
      <Results />
      <Testimonials />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  )
}
