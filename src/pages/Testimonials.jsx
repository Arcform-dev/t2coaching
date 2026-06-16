import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { TESTIMONIALS } from '../data/testimonials'

const WRAP = { maxWidth: 920, margin: '0 auto', padding: '0 32px' }

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#F5A623">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  useDocumentMeta(
    'Testimonials',
    'Real stories from the athletes Coach Wendy Mader has guided — from a 66-year-old Ironman finisher to lifelong swimmers and trail runners.'
  )

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Athletes who crossed"
        titleAccent="their finish lines."
        subtitle="These are real words from real athletes — beginners and veterans, in their own voice. No cherry-picked one-liners, just the whole story."
        photo="/photos/finish-line-celebration.jpg"
      />

      <section style={{ padding: '50px 0 90px' }}>
        <div style={WRAP}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={t.name} delay={(idx % 2) * 0.08}>
                <GlassCard style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#1A6B8A' }}>
                      <img src={t.photo} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 22, color: '#fff', lineHeight: 1.1 }}>{t.name}</h3>
                      <p style={{ fontSize: 13, color: '#7EC8E3', fontWeight: 500, marginTop: 4 }}>{t.tag}</p>
                    </div>
                    <Stars />
                  </div>
                  {/* Full story */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {t.full.map((p, i) => (
                      <p key={i} style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.78 }}>{p}</p>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Your story could be next."
        subtitle="Every one of these athletes started with a single conversation. Let's start yours."
      />
    </>
  )
}
