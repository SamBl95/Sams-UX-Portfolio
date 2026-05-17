---
phase: 01-foundation
type: walking-skeleton
created: 2026-05-17
---

# Walking Skeleton — Sam Blake Portfolio v2

> The thinnest possible end-to-end working site. Establishes architectural commitments that all subsequent phases build on without renegotiating.

## Skeleton Goal

A recruiter can land on `/`, navigate to every section (Work, About, Stories, Contact), and reach Sam — with a consistent nav and footer on every page, on a light editorial palette, with no broken links. Built locally with `npm run dev` and verifiably built with `npm run build && npm run preview`.

## Architectural Commitments

These decisions are locked by the walking skeleton and inherited by all future phases.

### Framework & Build

- **Build tool:** Vite 8 (already installed, `appType: 'mpa'`)
- **Routing:** Vite MPA — every page declared in `vite.config.js` `rollupOptions.input`. No client-side router.
- **Language:** Vanilla HTML + CSS. No JS or CSS framework. Two existing JS files (`src/theme.js`, `src/typewriter.js`) provide the only scripted behaviour.
- **Templating:** `vite-plugin-handlebars` 2.0.3 for HTML partials. `src/components/nav.html` and `src/components/footer.html` are partials included by every page.

### Directory Layout (locked after Phase 1)

```
/
├── index.html                       # Homepage
├── vite.config.js                   # All pages registered here
├── package.json
├── src/
│   ├── components/                  # Handlebars partials
│   │   ├── nav.html
│   │   └── footer.html
│   ├── pages/
│   │   ├── about.html
│   │   ├── contact.html             # NEW — Phase 1
│   │   ├── case-studies/
│   │   │   ├── cassi.html
│   │   │   ├── community.html
│   │   │   └── i-exchange.html
│   │   └── stories/                 # NEW — Phase 1
│   │       ├── index.html
│   │       └── design-systems-and-portfolio-sites.html
│   ├── styles/                      # ITCSS layers
│   │   ├── 1-settings/
│   │   ├── 2-base/
│   │   ├── 3-components/
│   │   └── 4-layouts/
│   ├── theme.js                     # Hamburger toggle (existing, unchanged)
│   └── typewriter.js                # Homepage hero effect (existing, unchanged)
└── public/
    └── favicon.png
```

### CSS Architecture (locked)

- **ITCSS layering:** settings → base → components → layouts. Import order enforced in `src/styles/main.css`.
- **BEM naming:** `.block__element--modifier` throughout.
- **Design tokens:** every colour, spacing, type-size, weight, radius, and shadow lives in `src/styles/1-settings/_variables.css`. No hex values outside this file. No inline styles. No arbitrary spacing.
- **Path strategy:** all CSS, JS, and asset references use root-relative paths (`/src/styles/main.css`, `/src/theme.js`, `/favicon.png`). No `../` traversal in HTML.

### Design Foundation (locked by Phase 1, Plan 01)

- **Palette:** light/warm-neutral. `--color-bg #f5f2ed`, `--color-accent #1a6b52` (deep teal). Full token list in `_variables.css` after Plan 01 ships.
- **Type:** Fraunces (h1–h4) + Urbanist (body, UI) + Caveat (typewriter accent only). Two weights in use: 400 normal, 600 semibold.
- **Type scale:** 4 semantic size roles — Display, Heading, Body, Meta. Mapped in `_typography.css`.
- **Layout containers:** `container-wide` (1440px max) for editorial pages, `container-reading` (720px max) for long-form pages (contact, stories).
- **Breakpoints:** 600px, 905px, 1240px, 1440px. Mobile-first.

### Nav & Footer Consistency (locked by Phase 1, Plan 02)

- `src/components/nav.html` is the single source of truth for nav markup. Every page renders it via `{{> nav navAbout=true}}` style partial includes.
- `src/components/footer.html` is the single source of truth for footer markup. Every page renders it via `{{> footer}}`.
- Active nav state set by passing a boolean flag (`navWork`, `navAbout`, `navStories`, `navContact`) to the partial. Flag drives `aria-current="page"` and `.nav__link--active` class on the matching link.
- Mobile hamburger is `src/theme.js` (unchanged) — toggles `.nav--open` on `.nav` and `aria-expanded` on `.nav__toggle`.

### Page Inventory (after Phase 1)

| Page | URL | Container | Nav active flag |
|------|-----|-----------|-----------------|
| Home | `/` | container (existing wide) | none |
| About | `/src/pages/about.html` | container-content (existing) | `navAbout=true` |
| Work — CASSI | `/src/pages/case-studies/cassi.html` | container (existing) | none |
| Work — Community | `/src/pages/case-studies/community.html` | container (existing) | none |
| Work — I-Exchange | `/src/pages/case-studies/i-exchange.html` | container (existing) | none |
| Stories index | `/src/pages/stories/index.html` | container-reading 720px | `navStories=true` |
| Stories post (example) | `/src/pages/stories/design-systems-and-portfolio-sites.html` | container-reading 720px | `navStories=true` |
| Contact | `/src/pages/contact.html` | container-reading 720px | `navContact=true` |

### Deployment (deferred to v2)

No deployment target locked in Phase 1. Local-only verification:

```
npm run dev       # development server
npm run build     # production build
npm run preview   # serve dist/ output
```

Production hosting decision (Netlify / Vercel / GitHub Pages) is deferred to a future phase.

## What This Skeleton Proves

After Phase 1 ships:

1. Every page in the site inventory loads via `npm run dev` and `npm run preview`.
2. Every page renders the same nav and footer (sourced from `src/components/nav.html` and `src/components/footer.html`).
3. Every internal link resolves to a real page — no 404s.
4. The light palette is applied consistently — no remaining dark forest green tokens, no rogue hex values.
5. Adding a new page is a repeatable pattern: create `.html` file → register in `vite.config.js` → include partials → ship.

## SKELETON COMPLETE

The walking skeleton is complete when Plan 04 (Foundation Audit) passes all checks and the four success criteria in `ROADMAP.md` Phase 1 are TRUE.
