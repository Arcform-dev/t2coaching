// Reusable section heading: gold rule + uppercase eyebrow + serif headline.
// Mirrors the pattern repeated across Programs/About/Testimonials/CTA.

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  eyebrowColor = '#C9A84C',
  style,
}) {
  const centered = align === 'center'
  return (
    <div style={{ maxWidth: centered ? 720 : 640, margin: centered ? '0 auto' : 0, textAlign: centered ? 'center' : 'left', ...style }}>
      {eyebrow && (
        <p style={{
          fontSize: 11, fontWeight: 700, color: eyebrowColor,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          marginBottom: 14,
        }}>{eyebrow}</p>
      )}
      {title && (
        <h2 style={{
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#ffffff', lineHeight: 1.15, marginBottom: subtitle ? 16 : 0,
        }}>{title}</h2>
      )}
      {subtitle && (
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>{subtitle}</p>
      )}
    </div>
  )
}
