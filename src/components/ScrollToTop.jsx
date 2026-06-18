import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Snaps the viewport to the top on every route change, then refreshes
// ScrollTrigger so the per-page reveal animations recalculate for the new page.
//
// useLayoutEffect (not useEffect) runs before the browser paints, so the new
// page is never shown at the old scroll position for even a single frame.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Don't let the browser restore the previous page's scroll on navigation.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Force an INSTANT jump to the top. The site sets `scroll-behavior: smooth`
    // globally (nice for in-page anchor clicks), but on a route change that turns
    // this reset into an animated scroll the browser cancels the moment the new
    // page changes the document height — stranding you partway down. Overriding
    // to `auto` for just this call guarantees a hard snap.
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.scrollTop = 0
    if (document.body) document.body.scrollTop = 0
    html.style.scrollBehavior = prevBehavior

    // After the new page paints, recompute scroll-driven animations.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
