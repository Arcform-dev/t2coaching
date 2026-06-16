import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Top band for interior pages. Includes top padding to clear the fixed nav,
// and a gentle GSAP entrance. Optional decorative background photo.
export default function PageHeader({ eyebrow, title, titleAccent, subtitle, photo }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll('[data-ph]')
    gsap.fromTo(items,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    )
  }, [])

  return (
    <header ref={ref} style={{
      position: 'relative',
      padding: '150px 0 56px',
      overflow: 'hidden',
    }}>
      {photo && (
        <>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center 30%',
            opacity: 0.18,
          }} />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(180deg, rgba(8,18,32,0.6) 0%, rgba(8,18,32,0.85) 100%)',
          }} />
        </>
      )}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <h1 data-ph style={{
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
          fontSize: 'clamp(2.6rem, 6vw, 5rem)',
          color: '#ffffff', lineHeight: 1.05, fontWeight: 600,
          maxWidth: 900,
        }}>
          {title}{' '}
          {titleAccent && <span style={{ color: '#7EC8E3' }}>{titleAccent}</span>}
        </h1>
        {subtitle && (
          <p data-ph style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: 'rgba(255,255,255,0.72)', fontWeight: 300, lineHeight: 1.6,
            maxWidth: 620, marginTop: 24,
          }}>{subtitle}</p>
        )}
      </div>
    </header>
  )
}
