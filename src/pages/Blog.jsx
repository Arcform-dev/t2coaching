import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { POSTS } from '../data/posts'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

function PostCard({ post }) {
  const inner = (
    <GlassCard style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '16/10', background: '#0D2B3E', overflow: 'hidden' }}>
        {post.cover ? (
          <img src={post.cover} alt={post.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(126,200,227,0.5)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
          </div>
        )}
        {post.comingSoon && (
          <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(8,18,32,0.85)', color: '#F5A623', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 100, letterSpacing: '0.04em' }}>
            Coming Soon
          </span>
        )}
      </div>
      <div style={{ padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#7EC8E3', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{post.category}</span>
          {post.readTime && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>· {post.readTime}</span>}
        </div>
        <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.64)', lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>
        <div style={{ marginTop: 18 }}>
          {post.comingSoon ? (
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>In the works ✍️</span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#F5A623' }}>
              Read article
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  )

  if (post.comingSoon) {
    return <div style={{ opacity: 0.78, height: '100%' }}>{inner}</div>
  }
  return <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{inner}</Link>
}

export default function Blog() {
  useDocumentMeta('Blog', 'Training tips, swim technique, race-day nutrition and lessons from 30+ years of racing — from Coach Wendy Mader.')

  return (
    <>
      <PageHeader
        eyebrow="The Blog"
        title="Lessons from"
        titleAccent="three decades in the sport."
        subtitle="Practical training wisdom on swim technique, nutrition, injury prevention and balancing big goals with a full life."
      />

      <section style={{ padding: '50px 0 90px' }}>
        <div style={WRAP}>
          <div className="blog-grid" style={{ display: 'grid', gap: 28 }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Want coaching, not just tips?"
        subtitle="Articles are a great start — but a plan built for you is how the real progress happens. Book a free call."
      />
    </>
  )
}
