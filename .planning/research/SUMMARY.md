# Project Research Summary

**Project:** Sam Blake Portfolio v2 - v3.0 Content and SEO milestone
**Domain:** Static portfolio site (Vite MPA, vanilla HTML/CSS) - contact form and SEO meta suite additions
**Researched:** 2026-05-18
**Confidence:** HIGH

## Executive Summary

This milestone adds two distinct capabilities to an already-built stable stack: a working contact form and a complete SEO meta suite. Neither requires architectural change. The recommended approach is FormSubmit for the contact form (pure HTML form action, zero new npm dependencies, no SDK, no account beyond a one-click email activation) paired with a minimal vanilla form.js module for success/error UX. All SEO additions are static HTML with zero new dependencies.

The primary implementation risk is sequencing: canonical URLs, og:url, and sitemap.xml entries must match the actual production URL structure, which is currently unconfirmed. The Vite MPA preserves source directory paths in dist/ so pages live at paths like /src/pages/about.html, but Netlify/Vercel can rewrite these to clean paths. Writing SEO tags before verifying the production URL pattern produces incorrect canonicals. Resolve this first.

The secondary risk is the FormSubmit honeypot field: it must be hidden via opacity:0 with position:absolute, not display:none, or spam protection is silently bypassed. Some FormSubmit documentation shows the wrong display:none approach.

---

## Key Findings

### Recommended Stack

No new npm dependencies are required for this milestone. FormSubmit is an external service accessed via a plain HTML form action attribute. The optional vite-plugin-sitemap is deferred: with 8-9 pages and stable URLs, manual sitemap.xml authoring is equivalent effort with zero dependency cost.

**Stack additions (v3.0):**
- FormSubmit.co: contact form backend via plain HTML form action, ~30-line form.js for AJAX UX only
- Open Graph meta tags: static meta property elements in each page head
- JSON-LD Person schema: in index.html and about.html only
- public/sitemap.xml: hand-authored static file, Vite copies verbatim to dist/
- public/robots.txt: 3-line static file
- public/og-image.png: 1200x630 static asset, stable non-fingerprinted URL

**EmailJS: not recommended.** Requires a ~7-20 kB SDK, account setup, and a 200/month free-tier cap. FormSubmit has none of these drawbacks.

### Expected Features

**Must have (table stakes):**
- Working contact form with name, email, message fields and visible success/error feedback
- Unique title per page (currently near-identical across all pages)
- Unique meta description per page at 150-160 chars
- og:title, og:description, og:url, og:image, og:type on all pages
- og:image at 1200x630 in public/ with absolute URL reference
- link rel canonical on all pages
- public/sitemap.xml so Googlebot discovers case study pages
- public/robots.txt - missing robots.txt shows as 404 in Search Console
- meta theme-color on all pages

**Should have (differentiators):**
- FormSubmit AJAX mode for in-page success state without redirect to FormSubmit domain
- JSON-LD Person schema on index.html and about.html for Knowledge Panel eligibility
- og:locale en_GB for correct UK market signal on LinkedIn
- og:site_name for clean brand name in unfurl previews
- _honey honeypot field hidden correctly via opacity/position, not display:none

**Defer to later milestone:**
- Per-page og:image with case study thumbnails
- og:type article on Stories posts
- vite-plugin-sitemap auto-generation
- Google Search Console submission (post-deploy step, not a code task)
- Clean URL rewrites (/about vs /src/pages/about.html)

### Architecture Approach

All additions integrate with established codebase patterns. No existing files change structurally. FormSubmit JS follows the existing module pattern: src/form.js loaded via script type module in contact.html only, matching typewriter.js, reveal.js, and theme.js. SEO meta tags go directly into each page head. A Handlebars partial for meta is explicitly rejected because vite-plugin-handlebars pageContextResolver does not inject per-page context into partials. The og:image lives in public/ because Vite fingerprints assets in src/, changing the URL on every rebuild.

**New files:**
1. src/form.js - FormSubmit AJAX handler, pending/success/error states, ~30 lines
2. public/sitemap.xml - hand-authored, 8 URLs
3. public/robots.txt - 3 lines
4. public/og-image.png - 1200x630 design asset

**Modified files (SEO meta pass):**
- index.html - SEO meta block + JSON-LD Person schema
- src/pages/about.html - SEO meta block + JSON-LD Person schema
- src/pages/contact.html - SEO meta block + form markup + script module /src/form.js
- src/pages/case-studies/i-exchange.html, cassi.html, community.html - SEO meta block
- src/pages/stories/index.html, design-systems-and-portfolio-sites.html - SEO meta block

No changes to vite.config.js, main.css, or existing JS modules.

### Critical Pitfalls

1. **FormSubmit honeypot hidden with display:none** - Defeats spam protection silently. Use opacity:0 with position:absolute, tabindex=-1, and aria-hidden=true instead.

2. **Vite MPA /src/pages/ in production URLs** - Canonicals, og:url, and sitemap must match actual served URLs exactly. Confirm production URL structure before writing any canonical tag.

3. **JSON-LD in a Handlebars partial** - nav.html and footer.html render on every page. Person schema in a partial fires on all pages. JSON-LD must go inline in the specific page head only.

4. **og:image with relative URL or in Vite module graph** - Social scrapers need absolute URLs. Assets in src/ get fingerprinted on each build. Place in public/, use full absolute URL.

5. **FormSubmit endpoint unactivated on first use** - First POST returns a CORS error until the confirmation email is clicked. This is an activation step, not a code bug.

---

## Implications for Roadmap

### Phase 1: Foundation Decisions
**Rationale:** Two open questions block all SEO work and cannot be deferred past the start of implementation.
**Delivers:** Confirmed production URL pattern; og:image design asset created.
**Actions:** Check live samsux.co.uk URL structure in browser address bar; confirm www redirect at hosting layer; create public/og-image.png (1200x630, dark palette #0d1f1a, under 300 KB).

### Phase 2: Contact Form
**Rationale:** Self-contained, no dependency on URL structure confirmation. Can run in parallel with Phase 1.
**Delivers:** Working contact form with spam protection and in-page AJAX success/error states.
**Avoids:** Honeypot display:none trap; CORS on unactivated endpoint; double-submit; silent failure on error.
**Files:** src/pages/contact.html (form markup), src/form.js (AJAX handler).

### Phase 3: SEO Meta Suite
**Rationale:** Depends on Phase 1 delivering confirmed production URLs and the og:image asset. With those resolved, the 8-page meta pass is mechanical HTML editing.
**Delivers:** All 8 pages with complete OG meta, canonical links, theme-color; JSON-LD on 2 pages; sitemap.xml and robots.txt.
**Avoids:** Relative og:image URL; og:type article on case studies; og:locale hyphen format; JSON-LD in partials; canonical www inconsistency; sitemap URL mismatch.
**Files:** All 8 HTML pages; public/sitemap.xml; public/robots.txt.

### Phase Ordering Rationale

- Phase 1 unblocks Phase 3. Phase 2 is independent and can proceed any time.
- Contact form and SEO are separate phases: form needs live submission testing; SEO needs a deploy to validate with LinkedIn Post Inspector and Google Rich Results Test.
- Post-deploy verification steps are not code tasks and do not block phase completion.

### Research Flags

Phases with standard patterns (no research-phase needed):
- **Phase 2 (Contact Form):** Fully documented in research files.
- **Phase 3 (SEO Meta Suite):** All specifications stable and fully detailed in research files.

Phases requiring a live-site verification step (5-minute check, not a research phase):
- **Phase 1 (URL structure):** Inspect samsux.co.uk to confirm actual URL format in browser address bar.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | FormSubmit vs EmailJS is unambiguous; all other additions are zero-dependency static HTML |
| Features | HIGH | OGP spec, JSON-LD Person schema, sitemap protocol, robots.txt are stable specifications |
| Architecture | HIGH | Confirmed from codebase: publicDir config, JS module pattern, favicon precedent, Handlebars partial limitation |
| Pitfalls | HIGH | Honeypot trap, CORS activation, JSON-LD partial injection, og:image fingerprinting are well-understood behaviours |

**Overall confidence:** HIGH

### Gaps to Address

- **Production URL structure:** Cannot write canonicals or sitemap without confirming whether samsux.co.uk serves /src/pages/about.html or a rewritten /about. Resolve before Phase 3.
- **og:image design asset:** Must be created before Phase 3. Creative task, no technical uncertainty.
- **FormSubmit activation:** Manual activation step required as Phase 2 completion criterion.

---

## Sources

### Primary (HIGH confidence)
- Open Graph Protocol - ogp.me (stable spec since 2010)
- Schema.org/Person - schema.org (stable vocabulary)
- Google Search Central Sitemaps - developers.google.com/search/docs/crawling-indexing/sitemaps
- Vite publicDir behaviour - confirmed via vite.config.js and existing public/favicon.png in this repo
- Vite MPA path structure - verified directly from vite.config.js rollupOptions.input

### Secondary (MEDIUM confidence)
- FormSubmit.co integration - training knowledge, stable API since 2019; verify activation flow against current docs before implementation
- EmailJS SDK - training knowledge; JS-required architectural constraint is stable
- vite-plugin-sitemap - github.com/jbaubree/vite-plugin-sitemap; version not verified; deferred

---
*Research completed: 2026-05-18*
*Ready for roadmap: yes*
