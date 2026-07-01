import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { POSTS } from '../src/data/posts.js'
import { FAQS } from '../src/data/faq.js'
import { SERVICES } from '../src/data/services.js'
import { getBlogSeoLinks, getBlogTopicKeywords } from '../src/data/blogSeo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const publicDir = path.join(root, 'public')

const SITE_URL = 'https://t2coaching.com'
const SITE_NAME = 't2coaching'
// Landscape 1200x630 share card — renders as a full-size preview in iMessage,
// Facebook, LinkedIn, X, etc. (the old hero was portrait and got thumbnailed).
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`
const DEFAULT_IMAGE_ALT = 'Coach Wendy Mader, 2008 Kona Ironman World Champion and founder of t2coaching'
// Regenerated on every build so static pages report an accurate <lastmod>.
const BUILD_LASTMOD = new Date().toISOString().slice(0, 10)

const STATIC_ROUTES = [
  ['/', 't2coaching – Triathlon & Endurance Coach | Kona Champion', 'Personalized triathlon, swim & run coaching by Kona Ironman World Champion Wendy Mader. 30+ years racing, 25+ years coaching, and plans built around your life.', 'World Champion Level Coaching'],
  ['/about', 'Meet Coach Wendy Mader, Kona Champion – t2coaching', 'Meet Wendy Mader, Kona Ironman World Champion and founder of t2coaching, with 30+ years of racing and 25+ years of coaching experience.', "I've been where you are, and I know the way forward."],
  ['/services', 'Triathlon, Swim, Bike & Run Coaching – t2coaching', 'Personalized triathlon, swim, run and endurance coaching options from Coach Wendy Mader, built around your goals, schedule and experience.', 'Coaching built for your life.'],
  ['/process', 'How Triathlon Coaching Works with Wendy – t2coaching', 'See how t2coaching works from the first discovery call through assessment, planning, training, feedback and race-day execution.', "What it's like to train with Wendy."],
  ['/testimonials', 'Athlete Reviews & Testimonials – t2coaching', 'Read athlete stories and testimonials from triathletes, runners and swimmers coached by Wendy Mader and t2coaching.', 'Athletes who crossed their finish lines.'],
  ['/gallery', 'Race & Coaching Photo Gallery – t2coaching', 'Photos from three decades of racing and coaching with Wendy Mader, including Kona, Ironman, open water, trails and finish lines.', 'Thirty years of racing and coaching.'],
  ['/blog', 'Triathlon & Endurance Training Blog – t2coaching', 'Training tips, swim technique, race-day nutrition and lessons from 30+ years of racing and coaching by Wendy Mader.', 'Lessons from three decades in the sport.'],
  ['/resources', 'Free Endurance Training Resources – t2coaching', 'Free endurance training resources from Coach Wendy Mader, including articles, videos, a Wall Street Journal feature and an insider guide.', 'Learn with Wendy.'],
  ['/contact', 'Contact Coach Wendy Mader – t2coaching', 'Contact Coach Wendy Mader to ask a coaching question, book a free call or start a personalized endurance training plan.', "Let's talk about your goals."],
  ['/privacy', 'Privacy Policy – t2coaching', 'Privacy details for t2coaching, including what information the site collects and how coaching inquiries are handled.', 'Privacy policy.'],
  ['/disclaimer', 'Disclaimer – t2coaching', 'Health, fitness and liability disclaimer for t2coaching, LLC. Please read before beginning any training program.', 'Health & liability disclaimer.'],
  ['/terms', 'Terms of Use – t2coaching', 'Terms of use for the t2coaching, LLC website.', 'Terms of use.'],
].map(([routePath, title, description, h1]) => ({
  path: routePath,
  title,
  description,
  h1,
  summary: description,
  lastmod: BUILD_LASTMOD,
}))

function fixText(value = '') {
  return String(value)
    .replace(/\s+/g, ' ')
    .trim()
}

function stripHtml(value = '') {
  return fixText(String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '-'))
}

function truncate(value, max = 155) {
  const text = fixText(value)
  if (text.length <= max) return text
  return `${text.slice(0, max - 3).replace(/\s+\S*$/, '')}...`
}
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function absoluteUrl(routePath) {
  if (/^https?:\/\//.test(routePath)) return routePath
  if (routePath === '/') return `${SITE_URL}/`
  return `${SITE_URL}${routePath}`
}

function routeToFile(routePath) {
  if (routePath === '/') return path.join(distDir, 'index.html')
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html')
}

function postDescription(post) {
  return truncate(post.excerpt || stripHtml(post.contentHtml) || post.title)
}

function postLastmod(post) {
  return /^\d{4}-\d{2}-\d{2}$/.test(post.date || '') ? post.date : BUILD_LASTMOD
}

// Prefer an explicit modified/updated date when a post has one, so dateModified
// reflects real edits rather than always mirroring datePublished.
function postDateModified(post) {
  const modified = post.modified || post.updated || post.dateModified
  return /^\d{4}-\d{2}-\d{2}$/.test(modified || '') ? modified : postLastmod(post)
}

function webPageSchema(route) {
  return {
    '@context': 'https://schema.org',
    '@type': route.path === '/' ? 'WebSite' : 'WebPage',
    '@id': `${absoluteUrl(route.path)}#webpage`,
    url: absoluteUrl(route.path),
    name: route.title,
    description: route.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en-US',
  }
}

function blogPostingSchema(post) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: fixText(post.title),
    description: postDescription(post),
    image: post.cover ? absoluteUrl(post.cover) : DEFAULT_IMAGE,
    datePublished: postLastmod(post),
    dateModified: postDateModified(post),
    author: { '@id': `${SITE_URL}/#wendy`, name: 'Wendy Mader' },
    publisher: { '@id': `${SITE_URL}/#business`, name: SITE_NAME },
    articleSection: post.category || 'Endurance training',
    keywords: getBlogTopicKeywords(post),
    inLanguage: 'en-US',
  }
}

// Home › Blog › Post breadcrumb so the SERP can show the trail and search
// engines understand each post's place in the hierarchy.
function postBreadcrumbSchema(post) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: fixText(post.title), item: url },
    ],
  }
}

// FAQPage for the home page — the single highest-leverage format for getting
// pulled into AI answers. Baked into the static HTML so non-JS crawlers see it.
function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

// Service + BreadcrumbList for the Services page.
function servicesSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      ],
    },
    ...SERVICES.map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.title,
      description: s.summary,
      serviceType: 'Endurance & triathlon coaching',
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: [
        { '@type': 'Place', name: 'Worldwide (online)' },
        { '@type': 'City', name: 'Atlanta, Georgia' },
      ],
      url: `${SITE_URL}/services`,
    })),
  ]
}

// Extra page-specific schema layered on top of the WebPage schema.
function extraSchemas(route) {
  if (route.path === '/') return [faqPageSchema()]
  if (route.path === '/services') return servicesSchemas()
  return []
}

function replaceOrInsertHead(html, route, schemas) {
  const url = absoluteUrl(route.path)
  const image = route.image || DEFAULT_IMAGE
  // A post with its own cover describes it with the post title; everything else
  // falls back to the default share-card alt.
  const usesCustomCover = Boolean(route.image && route.post)
  const imageAlt = usesCustomCover ? fixText(route.post.title) : DEFAULT_IMAGE_ALT
  // We only know the dimensions of the default 1200x630 card. For a post's own
  // cover (unknown size) strip the width/height hints rather than assert wrong
  // ones — platforms will read the real dimensions from the image itself.
  const dimensionTag = (prop, value) => usesCustomCover
    ? ''
    : `<meta property="og:image:${prop}" content="${value}" />`
  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`],
    [/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(route.description)}" />`],
    [/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${route.robots || 'index,follow'}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`],
    [/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`],
    [/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${route.type || 'website'}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`],
    [/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${image}" />`],
    [/<meta property="og:image:width" content="[^"]*"\s*\/?>/, dimensionTag('width', 1200)],
    [/<meta property="og:image:height" content="[^"]*"\s*\/?>/, dimensionTag('height', 630)],
    [/<meta property="og:image:type" content="[^"]*"\s*\/?>/, usesCustomCover ? '' : '<meta property="og:image:type" content="image/jpeg" />'],
    [/<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`],
    [/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`],
    [/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${image}" />`],
    [/<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/, `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`],
    [/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`],
  ]

  let out = replacements.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), html)
  const scriptTags = schemas
    .map((s) => `    <script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n')
  out = out.replace('</head>', `\n${scriptTags}\n  </head>`)
  return out
}

function seoLinkList(route) {
  if (!route.post) return ''

  const { service, supportLinks, relatedPosts } = getBlogSeoLinks(route.post, POSTS)
  const links = [
    service,
    ...supportLinks,
    ...relatedPosts.map((post) => ({
      label: post.title,
      to: `/blog/${post.slug}`,
      description: post.excerpt,
    })),
  ]

  return `<nav aria-label="Related t2coaching resources"><h2>Related t2coaching resources</h2><ul>${links.map((link) => `<li><a href="${absoluteUrl(link.to)}">${escapeHtml(link.label || link.title)}</a><p>${escapeHtml(link.description || '')}</p></li>`).join('')}</ul></nav>`
}

function rootContent(route) {
  return `<main class="seo-shell" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden"><h1>${escapeHtml(route.h1 || route.title)}</h1><p>${escapeHtml(route.summary || route.description)}</p>${seoLinkList(route)}</main>`
}

function writeRoute(template, route, schemas) {
  const file = routeToFile(route.path)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const html = replaceOrInsertHead(template, route, schemas)
    .replace('<div id="root"></div>', `<div id="root">${rootContent(route)}</div>`)
  fs.writeFileSync(file, html)
}

function sitemapXml(routes) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
  routes.forEach((route) => {
    lines.push('  <url>')
    lines.push(`    <loc>${absoluteUrl(route.path)}</loc>`)
    lines.push(`    <lastmod>${route.lastmod || BUILD_LASTMOD}</lastmod>`)
    lines.push('  </url>')
  })
  lines.push('</urlset>')
  return `${lines.join('\n')}\n`
}

function redirectFile() {
  const lines = [
    '# Canonicalize the domain: force the apex (non-www) host so ranking signals',
    "# don't split between www and non-www. https is already forced by the host.",
    'https://www.t2coaching.com/*  https://t2coaching.com/:splat  301!',
    '',
    '# Legacy WordPress blog paths -> new /blog',
    '/blogs    /blog   301',
    '/blogs/   /blog   301',
    '/blogs/*  /blog/:splat  301',
    '',
  ]

  POSTS.forEach((post) => {
    lines.push(`/${post.slug}  /blog/${post.slug}  301`)
    lines.push(`/${post.slug}/  /blog/${post.slug}  301`)
  })

  lines.push('', '# Unknown paths should be true 404s.', '/*    /404.html   404', '')
  return lines.join('\n')
}

function notFoundHtml(template) {
  const route = {
    path: '/404',
    title: 'Page Not Found – t2coaching',
    description: 'The requested t2coaching page could not be found.',
    robots: 'noindex,follow',
    h1: 'Page not found',
    summary: 'The requested page may have moved or the address may be incorrect.',
  }
  return replaceOrInsertHead(template, route, [webPageSchema(route)])
    .replace('<div id="root"></div>', `<div id="root">${rootContent(route)}</div>`)
}

if (!fs.existsSync(distDir)) {
  throw new Error('dist/ does not exist. Run vite build before generate-seo.')
}

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
const postRoutes = POSTS.map((post) => ({
  path: `/blog/${post.slug}`,
  title: `${fixText(post.title)} – ${SITE_NAME}`,
  description: postDescription(post),
  image: post.cover ? absoluteUrl(post.cover) : DEFAULT_IMAGE,
  type: 'article',
  h1: fixText(post.title),
  summary: postDescription(post),
  lastmod: postLastmod(post),
  post,
}))
const routes = [...STATIC_ROUTES, ...postRoutes]

routes.forEach((route) => {
  const schemas = route.post
    ? [blogPostingSchema(route.post), postBreadcrumbSchema(route.post)]
    : [webPageSchema(route), ...extraSchemas(route)]
  writeRoute(template, route, schemas)
})

fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml(template))
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml(routes))
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml(routes))
fs.writeFileSync(path.join(distDir, '_redirects'), redirectFile())

console.log(`Generated SEO HTML for ${routes.length} routes.`)
