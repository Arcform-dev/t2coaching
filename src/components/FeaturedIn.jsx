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

  // Minimal "Featured in" rotator (Core Atelier's hero corner): each logo holds
  // ~2s, then swipes left as the next swipes in from the right.
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
    <div className="hero-featured">
      <span className="hero-featured__label">Featured in</span>
      <div className="featured-chip">
        <div ref={slotRef} className="featured-slot" aria-label="Featured in the Wall Street Journal, TrainingPeaks, Ironman, and Endurance Hour">
          {LOGOS.map(({ src, alt }) => (
            <img key={src} className="featured-logo" src={src} alt={alt} />
          ))}
        </div>
      </div>
    </div>
  )
}
