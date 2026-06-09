import { Link } from 'react-router-dom'
import Reveal from './ui/Reveal'
import PostCard from './ui/PostCard'
import { POSTS } from '../data/posts'

// Homepage snippet of the /blog page — the three latest posts using the same
// shared PostCard the full blog renders, so they look identical.

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }
const AMBER = '#F5A623'

const Arrow = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export default function BlogPreview() {
  const posts = POSTS.slice(0, 3)
  return (
    <section style={{ background: 'transparent', padding: '80px 0 100px' }}>
      <div style={WRAP}>
        <Reveal>
          <div style={{ maxWidth: 600, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 1, background: AMBER }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: AMBER, letterSpacing: '0.2em', textTransform: 'uppercase' }}>The Blog</span>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              Lessons from three decades in the sport.
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
              Practical training wisdom on swim technique, nutrition and balancing big goals with a full life.
            </p>
          </div>
        </Reveal>

        <div className="blog-grid" style={{ display: 'grid', gap: 28 }}>
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7EC8E3', fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '12px 28px', borderRadius: 100, border: '1px solid rgba(126,200,227,0.4)' }}>
            Read the blog
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
