import useDocumentMeta from '../hooks/useDocumentMeta'
import Hero from '../components/Hero'
import SocialProof from '../components/SocialProof'
import Stats from '../components/Stats'
import Marquee from '../components/Marquee'
import Programs from '../components/Programs'
import About from '../components/About'
import WhyT2 from '../components/WhyT2'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function Home() {
  useDocumentMeta(
    null,
    'Personalized triathlon, swim & run coaching by Kona Ironman World Champion Wendy Mader. 30+ years racing, 26 years coaching — plans built around your life.'
  )
  return (
    <>
      <Hero />
      <SocialProof />
      <Stats />
      <Marquee />
      <Programs />
      <About />
      <WhyT2 />
      <Testimonials />
      <CTA />
    </>
  )
}
