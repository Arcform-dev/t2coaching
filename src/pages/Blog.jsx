import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/ui/CTABanner'
import PostCard from '../components/ui/PostCard'
import { POSTS } from '../data/posts'

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 32px' }

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
