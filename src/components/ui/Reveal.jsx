import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lightweight scroll-reveal wrapper so interior pages get consistent entrance
// animations without repeating the same useEffect everywhere.
export default function Reveal({ children, y = 36, x = 0, delay = 0, duration = 0.75, start = 'top 85%', style, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { y: 0, x: 0, opacity: 1 })
      return
    }
    const anim = gsap.fromTo(el,
      { y, x, opacity: 0 },
      {
        y: 0, x: 0, opacity: 1, duration, delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once: true },
      }
    )
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [y, x, delay, duration, start])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
