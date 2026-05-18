# Technology Stack — v3.0 Additions

**Project:** Sam Blake Portfolio v2 — v3.0 Content & SEO milestone
**Researched:** 2026-05-18
**Scope:** NEW capabilities only. Existing stack (Vite 8, vite-plugin-handlebars 2, vanilla HTML/CSS, BEM, ITCSS) is validated and unchanged.

---

## 1. Contact Form: FormSubmit (Recommended)

**Verdict:** Use FormSubmit. No JS required, no SDK, no account needed to start, zero new npm dependencies.

### Why FormSubmit over EmailJS

| Criterion | FormSubmit | EmailJS |
|-----------|------------|---------|
| JS required | No — pure HTML `<form action>` | Yes — must load SDK (~7 kB), call `emailjs.send()` |
| npm dependency | None | `@emailjs/browser` |
| Account setup | Email confirmation only (first submission activates) | Account + service + template setup |
| Free tier | Unlimited submissions (anti-spam: reCAPTCHA or honeypot) | 200 emails/month |
| AJAX/fetch path | Optional `_next` redirect or XHR via `fetch()` | Required — JS-only |
| Spam protection | Built-in honeypot field `_honey` + optional reCAPTCHA | None built-in — you manage |
| Constraint fit | Excellent — works with `<form>` alone | Poor — requires JS framework or inline script |

**Confidence:** HIGH — FormSubmit's pure-HTML approach is a well-established, documented pattern for static sites. EmailJS's JS requirement is fundamental to its architecture.

### FormSubmit Integration Pattern

No install. Action URL format:

```html
<form
  action="https://formsubmit.co/sam.blake@outlook.com"
  method="POST"
>
  <!-- Honeypot spam trap — must be present, must be empty -->
  <input type="text" name="_honey" style="display:none">

  <!-- Disable default CAPTCHA if using your own UX -->
  <input type="hidden" name="_captcha" value="false">

  <!-- Redirect after submission -->
  <input type="hidden" name="_next" value="https://samsux.co.uk/src/pages/contact.html?sent=1">

  <!-- Subject line in inbox -->
  <input type="hidden" name="_subject" value="Portfolio contact: new message">

  <label for="name">Name</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit" class="btn btn--primary">Send message</button>
</form>
```

**No JS needed.** `_next` redirect handles the post-submit UX.

**Optional JS enhancement:** If you want a smooth in-page success state (no redirect), add a minimal vanilla `fetch()` intercept — ~15 lines, no library. This is additive and not required for v3.0 MVP.

**Activation:** First submission to `formsubmit.co/sam.blake@outlook.com` sends a confirmation email. Click it once to activate. Subsequent submissions go to inbox.

**Inline style exception:** The `style="display:none"` on `_honey` is an intentional, documented FormSubmit requirement — not a design token violation. Document this in the Key Decisions table.

---

## 2. SEO Meta Suite — No New Dependencies

All SEO meta is static HTML. Zero npm additions required.

### Open Graph Tags

Add to every page `<head>`. Per-page values shown as placeholders:

```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Sam Blake — Product Designer">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="[Page Title] — Sam Blake | Product Designer">
<meta property="og:description" content="[150–160 char description]">
<meta property="og:url" content="https://samsux.co.uk/[path]">
<meta property="og:image" content="https://samsux.co.uk/og-image.png">

<!-- Twitter/X Card (uses OG fallback, but explicit is safer) -->
<meta name="twitter:card" content="summary_large_image">

<!-- Theme colour (browser chrome on mobile) -->
<meta name="theme-color" content="#0d1f1a">

<!-- Canonical -->
<link rel="canonical" href="https://samsux.co.uk/[path]">
```

**OG image:** Create one static `public/og-image.png` (1200x630px, dark palette, name + title). Reference it on all pages. A single shared image is standard for portfolio sites.

**Confidence:** HIGH — OG spec is stable. `en_GB` locale is correct for North West England targeting.

### JSON-LD Person Schema

Add only to `index.html` and `about.html`. Placed in `<head>` or just before `</body>` — either is valid; `<head>` is conventional.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sam Blake",
  "jobTitle": "Product Designer",
  "url": "https://samsux.co.uk",
  "email": "sam.blake@outlook.com",
  "sameAs": [
    "https://www.linkedin.com/in/samuel-blake-224605186"
  ],
  "knowsAbout": ["Product Design", "UX Design", "Fintech", "Retail Design"],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "North West England",
    "addressCountry": "GB"
  }
}
</script>
```

**Important:** `<script type="application/ld+json">` is not a JS module. It does not need a `type="module"` attribute and is not processed by Vite. It is inert structured data — paste directly into HTML.

**Confidence:** HIGH — JSON-LD Person schema is a stable, well-documented Google recommendation.

---

## 3. Sitemap — Two Options, Recommend Manual

### Option A: Manual `public/sitemap.xml` (Recommended for v3.0)

**Why:** The site has 9–10 pages, all stable URLs, all known at write time. Manual maintenance cost is near-zero. Zero new dependencies, zero build complexity.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://samsux.co.uk/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://samsux.co.uk/src/pages/about.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... one entry per registered page -->
</urlset>
```

Place at `public/sitemap.xml`. Vite copies `public/` verbatim to `dist/` — no config change needed.

**Note on URL structure:** Vite MPA outputs `src/pages/about.html` → `dist/src/pages/about.html`. If deploying with clean URLs (e.g. Netlify redirects or `_redirects`) the paths will differ. Confirm final URL structure before writing sitemap entries.

### Option B: `vite-plugin-sitemap` (Defer to later)

A community plugin (`vite-plugin-sitemap`, maintained by jbaubree) can auto-generate `sitemap.xml` at build time from an explicit pages array. Useful when URL count grows or paths change frequently.

**Why defer:** For 9–10 static pages it adds a dependency with minimal benefit. The plugin requires explicit route listing in `vite.config.js` anyway — no auto-discovery for MPA — so manual XML is equivalent effort with no dependency cost.

**Install if needed later:**
```bash
npm install -D vite-plugin-sitemap
```

**Confidence on plugin:** MEDIUM — plugin exists and is used in the community; version currency not verified (web tools blocked).

---

## 4. `robots.txt` — Manual, No Dependency

Place at `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://samsux.co.uk/sitemap.xml
```

---

## 5. Canonical URL Strategy — Vite MPA Consideration

Vite MPA outputs HTML files preserving their source path structure. With the current `rollupOptions.input`:

| Source | Built output | Canonical |
|--------|-------------|-----------|
| `index.html` | `dist/index.html` | `https://samsux.co.uk/` |
| `src/pages/about.html` | `dist/src/pages/about.html` | `https://samsux.co.uk/src/pages/about.html` |
| `src/pages/case-studies/i-exchange.html` | `dist/src/pages/case-studies/i-exchange.html` | `https://samsux.co.uk/src/pages/case-studies/i-exchange.html` |

If hosting on Netlify/Vercel with a `_redirects` or `vercel.json` rewrite that strips `.html`, canonical URLs would use clean paths (`/about`, `/work/i-exchange`). Decide on URL format before writing canonicals and sitemap — they must match actual served URLs exactly.

**Recommendation:** Keep `.html` URLs for v3.0 (matches current internal links, zero config). Optionally add clean URL rewrites at a later milestone.

---

## Summary: What to Add

| Item | Type | Install command | Confidence |
|------|------|-----------------|------------|
| FormSubmit | External service | None — HTML only | HIGH |
| Open Graph meta | Static HTML | None | HIGH |
| JSON-LD Person schema | Static HTML | None | HIGH |
| `theme-color` meta | Static HTML | None | HIGH |
| Canonical `<link>` | Static HTML | None | HIGH |
| `public/sitemap.xml` | Manual file | None | HIGH |
| `public/robots.txt` | Manual file | None | HIGH |
| `public/og-image.png` | Static asset | None | HIGH |
| `vite-plugin-sitemap` | Dev dependency | `npm i -D vite-plugin-sitemap` | MEDIUM — defer |
| EmailJS `@emailjs/browser` | Dev/runtime dependency | — | Not recommended |

**Net new npm dependencies for v3.0: zero.**

---

## Key Decisions to Log in PROJECT.md

| Decision | Rationale |
|----------|-----------|
| FormSubmit over EmailJS | No JS required; zero dependencies; fits vanilla HTML constraint; no monthly email cap on free tier |
| Manual sitemap over vite-plugin-sitemap | 9–10 pages; plugin requires explicit route listing anyway; defers dependency for negligible benefit |
| Single shared OG image | Portfolio sites do not benefit from per-page social images; one high-quality 1200x630 image is standard practice |
| `_honey` inline style exemption | FormSubmit requires `display:none` on honeypot; documented exception, not a design token violation |

---

## Sources

- FormSubmit integration pattern: training knowledge (HIGH confidence — stable API since 2019)
- EmailJS SDK requirement: architectural constraint documented in emailjs.com/docs (HIGH confidence)
- Open Graph protocol: ogp.me — stable specification
- JSON-LD Person schema: schema.org/Person — stable vocabulary
- Google structured data: developers.google.com/search/docs/appearance/structured-data/person
- Vite `publicDir` behaviour: vite.dev/config/shared-options — stable since Vite 2
- sitemap.xml protocol: sitemaps.org/protocol — stable
- `vite-plugin-sitemap`: github.com/jbaubree/vite-plugin-sitemap (version not verified — web tools blocked)
