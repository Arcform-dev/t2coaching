// The dark glassmorphism card used throughout the site.
export default function GlassCard({ children, style, className, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={className}
      style={{
        background: 'rgba(8,18,32,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
