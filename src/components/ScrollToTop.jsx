import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Resets scroll to top on route change and refreshes ScrollTrigger so the
// race-course background and per-page reveals recalculate for the new page.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Jump instantly. The page sets `scroll-behavior: smooth` globally (nice for
    // in-page anchor clicks), but on a route change that turns this reset into an
    // animated scroll that gets interrupted when the new page's DOM swaps in —
    // leaving the viewport stuck at the old Y. `behavior: 'instant'` overrides the
    // CSS so navigation always snaps to the top.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Let the new page mount, then recompute scroll-driven animations.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
