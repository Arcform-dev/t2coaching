import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { BOOKING_URL, BOOKING_IS_EXTERNAL } from '../../data/siteContent'

// Single home for every "Book a Free Call" CTA. When a Calendly URL is
// configured (VITE_CALENDLY_URL), it opens externally in a new tab; otherwise it
// falls back to the internal /contact page, so nothing breaks before the link
// exists. All visual props (className, style, onClick, children) pass straight
// through, so each call site keeps its own styling. forwardRef so GSAP-animated
// CTAs (e.g. the home CTA) can still grab the element.
const BookingLink = forwardRef(function BookingLink({ children, ...props }, ref) {
  if (BOOKING_IS_EXTERNAL) {
    return (
      <a ref={ref} href={BOOKING_URL} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return <Link ref={ref} to={BOOKING_URL} {...props}>{children}</Link>
})

export default BookingLink
