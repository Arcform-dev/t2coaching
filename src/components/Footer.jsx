import { Link } from 'react-router-dom'
import { CONTACT, SOCIALS, BOOKING_URL } from '../data/siteContent'

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
]

const SOCIAL_ICONS = {
  Instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  Facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  YouTube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
}

export default function Footer() {
  return (
    <footer style={{ background: '#0D2B3E', padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        <div className="footer-grid" style={{
          display: 'grid', gap: 40,
          paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand + contact */}
          <div style={{ maxWidth: 340 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 18 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: '#1A6B8A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>T2</span>
              </div>
              <span style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#ffffff' }}>T2 Coaching</span>
            </Link>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 18 }}>
              Personalized swim, run & triathlon coaching from a Kona Ironman World Champion, built around your life.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href={`mailto:${CONTACT.email}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', textDecoration: 'none' }}>{CONTACT.email}</a>
              <a href={CONTACT.phoneHref} style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', textDecoration: 'none' }}>{CONTACT.phone}</a>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{CONTACT.location}</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: '#F5A623', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Explore</h4>
            <nav style={{ display: 'grid', gap: 12 }}>
              {NAV_LINKS.map(l => (
                <Link key={l.label} to={l.to} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: '#F5A623', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Connect</h4>
            <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                  width: 40, height: 40, borderRadius: 0,
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.62)',
                }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={SOCIAL_ICONS[s.label]} />
                  </svg>
                </a>
              ))}
            </div>
            <a
              className="shine-btn"
              href={BOOKING_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#C9A84C', color: '#fff', fontSize: 14, fontWeight: 600,
                padding: '12px 24px', borderRadius: 0, textDecoration: 'none',
              }}
            >Book a Free Call</a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="footer-row" style={{
          display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 28,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.27)' }}>
            © {new Date().getFullYear()} t2coaching, LLC. All rights reserved.
          </p>
          <a href="https://t2coaching.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.27)', textDecoration: 'none' }}>t2coaching.com</a>
        </div>
      </div>
    </footer>
  )
}
