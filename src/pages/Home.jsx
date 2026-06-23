import useDocumentMeta from '../hooks/useDocumentMeta'
import Hero from '../components/Hero'
import Programs from '../components/Programs'
import ProcessPreview from '../components/ProcessPreview'
import Stats from '../components/Stats'
import About from '../components/About'
import WhyT2 from '../components/WhyT2'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function Home() {
  useDocumentMeta(
    null,
    'Personalized triathlon, swim & run coaching by Kona Ironman World Champion Wendy Mader. 30+ years racing, 26 years coaching, and plans built around your life.'
  )
  return (
    <>
      <Hero />
      <div className="home-rest">
        <Programs />
        <ProcessPreview />
        <Stats />
        <About />
        <WhyT2 />
        <Testimonials />
        <CTA />
      </div>
    </>
  )
}
