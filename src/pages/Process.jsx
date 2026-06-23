import { useEffect, useRef, useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import CTABanner from '../components/ui/CTABanner'
import Reveal from '../components/ui/Reveal'
import BookingLink from '../components/ui/BookingLink'
import { PROCESS_STEPS as STEPS } from '../data/process'

// Scrollytelling "how it works" page, rebuilt on the site's own primitives:
// PageHeader + GSAP Reveal + inline SVG + DM Sans + flat corners + the
// navy/sky/gold palette. A sticky stepper spine (desktop) and a sticky progress
// bar (mobile) track the active step via IntersectionObserver. No framer-motion
// or lucide — same animation/icon vocabulary as the rest of the site.

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }
const FONT = "'DM Sans', system-ui, -apple-system, sans-serif"
const NAVY = '#0D2B3E'
const SKY = '#7EC8E3'
const GOLD = '#C9A84C'
const CARD = { background: NAVY, border: '1px solid rgba(255,255,255,0.1)' }

// ── Inline icons (site convention) ──────────────────────────────────────────
function IconCheck({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IconArrow({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

// ── Sidebar stepper spine ───────────────────────────────────────────────────
function Stepper({ steps, active, onSelect }) {
  return (
    <nav aria-label="Coaching journey steps" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {steps.map((s, i) => {
        const state = i < active ? 'completed' : i === active ? 'active' : 'inactive'
        const isLast = i === steps.length - 1
        const bg = state === 'completed' ? SKY : state === 'active' ? GOLD : 'rgba(255,255,255,0.07)'
        const fg = state === 'inactive' ? 'rgba(255,255,255,0.55)' : NAVY
        return (
          <button
            key={s.n}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={state === 'active' ? 'step' : undefined}
            style={{
              display: 'flex', gap: 16, alignItems: 'stretch',
              background: 'none', border: 'none', padding: 0, margin: 0,
              cursor: 'pointer', textAlign: 'left', width: '100%',
              flex: isLast ? '0 0 auto' : '1 1 0', minHeight: isLast ? 'auto' : 64,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, background: bg, color: fg,
                border: state === 'inactive' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                boxShadow: state === 'active' ? '0 0 0 5px rgba(201,168,76,0.22)' : 'none',
                transform: state === 'active' ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
              }}>
                {state === 'completed' ? <IconCheck size={18} color={NAVY} /> : s.n}
              </div>
              {!isLast && (
                <div style={{
                  width: 2, flex: 1, minHeight: 24, borderRadius: 2, margin: '8px 0',
                  background: i < active ? SKY : 'rgba(255,255,255,0.14)',
                  transition: 'background 0.3s ease',
                }} />
              )}
            </div>
            <div style={{ paddingTop: 6 }}>
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: state === 'inactive' ? 'rgba(255,255,255,0.55)' : '#fff', transition: 'color 0.3s ease' }}>{s.title}</div>
              <div style={{ fontSize: 12.5, marginTop: 3, lineHeight: 1.4, color: state === 'active' ? GOLD : 'rgba(255,255,255,0.4)', transition: 'color 0.3s ease' }}>{s.label}</div>
            </div>
          </button>
        )
      })}
    </nav>
  )
}

// ── Step 1 — what Wendy learns at intake ────────────────────────────────────
function IntakeCard() {
  const rows = [
    { tone: SKY, title: 'Fitness history', detail: 'Years training, recent races, current volume' },
    { tone: SKY, title: 'Life constraints', detail: 'Work, family, travel, sleep, real hours per week' },
    { tone: SKY, title: 'Goal race', detail: 'Distance, date, terrain, and your why' },
    { tone: GOLD, title: 'Limiters', detail: 'The weak link quietly capping your results' },
  ]
  return (
    <div style={{ width: '100%', maxWidth: 560, padding: 28, ...CARD }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: SKY, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
        What Wendy learns first
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {rows.map((r) => (
          <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${r.tone}22`, color: r.tone }}>
              <IconCheck size={18} color={r.tone} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{r.title}</div>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{r.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Step 2 — a sample workout from your custom plan ─────────────────────────
function PlannerCard() {
  const elevation = [20, 28, 24, 35, 46, 40, 55, 63, 50, 44, 58, 70, 64, 52, 38, 30]
  const max = Math.max(...elevation, 1)
  return (
    <div style={{ width: '100%', maxWidth: 400, padding: 24, display: 'flex', flexDirection: 'column', gap: 18, ...CARD }}>
      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, padding: '9px 12px', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', fontSize: 13, fontWeight: 600, color: GOLD }}>
        Delivered within 48 hours
      </div>
      <div>
        <h3 style={{ fontFamily: FONT, fontSize: 32, fontWeight: 600, color: '#fff', lineHeight: 1.1 }}>75 minutes</h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Saturday brick · 18 mi ride + 2 mi run</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 64 }}>
        {elevation.map((p, i) => (
          <div key={i} style={{ flex: 1, height: `${Math.max((p / max) * 100, 6)}%`, background: SKY, borderRadius: '2px 2px 0 0' }} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: 'rgba(255,255,255,0.6)' }}>
        <span style={{ color: SKY, flexShrink: 0 }}><IconCheck size={15} color={SKY} /></span>
        <span>Periodized for your goal race, not a template</span>
      </div>
      <BookingLink style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: GOLD, color: NAVY, fontSize: 15, fontWeight: 700, padding: '13px 20px', textDecoration: 'none' }}>
        Build my plan <IconArrow size={16} />
      </BookingLink>
    </div>
  )
}

// ── Step 3 — a life-wrapped training week ───────────────────────────────────
function WeekCalendar() {
  const week = [
    { day: 'Mon', session: 'Swim', detail: '45 min · technique', tone: SKY },
    { day: 'Tue', session: 'Bike', detail: '60 min · intervals', tone: GOLD },
    { day: 'Wed', session: 'Rest', detail: 'Recovery, on purpose', tone: 'rest' },
    { day: 'Thu', session: 'Run', detail: '40 min · tempo', tone: SKY },
    { day: 'Fri', session: 'Life', detail: "Kid's recital, off", tone: GOLD },
    { day: 'Sat', session: 'Long ride', detail: '2 hr · endurance', tone: GOLD },
    { day: 'Sun', session: 'Long run', detail: '70 min · easy', tone: SKY },
  ]
  return (
    <div style={{ width: '100%', padding: 24, ...CARD }}>
      <div className="week-grid" style={{ display: 'grid', gap: 10 }}>
        {week.map((d) => {
          const muted = d.tone === 'rest'
          const accent = muted ? 'rgba(255,255,255,0.3)' : d.tone
          return (
            <div key={d.day} style={{
              padding: '14px 12px', minHeight: 96,
              background: 'rgba(255,255,255,0.04)',
              border: muted ? '1px dashed rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d.day}</div>
              <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 12.5, fontWeight: 700, color: muted ? 'rgba(255,255,255,0.55)' : NAVY, background: muted ? 'transparent' : accent, padding: muted ? 0 : '3px 9px' }}>
                {d.session}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{d.detail}</div>
            </div>
          )
        })}
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 10, height: 10, border: '1px dashed rgba(255,255,255,0.4)', display: 'inline-block', flexShrink: 0 }} />
        Gaps are planned recovery, not missed sessions.
      </p>
    </div>
  )
}

// ── Step 4 — a real coach/athlete exchange ──────────────────────────────────
function ChatBubble({ sent, avatar, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 14, flexDirection: sent ? 'row-reverse' : 'row' }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', background: sent ? 'rgba(255,255,255,0.12)' : '#1A6B8A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
        {avatar === 'wendy'
          ? <img src="/wendy-cutout.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          : 'You'}
      </div>
      <div style={{
        maxWidth: '78%', padding: '11px 15px', fontSize: 14.5, lineHeight: 1.5,
        background: sent ? GOLD : NAVY,
        color: sent ? NAVY : 'rgba(255,255,255,0.9)',
        border: sent ? 'none' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 14,
        borderBottomRightRadius: sent ? 4 : 14,
        borderBottomLeftRadius: sent ? 14 : 4,
      }}>
        {children}
      </div>
    </div>
  )
}
function ChatThread() {
  return (
    <div style={{ width: '100%', maxWidth: 520, padding: 24, background: '#081A2A', border: '1px solid rgba(255,255,255,0.1)' }}>
      <ChatBubble sent>Rough night, only 4 hrs of sleep. Still hit the threshold intervals?</ChatBubble>
      <ChatBubble avatar="wendy">Skip them today. Easy 30-min spin instead, and we'll move the intervals to Thursday. Rest is training too.</ChatBubble>
      <ChatBubble sent>Done. Felt way better not forcing it.</ChatBubble>
      <div style={{ marginBottom: 0 }}>
        <ChatBubble avatar="wendy">Exactly. Your Thursday is already updated.</ChatBubble>
      </div>
    </div>
  )
}

// ── Step 5 — the weekly review checklist ────────────────────────────────────
function Checklist() {
  const items = [
    'Workout completion and how each session actually felt',
    'Heart-rate, pace and power trends across the week',
    'Sleep, fatigue and RPE: are you absorbing the work?',
    "Next week's plan adjusted to match, never blindly",
  ]
  return (
    <div style={{ width: '100%', maxWidth: 560, padding: 32, ...CARD }}>
      <h3 style={{ fontFamily: FONT, fontSize: 21, fontWeight: 600, color: '#fff', lineHeight: 1.25 }}>Your weekly review</h3>
      <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginTop: 8 }}>
        Every week, Wendy looks at the data behind your training, then adjusts with a reason.
      </p>
      <ul style={{ listStyle: 'none', display: 'grid', gap: 14, marginTop: 22 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ color: GOLD, flexShrink: 0, marginTop: 1 }}><IconCheck size={18} color={GOLD} /></span>
            <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Step 6 — the race-week timeline ─────────────────────────────────────────
function RaceWeekTimeline() {
  const milestones = [
    { when: 'Race week', text: 'Taper dialed in, so you arrive fresh, not flat.' },
    { when: '2 days out', text: 'Travel, gear and logistics planned to the detail.' },
    { when: 'Race morning', text: 'Warm-up, fueling and pacing written, not guessed.' },
    { when: 'On course', text: 'A split-by-split strategy from a Kona champion.' },
    { when: 'Beyond the finish', text: 'Recovery, what we learned, and the next goal.' },
  ]
  return (
    <div style={{ width: '100%', maxWidth: 560, padding: 28, ...CARD }}>
      {milestones.map((m, i) => {
        const last = i === milestones.length - 1
        return (
          <div key={m.when} style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', flexShrink: 0, marginTop: 4, background: SKY }} />
              {!last && <div style={{ width: 2, flex: 1, minHeight: 22, background: 'rgba(255,255,255,0.14)', margin: '6px 0', borderRadius: 2 }} />}
            </div>
            <div style={{ paddingBottom: last ? 0 : 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: GOLD, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.when}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5, marginTop: 3 }}>{m.text}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StepVisual({ index }) {
  switch (index) {
    case 0: return <IntakeCard />
    case 1: return <PlannerCard />
    case 2: return <WeekCalendar />
    case 3: return <ChatThread />
    case 4: return <Checklist />
    case 5: return <RaceWeekTimeline />
    default: return null
  }
}

export default function Process() {
  useDocumentMeta(
    "What It's Like to Work With Wendy",
    'A look at the full t2coaching journey, from intake and your custom 48-hour plan to weekly adjustments and race day. Personal, dynamic coaching built around your life.'
  )

  const [active, setActive] = useState(0)
  const panelRefs = useRef([])

  // Scroll-spy: the active step follows whichever panel is most visible. A
  // spread of thresholds + max-ratio is steadier than a single trip wire.
  useEffect(() => {
    const ids = STEPS.map((_, i) => `step-panel-${i + 1}`)
    const panels = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (panels.length === 0) return
    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.intersectionRatio)
        let bestId = null
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id }
        }
        if (bestId) setActive(ids.indexOf(bestId))
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    )
    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [])

  const goTo = (idx) => {
    panelRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title="What it's like to"
        titleAccent="work with Wendy."
        subtitle="Six steps from your first conversation to race morning: personal, dynamic, and built entirely around your life. Here's exactly what the journey looks like."
      />

      {/* Mobile progress bar (sticky under the nav) */}
      <div className="lg:hidden" style={{ position: 'sticky', top: 72, zIndex: 50, background: 'rgba(13,43,62,0.97)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 0' }}>
        <div style={WRAP}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9, gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: SKY, letterSpacing: '0.12em' }}>STEP {active + 1} / {STEPS.length}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{STEPS[active].title}</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((active + 1) / STEPS.length) * 100}%`, background: GOLD, borderRadius: 2, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Stepper + scrolling panels */}
      <section style={{ padding: '32px 0 80px' }}>
        <div style={WRAP}>
          <div className="process-grid">
            {/* Sticky full-height stepper spine (desktop only) */}
            <aside className="hidden lg:block" style={{ width: 300, flexShrink: 0 }}>
              <div style={{ position: 'sticky', top: 96, height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, flexShrink: 0 }}>
                  The Journey
                </div>
                <Stepper steps={STEPS} active={active} onSelect={goTo} />
                <BookingLink style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 24, flexShrink: 0, background: GOLD, color: NAVY, fontSize: 14, fontWeight: 700, padding: '13px 22px', textDecoration: 'none' }}>
                  Book a Free Call <IconArrow size={16} />
                </BookingLink>
              </div>
            </aside>

            <div style={{ flex: 1, minWidth: 0 }}>
              {STEPS.map((step, i) => (
                <section
                  key={step.n}
                  id={`step-panel-${i + 1}`}
                  ref={(el) => { panelRefs.current[i] = el }}
                  style={{ padding: '52px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Reveal>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: 'rgba(126,200,227,0.6)' }}>{step.n}</span>
                      <div style={{ width: 28, height: 1, background: GOLD }} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{step.label}</span>
                    </div>
                    <h2 style={{ fontFamily: FONT, fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)', fontWeight: 600, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
                      {step.title}
                    </h2>
                    <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.12rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 580, marginBottom: 32 }}>
                      {step.body}
                    </p>
                    <StepVisual index={i} />
                  </Reveal>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Your first step is a conversation."
        subtitle="No pressure and no sales pitch, just 15 minutes with Wendy to talk through where you are and where you want to go. The whole journey above starts here."
        primaryLabel="Book a Free 15-Min Call"
      />
    </>
  )
}
