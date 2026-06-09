import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { BOOKING_URL } from '../data/siteContent'

const NAVY = '#0D2B3E'
const GOLD = '#C9A84C'
const TEAL = '#7EC8E3'

export default function Hero() {
  const imgRef  = useRef(null)
  const textRef = useRef(null)
  const ctaRef  = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: 'power3.out' })
    }
    if (imgRef.current) {
      gsap.fromTo(imgRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: 'power2.out' })
    }
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.4, ease: 'power3.out' })
    }
  }, [])

  return (
    <section className="split-hero">
      {/* Left — Wendy at the Kona finish, with the headline set behind her.
          The photo's white top is dropped out via mix-blend-mode (see index.css). */}
      <div className="split-hero__visual">
        <div ref={textRef} className="split-hero__behind" aria-hidden="true">
          <span>WORLD CHAMPION.</span>
          <span>LEVEL COACHING.</span>
        </div>
        <img
          ref={imgRef}
          className="split-hero__photo"
          src="/wendy-champion.jpg"
          alt="Wendy Mader crossing the Ironman World Championship finish line in Kona, arms raised."
        />
      </div>

      {/* Right — a plain call to action */}
      <div className="split-hero__cta">
        <div ref={ctaRef} style={{ maxWidth: 460 }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(2.1rem, 3.4vw, 3.1rem)',
            lineHeight: 1.12, color: '#fff', marginBottom: 20,
          }}>
            World champion-level coaching, built around your real life.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.7)', marginBottom: 36, maxWidth: 420,
          }}>
            Personalized swim, bike, and run plans from a Kona world champion who still races herself.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}>
            <a
              className="shine-btn"
              href={BOOKING_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
                background: GOLD, color: '#fff', fontSize: 16, fontWeight: 700,
                padding: '16px 34px', borderRadius: 100, textDecoration: 'none',
                boxShadow: '0 12px 36px rgba(201,168,76,0.4)',
              }}
            >
              Book a free call
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link to="/services" style={{ color: TEAL, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              See coaching &amp; pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
