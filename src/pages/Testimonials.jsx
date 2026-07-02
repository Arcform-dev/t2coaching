import { useState, useCallback, useRef, useEffect } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import CTABanner from '../components/ui/CTABanner'
import { useTestimonials } from '../lib/content'

const WRAP = { maxWidth: 860, margin: '0 auto', padding: '0 32px' }
const HEADER_H = 72 // fixed site nav height

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
    'Athlete Reviews & Testimonials',
    'Stories from the athletes Coach Wendy Mader has guided, from a 66-year-old Ironman finisher to lifelong swimmers and trail runners.'
  )

  const testimonials = useTestimonials() || []
  const count = testimonials.length
  const [index, setIndex] = useState(0)

  // The site sets html{overflow-x:hidden}, which makes the document a scroll
  // container and breaks position:sticky. So the control bar is position:fixed
  // and we reveal it once the reader scrolls past the hero — detected by a
  // sentinel crossing the header line.
  const [stuck, setStuck] = useState(false)
  const sentinelRef = useRef(null)
  const barRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: `-${HEADER_H}px 0px 0px 0px`, threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Jump the reader to the start of the story, just below the header + bar.
  // Force behavior:auto because html{scroll-behavior:smooth} would otherwise
  // animate (and swallow) this jump.
  const scrollToStart = useCallback(() => {
    const content = contentRef.current
    if (!content) return
    const barH = barRef.current?.offsetHeight || 74
    const top = content.getBoundingClientRect().top + window.scrollY - HEADER_H - barH
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, Math.max(0, top))
    html.style.scrollBehavior = prev
  }, [])

  const go = useCallback((next) => {
    if (count === 0) return
    setIndex((i) => (i + next + count) % count)
    scrollToStart()
  }, [count, scrollToStart])
  const select = useCallback((i) => {
    setIndex(i)
    scrollToStart()
  }, [scrollToStart])

  if (count === 0) return null
  const t = testimonials[index]

  const Controls = (
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
  )

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Athletes who crossed"
        titleAccent="their finish lines."
        subtitle="Straight from the athletes themselves, beginners and veterans, in their own voice. No cherry-picked one-liners, just the whole story."
        photo="/photos/finish-line-celebration.jpg"
      />

      {/* Fixed control bar — slides in under the header once you scroll past the
          hero, so it stays with you no matter how far down a story you read. */}
      <div
        ref={barRef}
        style={{
          position: 'fixed',
          top: HEADER_H,
          left: 0,
          right: 0,
          zIndex: 20,
          background: 'rgba(8,24,35,0.96)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transform: stuck ? 'translateY(0)' : 'translateY(-100%)',
          opacity: stuck ? 1 : 0,
          pointerEvents: stuck ? 'auto' : 'none',
          transition: 'transform 0.25s ease, opacity 0.25s ease',
        }}
      >
        {Controls}
      </div>

      {/* Sentinel: when this scrolls above the header, the fixed bar appears. */}
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Inline controls at the top of the content, visible before you scroll. */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{Controls}</div>

      <section ref={contentRef} style={{ padding: '48px 0 90px' }}>
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
