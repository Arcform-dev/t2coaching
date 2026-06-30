import { useState } from 'react'
import { FAQS } from '../data/siteContent'
import SectionHeading from './ui/SectionHeading'
import GlassCard from './ui/GlassCard'
import Reveal from './ui/Reveal'

const WRAP = { maxWidth: 880, margin: '0 auto', padding: '0 32px' }

// The visible FAQ. Its FAQPage JSON-LD is baked into the static HTML at build
// time by scripts/generate-seo.mjs, so it's present in the raw page for search
// and AI crawlers without relying on client-side rendering.

function FaqItem({ q, a, open, onToggle }) {
  return (
    <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, padding: '22px 26px', background: 'transparent', border: 'none',
          textAlign: 'left', cursor: 'pointer',
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
          fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontWeight: 600, color: '#fff', lineHeight: 1.35,
        }}
      >
        <span>{q}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5"
          style={{ flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s ease' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
      {open && (
        <div style={{ padding: '0 26px 24px' }}>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      )}
    </GlassCard>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section style={{ padding: '80px 0 90px' }}>
      <div style={WRAP}>
        <Reveal style={{ marginBottom: 44 }}>
          <SectionHeading
            eyebrow="Questions & Answers"
            title="Frequently asked questions"
            subtitle="Everything you need to know before booking a free discovery call."
            align="center"
          />
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 0.06}>
              <FaqItem
                q={f.q}
                a={f.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
