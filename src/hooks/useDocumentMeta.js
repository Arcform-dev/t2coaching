import { useEffect } from 'react'

const BASE_TITLE = 't2coaching'

// Basic per-route SEO: sets the document title and meta description on mount.
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — Coached by a Kona Champion`

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
