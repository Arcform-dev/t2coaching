import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_STATS, BOOKING_URL } from '../data/siteContent'

gsap.registerPlugin(ScrollTrigger)

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

export default function Hero() {
  const sectionRef  = useRef(null)
  const eyebrowRef  = useRef(null)
  const headlineRef = useRef(null)
  const subRef      = useRef(null)
  const ctaRef      = useRef(null)
  const statsRef    = useRef(null)
  const scrollRef   = useRef(null)
  const imageRef    = useRef(null)

  useEffect(() => {
    const eyebrow   = eyebrowRef.current
    const headline  = headlineRef.current
    const sub       = subRef.current
    const cta       = ctaRef.current
    const stats     = statsRef.current
    const scrollHint = scrollRef.current
    const image     = imageRef.current

    if (!eyebrow || !headline || !sub || !cta || !scrollHint) return

    const words = headline.querySelectorAll('.wr-inner')

    const tl = gsap.timeline({ delay: 0.45 })

    tl.fromTo(eyebrow,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' })
      .fromTo(words,
        { yPercent: 108 },
        { yPercent: 0, duration: 0.85, stagger: 0.055, ease: 'power3.out' },
        '-=0.3')
      .fromTo(sub,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        '-=0.5')
      .fromTo(cta,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.35')
      .fromTo(stats,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2')
      .fromTo(scrollHint,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1')

    if (image) {
      gsap.fromTo(image,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, delay: 0.7, ease: 'power3.out' }
      )
    }

    gsap.to(scrollHint, {
      y: 9, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut', delay: 2.5,
    })
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#0D2B3E',
    }}>
      {/* Two-column content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1280, margin: '0 auto',
        padding: '128px 32px 80px', width: '100%',
      }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>

          {/* Left — copy */}
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 36, height: 1, background: '#F5A623', flexShrink: 0 }} />
              <span style={{ color: '#F5A623', fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                Kona Ironman Champion
              </span>
            </div>

            {/* Headline */}
            <h1 ref={headlineRef} style={{
              fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
              lineHeight: 1.05,
              marginBottom: 30,
              color: '#ffffff',
              fontWeight: 600,
            }}>
              <span style={{ display: 'block' }}>
                <Words text="Coached by" />
              </span>
              <span style={{ display: 'block' }}>
                <Words text="a Kona" style={{ color: '#7EC8E3', fontStyle: 'italic' }} />
                {' '}
                <Words text="Champion." />
              </span>
            </h1>

            {/* Sub */}
            <p ref={subRef} style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 300, lineHeight: 1.7,
              maxWidth: 480, marginBottom: 40,
            }}>
              Personalized triathlon plans built around your life —{' '}
              <strong style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>not a template.</strong>
              {' '}Train smarter. Race harder. Get the coaching you actually deserve.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}>
              <a
                className="shine-btn"
                href={BOOKING_URL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  gap: 8, whiteSpace: 'nowrap',
                  background: '#C9A84C', color: '#fff',
                  fontSize: 16, fontWeight: 700,
                  padding: '16px 36px', borderRadius: 100,
                  textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(201,168,76,0.45)',
                  letterSpacing: '0.01em',
                }}
              >
                Book Your Free Call
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#programs" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, whiteSpace: 'nowrap',
                color: '#7EC8E3',
                fontSize: 16, fontWeight: 500,
                padding: '15px 32px', borderRadius: 100,
                textDecoration: 'none',
                border: '1px solid rgba(126,200,227,0.45)',
              }}>View Programs</a>
            </div>

            {/* Risk-reversal microcopy directly under the primary CTA */}
            <p style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.55)',
            }}>
              <svg width="15" height="15" fill="none" stroke="#C9A84C" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free 15-minute discovery call · No commitment, no sales pitch
            </p>

            {/* Real stats */}
            <div ref={statsRef} style={{
              display: 'flex', gap: 40, marginTop: 52,
              paddingTop: 28,
              borderTop: '1px solid rgba(255,255,255,0.12)',
            }}>
              {HERO_STATS.map(({ num, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    fontWeight: 600, color: '#ffffff', lineHeight: 1,
                  }}>{num}</div>
                  <div style={{
                    fontSize: 12, color: 'rgba(255,255,255,0.48)',
                    marginTop: 5, letterSpacing: '0.04em',
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div ref={imageRef} className="hero-image-col" style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              aspectRatio: '3 / 4',
              background: '#0D2B3E',
              boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
            }}>
              <img
                src="/wendy-hero.jpg"
                alt="Wendy Mader at the Ironman World Championship"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                }}
              />

              {/* Overlay gradient — bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(to top, rgba(13,43,62,0.75), transparent)',
              }} />

              {/* Stat badge */}
              <div style={{
                position: 'absolute', bottom: 28, left: 24, right: 24,
                background: 'rgba(13,43,62,0.88)',
                backdropFilter: 'blur(12px)',
                borderRadius: 14,
                padding: '18px 20px',
                border: '1px solid rgba(126,200,227,0.2)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 15, fontStyle: 'italic', color: '#fff',
                    lineHeight: 1.4,
                  }}>
                    "Crossing that Kona finish line changed everything I understand about what athletes are capable of."
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#C9A84C', fontWeight: 600, letterSpacing: '0.1em', marginTop: 10, paddingLeft: 18 }}>
                  — WENDY MADER
                </div>
              </div>

              {/* Corner accents */}
              <div style={{ position: 'absolute', top: 18, right: 18, width: 40, height: 40, borderTop: '2px solid rgba(201,168,76,0.5)', borderRight: '2px solid rgba(201,168,76,0.5)' }} />
              <div style={{ position: 'absolute', top: 18, left: 18, width: 40, height: 40, borderTop: '2px solid rgba(126,200,227,0.25)', borderLeft: '2px solid rgba(126,200,227,0.25)' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.38)" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
