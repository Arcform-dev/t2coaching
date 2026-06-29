import { Navigate, useParams } from 'react-router-dom'
import { getPost } from '../data/posts'
import NotFound from './NotFound'

export default function BlogRedirect() {
  const { slug } = useParams()

  if (!slug) return <Navigate to="/blog" replace />

  const post = getPost(slug)
  if (!post) return <NotFound />

  return <Navigate to={`/blog/${post.slug}`} replace />
}
