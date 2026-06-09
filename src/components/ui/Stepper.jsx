import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

// Vertical stepper "spine" for the /process page sidebar. Adapted from the
// shadcn stepper helper to plain JSX + the site palette. Driven by an
// IntersectionObserver in the parent: `active` is the current step index,
// `onSelect` smooth-scrolls to a step. States: completed / active / inactive.
//
// The <nav> is a full-height flex column: every step except the last flexes to
// share the available height, so the separator rails stretch to fill the gaps
// between indicators and the spine spans the whole sidebar.

const GOLD = '#C9A84C' // current step
const SKY = '#7EC8E3'  // teal accent — completed fill / progress

export default function Stepper({ steps, active, onSelect, style }) {
  return (
    <nav
      aria-label="Coaching journey steps"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, ...style }}
    >
      {steps.map((s, i) => {
        const state = i < active ? 'completed' : i === active ? 'active' : 'inactive'
        const isLast = i === steps.length - 1

        const indicatorBg =
          state === 'completed' ? SKY : state === 'active' ? GOLD : 'rgba(255,255,255,0.07)'
        const indicatorColor =
          state === 'inactive' ? 'rgba(255,255,255,0.55)' : '#0D2B3E'
        const indicatorBorder =
          state === 'inactive' ? '1px solid rgba(255,255,255,0.2)' : 'none'

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
              // non-last steps grow equally to distribute the spine over full height
              flex: isLast ? '0 0 auto' : '1 1 0', minHeight: isLast ? 'auto' : 64,
            }}
          >
            {/* indicator + connecting rail */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div
                animate={{ scale: state === 'active' ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700,
                  background: indicatorBg, color: indicatorColor, border: indicatorBorder,
                  boxShadow: state === 'active' ? '0 0 0 5px rgba(201,168,76,0.22)' : 'none',
                  transition: 'background 0.3s ease, color 0.3s ease',
                }}
              >
                {state === 'completed' ? <Check size={18} strokeWidth={3} /> : s.n}
              </motion.div>
              {!isLast && (
                <div style={{
                  width: 2, flex: 1, minHeight: 24, borderRadius: 2, margin: '8px 0',
                  background: i < active ? SKY : 'rgba(255,255,255,0.14)',
                  transition: 'background 0.3s ease',
                }} />
              )}
            </div>

            {/* label */}
            <div style={{ paddingTop: 6 }}>
              <div style={{
                fontSize: 15, fontWeight: 600, lineHeight: 1.3,
                color: state === 'inactive' ? 'rgba(255,255,255,0.55)' : '#fff',
                transition: 'color 0.3s ease',
              }}>{s.title}</div>
              <div style={{
                fontSize: 12.5, marginTop: 3, lineHeight: 1.4,
                color: state === 'active' ? GOLD : 'rgba(255,255,255,0.4)',
                transition: 'color 0.3s ease',
              }}>{s.label}</div>
            </div>
          </button>
        )
      })}
    </nav>
  )
}
