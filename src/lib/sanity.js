import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity is opt-in. Until a project ID is set (VITE_SANITY_PROJECT_ID in the
// environment / Cloudflare Pages settings), the whole site falls back to the
// hardcoded content in src/data, so nothing breaks before the CMS is wired up.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityEnabled = Boolean(projectId)

export const sanity = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      // CDN-cached reads. Content updates show up within a minute or two with no
      // redeploy, which is the whole point of giving Wendy a dashboard.
      useCdn: true,
    })
  : null

const builder = sanityEnabled ? imageUrlBuilder(sanity) : null

// Turn a Sanity image ref into a URL. Pass a width to get an optimized size.
export function urlFor(source, width) {
  if (!builder || !source) return ''
  let img = builder.image(source).auto('format').fit('max')
  if (width) img = img.width(width)
  return img.url()
}
