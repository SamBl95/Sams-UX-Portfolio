# Domain Pitfalls

**Domain:** Contact form + SEO additions to a static Vite MPA portfolio
**Researched:** 2026-05-18
**Confidence note:** Web/WebFetch tools unavailable in this session. All findings drawn from training-data knowledge of FormSubmit, EmailJS, Open Graph, JSON-LD, and Vite static site patterns. Confidence levels reflect this — nothing is LOW-confidence here as these are well-established, stable behaviours, but official docs should be checked for any service-specific rate limit numbers before implementation.

---

## Critical Pitfalls

### Pitfall 1: FormSubmit spam trap field hidden with CSS display:none

**What goes wrong:** FormSubmit's built-in honeypot (`_honey` input) is a field that must be present in the DOM but invisible to humans. If you hide it with `display:none` or `visibility:hidden`, FormSubmit detects it as "definitely hidden by developer" rather than "empty because a human left it blank", and the trap no longer functions. Bots that fill all fields still get through.

**Why it happens:** Developers assume any CSS-hidden field is fine. FormSubmit specifically requires the honeypot to appear invisible via opacity/positioning, not via display/visibility removal.

**Consequences:** Spam floods sam.blake@outlook.com. No other protection on a static form.

**Prevention:**
- Name the honeypot field `_honey` (FormSubmit's reserved name)
- Hide it with `opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0;` — not `display:none`
- Add `tabindex="-1"` and `aria-hidden="true"` so keyboard users and screen readers skip it
- Add `autocomplete="off"` to prevent password managers from filling it

**Detection:** Test with a bot-simulation tool or manually fill the honeypot field — a legitimate submission should be silently dropped.

---

### Pitfall 2: FormSubmit CORS error on the first submission (unactivated endpoint)

**What goes wrong:** FormSubmit requires email activation before it accepts submissions. The first POST to `https://formsubmit.co/your@email.com` returns a CORS error or a redirect to an activation page, not a 200. Developers see the CORS error in devtools and assume a code problem.

**Why it happens:** FormSubmit's activation step is easy to miss in docs. The activation email goes to the destination address and must be clicked before any form submission succeeds.

**Consequences:** Live site contact form is broken until activation is completed. If tested before activation, devs may waste hours debugging CORS headers.

**Prevention:**
- Activate the endpoint immediately after wiring the form — do not test the live form before activation
- Use `_next` hidden input to redirect to a custom thank-you page after submission, so the default FormSubmit redirect page (which looks off-brand) never shows
- Add `_captcha=false` hidden input if you want to disable their reCAPTCHA and rely on honeypot only

**Detection:** Any fetch/XHR to formsubmit.co that returns a CORS error with 0 status — check activation email first.

---

### Pitfall 3: EmailJS public key committed to source or hardcoded in JS

**What goes wrong:** EmailJS requires a public key (`emailjs.init('YOUR_PUBLIC_KEY')`) in client-side JavaScript. This key is designed to be public (it only authorises sending from allowed domains). However, developers also need a Service ID and Template ID — those are not secret by themselves, but the combination enables anyone who reads your source to send emails using your template, burning your monthly quota (200 free/month on the free tier).

**Why it happens:** EmailJS markets the public key as "safe to expose". That is true for abuse-of-identity but not for quota exhaustion. The real risk is automated scripts that spam your template using your own credentials, consuming your 200 free emails rapidly.

**Consequences:** Monthly quota exhausted before real submissions arrive. Contact form silently fails (EmailJS returns 429 or quota error) without any visible error to the user unless you handle the promise rejection.

**Prevention:**
- Set allowed origins in the EmailJS dashboard — restrict to `samsux.co.uk` only (and `localhost` for dev). This prevents the template from being invoked from other domains even if the key is read.
- Never commit the key to a public GitHub repo without the domain restriction set first
- Handle the EmailJS send promise explicitly: show a visible error state if `emailjs.send()` rejects, rather than failing silently
- Add client-side rate limiting: disable the submit button after one submission per page load

**Detection:** EmailJS dashboard shows sent count. A sudden spike of sends with no corresponding real submissions indicates script abuse.

---

### Pitfall 4: og:image missing or pointing to a relative path

**What goes wrong:** The most important Open Graph tag — `og:image` — is the most commonly omitted or broken one. When a URL is shared on LinkedIn, Twitter, Slack, or iMessage and `og:image` is missing, the preview renders as a grey box. For a product designer's portfolio, this is a significant credibility hit.

**Why it happens:** Static Vite sites serve images from `public/` but Open Graph requires an absolute URL including protocol and domain. A path like `/og-image.png` resolves to nothing when Facebook or LinkedIn's scraper fetches it — scrapers do not resolve relative paths against the page URL reliably.

**Consequences:** Every link share of the portfolio shows a blank preview. LinkedIn job applications with a portfolio link look unprofessional.

**Prevention:**
- Place the OG image in `public/` (e.g. `public/og-image.png`)
- Use the full absolute URL in the meta tag: `<meta property="og:image" content="https://samsux.co.uk/og-image.png">`
- Image dimensions: 1200x630px minimum. Under 200x200px is ignored by most platforms.
- Image file size: under 300KB — LinkedIn and Slack cache aggressively and may time out on large images
- Verify with LinkedIn Post Inspector (linkedin.com/post-inspector) and Facebook Sharing Debugger after deploy

**Detection:** Share the URL in a Slack DM to yourself — Slack renders previews immediately and is the fastest debug tool.

---

### Pitfall 5: og:type set incorrectly for portfolio pages

**What goes wrong:** Every page on the site uses `og:type="website"` when it should. Case study pages are not articles (`article`) despite reading like long-form content. Using `og:type="article"` on case study pages triggers LinkedIn and Facebook to look for `article:published_time`, `article:author`, and `article:section` tags — which are missing — causing incomplete or malformed previews.

**Why it happens:** Developers see long-form content and assume `article` is the right type.

**Consequences:** Scrapers may render degraded previews for case study pages. No functional breakage but inconsistent preview quality.

**Prevention:** Use `og:type="website"` on all pages. Only use `article` if you are adding `article:*` meta tags for every article property. For this site, `website` is always correct.

---

### Pitfall 6: og:locale uses wrong format

**What goes wrong:** `og:locale` must be in the format `language_TERRITORY` with an underscore, e.g. `en_GB`. Using `en-GB` (hyphen, the BCP-47 format used in `lang` attributes) is silently ignored by most platforms but technically malformed per the Open Graph spec.

**Why it happens:** The `lang="en"` HTML attribute uses BCP-47 (hyphens). Developers copy the same format.

**Consequences:** Low severity — most scrapers accept both. But `en_GB` signals UK locale correctly for LinkedIn, which affects how post previews surface.

**Prevention:** Use `en_GB` (underscore) for `og:locale`, and keep `lang="en"` (no territory needed) on the `<html>` element.

---

### Pitfall 7: JSON-LD placed in the wrong position or in the body

**What goes wrong:** JSON-LD `<script type="application/ld+json">` blocks are technically valid anywhere in the document per the JSON-LD spec, but Google's documentation recommends `<head>`. Placing them in `<body>` after other scripts, or inside partial templates where Handlebars inserts them mid-document, can cause Google Search Console to flag them as "unparseable" in some crawl edge cases.

**Why it happens:** In Vite MPA with Handlebars partials, it is tempting to put schema markup inside a component partial. But nav.html and footer.html are included on every page — schema on those partials fires on all pages, which is wrong (Person schema should only be on index.html and about.html).

**Consequences:** Duplicate or misapplied schema. Google may show schema errors in Search Console. Footer/nav partials with embedded JSON-LD will inject Person schema on every case study page.

**Prevention:**
- Place JSON-LD in `<head>` of the specific HTML page file, not inside any component partial
- For this site: Person schema in `index.html` and `about.html` only
- Validate with Google Rich Results Test (search.google.com/test/rich-results) before marking done

---

### Pitfall 8: JSON-LD missing required fields for Person schema

**What goes wrong:** The `Person` schema type has a small set of "recommended" fields that, if missing, cause Google to show the schema as valid but incomplete. The most commonly missed field is `url` — it must be the canonical URL of the page, not just the homepage. Missing `sameAs` (pointing to LinkedIn, GitHub) means the schema adds no value to Google's knowledge graph.

**Why it happens:** Developers copy a minimal schema snippet that only has `@type`, `name`, and `email`.

**Consequences:** No rich result eligibility. Schema validates but does nothing useful in search.

**Prevention:** Minimum viable Person schema for this portfolio:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sam Blake",
  "url": "https://samsux.co.uk",
  "jobTitle": "Product Designer",
  "email": "mailto:sam.blake@outlook.com",
  "sameAs": [
    "https://www.linkedin.com/in/samuel-blake-224605186"
  ]
}
```
Do not add `telephone` unless it is a business number — personal numbers in public schema are a privacy risk.

---

### Pitfall 9: Canonical URL www vs non-www inconsistency

**What goes wrong:** If the site is accessible at both `https://samsux.co.uk` and `https://www.samsux.co.uk` with no redirect, and canonical tags point to only one variant, Google may split link equity across both. Worse: if some pages have `rel="canonical"` pointing to `samsux.co.uk` and others to `www.samsux.co.uk`, Google sees them as separate duplicate pages and may de-rank both.

**Why it happens:** The canonical tag is added manually per page. Without a template or checklist, one page gets `www.` and another does not.

**Consequences:** Diluted PageRank. Possible duplicate content penalty for a small site that cannot afford it.

**Prevention:**
- Decide on one canonical form before writing a single canonical tag: `https://samsux.co.uk` (no www) is the standard for portfolio sites
- Configure a server-level 301 redirect from `www.samsux.co.uk` to `samsux.co.uk` at the hosting layer (Netlify/Vercel handle this in their dashboard — it is not a Vite concern)
- Every canonical tag must be an absolute URL: `<link rel="canonical" href="https://samsux.co.uk/src/pages/about.html">` — not a root-relative path

---

### Pitfall 10: Vite MPA generates URLs with /src/pages/ path in production

**What goes wrong:** In the Vite MPA config, pages live at paths like `src/pages/about.html`. In development, Vite serves them at `http://localhost:5173/src/pages/about.html`. In production (after `vite build`), the output directory mirrors this path: `dist/src/pages/about.html`. The canonical URLs, Open Graph `og:url`, and sitemap entries must reflect the actual production URL path.

If Netlify or Vercel is configured with URL rewrites to serve `about.html` at `samsux.co.uk/about`, the canonical must say `https://samsux.co.uk/about` — not `https://samsux.co.uk/src/pages/about.html`. There will be a mismatch if canonical tags are written before the deployment URL structure is confirmed.

**Why it happens:** Vite MPA path structure is unusual. Most tutorials assume a bundler that flattens output. The Vite MPA keeps the input directory structure in `dist/`.

**Consequences:** Canonical URLs pointing to a path that either 404s or differs from the real URL. Sitemap entries that Google cannot verify. SEO effort is wasted.

**Prevention:**
- Confirm the exact production URL for each page before writing canonical tags or sitemap entries
- If using Netlify, check whether `_redirects` or `netlify.toml` rewrites are remapping paths — write canonical tags to match the rewritten URL, not the source path
- Test with `vite build && npx serve dist` and navigate to each page URL before adding SEO tags

---

## Moderate Pitfalls

### Pitfall 11: sitemap.xml using file paths instead of canonical URLs

**What goes wrong:** The sitemap includes `https://samsux.co.uk/src/pages/about.html` instead of `https://samsux.co.uk/about`. Google fetches each URL in the sitemap — if those URLs 404 or redirect, Google ignores them.

**Prevention:** Write sitemap URLs to match the canonical URLs exactly. Verify each URL returns 200 before submitting to Search Console.

---

### Pitfall 12: sitemap.xml missing or wrong date format in `<lastmod>`

**What goes wrong:** `<lastmod>` must be W3C Datetime format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS+00:00`. Using `18/05/2026` (UK date format) or `May 18 2026` causes sitemap validation failure in Search Console.

**Prevention:** Use `2026-05-18` format. For a static site with hand-authored sitemap, set lastmod to the date content was last genuinely changed — not today's date on every deploy (Google discounts sitemaps where lastmod never changes or always matches deploy date).

---

### Pitfall 13: robots.txt missing Sitemap directive

**What goes wrong:** A robots.txt without `Sitemap: https://samsux.co.uk/sitemap.xml` means Googlebot must be told about the sitemap via Search Console manually. The `Sitemap:` directive is the fastest passive discovery method.

**Prevention:**
```
User-agent: *
Allow: /

Sitemap: https://samsux.co.uk/sitemap.xml
```
Place `robots.txt` in `public/` — Vite copies `public/` contents to `dist/` root unchanged.

---

### Pitfall 14: Contact form submit button not disabled after send

**What goes wrong:** Without disabling the submit button after the first click, impatient users click multiple times, firing multiple FormSubmit or EmailJS requests. This can cause duplicate emails and (for EmailJS) quota exhaustion.

**Prevention:** Disable the button in the submit handler and restore it only on error. Add a visible loading state (button text change or spinner) to communicate that submission is in progress.

---

### Pitfall 15: No success/error feedback on form submission

**What goes wrong:** Using FormSubmit's default redirect means the user leaves the portfolio entirely. Using a custom `_next` URL that does not exist gives a 404. Using EmailJS without handling the promise means the user gets no feedback if the send fails.

**Prevention:**
- FormSubmit: use `_next` pointing to a real thank-you route or the same page with a `?sent=1` query param, then use JS to detect the param and show inline confirmation
- EmailJS: always attach `.then()` and `.catch()` handlers to `emailjs.send()` — show visible success and error states

---

## Minor Pitfalls

### Pitfall 16: theme-color meta tag missing on all pages

**What goes wrong:** `<meta name="theme-color" content="#0d1f1a">` is only added to index.html and forgotten on the other 7 pages. Mobile Chrome shows a white or grey browser chrome bar on the other pages.

**Prevention:** Add to the nav.html partial — this is one of the few meta tags that belongs in a shared partial rather than per-page head, since it is the same value on every page. Alternatively, add it to each page's `<head>` as part of the SEO pass.

---

### Pitfall 17: og:image not invalidated in social platform caches after update

**What goes wrong:** LinkedIn, Facebook, and Slack aggressively cache og:image. If the image is updated, the cached version persists for days or weeks.

**Prevention:** Append a cache-busting query string to the og:image URL when updating it: `og-image.png?v=2`. This is a one-time fix when the image changes, not needed on initial launch.

---

### Pitfall 18: JSON-LD not validated before submission to Search Console

**What goes wrong:** A JSON syntax error (trailing comma, unescaped character in email value like `mailto:sam@outlook.com` used as a bare string instead of a URL) causes the entire schema block to be silently ignored.

**Prevention:** Validate every JSON-LD block with Google Rich Results Test before marking the SEO phase complete. The test catches syntax errors the browser console does not surface.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Contact form — FormSubmit wiring | Honeypot hidden with display:none | Use opacity/position trick, not display:none |
| Contact form — FormSubmit wiring | CORS error on unactivated endpoint | Activate endpoint before any live testing |
| Contact form — EmailJS alternative | Quota exhausted by script abuse | Set allowed origins in EmailJS dashboard before going live |
| Contact form — both services | No user feedback on success/error | Wire explicit .then/.catch or _next redirect before shipping |
| SEO — Open Graph | og:image missing or relative path | Absolute URL, 1200x630, under 300KB, in public/ |
| SEO — Open Graph | og:type="article" on case studies | Always use "website" for this portfolio |
| SEO — JSON-LD | Schema in Handlebars partial (fires on all pages) | Inline JSON-LD in specific page <head> only |
| SEO — JSON-LD | Missing sameAs or url fields | Use the minimum viable schema shown in Pitfall 8 |
| SEO — Canonicals | /src/pages/ path in canonical vs rewritten URL | Confirm production URL structure before writing tags |
| SEO — Canonicals | www vs non-www inconsistency | Decide before writing first tag; set hosting redirect |
| SEO — sitemap.xml | sitemap URLs don't match canonical URLs | Write sitemap after confirming production URLs |
| SEO — sitemap.xml | Wrong lastmod date format | Use YYYY-MM-DD only |
| SEO — robots.txt | Missing Sitemap directive | Always include Sitemap: line pointing to sitemap.xml |

## Sources

- FormSubmit: https://formsubmit.co (documentation; web tools unavailable — from training knowledge, MEDIUM confidence on specifics)
- EmailJS: https://www.emailjs.com/docs (training knowledge, MEDIUM confidence on rate limit numbers — verify free tier quota before implementation)
- Open Graph Protocol: https://ogp.me (stable spec, HIGH confidence)
- Schema.org Person type: https://schema.org/Person (stable spec, HIGH confidence)
- Google Search Central — Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview (HIGH confidence)
- Vite MPA path structure: vite.config.js in this repo (HIGH confidence — verified directly)
