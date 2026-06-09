import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { BOOKING_URL } from '../data/siteContent'

// ── Kona-palette tokens — the ember is pulled from Wendy's actual race
//    (lava fields + the Ironman finish arch), not the default sports gold. ──
const ABYSS  = '#0B2738'
const LAVA   = '#E0512B'
const EMBER  = '#F6A36B'
const BLEACH = '#F5F1E9'
const ASH    = '#AEBCC4'

const DISPLAY = "'Fraunces', Georgia, serif"
const BODY    = "'Hanken Grotesk', system-ui, -apple-system, sans-serif"
const CLOCK   = "'IBM Plex Mono', ui-monospace, monospace"

// The "Finish Clock" — monospace lava timestamps, the hero's signature device.
// Every triathlete remembers the number on the clock when they crossed the line.
function Clock({ children }) {
  return (
    <span style={{
      fontFamily: CLOCK, fontWeight: 600, fontSize: 13, letterSpacing: '0.06em',
      color: LAVA, background: 'rgba(224,81,43,0.12)',
      border: '1px solid rgba(224,81,43,0.35)',
      padding: '5px 9px', borderRadius: 4, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

export default function Hero() {
  const photoRef    = useRef(null)
  const eyebrowRef  = useRef(null)
  const headlineRef = useRef(null)
  const subRef      = useRef(null)
  const ctaRef      = useRef(null)
  const proofRef    = useRef(null)

  useEffect(() => {
    const reveal = [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, proofRef.current]
    if (reveal.some((el) => !el)) return

    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(reveal,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' })

    if (photoRef.current) {
      gsap.fromTo(photoRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power2.out' })
    }
  }, [])

  return (
    <section style={{
      position: 'relative', isolation: 'isolate',
      minHeight: '100svh',
      display: 'grid', gridTemplateRows: '1fr auto',
      background: ABYSS, color: BLEACH, overflow: 'hidden',
      fontFamily: BODY,
    }}>
      {/* Full-bleed finish-line photo — the primary visual, not a side card.
          Swap in a wide landscape finish celebration when available; the
          object-position keeps Wendy clear of the copy column. */}
      <img
        ref={photoRef}
        className="hero2-photo"
        src="/wendy-hero.jpg"
        alt="Wendy Mader at the Ironman World Championship in Kona, Hawaii."
        style={{ position: 'absolute', inset: 0, zIndex: -2, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div className="hero2-scrim" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: -1 }} />

      {/* Copy column */}
      <div className="hero2-content" style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1240, margin: '0 auto',
        padding: 'clamp(112px, 14vh, 168px) clamp(24px, 5vw, 72px) clamp(28px, 5vh, 52px)',
      }}>
        <div style={{ maxWidth: 640 }}>
          <p ref={eyebrowRef} style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 11,
            margin: '0 0 22px', fontSize: 13, color: ASH, letterSpacing: '0.02em',
          }}>
            <Clock>KONA 2008</Clock>
            <span>Overall Amateur World Champion</span>
          </p>

          <h1 ref={headlineRef} style={{
            margin: '0 0 24px', fontFamily: DISPLAY, fontWeight: 600,
            fontSize: 'clamp(2.5rem, 6.2vw, 5.25rem)', lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}>
            <span style={{
              display: 'block', marginBottom: 8,
              fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)', fontStyle: 'italic',
              fontWeight: 500, letterSpacing: 0, color: EMBER,
            }}>Hi, I'm Wendy.</span>
            Let's get you to the finish line you've got in mind.
          </h1>

          <p ref={subRef} style={{
            margin: '0 0 34px', maxWidth: 600,
            fontSize: 'clamp(1.02rem, 1.5vw, 1.2rem)', lineHeight: 1.65, color: ASH,
          }}>
            For 26 years I've coached every kind of athlete — first 5Ks, first
            Ironmans, Kona qualifiers — and I'm still out racing myself. We'll
            build your plan around the hours you actually have, with a reason
            behind every session you do.
          </p>

          <div ref={ctaRef}>
            <a className="hero2-cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Let's talk about your season
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                   strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Proof band — one real athlete result, set typographically.
          Replaces the floating dark testimonial card. */}
      <aside ref={proofRef} aria-label="Athlete result" style={{
        position: 'relative', zIndex: 2, width: '100%', maxWidth: 1240, margin: '0 auto',
        padding: 'clamp(16px, 2.5vh, 24px) clamp(24px, 5vw, 72px) clamp(26px, 3vh, 36px)',
      }}>
        {/* The finish-tape rule (signature) */}
        <div style={{
          height: 6, borderRadius: 3, marginBottom: 18,
          backgroundColor: LAVA,
          backgroundImage: 'conic-gradient(rgba(245,241,233,0.85) 90deg, transparent 0 180deg, rgba(245,241,233,0.85) 0 270deg, transparent 0)',
          backgroundSize: '6px 6px',
        }} />
        <p style={{
          margin: '0 0 8px', maxWidth: 700, fontFamily: DISPLAY, fontStyle: 'italic',
          fontWeight: 500, fontSize: 'clamp(1.05rem, 1.9vw, 1.45rem)', lineHeight: 1.35, color: BLEACH,
        }}>
          "From not being able to swim freestyle to a 62-minute Ironman swim."
        </p>
        <p style={{
          margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 11,
          fontSize: 14, color: ASH,
        }}>
          <Clock>SWIM 62:00</Clock>
          Jay — who I coached to a 140.6 finish at age 66
        </p>
      </aside>
    </section>
  )
}
