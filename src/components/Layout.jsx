import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

// Persistent chrome shared by every route. The whole site sits on one solid
// teal surface (set on <body> in index.css), so there's a single visual
// through-line instead of per-section background swaps. Fixed nav, page
// content (Outlet), and footer.
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <div className="site-grain" aria-hidden="true" />
    </>
  )
}
