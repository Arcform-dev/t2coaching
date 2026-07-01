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
              <p style={P}>Last updated: June 30, 2026.</p>

              <h2 style={H2}>Information we collect</h2>
              <p style={P}>
                This site does not run analytics, advertising trackers, or cookies, and it does not store anything
                you type. When you use the contact form, your browser&rsquo;s own email app opens with the details
                you entered (such as your name, email, phone, race goals, and message) so you can send them directly
                to Wendy. The information only leaves your device if you choose to hit send.
              </p>

              <h2 style={H2}>How we use it</h2>
              <p style={P}>
                Wendy uses anything you email her to reply to your inquiry, discuss coaching fit, and provide
                coaching-related follow-up. We do not sell or share your personal information.
              </p>

              <h2 style={H2}>Downloads</h2>
              <p style={P}>
                The free guide on the Resources page is a direct PDF download. You are not asked for an email address
                or any other information to access it.
              </p>

              <h2 style={H2}>Third-party links</h2>
              <p style={P}>
                This site links out to services such as Instagram, Facebook, YouTube, The Wall Street Journal, and a
                scheduling tool for booking calls. Those services have their own privacy practices, and this site also
                loads fonts from Google Fonts. We don&rsquo;t control how those third parties handle data.
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
