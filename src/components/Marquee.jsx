const ITEMS = [
  'Kona Ironman Champion',
  '30+ Years Elite Coaching',
  '500+ Athletes Coached',
  'USAT Certified Coach',
  'USA Cycling Certified',
  'USA Swimming Certified',
  'Personalized Race Strategy',
  'Colorado-Based · Global Reach',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div style={{
      background: '#0D2B3E',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
      padding: '18px 0',
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 32s linear infinite',
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              whiteSpace: 'nowrap',
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '0 28px',
            }}>{item}</span>
            <span style={{ color: '#C9A84C', fontSize: 10, flexShrink: 0 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
