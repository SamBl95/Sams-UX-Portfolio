# Sam Blake Portfolio v2

## What This Is

A personal portfolio site for Sam Blake, a product designer with 3 years of experience across fintech (Santander UK), retail (Matalan), and property. Built as a Vite MPA with vanilla HTML/CSS. The site targets hybrid/remote product design roles in the North West England market.

## Core Value

A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and the structure is solid enough to build content on top of.

## Requirements

### Validated

- ✓ Homepage with typewriter hero — existing
- ✓ About page — existing
- ✓ Case study pages: I-Exchange, CASSI, Community — existing
- ✓ Design system: ITCSS, BEM, CSS custom properties, 8pt spacing, type scale — existing
- ✓ Vite MPA build pipeline with rollupOptions.input — existing

### Active

- [ ] Consistent navigation across all pages (links correct, active states work)
- [ ] Consistent footer across all pages
- [ ] Contact page with proper section structure
- [ ] Blog index page (/blog) listing posts
- [ ] Blog post template (at least one working example)
- [ ] All pages registered in Vite rollupOptions.input
- [ ] Each page has a complete section structure (header, content, CTA/footer)
- [ ] No broken internal links anywhere in the site

### Out of Scope

- CMS or dynamic content — static HTML only, fits Vite MPA constraint
- Content refinement — copy, images, and case study detail are a later phase
- Design token changes — design system already established, not revisiting here
- Analytics or third-party integrations — post-foundation

## Context

- Stack: Vite MPA, vanilla HTML + CSS, BEM, ITCSS, no frameworks
- 5 pages currently exist: Home, About, I-Exchange, CASSI, Community
- Duplicate page files exist at `src/pages/` root (cassi.html, community.html, i-exchange.html) — likely old versions, need cleaning
- Nav and page-level layout are both inconsistent across existing pages
- Font stack: Fraunces (headings), Urbanist (body), Caveat (typewriter only)
- Design tokens and ITCSS layers are established in `src/styles/`

## Constraints

- **Tech stack**: Vanilla HTML + CSS only — no JS/CSS frameworks
- **Build**: Every page must be declared in `vite.config.js` rollupOptions.input
- **Design tokens**: No hex values outside `_variables.css`, no inline styles, no arbitrary spacing
- **Scope**: Foundation only — structure and navigation, not content detail

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Blog as static HTML pages | Fits Vite MPA constraint, no server needed | — Pending |
| Blog index + individual post pages | Full structure from the start, not just a placeholder | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:progress`):
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
*Last updated: 2026-05-17 after initialization*
