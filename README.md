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
functions/
  api/contact.js  Cloudflare Pages Function for the contact form (Resend)
public/
  photos/       site imagery
```

**To update site copy** (bio, pricing, testimonials, stats, socials, blog), edit
the files in `src/data/` — no component changes needed.

## Contact form (Resend)

The contact + newsletter forms POST to `/api/contact`, handled by
[`functions/api/contact.js`](functions/api/contact.js), which sends email via
[Resend](https://resend.com). The API key stays server-side.

**Setup:**

1. Create a Resend account and an API key.
2. (Production) Verify a sending domain in Resend, e.g. `t2coaching.com`.
3. In **Cloudflare Pages → Settings → Environment variables**, add:
   - `RESEND_API_KEY` — your key (required)
   - `CONTACT_TO` — recipient (optional, defaults to `t2coachwendy@gmail.com`)
   - `CONTACT_FROM` — verified sender, e.g. `T2 Coaching <noreply@t2coaching.com>`
     (optional; defaults to Resend's test sender `onboarding@resend.dev`, which
     only delivers to the Resend account owner).
4. For local testing: `cp .dev.vars.example .dev.vars`, fill in the key, then:

```bash
npm run build
npx wrangler pages dev dist
```

## Deploy

Cloudflare Pages auto-builds with `npm run build` (publish dir `dist`). The
top-level `functions/` directory is deployed automatically as Pages Functions,
and `public/_redirects` provides the SPA fallback for client-side routing.
