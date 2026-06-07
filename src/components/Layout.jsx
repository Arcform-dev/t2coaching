import { Outlet } from 'react-router-dom'
import RaceCourse from './RaceCourse'
import Nav from './Nav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

// Persistent chrome shared by every route: the animated race-course backdrop,
// fixed nav, page content (Outlet), and footer.
export default function Layout() {
  return (
    <>
      <RaceCourse />
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
