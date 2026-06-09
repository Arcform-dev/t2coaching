import { InfiniteSlider } from './ui/InfiniteSlider'
import { ProgressiveBlur } from './ui/ProgressiveBlur'

// "As Featured In" press / credential bar for the homepage. An infinite logo
// marquee (InfiniteSlider) with progressive-blur edge fades (ProgressiveBlur).
// The source logos are dark/colour marks on white JPGs, so each sits on a white
// tile, scaled past the heavy built-in whitespace so it reads at a glance.

const LOGOS = [
  { src: '/logo-wsj.jpg', alt: 'The Wall Street Journal' },
  { src: '/logo-ironman-certified-coach.jpg', alt: 'IRONMAN Certified Coach' },
  { src: '/logo-trainingpeaks.jpg', alt: 'TrainingPeaks' },
  { src: '/logo-endurance-hour.jpg', alt: 'Endurance Hour' },
]

function LogoTile({ logo }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 168, height: 88, flexShrink: 0,
        background: '#ffffff', borderRadius: 14, overflow: 'hidden',
      }}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(2.1)' }}
      />
    </div>
  )
}

export default function AsFeaturedIn() {
  // Render the set twice so one loop comfortably exceeds the viewport width and
  // the seamless wrap never shows a gap (InfiniteSlider duplicates once more).
  const slides = [...LOGOS, ...LOGOS]

  return (
    <section
      style={{
        background: '#0D2B3E',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '40px 0 46px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          As Featured In
        </span>
      </div>

      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>
        <InfiniteSlider className="flex h-[88px] w-full items-center" duration={34} gap={48}>
          {slides.map((logo, i) => (
            <LogoTile key={i} logo={logo} />
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-[180px]"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-[180px]"
          direction="right"
          blurIntensity={1}
        />
      </div>
    </section>
  )
}
