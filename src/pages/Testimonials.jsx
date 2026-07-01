import { useState, useCallback } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { useTestimonials } from '../lib/content'

const WRAP = { maxWidth: 860, margin: '0 auto', padding: '0 32px' }

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#C9A84C">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

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
        width: 52,
        height: 52,
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
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
  }, [count])

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

      <section style={{ padding: '60px 0 90px' }}>
        <div style={WRAP}>
          <Reveal>
            <GlassCard style={{ padding: 'clamp(32px, 5vw, 56px)', position: 'relative' }}>
              {/* Oversized quote mark */}
              <span aria-hidden="true" style={{ position: 'absolute', top: 4, left: 22, fontFamily: 'Georgia, serif', fontSize: 96, lineHeight: 1, color: 'rgba(201,168,76,0.22)', pointerEvents: 'none' }}>&ldquo;</span>

              <div style={{ position: 'relative' }}>
                <div style={{ marginBottom: 22 }}><Stars /></div>

                {/* Quote — min-height keeps the card from jumping between slides */}
                <blockquote style={{ margin: 0, minHeight: 168, display: 'flex', alignItems: 'center' }}>
                  <p style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(19px, 2.3vw, 25px)', color: '#fff', lineHeight: 1.5, fontWeight: 500, textAlign: 'center' }}>
                    {t.excerpt}
                  </p>
                </blockquote>

                {/* Attribution */}
                <div style={{ marginTop: 28, textAlign: 'center' }}>
                  <div style={{ width: 40, height: 2, background: 'rgba(201,168,76,0.6)', margin: '0 auto 16px' }} />
                  <p style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff', fontWeight: 600 }}>{t.name}</p>
                  {t.tag && <p style={{ fontSize: 13, color: '#7EC8E3', fontWeight: 500, marginTop: 5, letterSpacing: '0.02em' }}>{t.tag}</p>}
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginTop: 32 }}>
            <ArrowButton dir="prev" onClick={() => go(-1)} />

            {/* Square dot indicators */}
            <div style={{ display: 'flex', gap: 9 }}>
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
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

          <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
            {index + 1} / {count}
          </p>
        </div>
      </section>

      <CTABanner
        title="Your story could be next."
        subtitle="Every one of these athletes started with a single conversation. Let's start yours."
      />
    </>
  )
}
