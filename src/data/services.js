// Wendy's real coaching services & pricing (from her intake form).
// `icon` is a key resolved to an SVG in the components that render services.

export const FREE_OFFER = {
  label: 'Free 15-Minute Discovery Call',
  body:
    "Not sure where to start? Book a free 15-minute call. We'll talk through where you are, where you want to go, and whether we're the right fit — no sales pitch, just a real conversation.",
}

export const SERVICES = [
  {
    id: 'coaching',
    badge: 'Most Popular',
    badgeColor: '#C9A84C',
    icon: 'clock',
    title: 'Multisport & Single-Sport Coaching',
    price: '$300',
    cadence: '/ month',
    summary:
      'Full personalized coaching across triathlon, duathlon, or a single discipline — built around your schedule, your goals, and your life.',
    includes: [
      'Custom training delivered through TrainingPeaks',
      'Plan that adapts every week to your life and progress',
      'Unlimited communication & workout feedback',
      'Race-day strategy and pacing from a Kona champion',
      'Swim technique, strength, nutrition & mental prep woven in',
    ],
  },
  {
    id: 'lessons',
    badge: null,
    icon: 'whistle',
    title: 'Private Swim, Bike or Run Lessons',
    price: '$150',
    cadence: 'first lesson · $75 follow-ups',
    summary:
      'One-on-one technique sessions with an Ironman-certified, collegiate-level swim coach. Ideal for a focused breakthrough before race day.',
    includes: [
      'Video stroke / gait analysis',
      'Targeted drills for your specific weakness',
      'Swim, bike, or run — your choice',
      'In person locally, or remotely via video',
      'Discounted $75 rate on every follow-up session',
    ],
  },
  {
    id: 'plan',
    badge: 'Budget Friendly',
    badgeColor: '#F5A623',
    icon: 'calendar',
    title: '12-Week Custom Training Plan',
    price: '$300',
    cadence: 'one-time',
    summary:
      'A fully customized 12-week plan after a one-on-one phone consult. A structured, periodized roadmap to your goal race at an accessible price.',
    includes: [
      'Kickoff phone consultation',
      'Custom, periodized 12-week plan built for your race',
      'Sport-specific workouts with clear purpose',
      "Wendy's signature race-day strategy",
      'One-time payment (plan delivered as-is, no revisions)',
    ],
  },
]

// "How coaching works" — steps strip on the Services page
export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Free discovery call',
    body: 'A relaxed 15-minute conversation about your goals, your history, and whether we click.',
  },
  {
    step: '02',
    title: 'Assessment',
    body: 'We dig into your fitness, schedule, strengths and weaknesses to set a realistic, motivating target.',
  },
  {
    step: '03',
    title: 'Your custom plan',
    body: 'I build a periodized plan in TrainingPeaks — every session with a specific purpose, fit to your real life.',
  },
  {
    step: '04',
    title: 'Ongoing coaching',
    body: 'We stay in constant communication, review your workouts, and adjust as life happens. You execute; I guide.',
  },
]

// "Who I coach" — audience chips
export const WHO_I_COACH = [
  'Complete beginners (your first 5k or first triathlon)',
  'Intermediate athletes chasing a new PR',
  'Advanced & podium-driven competitors',
  'Kona & 70.3 World Championship hopefuls',
  'Masters athletes (40+)',
  'First-time marathoners & ultra runners',
  'Adults learning to swim for their first Ironman',
  'Accountability-only & health-focused clients',
]
