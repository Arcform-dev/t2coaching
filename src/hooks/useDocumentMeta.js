import { useEffect } from 'react'

const BASE_TITLE = 't2coaching'
const SITE_URL = 'https://t2coaching.com'
const DEFAULT_DESCRIPTION =
  'Personalized triathlon, swim, run and endurance coaching by Kona Ironman Champion Wendy Mader.'

function upsertMeta(selector, attributes) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }
  Object.entries(attributes).forEach(([name, value]) => tag.setAttribute(name, value))
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

// Per-route SEO metadata for the client-rendered app.
export default function useDocumentMeta(title, description = DEFAULT_DESCRIPTION, options = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} - ${BASE_TITLE}` : `${BASE_TITLE} - Coached by a Kona Champion`
    const url = options.canonical || `${SITE_URL}${window.location.pathname}`
    const image = options.image || `${SITE_URL}/wendy-hero.jpg`
    const robots = options.robots || 'index,follow'

    document.title = fullTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: options.type || 'website' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
    upsertLink('canonical', url)
  }, [title, description, options.canonical, options.image, options.robots, options.type])
}
