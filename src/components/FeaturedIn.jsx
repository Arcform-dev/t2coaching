import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Trimmed (white padding removed) press logos. One shows at a time in the slot.
const LOGOS = [
  { src: '/logo-wsj-trim.png', alt: 'The Wall Street Journal' },
  { src: '/logo-trainingpeaks-trim.png', alt: 'TrainingPeaks' },
  { src: '/logo-ironman-certified-coach-trim.png', alt: 'Ironman Certified Coach' },
  { src: '/logo-endurance-hour-trim.png', alt: 'Endurance Hour' },
]

export default function FeaturedIn() {
  const slotRef = useRef(null)

  // Minimal "Featured in" rotator: each logo holds ~2s, then swipes left as the
  // next swipes in from the right (Core Atelier's autoplay carousel, in GSAP).
  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return
    const slides = Array.from(slot.querySelectorAll('.featured-logo'))
    if (!slides.length) return

    gsap.set(slides, { opacity: 0, xPercent: 26 })
    gsap.set(slides[0], { opacity: 1, xPercent: 0 })

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (slides.length < 2 || reduce) return

    let i = 0
    const id = setInterval(() => {
      const cur = slides[i]
      i = (i + 1) % slides.length
      const next = slides[i]
      gsap.to(cur, { opacity: 0, xPercent: -26, duration: 0.6, ease: 'power2.inOut' })
      gsap.fromTo(next,
        { opacity: 0, xPercent: 26 },
        { opacity: 1, xPercent: 0, duration: 0.6, ease: 'power2.out', delay: 0.12 })
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(30px, 4.5vw, 48px) 24px' }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(16px, 2.4vw, 26px)',
      }}>
        <span style={{
          flexShrink: 0,
          fontSize: 'clamp(13px, 1.5vw, 15px)', fontWeight: 500,
          letterSpacing: '0.03em', color: 'rgba(13,43,62,0.55)',
        }}>Featured in</span>

        <div ref={slotRef} className="featured-slot" aria-label="Featured in the Wall Street Journal, TrainingPeaks, Ironman, and Endurance Hour">
          {LOGOS.map(({ src, alt }) => (
            <img key={src} className="featured-logo" src={src} alt={alt} />
          ))}
        </div>
      </div>
    </section>
  )
}
