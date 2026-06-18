import { useEffect, useState } from 'react'
import { sanity, sanityEnabled, urlFor } from './sanity'
import { TESTIMONIALS as LOCAL_TESTIMONIALS } from '../data/testimonials'
import { GALLERY as LOCAL_GALLERY } from '../data/gallery'
import { POSTS as LOCAL_POSTS } from '../data/posts'

// Each hook returns the content array, or `null` while a Sanity fetch is in
// flight. When Sanity isn't configured it returns the local fallback
// synchronously, so the site behaves exactly as before. Components should treat
// `null` as "loading".

function useSanityContent(query, mapper, fallback, params) {
  const [data, setData] = useState(sanityEnabled ? null : fallback)

  useEffect(() => {
    if (!sanityEnabled) return
    let active = true
    sanity
      .fetch(query, params || {})
      .then((res) => { if (active) setData((res || []).map(mapper)) })
      // If Sanity is unreachable, degrade to the local content rather than an
      // empty page.
      .catch(() => { if (active) setData(fallback) })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}

// ── Testimonials ────────────────────────────────────────────────────────────
const TESTIMONIALS_QUERY =
  '*[_type == "testimonial"]|order(coalesce(order, 999) asc, _createdAt asc){name, tag, excerpt, full, photo}'

const mapTestimonial = (t) => ({
  name: t.name,
  tag: t.tag,
  excerpt: t.excerpt,
  full: t.full || [],
  photo: t.photo ? urlFor(t.photo, 160) : '',
})

export function useTestimonials() {
  return useSanityContent(TESTIMONIALS_QUERY, mapTestimonial, LOCAL_TESTIMONIALS)
}

// ── Gallery ─────────────────────────────────────────────────────────────────
const GALLERY_QUERY =
  '*[_type == "galleryImage"]|order(coalesce(order, 999) asc, _createdAt asc){caption, span, image}'

const mapGalleryItem = (g) => ({
  src: g.image ? urlFor(g.image, 1400) : '',
  caption: g.caption || '',
  span: Boolean(g.span),
})

export function useGallery() {
  return useSanityContent(GALLERY_QUERY, mapGalleryItem, LOCAL_GALLERY)
}

// ── Blog posts ──────────────────────────────────────────────────────────────
// Sanity posts carry `body` as Portable Text and are tagged source: 'sanity'.
// Local posts keep their bespoke structure (intro/exercises) and source: 'local'
// so BlogPost can pick the right renderer.
const POSTS_QUERY =
  `*[_type == "post"]|order(coalesce(date, _createdAt) desc){
    "slug": slug.current, title, category, date, readTime, excerpt,
    comingSoon, body, cover
  }`

const mapPost = (p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  date: p.date,
  readTime: p.readTime,
  excerpt: p.excerpt,
  comingSoon: Boolean(p.comingSoon),
  body: p.body || null,
  cover: p.cover ? urlFor(p.cover, 1600) : '',
  source: 'sanity',
})

const LOCAL_POSTS_TAGGED = LOCAL_POSTS.map((p) => ({ ...p, source: 'local' }))

export function usePosts() {
  return useSanityContent(POSTS_QUERY, mapPost, LOCAL_POSTS_TAGGED)
}

// Single post by slug. Falls back to the local post list when Sanity is off.
export function usePost(slug) {
  // null = loading (Sanity in flight), undefined = not found, object = found.
  const [post, setPost] = useState(
    sanityEnabled ? null : LOCAL_POSTS_TAGGED.find((p) => p.slug === slug)
  )

  useEffect(() => {
    if (!sanityEnabled) return
    let active = true
    sanity
      .fetch(`*[_type == "post" && slug.current == $slug][0]{
        "slug": slug.current, title, category, date, readTime, excerpt,
        comingSoon, body, cover
      }`, { slug })
      .then((res) => { if (active) setPost(res ? mapPost(res) : undefined) })
      .catch(() => {
        if (active) setPost(LOCAL_POSTS_TAGGED.find((p) => p.slug === slug) || undefined)
      })
    return () => { active = false }
  }, [slug])

  return post // null = loading, undefined = not found, object = found
}
