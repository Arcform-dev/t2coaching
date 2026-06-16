import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Trimmed (white padding removed) versions of the press logos. They keep their
// white background, which the .featured-logo mix-blend-mode hides on the band.
const LOGOS = [
  { src: '/logo-wsj-trim.png', alt: 'The Wall Street Journal' },
  { src: '/logo-trainingpeaks-trim.png', alt: 'TrainingPeaks' },
  { src: '/logo-ironman-certified-coach-trim.png', alt: 'Ironman Certified Coach' },
  { src: '/logo-endurance-hour-trim.png', alt: 'Endurance Hour' },
]

export default function FeaturedIn() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el.querySelectorAll('.featured-reveal'),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
  }, [])

  return (
    <section ref={ref} style={{ background: '#ffffff', padding: 'clamp(38px, 6vw, 64px) 24px' }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(22px, 3vw, 34px)',
      }}>
        <p className="featured-reveal" style={{
          margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: '0.24em',
          textTransform: 'uppercase', color: 'rgba(13,43,62,0.5)',
        }}>As Featured In</p>

        <div className="featured-reveal" style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(30px, 6vw, 68px)',
        }}>
          {LOGOS.map(({ src, alt }) => (
            <img key={src} className="featured-logo" src={src} alt={alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}
