import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TESTIMONIALS as REAL_TESTIMONIALS } from '../data/testimonials'

gsap.registerPlugin(ScrollTrigger)

// Home page shows short excerpts; full stories live on /testimonials.
const TESTIMONIALS = REAL_TESTIMONIALS.map(t => ({
  quote: t.excerpt,
  name: t.name,
  tag: t.tag,
}))

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="#F5A623">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current
    if (!section) return

    if (header) {
      gsap.fromTo(header, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      })
    }
    if (cards) {
      gsap.fromTo(cards, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: cards, start: 'top 85%', once: true },
      })
    }
  }, [])

  const prev = () => setActive(a => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))
  const next = () => setActive(a => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))

  const cards = [
    { t: TESTIMONIALS[active], prominence: 'primary' },
    { t: TESTIMONIALS[(active + 1) % TESTIMONIALS.length], prominence: 'secondary' },
    { t: TESTIMONIALS[(active + 2) % TESTIMONIALS.length], prominence: 'tertiary' },
  ]

  return (
    <section id="testimonials" ref={sectionRef} style={{ background: 'transparent', padding: '80px 0 100px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div ref={headerRef} style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20, marginBottom: 56,
        }}>
          <div>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#ffffff', lineHeight: 1.2,
            }}>
              Athletes who've crossed<br />their finish lines.
            </h2>
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { fn: prev, d: 'M15 19l-7-7 7-7', label: 'Previous' },
              { fn: next, d: 'M9 5l7 7-7 7', label: 'Next' },
            ].map(({ fn, d, label }) => (
              <button key={label} onClick={fn} aria-label={label} style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(8,18,32,0.5)', color: '#ffffff',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid — lighter "voice" panels, distinct from the solid offer cards */}
        <div ref={cardsRef} className="testimonials-grid" style={{ display: 'grid', gap: 20, position: 'relative' }}>
          {cards.map(({ t, prominence }, i) => (
            <div
              key={`${active}-${i}`}
              onClick={() => i !== 0 && setActive((active + i) % TESTIMONIALS.length)}
              className={prominence === 'tertiary' ? 't-card-3' : ''}
              style={{
                background: prominence === 'primary' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                borderLeft: `3px solid ${prominence === 'primary' ? '#7EC8E3' : 'rgba(126,200,227,0.35)'}`,
                borderRadius: '4px 16px 16px 4px',
                padding: '26px 28px',
                opacity: prominence === 'tertiary' ? 0.7 : 1,
                cursor: i !== 0 ? 'pointer' : 'default',
              }}
            >
              {/* Anchored serif quote glyph — signals testimony */}
              <div style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 44, lineHeight: 0.6, color: 'rgba(126,200,227,0.4)',
                marginBottom: 14,
              }}>“</div>
              <Stars />
              <blockquote style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6, margin: '14px 0 22px',
              }}>{t.quote}</blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                  background: '#1A6B8A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Go to ${i + 1}`} style={{
              borderRadius: 100, border: 'none', cursor: 'pointer', padding: 0,
              width: i === active ? 24 : 8, height: 8,
              background: i === active ? '#7EC8E3' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <Link to="/testimonials" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: '#7EC8E3', fontSize: 15, fontWeight: 600, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 100,
            border: '1px solid rgba(126,200,227,0.4)',
          }}>
            Read full athlete stories
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
