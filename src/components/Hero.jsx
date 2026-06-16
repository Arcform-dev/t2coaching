import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { BOOKING_URL } from '../data/siteContent'

export default function Hero() {
  const copyRef  = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    if (copyRef.current) {
      gsap.fromTo(copyRef.current.children,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.2, ease: 'power3.out' })
    }
    if (photoRef.current) {
      gsap.fromTo(photoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.3, delay: 0.15, ease: 'power2.out' })
    }
  }, [])

  // Gentle parallax: the cutout drifts up slightly as the page scrolls over the
  // pinned hero, adding depth without distracting motion. Skipped if the user
  // prefers reduced motion. (Only opacity is animated by GSAP, so the CSS
  // transform that reads --parallax stays intact.)
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
      {/* Subject anchored to the right of the composition */}
      <img
        ref={photoRef}
        className="champ-hero__photo"
        src="/wendy-cutout.png"
        alt="Wendy Mader celebrating at the Ironman World Championship finish line in Kona, arms raised."
      />

      {/* Navy scrim — solid behind the copy, fading to clear over the photo */}
      <div className="champ-hero__scrim" aria-hidden="true" />

      {/* Left copy column, aligned to the site grid. No card — text set directly
          into the image with the scrim doing the legibility work. */}
      <div className="champ-hero__inner">
        <div ref={copyRef} className="champ-hero__copy">
          <p className="champ-hero__eyebrow">Wendy Mader — 2008 Kona Ironman World Champion</p>
          <h1 className="champ-hero__title">World-Champion Level Coaching</h1>
          <p className="champ-hero__lede">Personalized coaching built around your real life and the hours you actually train.</p>
          <a className="shine-btn cta-gold champ-hero__cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a free call
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
