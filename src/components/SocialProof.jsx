import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FEATURED_QUOTE } from '../data/testimonials'

gsap.registerPlugin(ScrollTrigger)

export default function SocialProof() {
  const bandRef = useRef(null)

  useEffect(() => {
    const el = bandRef.current
    if (!el) return
    gsap.fromTo(el,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
    )
  }, [])

  return (
    <div ref={bandRef} style={{
      background: '#0D2B3E',
      padding: '40px 32px',
      borderTop: '1px solid rgba(126,200,227,0.1)',
      borderBottom: '1px solid rgba(126,200,227,0.1)',
    }}>
      <div style={{
        maxWidth: 900, margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 16,
      }}>
        {/* Stars */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        {/* Quote */}
        <blockquote style={{
          fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.55,
          maxWidth: 760,
        }}>
          "{FEATURED_QUOTE.quote}"
        </blockquote>

        {/* Attribution */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 1, background: '#C9A84C' }} />
          <span style={{
            fontSize: 12, fontWeight: 600,
            color: '#C9A84C', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>{FEATURED_QUOTE.attribution}</span>
          <div style={{ width: 28, height: 1, background: '#C9A84C' }} />
        </div>
      </div>
    </div>
  )
}
