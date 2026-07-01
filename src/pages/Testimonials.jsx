import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { useTestimonials } from '../lib/content'

const WRAP = { maxWidth: 1120, margin: '0 auto', padding: '0 32px' }

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} width="17" height="17" viewBox="0 0 20 20" fill="#C9A84C">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Split the tag ("IRONMAN 70.3 Finisher · 6:17:02") into a role label and the
// standout detail (finish time / age / location) so we can feature the result.
function splitTag(tag) {
  if (!tag) return { role: '', detail: '' }
  const parts = tag.split('·').map(s => s.trim())
  return { role: parts[0] || '', detail: parts.slice(1).join(' · ') }
}

function StatBadge({ detail }) {
  if (!detail) return null
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, marginTop: 14, padding: '10px 16px', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.08)' }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Result</span>
      <span style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>{detail}</span>
    </div>
  )
}

function TestimonialRow({ t, flip }) {
  const { role, detail } = splitTag(t.tag)
  return (
    <div className={`testimonial-grid${flip ? ' media-right' : ''}`}>
      {/* Media / identity */}
      <div className="t-media">
        <div style={{ position: 'relative', aspectRatio: '4/5', maxWidth: 380, margin: '0 auto', overflow: 'hidden', background: '#0D2B3E', border: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={t.photo} alt={t.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 26, color: '#fff', lineHeight: 1.1 }}>{t.name}</h3>
          {role && <p style={{ fontSize: 13, color: '#7EC8E3', fontWeight: 500, marginTop: 6, letterSpacing: '0.02em' }}>{role}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}><Stars /></div>
          <div style={{ display: 'flex', justifyContent: 'center' }}><StatBadge detail={detail} /></div>
        </div>
      </div>

      {/* Story */}
      <div className="t-story">
        {/* Pull quote */}
        <div style={{ position: 'relative', paddingLeft: 26, marginBottom: 26 }}>
          <span style={{ position: 'absolute', left: -6, top: -18, fontFamily: 'Georgia, serif', fontSize: 72, lineHeight: 1, color: 'rgba(201,168,76,0.28)' }}>&ldquo;</span>
          <p style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(20px, 2.4vw, 26px)', color: '#fff', lineHeight: 1.42, fontWeight: 500, borderLeft: '2px solid rgba(201,168,76,0.5)', paddingLeft: 22 }}>
            {t.excerpt}
          </p>
        </div>
        {/* Full story */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {t.full.map((p, i) => (
            <p key={i} style={{ fontSize: 16, color: 'rgba(255,255,255,0.74)', lineHeight: 1.78 }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  useDocumentMeta(
    'Testimonials',
    'Real stories from the athletes Coach Wendy Mader has guided, from a 66-year-old Ironman finisher to lifelong swimmers and trail runners.'
  )

  const testimonials = useTestimonials() || []

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Athletes who crossed"
        titleAccent="their finish lines."
        subtitle="These are real words from real athletes, beginners and veterans, in their own voice. No cherry-picked one-liners, just the whole story."
        photo="/photos/finish-line-celebration.jpg"
      />

      <section style={{ padding: '50px 0 90px' }}>
        <div style={WRAP}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 8vw, 96px)' }}>
            {testimonials.map((t, idx) => (
              <Reveal key={t.name}>
                <TestimonialRow t={t} flip={idx % 2 === 1} />
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
