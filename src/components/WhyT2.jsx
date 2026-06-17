import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    title: 'Health comes before fitness.',
    body: 'You have to be healthy to build fitness, and fit to perform. Wendy coaches the whole athlete, from strength and mobility to nutrition and sleep, so you get faster without breaking down.',
  },
  {
    title: 'A plan that fits your week.',
    body: 'Family, work, and travel do not pause for training. Wendy builds your plan around the hours you actually have, and adjusts it whenever your schedule shifts.',
  },
  {
    title: 'Coaching, not just a program.',
    body: 'The plan is only the start. The real value is in working together every week, reviewing how each session felt, and changing course when something is not working for you.',
  },
  {
    title: 'Every workout has a reason.',
    body: 'Nothing is filler. Each session has a clear purpose, and Wendy explains the thinking behind it so you train with intention instead of guesswork.',
  },
  {
    title: 'She still races herself.',
    body: 'Wendy swims, bikes, and runs alongside the athletes she coaches. From the Kona finish line to 100-mile trail races, she prescribes training she has done herself.',
  },
  {
    title: 'Your goals lead.',
    body: 'Whether you want to finish a first 5k or qualify for Kona, Wendy builds the plan around what matters to you and what your body responds to.',
  },
]

// Editorial "reasons" rows — a short accent rule instead of a card box, so the
// differentiators read distinctly from the solid offer cards and the quotes.
function FeatureRow({ f }) {
  return (
    <div style={{ paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.16)' }}>
      <h3 style={{
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
        color: '#ffffff', lineHeight: 1.3, marginBottom: 10,
      }}>{f.title}</h3>
      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{f.body}</p>
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

    return () => anims.forEach(a => { a.scrollTrigger?.kill(); a.kill() })
  }, [])

  return (
    <section style={{ background: '#0D2B3E', padding: '110px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.16)', marginBottom: 'clamp(40px, 6vw, 72px)' }} />
        <div ref={headerRef} style={{ maxWidth: 580, margin: '0 0 56px' }}>
          <h2 style={{
            fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
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
