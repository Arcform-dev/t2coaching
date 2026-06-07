import { Outlet, useLocation } from 'react-router-dom'
import RaceCourse from './RaceCourse'
import Nav from './Nav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)'/%3E%3C/svg%3E\")"

// Calm, static backdrop for interior pages — a lighter cool-blue (vs the home
// page's animated race-course) so visitors know they've navigated away, while
// keeping Wendy's blue + gold palette.
function InteriorBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: 'linear-gradient(168deg, #1d6285 0%, #1A6B8A 42%, #2b85a6 78%, #3f9bbb 100%)',
    }}>
      {/* Warm gold glow (top-right) for that yellow accent */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 45% at 82% 4%, rgba(245,166,35,0.16), transparent 70%)' }} />
      {/* Sky highlight (bottom) */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 55% at 50% 105%, rgba(180,225,240,0.28), transparent 70%)' }} />
      {/* Deeper cool pocket (top-left) for depth */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 8% -5%, rgba(13,43,62,0.35), transparent 70%)' }} />
      {/* Subtle grain */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: NOISE, backgroundSize: '320px 320px', backgroundRepeat: 'repeat' }} />
    </div>
  )
}

// Persistent chrome shared by every route: a route-specific backdrop, fixed
// nav, page content (Outlet), and footer.
export default function Layout() {
  const isHome = useLocation().pathname === '/'

  return (
    <>
      {isHome ? <RaceCourse /> : <InteriorBackground />}
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
