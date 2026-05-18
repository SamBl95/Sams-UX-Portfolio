# Architecture Patterns — v3.0 Integration

**Project:** Sam Blake Portfolio v2
**Milestone:** v3.0 Content & SEO
**Researched:** 2026-05-18
**Overall confidence:** HIGH — all findings derived directly from the codebase and confirmed Vite/Handlebars behaviour

---

## Questions Answered

### 1. Where does FormSubmit / EmailJS JS go?

**Answer: separate `src/form.js` module, loaded as `<script type="module">` in `contact.html` only.**

The existing pattern is clear: each feature that needs JS gets its own module file under `src/` (typewriter.js, reveal.js, theme.js). Each module is loaded at the bottom of the pages that need it via `<script type="module" src="/src/form.js"></script>`.

Do NOT use an inline `<script>` block in contact.html. Reasons:

- Inline scripts cannot be tree-shaken or fingerprinted by Vite's build.
- They violate the Content Security Policy pattern the rest of the site implicitly follows.
- The IIFE pattern used by reveal.js (`(function initReveal() { ... })()`) works identically whether the file is external or inline — there is zero benefit to inlining it.

**FormSubmit** requires only a plain HTML `<form action="https://formsubmit.co/YOUR_EMAIL" method="POST">`. No JS is required at all for basic submission. A small `form.js` can handle the success/error UX (hide form, show confirmation message) without any library. This is the preferred approach — zero external JS dependency, no API key, no rate-limit management.

**EmailJS** requires loading their SDK (`https://cdn.emailjs.com/sdk/3.2.0/email.min.js`) and calling `emailjs.send()`. This adds a third-party script and an API key that must be committed or baked in. Avoid unless FormSubmit proves insufficient.

**Recommendation:** FormSubmit with `form.js` for success/error UX only. File stays under 30 lines.

---

### 2. SEO meta tags across 8 HTML files — direct or Handlebars partial?

**Answer: add meta directly to each page's `<head>`. Do NOT use a Handlebars partial for per-page meta.**

**Why partials will not work here:**

vite-plugin-handlebars v2.x supports a `pageContextResolver` option that returns a context object per page, which is then available inside Handlebars template expressions (`{{title}}`, `{{description}}`, etc.) in the HTML file itself. However, `pageContextResolver` does NOT inject into partials — partials receive only what the calling template explicitly passes as block arguments. A `{{> meta}}` partial would need to receive `og:title`, `og:description`, `og:url`, and canonical URL as Handlebars block arguments, which means the calling page still has to declare all those values, defeating the DRY purpose.

More critically, `pageContextResolver` would require refactoring `vite.config.js` to add a resolver function keyed on page path — this introduces config complexity for 8 pages of static content that will not change at runtime. The added complexity is not worth it.

**What to do instead — add directly to each `<head>`:**

Each page already has its own `<head>` block. Add the following block to each page's head, with values unique to that page:

```html
<!-- SEO -->
<meta name="description" content="[150–160 char unique description]" />
<link rel="canonical" href="https://samsux.co.uk[/path]" />
<meta name="theme-color" content="#0d1f1a" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Sam Blake | Product Designer" />
<meta property="og:locale" content="en_GB" />
<meta property="og:title" content="[Page title]" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:url" content="https://samsux.co.uk[/path]" />
<meta property="og:image" content="https://samsux.co.uk/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

JSON-LD schema goes in a `<script type="application/ld+json">` block inside `<head>` — only on `index.html` and `about.html`.

**The `<title>` tag already exists in every page.** Verify it follows the pattern `[Page — Sam Blake | Product Designer]` and update where it does not.

**Pages and their canonical paths** (based on `vite.config.js` rollupOptions.input):

| Page | File | Canonical URL |
|------|------|---------------|
| Home | index.html | `https://samsux.co.uk/` |
| About | src/pages/about.html | `https://samsux.co.uk/src/pages/about.html` → needs clean URL |
| Contact | src/pages/contact.html | `https://samsux.co.uk/src/pages/contact.html` |
| I-Exchange | src/pages/case-studies/i-exchange.html | `https://samsux.co.uk/src/pages/case-studies/i-exchange.html` |
| CASSI | src/pages/case-studies/cassi.html | `https://samsux.co.uk/src/pages/case-studies/cassi.html` |
| Community | src/pages/case-studies/community.html | `https://samsux.co.uk/src/pages/case-studies/community.html` |
| Stories index | src/pages/stories/index.html | `https://samsux.co.uk/src/pages/stories/` |
| Stories post | src/pages/stories/design-systems-and-portfolio-sites.html | full path |

**Flag:** The canonical URLs will include `/src/pages/` in the path unless the hosting layer (Netlify/Vercel rewrites) strips it. Verify the deployed URL structure before writing canonicals. If `/src/pages/` appears in production URLs, use those as-is; if the host rewrites to clean paths (`/about`, `/contact`) use those instead.

---

### 3. sitemap.xml and robots.txt placement — does Vite copy public/ as-is?

**Answer: YES. Place both files in `public/`. Vite copies everything in `publicDir` verbatim to the dist root at build time.**

From the existing `vite.config.js`: `publicDir: 'public'` and `outDir: 'dist'`. This is the default Vite behaviour — contents of `public/` are copied to `dist/` without transformation, fingerprinting, or path rewriting. Files in `public/` are served from the root at `/`.

The current `public/` already uses this for `favicon.png` and `icons.svg`, confirming the behaviour is in effect.

**Create these two files:**

`public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://samsux.co.uk/sitemap.xml
```

`public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://samsux.co.uk/</loc><priority>1.0</priority></url>
  <url><loc>https://samsux.co.uk/src/pages/about.html</loc></url>
  <url><loc>https://samsux.co.uk/src/pages/contact.html</loc></url>
  <url><loc>https://samsux.co.uk/src/pages/case-studies/i-exchange.html</loc></url>
  <url><loc>https://samsux.co.uk/src/pages/case-studies/cassi.html</loc></url>
  <url><loc>https://samsux.co.uk/src/pages/case-studies/community.html</loc></url>
  <url><loc>https://samsux.co.uk/src/pages/stories/index.html</loc></url>
  <url><loc>https://samsux.co.uk/src/pages/stories/design-systems-and-portfolio-sites.html</loc></url>
</urlset>
```

**Flag:** Same canonical URL caveat as above — adjust paths once deployed URL structure is confirmed.

**Do NOT import sitemap.xml or robots.txt in any JS/HTML.** They must remain in `public/` and be served directly. Importing them through Vite's module graph would break them.

---

### 4. Should og:image be a static asset in public/?

**Answer: YES. Place the og:image in `public/og-image.png`.**

Assets imported through Vite's module graph (i.e., referenced in `src/`) get content-hash fingerprinted: `og-image.a3f9b1c2.png`. Open Graph crawlers (Facebook, Twitter, LinkedIn, Slack unfurls) cache URLs aggressively. If the hash changes on the next build, every previously shared URL will show a broken image until the cache expires. A file in `public/` is never fingerprinted, so the URL `https://samsux.co.uk/og-image.png` is stable across builds.

The existing `favicon.png` is already in `public/` for the same reason (stable, non-hashed URL required for browser bookmarks and PWA manifests).

**og:image specification:**
- Dimensions: 1200 x 630px (standard OG ratio)
- Format: PNG or JPG
- File: `public/og-image.png`
- Reference in HTML: `<meta property="og:image" content="https://samsux.co.uk/og-image.png" />`
- Use absolute URL (not `/og-image.png`) — OG crawlers require fully qualified URLs

---

## New Files

| File | Type | Notes |
|------|------|-------|
| `src/form.js` | New JS module | FormSubmit success/error UX only |
| `public/sitemap.xml` | New static | Hand-authored, copied verbatim to dist root |
| `public/robots.txt` | New static | Copied verbatim to dist root |
| `public/og-image.png` | New static asset | 1200x630, stable URL, not fingerprinted |

## Modified Files

| File | Change |
|------|--------|
| `src/pages/contact.html` | Add form markup + `<script type="module" src="/src/form.js">` |
| `index.html` | Add SEO meta block + JSON-LD Person schema |
| `src/pages/about.html` | Add SEO meta block + JSON-LD Person schema |
| `src/pages/contact.html` | Add SEO meta block |
| `src/pages/case-studies/i-exchange.html` | Add SEO meta block |
| `src/pages/case-studies/cassi.html` | Add SEO meta block |
| `src/pages/case-studies/community.html` | Add SEO meta block |
| `src/pages/stories/index.html` | Add SEO meta block |
| `src/pages/stories/design-systems-and-portfolio-sites.html` | Add SEO meta block |

No changes to `vite.config.js`, `main.css`, or any existing JS modules.

---

## Build Order

1. Create `public/og-image.png` (design asset — blocks SEO meta work)
2. Add SEO meta to all 8 `<head>` blocks (no dependencies, pure HTML edits)
3. Create `public/sitemap.xml` and `public/robots.txt` (after canonical URLs confirmed)
4. Add form markup to `contact.html` (HTML only, no JS needed for FormSubmit basic submit)
5. Create `src/form.js` for success/error UX (after form markup exists)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Vite public/ copy behaviour | HIGH | Confirmed by existing favicon.png usage and vite.config.js `publicDir: 'public'` |
| og:image in public/ | HIGH | Fingerprinting behaviour is documented Vite default; favicon precedent in codebase |
| FormSubmit as separate module | HIGH | Matches established codebase pattern (typewriter.js, reveal.js, theme.js) |
| Handlebars partial for meta — rejected | HIGH | Plugin API does not support partial injection of per-page context without full page-level context passing |
| Canonical URL paths | MEDIUM | Depends on host URL rewriting — must verify against samsux.co.uk deployment |

---

## Open Questions

- What URL structure does samsux.co.uk use? Does `/src/pages/about.html` appear in the address bar, or does the host rewrite to `/about`? This determines canonical URLs and sitemap entries. Verify before writing canonicals.
- Does the og:image need to be created from scratch, or is there an existing design asset suitable for 1200x630 export?
