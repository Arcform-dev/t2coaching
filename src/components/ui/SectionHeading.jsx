// Reusable section heading: gold rule + uppercase eyebrow + serif headline.
// Mirrors the pattern repeated across Programs/About/Testimonials/CTA.

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  eyebrowColor = '#F5A623',
  style,
}) {
  const centered = align === 'center'
  return (
    <div style={{ maxWidth: centered ? 720 : 640, margin: centered ? '0 auto' : 0, textAlign: centered ? 'center' : 'left', ...style }}>
      {eyebrow && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
          justifyContent: centered ? 'center' : 'flex-start',
        }}>
          {centered && <div style={{ width: 40, height: 1, background: '#7EC8E3' }} />}
          <span style={{ fontSize: 11, fontWeight: 600, color: eyebrowColor, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {eyebrow}
          </span>
          <div style={{ width: centered ? 40 : 32, height: 1, background: centered ? '#7EC8E3' : eyebrowColor }} />
        </div>
      )}
      {title && (
        <h2 style={{
          fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#ffffff', lineHeight: 1.15, marginBottom: subtitle ? 16 : 0,
        }}>{title}</h2>
      )}
      {subtitle && (
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>{subtitle}</p>
      )}
    </div>
  )
}
