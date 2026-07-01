import { useState, useCallback } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import CTABanner from '../components/ui/CTABanner'
import { useTestimonials } from '../lib/content'

const WRAP = { maxWidth: 860, margin: '0 auto', padding: '0 32px' }

// Square nav button, in keeping with the site's sharp-cornered geometry.
function ArrowButton({ dir, onClick }) {
  const isPrev = dir === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous testimonial' : 'Next testimonial'}
      style={{
        appearance: 'none',
        cursor: 'pointer',
        width: 46,
        height: 46,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        border: '1px solid rgba(255,255,255,0.16)',
        background: 'rgba(8,18,32,0.7)',
        color: '#C9A84C',
        transition: 'border-color 0.18s ease',
      }}
    >
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d={isPrev ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}

export default function Testimonials() {
  useDocumentMeta(
    'Testimonials',
    'Real stories from the athletes Coach Wendy Mader has guided, from a 66-year-old Ironman finisher to lifelong swimmers and trail runners.'
  )

  const testimonials = useTestimonials() || []
  const count = testimonials.length
  const [index, setIndex] = useState(0)

  const go = useCallback((next) => {
    if (count === 0) return
    setIndex((i) => (i + next + count) % count)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [count])
  const select = useCallback((i) => {
    setIndex(i)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  if (count === 0) return null
  const t = testimonials[index]

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Athletes who crossed"
        titleAccent="their finish lines."
        subtitle="These are real words from real athletes, beginners and veterans, in their own voice. No cherry-picked one-liners, just the whole story."
        photo="/photos/finish-line-celebration.jpg"
      />

      {/* Sticky control bar — stays under the fixed 72px header so you can jump
          between stories no matter how far down a long testimonial you've read. */}
      <div style={{ position: 'sticky', top: 72, zIndex: 20, background: 'rgba(8,24,35,0.96)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ ...WRAP, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 32px' }}>
          <ArrowButton dir="prev" onClick={() => go(-1)} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => select(i)}
                aria-label={`Go to ${item.name}'s testimonial`}
                aria-current={i === index}
                style={{
                  appearance: 'none',
                  cursor: 'pointer',
                  width: i === index ? 26 : 10,
                  height: 10,
                  padding: 0,
                  borderRadius: 0,
                  border: 'none',
                  background: i === index ? '#C9A84C' : 'rgba(255,255,255,0.22)',
                  transition: 'width 0.22s ease, background 0.22s ease',
                }}
              />
            ))}
          </div>

          <ArrowButton dir="next" onClick={() => go(1)} />
        </div>
      </div>

      <section style={{ padding: '56px 0 90px' }}>
        <div style={WRAP}>
          {/* Attribution */}
          <div style={{ marginBottom: 30 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
              Testimonial {index + 1} of {count}
            </p>
            <h2 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', color: '#fff', lineHeight: 1.1 }}>{t.name}</h2>
            {t.tag && <p style={{ fontSize: 15, color: '#7EC8E3', fontWeight: 500, marginTop: 8, letterSpacing: '0.02em' }}>{t.tag}</p>}
          </div>

          {/* Full story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {t.full.map((p, i) => (
              <p key={i} style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}>{p}</p>
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
