import { useState, useEffect, useCallback, useRef } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { useGallery } from '../lib/content'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

export default function Gallery() {
  useDocumentMeta('Race & Coaching Photo Gallery', 'Photos from three decades of racing and coaching with Wendy Mader. Kona, Ironman Boulder, open water, trail, and more.')
  const photos = useGallery() || []
  const [active, setActive] = useState(null)
  const overlayRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const modalOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const move = useCallback((dir) => {
    setActive((a) => (a === null ? a : (a + dir + photos.length) % photos.length))
  }, [photos.length])

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
      if (e.key === 'Tab') {
        const focusable = overlayRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, move])

  useEffect(() => {
    if (!modalOpen) return
    lastFocusedRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const id = requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      cancelAnimationFrame(id)
      document.body.style.overflow = previousOverflow
      lastFocusedRef.current?.focus?.()
    }
  }, [modalOpen])

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Thirty years of"
        titleAccent="dirt, sweat & finish lines."
        subtitle="A look at the racing and coaching behind T2, from the Kona finish line to guiding athletes at every level."
      />

      <section style={{ padding: '50px 0 90px' }}>
        <div style={WRAP}>
          <div className="gallery-grid" style={{ display: 'grid', gap: 16 }}>
            {photos.map((p, i) => (
              <Reveal key={p.src} delay={(i % 4) * 0.06} style={p.span ? { gridColumn: 'span 2' } : undefined}>
                <button
                  onClick={() => setActive(i)}
                  style={{
                    display: 'block', width: '100%', padding: 0, border: 'none', cursor: 'pointer',
                    position: 'relative', borderRadius: 0, overflow: 'hidden',
                    aspectRatio: p.span ? '16/9' : '4/5', background: '#0D2B3E',
                  }}
                  className="gallery-item"
                >
                  <img src={p.src} alt={p.caption} loading="lazy" style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(8,18,32,0.85), transparent)', pointerEvents: 'none' }} />
                  <span style={{ position: 'absolute', bottom: 14, left: 16, right: 16, textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>{p.caption}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active !== null && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-caption"
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(4,10,18,0.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}
        >
          <button type="button" ref={closeButtonRef} onClick={close} aria-label="Close gallery" style={{ ...LB_BTN, position: 'absolute', top: 20, right: 20 }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); move(-1) }} aria-label="Previous photo" style={{ ...LB_BTN, position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); move(1) }} aria-label="Next photo" style={{ ...LB_BTN, position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <figure onClick={(e) => e.stopPropagation()} style={{ maxWidth: 'min(900px, 92vw)', maxHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={photos[active].src} alt={photos[active].caption} style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 0, boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} />
            <figcaption id="gallery-lightbox-caption" style={{ color: 'rgba(255,255,255,0.88)', fontSize: 14, marginTop: 16, textAlign: 'center' }}>{photos[active].caption}</figcaption>
          </figure>
        </div>
      )}

      <CTABanner />
    </>
  )
}

const LB_BTN = {
  width: 46, height: 46, borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(8,18,32,0.6)', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2,
}
