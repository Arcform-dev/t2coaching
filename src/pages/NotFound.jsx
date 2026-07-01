import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/ui/PageHeader'

export default function NotFound() {
  useDocumentMeta(
    'Page Not Found',
    'The requested t2coaching page could not be found.',
    { robots: 'noindex,follow' }
  )

  return (
    <>
      <PageHeader
        eyebrow="404"
        title="That page"
        titleAccent="is not here."
        subtitle="The link may have moved, or the address may have been typed incorrectly."
      />
      <section style={{ padding: '40px 0 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Link to="/" className="cta-gold" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 48, padding: '14px 28px',
            color: '#0D2B3E', fontSize: 15, fontWeight: 700,
            textDecoration: 'none',
          }}>
            Return Home
          </Link>
        </div>
      </section>
    </>
  )
}
