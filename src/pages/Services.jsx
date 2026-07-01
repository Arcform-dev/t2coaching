import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { SERVICES, FREE_OFFER, HOW_IT_WORKS, WHO_I_COACH } from '../data/services'
import BookingLink from '../components/ui/BookingLink'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

// Service + BreadcrumbList JSON-LD for this page is baked into the static HTML
// at build time by scripts/generate-seo.mjs (so crawlers see it in raw HTML).

const ICONS = {
  clock: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
      <circle cx="20" cy="20" r="14" /><path d="M20 11v9l6 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  whistle: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
      <path d="M8 32L20 10l12 22" strokeLinejoin="round" /><path d="M12 24h16" strokeLinecap="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
      <rect x="6" y="8" width="28" height="26" rx="3" /><path d="M13 8V6M27 8V6" strokeLinecap="round" />
      <path d="M6 18h28" /><path d="M13 26h5M13 31h10" strokeLinecap="round" />
    </svg>
  ),
}

function ServiceCard({ s }) {
  const featured = s.badge === 'Most Popular'
  return (
    <div id={s.id} style={{
      position: 'relative', display: 'flex', flexDirection: 'column',
      padding: '40px 32px 32px', height: '100%', overflow: 'hidden',
      background: '#0D2B3E',
      border: featured ? '1px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.1)',
      borderRadius: 0,
      boxShadow: featured ? '0 18px 48px rgba(0,0,0,0.32)' : 'none',
      scrollMarginTop: 96,
    }}>
      {featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#C9A84C' }} />}
      {s.badge && (
        <div style={{ position: 'absolute', top: 18, right: 22 }}>
          <span style={{ display: 'inline-block', background: s.badgeColor, color: '#0D2B3E', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 0, letterSpacing: '0.04em' }}>
            {s.badge}
          </span>
        </div>
      )}
      <div style={{ width: 52, height: 52, borderRadius: 0, background: 'rgba(126,200,227,0.14)', color: '#7EC8E3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
        {ICONS[s.icon]}
      </div>
      <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 21, color: '#fff', lineHeight: 1.3, marginBottom: s.price ? 8 : 12 }}>{s.title}</h3>

      {s.price && (
        <p style={{ fontSize: 14, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.02em', marginBottom: 12 }}>{s.price}</p>
      )}

      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 22 }}>{s.summary}</p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28, flex: 1 }}>
        {s.includes.map((inc, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: 2 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.74)', lineHeight: 1.5 }}>{inc}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Services() {
  useDocumentMeta(
    'Triathlon, Swim, Bike & Run Coaching',
    'Personalized triathlon coaching, private swim, bike & run lessons, and 12-week custom training plans from Kona Ironman World Champion Wendy Mader. Start with a free 15-minute discovery call.'
  )

  return (
    <>
      <PageHeader
        eyebrow="Coaching Services"
        title="Coaching built for"
        titleAccent="how you actually live."
        subtitle="Three ways to work with a Kona champion, from full-season personalized coaching to a one-time custom plan. Every option starts with a free conversation."
      />

      {/* Service cards */}
      <section style={{ padding: '40px 0 70px' }}>
        <div style={WRAP}>
          <div className="services-grid" style={{ display: 'grid', gap: 28 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.1}><ServiceCard s={s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Free discovery call */}
      <section style={{ padding: '20px 0 80px' }}>
        <div style={WRAP}>
          <Reveal>
            <GlassCard style={{
              padding: 'clamp(32px, 5vw, 52px)',
              display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center', justifyContent: 'space-between',
              borderColor: 'rgba(201,168,76,0.35)',
              background: '#0D2B3E',
            }}>
              <div style={{ flex: '1 1 360px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Free to start</span>
                <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#fff', margin: '12px 0 14px' }}>
                  {FREE_OFFER.label}
                </h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.84)', lineHeight: 1.7, maxWidth: 520 }}>{FREE_OFFER.body}</p>
              </div>
              <BookingLink className="shine-btn" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
                background: '#C9A84C', color: '#0D2B3E', fontSize: 16, fontWeight: 700,
                padding: '16px 36px', borderRadius: 0, textDecoration: 'none',
                boxShadow: '0 12px 40px rgba(201,168,76,0.4)',
              }}>
                Book Your Free Call
                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </BookingLink>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '20px 0 90px' }}>
        <div style={WRAP}>
          <Reveal style={{ marginBottom: 56 }}>
            <SectionHeading eyebrow="How Coaching Works" title="From hello to finish line." align="center" />
          </Reveal>
          <div className="how-grid" style={{ display: 'grid', gap: 24 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <GlassCard style={{ padding: '32px 26px', height: '100%' }}>
                  <div style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 34, color: 'rgba(126,200,227,0.5)', marginBottom: 12 }}>{step.step}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>{step.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who I coach */}
      <section style={{ padding: '0 0 100px' }}>
        <div style={WRAP}>
          <div className="story-grid" style={{ display: 'grid', gap: 48, alignItems: 'center' }}>
            <Reveal x={-40} y={0}>
              <SectionHeading eyebrow="Who I Coach" title="Every level. Every why." style={{ marginBottom: 20 }} />
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.84)', lineHeight: 1.75, marginBottom: 18 }}>
                Coaching revolves around each athlete's experience, current fitness, and the time they have to train. I build plans for the time-crunched athlete and the athlete with unlimited hours alike. I coach for accountability and health, not just sport.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.84)', lineHeight: 1.75 }}>
                I've taught adults to swim well enough to finish an Ironman in two years, and coached countless athletes to Kona. Wherever you're starting, there's a path for you.
              </p>
            </Reveal>
            <Reveal x={40} y={0} delay={0.1}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {WHO_I_COACH.map((w) => (
                  <span key={w} style={{
                    display: 'inline-block', border: '1px solid rgba(126,200,227,0.4)',
                    background: 'rgba(8,18,32,0.5)', color: 'rgba(255,255,255,0.85)',
                    fontSize: 14, fontWeight: 500, padding: '10px 16px', borderRadius: 0,
                  }}>{w}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        title="Not sure which is right for you?"
        subtitle="That's exactly what the free call is for. We'll figure out the best fit together. No pressure, no sales pitch."
        primaryLabel="Book a Free 15-Min Call"
      />
    </>
  )
}
