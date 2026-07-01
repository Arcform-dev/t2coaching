import { useEffect, useState } from 'react'
import { sanity, sanityEnabled, urlFor } from './sanity'
import { TESTIMONIALS as LOCAL_TESTIMONIALS } from '../data/testimonials'
import { GALLERY as LOCAL_GALLERY } from '../data/gallery'

// Each hook returns the content array, or `null` while a Sanity fetch is in
// flight. When Sanity isn't configured it returns the local fallback
// synchronously, so the site behaves exactly as before.

function useSanityContent(query, mapper, fallback, params) {
  const [data, setData] = useState(sanityEnabled ? null : fallback)

  useEffect(() => {
    if (!sanityEnabled) return
    let active = true
    sanity
      .fetch(query, params || {})
      .then((res) => { if (active) setData((res || []).map(mapper)) })
      .catch(() => { if (active) setData(fallback) })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}

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
