import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Resets scroll to top on route change and refreshes ScrollTrigger so the
// race-course background and per-page reveals recalculate for the new page.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Jump to the top instantly. We override the global `scroll-behavior: smooth`
    // for just this call — otherwise navigating from deep in a long page kicks off
    // a slow smooth scroll that the browser cancels once the new (often shorter)
    // page changes the document height, leaving you stranded mid-page.
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = prevBehavior
    // Let the new page mount, then recompute scroll-driven animations.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
