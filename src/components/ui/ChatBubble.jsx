// Chat bubble primitives for the "Ongoing Communication" step. Adapted from the
// shadcn chat-bubble helper to plain JSX + the site palette (received = navy
// panel, sent = gold). No radix avatar dependency — a simple circle/photo.

export function ChatBubble({ variant = 'received', children, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 14,
      flexDirection: variant === 'sent' ? 'row-reverse' : 'row',
      ...style,
    }}>
      {children}
    </div>
  )
}

export function ChatBubbleAvatar({ src, fallback = 'W', style }) {
  return (
    <div style={{
      width: 38, height: 38, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
      background: '#1A6B8A', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, letterSpacing: '0.02em',
      ...style,
    }}>
      {src
        ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : fallback}
    </div>
  )
}

export function ChatBubbleMessage({ variant = 'received', children, style }) {
  const sent = variant === 'sent'
  return (
    <div style={{
      maxWidth: '78%', padding: '11px 15px', fontSize: 14.5, lineHeight: 1.5,
      background: sent ? '#C9A84C' : '#0D2B3E',
      color: sent ? '#fff' : 'rgba(255,255,255,0.9)',
      border: sent ? 'none' : '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16,
      borderBottomRightRadius: sent ? 5 : 16,
      borderBottomLeftRadius: sent ? 16 : 5,
      ...style,
    }}>
      {children}
    </div>
  )
}
