import { useEffect } from 'react'

// Injects a JSON-LD <script> into <head> for the lifetime of the page that
// renders it, then removes it on unmount so schema never leaks between routes.
// Core sitewide schema (Organization/Person/WebSite) lives statically in
// index.html; this is for page-specific graphs (Service, FAQPage, etc).
export default function JsonLd({ data }) {
  useEffect(() => {
    if (!data) return
    const tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.textContent = JSON.stringify(data)
    document.head.appendChild(tag)
    return () => {
      document.head.removeChild(tag)
    }
  }, [data])

  return null
}
