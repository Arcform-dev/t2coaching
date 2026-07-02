import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import { POSTS } from '../data/posts'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }
const PAGE_SIZE = 15
// How many category chips to surface. The long tail stays reachable via search.
const MAX_CHIPS = 8

function showCategory(category) {
  return category && category.toLowerCase() !== 'uncategorized'
}

// Top categories by post count, so the busiest filters are one click away.
function topCategories(posts) {
  const counts = new Map()
  for (const post of posts) {
    if (!showCategory(post.category)) continue
    counts.set(post.category, (counts.get(post.category) || 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_CHIPS)
    .map(([name]) => name)
}

function PostCard({ post }) {
  const hasCategory = showCategory(post.category)
  const inner = (
    <GlassCard style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {post.cover && (
        <div style={{ position: 'relative', aspectRatio: '16/10', background: '#0D2B3E', overflow: 'hidden' }}>
          <img src={post.cover} alt={post.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {post.comingSoon && (
            <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(8,18,32,0.85)', color: '#C9A84C', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 0, letterSpacing: '0.04em' }}>
              Coming Soon
            </span>
          )}
        </div>
      )}
      <div style={{ padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          {hasCategory && <span style={{ fontSize: 11, fontWeight: 600, color: '#7EC8E3', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{post.category}</span>}
          {post.readTime && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{hasCategory ? '· ' : ''}{post.readTime}</span>}
        </div>
        <h3 style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 20, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.64)', lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>
        <div style={{ marginTop: 18 }}>
          {post.comingSoon ? (
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>In the works ✍️</span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#C9A84C' }}>
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

function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: 'none',
        cursor: 'pointer',
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.02em',
        padding: '9px 18px',
        borderRadius: 0,
        border: active ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.16)',
        background: active ? '#C9A84C' : 'rgba(8,18,32,0.5)',
        color: active ? '#081220' : 'rgba(255,255,255,0.72)',
        transition: 'all 0.18s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

export default function Blog() {
  useDocumentMeta('Triathlon & Endurance Training Blog', 'Training tips, swim technique, race-day nutrition and lessons from 30+ years of racing, from Coach Wendy Mader.')

  const categories = useMemo(() => ['All', ...topCategories(POSTS)], [])
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return POSTS.filter((post) => {
      if (activeCategory !== 'All' && post.category !== activeCategory) return false
      if (!q) return true
      return (
        (post.title && post.title.toLowerCase().includes(q)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
        (post.category && post.category.toLowerCase().includes(q))
      )
    })
  }, [activeCategory, query])

  const visible = filtered.slice(0, visibleCount)
  const remaining = filtered.length - visible.length

  // Any change to the filters starts the list back at the top of the results.
  function selectCategory(cat) {
    setActiveCategory(cat)
    setVisibleCount(PAGE_SIZE)
  }
  function onSearch(e) {
    setQuery(e.target.value)
    setVisibleCount(PAGE_SIZE)
  }

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
          {/* Search */}
          <div style={{ maxWidth: 520, margin: '0 auto 26px', position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={onSearch}
              placeholder="Search articles…"
              aria-label="Search articles"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px 18px 14px 48px',
                fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
                fontSize: 15,
                color: '#fff',
                background: 'rgba(8,18,32,0.7)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 0,
                outline: 'none',
              }}
            />
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 40 }}>
            {categories.map((cat) => (
              <Chip key={cat} label={cat} active={activeCategory === cat} onClick={() => selectCategory(cat)} />
            ))}
          </div>

          {visible.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 16, padding: '40px 0' }}>
              No articles match your search. Try a different keyword or category.
            </p>
          ) : (
            <div className="blog-grid" style={{ display: 'grid', gap: 28 }}>
              {visible.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}

          {remaining > 0 && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                style={{
                  appearance: 'none',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  padding: '15px 34px',
                  borderRadius: 0,
                  border: '1px solid rgba(201,168,76,0.6)',
                  background: 'transparent',
                  color: '#C9A84C',
                  transition: 'all 0.18s ease',
                }}
              >
                Load more <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>({visible.length} of {filtered.length})</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Want coaching, not just tips?"
        subtitle="Articles are a great start, but a plan built for you is how progress happens. Book a free call."
      />
    </>
  )
}
