import { motion, AnimatePresence } from 'framer-motion'
import { Info, ArrowRight } from 'lucide-react'

// Sample-workout card for the "Custom Plan Build" step. Adapted from the
// planner-card helper to plain JSX + the site palette: an animated elevation
// profile, headline stats, a feature line, and a real CTA to book a call.

const SKY = '#7EC8E3'
const GOLD = '#C9A84C'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
}
const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
}

export default function PlannerCard({
  note,
  durationLabel,
  metaLine,
  elevationData = [],
  feature,
  ctaLabel = 'Build mine',
  ctaHref = '#',
  style,
}) {
  const max = Math.max(...elevationData, 1)
  const normalized = elevationData.map((p) => p / max)

  return (
    <div style={{
      width: '100%', maxWidth: 380, padding: 24, borderRadius: 20,
      display: 'flex', flexDirection: 'column', gap: 18,
      background: '#0D2B3E', border: '1px solid rgba(255,255,255,0.1)',
      ...style,
    }}>
      <AnimatePresence>
        {note && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 12px', borderRadius: 10,
              background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)',
              fontSize: 13, fontWeight: 600, color: '#F5A623',
            }}
          >
            <Info size={16} />
            <span>{note}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h3 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 34, color: '#fff', lineHeight: 1.1,
        }}>{durationLabel}</h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{metaLine}</p>
      </div>

      {/* elevation profile */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 64 }}
      >
        {normalized.map((h, i) => (
          <motion.div
            key={i}
            variants={barVariants}
            style={{
              flex: 1, height: `${Math.max(h * 100, 6)}%`,
              transformOrigin: 'bottom',
              background: SKY, borderRadius: '3px 3px 0 0',
            }}
          />
        ))}
      </motion.div>

      {feature && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: 'rgba(255,255,255,0.6)' }}>
          {feature.icon}
          <span>{feature.text}</span>
        </div>
      )}

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: GOLD, color: '#fff', fontSize: 15, fontWeight: 700,
          padding: '13px 20px', borderRadius: 100, textDecoration: 'none',
        }}
      >
        {ctaLabel} <ArrowRight size={17} />
      </a>
    </div>
  )
}
