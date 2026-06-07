import { Outlet, useLocation } from 'react-router-dom'
import RaceCourse from './RaceCourse'
import Nav from './Nav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)'/%3E%3C/svg%3E\")"

// Calm, static backdrop for interior pages — deliberately different from the
// home page's animated race-course so visitors know they've navigated away.
function InteriorBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: 'linear-gradient(180deg, #081521 0%, #0c2536 42%, #0a2030 100%)',
    }}>
      {/* Soft accent glows */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(26,107,138,0.40), transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 85% 105%, rgba(126,200,227,0.10), transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 10% 80%, rgba(201,168,76,0.06), transparent 70%)' }} />
      {/* Subtle grain */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: NOISE, backgroundSize: '320px 320px', backgroundRepeat: 'repeat' }} />
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
