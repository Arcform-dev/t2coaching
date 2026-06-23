import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import BookingLink from './ui/BookingLink'

const LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/process' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Full-width bar: transparent over the hero on the home page, solid once
  // scrolled. Interior pages have no hero behind it, so it's solid throughout.
  const isHome = pathname === '/'
  const solid = scrolled || !isHome

  useEffect(() => {
    const el = ref.current
    if (el) {
      gsap.fromTo(el,
        { y: -70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.15 })
    }
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={ref}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        background: solid ? 'rgba(8, 24, 35, 0.95)' : 'transparent',
        backdropFilter: solid ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',
        boxShadow: solid ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 72,
        }}>
          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="/photos/logo.png" alt="t2coaching" style={{ height: 42, width: 'auto', flexShrink: 0, display: 'block' }} />
            <span style={{
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
              fontSize: 22, lineHeight: 1, fontWeight: 600,
              letterSpacing: '0.04em',
              color: '#F5F1E9',
            }}>t2coaching</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 26 }}>
            {LINKS.map(({ label, to }) => (
              <NavLink key={label} to={to} style={({ isActive }) => ({
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
                textTransform: 'uppercase',
                fontSize: 14, fontWeight: 600, letterSpacing: '0.1em',
                color: isActive ? '#ffffff' : 'rgba(245,241,233,0.82)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              })}>{label}</NavLink>
            ))}
            <BookingLink
              className="cta-gold"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                whiteSpace: 'nowrap',
                color: '#0D2B3E',
                fontSize: 14, fontWeight: 700,
                padding: '11px 24px', borderRadius: 0,
                textDecoration: 'none', letterSpacing: '0.02em',
              }}
            >Book a Free Call</BookingLink>
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
                background: '#F5F1E9',
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
        background: 'rgba(8,24,35,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        <div style={{ padding: '12px 32px 24px' }}>
          {LINKS.map(({ label, to }) => (
            <NavLink key={label} to={to} onClick={() => setOpen(false)} style={({ isActive }) => ({
              display: 'block', padding: '14px 0',
              fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
              textTransform: 'uppercase', letterSpacing: '0.1em',
              fontSize: 16, fontWeight: 600,
              color: isActive ? '#ffffff' : 'rgba(245,241,233,0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            })}>{label}</NavLink>
          ))}
          <BookingLink
            className="cta-gold"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 16,
              color: '#0D2B3E',
              fontSize: 14, fontWeight: 700,
              padding: '15px 0',
              borderRadius: 0, textDecoration: 'none',
            }}
          >Book a Free Call</BookingLink>
        </div>
      </div>
    </nav>
  )
}
