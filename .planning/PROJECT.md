# Sam Blake Portfolio v2

## What This Is

A personal portfolio site for Sam Blake, a product designer with 3 years of experience across fintech (Santander UK), retail (Matalan), and property. Built as a Vite MPA with vanilla HTML/CSS. The site targets hybrid/remote product design roles in the North West England market.

Every interaction feels intentional: premium card hover overlays, staggered scroll-reveals, responsive typography at all breakpoints, and a complete case study component library ready for real content.

## Core Value

A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and every component is polished enough that adding content is the only remaining task.

## Current State: v3.0 Shipped 2026-05-19

All four phases complete. The site has real content, a working contact form, and full SEO metadata.

**Shipped in v3.0:**
- Hero redesigned: "Sam Blake" h2 accent + "A Product Designer who" subhead, 4-element stagger
- Nav: Home link, logo removed, flat tab underline animation, no bottom border
- /work page with measurable outcome chips for all 3 case studies
- About: work history timeline + skills sections
- Contact form: Web3Forms AJAX, in-page feedback, JS validation, honeypot
- 10-page SEO suite: titles, descriptions, canonical URLs, OG tags, JSON-LD, sitemap, robots.txt

## Previous State (v2.0)

**Shipped:** 2026-05-18

- 8-page site fully polished: Home, About, I-Exchange, CASSI, Community, Contact, Stories index, Stories post
- Dark palette: deep forest (`#0d1f1a`) + mint teal accent (`#4fd1a5`) — premium, distinctive
- CSS animation infrastructure: scroll-reveal utility, 3 easing tokens, state-layer hover pattern
- Nav fully audited: Fraunces logo, 56px height, scroll shadow, active accent border, mobile menu animation
- Hero: 5-element entrance stagger, 860px wide-screen constraint
- Cards: Fraunces metric values, state-layer hover overlay, pointer-fine gate, 3-col grid at 1240px+
- 7 case study storytelling components built and wired (image-block, callout, pull-quote, process-steps, before-after, metrics-row, two-column)
- Content pages: 72ch reading width, 600px contact column, stories clip-path border reveal
- Accessibility: `prefers-reduced-motion` blocks in every animated file; `(hover: hover) and (pointer: fine)` gate on all hover interactions
- Zero hardcoded values outside `_variables.css`; zero em dashes in page titles/h1s

## Requirements

### Validated (v1.0)

- ✓ Homepage with typewriter hero — v1.0
- ✓ About page — v1.0
- ✓ Case study pages: I-Exchange, CASSI, Community — v1.0
- ✓ Contact page with complete section structure — v1.0
- ✓ Stories index + one working post example — v1.0
- ✓ Consistent nav (Handlebars partial) across all 8 pages — v1.0
- ✓ Consistent footer (Handlebars partial) across all 8 pages — v1.0
- ✓ Active nav states per page type — v1.0
- ✓ All pages registered in Vite rollupOptions.input — v1.0
- ✓ Zero broken internal links — v1.0
- ✓ Light palette with deep teal accent — v1.0 (palette evolved to dark in v2.0)
- ✓ Semibold Fraunces headings; 5-step responsive h1 scale — v1.0
- ✓ CSS coherent — ITCSS, BEM, no hex outside variables — v1.0

### Validated (v2.0)

- ✓ CSS animation infrastructure: 3 easing tokens, scroll-reveal utility, state-layer pattern — v2.0
- ✓ Nav: 56px height, Fraunces logo, scroll shadow, active accent border, correct spacing — v2.0
- ✓ Hero: 5-element stagger entrance, 860px wide-screen constraint — v2.0
- ✓ Button system: token padding, 36/40px heights, scale(0.97) press, all three variants — v2.0
- ✓ Cards: Fraunces metric values, state-layer overlay, whole-card arrow, press feedback, pointer-fine gate — v2.0
- ✓ Case study grid: 3 columns at 1240px+, 0/100/200ms scroll-stagger — v2.0
- ✓ 7 case study components built and wired in main.css — v2.0
- ✓ Content pages: 72ch reading width, 600px contact column, stories clip-path hover reveal — v2.0
- ✓ Accessibility: prefers-reduced-motion in every animated file; pointer-fine gate on all hover — v2.0
- ✓ Token audit: zero hardcoded values, zero em dashes in titles/h1s, typography comment corrected — v2.0

### Validated (v3.0)

- ✓ Hero: "Sam Blake" h2 accent + "A Product Designer who" subhead, 4-element stagger — v3.0
- ✓ Hero content width uses flex/available-space, no fixed pixel constraint — v3.0
- ✓ Paragraph elements on content pages use available-space width — v3.0
- ✓ Nav: Home link, logo removed, flat tab underline animation, no bottom border — v3.0
- ✓ Active nav link: semibold + persistent underline — v3.0
- ✓ /work page with feature-row layout, linked from nav — v3.0
- ✓ I-Exchange, CASSI, Community case studies: real narrative copy and measurable outcomes — v3.0
- ✓ About page: work history (Matalan, Santander UK, Self-employed) + skills sections — v3.0
- ✓ Stories: placeholder article with date, headings, real copy — v3.0
- ✓ Contact form: Web3Forms AJAX, success/error states, JS validation, honeypot — v3.0
- ✓ Email delivery to sam.blake@outlook.com confirmed — v3.0
- ✓ 10-page SEO suite: unique titles, meta descriptions, canonical URLs, OG tags, theme-color — v3.0
- ✓ JSON-LD Person schema on index.html and about.html — v3.0
- ✓ sitemap.xml (10 clean-path entries), robots.txt, vercel.json clean URL rewrites — v3.0

## Current Milestone: v4.0 Content & Visuals

**Goal:** Fill the remaining content gaps — CV copy, PDF download button, and real images across every visual placeholder in the site.

**Target features:**
- CV page: 3 work history descriptions + download PDF button
- About page: wire up existing TODO download CV button
- /work page: real images for each feature row (sourced from Webflow)
- Homepage: real thumbnail images on case study cards (sourced from Webflow)
- Case study pages: images in image-block, before-after, and process-steps components

### Active (v4.0)

- [ ] CV-01: CV page work history descriptions — Matalan, Santander UK, Self-employed (3 roles)
- [ ] CV-02: Download PDF button on CV page and About page CTA
- [ ] IMG-01: Real images on homepage case study cards
- [ ] IMG-02: Real images on /work feature rows (per case study)
- [ ] IMG-03: Case study visual content — I-Exchange, CASSI, Community image components

### Out of Scope

- CMS or dynamic content — static HTML only, fits Vite MPA constraint
- Contact form backend — static MPA constraint (deferred to v3.0 if serverless function added)
- Animation library (GSAP, Framer Motion) — vanilla CSS/JS constraint
- Dark mode toggle — palette decision locked
- Mobile app — web-first, PWA would be considered only after content phase

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Blog as static HTML pages | Fits Vite MPA constraint, no server needed | ✓ Shipped as Stories |
| Stories not Blog | Avoids "content-heavy blog" expectation; signals design reflection | ✓ |
| `container` on all pages | User preference for full-width layouts | ✓ All 8 pages |
| Nav CTA delegates to btn--primary | Single source of truth for button style; visual consistency | ✓ |
| Homepage #contact section removed | Redundant with dedicated Contact page; cleaner flow | ✓ |
| IIFE pattern for reveal.js | Matches typewriter.js convention; loaded via type=module | ✓ v2.0 |
| State-layer as `::after` overlay | MD3 pattern; avoids jarring background-color swap; 8%/12% opacity | ✓ v2.0 |
| animation-fill-mode: both | Covers pre-delay invisibility AND post-animation hold | ✓ v2.0 |
| Hero left-aligned with margin-inline: 0 | Hero is flex-start; auto would center against design intent | ✓ v2.0 |
| Transparent border reserve on nav links | Prevents 2px height shift in flex row when active border applied | ✓ v2.0 |
| Passive scroll listener + immediate call | Chrome performance + handles pre-scrolled bfcache state | ✓ v2.0 |
| Raw alpha in shadow layers permitted | Documented exception per UI-SPEC; no token needed | ✓ v2.0 |
| Web3Forms over FormSubmit | FormSubmit unreachable site-wide (HTTP 522); Web3Forms has no activation step | ✓ v3.0 |
| og:image in public/ not src/ | Vite fingerprints src/ assets, breaking stable og:image URL | ✓ v3.0 |
| JSON-LD inline in page head only | Handlebars partials fire on every page; schema belongs on index + about only | ✓ v3.0 |
| cleanUrls removed from vercel.json | Conflicted with rewrites — caused 404s on Vercel; rewrites alone sufficient | ✓ v3.0 |
| Metric chips over lede outcomes | Visual chip treatment beats outcome buried in lede text | ✓ v3.0 |

## Context

- Stack: Vite MPA, vanilla HTML + CSS, BEM, ITCSS, vite-plugin-handlebars, no frameworks
- 10 pages: Home, About, CV, Work, 3 case studies, Contact, Stories index, Stories post
- Nav/footer: single canonical Handlebars partials in `src/components/`
- Font stack: Fraunces (headings + display metrics), Urbanist (body/UI), Caveat (typewriter only)
- Design tokens: dark palette, 8pt spacing scale, 5-breakpoint type scale, 3 easing tokens
- Contact form: Web3Forms AJAX (no backend), JS validation, honeypot
- SEO: full OG + canonical + JSON-LD + sitemap across all 10 pages
- Deployment: Vercel with clean URL rewrites in vercel.json

## Constraints

- **Tech stack**: Vanilla HTML + CSS only — no JS/CSS frameworks
- **Build**: Every page must be declared in `vite.config.js` rollupOptions.input
- **Design tokens**: No hex values outside `_variables.css`, no inline styles, no arbitrary spacing

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-19 after v4.0 milestone started*
