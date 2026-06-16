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
      {title && (
        <h2 style={{
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
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
