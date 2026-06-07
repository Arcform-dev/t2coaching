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
    <section id="about" ref={sectionRef} style={{ background: 'transparent', padding: '80px 0 100px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div className="about-grid" style={{ display: 'grid', gap: 60, alignItems: 'center' }}>

          {/* Text */}
          <div ref={textRef} style={{
            background: 'rgba(8,18,32,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 20,
            padding: '48px 40px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: '#F5A623' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#F5A623', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                About Wendy
              </span>
            </div>

            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
              color: '#ffffff', lineHeight: 1.2, marginBottom: 28,
            }}>
              I've been in your shoes —<br />
              and on that{' '}
              <em style={{ color: '#7EC8E3', fontStyle: 'italic' }}>finish line.</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
              {[
                "Wendy Mader is not a desk-coach. She's a D1 collegiate swimmer turned Kona Ironman World Champion — 2008 Overall Amateur Winner — and a 21-time Ironman finisher who has spent more than 30 years racing at the highest level of the sport.",
                "Her philosophy is simple: great coaching meets you where you are. Whether you're juggling family and a full-time job, learning to swim for your first Ironman, or chasing a Kona slot, Wendy designs training that fits your life — not the other way around.",
                "Based in Marietta, Georgia, she coaches athletes worldwide via Zoom — and in person at races. With a Master's in Exercise & Sport Science and 26 years of coaching, she's the rare coach who still swims, bikes, and runs right alongside the athletes she guides.",
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.72 }}>{text}</p>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {CREDS.map((c, i) => (
                <span key={c} ref={el => credsRef.current[i] = el} style={{
                  display: 'inline-block',
                  border: '1px solid rgba(126,200,227,0.55)',
                  color: '#7EC8E3',
                  fontSize: 12, fontWeight: 600,
                  padding: '6px 14px', borderRadius: 100, letterSpacing: '0.03em',
                }}>{c}</span>
              ))}
            </div>

            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: '#F5A623', fontSize: 15, fontWeight: 600, textDecoration: 'none',
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
              position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '4 / 5',
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
              {/* Overlay gradient — bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(to top, rgba(13,43,62,0.7), transparent)',
              }} />
              <div style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderTop: '2px solid rgba(245,166,35,0.55)', borderRight: '2px solid rgba(245,166,35,0.55)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, width: 36, height: 36, borderBottom: '2px solid rgba(245,166,35,0.55)', borderLeft: '2px solid rgba(245,166,35,0.55)' }} />
            </div>

            <div ref={quoteRef} style={{ background: '#0D2B3E', borderRadius: 18, padding: '28px 28px 24px', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 12, left: 22,
                fontSize: 56, color: 'rgba(245,166,35,0.45)',
                fontFamily: 'Georgia, serif', lineHeight: 1,
              }}>"</div>
              <blockquote style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#ffffff', fontStyle: 'italic', lineHeight: 1.55, paddingTop: 20,
              }}>
                Crossing that Kona finish line changed everything I understand about what athletes are capable of. I bring that to every training plan I write.
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
                <div style={{ width: 28, height: 2, background: '#F5A623', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#7EC8E3' }}>
                  Wendy Mader — Kona Ironman Champion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
