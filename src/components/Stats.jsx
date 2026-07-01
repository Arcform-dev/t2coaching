import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS } from '../data/siteContent'

gsap.registerPlugin(ScrollTrigger)

function StatCell({ value, suffix, label, sub, index }) {
  const numRef   = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        if (animated.current) return
        animated.current = true
        gsap.to(obj, {
          val: value, duration: 1.8, delay: index * 0.08, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
        })
      },
    })
    return () => st.kill()
  }, [value, suffix, index])

  // Barrier stat: a big number over a gold underline, with label + detail below.
  return (
    <div>
      <div ref={numRef} style={{
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        fontSize: 'clamp(2.6rem, 5vw, 4rem)',
        fontWeight: 500, color: '#ffffff', lineHeight: 1,
      }}>0{suffix}</div>
      <div style={{ height: 2, background: '#C9A84C', margin: '18px 0 16px' }} />
      <p style={{ fontSize: 15, fontWeight: 600, color: '#ffffff' }}>{label}</p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.45, marginTop: 4 }}>{sub}</p>
    </div>
  )
}

export default function Stats() {
  const gridRef = useRef(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const anim = gsap.fromTo(el.children,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
    )
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [])

  return (
    <section style={{ background: '#0D2B3E', padding: '110px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.16)', marginBottom: 'clamp(40px, 6vw, 72px)' }} />
        <div ref={gridRef} className="record-grid" style={{ display: 'grid', gap: 'clamp(36px, 5vw, 64px)' }}>
          {STATS.map((s, i) => (
            <StatCell key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
