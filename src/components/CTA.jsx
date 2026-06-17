import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BOOKING_URL } from '../data/siteContent'

gsap.registerPlugin(ScrollTrigger)

// Word-by-word wipe reveal (same pattern as Hero)
function Words({ text, style }) {
  return (
    <>
      {text.split(' ').map((word, i, arr) => (
        <span key={i} className="wr-outer" style={{ marginRight: i < arr.length - 1 ? '0.28em' : 0 }}>
          <span className="wr-inner" style={style}>{word}</span>
        </span>
      ))}
    </>
  )
}

export default function CTA() {
  const sectionRef  = useRef(null)
  const headlineRef = useRef(null)
  const subRef      = useRef(null)
  const btnRef      = useRef(null)
  const noteRef     = useRef(null)

  useEffect(() => {
    const section  = sectionRef.current
    const headline = headlineRef.current
    const sub      = subRef.current
    const btn      = btnRef.current
    const note     = noteRef.current
    if (!section || !headline || !sub || !btn || !note) return

    const words = headline.querySelectorAll('.wr-inner')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 74%', once: true },
    })

    tl.fromTo(words,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, stagger: 0.055, ease: 'power3.out' })
      .fromTo(sub,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        '-=0.4')
      .fromTo(btn,
        { y: 28, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' },
        '-=0.35')
      .fromTo(note,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1')
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative', overflow: 'hidden',
      padding: '100px 0 120px',
      background: '#0D2B3E',
    }}>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

          {/* Headline — word-by-word wipe */}
          <h2 ref={headlineRef} style={{
            fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.1,
          }}>
            <Words text="Ready to" style={{ color: '#ffffff' }} />
            {' '}
            <Words text="race smarter?" style={{ color: '#7EC8E3' }} />
          </h2>

          {/* Sub */}
          <p ref={subRef} style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'rgba(255,255,255,0.62)',
            maxWidth: 480, lineHeight: 1.68,
          }}>
            Thirty minutes with Wendy can change the shape of your season. It is a real conversation about where you are now and where you want to go.
          </p>

          {/* CTA */}
          <a
            ref={btnRef}
            className="shine-btn"
            href={BOOKING_URL}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, whiteSpace: 'nowrap', marginTop: 8,
              background: '#C9A84C', color: '#fff',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', fontWeight: 700,
              padding: '18px 42px', borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            Book a free call with Wendy
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <p ref={noteRef} style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            The first call is free and takes about fifteen minutes.
          </p>
        </div>
      </div>
    </section>
  )
}
