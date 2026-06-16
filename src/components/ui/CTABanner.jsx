import { Link } from 'react-router-dom'
import { BOOKING_URL } from '../../data/siteContent'
import Reveal from './Reveal'

// Compact call-to-action banner reused at the bottom of interior pages.
export default function CTABanner({
  title = 'Ready to race smarter?',
  subtitle = '30 minutes with Wendy could change your entire season. No commitment — just a real conversation about your goals.',
  primaryLabel = 'Book a Free Call',
  primaryHref = BOOKING_URL,
}) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '80px 0 100px',
      background: '#0D2B3E',
    }}>
      <Reveal style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 40, height: 1, background: '#F5A623' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#F5A623', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Start Your Season
            </span>
            <div style={{ width: 40, height: 1, background: '#F5A623' }} />
          </div>
          <h2 style={{
            fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#fff', lineHeight: 1.12, marginBottom: 18,
          }}>{title}</h2>
          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto 32px' }}>
            {subtitle}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <a
              className="shine-btn"
              href={primaryHref}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
                background: '#C9A84C', color: '#fff', fontSize: 16, fontWeight: 700,
                padding: '16px 38px', borderRadius: 100, textDecoration: 'none',
                boxShadow: '0 12px 40px rgba(201,168,76,0.45)',
              }}
            >
              {primaryLabel}
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              color: '#7EC8E3', fontSize: 16, fontWeight: 500,
              padding: '15px 32px', borderRadius: 100, textDecoration: 'none',
              border: '1px solid rgba(126,200,227,0.45)',
            }}>Send a Message</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
