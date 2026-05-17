# Sam Blake Portfolio v2

## What This Is

A personal portfolio site for Sam Blake, a product designer with 3 years of experience across fintech (Santander UK), retail (Matalan), and property. Built as a Vite MPA with vanilla HTML/CSS. The site targets hybrid/remote product design roles in the North West England market.

## Core Value

A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and the structure is solid enough to build content on top of.

## Current Milestone: v2.0 Polish & Refinement

**Goal:** Make the existing 8 pages visually exceptional — every interaction feels intentional, every layout holds at any viewport, every value earns its token.

**Target areas:**
- Typewriter layout shift eliminated
- Button system: sizing, press feedback, hierarchy
- Typography & spacing audit across all 8 pages
- Hero wide-screen composition
- Case study card grid (3 columns)
- Token cleanup: em dashes, hardcoded values, stale refs

---

## Current State (v1.0)

**Shipped:** 2026-05-17

- 8-page site: Home, About, I-Exchange, CASSI, Community, Contact, Stories index, Stories post
- Consistent nav and footer via Handlebars partials; active-state flags working
- Light palette: warm off-white (`#f5f2ed`) + deep teal accent (`#1a6b52`)
- Zero broken internal links; CSS coherent (no inline styles, no rogue hex values)
- New-page scaffold documented in `.claude/CLAUDE.md`

## Requirements

### Validated (v1.0)

- ✓ Homepage with typewriter hero
- ✓ About page
- ✓ Case study pages: I-Exchange, CASSI, Community
- ✓ Contact page with complete section structure
- ✓ Stories index + one working post example
- ✓ Consistent nav (Handlebars partial) across all 8 pages
- ✓ Consistent footer (Handlebars partial) across all 8 pages
- ✓ Active nav states per page type
- ✓ All pages registered in Vite rollupOptions.input
- ✓ Zero broken internal links (78 audited)
- ✓ Light palette with deep teal accent
- ✓ Semibold Fraunces headings; 5-step responsive h1 scale
- ✓ CSS coherent — ITCSS, BEM, no hex outside variables
- ✓ New page scaffold documented

### Active (v2.0)

- [ ] Typewriter height reservation — no layout shift
- [ ] Button press feedback (`scale(0.97)` on active)
- [ ] Button sizing proportional on desktop
- [ ] Hero content max-width at 1440px+
- [ ] Case study grid 3-column at 1240px+
- [ ] Em dashes removed from all HTML source
- [ ] Zero hardcoded values outside `_variables.css`

### Out of Scope

- CMS or dynamic content — static HTML only, fits Vite MPA constraint
- Contact form backend — static MPA constraint
- Blog post copy (real articles) — content phase
- Case study imagery and copy — content phase
- SEO meta tags and Open Graph — post-content
- Analytics or third-party integrations — post-foundation

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Blog as static HTML pages | Fits Vite MPA constraint, no server needed | ✓ Shipped as Stories |
| Stories not Blog | Avoids "content-heavy blog" expectation; signals design reflection | ✓ |
| `container` on all pages | User preference for full-width layouts | ✓ All 8 pages |
| Nav CTA delegates to btn--primary | Single source of truth for button style; visual consistency | ✓ |
| Homepage #contact section removed | Redundant with dedicated Contact page; cleaner flow | ✓ |

## Context

- Stack: Vite MPA, vanilla HTML + CSS, BEM, ITCSS, vite-plugin-handlebars, no frameworks
- 8 pages: Home, About, 3 case studies, Contact, Stories index, Stories post
- Nav/footer: single canonical Handlebars partials in `src/components/`
- Font stack: Fraunces (headings), Urbanist (body), Caveat (typewriter only)
- Design tokens and ITCSS layers established; palette is light (warm off-white + deep teal)

## Constraints

- **Tech stack**: Vanilla HTML + CSS only — no JS/CSS frameworks
- **Build**: Every page must be declared in `vite.config.js` rollupOptions.input
- **Design tokens**: No hex values outside `_variables.css`, no inline styles, no arbitrary spacing

---
*Last updated: 2026-05-17 after v2.0 milestone initialization*
