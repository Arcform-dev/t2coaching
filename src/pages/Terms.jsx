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

export default function Terms() {
  useDocumentMeta(
    'Terms of Use',
    'Terms of use for the t2coaching, LLC website.'
  )

  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title="Terms"
        titleAccent="of use."
        subtitle="The basic terms for using this website."
      />

      <section style={{ padding: '50px 0 100px' }}>
        <div style={WRAP}>
          <Reveal>
            <GlassCard style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
              <p style={P}>Last updated: June 30, 2026.</p>

              <h2 style={H2}>Acceptance</h2>
              <p style={P}>
                By using this website, you agree to these terms. If you do not agree, please do not use the site.
              </p>

              <h2 style={H2}>Use of the site &amp; content</h2>
              <p style={P}>
                The content on this site &mdash; text, images, logos, training articles, and downloadable guides
                &mdash; is owned by t2coaching, LLC and is provided for your personal, non-commercial use. Please
                don&rsquo;t copy, redistribute, or resell it without permission.
              </p>

              <h2 style={H2}>Coaching services</h2>
              <p style={P}>
                This website is informational. Any coaching engagement is a separate arrangement between you and
                t2coaching, and the details of that arrangement are agreed directly with Wendy. Please also read our{' '}
                <a href="/disclaimer" style={{ color: '#7EC8E3' }}>health &amp; liability disclaimer</a>.
              </p>

              <h2 style={H2}>No warranties</h2>
              <p style={P}>
                The site is provided &ldquo;as is.&rdquo; We do our best to keep information accurate and current, but
                we make no warranties about its completeness, accuracy, or availability.
              </p>

              <h2 style={H2}>External links</h2>
              <p style={P}>
                This site links to third-party websites and services. We are not responsible for their content or
                practices.
              </p>

              <h2 style={H2}>Governing law</h2>
              <p style={P}>
                These terms are governed by the laws of the State of Georgia, USA.
              </p>

              <h2 style={H2}>Contact</h2>
              <p style={{ ...P, marginBottom: 0 }}>
                Questions about these terms can be sent to{' '}
                <a href={`mailto:${CONTACT.email}`} style={{ color: '#7EC8E3' }}>{CONTACT.email}</a>.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}
