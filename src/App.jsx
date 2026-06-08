import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Process from './pages/Process'
import Testimonials from './pages/Testimonials'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Resources from './pages/Resources'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="process" element={<Process />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="resources" element={<Resources />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
