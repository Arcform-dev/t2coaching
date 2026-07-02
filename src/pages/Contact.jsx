import { useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import { CONTACT, SOCIALS, FORMSPREE_ENDPOINT } from '../data/siteContent'
import BookingLink from '../components/ui/BookingLink'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

const inputStyle = {
  width: '100%', padding: '13px 16px', borderRadius: 0,
  background: 'rgba(8,18,32,0.55)', border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff', fontSize: 16, fontFamily: 'inherit', outline: 'none',
  minHeight: 48,
}
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.84)', marginBottom: 7 }

const EXPERIENCE = ['Complete beginner', 'Intermediate (1-3 races)', 'Advanced / competitive', 'Returning from a break', 'Just need accountability']
const HEARD = ['Google search', 'Instagram', 'Facebook', 'YouTube', 'Referral from an athlete', 'The Wall Street Journal', 'Other']

const EMPTY = { name: '', email: '', phone: '', goal: '', experience: '', start: '', heard: '', message: '', _gotcha: '' }

export default function Contact() {
  useDocumentMeta('Contact Coach Wendy Mader', `Get in touch with Coach Wendy Mader. Email ${CONTACT.email} or send an inquiry to start your coaching journey.`)

  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Submits to Formspree, which emails the inquiry straight to Wendy's inbox.
  // No mail app required on the visitor's end — the message actually sends.
  const submit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })

    // Honeypot: real people leave this hidden field empty; bots fill it.
    if (form._gotcha) return

    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          goal: form.goal,
          experience: form.experience,
          start: form.start,
          heard: form.heard,
          message: form.message,
          _subject: `New coaching inquiry from ${form.name}`,
        }),
      })
      if (res.ok) {
        setForm(EMPTY)
        setStatus({ type: 'success', message: 'Thanks — your message was sent. Wendy will reply within 1-2 business days.' })
      } else {
        const data = await res.json().catch(() => null)
        const detail = data?.errors?.map((err) => err.message).join(', ')
        throw new Error(detail || 'Submission failed')
      }
    } catch {
      setStatus({ type: 'error', message: `Something went wrong sending your message. Please email ${CONTACT.email} directly.` })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's talk about"
        titleAccent="your goals."
        subtitle="Tell me where you are and where you want to go. I read every message personally and reply within 1-2 business days."
      />

      <section style={{ padding: '50px 0 100px' }}>
        <div style={WRAP}>
          <div className="contact-grid" style={{ display: 'grid', gap: 32, alignItems: 'start' }}>

            <Reveal x={-40} y={0}>
              <GlassCard style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                <form onSubmit={submit}>
                    <h2 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 24, color: '#fff', marginBottom: 24 }}>Send an inquiry</h2>

                    {/* Honeypot — hidden from people, catches bots */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form._gotcha}
                      onChange={set('_gotcha')}
                      style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }}
                    />

                    <div className="form-row" style={{ display: 'grid', gap: 18, marginBottom: 18 }}>
                      <div>
                        <label style={labelStyle} htmlFor="name">Name *</label>
                        <input id="name" name="name" autoComplete="name" required value={form.name} onChange={set('name')} style={inputStyle} placeholder="Your name" />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="email">Email *</label>
                        <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} style={inputStyle} placeholder="you@email.com" />
                      </div>
                    </div>

                    <div className="form-row" style={{ display: 'grid', gap: 18, marginBottom: 18 }}>
                      <div>
                        <label style={labelStyle} htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} style={inputStyle} placeholder="(optional)" />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="goal">Race goal / distance</label>
                        <input id="goal" name="goal" value={form.goal} onChange={set('goal')} style={inputStyle} placeholder="e.g. first 70.3, Kona, 5k" />
                      </div>
                    </div>

                    <div className="form-row" style={{ display: 'grid', gap: 18, marginBottom: 18 }}>
                      <div>
                        <label style={labelStyle} htmlFor="experience">Experience level</label>
                        <select id="experience" name="experience" value={form.experience} onChange={set('experience')} style={{ ...inputStyle, appearance: 'auto' }}>
                          <option value="">Select...</option>
                          {EXPERIENCE.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="heard">How did you hear about me?</label>
                        <select id="heard" name="heard" value={form.heard} onChange={set('heard')} style={{ ...inputStyle, appearance: 'auto' }}>
                          <option value="">Select...</option>
                          {HEARD.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: 18 }}>
                      <label style={labelStyle} htmlFor="start">Preferred start date</label>
                      <input id="start" name="start" value={form.start} onChange={set('start')} style={inputStyle} placeholder="e.g. ASAP, next month, before my Sept race" />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={labelStyle} htmlFor="message">Message *</label>
                      <textarea id="message" name="message" required rows={5} value={form.message} onChange={set('message')} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell me a bit about your goals and what you're looking for..." />
                    </div>

                    {status.message && (
                      <p role={status.type === 'error' ? 'alert' : 'status'} style={{
                        fontSize: 14,
                        color: status.type === 'error' ? '#FFB4A8' : '#9BE7C0',
                        lineHeight: 1.5,
                        marginBottom: 18,
                      }}>
                        {status.message}
                      </p>
                    )}

                    <button type="submit" disabled={submitting} style={{
                      width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      background: submitting ? 'rgba(201,168,76,0.6)' : '#C9A84C', color: '#0D2B3E', fontSize: 16, fontWeight: 700,
                      padding: '16px 28px', borderRadius: 0, border: 'none', cursor: submitting ? 'wait' : 'pointer',
                      boxShadow: '0 10px 30px rgba(201,168,76,0.35)',
                    }}>
                      {submitting ? 'Sending…' : 'Send Message'}
                      <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>

                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
                      Prefer to write directly? Email{' '}
                      <a href={`mailto:${CONTACT.email}`} style={{ color: '#7EC8E3' }}>{CONTACT.email}</a>.
                    </p>
                  </form>
              </GlassCard>
            </Reveal>

            <Reveal x={40} y={0} delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <GlassCard style={{ padding: '32px 30px' }}>
                  <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff', marginBottom: 22 }}>Reach me directly</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <InfoRow label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
                    <InfoRow label="Phone" value={CONTACT.phone} href={CONTACT.phoneHref} />
                    <InfoRow label="Based in" value={CONTACT.location} />
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.74)', lineHeight: 1.6, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    {CONTACT.reach}
                  </p>
                </GlassCard>

                <GlassCard style={{ padding: '32px 30px' }}>
                  <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff', marginBottom: 8 }}>Prefer to talk?</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: 18 }}>
                    Book a free 15-minute discovery call. No commitment, just a real conversation.
                  </p>
                  <BookingLink className="shine-btn" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#C9A84C', color: '#0D2B3E', fontSize: 14, fontWeight: 700,
                    padding: '13px 26px', borderRadius: 0, textDecoration: 'none',
                  }}>Book a Free Call</BookingLink>
                </GlassCard>

                <GlassCard style={{ padding: '28px 30px' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Follow along</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SOCIALS.map((s) => (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 15, color: 'rgba(255,255,255,0.84)', textDecoration: 'none' }}>
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
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
      {valueEl}
    </div>
  )
}
