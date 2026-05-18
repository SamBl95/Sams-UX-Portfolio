# Feature Landscape — v3.0 Contact Form, SEO Meta Suite

**Domain:** Static portfolio site (Vite MPA, vanilla HTML/CSS)
**Researched:** 2026-05-18
**Confidence note:** Web search and WebFetch were unavailable. All findings draw on training knowledge (cutoff August 2025). FormSubmit.co, EmailJS, Open Graph, JSON-LD, sitemap/robots are all mature, stable specifications — confidence is HIGH for spec behaviour and MEDIUM for FormSubmit/EmailJS product-specific details (service terms, rate limits, current UI may have drifted).

---

## Table Stakes

Features recruiters and hiring managers expect. Missing = professional credibility gap.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Working contact mechanism | Every portfolio needs one reachable path | Low | Email link already exists — form is additive |
| Unique `<title>` per page | SEO baseline; browser tab clarity | Low | 7 of 8 pages currently use near-identical titles |
| Unique `meta description` per page | Google uses this for snippets; missing = auto-generated ugly excerpt | Low | Already partially done; needs audit and 150–160 char discipline |
| `og:title` + `og:description` + `og:url` | LinkedIn/Slack/iMessage unfurls — recruiter shares your link and it looks professional | Low | Pure `<meta>` additions, no logic |
| `og:image` | Unfurl preview image — without it platforms use a random image or nothing | Medium | Requires creating a 1200×630 image asset |
| `theme-color` | Mobile Chrome tab colour; minor but visible on mobile | Trivial | Single meta tag, already have the hex token `#0d1f1a` |
| `sitemap.xml` | Googlebot discovers all pages; missing = case studies may not be indexed | Low | Static file, 8 URLs, one-time authoring |
| `robots.txt` | Missing file throws a 404 in search console; crawlers expect it | Trivial | 3 lines, placed in `public/` |
| Canonical URL per page | Prevents duplicate content penalty if site appears on multiple domains | Low | One `<link rel="canonical">` per page |

---

## Differentiators

Not universally expected on portfolio sites but add measurable value.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Contact form with AJAX submission | Form stays on-page; no redirect to third-party success page; feels polished | Medium | Requires ~30 lines vanilla JS; FormSubmit AJAX endpoint available |
| JSON-LD Person schema | Rich result eligibility in Google Search (Knowledge Panel, sitelinks); signals technical literacy | Low | 15-line JSON-LD block; only needed on `index.html` and `about.html` |
| `og:locale` en_GB | Signals UK market context to scrapers and social platforms | Trivial | Single attribute in the og:locale meta tag |
| `og:site_name` | Clean brand name shown in unfurl previews | Trivial | Single meta tag |
| Honeypot spam field | Prevents bots filling the form without CAPTCHA friction | Low | Hidden input FormSubmit or EmailJS both support natively |

---

## Anti-Features

Features to explicitly not build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| reCAPTCHA v2 checkbox | Interrupts user flow; accessibility burden; GDPR third-party script loaded on page | Use FormSubmit honeypot (`_honey`) or EmailJS SDK without CAPTCHA |
| Custom backend / serverless function for form | Over-engineered for a static portfolio; maintenance burden | FormSubmit or EmailJS — both are zero-backend |
| Multiple og:image sizes / Twitter Card meta | Micro-optimisation; Twitter/X Card has largely converged on og:image | One 1200×630 PNG handles all major platforms |
| JSON-LD on every page | Person schema is only meaningful on homepage and about; adding to case studies adds noise | Restrict to `index.html` + `about.html` |
| BreadcrumbList JSON-LD | Signals a content-heavy site hierarchy; portfolio doesn't benefit | Omit |
| Google Search Console verification meta tag | Can be done via DNS or sitemap submission instead; avoids a cryptic meta on every page | Submit sitemap via GSC dashboard |

---

## Feature 1: Contact Form

### FormSubmit.co

**How it works (HIGH confidence)**

FormSubmit is a form-to-email SaaS. The form `action` points to `https://formsubmit.co/<your-email>`. On first submission, FormSubmit sends a confirmation email to activate the endpoint. After activation, every submission is forwarded to the configured email address.

**First-time activation flow:**
1. Set `action="https://formsubmit.co/sam.blake@outlook.com"` on the `<form>`.
2. Submit the form once manually.
3. FormSubmit sends an activation email — click the link.
4. All subsequent submissions arrive in inbox.

**Standard HTML mode (no JS — redirect to FormSubmit thank-you page):**
```html
<form action="https://formsubmit.co/sam.blake@outlook.com" method="POST">
  <input type="text"  name="name"    required>
  <input type="email" name="email"   required>
  <textarea           name="message" required></textarea>
  <!-- Redirect back to site after success -->
  <input type="hidden" name="_next"    value="https://samsux.co.uk/src/pages/contact.html">
  <!-- Disable CAPTCHA — use honeypot instead -->
  <input type="hidden" name="_captcha" value="false">
  <!-- Honeypot -->
  <input type="text"   name="_honey"   style="display:none">
  <button type="submit">Send</button>
</form>
```

**AJAX mode (stays on page — recommended for polished feel):**
FormSubmit exposes an AJAX-compatible endpoint at `https://formsubmit.co/ajax/<your-email>`. Submit via `fetch()` with `Content-Type: application/json`. Response is `{ success: "true" }` on success.

```js
const res = await fetch('https://formsubmit.co/ajax/sam.blake@outlook.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
const data = await res.json();
// data.success === "true" → show success state
// fetch throws / non-200 → show error state
```

**Spam protection options (HIGH confidence):**
- `_honey` hidden field — bots fill it, FormSubmit discards the submission. Zero friction for real users.
- `_captcha=false` disables their built-in reCAPTCHA. Use this alongside honeypot to avoid the CAPTCHA redirect.
- No need for any third-party CAPTCHA script.

**Configuration fields (hidden inputs — HIGH confidence):**
| Field | Effect |
|-------|--------|
| `_next` | Redirect URL after standard (non-AJAX) submission |
| `_subject` | Custom subject line for inbox email |
| `_captcha` | `false` disables FormSubmit reCAPTCHA |
| `_honey` | Honeypot field name (can be any name starting with `_honey`) |
| `_autoresponse` | Auto-reply text sent to the submitter |
| `_template` | Email template style (`box`, `table`, `basic`) |

**Success/error states to implement in JS:**
- **Pending:** Disable submit button, show "Sending..." label.
- **Success:** Hide form, show a success message ("Thanks, I'll be in touch soon."). Optionally re-show form after timeout.
- **Error:** Re-enable button, show inline error ("Something went wrong — try emailing me directly.") with the mailto fallback.

**Rate limits (MEDIUM confidence — may have changed):** Free tier allows up to 1,000 submissions/month per email address. More than sufficient for a portfolio.

---

### EmailJS

**How it works (HIGH confidence)**

EmailJS is a client-side SDK that sends email directly from the browser using your connected email provider (Gmail, Outlook, etc.). No backend required.

**Setup steps:**
1. Create free EmailJS account.
2. Connect an email service (Outlook works; link to `sam.blake@outlook.com`).
3. Create an email template — template uses `{{name}}`, `{{email}}`, `{{message}}` variables.
4. Note three IDs: **Service ID** (e.g. `service_xxxxxxx`), **Template ID** (e.g. `template_xxxxxxx`), **Public Key**.

**SDK via CDN (no bundler needed — fits vanilla stack):**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>emailjs.init({ publicKey: 'YOUR_PUBLIC_KEY' });</script>
```

**Send call:**
```js
emailjs.sendForm('service_xxxxxxx', 'template_xxxxxxx', formElement)
  .then(() => { /* success */ })
  .catch(() => { /* error */ });
```

`sendForm()` reads all named inputs from the form element and maps them to template variables automatically.

**Spam protection:** EmailJS provides domain whitelisting in dashboard — only requests from `samsux.co.uk` can use your public key. No honeypot field needed, but adding one costs nothing.

**Rate limits (MEDIUM confidence):** Free tier is 200 emails/month. Adequate for a portfolio.

**Public key exposure (MEDIUM confidence):** The public key is visible in page source. EmailJS mitigates abuse via domain allowlist. This is the accepted trade-off for client-side email services — document it in the KEY DECISIONS table.

---

### FormSubmit vs EmailJS — Trade-off Summary

| Criterion | FormSubmit | EmailJS |
|-----------|-----------|---------|
| Setup friction | Activation email only | Account + service + template setup |
| JS required | No (standard mode) / ~30 lines (AJAX mode) | Yes — SDK must be loaded |
| Extra HTTP dependency | None | CDN script (~20 KB) |
| Stays on page | AJAX mode only | Always |
| Spam protection | Honeypot field | Domain allowlist |
| Rate limit (free) | ~1,000/month | 200/month |
| Key/secret in HTML | No | Public key visible in source |
| Custom auto-reply | Yes (`_autoresponse`) | Yes (template-level) |
| **Recommendation** | **Use FormSubmit AJAX mode** | Fallback if FormSubmit unreliable |

**Verdict:** FormSubmit AJAX mode is lower friction for a static Vite site. No SDK to load, no account beyond activation, higher free tier limit. EmailJS is the right fallback if FormSubmit delivery proves unreliable.

---

## Feature 2: Open Graph Meta Tags

**Specification (HIGH confidence — OGP spec is stable)**

Add inside `<head>` on every page. Use `property=` not `name=` for og: tags (OGP uses RDFa property attributes).

**Required tags (all pages):**
```html
<meta property="og:title"       content="Page Title — Sam Blake | Product Designer">
<meta property="og:description" content="150–160 char description matching meta description">
<meta property="og:url"         content="https://samsux.co.uk/src/pages/contact.html">
<meta property="og:type"        content="website">
<meta property="og:image"       content="https://samsux.co.uk/og-image.png">
<meta property="og:site_name"   content="Sam Blake — Product Designer">
<meta property="og:locale"      content="en_GB">
```

**og:image best practices (HIGH confidence):**
- **Dimensions:** 1200×630 px. This is the canonical size for Facebook, LinkedIn, Twitter/X, Slack, iMessage, WhatsApp unfurls. Do not use smaller.
- **Format:** PNG preferred over JPEG for portfolio (text sharpness). Keep under 1 MB; 300–500 KB is typical.
- **Content:** Name + role + visual identity. Dark background (`#0d1f1a`) + mint teal accent + Fraunces name + "Product Designer" in Urbanist. Optional: one metric chip or screenshot thumbnail.
- **URL:** Must be absolute (not root-relative `/og-image.png`). Platforms fetch the image server-side and cannot resolve relative URLs.
- **File location:** `public/og-image.png` — Vite copies `public/` to build root, so it becomes `https://samsux.co.uk/og-image.png`.
- **One image for all pages:** Acceptable for a personal portfolio. Per-page og:images (with case study thumbnails) would be a differentiator but the complexity is disproportionate at this stage.

**Gotcha:** Platforms cache og:image aggressively. After deploy, use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to force a cache refresh. This is a one-time step after launch.

**`og:type` guidance:**
- `website` on homepage and all standard pages.
- Could use `article` on Stories posts — adds `article:published_time` and `article:author` properties — but this is optional for a portfolio.

---

## Feature 3: JSON-LD Person Schema

**Specification (HIGH confidence — Schema.org/Person is stable)**

Place a `<script type="application/ld+json">` block in `<head>` of `index.html` and `about.html`.

**Minimum valid Person schema (passes Google Rich Results Test):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sam Blake",
  "url": "https://samsux.co.uk",
  "jobTitle": "Product Designer",
  "description": "Product designer with 3 years' experience across fintech, retail, and property. Based in the North West of England.",
  "email": "sam.blake@outlook.com"
}
```

**Optional fields that add value (MEDIUM confidence — not required to validate, but improve Knowledge Panel eligibility):**
```json
{
  "sameAs": [
    "https://www.linkedin.com/in/samuel-blake-224605186"
  ],
  "knowsAbout": ["Product Design", "UX Research", "Fintech", "Design Systems"],
  "worksFor": {
    "@type": "Organization",
    "name": "Matalan"
  },
  "alumniOf": [
    {
      "@type": "Organization",
      "name": "Santander UK"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "North West England",
    "addressCountry": "GB"
  }
}
```

**Required vs optional summary:**
| Field | Required to validate | Value |
|-------|---------------------|-------|
| `@context` | Yes | Schema.org namespace |
| `@type` | Yes | Declares this is a Person |
| `name` | Yes | Core identity |
| `url` | Strongly recommended | Canonical homepage URL |
| `jobTitle` | Strongly recommended | Improves Knowledge Panel |
| `description` | No | Rich snippet text |
| `email` | No | Enables mailto sitelink |
| `sameAs` | No | LinkedIn profile verification |
| `worksFor` | No | Current employer context |
| `image` | No | Headshot URL (must be absolute) — add when a headshot is available |

**Validation:** Test with [Google Rich Results Test](https://search.google.com/test/rich-results) post-deploy.

**Do not add to:** Case study pages, Stories posts, Contact page. Person schema is about the individual, not the content.

---

## Feature 4: sitemap.xml

**Specification (HIGH confidence — sitemaps.org protocol is stable, Google-supported)**

**File location:** `public/sitemap.xml` — Vite copies to root on build.

**Format for 8-page static site:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://samsux.co.uk/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/about/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/work/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/case-studies/i-exchange/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/case-studies/cassi/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/case-studies/community/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/stories/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/stories/design-systems-and-portfolio-sites/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://samsux.co.uk/contact/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>

</urlset>
```

**Notes on URL format:**
- Use clean URLs with trailing slash (e.g. `/about/`). This requires server-side rewrite rules OR the host must be configured to serve `about/index.html` from `https://samsux.co.uk/about/`. Vite's current output is `.html` extension. Verify hosting config (Vercel/Netlify rewrite clean URLs automatically; GitHub Pages does not).
- If hosting does not support clean URLs, use the `.html` extension URLs in the sitemap instead (e.g. `https://samsux.co.uk/src/pages/about.html`). These must exactly match the canonical tags on each page.
- `changefreq` and `priority` are hints only — Google largely ignores them but they are convention.
- `<lastmod>` is optional and can cause confusion if not updated. Omit unless using a build script to generate it automatically.

**Submit to Google Search Console:** After deploying, add the sitemap URL under Settings > Sitemaps in GSC. Also add `Sitemap:` line to `robots.txt`.

---

## Feature 5: robots.txt

**Specification (HIGH confidence — robots exclusion protocol is stable)**

**File location:** `public/robots.txt` — Vite copies to root on build.

**Minimum correct file:**
```
User-agent: *
Allow: /

Sitemap: https://samsux.co.uk/sitemap.xml
```

**Guidance:**
- `User-agent: *` applies the rule to all crawlers.
- `Allow: /` explicitly permits crawling of the entire site. This is the correct default for a portfolio — you want everything indexed.
- `Disallow:` with no path value is also valid for "allow everything" but is less explicit.
- Do not add `Disallow: /src/` — Vite builds to `dist/`. The `src/` path does not exist in production. Adding spurious Disallow rules risks accidentally blocking pages.
- The `Sitemap:` line tells Google, Bing, and all compliant crawlers the sitemap location without a separate GSC submission step.

**Common mistake to avoid:** A stray `Disallow: /` (with a trailing slash and no path) blocks the entire site. Triple-check the file before deploy.

---

## Feature Dependencies

```
og:image asset creation → og:image meta tag on all pages
Hosting clean-URL config → sitemap.xml URL format decision
FormSubmit activation email → working contact form
Contact form AJAX JS → success/error state CSS (new component states in _contact.css)
JSON-LD → no dependencies, pure head addition
sitemap.xml → robots.txt Sitemap: line references it
canonical URLs decided → og:url + sitemap.xml must use same URL pattern
```

---

## MVP Recommendation

**Phase: Contact Form**
1. Add FormSubmit AJAX form to `contact.html` — fields: name, email, message.
2. Add honeypot field (`_honey`) and `_captcha=false`.
3. Write ~30-line vanilla JS for pending/success/error states.
4. Add CSS for form fields and state variants to `_contact.css`.
5. Activate endpoint via first manual submission.

**Phase: SEO Meta Suite**
1. Add `theme-color` meta to all 8 pages via Handlebars nav partial or per-page head (trivial).
2. Add unique `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `og:site_name`, `og:locale` to all 8 pages.
3. Add `<link rel="canonical">` to all 8 pages.
4. Create `og-image.png` (1200×630 px) and place in `public/`.
5. Add JSON-LD Person schema to `index.html` and `about.html` only.
6. Write `public/sitemap.xml` — 8 (or 9 with `/work/`) URLs.
7. Write `public/robots.txt` — 3 lines.
8. Audit/update `<title>` and `meta description` on all pages for uniqueness and character length.

**Defer:**
- Per-page og:image (case study thumbnails): High asset-creation cost, low immediate return. Revisit once content is stable.
- `article` og:type on Stories posts: Low value until there are multiple posts.
- EmailJS: Only if FormSubmit delivery proves unreliable in practice.
- Google Search Console submission: Post-deploy step, not a code task.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| FormSubmit behaviour | MEDIUM | Training data; product UI and free tier limits may have changed. Verify activation flow on first use. |
| FormSubmit AJAX endpoint | MEDIUM | `formsubmit.co/ajax/<email>` documented in community examples; verify current endpoint URL in their docs. |
| EmailJS SDK usage | MEDIUM | SDK v4 documented in training. Public key + sendForm() pattern is stable. |
| Open Graph spec | HIGH | OGP spec has been stable since 2010; 1200×630 is the universal canonical size. |
| JSON-LD Person schema | HIGH | Schema.org spec is stable; fields verified against schema.org/Person. |
| sitemap.xml format | HIGH | sitemaps.org protocol is stable; Google documentation confirms field usage. |
| robots.txt format | HIGH | Robots exclusion protocol has been stable for decades. |
