import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    num: '01',
    title: 'Your trajectory is my specialty.',
    body: 'Most programs hand you a generic plan and call it personalized. Wendy analyzes where you are today — fitness history, lifestyle constraints, race goals — and builds a dynamic plan that evolves with you every single week.',
  },
  {
    num: '02',
    title: 'Real dirt & sweat, not just data.',
    body: "Wendy has trained in wind, altitude, cold, and heat. She's raced — and won — at Kona. The coaching she provides is grounded in lived experience — she knows what your body goes through because she's been there.",
  },
  {
    num: '03',
    title: 'Insider race strategy — including Kona.',
    body: "From pacing the Queen K highway to managing the energy of a local sprint — Wendy has race-specific intelligence most coaches simply don't have. Your pre-race brief will feel like a military op, not a pep talk.",
  },
  {
    num: '04',
    title: 'Built for busy people.',
    body: "Life doesn't pause for training. Wendy designs plans around your real schedule — not an idealized one. Family, work, travel. Your plan bends. Your progress doesn't have to.",
  },
  {
    num: '05',
    title: 'Every session has a purpose.',
    body: 'No junk miles. No guesswork. Every workout has a specific objective — and you\'ll know exactly why you\'re doing it. Wendy explains the science so you execute with intention, not just compliance.',
  },
  {
    num: '06',
    title: 'Health is priority #1.',
    body: 'You have to be healthy to build fitness, and fit to perform. Wendy coaches the whole athlete — strength, mobility, nutrition, sleep and injury prevention — so you improve without breaking down.',
  },
  {
    num: '07',
    title: 'The mental game, coached.',
    body: 'The hardest miles are mental. Wendy teaches the performance mindset techniques used by elite athletes — visualization, pain management, race-day focus — so the wall stays in your rearview.',
  },
  {
    num: '08',
    title: 'Built to race for decades.',
    body: 'Short-term peaks and long-term development are not the same thing. Wendy builds careers, not just seasons — with periodization designed to keep you healthy, improving, and racing for years.',
  },
]

// Editorial "reasons" row — no card box, so differentiators read as a numbered
// list, visually distinct from the solid offer cards and the testimonial quotes.
function FeatureRow({ f, index }) {
  const accent = index % 2 === 0 ? '#F5A623' : '#7EC8E3'
  return (
    <div style={{
      display: 'flex', gap: 20, alignItems: 'flex-start',
      paddingTop: 30,
      borderTop: '1px solid rgba(255,255,255,0.16)',
    }}>
      <span style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)',
        color: accent, lineHeight: 1, flexShrink: 0, minWidth: 52,
      }}>{f.num}</span>
      <div>
        <h3 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
          color: '#ffffff', lineHeight: 1.3, marginBottom: 10,
        }}>{f.title}</h3>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{f.body}</p>
      </div>
    </div>
  )
}

export default function WhyT2() {
  const headerRef = useRef(null)
  const cardsRef  = useRef([])

  useEffect(() => {
    const anims = []
    const header = headerRef.current

    if (header) {
      anims.push(gsap.fromTo(header,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', once: true } }
      ))
    }

    cardsRef.current.forEach((item, i) => {
      if (!item) return
      const fromX = i % 2 === 0 ? -40 : 40
      anims.push(gsap.fromTo(item,
        { x: fromX, y: 24, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true } }
      ))
    })

    // Clean up only this component's own animations + triggers on unmount.
    return () => anims.forEach(a => { a.scrollTrigger?.kill(); a.kill() })
  }, [])

  return (
    <section style={{ background: 'transparent', padding: '80px 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ height: 1, width: 40, background: '#7EC8E3' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#F5A623', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Why T2</span>
            <div style={{ height: 1, width: 40, background: '#7EC8E3' }} />
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: '#ffffff', lineHeight: 1.2, marginBottom: 10,
          }}>
            What makes Wendy different.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
            Not every coach has stood on the Kona finish line.
          </p>
        </div>

        <div className="why-grid" style={{ display: 'grid', gap: '32px 56px' }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} ref={el => cardsRef.current[i] = el}>
              <FeatureRow f={f} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
