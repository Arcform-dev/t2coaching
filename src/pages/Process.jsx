import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity, CalendarClock, Target, AlertTriangle, Mountain,
  Plane, Sunrise, Flag, Trophy, ArrowRight,
} from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Stepper from '../components/ui/Stepper'
import PlannerCard from '../components/ui/PlannerCard'
import Checklist from '../components/ui/Checklist'
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '../components/ui/ChatBubble'
import { BOOKING_URL } from '../data/siteContent'
import { PROCESS_STEPS as STEPS } from '../data/process'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }
const NAVY = '#0D2B3E'
const SKY = '#7EC8E3'
const GOLD = '#C9A84C'
const AMBER = '#F5A623'

// ── Reveal wrapper (framer-motion, replaces the GSAP-based Reveal on this page)
function Reveal({ children, delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ── Step 1 visual — what Wendy learns at intake ─────────────────────────────
function IntakeCard() {
  const rows = [
    { icon: <Activity size={22} />, tone: SKY, title: 'Fitness history', detail: 'Years training, recent races, current volume' },
    { icon: <CalendarClock size={22} />, tone: SKY, title: 'Life constraints', detail: 'Work, family, travel, sleep, real hours per week' },
    { icon: <Target size={22} />, tone: SKY, title: 'Goal race', detail: 'Distance, date, terrain — and your why' },
    { icon: <AlertTriangle size={22} />, tone: AMBER, title: 'Limiters', detail: 'The weak link quietly capping your results' },
  ]
  return (
    <div style={{ width: '100%', maxWidth: 560, padding: 28, borderRadius: 20, background: NAVY, border: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: SKY, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
        What Wendy learns first
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {rows.map((r) => (
          <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${r.tone}22`, color: r.tone }}>
              {r.icon}
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

// ── Step 3 visual — a life-wrapped training week ────────────────────────────
function WeekCalendar() {
  const week = [
    { day: 'Mon', session: 'Swim', detail: '45 min · technique', tone: SKY },
    { day: 'Tue', session: 'Bike', detail: '60 min · intervals', tone: GOLD },
    { day: 'Wed', session: 'Rest', detail: 'Recovery, on purpose', tone: 'rest' },
    { day: 'Thu', session: 'Run', detail: '40 min · tempo', tone: SKY },
    { day: 'Fri', session: 'Life', detail: "Kid's recital — off", tone: AMBER },
    { day: 'Sat', session: 'Long ride', detail: '2 hr · endurance', tone: GOLD },
    { day: 'Sun', session: 'Long run', detail: '70 min · easy', tone: SKY },
  ]
  return (
    <div style={{ width: '100%', padding: 24, borderRadius: 20, background: NAVY, border: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="week-grid" style={{ display: 'grid', gap: 10 }}>
        {week.map((d) => {
          const muted = d.tone === 'rest'
          const accent = muted ? 'rgba(255,255,255,0.3)' : d.tone
          return (
            <div key={d.day} style={{
              padding: '14px 12px', borderRadius: 12, minHeight: 96,
              background: 'rgba(255,255,255,0.04)',
              border: muted ? '1px dashed rgba(255,255,255,0.18)' : `1px solid rgba(255,255,255,0.08)`,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d.day}</div>
              <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 12.5, fontWeight: 700, color: muted ? 'rgba(255,255,255,0.55)' : '#0D2B3E', background: muted ? 'transparent' : accent, padding: muted ? 0 : '3px 9px', borderRadius: 100 }}>
                {d.session}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{d.detail}</div>
            </div>
          )
        })}
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: 3, border: '1px dashed rgba(255,255,255,0.4)', display: 'inline-block' }} />
        Gaps are planned recovery — not missed sessions.
      </p>
    </div>
  )
}

// ── Step 4 visual — a real exchange ─────────────────────────────────────────
function ChatThread() {
  return (
    <div style={{ width: '100%', maxWidth: 520, padding: 24, borderRadius: 20, background: '#081A2A', border: '1px solid rgba(255,255,255,0.1)' }}>
      <ChatBubble variant="sent">
        <ChatBubbleAvatar fallback="You" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <ChatBubbleMessage variant="sent">Rough night — only 4 hrs of sleep. Still hit the threshold intervals?</ChatBubbleMessage>
      </ChatBubble>
      <ChatBubble variant="received">
        <ChatBubbleAvatar src="/wendy-hero.jpg" />
        <ChatBubbleMessage>Skip them today. Easy 30-min spin instead — we'll move the intervals to Thursday. Rest is training too. 💪</ChatBubbleMessage>
      </ChatBubble>
      <ChatBubble variant="sent">
        <ChatBubbleAvatar fallback="You" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <ChatBubbleMessage variant="sent">Done. Felt way better not forcing it.</ChatBubbleMessage>
      </ChatBubble>
      <ChatBubble variant="received" style={{ marginBottom: 0 }}>
        <ChatBubbleAvatar src="/wendy-hero.jpg" />
        <ChatBubbleMessage>Exactly. Your Thursday is already updated.</ChatBubbleMessage>
      </ChatBubble>
    </div>
  )
}

// ── Step 6 visual — race week timeline ──────────────────────────────────────
function RaceWeekTimeline() {
  const milestones = [
    { icon: <CalendarClock size={18} />, when: 'Race week', text: 'Taper dialed in — you arrive fresh, not flat.' },
    { icon: <Plane size={18} />, when: '2 days out', text: 'Travel, gear and logistics planned to the detail.' },
    { icon: <Sunrise size={18} />, when: 'Race morning', text: 'Warm-up, fueling and pacing — written, not guessed.' },
    { icon: <Flag size={18} />, when: 'On course', text: 'A split-by-split strategy from a Kona champion.' },
    { icon: <Trophy size={18} />, when: 'Beyond the finish', text: 'Recovery, what we learned, and the next goal.' },
  ]
  return (
    <div style={{ width: '100%', maxWidth: 560, padding: 28, borderRadius: 20, background: NAVY, border: '1px solid rgba(255,255,255,0.1)' }}>
      {milestones.map((m, i) => {
        const last = i === milestones.length - 1
        return (
          <div key={m.when} style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${SKY}1f`, color: SKY }}>
                {m.icon}
              </div>
              {!last && <div style={{ width: 2, flex: 1, minHeight: 22, background: 'rgba(255,255,255,0.14)', margin: '6px 0', borderRadius: 2 }} />}
            </div>
            <div style={{ paddingTop: 5, paddingBottom: last ? 0 : 18 }}>
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
    case 1: return (
      <PlannerCard
        note="Delivered within 48 hours"
        durationLabel="75 minutes"
        metaLine="Saturday brick · 18 mi ride + 2 mi run"
        elevationData={[20, 28, 24, 35, 46, 40, 55, 63, 50, 44, 58, 70, 64, 52, 38, 30]}
        feature={{ icon: <Mountain size={16} color={SKY} />, text: 'Periodized for your goal race — not a template' }}
        ctaLabel="Build my plan"
        ctaHref={BOOKING_URL}
      />
    )
    case 2: return <WeekCalendar />
    case 3: return <ChatThread />
    case 4: return (
      <Checklist
        title="Your weekly review"
        description="Every week, Wendy looks at the data behind your training — then adjusts with a reason."
        items={[
          'Workout completion & how each session actually felt',
          'Heart-rate, pace and power trends across the week',
          'Sleep, fatigue and RPE — are you absorbing the work?',
          "Next week's plan adjusted to match — never blindly",
        ]}
      />
    )
    case 5: return <RaceWeekTimeline />
    default: return null
  }
}

export default function Process() {
  useDocumentMeta(
    'What It’s Like to Work With Wendy',
    'A look at the full T2 Coaching journey — from intake and your custom 48-hour plan to weekly adjustments and race day. Personal, dynamic coaching built around your life.'
  )

  const [active, setActive] = useState(0)
  const panelRefs = useRef([])

  // Scroll-spy: the active step follows whichever panel is most visible. Using
  // a spread of thresholds + max-ratio is steadier than a single 40% trip wire —
  // it never lands in a dead zone between two panels.
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
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header style={{ padding: '150px 0 40px' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          style={WRAP}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 36, height: 1, background: AMBER }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: AMBER, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              How It Works
            </span>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Cormorant Garamond', 'DM Serif Display', Georgia, serif", fontSize: 'clamp(2.6rem, 6vw, 5rem)', color: '#fff', lineHeight: 1.05, fontWeight: 600, maxWidth: 900 }}
          >
            What it&rsquo;s like to{' '}
            <em style={{ color: SKY, fontStyle: 'italic' }}>work with Wendy.</em>
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', color: 'rgba(255,255,255,0.72)', fontWeight: 300, lineHeight: 1.6, maxWidth: 640, marginTop: 24 }}
          >
            Six steps from your first conversation to race morning — personal, dynamic, and built entirely around your life. Here&rsquo;s exactly what the journey looks like.
          </motion.p>
        </motion.div>
      </header>

      {/* ── Mobile progress bar (sticky under nav) ─────────────────────────── */}
      <div className="lg:hidden" style={{ position: 'sticky', top: 72, zIndex: 50, background: 'rgba(13,43,62,0.97)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 0' }}>
        <div style={WRAP}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9, gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: SKY, letterSpacing: '0.12em' }}>STEP {active + 1} / {STEPS.length}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{STEPS[active].title}</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              style={{ height: '100%', background: GOLD, borderRadius: 2 }}
            />
          </div>
        </div>
      </div>

      {/* ── Stepper + panels ───────────────────────────────────────────────── */}
      <section style={{ padding: '32px 0 80px' }}>
        <div style={WRAP}>
          <div className="process-grid">
            {/* Sticky full-height stepper spine (desktop only). The aside stretches
                to the panel column's height; the inner element is pinned at 100vh
                so the spine fills the viewport and its separators flex to fill. */}
            <aside className="hidden lg:block" style={{ width: 300, flexShrink: 0 }}>
              <div style={{ position: 'sticky', top: 96, height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: AMBER, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, flexShrink: 0 }}>
                  The Journey
                </div>
                <Stepper steps={STEPS} active={active} onSelect={goTo} style={{ flex: 1 }} />
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 24, flexShrink: 0, background: GOLD, color: '#fff', fontSize: 14, fontWeight: 700, padding: '13px 22px', borderRadius: 100, textDecoration: 'none' }}
                >
                  Book a Free Call <ArrowRight size={16} />
                </a>
              </div>
            </aside>

            {/* Scrolling panels */}
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
                      <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, color: 'rgba(126,200,227,0.55)' }}>{step.n}</span>
                      <div style={{ width: 28, height: 1, background: AMBER }} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: AMBER, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{step.label}</span>
                    </div>
                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)', color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
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

      {/* ── Closing CTA ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 100px', background: NAVY }}>
        <Reveal style={WRAP}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: '0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 40, height: 1, background: AMBER }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: AMBER, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Start Your Season</span>
              <div style={{ width: 40, height: 1, background: AMBER }} />
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#fff', lineHeight: 1.12, marginBottom: 18 }}>
              Your first step is a conversation.
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto 32px' }}>
              No pressure and no sales pitch — just 15 minutes with Wendy to talk through where you are and where you want to go. The whole journey above starts here.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', background: GOLD, color: '#fff', fontSize: 16, fontWeight: 700, padding: '16px 38px', borderRadius: 100, textDecoration: 'none', boxShadow: '0 12px 40px rgba(201,168,76,0.45)' }}
              >
                Book a Free 15-Min Call <ArrowRight size={17} />
              </a>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', color: SKY, fontSize: 16, fontWeight: 500, padding: '15px 32px', borderRadius: 100, textDecoration: 'none', border: '1px solid rgba(126,200,227,0.45)' }}>
                Send a Message
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
