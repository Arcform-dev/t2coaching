const ART_THEMES = [
  { base: '#0D2B3E', mid: '#1A6B8A', accent: '#7EC8E3', mark: '#C9A84C' },
  { base: '#10283A', mid: '#2D6F68', accent: '#8DD9C7', mark: '#D8B85E' },
  { base: '#172A3A', mid: '#5B6B45', accent: '#B8D8A8', mark: '#C9A84C' },
  { base: '#1B2B44', mid: '#6B4E71', accent: '#C6B8E8', mark: '#D8B85E' },
  { base: '#123238', mid: '#7A4F35', accent: '#E3B17E', mark: '#7EC8E3' },
]

function hashString(value = '') {
  return value.split('').reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0)
}

function getArtworkTheme(post) {
  return ART_THEMES[Math.abs(hashString(`${post.category}-${post.slug}`)) % ART_THEMES.length]
}

function ArtworkPattern({ theme, opacity = 0.62 }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.22,
          backgroundImage: `linear-gradient(90deg, transparent 0 47%, ${theme.accent} 47% 48%, transparent 48% 100%), linear-gradient(0deg, transparent 0 47%, ${theme.accent} 47% 48%, transparent 48% 100%)`,
          backgroundSize: '44px 44px',
        }}
      />
      <svg viewBox="0 0 420 260" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}>
        <path d="M-40 210 C70 130 120 250 220 160 S330 40 470 100" fill="none" stroke={theme.mark} strokeWidth="16" strokeLinecap="round" opacity="0.32" />
        <path d="M-25 62 C90 22 150 95 235 72 S360 5 455 48" fill="none" stroke={theme.accent} strokeWidth="5" strokeLinecap="round" opacity="0.58" />
        <path d="M40 286 C130 190 204 222 288 140 S380 42 456 20" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 12" opacity="0.42" />
      </svg>
    </>
  )
}

export function BlogArtwork({ post }) {
  if (post.cover) {
    return <img src={post.cover} alt={post.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }

  const theme = getArtworkTheme(post)
  const year = post.date ? new Date(post.date).getFullYear() : 'T2'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.base} 0%, ${theme.mid} 62%, #081220 100%)`,
      }}
    >
      <ArtworkPattern theme={theme} />
      <div style={{ position: 'absolute', left: 24, top: 22, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase' }}>
        T2 Coaching
      </div>
      <div style={{ position: 'absolute', left: 22, bottom: 16, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <span style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", fontSize: 58, fontWeight: 700, lineHeight: 0.88, color: 'rgba(255,255,255,0.9)' }}>
          T2
        </span>
        <span style={{ marginBottom: 5, fontSize: 12, fontWeight: 700, color: theme.mark }}>
          {year}
        </span>
      </div>
    </div>
  )
}

export function BlogHeaderBackdrop({ post }) {
  if (post.cover) {
    return (
      <>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${post.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,18,32,0.7), rgba(8,18,32,0.92))' }} />
      </>
    )
  }

  const theme = getArtworkTheme(post)

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${theme.base} 0%, ${theme.mid} 58%, #081220 100%)`,
          opacity: 0.92,
        }}
      >
        <ArtworkPattern theme={theme} opacity={0.28} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,18,32,0.18), rgba(8,18,32,0.9))' }} />
    </>
  )
}
