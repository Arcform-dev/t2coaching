# Content editing with Sanity

The site reads its **testimonials**, **gallery photos**, and **blog posts** from
Sanity, a free hosted CMS. Wendy logs into a dashboard ("the Studio"), makes
changes, and the live site picks them up within a minute or two — no code,
no redeploy.

Until a Sanity project is connected, the site falls back to the built-in
content in `src/data/`, so it works fine before this is set up.

---

## One-time setup (you / the developer, ~10 minutes)

### 1. Create the Sanity project
1. Go to **https://www.sanity.io/** and sign up (free).
2. Create a new project. Name it `T2 Coaching`. Use the default **`production`** dataset and make it **public** (so the website can read it).
3. Copy the **Project ID** (looks like `abcd1234`) from the project's API settings.

### 2. Connect the Studio (the editing dashboard)
From this repo:
```bash
cd studio
npm install
# point the studio at your project (create studio/.env):
#   SANITY_STUDIO_PROJECT_ID=your_project_id
#   SANITY_STUDIO_DATASET=production
npx sanity login      # log in with the account from step 1
npm run dev           # opens the Studio locally at http://localhost:3333
```
When it looks good, publish it so Wendy can use it from anywhere:
```bash
npm run deploy        # pick a hostname, e.g. t2coaching -> https://t2coaching.sanity.studio
```
Then in the Sanity project, invite Wendy as a member so she can log in.

### 3. Point the website at the project
Set these environment variables in **two** places:

- **Locally:** copy `.env.example` to `.env` and fill in:
  ```
  VITE_SANITY_PROJECT_ID=your_project_id
  VITE_SANITY_DATASET=production
  ```
- **Production (Cloudflare Pages):** Settings → Environment variables → add the
  same two variables, then redeploy.

### 4. Allow the website to read the data (CORS)
In the Sanity project: **API → CORS origins → Add origin** for each site URL
(no credentials needed):
- `http://localhost:5173`
- your Cloudflare Pages URL (e.g. `https://t2coaching.pages.dev`)
- the final custom domain

That's it. Once `VITE_SANITY_PROJECT_ID` is set, the site switches from the
local fallback content to whatever is in Sanity.

---

## How Wendy adds content

She logs into the Studio (the `*.sanity.studio` URL from step 2) and uses three
document types:

- **Testimonial** — athlete name, tag, photo, a short excerpt (home page) and the
  full story (one paragraph block per paragraph). `Sort order` controls position.
- **Gallery Image** — upload a photo, add a caption, toggle "wide/feature slot"
  for a bigger tile. `Sort order` controls position.
- **Blog Post** — title, slug (click *Generate*), category, date, cover image,
  excerpt, and the article body (rich text: headings, bold, lists, links,
  quotes). Toggle "Coming soon" to show a teaser instead of the full article.

Publish, and the change is live on the site shortly after.

---

## Moving the existing content into Sanity (optional)

The current testimonials, gallery photos, and the WSJ blog article live in
`src/data/`. They keep showing until you recreate them in the Studio. You can
either re-enter them by hand (there aren't many) or write a one-off import
script with `@sanity/client` and a write token. The field names in
`src/data/*.js` line up with the Studio fields, so it's a direct mapping.

> Note: the existing WSJ post uses a custom "why/how exercise" layout. In Sanity
> it becomes a normal rich-text article — recreate it in the body editor.
