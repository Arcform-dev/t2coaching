import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import { CONTACT } from '../data/siteContent'

const WRAP = { maxWidth: 920, margin: '0 auto', padding: '0 32px' }
const H2 = {
  fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
  fontSize: 24,
  color: '#fff',
  margin: '28px 0 10px',
}
const P = { fontSize: 16, color: 'rgba(255,255,255,0.84)', lineHeight: 1.75, marginBottom: 14 }

export default function Disclaimer() {
  useDocumentMeta(
    'Disclaimer',
    'Health, fitness and liability disclaimer for t2coaching, LLC. Please read before beginning any training program.'
  )

  return (
    <>
      <PageHeader
        eyebrow="Disclaimer"
        title="Health &"
        titleAccent="liability disclaimer."
        subtitle="Please read this before beginning any training plan or exercise program from t2coaching."
      />

      <section style={{ padding: '50px 0 100px' }}>
        <div style={WRAP}>
          <Reveal>
            <GlassCard style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
              <p style={P}>Last updated: June 30, 2026.</p>

              <h2 style={H2}>Not medical advice</h2>
              <p style={P}>
                The training plans, coaching, articles, and resources provided by t2coaching, LLC are for general
                fitness and educational purposes only. They are not medical advice and are not a substitute for the
                advice of your physician or other qualified health provider. Always consult your physician before
                beginning any exercise program, especially if you are pregnant, have an injury or chronic condition,
                or have any concerns about your health.
              </p>

              <h2 style={H2}>Assumption of risk</h2>
              <p style={P}>
                Physical activity such as swimming, cycling, running, and strength training carries inherent risks,
                including the risk of injury. By following any plan, workout, or guidance from t2coaching, you
                acknowledge these risks and agree to participate at your own risk. Listen to your body, stop if you
                feel pain, dizziness, or discomfort, and seek medical attention when needed.
              </p>

              <h2 style={H2}>No guaranteed results</h2>
              <p style={P}>
                Every athlete is different. Coaching outcomes depend on many factors, including your effort,
                consistency, health, and circumstances. t2coaching does not guarantee any specific result, race time,
                qualification, weight change, or performance level.
              </p>

              <h2 style={H2}>Testimonials</h2>
              <p style={P}>
                Athlete stories and testimonials on this site reflect individual experiences and are not a promise or
                guarantee that you will achieve the same or similar results.
              </p>

              <h2 style={H2}>Limitation of liability</h2>
              <p style={P}>
                To the fullest extent permitted by law, t2coaching, LLC and Wendy Mader are not liable for any injury,
                loss, or damage arising from your use of this site or participation in any training program. You are
                responsible for your own health and training decisions.
              </p>

              <h2 style={H2}>Questions</h2>
              <p style={{ ...P, marginBottom: 0 }}>
                If you have questions about this disclaimer, contact{' '}
                <a href={`mailto:${CONTACT.email}`} style={{ color: '#7EC8E3' }}>{CONTACT.email}</a>.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}
