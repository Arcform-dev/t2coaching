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
      trigger: el, start: 'top 88%', once: true,
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

  return (
    <div style={{ background: '#0D2B3E', padding: '34px 28px' }}>
      {/* Gold tick — a race-clock marker */}
      <div style={{ width: 18, height: 3, background: '#F5A623', borderRadius: 2, marginBottom: 16 }} />
      <div ref={numRef} style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
        color: '#ffffff', lineHeight: 1,
      }}>0{suffix}</div>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginTop: 14, marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.45 }}>{sub}</p>
    </div>
  )
}

export default function Stats() {
  const panelRef = useRef(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const anim = gsap.fromTo(el,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
    )
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [])

  return (
    <section style={{ padding: '80px 0 90px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        {/* Framed record board — reads like a race-results panel, not a SaaS stat grid */}
        <div ref={panelRef} style={{
          background: '#0D2B3E',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, overflow: 'hidden',
        }}>
          {/* Board header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '20px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5A623', flexShrink: 0 }} />
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.09)' }} />
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>
              Coach Wendy Mader
            </span>
          </div>

          {/* Stat cells — 1px gaps over a light backing reveal hairline dividers at any column count */}
          <div className="record-grid" style={{ display: 'grid', gap: 1, background: 'rgba(255,255,255,0.09)' }}>
            {STATS.map((s, i) => (
              <StatCell key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
