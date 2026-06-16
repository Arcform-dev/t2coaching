import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { BOOKING_URL } from '../data/siteContent'

export default function Hero() {
  const titleRef = useRef(null)
  const photoRef = useRef(null)
  const cardRef  = useRef(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.15, ease: 'power3.out' })
    }
    if (photoRef.current) {
      gsap.fromTo(photoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.4, ease: 'power2.out' })
    }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.85, ease: 'power2.out' })
    }
  }, [])

  // Gentle parallax: the cutout drifts up slightly as the page scrolls over the
  // pinned hero, adding depth without distracting motion. Skipped if the user
  // prefers reduced motion.
  useEffect(() => {
    const photo = photoRef.current
    if (!photo) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const shift = Math.min(window.scrollY * 0.12, 60)
        photo.style.setProperty('--parallax', `${-shift}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="champ-hero">
      {/* Gold serif statement filling the field, behind the athlete */}
      <h1 ref={titleRef} className="champ-hero__title">
        <span className="l1">WORLD CHAMPION</span>
        <span className="l2">LEVEL COACHING</span>
      </h1>

      {/* Wendy, cut out and layered over the letters */}
      <img
        ref={photoRef}
        className="champ-hero__photo"
        src="/wendy-cutout.png"
        alt="Wendy Mader celebrating at the Ironman World Championship finish line in Kona, arms raised."
      />

      {/* Glass card — credibility hook + short intro + contact button */}
      <div ref={cardRef} className="champ-hero__card">
        <p className="champ-hero__eyebrow">
          Coached personally by <strong>Wendy Mader</strong>
          <span className="champ-hero__cred">2008 Kona Ironman World Champion</span>
        </p>
        <p className="champ-hero__lede">Personalized coaching built around your real life and the hours you actually train.</p>
        <a className="shine-btn cta-gold champ-hero__cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Book a free call
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
