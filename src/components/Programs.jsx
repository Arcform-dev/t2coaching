import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BOOKING_URL } from '../data/siteContent'

gsap.registerPlugin(ScrollTrigger)

const PROGRAMS = [
  {
    badge: 'Most Popular',
    badgeColor: '#D4201A',
    title: 'Multisport & Single-Sport Coaching',
    description:
      'Full-season personalized coaching across triathlon, duathlon, or individual disciplines. Custom training in TrainingPeaks, unlimited communication, and race-day strategy built around your schedule and goals.',
    highlight: '$300 / month',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 11v9l6 3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    badge: null,
    title: 'Private Lessons',
    description:
      'One-on-one focused sessions in swimming, cycling, or running. Perfect for targeted technique work, a skills breakthrough, or expert eyes on a specific weakness before race day.',
    highlight: '$150 first · $75 follow-ups',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
        <path d="M8 32L20 10l12 22" strokeLinejoin="round" />
        <path d="M12 24h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    badge: 'Budget Friendly',
    badgeColor: '#F5A623',
    title: '12-Week Custom Plan',
    description:
      "A fully customized 12-week training plan delivered to your device — structured periodization, sport-specific workouts, and Wendy's signature race-day strategy at an accessible price.",
    highlight: '$300 one-time',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
        <rect x="6" y="8" width="28" height="26" rx="3" />
        <path d="M13 8V6M27 8V6" strokeLinecap="round" />
        <path d="M6 18h28" />
        <path d="M13 26h5M13 31h10" strokeLinecap="round" />
      </svg>
    ),
  },
]

function ProgramCard({ program, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    // Alternating: left → right → left
    const fromX = index % 2 === 0 ? -60 : 60
    gsap.fromTo(el,
      { x: fromX, y: 30, opacity: 0 },
      {
        x: 0, y: 0, opacity: 1,
        duration: 0.8, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    )
  }, [index])

  const onMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -7
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 7
    gsap.to(el, { rotateX, rotateY, transformPerspective: 900, duration: 0.25, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' })
  }

  const p = program
  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        background: 'rgba(8,18,32,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: '36px 32px 32px',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {p.badge && (
        <div style={{ position: 'absolute', top: -13, left: 28 }}>
          <span style={{
            display: 'inline-block',
            background: p.badgeColor, color: '#fff',
            fontSize: 11, fontWeight: 600,
            padding: '4px 12px', borderRadius: 100, letterSpacing: '0.04em',
          }}>{p.badge}</span>
        </div>
      )}

      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: 'rgba(126,200,227,0.12)', color: '#1A6B8A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, flexShrink: 0,
      }}>{p.icon}</div>

      <h3 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 20, color: '#ffffff',
        lineHeight: 1.3, marginBottom: 12,
      }}>{p.title}</h3>

      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.72, flex: 1, marginBottom: 24 }}>
        {p.description}
      </p>

      <div style={{ marginBottom: 20 }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(126,200,227,0.15)', color: '#7EC8E3',
          fontSize: 12, fontWeight: 600,
          padding: '5px 12px', borderRadius: 100, letterSpacing: '0.03em',
        }}>{p.highlight}</span>
      </div>

      <a
        href={BOOKING_URL}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, whiteSpace: 'nowrap',
          background: '#0D2B3E', color: '#fff',
          fontSize: 14, fontWeight: 600,
          padding: '14px 24px', borderRadius: 12,
          textDecoration: 'none',
        }}
      >
        Book a Call
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
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
    <section id="programs" ref={sectionRef} style={{ background: 'transparent', padding: '80px 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        <div ref={headerRef} style={{ maxWidth: 600, marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 32, height: 1, background: '#F5A623' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#F5A623', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Programs</span>
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#ffffff', lineHeight: 1.15, marginBottom: 16,
          }}>
            Coaching built for how you{' '}
            <em style={{ color: '#7EC8E3', fontStyle: 'italic' }}>actually live.</em>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
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
            color: '#7EC8E3', fontSize: 15, fontWeight: 600, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 100,
            border: '1px solid rgba(126,200,227,0.4)',
          }}>
            View all services & pricing
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
