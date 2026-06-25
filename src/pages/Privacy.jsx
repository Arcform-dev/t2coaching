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

export default function Privacy() {
  useDocumentMeta(
    'Privacy Policy',
    'Privacy policy for t2coaching, LLC. Learn how contact form and guide signup information is handled.'
  )

  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy"
        titleAccent="policy."
        subtitle="Plain-language details about what this site collects and how coaching inquiries are handled."
      />

      <section style={{ padding: '50px 0 100px' }}>
        <div style={WRAP}>
          <Reveal>
            <GlassCard style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
              <p style={P}>Last updated: June 25, 2026.</p>

              <h2 style={H2}>Information we collect</h2>
              <p style={P}>
                If you submit a contact form or request a free guide, t2coaching may collect the information you
                choose to provide, such as your name, email address, phone number, race goals, experience level,
                preferred start date, and message.
              </p>

              <h2 style={H2}>How we use it</h2>
              <p style={P}>
                Wendy uses this information to reply to inquiries, send requested resources, discuss coaching fit,
                and provide coaching-related follow-up. We do not sell personal information.
              </p>

              <h2 style={H2}>Form processing</h2>
              <p style={P}>
                Site forms are processed through Formspree when a production Formspree endpoint is configured. If the
                form endpoint is not configured, the site shows a direct email fallback instead of sending the request.
              </p>

              <h2 style={H2}>Third-party links</h2>
              <p style={P}>
                This site links to services such as Instagram, Facebook, YouTube, Wall Street Journal, and Calendly
                when configured. Those services have their own privacy practices.
              </p>

              <h2 style={H2}>Contact</h2>
              <p style={{ ...P, marginBottom: 0 }}>
                Questions about privacy or your information can be sent to{' '}
                <a href={`mailto:${CONTACT.email}`} style={{ color: '#7EC8E3' }}>{CONTACT.email}</a>.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}
