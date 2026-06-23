// Cloudflare Pages Function — handles contact form + newsletter submissions.
// Runs server-side so the Resend API key is never exposed to the browser.
//
// Required environment variable (set in Cloudflare Pages → Settings → Env vars,
// and in a local `.dev.vars` file for `wrangler pages dev`):
//   RESEND_API_KEY   — your Resend API key (https://resend.com/api-keys)
// Optional overrides:
//   CONTACT_TO       — where inquiries are delivered (default t2coachwendy@gmail.com)
//   CONTACT_FROM     — verified Resend sender (default onboarding@resend.dev for testing)
//
// NOTE: `onboarding@resend.dev` works without domain setup but only delivers to
// the Resend account owner. For production, verify a domain in Resend and set
// CONTACT_FROM to something like "T2 Coaching <noreply@t2coaching.com>".

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400)
  }

  const type = body.type === 'newsletter' ? 'newsletter' : 'inquiry'
  const email = (body.email || '').trim()

  // Basic validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'A valid email is required.' }, 400)
  }
  if (type === 'inquiry' && (!body.name || !body.message)) {
    return json({ ok: false, error: 'Name and message are required.' }, 400)
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: 'Email is not configured yet.' }, 503)
  }

  const to = env.CONTACT_TO || 't2coachwendy@gmail.com'
  const from = env.CONTACT_FROM || 't2coaching <onboarding@resend.dev>'

  let subject, html
  if (type === 'newsletter') {
    subject = `📬 New Insider's Guide signup — ${email}`
    html = `<h2>New free-guide signup</h2><p><strong>Email:</strong> ${esc(email)}</p>`
  } else {
    const rows = [
      ['Name', body.name],
      ['Email', email],
      ['Phone', body.phone],
      ['Race goal / distance', body.goal],
      ['Experience level', body.experience],
      ['Preferred start', body.start],
      ['Heard about you via', body.heard],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><strong>${k}</strong></td><td style="padding:4px 0">${esc(v)}</td></tr>`)
      .join('')

    subject = `🏁 New coaching inquiry from ${esc(body.name)}`
    html = `
      <h2 style="font-family:Georgia,serif">New coaching inquiry</h2>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>
      <p style="font-family:Arial,sans-serif;font-size:14px;margin-top:16px"><strong>Message:</strong></p>
      <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;line-height:1.6">${esc(body.message)}</p>
    `
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      return json({ ok: false, error: 'Email service rejected the request.', detail }, 502)
    }
    return json({ ok: true })
  } catch {
    return json({ ok: false, error: 'Failed to send. Please try again later.' }, 500)
  }
}
