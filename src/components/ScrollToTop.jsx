import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Resets scroll to the top on every route change, then refreshes ScrollTrigger
// so the new page's reveals recalculate.
//
// The jump is forced to `behavior: 'instant'` on purpose: the site sets a global
// `html { scroll-behavior: smooth }`, which turns a plain scrollTo(0,0) into a
// slow animation. When you navigate from the bottom of a long page, the browser
// first clamps the old scroll offset to the new (often shorter) page — landing
// you at its bottom — and the smooth animation gets cut off by the route swap, so
// you never reach the top. An instant jump in useLayoutEffect (before paint),
// with browser scroll restoration disabled, makes every page open at the top.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    // Force an instant jump regardless of browser: momentarily override the
    // global `scroll-behavior: smooth` to `auto` (inline style wins over the
    // stylesheet), scroll, then restore. `behavior: 'instant'` alone isn't
    // honored in every browser, which is why a plain reset could still animate.
    const jumpToTop = () => {
      const prev = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
      html.style.scrollBehavior = prev
    }

    jumpToTop()
    // Refreshing ScrollTrigger after the new page mounts can nudge the scroll a
    // few px on GSAP-driven pages, so jump again right after it.
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      jumpToTop()
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
