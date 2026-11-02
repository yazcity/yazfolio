# Ahammed Yaseen — Portfolio

Personal portfolio for **yazcity.com**, built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, React Three Fiber and MDX.

Every page is statically generated, so the site is fast, SEO-friendly and cheap to host.

---

## 1. Run it locally

Requires **Node.js 20.9+** (developed on Node 22).

```bash
npm install          # install the exact pinned versions
npm run dev          # http://localhost:3001
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on **port 3001** (so it doesn't clash with the old site on 3000) |
| `npm run build` | Production build (static pages, OG images, sitemap) |
| `npm run start` | Serve the production build on port 3001 |
| `npm run lint` | ESLint (Next.js + React rules) |
| `npm run typecheck` | TypeScript, no output |
| `npm run check` | Lint + type-check + build in one go — run before every deploy |

---

## 2. Edit your content (no component changes needed)

Everything you'd want to change lives in **`/content`**. The files are typed, so if you mistype a field the build tells you exactly where.

| File | What's in it |
| --- | --- |
| `content/site.ts` | Domain, site title/description, **SEO keywords**, navigation |
| `content/profile.ts` | Name, role, one-line value statement, bio, email, phone, availability, social links |
| `content/experience.ts` | Jobs (newest first): role, company, logo, dates, summary, highlights |
| `content/projects.ts` | Case studies: problem, approach, modules, tech, result, links |
| `content/skills.ts` | Skill groups shown in "What I do" |
| `content/education.ts` | Education **and** certifications |
| `content/testimonials.ts` | Testimonials — the section stays hidden until this list has entries |
| `content/blog/*.mdx` | Blog posts (see below) |

Search the project for `TODO` to find the details that still need your input (project results, exact tech per project, certificate links and dates).

**Images** go in `public/images/...` and are referenced as `/images/...`. Prefer `.webp` or `.jpg`, around 1000–1600 px wide; `next/image` creates the responsive sizes automatically.

### Adding a project

Add an object to the `projects` array in `content/projects.ts` with a unique `slug`. Its page appears at `/projects/<slug>` and is added to the sitemap automatically. Set `featured: true` to show it on the home page.

### Résumé

The download buttons serve **`public/Ahammed-Yaseen-Resume.pdf`** (the file name helps search engines). To update it, export your latest résumé from Word as PDF and overwrite that file, keeping the same name. The **/resume/** page shows the same résumé as HTML, built from the `/content` files — keep both in sync.

### Contact form

The form works with no backend: by default it opens the visitor's email app with a pre-filled message to your address.

To receive messages directly (recommended), connect a free form service:

1. Create a form at [formspree.io](https://formspree.io) (free tier is fine) and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Create `.env.local` in this folder:
   ```
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
3. Add the same value as a GitHub repository secret named `NEXT_PUBLIC_FORM_ENDPOINT` (Settings → Secrets and variables → Actions), then push again.

The form already includes a spam honeypot field.

---

## 3. Write a blog post

1. Create `content/blog/my-post-slug.mdx` — the file name becomes the URL (`/blog/my-post-slug`).
2. Start it with frontmatter:

   ~~~mdx
   ---
   title: "Your SEO-friendly title (50–60 characters)"
   description: "One or two sentences for Google and link previews (~150–160 characters)."
   date: "2026-11-15"
   tags: ["dotnet", "react"]
   keywords: ["Senior .NET Developer", "another phrase people search for"]
   cover: "/images/blog/my-post-slug.webp"
   coverAlt: "Short description of the cover image"
   draft: false
   ---

   Your intro paragraph…

   ## A section heading

   Text, **bold**, [links](/contact), lists, and code blocks:

   ```csharp
   var hello = "world";
   ```
   ~~~

3. Optional extras: `<Callout>…</Callout>` for a highlighted box; `updated: "2026-12-01"` when you revise a post.
4. `draft: true` hides a post from the production site and sitemap but still shows it in `npm run dev`, so you can preview it.

Each post automatically gets its own 1200×630 social image, `BlogPosting` structured data, breadcrumbs and a sitemap entry. Cover images are 1200×630.

---

## 4. Deploy (GitHub Pages → yazcity.com)

The site is a **static export** (`output: "export"` in `next.config.ts`) hosted on GitHub Pages from the
`gh-pages` branch of **github.com/yazcity/yazfolio**. `yazcity.com` already points there (DNS A records
185.199.108–111.153), and `public/CNAME` keeps the custom domain set on every deploy.

**Publishing is automatic:** every push to `main` runs `.github/workflows/deploy.yml`, which lints,
type-checks, builds and publishes the `out/` folder to `gh-pages`. Watch it under the repo's **Actions** tab;
the site updates about a minute after it goes green.

```bash
git add -A
git commit -m "Update content"
git push            # → GitHub Actions builds and deploys to yazcity.com
```

One-time checks in **GitHub → yazfolio → Settings → Pages**:
- *Source*: **Deploy from a branch** → `gh-pages` / `(root)`
- *Custom domain*: `yazcity.com`, and tick **Enforce HTTPS**

Optional: to deliver contact-form messages directly, add a repository secret
**`NEXT_PUBLIC_FORM_ENDPOINT`** (Settings → Secrets and variables → Actions) with your Formspree URL.

> If your domain ever changes, update `url` in `content/site.ts` and `public/CNAME`.

## 5. Submit the sitemap to Google Search Console

1. Open [search.google.com/search-console](https://search.google.com/search-console) → **Add property** → choose **Domain** and enter `yazcity.com`.
2. Verify ownership by adding the TXT record Google gives you at your DNS provider. (Alternatively choose **URL prefix** and use the HTML-tag method: paste the token into `verification.google` in `app/layout.tsx` and redeploy.)
3. In the left menu open **Sitemaps**, enter `sitemap.xml`, and click **Submit**. Google reads `https://yazcity.com/sitemap.xml`.
4. Use **URL Inspection → Request indexing** for the home page and each new blog post to speed things up.
5. Also worth doing: submit the same sitemap in [Bing Webmaster Tools](https://www.bing.com/webmasters) (you can import from Search Console in one click), and update your LinkedIn/GitHub profile links to point to the new site.

Check your link previews with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and structured data with [Google's Rich Results Test](https://search.google.com/test/rich-results).

---

## How it's built

```
app/                    Routes (App Router). Every page is statically generated.
  page.tsx              Home — hero, about, featured projects, skills, experience, testimonials, CTA
  about/ projects/ blog/ contact/
  projects/[slug]/      Case-study pages
  blog/[slug]/          MDX post pages + per-post OG/Twitter images
  resume/               HTML résumé / CV page (ranks for "Ahammed Yaseen resume")
  og.png/  blog/[slug]/og.png/   1200×630 social preview images (real .png files)
  sitemap.ts robots.ts manifest.ts icon.svg apple-icon.png not-found.tsx
components/
  hero/scene.tsx        React Three Fiber "systems constellation" (client-only chunk)
  hero/hero-visual.tsx  Decides whether to load 3D; renders the static fallback
  sections/             Home-page sections
  scroll/               Scroll effects (see below)
content/                All your data (see above)
lib/                    Blog loader, SEO helpers, OG image renderer
```

### The 3D hero and performance

- The scene is a separate chunk loaded with `next/dynamic` (`ssr: false`) only **after the browser is idle**, so the headline and buttons render instantly.
- It is **skipped entirely** on touch/small screens, low-memory or low-core devices, Data Saver, missing WebGL, and when the visitor prefers **reduced motion**. Those visitors get a lightweight SVG/CSS constellation instead.
- Rendering pauses when the hero is off-screen, and the drei `PerformanceMonitor` lowers resolution on slow GPUs.
- Interaction: nodes are repelled by the cursor; scrolling expands, tilts and fades the structure. Colours follow the light/dark theme.

### Scroll animations (`components/scroll/`)

| Component | Effect | Used in |
| --- | --- | --- |
| `ScrollProgress` | Gradient progress bar along the top edge | Every page |
| `HeroScroll` | Hero copy lifts, scales and fades as you scroll away | Home hero |
| `ScrollText` | Statement whose words light up one by one while scrolling | Home "In one sentence" (text: `manifesto` in `content/profile.ts`) |
| `SplitReveal` | Headlines rise word by word from behind a mask | All section headings, CTA |
| `ProjectStack` | Tablet/desktop: each project pins as a large card and the next slides over it while earlier cards shrink into a stack. Phones: grid | Home "Selected work" |
| `TimelineLine` | Timeline rail draws itself as you scroll; jobs slide in from alternating sides | Experience |
| `Marquee` | Two infinite tech ribbons in opposite directions (pause on hover) | Skills |
| `RevealImage`, `Parallax` | Clip-path photo reveal with inner parallax; floating layers | About preview, CTA |
| `CountUp` | Stats count up the first time they appear | About preview |
| `Reveal` | Fade + slide (`up`, `left`, `right`, `scale`) on entering the viewport | Cards everywhere |

The header slides away while scrolling down and returns when scrolling up. Everything animates only `transform`/`opacity` (GPU-friendly), and all of it is turned off for visitors who prefer reduced motion — they get the same content, static.

### Accessibility

Semantic landmarks and heading order, skip link, visible focus rings, full keyboard navigation (including the mobile menu, closable with Esc), alt text, and `prefers-reduced-motion` support (Lenis smooth scrolling, scroll reveals, page transitions and the 3D scene are all disabled or simplified).

**Colour contrast (WCAG 2.1)** — verified from `app/globals.css`:

| Pair | Light | Dark | Required |
| --- | --- | --- | --- |
| Body text on background | 17.63:1 | 16.45:1 | 4.5:1 |
| Body text on cards | 18.72:1 | 15.12:1 | 4.5:1 |
| Muted text on background | 7.17:1 | 8.36:1 | 4.5:1 |
| Muted text on cards | 7.61:1 | 7.68:1 | 4.5:1 |
| Muted text on tag background | 6.72:1 | 7.04:1 | 4.5:1 |
| Accent text & links | 5.15:1 | 13.05:1 | 4.5:1 |
| Accent text on cards | 5.47:1 | 11.99:1 | 4.5:1 |
| Secondary accent text | 6.69:1 | 10.45:1 | 4.5:1 |
| Primary button label | 5.47:1 | 11.56:1 | 4.5:1 |
| Form/UI borders | 3.72:1 | 3.14:1 | 3:1 |

If you change colours in `globals.css`, re-check them with a contrast checker such as [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/).

### SEO checklist (already done)

Unique title/description/canonical per page · Open Graph + Twitter cards · generated 1200×630 images (site-wide and per post) · `sitemap.xml` · `robots.txt` · JSON-LD `Person` + `WebSite` (home), `BlogPosting` (posts), `BreadcrumbList` (inner pages) · static generation · clean URLs · semantic headings.
