import { useEffect, useRef } from 'react'

const uri = svg => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

// ── Winding course path (viewBox 0 0 100 100, preserveAspectRatio="none") ──────
const COURSE_D = [
  'M 50 0',
  'C 76 8,  87 20, 70 31',
  'C 53 42, 13 47, 17 57',
  'C 21 67, 84 76, 74 86',
  'C 64 95, 51 98, 50 100',
].join(' ')

// ── Swim: CSS-tiled wave shapes ───────────────────────────────────────────────
// Each SVG is a half-period sine wave that tiles seamlessly via background-repeat-x
const WAVE_1 = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 60"><path d="M0 30 C90 0,270 60,360 30 L360 60 L0 60 Z" fill="rgba(0,100,180,0.28)"/></svg>`)
const WAVE_2 = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 50"><path d="M0 25 C70 5,210 45,280 25 L280 50 L0 50 Z" fill="rgba(0,160,210,0.22)"/></svg>`)
const WAVE_3 = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><path d="M0 20 C50 5,150 35,200 20 L200 40 L0 40 Z" fill="rgba(0,210,240,0.20)"/></svg>`)

// ── Bike: asphalt noise grain ──────────────────────────────────────────────────
const ASPHALT = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="400" height="400" filter="url(#n)" opacity="0.14"/></svg>`)

// ── Bike: pre-dawn star field ──────────────────────────────────────────────────
const STARS = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200"><circle cx="50" cy="30" r="1" fill="white" opacity="0.65"/><circle cx="148" cy="78" r="0.8" fill="white" opacity="0.5"/><circle cx="252" cy="18" r="1.1" fill="white" opacity="0.75"/><circle cx="378" cy="58" r="0.9" fill="white" opacity="0.45"/><circle cx="482" cy="12" r="1" fill="white" opacity="0.65"/><circle cx="558" cy="88" r="0.7" fill="white" opacity="0.4"/><circle cx="92" cy="118" r="0.8" fill="white" opacity="0.35"/><circle cx="318" cy="138" r="1.1" fill="white" opacity="0.5"/><circle cx="448" cy="108" r="0.9" fill="white" opacity="0.55"/><circle cx="198" cy="168" r="0.7" fill="white" opacity="0.3"/><circle cx="528" cy="152" r="1" fill="white" opacity="0.45"/><circle cx="24" cy="162" r="0.6" fill="white" opacity="0.3"/><circle cx="300" cy="50" r="0.7" fill="white" opacity="0.4"/></svg>`)

export default function RaceCourse() {
  const swimBgRef  = useRef(null)
  const bikeBgRef  = useRef(null)
  const runBgRef   = useRef(null)
  const svgRef     = useRef(null)
  // Per-discipline glow + crisp path pairs
  const swimGRef   = useRef(null)
  const swimLRef   = useRef(null)
  const bikeGRef   = useRef(null)
  const bikeLRef   = useRef(null)
  const runGRef    = useRef(null)
  const runLRef    = useRef(null)
  const dotRef     = useRef(null)

  useEffect(() => {
    const swimBg = swimBgRef.current
    const bikeBg = bikeBgRef.current
    const runBg  = runBgRef.current
    const svg    = svgRef.current
    const swimG  = swimGRef.current
    const swimL  = swimLRef.current
    const bikeG  = bikeGRef.current
    const bikeL  = bikeLRef.current
    const runG   = runGRef.current
    const runL   = runLRef.current
    const dot    = dotRef.current
    if (!swimL || !svg) return

    // All six paths share the same d, so getTotalLength is identical
    const L   = swimL.getTotalLength()
    const L3  = L / 3
    const L23 = (2 * L) / 3

    // Fix each segment's dashoffset so it only renders its own third.
    // stroke-dashoffset=-X means the dash pattern starts X units into the path.
    // With dasharray="len (L+1)", a single dash of `len` starts at the offset.
    const init = (el, off) => {
      if (!el) return
      el.setAttribute('stroke-dasharray',  `0 ${L + 1}`)
      el.setAttribute('stroke-dashoffset', off)
    }
    init(swimG, 0);    init(swimL, 0)
    init(bikeG, -L3);  init(bikeL, -L3)
    init(runG,  -L23); init(runL,  -L23)

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
    const fade  = (p, lo, hi) => clamp((p - lo) / (hi - lo), 0, 1)

    let raf = null

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p   = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0
      const drawn = L * p

      // Each segment's drawn length, clamped to its own L/3 budget
      const sD = Math.min(drawn, L3)
      const bD = Math.max(0, Math.min(drawn, L23) - L3)
      const rD = Math.max(0, drawn - L23)

      const setDA = (el, len) => el && el.setAttribute('stroke-dasharray', `${len} ${L + 1}`)
      setDA(swimG, sD); setDA(swimL, sD)
      setDA(bikeG, bD); setDA(bikeL, bD)
      setDA(runG,  rD); setDA(runL,  rD)

      // Background crossfades
      const swimOp = p < 0.25 ? 1 : 1 - fade(p, 0.25, 0.42)
      const bikeOp = fade(p, 0.25, 0.42) * (1 - fade(p, 0.62, 0.78))
      const runOp  = fade(p, 0.62, 0.78)
      if (swimBg) swimBg.style.opacity = swimOp
      if (bikeBg) bikeBg.style.opacity = bikeOp
      if (runBg)  runBg.style.opacity  = runOp

      // Traveling dot
      if (p > 0.005 && p < 0.998) {
        const pt  = swimL.getPointAtLength(drawn)
        const vb  = svg.viewBox.baseVal
        const box = svg.getBoundingClientRect()
        const px  = (pt.x / vb.width)  * box.width
        const py  = (pt.y / vb.height) * box.height
        const col = drawn < L3 ? '#90e0ef' : drawn < L23 ? '#ffe566' : '#ff7043'

        if (dot) {
          dot.style.display = 'block'
          dot.style.left    = `${px}px`
          dot.style.top     = `${py}px`
          dot.style.color   = col
        }
      } else {
        if (dot) dot.style.display = 'none'
      }
    }

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      {/* ══ SWIM — deep ocean ══════════════════════════════════════════════════ */}
      <div ref={swimBgRef} style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, #00060f 0%, #001530 28%, #00356e 55%, #005a96 75%, #0080b8 100%)',
      }}>
        {/* Depth radiance */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 55% at 50% 88%, rgba(0,150,200,0.25), transparent 70%)',
        }} />
        {/* Wave layer 1 — deep, slow drift */}
        <div className="rc-w1" style={{
          position: 'absolute', bottom: '48%', left: 0, right: 0, height: 60,
          backgroundImage: WAVE_1, backgroundSize: '360px 60px', backgroundRepeat: 'repeat-x',
        }} />
        {/* Wave layer 2 — mid depth, reverse drift */}
        <div className="rc-w2" style={{
          position: 'absolute', bottom: '28%', left: 0, right: 0, height: 50,
          backgroundImage: WAVE_2, backgroundSize: '280px 50px', backgroundRepeat: 'repeat-x', opacity: 0.9,
        }} />
        {/* Wave layer 3 — surface chop, fastest */}
        <div className="rc-w3" style={{
          position: 'absolute', bottom: '10%', left: 0, right: 0, height: 40,
          backgroundImage: WAVE_3, backgroundSize: '200px 40px', backgroundRepeat: 'repeat-x',
        }} />
        {/* Surface glint line */}
        <div style={{
          position: 'absolute', bottom: '10%', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 5%, rgba(180,240,255,0.3) 50%, transparent 95%)',
        }} />
      </div>

      {/* ══ BIKE — pre-dawn road ═══════════════════════════════════════════════ */}
      <div ref={bikeBgRef} style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0,
        background: 'linear-gradient(180deg, #0e0618 0%, #1c0e34 16%, #5e2200 32%, #b86c00 43%, #e09018 49%, #0c0c10 52%, #080808 100%)',
      }}>
        {/* Star field in upper sky */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '43%',
          backgroundImage: STARS, backgroundSize: '600px 200px', backgroundRepeat: 'repeat',
        }} />
        {/* Horizon burst */}
        <div style={{
          position: 'absolute', top: '40%', left: 0, right: 0, height: 90,
          background: 'radial-gradient(ellipse 65% 100% at 50% 50%, rgba(255,155,15,0.55), transparent 70%)',
        }} />
        {/* Asphalt road */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '49%',
          background: '#080808',
          backgroundImage: ASPHALT, backgroundSize: '400px 400px',
        }}>
          {/* Center dashes — yellow like a real road */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 3, height: '100%',
            backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,210,40,0.6) 0px, rgba(255,210,40,0.6) 26px, transparent 26px, transparent 50px)',
          }} />
          {/* Shoulder lines */}
          <div style={{ position: 'absolute', top: 0, left: '11%',  width: 1, height: '100%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', top: 0, right: '11%', width: 1, height: '100%', background: 'rgba(255,255,255,0.07)' }} />
        </div>

      </div>

      {/* ══ RUN — finish line celebration ════════════════════════════════════ */}
      <div ref={runBgRef} style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0,
        background: 'linear-gradient(180deg, #060412 0%, #140c28 18%, #2c1a08 34%, #7a3c00 48%, #c06400 60%, #e08800 70%, #c87000 82%, #8a4400 100%)',
      }}>
        {/* Stadium spotlights — two cones from above */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '65%',
          background: [
            'radial-gradient(ellipse 22% 90% at 28% 0%, rgba(255,230,140,0.22), transparent 70%)',
            'radial-gradient(ellipse 22% 90% at 72% 0%, rgba(255,220,120,0.18), transparent 70%)',
            'radial-gradient(ellipse 40% 55% at 50% 0%, rgba(255,200,80,0.10), transparent 70%)',
          ].join(','),
        }} />
        {/* Warm ground glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 65% 40% at 50% 85%, rgba(255,140,40,0.28), transparent 70%)',
        }} />
        {/* Track surface — lighter terracotta */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '44%',
          background: 'linear-gradient(180deg, #7a3a10 0%, #a04c18 40%, #b85c20 100%)',
        }}>
          {/* Lane lines */}
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} style={{
              position: 'absolute', top: 0, bottom: 0,
              left: `${i * 12.5}%`, width: 1,
              background: 'rgba(255,200,120,0.18)',
            }} />
          ))}
          {/* Finish line — bold checkered, celebration-grade */}
          <div style={{
            position: 'absolute', bottom: '28%', left: 0, right: 0, height: 20,
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 20px, rgba(0,0,0,0.5) 20px, rgba(0,0,0,0.5) 40px)',
            boxShadow: '0 0 28px rgba(255,255,255,0.5)',
          }} />
          {/* Finish line glow halo */}
          <div style={{
            position: 'absolute', bottom: '20%', left: 0, right: 0, height: 60,
            background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,255,255,0.18), transparent 80%)',
          }} />
        </div>
        {/* Heat shimmer */}
        <div className="rc-heat" style={{
          position: 'absolute', bottom: '32%', left: 0, right: 0, height: '20%',
          background: 'linear-gradient(180deg, transparent, rgba(255,140,40,0.12), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ══ SVG RACE PATH ══════════════════════════════════════════════════════ */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="glow-swim" x="-150%" y="-40%" width="400%" height="180%">
              <feGaussianBlur stdDeviation="1.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-bike" x="-150%" y="-40%" width="400%" height="180%">
              <feGaussianBlur stdDeviation="1.4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-run" x="-150%" y="-40%" width="400%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Full dim course — entire route faintly visible */}
          <path d={COURSE_D} fill="none"
            stroke="rgba(255,255,255,0.08)" strokeWidth="0.4"
            strokeLinecap="round" vectorEffect="non-scaling-stroke"
          />

          {/* SWIM — teal/cyan water light */}
          <path ref={swimGRef} d={COURSE_D} fill="none"
            stroke="#00b4d8" strokeWidth="3.5" strokeLinecap="round"
            vectorEffect="non-scaling-stroke" opacity="0.65" filter="url(#glow-swim)"
          />
          <path ref={swimLRef} d={COURSE_D} fill="none"
            stroke="#90e0ef" strokeWidth="0.7" strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* BIKE — amber road-marking yellow */}
          <path ref={bikeGRef} d={COURSE_D} fill="none"
            stroke="#f5a623" strokeWidth="3" strokeLinecap="butt"
            vectorEffect="non-scaling-stroke" opacity="0.55" filter="url(#glow-bike)"
          />
          <path ref={bikeLRef} d={COURSE_D} fill="none"
            stroke="#ffe566" strokeWidth="0.85" strokeLinecap="butt"
            vectorEffect="non-scaling-stroke"
          />

          {/* RUN — hot orange-red */}
          <path ref={runGRef} d={COURSE_D} fill="none"
            stroke="#ff4500" strokeWidth="4.5" strokeLinecap="round"
            vectorEffect="non-scaling-stroke" opacity="0.7" filter="url(#glow-run)"
          />
          <path ref={runLRef} d={COURSE_D} fill="none"
            stroke="#ff7043" strokeWidth="0.75" strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* M-Dot logo traveling the course */}
        <div ref={dotRef} style={{
          position: 'absolute', width: 26, height: 34,
          transform: 'translate(-50%, -50%)',
          display: 'none', color: '#90e0ef',
          filter: 'drop-shadow(0 0 8px currentColor)',
        }}>
          <svg viewBox="0 0 100 128" style={{ width: '100%', height: '100%' }} fill="currentColor">
            {/* Head circle */}
            <circle cx="50" cy="20" r="18"/>
            {/* M body — two outer legs, two inner peaks, center valley (true M shape) */}
            <polygon points="10,42 90,42 90,124 70,76 50,124 30,76 10,124"/>
          </svg>
        </div>
      </div>
    </>
  )
}
