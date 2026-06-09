import { Link } from 'react-router-dom'
import Reveal from './ui/Reveal'
import { PROCESS_STEPS } from '../data/process'

// Homepage snippet of the /process page — the six coaching-journey beats as a
// compact card grid, sharing PROCESS_STEPS with the full page so they stay aligned.

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }
const NAVY = '#0D2B3E'
const AMBER = '#F5A623'

const Arrow = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export default function ProcessPreview() {
  return (
    <section style={{ background: 'transparent', padding: '80px 0 100px' }}>
      <div style={WRAP}>
        <Reveal>
          <div style={{ maxWidth: 600, marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 1, background: AMBER }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: AMBER, letterSpacing: '0.2em', textTransform: 'uppercase' }}>The Process</span>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              What working with Wendy looks like.
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
              Six steps from your first conversation to race morning — personal, dynamic, and built entirely around your life.
            </p>
          </div>
        </Reveal>

        <div className="steps-grid" style={{ display: 'grid', gap: 20 }}>
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 0.08}>
              <div style={{ height: '100%', background: NAVY, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '28px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 30, color: 'rgba(126,200,227,0.5)', lineHeight: 1 }}>{s.n}</span>
                  <div style={{ width: 24, height: 1, background: AMBER }} />
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link to="/process" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7EC8E3', fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '12px 28px', borderRadius: 100, border: '1px solid rgba(126,200,227,0.4)' }}>
            Walk through the full process
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
