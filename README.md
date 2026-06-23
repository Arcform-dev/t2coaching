# T2 Coaching

Marketing site for **t2coaching, LLC** — personalized swim, run & triathlon coaching by Wendy Mader, 2008 Kona Ironman World Champion.

Built with React + Vite + Tailwind v4 + GSAP, deployed on **Cloudflare Pages**.

## Develop

```bash
npm install
npm run dev        # Vite dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint
```

> The dev server does **not** run the contact form's serverless function. To test
> the form end-to-end, build first and run `npx wrangler pages dev dist` (see below).

## Structure

```
src/
  pages/        one component per route (Home, About, Services, Testimonials,
                Gallery, Blog, BlogPost, Resources, Contact)
  components/   Layout, Nav, Footer, RaceCourse + the home-page sections
  components/ui SectionHeading, PageHeader, GlassCard, Reveal, CTABanner
  data/         single source of truth for all content — edit copy here:
                siteContent, services, testimonials, credentials, posts
  hooks/        useDocumentMeta (per-route <title> + meta description)
public/
  photos/       site imagery
```

**To update site copy** (bio, pricing, testimonials, stats, socials, blog), edit
the files in `src/data/` — no component changes needed.

## Forms (Formspree)

The contact form and the free-guide signup both submit to one
[Formspree](https://formspree.io) form. There's no server code or API key — the
browser POSTs directly to Formspree, which emails the submission. Both forms keep
their in-page success state; until the endpoint is set, they show an "email me
directly" fallback instead of failing silently.

**Setup (one-time):**

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form; set the notification email to `t2coachwendy@gmail.com`.
3. Copy the form endpoint URL, e.g. `https://formspree.io/f/abcdwxyz`.
4. In **Cloudflare Pages → Settings → Environment variables** (same place as the
   Sanity vars), set `VITE_FORMSPREE_ENDPOINT` to that URL, then redeploy.
5. The first submission triggers a one-click Formspree email verification.

Notes: the free tier allows 50 submissions/month, and spam protection (reCAPTCHA,
etc.) is toggled in the Formspree dashboard. For local dev, put
`VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/...` in a `.env` file.

## Booking (Calendly)

Every "Book a Free Call" button across the site renders through
[`src/components/ui/BookingLink.jsx`](src/components/ui/BookingLink.jsx). When
`VITE_CALENDLY_URL` is set in **Cloudflare Pages → Settings → Environment
variables**, all of them open that Calendly link in a new tab. Until then they
fall back to the internal `/contact` page, so nothing breaks before the link
exists — swapping it in is a single env-var value, no code change. For local dev,
put `VITE_CALENDLY_URL=https://calendly.com/...` in a `.env` file.

## Deploy

Cloudflare Pages auto-builds with `npm run build` (publish dir `dist`), and
`public/_redirects` provides the SPA fallback for client-side routing. The site
is fully static — no Pages Functions or server runtime required.
