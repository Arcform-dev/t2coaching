import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import { BOOKING_URL } from '../data/siteContent'

const BLUE = '#1A6B8A'
const GOLD = '#C9A84C'

const LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  // Solid (white, blurred) on every page — the homepage hero now has a light
  // left panel, so a transparent nav would render the logo invisible.
  const solid = true

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const linkColor = 'rgba(13,43,62,0.74)'
  const activeColor = '#0D2B3E'

  return (
    <nav
      ref={ref}
      style={{
        position: 'fixed',
        top: 16, left: 16, right: 16,
        margin: '0 auto',
        maxWidth: 1280,
        zIndex: 9999,
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(13,43,62,0.08)',
        boxShadow: '0 16px 44px rgba(13,43,62,0.16)',
      }}
    >
      <div style={{ padding: '0 26px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 64,
        }}>
          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: BLUE,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '0.04em' }}>T2</span>
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 24, lineHeight: 1, fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#0D2B3E',
              transition: 'color 0.35s ease',
            }}>T2 Coaching</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 34 }}>
            {LINKS.map(({ label, to }) => (
              <NavLink key={label} to={to} style={({ isActive }) => ({
                position: 'relative',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                textTransform: 'uppercase',
                fontSize: 17, fontWeight: 600, letterSpacing: '0.14em',
                color: isActive ? activeColor : linkColor,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                paddingBottom: 3,
                borderBottom: isActive ? `1px solid ${GOLD}` : '1px solid transparent',
              })}>{label}</NavLink>
            ))}
            <a
              className="shine-btn"
              href={BOOKING_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                whiteSpace: 'nowrap',
                background: '#0D2B3E', color: '#F5F1E9',
                fontSize: 14, fontWeight: 600,
                padding: '11px 24px', borderRadius: 100,
                textDecoration: 'none', letterSpacing: '0.04em',
              }}
            >Book a Free Call</a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="flex md:hidden"
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, flexDirection: 'column', gap: 5, alignItems: 'center',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2, borderRadius: 2,
                background: '#0D2B3E',
                transition: 'all 0.25s ease',
                transform: open && i === 0 ? 'rotate(45deg) translateY(7px)' :
                           open && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 460 : 0,
        transition: 'max-height 0.3s ease',
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: open ? '1px solid rgba(13,43,62,0.08)' : 'none',
      }}>
        <div style={{ padding: '12px 26px 24px' }}>
          {LINKS.map(({ label, to }) => (
            <NavLink key={label} to={to} onClick={() => setOpen(false)} style={({ isActive }) => ({
              display: 'block', padding: '14px 0',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textTransform: 'uppercase', letterSpacing: '0.12em',
              fontSize: 18, fontWeight: 600,
              color: isActive ? '#0D2B3E' : 'rgba(13,43,62,0.72)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(13,43,62,0.08)',
            })}>{label}</NavLink>
          ))}
          <a
            className="shine-btn"
            href={BOOKING_URL}
            target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 16,
              background: '#0D2B3E', color: '#F5F1E9',
              fontSize: 14, fontWeight: 600,
              padding: '15px 0',
              borderRadius: 100, textDecoration: 'none',
            }}
          >Book a Free Call</a>
        </div>
      </div>
    </nav>
  )
}
