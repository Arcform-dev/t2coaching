import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { BOOKING_URL } from '../data/siteContent'

const NAVY = '#0D2B3E'
const BLUE = '#1A6B8A'
const SKY = '#7EC8E3'
const GOLD = '#C9A84C'

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
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  // Interior pages have no full-bleed hero behind the nav, so use the solid
  // treatment by default there. On home, stay transparent until scrolled.
  const solid = scrolled || !isHome

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.2 }
    )
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkColor = solid ? 'rgba(13,43,62,0.68)' : 'rgba(255,255,255,0.85)'
  const activeColor = solid ? NAVY : '#ffffff'

  return (
    <nav
      ref={ref}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        background: solid ? 'rgba(255, 255, 255, 0.97)' : 'transparent',
        backdropFilter: solid ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(20px)' : 'none',
        boxShadow: solid ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 72,
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
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 20, lineHeight: 1,
              color: solid ? NAVY : '#ffffff',
              transition: 'color 0.35s ease',
            }}>T2 Coaching</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 26 }}>
            {LINKS.map(({ label, to }) => (
              <NavLink key={label} to={to} style={({ isActive }) => ({
                position: 'relative',
                fontSize: 14, fontWeight: isActive ? 600 : 500, letterSpacing: '0.025em',
                color: isActive ? activeColor : linkColor,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                paddingBottom: 2,
                borderBottom: isActive ? `2px solid ${SKY}` : '2px solid transparent',
              })}>{label}</NavLink>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                whiteSpace: 'nowrap',
                background: GOLD, color: '#fff',
                fontSize: 14, fontWeight: 700,
                padding: '10px 22px', borderRadius: 100,
                textDecoration: 'none', letterSpacing: '0.01em',
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
                background: solid ? NAVY : '#fff',
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
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: open ? '1px solid rgba(0,0,0,0.07)' : 'none',
      }}>
        <div style={{ padding: '16px 32px 28px' }}>
          {LINKS.map(({ label, to }) => (
            <NavLink key={label} to={to} onClick={() => setOpen(false)} style={({ isActive }) => ({
              display: 'block', padding: '13px 0',
              fontSize: 15, fontWeight: isActive ? 600 : 500,
              color: isActive ? BLUE : NAVY,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            })}>{label}</NavLink>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 16,
              background: GOLD, color: '#fff',
              fontSize: 14, fontWeight: 700,
              padding: '14px 0',
              borderRadius: 100, textDecoration: 'none',
            }}
          >Book a Free Call</a>
        </div>
      </div>
    </nav>
  )
}
