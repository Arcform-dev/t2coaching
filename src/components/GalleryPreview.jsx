import { Link } from 'react-router-dom'
import Reveal from './ui/Reveal'
import { GALLERY_PHOTOS } from '../data/gallery'

// Homepage snippet of the /gallery page — a four-photo strip drawn from the
// shared GALLERY_PHOTOS. Tiles link straight into the full gallery.

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }
const AMBER = '#F5A623'

const Arrow = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export default function GalleryPreview() {
  const photos = GALLERY_PHOTOS.slice(0, 4)
  return (
    <section style={{ background: 'transparent', padding: '80px 0 100px' }}>
      <div style={WRAP}>
        <Reveal>
          <div style={{ maxWidth: 600, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 1, background: AMBER }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: AMBER, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Gallery</span>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              Thirty years of dirt, sweat &amp; finish lines.
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
              From the Kona finish line to guiding athletes at every level — a glimpse of the racing and coaching behind T2.
            </p>
          </div>
        </Reveal>

        <div className="gallery-grid" style={{ display: 'grid', gap: 16 }}>
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={(i % 4) * 0.06}>
              <Link
                to="/gallery"
                className="gallery-item"
                style={{ display: 'block', position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5', background: '#0D2B3E' }}
              >
                <img src={p.src} alt={p.caption} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(8,18,32,0.85), transparent)', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', bottom: 14, left: 16, right: 16, fontSize: 13, fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>{p.caption}</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link to="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7EC8E3', fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '12px 28px', borderRadius: 100, border: '1px solid rgba(126,200,227,0.4)' }}>
            See the full gallery
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
