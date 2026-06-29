import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { getPost, loadPost } from '../data/posts'
import NotFound from './NotFound'

const WRAP = { maxWidth: 800, margin: '0 auto', padding: '0 32px' }

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function showCategory(category) {
  return category && category.toLowerCase() !== 'uncategorized'
}

// Renders a Sanity post's rich-text body, styled to match the article layout.
const ptComponents = {
  block: {
    normal: ({ children }) => <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, marginBottom: 22 }}>{children}</p>,
    h2: ({ children }) => <h2 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 28, color: '#fff', margin: '36px 0 12px' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 21, color: '#fff', margin: '28px 0 10px' }}>{children}</h3>,
    blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid #C9A84C', paddingLeft: 18, margin: '24px 0', color: 'rgba(255,255,255,0.82)', fontSize: 18, lineHeight: 1.7 }}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul style={{ listStyle: 'disc', paddingLeft: 22, marginBottom: 22, color: 'rgba(255,255,255,0.8)', fontSize: 17, lineHeight: 1.8 }}>{children}</ul>,
    number: ({ children }) => <ol style={{ listStyle: 'decimal', paddingLeft: 22, marginBottom: 22, color: 'rgba(255,255,255,0.8)', fontSize: 17, lineHeight: 1.8 }}>{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: '#fff', fontWeight: 700 }}>{children}</strong>,
    link: ({ children, value }) => <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: '#7EC8E3', textDecoration: 'underline' }}>{children}</a>,
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const summary = getPost(slug)
  const [loadedPost, setLoadedPost] = useState({ slug: null, post: null })
  const hasCategory = summary ? showCategory(summary.category) : false
  const post = loadedPost.slug === slug ? loadedPost.post : null

  useEffect(() => {
    let active = true
    if (!summary) return
    loadPost(slug).then((loaded) => {
      if (active) setLoadedPost({ slug, post: loaded || undefined })
    })
    return () => {
      active = false
    }
  }, [slug, summary])

  useDocumentMeta(
    summary === undefined ? 'Page Not Found' : summary ? summary.title : 'Blog',
    summary === undefined ? 'The requested t2coaching blog post could not be found.' : summary ? summary.excerpt : undefined,
    summary === undefined
      ? { robots: 'noindex,follow' }
      : summary
        ? { canonical: `https://t2coaching.com/blog/${summary.slug}` }
        : undefined
  )

  if (!summary) return <NotFound />

  // Full article body still in flight.
  if (post === null) {
    return <section style={{ padding: '180px 0', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Loading…</section>
  }
  if (!post) return <NotFound />

  // A "coming soon" topic was opened directly, so show a friendly placeholder.
  if (post.comingSoon) {
    return (
      <>
        <section style={{ padding: '160px 0 90px', textAlign: 'center' }}>
          <div style={WRAP}>
            {hasCategory && <span style={{ fontSize: 11, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{post.category}</span>}
            <h1 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', lineHeight: 1.2, margin: '18px 0 20px' }}>{post.title}</h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 32px' }}>
              This one's still in the works ✍️. Check back soon. In the meantime, the best training advice is the kind built just for you.
            </p>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7EC8E3', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
              Back to all articles
            </Link>
          </div>
        </section>
        <CTABanner />
      </>
    )
  }

  return (
    <>
      {/* Article header */}
      <header style={{ position: 'relative', padding: '140px 0 40px', overflow: 'hidden' }}>
        {post.cover && (
          <>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${post.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,18,32,0.7), rgba(8,18,32,0.92))' }} />
          </>
        )}
        <div style={{ position: 'relative', zIndex: 2, ...WRAP }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7EC8E3', fontSize: 14, fontWeight: 600, textDecoration: 'none', marginBottom: 24 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
            All articles
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            {hasCategory && <span style={{ fontSize: 11, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{post.category}</span>}
            {post.date && <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{formatDate(post.date)}</span>}
            {post.readTime && <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{hasCategory || post.date ? '· ' : ''}{post.readTime}</span>}
          </div>
          <h1 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#fff', lineHeight: 1.15 }}>{post.title}</h1>
        </div>
      </header>

      {/* Body */}
      <article style={{ padding: '20px 0 80px' }}>
        <div style={WRAP}>
          {post.feature && (
            <Reveal>
              <GlassCard style={{ padding: '20px 24px', marginBottom: 36, borderColor: 'rgba(201,168,76,0.3)' }}>
                <p style={{ fontSize: 14, color: '#C9A84C', fontWeight: 500, lineHeight: 1.6 }}>{post.feature}</p>
              </GlassCard>
            </Reveal>
          )}

          {/* Sanity posts carry rich text in `body`; local posts use intro/exercises. */}
          {post.body && <PortableText value={post.body} components={ptComponents} />}

          {post.contentHtml && (
            <div
              className="legacy-post"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          )}

          {post.intro?.map((p, i) => (
            <p key={i} style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, marginBottom: 22 }}>{p}</p>
          ))}

          {post.exercises && (
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h2 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 28, color: '#fff', marginBottom: 4 }}>The Workout</h2>
              {post.exercises.map((ex, i) => (
                <Reveal key={ex.name} delay={(i % 2) * 0.05}>
                  <GlassCard style={{ padding: '28px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                      <span style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 22, color: 'rgba(126,200,227,0.6)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff' }}>{ex.name}</h3>
                    </div>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.74)', lineHeight: 1.75, marginBottom: 12 }}>
                      <strong style={{ color: '#7EC8E3', fontWeight: 600 }}>Why: </strong>{ex.why}
                    </p>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.74)', lineHeight: 1.75 }}>
                      <strong style={{ color: '#C9A84C', fontWeight: 600 }}>How: </strong>{ex.how}
                    </p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </article>

      <CTABanner
        title="Train with intention."
        subtitle="Every workout I write has a purpose. Want a full plan built around your race and your life? Let's talk."
      />
    </>
  )
}
