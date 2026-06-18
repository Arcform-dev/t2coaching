import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TOP_CREDENTIALS } from '../data/credentials'

gsap.registerPlugin(ScrollTrigger)

const CREDS = TOP_CREDENTIALS

export default function About() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const imageRef   = useRef(null)
  const quoteRef   = useRef(null)
  const credsRef   = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const text  = textRef.current
    const image = imageRef.current
    const quote = quoteRef.current

    // Text column slides in from left
    if (text) {
      gsap.fromTo(text, { x: -70, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      })
    }

    // Image column slides in from right
    if (image) {
      gsap.fromTo(image, { x: 70, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, delay: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      })
    }

    // Pull quote rises up
    if (quote) {
      gsap.fromTo(quote, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: quote, start: 'top 86%', once: true },
      })
    }

    // Credential tags stagger in from below
    credsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { y: 20, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.8 + i * 0.1, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true } }
      )
    })
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ background: '#F1ECE3', padding: '110px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Barrier-style: a full-width rule opens the section, then an asymmetric
            two-column block with generous spacing (no boxed card). */}
        <div style={{ height: 1, background: 'rgba(13,43,62,0.16)', marginBottom: 'clamp(40px, 6vw, 72px)' }} />
        <div className="about-grid" style={{ display: 'grid', gap: 'clamp(40px, 6vw, 88px)', alignItems: 'start' }}>

          {/* Text */}
          <div ref={textRef}>
            <h2 style={{
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
              fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
              fontWeight: 600, color: '#0D2B3E', lineHeight: 1.12, marginBottom: 34,
            }}>
              I've been in your shoes,<br />
              and on that finish line.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
              {[
                "Wendy Mader coaches from inside the sport. She's a D1 collegiate swimmer turned Kona Ironman World Champion, the 2008 Overall Amateur Winner, and a 21-time Ironman finisher who has spent more than 30 years racing at the highest level.",
                "Her approach is simple: good coaching meets you where you are. Whether you're juggling family and a full-time job, learning to swim for your first Ironman, or chasing a Kona slot, Wendy designs training that fits the life you already have.",
                "Based in Marietta, Georgia, she coaches athletes worldwide over Zoom and in person at races. With a Master's in Exercise & Sport Science and 26 years of coaching, she still swims, bikes, and runs right alongside the athletes she guides.",
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 16, color: 'rgba(13,43,62,0.74)', lineHeight: 1.72 }}>{text}</p>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {CREDS.map((c, i) => (
                <span key={c} ref={el => credsRef.current[i] = el} style={{
                  display: 'inline-block',
                  border: '1px solid rgba(13,43,62,0.3)',
                  color: '#0D2B3E',
                  fontSize: 12, fontWeight: 600,
                  padding: '6px 14px', borderRadius: 0, letterSpacing: '0.03em',
                }}>{c}</span>
              ))}
            </div>

            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: '#C9A84C', fontSize: 15, fontWeight: 600, textDecoration: 'none',
            }}>
              Read Wendy's full story
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Image + Quote */}
          <div ref={imageRef} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              position: 'relative', borderRadius: 0, overflow: 'hidden', aspectRatio: '4 / 5',
              background: '#0D2B3E',
            }}>
              <img
                src="/wendy-bike.jpg"
                alt="Wendy Mader cycling"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                }}
              />
              {/* Overlay gradient at the bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(to top, rgba(13,43,62,0.7), transparent)',
              }} />
            </div>

            <div ref={quoteRef} style={{ background: '#0D2B3E', borderRadius: 0, padding: '28px 28px 24px' }}>
              <blockquote style={{
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#ffffff', lineHeight: 1.55, margin: 0,
              }}>
                Crossing that Kona finish line changed everything I understand about what athletes are capable of. I bring that to every training plan I write.
              </blockquote>
              <div style={{ marginTop: 18 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#7EC8E3' }}>
                  Wendy Mader, Kona Ironman Champion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
