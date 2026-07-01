import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Transparent press logos (SVG-wrapped PNG). One shows at a time in the slot;
// a brightness(0) invert(1) filter renders each solid white over the navy.
const LOGOS = [
  { src: '/logo-wsj-trim.svg', alt: 'The Wall Street Journal' },
  { src: '/logo-trainingpeaks-trim.svg', alt: 'TrainingPeaks' },
  { src: '/logo-ironman-certified-coach-trim.svg', alt: 'Ironman Certified Coach' },
  { src: '/logo-endurance-hour-trim.svg', alt: 'Endurance Hour' },
]

export default function FeaturedIn() {
  const slotRef = useRef(null)

  // Minimal "Featured in" rotator (Core Atelier's hero corner): each logo holds
  // ~2s, then rises up and out of frame as the next rises in from below. The
  // outgoing logo travels a full slot-height and fully fades before the next
  // settles, so the two never sit side by side. No sideways motion.
  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return
    const slides = Array.from(slot.querySelectorAll('.featured-logo'))
    if (!slides.length) return

    gsap.set(slides, { opacity: 0, yPercent: 120 })
    gsap.set(slides[0], { opacity: 1, yPercent: 0 })

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (slides.length < 2 || reduce) return

    let i = 0
    const id = setInterval(() => {
      const cur = slides[i]
      i = (i + 1) % slides.length
      const next = slides[i]
      // Current accelerates up and clears out completely...
      gsap.to(cur, { opacity: 0, yPercent: -140, duration: 0.5, ease: 'power2.in' })
      // ...then the next rises in from below once the old one is on its way out.
      gsap.fromTo(next,
        { opacity: 0, yPercent: 120 },
        { opacity: 1, yPercent: 0, duration: 0.6, ease: 'power3.out', delay: 0.32 })
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-featured">
      <span className="hero-featured__label">Featured in</span>
      <div ref={slotRef} className="featured-slot" aria-label="Featured in the Wall Street Journal, TrainingPeaks, Ironman, and Endurance Hour">
        {LOGOS.map(({ src, alt }) => (
          <img key={src} className="featured-logo" src={src} alt={alt} />
        ))}
      </div>
    </div>
  )
}
