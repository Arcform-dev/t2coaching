import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BOOKING_URL } from '../data/siteContent'

gsap.registerPlugin(ScrollTrigger)

const PROGRAMS = [
  {
    badge: 'Most Popular',
    badgeColor: '#C9A84C',
    featured: true,
    title: 'Multisport & Single-Sport Coaching',
    description:
      'Full-season personalized coaching across triathlon, duathlon, or individual disciplines. Custom training in TrainingPeaks, unlimited communication, and race-day strategy built around your schedule and goals.',
  },
  {
    badge: null,
    title: 'Private Lessons',
    description:
      'One-on-one focused sessions in swimming, cycling, or running. Perfect for targeted technique work, a skills breakthrough, or expert eyes on a specific weakness before race day.',
  },
  {
    badge: 'Budget Friendly',
    badgeColor: '#C9A84C',
    title: '12-Week Custom Plan',
    description:
      "A fully customized 12-week training plan delivered to your device, with structured periodization, sport-specific workouts, and Wendy's signature race-day strategy, without an ongoing commitment.",
  },
]

function ProgramCard({ program, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const anim = gsap.fromTo(el,
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.7, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    )
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [index])

  const p = program
  const featured = p.featured
  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        background: '#0D2B3E',
        border: featured ? '1px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 0,
        padding: '36px 32px 32px',
        overflow: 'hidden',
        boxShadow: featured ? '0 18px 48px rgba(0,0,0,0.32)' : 'none',
      }}
    >
      {/* Featured gets a solid gold top bar — the visual "pick this one" cue */}
      {featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#C9A84C' }} />}

      {/* Refined eyebrow tag, in normal flow so it can never overlap the title.
          A consistent min-height keeps the titles aligned across all cards,
          tagged or not. */}
      <div style={{ minHeight: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        {p.badge && (
          <>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.badgeColor, flexShrink: 0 }} />
            <span style={{
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
              fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: p.badgeColor,
            }}>{p.badge}</span>
          </>
        )}
      </div>

      <h3 style={{
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        fontSize: 20, color: '#ffffff',
        lineHeight: 1.3, marginBottom: 12,
      }}>{p.title}</h3>

      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.72, flex: 1, marginBottom: 24 }}>
        {p.description}
      </p>

      <Link
        className="shine-btn"
        to={BOOKING_URL}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, whiteSpace: 'nowrap',
          background: featured ? '#C9A84C' : 'transparent',
          color: featured ? '#fff' : '#7EC8E3',
          border: featured ? '1px solid #C9A84C' : '1px solid rgba(126,200,227,0.5)',
          fontSize: 14, fontWeight: featured ? 700 : 600,
          padding: '14px 24px', borderRadius: 0,
          textDecoration: 'none',
        }}
      >
        {featured ? 'Book Your Free Call' : 'Book a Call'}
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  )
}

export default function Programs() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const header  = headerRef.current
    if (!section || !header) return
    gsap.fromTo(header,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true } }
    )
  }, [])

  return (
    <section id="programs" ref={sectionRef} style={{ background: '#F1ECE3', padding: '64px 0 110px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        <div ref={headerRef} style={{ maxWidth: 640, marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#0D2B3E', lineHeight: 1.15, marginBottom: 16,
          }}>
            Coaching built for how you actually live.
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(13,43,62,0.7)', lineHeight: 1.65 }}>
            Whether you're chasing your first finish line or gunning for Kona, there's a path designed for you.
          </p>
        </div>

        <div className="programs-grid" style={{ display: 'grid', gap: 24 }}>
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.title} program={p} index={i} />
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link to="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: '#0D2B3E', fontSize: 15, fontWeight: 600, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 0,
            border: '1px solid rgba(13,43,62,0.3)',
          }}>
            View all coaching services
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
