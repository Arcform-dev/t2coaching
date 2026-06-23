import { Link } from 'react-router-dom'
import Reveal from './ui/Reveal'
import { PROCESS_STEPS as STEPS } from '../data/process'

// Compact homepage teaser for the /process page. A navy "slide" sitting on the
// teal background, previewing the six journey steps so visitors actually
// discover the full scrollytelling page. Pulls from the shared PROCESS_STEPS so
// the preview and the real page never drift apart.

const FONT = "'DM Sans', system-ui, -apple-system, sans-serif"
const NAVY = '#0D2B3E'
const SKY = '#7EC8E3'
const GOLD = '#C9A84C'

export default function ProcessPreview() {
  return (
    <section style={{ padding: 'clamp(72px, 9vw, 110px) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <Reveal>
          <div style={{
            background: NAVY, border: '1px solid rgba(255,255,255,0.1)',
            padding: 'clamp(32px, 5vw, 64px)',
          }}>
            {/* Heading */}
            <div style={{ maxWidth: 680, marginBottom: 'clamp(36px, 5vw, 52px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 28, height: 1, background: GOLD }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  How It Works
                </span>
              </div>
              <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 600, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
                This is what working with Wendy looks like.
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>
                Six steps from your first conversation to race morning, each one personal and built around your life. Here's the short version.
              </p>
            </div>

            {/* Step preview row */}
            <div className="process-preview-grid" style={{ display: 'grid', gap: 24, marginBottom: 'clamp(36px, 5vw, 48px)' }}>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: NAVY,
                      background: i === 0 ? GOLD : SKY,
                    }}>{s.n}</span>
                    <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.14)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA into the full page */}
            <Link to="/process" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
              background: GOLD, color: NAVY, fontSize: 15, fontWeight: 700,
              padding: '15px 32px', textDecoration: 'none',
            }}>
              Walk through the full process
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
