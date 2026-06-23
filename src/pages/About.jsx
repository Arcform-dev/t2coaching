import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { STORY, NAME_MEANING, PHILOSOPHY, WSJ_FEATURE } from '../data/siteContent'
import { RACE_RESULTS, COACHING_CREDENTIALS } from '../data/credentials'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

function CredColumn({ title, items, accent }) {
  return (
    <GlassCard style={{ padding: '36px 32px' }}>
      <h3 style={{
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        fontSize: 22, color: '#fff', marginBottom: 22,
      }}>{title}</h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((c, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: accent, flexShrink: 0, marginTop: 2 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>{c}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}

export default function About() {
  useDocumentMeta(
    'About Coach Wendy',
    "Wendy Mader is a Division I swimmer, 2008 Kona Ironman World Champion, and the founder of t2coaching. Here's her story, coaching philosophy, and credentials."
  )

  return (
    <>
      <PageHeader
        eyebrow="About Coach Wendy"
        title="I've been in your shoes,"
        titleAccent="and on that finish line."
        subtitle="I went from a Division I swimmer to a Kona Ironman World Champion, with over three decades of racing experience and 26 years of coaching behind me."
        photo="/photos/kona-world-championship-finish.jpg"
      />

      {/* Story + portrait */}
      <section style={{ padding: '60px 0 90px', overflow: 'hidden' }}>
        <div style={WRAP}>
          <div className="story-grid" style={{ display: 'grid', gap: 56, alignItems: 'start' }}>
            <Reveal x={-50} y={0}>
              <SectionHeading eyebrow="My Story" title="From overtrained to Overall Amateur Champion." style={{ marginBottom: 28 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {STORY.map((p, i) => (
                  <p key={i} style={{ fontSize: 16, color: 'rgba(255,255,255,0.74)', lineHeight: 1.75 }}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal x={50} y={0} delay={0.1} style={{ position: 'sticky', top: 96 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ position: 'relative', borderRadius: 0, overflow: 'hidden', aspectRatio: '3/4', background: '#0D2B3E' }}>
                  <img src="/photos/kona-world-championship-finish.jpg" alt="Wendy Mader finishing the Ironman World Championship in Kona"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%', background: 'linear-gradient(to top, rgba(13,43,62,0.85), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: 18, left: 20, right: 20 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.08em' }}>
                      2008 Ironman World Championship, Kona, Hawaii
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Name meaning */}
      <section style={{ padding: '40px 0 80px' }}>
        <div style={WRAP}>
          <Reveal>
            <GlassCard style={{ padding: 'clamp(32px, 5vw, 56px)', textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
              <p style={{
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
                fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)',
                color: '#fff', lineHeight: 1.5, margin: 0,
              }}>
                {NAME_MEANING.body}
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: '40px 0 90px' }}>
        <div style={WRAP}>
          <Reveal style={{ marginBottom: 56 }}>
            <SectionHeading
              eyebrow="Coaching Philosophy"
              title="More than a training plan."
              subtitle="The best part of coaching, for me, is the relationship. The magic of your training doesn't come from the plan. It comes from the two of us working together to find what works for you."
            />
          </Reveal>
          <div className="philosophy-grid" style={{ display: 'grid', gap: 24 }}>
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <GlassCard style={{ padding: '32px 28px', height: '100%' }}>
                  <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 19, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.66)', lineHeight: 1.7 }}>{p.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ padding: '40px 0 90px' }}>
        <div style={WRAP}>
          <Reveal style={{ marginBottom: 48 }}>
            <SectionHeading eyebrow="Credentials & Results" title="Three decades. Every discipline." align="center" />
          </Reveal>
          <div className="story-grid" style={{ display: 'grid', gap: 24 }}>
            <Reveal x={-40} y={0}><CredColumn title="Race Results & Honors" items={RACE_RESULTS} accent="#C9A84C" /></Reveal>
            <Reveal x={40} y={0} delay={0.1}><CredColumn title="Coaching Credentials & Career" items={COACHING_CREDENTIALS} accent="#7EC8E3" /></Reveal>
          </div>
        </div>
      </section>

      {/* WSJ feature */}
      <section style={{ padding: '0 0 90px' }}>
        <div style={WRAP}>
          <Reveal>
            <a href={WSJ_FEATURE.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <GlassCard style={{ padding: 'clamp(28px, 4vw, 44px)', borderColor: 'rgba(201,168,76,0.35)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    Featured in {WSJ_FEATURE.outlet}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)', color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>
                  "{WSJ_FEATURE.title}"
                </h3>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.66)', lineHeight: 1.7, marginBottom: 16 }}>{WSJ_FEATURE.blurb}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7EC8E3', fontSize: 14, fontWeight: 600 }}>
                  Read the article
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </GlassCard>
            </a>
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Let's write your next chapter."
        subtitle="Whether it's your first 5k or a Kona slot, I'll meet you where you are. Book a free call and let's talk about your goals."
      />
    </>
  )
}
