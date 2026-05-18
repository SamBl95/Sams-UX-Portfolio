# Sam Blake Portfolio v2

## What This Is

A personal portfolio site for Sam Blake, a product designer with 3 years of experience across fintech (Santander UK), retail (Matalan), and property. Built as a Vite MPA with vanilla HTML/CSS. The site targets hybrid/remote product design roles in the North West England market.

Every interaction feels intentional: premium card hover overlays, staggered scroll-reveals, responsive typography at all breakpoints, and a complete case study component library ready for real content.

## Core Value

A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and every component is polished enough that adding content is the only remaining task.

## Current Milestone: v3.0 Content & SEO

**Goal:** Finish the UI, fill the site with real content, and make every page discoverable.

**Target features:**
- UI Polish: flex-based container widths, nav redesign (flat tabs, left-to-right hover, Home link, no name/stroke), dedicated case studies /work page, hero copy restructure
- Case study content: real copy for I-Exchange, CASSI, Community (pulled from Webflow, narrative preserved)
- About page: work history and skills
- Contact form: FormSubmit/EmailJS (static, no backend)
- Stories: at least one real article
- SEO: unique title + meta description per page, canonical URLs, Open Graph, theme-color, JSON-LD Person schema, sitemap.xml, robots.txt

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

### Active (v3.0 — Content & SEO)

**UI Polish:**
- [ ] Flex-based width for hero content and body copy on content pages (remove fixed container widths)
- [ ] Nav: flat tab style, left-to-right underline hover animation, bold on active, add "Home", remove name from left, remove bottom stroke
- [ ] Dedicated case studies page (/work), linked from nav
- [ ] Hero copy: "Sam Blake" h2 (accent colour) + "A Product Designer who..." subhead, remove one-liner below typewriter

**Content:**
- [ ] Case study pages: real copy for I-Exchange, CASSI, Community (from samsux.webflow.io)
- [ ] About page: detailed work history and skills
- [ ] Contact form with email integration (FormSubmit/EmailJS, static)
- [ ] Blog/Stories: at least one real article

**SEO:**
- [ ] Unique title + meta description (150–160 chars) per page
- [ ] Canonical URL per page (samsux.co.uk)
- [ ] Open Graph tags: og:title, og:description, og:url, og:type, og:site_name, og:locale en_GB
- [ ] theme-color: #0d1f1a on all pages
- [ ] JSON-LD Person schema on index.html and about.html
- [ ] sitemap.xml in public/
- [ ] robots.txt in public/

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

## Context

- Stack: Vite MPA, vanilla HTML + CSS, BEM, ITCSS, vite-plugin-handlebars, no frameworks
- 8 pages: Home, About, 3 case studies, Contact, Stories index, Stories post
- Nav/footer: single canonical Handlebars partials in `src/components/`
- Font stack: Fraunces (headings + display metrics), Urbanist (body/UI), Caveat (typewriter only)
- Design tokens: dark palette, 8pt spacing scale, 5-breakpoint type scale, 3 easing tokens
- ~9,150 LOC across CSS, JS, HTML

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
*Last updated: 2026-05-18 after v3.0 milestone start*
