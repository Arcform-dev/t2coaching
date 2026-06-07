// Blog posts. The first is a real, full article adapted (with attribution) from
// Wendy's Wall Street Journal feature. The rest are "coming soon" topic stubs
// covering the subjects Wendy plans to write about.

export const POSTS = [
  {
    slug: 'swim-strength-workout-no-water-required',
    title: "An Ironman Coach's Swim Strength Workout — No Water Required",
    category: 'Swim Technique',
    date: '2020-12-05',
    readTime: '8 min read',
    cover: '/photos/pool-swim-training.jpg',
    excerpt:
      'Six land-based exercises to strengthen your upper back, boost core stability and shoulder mobility — and translate it all into a faster, stronger freestyle.',
    feature:
      'As featured in The Wall Street Journal — "An Ironman Coach\'s Swim Strength Workout, No Water Required" by Jen Murphy.',
    intro: [
      'Swimming is a low-impact, full-body exercise — but it involves repetitive motions that can lead to injury without proper conditioning on land. Many of the tiny connector muscles, ligaments and tendons get overlooked when you only train in the pool. Keep them healthy and strong, and it translates directly to improved stroke technique and increased swim speed.',
      'Swimmers — and anyone who sits hunched over a computer all day — tend to have tight pectoral muscles and rounded shoulders. Strengthening the triceps, rear and lateral deltoids, and the muscles of the upper back can ease neck pain, improve posture, and boost your swim performance.',
      'Warm up by foam-rolling along the thoracic spine (upper back). The thoracic spine is to swimmers what the gluteus medius is to runners — thoracic mobility is key to achieving proper catch and rotation in the water.',
    ],
    exercises: [
      {
        name: 'Scapular Push-Ups',
        why: 'The shoulder blades assist the recovery phase of freestyle and set the foundation for range of motion. This isolates the serratus anterior, which stabilizes the shoulder and helps raise the arm above shoulder height.',
        how: 'Start in a plank with hands under your shoulders. Pinch the shoulder blades together, then relax and broaden them. This is not a regular push-up — arms stay straight while your chest moves up and down just 1–2 inches. Repeat 5–10 times. (Wrist sensitivity? Do it standing at a wall.)',
      },
      {
        name: "Lying Y's, W's and T's",
        why: 'Activates the mid-back muscles (rhomboids) and the four rotator-cuff muscles. When the smaller back muscles are strong, they assist the lats and help prevent overuse injuries.',
        how: 'Lie face down. Make a Y with your arms, thumbs up, and lift to ear level — squeeze and hold 5 seconds, then lower. Pull elbows toward hips into a W, lift and hold 5 seconds. Finally extend arms into a T, lift and hold 5 seconds. Repeat 5 times. (Add 3-lb weights to challenge.)',
      },
      {
        name: 'Arm Pulls with Bands',
        why: 'A high-elbow catch requires you to activate your lats to push water straight back past your hips, taking stress off the shoulders. Most newer swimmers don\'t have the mobility to do this well — this trains it.',
        how: 'Anchor a resistance band to something sturdy. Bend at the waist with a flat back, arms straight out front, and pull both arms down to your sides like a butterfly stroke — finishing past your hips. Perform 10 times. (Single-arm variation mimics freestyle.)',
      },
      {
        name: 'Triceps Pullback with Bands',
        why: 'The finish of your stroke is powered by the triceps. As they fatigue, the elbow bends and the hand exits the water early — shortening your stroke and costing energy. A correct finish keeps the forearm submerged until your hand passes your upper thigh.',
        how: 'Anchor a band, bend at the waist with a flat back. Keep elbows glued to your sides and press your arms straight back until parallel with the ground. Squeeze, then return. Perform 10 times.',
      },
      {
        name: 'Triceps Dips',
        why: 'Triceps strength lengthens and finishes the underwater pull in freestyle and butterfly. This also works the front-of-shoulder deltoids that help you lift kids — or holiday packages.',
        how: 'Grip the edge of a bench behind you, butt just off the seat, legs bent with thighs parallel to the floor. Bend your arms to lower until elbows hit 90°, then press back up. Perform 10 times. (Straighten your legs for more challenge.)',
      },
      {
        name: 'Flutter Kicks',
        why: 'Core stability targets the deep abdominal muscles that connect to the spine, pelvis and shoulders — the foundation for all arm and leg movement. Power comes from the trunk, and a strong core lets you control it for smoother, more efficient swimming.',
        how: 'Lie face down, pull your belly button toward your spine, lift your feet a few inches and perform 20–30 short, fast kicks with straight legs. Flip face up and repeat. (Lower-back issues? Place your hands under your hips.)',
      },
    ],
  },
  {
    slug: 'beginner-triathlon-tips',
    title: 'Starting From Zero: A Beginner\'s Guide to Your First Triathlon',
    category: 'Beginner Tips',
    excerpt: 'The mistakes I see first-timers make — and the simple framework that gets you to the finish line healthy and smiling.',
    comingSoon: true,
  },
  {
    slug: 'race-day-nutrition',
    title: 'Race-Day Nutrition: Why You Really Bonk at Mile 80',
    category: 'Nutrition',
    excerpt: 'Bonking isn\'t bad luck — it\'s a fueling failure. How to train your gut to be race-ready long before the start line.',
    comingSoon: true,
  },
  {
    slug: 'avoid-overtraining',
    title: 'The Hard Way I Learned About Overtraining',
    category: 'Injury Prevention',
    excerpt: 'After my first Ironman I nearly lost the sport I loved. Here\'s how to recognize the warning signs before they cost you a season.',
    comingSoon: true,
  },
  {
    slug: 'training-with-a-busy-life',
    title: 'Training Around Family, Work & a Full Life',
    category: 'Balance',
    excerpt: 'You don\'t need unlimited time — you need the right plan. How time-crunched athletes still reach big goals.',
    comingSoon: true,
  },
]

export const getPost = (slug) => POSTS.find((p) => p.slug === slug)
