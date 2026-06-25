import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import BookingLink from './ui/BookingLink'
import FeaturedIn from './FeaturedIn'

export default function Hero() {
  const titleRef = useRef(null)
  const photoRef = useRef(null)
  const cardRef  = useRef(null)
  const annoRef  = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // One synchronized entrance. The title, photo, copy card, and scrapbook note
    // all begin together on the same beat and fade/rise in as a single unit,
    // instead of cascading in one-after-another. Passing the same START position
    // to each tween in the timeline is what locks them to the same start time.
    // The only offsets are tiny intra-element staggers (the two title lines, and
    // the note's text + arrow) for a touch of polish. We animate annoRef's
    // children, not the wrapper, so its rotate(-7deg) + parallax transform stay.
    const START = 0.15
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: reduce ? 0.01 : 0.9 } })

    if (titleRef.current) {
      tl.fromTo(titleRef.current.children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.07 }, START)
    }
    if (photoRef.current) {
      tl.fromTo(photoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: reduce ? 0.01 : 1.1 }, START)
    }
    if (cardRef.current) {
      tl.fromTo(cardRef.current,
        { opacity: 0 },
        { opacity: 1 }, START)
    }
    if (annoRef.current) {
      tl.fromTo(annoRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.07 }, START)
    }

    return () => tl.kill()
  }, [])

  // Layered parallax over the pinned hero: the cutout drifts up gently, and the
  // scrapbook note drifts up faster on its own plane, so the title (sticky),
  // photo, and note all move at different speeds. Skipped for reduced motion.
  useEffect(() => {
    const photo = photoRef.current
    if (!photo) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        photo.style.setProperty('--parallax', `${-Math.min(y * 0.12, 60)}px`)
        if (annoRef.current) {
          annoRef.current.style.setProperty('--anno-shift', `${-Math.min(y * 0.28, 150)}px`)
        }
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
        width="571"
        height="1504"
        decoding="async"
        fetchPriority="high"
        alt="Wendy Mader celebrating at the Ironman World Championship finish line in Kona, arms raised."
      />

      {/* Copy block — headline, action, supporting line; set straight on the navy */}
      <div ref={cardRef} className="champ-hero__card">
        <h2 className="champ-hero__headline">Personalized Coaching.<br />For Your Life.</h2>
        <BookingLink className="shine-btn cta-gold champ-hero__cta">
          Train with Wendy
        </BookingLink>
        <p className="champ-hero__sub">Get coaching by an expert in triathlon and endurance sports. With over 30+ years of experience in the field.</p>
      </div>

      {/* Scrapbook annotation — hand-drawn note + doodle arrow pointing at Wendy,
          tucked in the empty right-of-subject space, on its own parallax plane. */}
      <div ref={annoRef} className="champ-hero__anno" aria-hidden="true">
        <span className="champ-hero__anno-text">Kona<br />World Champ</span>
        <svg className="champ-hero__anno-arrow" viewBox="0 0 170 90" fill="none">
          {/* upward "smile" curve, arrowhead pointing up-left toward Wendy */}
          <path d="M156 26 C 116 80, 52 82, 16 38" stroke="currentColor" strokeWidth="5"
                strokeLinecap="round" />
          <path d="M16 38 L 23 63 M16 38 L 41 45" stroke="currentColor" strokeWidth="5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Press rotator, set into the hero's bottom-right corner */}
      <FeaturedIn />
    </section>
  )
}
