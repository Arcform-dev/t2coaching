import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { BOOKING_URL } from '../data/siteContent'

export default function Hero() {
  const titleRef = useRef(null)
  const photoRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.15, ease: 'power3.out' })
    }
    if (photoRef.current) {
      gsap.fromTo(photoRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.3, delay: 0.3, ease: 'power2.out' })
    }
    if (introRef.current) {
      gsap.fromTo(introRef.current.children,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.6, ease: 'power3.out' })
    }
  }, [])

  return (
    <section className="champ-hero">
      {/* Big statement across the top */}
      <h1 ref={titleRef} className="champ-hero__title" aria-label="World champion-level coaching">
        <span>WORLD CHAMPION.</span>
        <span>LEVEL COACHING.</span>
      </h1>

      {/* Wendy at the Kona finish — the cut-off white sky was removed so she sits
          straight on the navy and reaches up toward the title. */}
      <img
        ref={photoRef}
        className="champ-hero__photo"
        src="/wendy-champion.png"
        alt="Wendy Mader crossing the Ironman World Championship finish line in Kona, arms raised."
      />

      {/* Short, informative intro in the open bottom-left */}
      <div ref={introRef} className="champ-hero__intro">
        <p>
          Wendy Mader won the amateur world title at Kona in 2008. Today she coaches
          triathletes of every level over Zoom and in person, with swim, bike, and run
          plans built around the hours you actually have.
        </p>
        <div className="champ-hero__actions">
          <a className="shine-btn champ-hero__cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a free call
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link to="/services" className="champ-hero__link">See coaching &amp; pricing</Link>
        </div>
      </div>
    </section>
  )
}
