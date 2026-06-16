import { useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import { CONTACT, SOCIALS, BOOKING_URL } from '../data/siteContent'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

const inputStyle = {
  width: '100%', padding: '13px 16px', borderRadius: 10,
  background: 'rgba(8,18,32,0.55)', border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none',
}
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 7 }

const EXPERIENCE = ['Complete beginner', 'Intermediate (1–3 races)', 'Advanced / competitive', 'Returning from a break', 'Just need accountability']
const HEARD = ['Google search', 'Instagram', 'Facebook', 'YouTube', 'Referral from an athlete', 'The Wall Street Journal', 'Other']

const EMPTY = { name: '', email: '', phone: '', goal: '', experience: '', start: '', heard: '', message: '' }

export default function Contact() {
  useDocumentMeta('Contact', `Get in touch with Coach Wendy Mader. Email ${CONTACT.email} or send an inquiry to start your coaching journey.`)

  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'inquiry', ...form }),
      })
      if (res.ok) { setStatus('ok'); setForm(EMPTY) }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's talk about"
        titleAccent="your goals."
        subtitle="Tell me where you are and where you want to go. I read every message personally and reply within 1–2 business days."
      />

      <section style={{ padding: '50px 0 100px' }}>
        <div style={WRAP}>
          <div className="contact-grid" style={{ display: 'grid', gap: 32, alignItems: 'start' }}>

            {/* Form */}
            <Reveal x={-40} y={0}>
              <GlassCard style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                {status === 'ok' ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🏁</div>
                    <h3 style={{ fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif", fontSize: 26, color: '#fff', marginBottom: 12 }}>Message sent!</h3>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 380, margin: '0 auto' }}>
                      Thanks for reaching out. I'll get back to you within 1–2 business days. Talk soon!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit}>
                    <h2 style={{ fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif", fontSize: 24, color: '#fff', marginBottom: 24 }}>Send an inquiry</h2>

                    <div className="form-row" style={{ display: 'grid', gap: 18, marginBottom: 18 }}>
                      <div>
                        <label style={labelStyle} htmlFor="name">Name *</label>
                        <input id="name" required value={form.name} onChange={set('name')} style={inputStyle} placeholder="Your name" />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="email">Email *</label>
                        <input id="email" type="email" required value={form.email} onChange={set('email')} style={inputStyle} placeholder="you@email.com" />
                      </div>
                    </div>

                    <div className="form-row" style={{ display: 'grid', gap: 18, marginBottom: 18 }}>
                      <div>
                        <label style={labelStyle} htmlFor="phone">Phone</label>
                        <input id="phone" value={form.phone} onChange={set('phone')} style={inputStyle} placeholder="(optional)" />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="goal">Race goal / distance</label>
                        <input id="goal" value={form.goal} onChange={set('goal')} style={inputStyle} placeholder="e.g. first 70.3, Kona, 5k…" />
                      </div>
                    </div>

                    <div className="form-row" style={{ display: 'grid', gap: 18, marginBottom: 18 }}>
                      <div>
                        <label style={labelStyle} htmlFor="experience">Experience level</label>
                        <select id="experience" value={form.experience} onChange={set('experience')} style={{ ...inputStyle, appearance: 'auto' }}>
                          <option value="">Select…</option>
                          {EXPERIENCE.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="heard">How did you hear about me?</label>
                        <select id="heard" value={form.heard} onChange={set('heard')} style={{ ...inputStyle, appearance: 'auto' }}>
                          <option value="">Select…</option>
                          {HEARD.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: 18 }}>
                      <label style={labelStyle} htmlFor="start">Preferred start date</label>
                      <input id="start" value={form.start} onChange={set('start')} style={inputStyle} placeholder="e.g. ASAP, next month, before my Sept race" />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={labelStyle} htmlFor="message">Message *</label>
                      <textarea id="message" required rows={5} value={form.message} onChange={set('message')} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell me a bit about your goals and what you're looking for…" />
                    </div>

                    <button type="submit" disabled={status === 'sending'} style={{
                      width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      background: '#C9A84C', color: '#fff', fontSize: 16, fontWeight: 700,
                      padding: '16px 28px', borderRadius: 100, border: 'none', cursor: 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1, boxShadow: '0 10px 30px rgba(201,168,76,0.35)',
                    }}>
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                      {status !== 'sending' && (
                        <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      )}
                    </button>

                    {status === 'error' && (
                      <p style={{ fontSize: 14, color: '#F5A623', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
                        Something went wrong sending your message. Please email me directly at{' '}
                        <a href={`mailto:${CONTACT.email}`} style={{ color: '#7EC8E3' }}>{CONTACT.email}</a>.
                      </p>
                    )}
                  </form>
                )}
              </GlassCard>
            </Reveal>

            {/* Contact info */}
            <Reveal x={40} y={0} delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <GlassCard style={{ padding: '32px 30px' }}>
                  <h3 style={{ fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff', marginBottom: 22 }}>Reach me directly</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <InfoRow label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
                    <InfoRow label="Phone" value={CONTACT.phone} href={CONTACT.phoneHref} />
                    <InfoRow label="Based in" value={CONTACT.location} />
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    {CONTACT.reach}
                  </p>
                </GlassCard>

                <GlassCard style={{ padding: '32px 30px' }}>
                  <h3 style={{ fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff', marginBottom: 8 }}>Prefer to talk?</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 18 }}>
                    Book a free 15-minute discovery call — no commitment, just a real conversation.
                  </p>
                  <a className="shine-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#C9A84C', color: '#fff', fontSize: 14, fontWeight: 700,
                    padding: '13px 26px', borderRadius: 100, textDecoration: 'none',
                  }}>Book a Free Call</a>
                </GlassCard>

                <GlassCard style={{ padding: '28px 30px' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Follow along</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SOCIALS.map((s) => (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }}>
                        <span>{s.label}</span>
                        <span style={{ color: '#7EC8E3' }}>{s.handle}</span>
                      </a>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  )
}

function InfoRow({ label, value, href }) {
  const valueEl = href
    ? <a href={href} style={{ color: '#fff', textDecoration: 'none', fontSize: 16 }}>{value}</a>
    : <span style={{ color: '#fff', fontSize: 16 }}>{value}</span>
  return (
    <div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
      {valueEl}
    </div>
  )
}
