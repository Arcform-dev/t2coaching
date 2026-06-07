// ── Single source of truth for T2 Coaching site content ──────────────────────
// All copy here is from Wendy Mader's own intake/content documents.

export const BOOKING_URL = 'https://t2coaching.com/calendar/'

export const CONTACT = {
  preferredName: 'Coach Wendy',
  fullName: 'Wendy Mader',
  business: 't2coaching, LLC',
  email: 't2coachwendy@gmail.com',
  phone: '(970) 308-4499',
  phoneHref: 'tel:+19703084499',
  location: 'Marietta, GA',
  reach: 'Coaching athletes worldwide via Zoom — plus in-person at races and locally in Atlanta.',
}

export const SOCIALS = [
  { label: 'Instagram', handle: '@t2coachwendy', url: 'https://www.instagram.com/t2coachwendy/' },
  { label: 'Facebook',  handle: 'Wendy Mader',   url: 'https://www.facebook.com/wendy.mader.7' },
  { label: 'YouTube',   handle: '@WendyMader',    url: 'https://www.youtube.com/@WendyMader' },
]

// Headline stats — shown in the Hero (3) and the Stats band (4).
export const HERO_STATS = [
  { num: '2008', label: 'Kona Amateur Champion' },
  { num: '26yr', label: 'Coaching Athletes' },
  { num: '21×',  label: 'Ironman Finisher' },
]

export const STATS = [
  { value: 30,   suffix: '+', label: 'Years Competing',   sub: 'Globally, across three decades' },
  { value: 26,   suffix: '',  label: 'Years Coaching',     sub: 'Founder & head coach of T2' },
  { value: 1000, suffix: '+', label: 'Athletes Coached',   sub: 'From first 5k to Kona qualifiers' },
  { value: 1,    suffix: '',  label: 'Kona Champion',      sub: '2008 Overall Amateur Winner' },
]

// Short tagline used across the site
export const TAGLINE =
  'Personalized swim, run & triathlon coaching built around your life — by a Kona Ironman World Champion.'

// Wendy's first-person story (About page) — condensed from her own words.
export const STORY = [
  "Hi, I'm Wendy Mader. I've been swimming since my teenage years and racing since the '90s — more than 30 years now. I was born and raised in Colorado and now live just outside Atlanta in Marietta, Georgia.",
  "My journey started as a collegiate swimmer at Eastern Michigan University, when I was invited to swim the relay leg of a triathlon. After watching my biker and runner friends finish the race, I thought, \"I could do all of that myself.\" That single thought set the course for the next 30+ years of my life.",
  "After finishing my first-ever Ironman in 1997, I was hooked. But the internet didn't really exist back then, so I learned about overtraining the hard way — I didn't rest, I piled on more, and within a year I was in the worst shape of my life, barely able to walk without losing my breath. I'll never forget the look in the mirror when I saw how far I'd let myself go.",
  "Thankfully, I climbed out of that hole — and in 2008 I won the Overall Amateur title at the Ironman World Championships in Kona, Hawaii. That contrast, between nearly losing the sport I loved and standing at the very top of it, became the 'why' behind starting T2 Coaching more than two decades ago.",
  "I have a Master's degree in Exercise & Sport Science, and I've spent my career helping athletes get healthy, build fitness, and perform — whether that means walking a first 5k, finishing an Ironman, or running a 100-mile ultra. I'm still out there racing too: I've completed the Run Rabbit Run 100, the Georgia Death Race, and plenty of ultras. I prescribe workouts based on science and lived experience, because I swim the swim, bike the bike, and run the run right alongside you.",
]

// The meaning behind the name
export const NAME_MEANING = {
  title: 'Why "t2"?',
  body:
    "In triathlon, T2 is the second transition — the moment an athlete racks the bike and changes into their running gear to push toward the finish. That's exactly what coaching with me is about: helping you transition to the next level with personalized, experience-based guidance — pushing your body to its full potential without compromising family, time, or your long-term health.",
}

// Coaching philosophy pillars (About + Services)
export const PHILOSOPHY = [
  {
    title: 'Health → Fitness → Sport',
    body:
      'T2 is the umbrella over all three. You have to be healthy — mind and body, strength and mobility, nutrition and sleep — to build the fitness that lets you perform in your sport. We build in that order, and health is always priority #1.',
  },
  {
    title: 'Relationship over programming',
    body:
      "I'm in the relationship-building business. The magic isn't the plan itself — it's working together, adjusting, and finding what works for you. That's the difference between coaching and just handing someone a program.",
  },
  {
    title: 'Your goals, not mine',
    body:
      "I fully support your goals, whether or not they're goals I'd chase myself. Once I understand what's meaningful to you, it's incredibly satisfying to build a plan that carries you there.",
  },
  {
    title: "It's in the details",
    body:
      'Every workout has a specific purpose — type, duration, and intensity all matter. Ask me "why" any time. Understanding the reason behind a session empowers you to execute it with intention, and that produces real results.',
  },
  {
    title: 'Communication is a two-way street',
    body:
      "The better I know how you respond to training, the better I can coach you. If you're tired, traveling, or your schedule shifts — tell me. Fatigue isn't a badge of honor; we adjust so you keep moving toward your goals.",
  },
  {
    title: 'Relatable, and still racing',
    body:
      "I work full-time, value family, and balance it all — just like you. I've had my own setbacks, including a serious patella injury, so I know how to coach you through the comebacks as well as the breakthroughs.",
  },
]

// WSJ feature callout
export const WSJ_FEATURE = {
  outlet: 'The Wall Street Journal',
  title: "An Ironman Coach's Swim Strength Workout — No Water Required",
  blurb:
    'Wendy was featured in The Wall Street Journal sharing a land-based strength routine that improves stroke technique and swim speed.',
  url: 'https://www.wsj.com/articles/an-ironman-coachs-swim-strength-workout-no-water-required-11607166000',
}
