const STOP_WORDS = new Set([
  'about', 'after', 'again', 'also', 'and', 'are', 'because', 'been', 'being',
  'but', 'can', 'for', 'from', 'has', 'have', 'how', 'into', 'more', 'not',
  'now', 'our', 'out', 'that', 'the', 'their', 'then', 'there', 'this', 'with',
  'what', 'when', 'where', 'which', 'who', 'why', 'will', 'you', 'your',
])

const TOPIC_RULES = [
  {
    id: 'swim',
    label: 'Swim technique',
    serviceTitle: 'Private Swim, Bike or Run Lessons',
    servicePath: '/services#lessons',
    serviceCopy:
      'If swimming is your limiter, Wendy can pair video analysis with targeted drills so you know exactly what to change.',
    ctaCopy:
      'Get swim feedback from a coach who raced Kona and coached adults from first open-water starts to Ironman finishes.',
    keywords: ['swim', 'swimming', 'freestyle', 'stroke', 'pool', 'open water', 'wetsuit', 'breathing', 'kick'],
  },
  {
    id: 'bike',
    label: 'Bike training',
    serviceTitle: 'Multisport & Single-Sport Coaching',
    servicePath: '/services#coaching',
    serviceCopy:
      'Cycling progress comes from the right mix of frequency, intensity, skills, recovery, and race-day execution.',
    ctaCopy:
      'Build bike fitness inside a plan that also respects your schedule, recovery, and larger race goals.',
    keywords: ['bike', 'biking', 'cycling', 'cyclist', 'power', 'pedal', 'ride', 'riding', 'trainer'],
  },
  {
    id: 'run',
    label: 'Run training',
    serviceTitle: 'Multisport & Single-Sport Coaching',
    servicePath: '/services#coaching',
    serviceCopy:
      'Run gains last longer when the training load, strength work, recovery, and race goals all fit together.',
    ctaCopy:
      'Use Wendy\'s coaching to turn running advice into a realistic plan for your body and calendar.',
    keywords: ['run', 'running', 'runner', 'marathon', 'half marathon', 'ultra', 'trail', '5k', '10k', 'pace'],
  },
  {
    id: 'nutrition',
    label: 'Fueling and recovery',
    serviceTitle: 'Multisport & Single-Sport Coaching',
    servicePath: '/services#coaching',
    serviceCopy:
      'Fueling, recovery, strength, and pacing are part of the coaching plan, not separate guesses on race week.',
    ctaCopy:
      'Turn scattered nutrition and recovery notes into a training plan with a purpose behind each session.',
    keywords: ['nutrition', 'fuel', 'fueling', 'recovery', 'protein', 'carb', 'hydrate', 'hydration', 'taper'],
  },
  {
    id: 'triathlon',
    label: 'Triathlon coaching',
    serviceTitle: 'Multisport & Single-Sport Coaching',
    servicePath: '/services#coaching',
    serviceCopy:
      'Triathlon coaching connects swim, bike, run, strength, recovery, and race-day strategy into one plan.',
    ctaCopy:
      'Get a training plan that adapts to your life instead of trying to force your life around a template.',
    keywords: ['triathlon', 'ironman', '70.3', 'kona', 'transition', 'race day', 'multisport', 'duathlon'],
  },
]

const DEFAULT_TOPIC = TOPIC_RULES.find((topic) => topic.id === 'triathlon')

export const BLOG_SUPPORT_LINKS = [
  {
    label: 'See coaching services',
    to: '/services',
    description: 'Compare ongoing coaching, private technique sessions, and custom training plans.',
  },
  {
    label: 'How coaching works',
    to: '/process',
    description: 'See how Wendy builds, reviews, and adapts your training around your life.',
  },
  {
    label: 'Free endurance resources',
    to: '/resources',
    description: 'Use the guide, videos, and featured articles to keep learning between sessions.',
  },
]

function normalize(value = '') {
  return String(value).toLowerCase().replace(/&nbsp;/g, ' ')
}

function textForPost(post) {
  return normalize([
    post?.title,
    post?.category,
    post?.excerpt,
    post?.feature,
  ].filter(Boolean).join(' '))
}

function tokenize(value = '') {
  return normalize(value)
    .replace(/[^a-z0-9.]+/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
}

export function getBlogTopic(post) {
  const text = textForPost(post)
  const scored = TOPIC_RULES.map((topic) => ({
    topic,
    score: topic.keywords.reduce((sum, keyword) => (
      text.includes(keyword) ? sum + (keyword.includes(' ') ? 3 : 1) : sum
    ), 0),
  })).sort((a, b) => b.score - a.score)

  return scored[0]?.score > 0 ? scored[0].topic : DEFAULT_TOPIC
}

export function getBlogTopicKeywords(post) {
  const topic = getBlogTopic(post)
  const titleWords = tokenize(post?.title).slice(0, 6)
  return [...new Set([topic.label, post?.category, ...titleWords].filter(Boolean))]
}

export function getRelatedPosts(currentPost, posts, limit = 3) {
  const currentText = textForPost(currentPost)
  const currentTokens = new Set(tokenize(currentText))
  const currentTopic = getBlogTopic(currentPost)

  return posts
    .filter((post) => post.slug && post.slug !== currentPost.slug && !post.comingSoon)
    .map((post) => {
      const candidateText = textForPost(post)
      const candidateTokens = tokenize(candidateText)
      const overlap = candidateTokens.filter((word) => currentTokens.has(word)).length
      const sameCategory = post.category && currentPost.category && post.category === currentPost.category ? 8 : 0
      const sameTopic = getBlogTopic(post).id === currentTopic.id ? 5 : 0
      const titleMatch = tokenize(post.title).filter((word) => currentTokens.has(word)).length * 2
      const recentBoost = post.date ? Math.max(0, Number(post.date.slice(0, 4)) - 2010) / 30 : 0

      return {
        post,
        score: overlap + sameCategory + sameTopic + titleMatch + recentBoost,
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (b.post.date || '').localeCompare(a.post.date || ''))
    .slice(0, limit)
    .map((item) => item.post)
}

export function getBlogSeoLinks(post, posts) {
  const topic = getBlogTopic(post)
  return {
    topic,
    service: {
      title: topic.serviceTitle,
      to: topic.servicePath,
      description: topic.serviceCopy,
    },
    ctaCopy: topic.ctaCopy,
    supportLinks: BLOG_SUPPORT_LINKS,
    relatedPosts: getRelatedPosts(post, posts),
  }
}
