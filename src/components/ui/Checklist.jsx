import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

// Weekly-review checklist for the "Progress & Adjustments" step. Adapted from
// the onboarding-checklist helper to plain JSX + the site palette (gold checks,
// navy card). The video/dialog half is dropped — this step is about data review.

const GOLD = '#C9A84C'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function Checklist({ title, description, items = [], style }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{
        width: '100%', maxWidth: 560, padding: 32, borderRadius: 20,
        background: '#0D2B3E', border: '1px solid rgba(255,255,255,0.1)',
        ...style,
      }}
    >
      {title && (
        <h3 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 22, color: '#fff', lineHeight: 1.25,
        }}>{title}</h3>
      )}
      {description && (
        <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginTop: 8 }}>
          {description}
        </p>
      )}
      <ul style={{ listStyle: 'none', display: 'grid', gap: 14, marginTop: 22 }}>
        {items.map((item, i) => (
          <motion.li key={i} variants={itemVariants} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <CheckCircle2 size={20} color={GOLD} style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
