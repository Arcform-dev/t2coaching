import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import { SOCIALS, WSJ_FEATURE, PODCAST, NEWSLETTER } from '../data/siteContent'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

const youtube = SOCIALS.find(s => s.label === 'YouTube')?.url
const instagram = SOCIALS.find(s => s.label === 'Instagram')?.url
const facebook = SOCIALS.find(s => s.label === 'Facebook')?.url

const RESOURCES = [
  {
    title: 'The Newsletter',
    desc: "Training tips, race lessons and what I'm working on with athletes, sent straight to your inbox. Free to join.",
    cta: 'Sign up free',
    href: NEWSLETTER.url,
    icon: 'M3 6h18v12H3zM3 7l9 6 9-6',
  },
  {
    title: 'Training Articles',
    desc: 'Swim technique, race-day nutrition, injury prevention, and more. Practical reads from 30+ years in the sport.',
    cta: 'Read the blog',
    to: '/blog',
    icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z',
  },
  {
    title: 'YouTube: 200+ Videos',
    desc: 'In-depth technique breakdowns, workouts and race insights. Subscribe and learn at your own pace.',
    cta: 'Watch on YouTube',
    href: youtube,
    icon: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z',
  },
  {
    title: `Featured in ${WSJ_FEATURE.outlet}`,
    desc: WSJ_FEATURE.blurb,
    cta: 'Read the feature',
    href: WSJ_FEATURE.url,
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h7l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z',
  },
  {
    title: `The ${PODCAST.name} Podcast`,
    desc: 'My show on training, fueling, recovery and staying healthy while you chase big goals. Listen on whichever app you already use.',
    links: [
      { label: 'Apple Podcasts', href: PODCAST.apple },
      { label: 'Spotify', href: PODCAST.spotify },
    ],
    icon: 'M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zM19 11a7 7 0 01-14 0M12 18v4M8 22h8',
  },
  {
    title: 'Instagram',
    desc: 'Day-to-day training, race updates and behind-the-scenes from athletes around the world.',
    cta: 'Follow @t2coachwendy',
    href: instagram,
    icon: 'M12 2.2c3.2 0 3.6 0 4.9.07 3.2.15 4.7 1.7 4.9 4.9.06 1.3.07 1.6.07 4.8s0 3.6-.07 4.8c-.15 3.2-1.7 4.8-4.9 4.9-1.3.06-1.6.07-4.9.07s-3.6 0-4.8-.07c-3.3-.15-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.3 2.2 12s0-3.6.07-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.4a6.4 6.4 0 100 12.8 6.4 6.4 0 000-12.8zm0 10.6a4.2 4.2 0 110-8.4 4.2 4.2 0 010 8.4zm6.6-10.9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  },
  {
    title: 'Facebook',
    desc: "Join the community, follow race recaps, and keep up with everything happening at t2coaching.",
    cta: 'Follow on Facebook',
    href: facebook,
    icon: 'M24 12a12 12 0 10-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3H15.8c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0024 12z',
  },
]

const ARROW = (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
)

function ResourceCard({ r }) {
  const body = (
    <GlassCard style={{ padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column' }} className="resource-card">
      <div style={{ width: 50, height: 50, borderRadius: 0, background: 'rgba(126,200,227,0.12)', color: '#7EC8E3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon} /></svg>
      </div>
      <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 19, color: '#fff', marginBottom: 12 }}>{r.title}</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{r.desc}</p>

      {/* One destination gets a plain label (the whole card is the link). Cards
          with several places to go carry their own links instead, since an
          anchor cannot be nested inside another anchor. */}
      {r.links ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {r.links.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 13, fontWeight: 600, color: '#C9A84C', textDecoration: 'none',
              padding: '9px 14px', border: '1px solid rgba(201,168,76,0.4)',
            }}>
              {l.label}
              {ARROW}
            </a>
          ))}
        </div>
      ) : (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#C9A84C' }}>
          {r.cta}
          {ARROW}
        </span>
      )}
    </GlassCard>
  )
  if (r.links) return body
  if (r.to) return <Link to={r.to} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{body}</Link>
  return <a href={r.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{body}</a>
}

const GUIDE_POINTS = [
  'Proven running tweaks that make you faster with zero extra training',
  '10 performance-killing habits that pros avoid before every race',
  'Game-changing nutrition and training the top athletes actually use',
  'A behind-the-curtain look at racing big global competitions',
]

function GuideSignup() {
  return (
    <GlassCard style={{
      padding: 'clamp(32px, 5vw, 52px)',
      borderColor: 'rgba(201,168,76,0.35)',
      background: '#0D2B3E',
    }}>
      <div className="story-grid" style={{ display: 'grid', gap: 40, alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Free Insider's Guide</span>
          <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: '#fff', margin: '14px 0 16px', lineHeight: 1.2 }}>
            How world-class athletes stay on top without overtraining.
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {GUIDE_POINTS.map((g, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: 2 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.84)', lineHeight: 1.55 }}>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/t2coaching-insiders-guide.pdf" download style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: '#C9A84C', color: '#0D2B3E', fontSize: 16, fontWeight: 700,
            padding: '16px 30px', borderRadius: 0, textDecoration: 'none',
          }}>
            Download the Free Guide
            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
          </a>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.64)', textAlign: 'center', marginTop: 14 }}>Free PDF · no email required.</p>
        </div>
      </div>
    </GlassCard>
  )
}

export default function Resources() {
  useDocumentMeta('Free Endurance Training Resources', 'Free training resources from Coach Wendy Mader: the Wellness Made Easy podcast, her newsletter, articles, videos, her WSJ feature, and a free insider guide.')

  return (
    <>
      <PageHeader
        eyebrow="Free Resources"
        title="Learn with me,"
        titleAccent="for free."
        subtitle="The podcast, the newsletter, articles, videos, and the same hard-won lessons I share with my athletes. Dive in, and grab the free guide while you're here."
      />

      <section style={{ padding: '50px 0 70px' }}>
        <div style={WRAP}>
          <div className="resources-grid" style={{ display: 'grid', gap: 24 }}>
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 0.07}><ResourceCard r={r} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 100px' }}>
        <div style={WRAP}>
          <Reveal><GuideSignup /></Reveal>
        </div>
      </section>
    </>
  )
}
