// ── Single source of truth for T2 Coaching site content ──────────────────────
// All copy here is from Wendy Mader's own intake/content documents.

// "Book a free call" CTAs route to the internal contact page for now. There's
// no external booking/calendar link wired up yet. Swap in a real URL when ready
// (and change the <Link> CTAs back to <a target="_blank"> if it's off-site).
export const BOOKING_URL = '/contact'

export const CONTACT = {
  preferredName: 'Coach Wendy',
  fullName: 'Wendy Mader',
  business: 't2coaching, LLC',
  email: 't2coachwendy@gmail.com',
  phone: '(970) 308-4499',
  phoneHref: 'tel:+19703084499',
  location: 'Marietta, GA',
  reach: 'I coach athletes worldwide over Zoom, plus in person at races and locally in Atlanta.',
}

export const SOCIALS = [
  { label: 'Instagram', handle: '@t2coachwendy', url: 'https://www.instagram.com/t2coachwendy/' },
  { label: 'Facebook',  handle: 'Wendy Mader',   url: 'https://www.facebook.com/wendy.mader.7' },
  { label: 'YouTube',   handle: '@WendyMader',    url: 'https://www.youtube.com/@WendyMader' },
]

// Headline stats, shown in the Hero (3) and the Stats band (4).
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
  'Personalized swim, run & triathlon coaching built around your life, by a Kona Ironman World Champion.'

// Wendy's first-person story (About page), condensed from her own words.
export const STORY = [
  "Hi, I'm Wendy Mader. I've been swimming since I was a teenager and racing since the '90s, so more than 30 years now. I grew up in Colorado, and these days I live just outside Atlanta in Marietta, Georgia.",
  "I started out as a collegiate swimmer at Eastern Michigan University, and one day a team invited me to swim the relay leg of a triathlon. After I watched my biker and runner friends finish the race, I thought, \"I could do all of that myself.\" That one thought set the course for the next 30 years of my life.",
  "I finished my first Ironman in 1997 and I was hooked. The internet barely existed back then, so I learned about overtraining the hard way. I didn't rest. I just kept piling on more. Within a year I was in the worst shape of my life, barely able to walk without losing my breath. I still remember looking in the mirror and seeing how far I'd let myself go.",
  "I climbed back out. In 2008 I won the Overall Amateur title at the Ironman World Championships in Kona, Hawaii. I had come close to losing the sport I loved, and then I was standing at the very top of it. That's the why behind T2 Coaching, which I started more than two decades ago.",
  "I have a Master's degree in Exercise and Sport Science, and I've spent my career helping athletes get healthy, build fitness, and perform. For some people that means walking a first 5k. For others it's finishing an Ironman or running a 100-mile ultra. I'm still out there racing too. I've finished the Run Rabbit Run 100, the Georgia Death Race, and plenty of other ultras. I build your workouts from the science and from my own experience. I swim the swim, bike the bike, and run the run right alongside you.",
]

// The meaning behind the name
export const NAME_MEANING = {
  title: 'Why "t2"?',
  body:
    "In triathlon, T2 is the second transition. It's the moment you rack your bike, change into your running gear, and head out for the finish. That's what coaching with me is about. I help you make the move to your next level with guidance that's personal and built on real experience, so you reach your full potential without giving up your family, your time, or your long-term health.",
}

// Coaching philosophy pillars (About + Services)
export const PHILOSOPHY = [
  {
    title: 'Health → Fitness → Sport',
    body:
      'T2 is the umbrella over all three. You have to be healthy first. That means mind and body, strength and mobility, nutrition and sleep. Health is what lets you build fitness, and fitness is what lets you perform in your sport. We build in that order, and health is always priority #1.',
  },
  {
    title: 'Relationship over programming',
    body:
      "I'm in the relationship business. The magic isn't the plan itself. It's the two of us working together, adjusting as we go, and finding what actually works for you. That's the difference between real coaching and handing someone a program.",
  },
  {
    title: 'Your goals, not mine',
    body:
      "I support your goals, whether or not they're goals I'd chase myself. Once I understand what matters to you, I love building the plan that gets you there.",
  },
  {
    title: "It's in the details",
    body:
      'Every workout has a purpose. The type, the duration, and the intensity all matter. Ask me "why" any time. When you understand the reason behind a session, you do it with intention, and that produces real results.',
  },
  {
    title: 'Communication is a two-way street',
    body:
      "The better I know how you respond to training, the better I can coach you. If you're tired, traveling, or your schedule changes, tell me. Fatigue isn't a badge of honor. We adjust, and you keep moving toward your goals.",
  },
  {
    title: 'Relatable, and still racing',
    body:
      "I work full-time, I value my family, and I balance all of it, just like you. I've had my own setbacks too, including a serious patella injury. I know how to coach you through the comebacks, not just the breakthroughs.",
  },
]

// WSJ feature callout
export const WSJ_FEATURE = {
  outlet: 'The Wall Street Journal',
  title: "An Ironman Coach's Swim Strength Workout — No Water Required",
  blurb:
    'Wendy shared a strength routine you can do on dry land to sharpen your stroke and swim faster, no pool required.',
  url: 'https://www.wsj.com/articles/an-ironman-coachs-swim-strength-workout-no-water-required-11607166000',
}
