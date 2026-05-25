# Requirements: Sam Blake Portfolio v2

**Defined:** 2026-05-25
**Core Value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and the site is completely finished.

## v5.0 Requirements

### Nav Fix

- [ ] **NAV-01**: Hero H1 sits at the same vertical position on About and CV pages as on the Case Studies page — no extra padding above the heading

### Footer

- [ ] **FOOT-01**: Footer is visually consistent and correctly laid out across all pages
- [ ] **FOOT-02**: Footer contains: site nav links (horizontal desktop / stacked mobile), Easter egg link at very low opacity, LinkedIn link, Get in touch link — no copyright notice, no tagline

### Case Study Components

- [ ] **COMP-01**: Two-column component — text left / image right; reverses via modifier class; stacks single column on mobile with image below text
- [ ] **COMP-02**: Two-column component — heading left / body text right; stacks single column on mobile
- [ ] **COMP-03**: Three-column person card component — avatar placeholder, name in `--font-heading`, role in `--font-body --color-text-secondary`, short contribution note; stacks single column on mobile
- [ ] **COMP-04**: Single image with caption — max 60% width desktop, full width mobile; caption in `--color-text-secondary --text-sm`
- [ ] **COMP-05**: Two images side-by-side with captions — 45% each desktop, stacked full width mobile
- [ ] **COMP-06**: Full-width image — for final designs or very wide screenshots only
- [ ] **COMP-07**: Results display — large metric in `--font-heading --color-accent`, label beneath; row of 3–4 desktop, 2×2 tablet, single column mobile
- [ ] **COMP-08**: Pull quote — large quoted text in `--font-heading`, 2px solid `--color-accent` left border, full width all breakpoints
- [ ] **COMP-09**: Process step row — numbered horizontal steps desktop, vertical stacked mobile; number in `--color-accent`, title in `--font-heading`, description in `--font-body`
- [ ] **COMP-10**: Image with overlay caption — full-width image, text overlaid bottom with semi-transparent `--color-bg` background
- [ ] **COMP-11**: All components use existing design tokens, 8pt spacing system, pass WCAG 2.2 AA, use `loading="lazy"` on images, respect `prefers-reduced-motion`

### Case Study Content — i-Exchange

- [ ] **CS-01**: All sections of i-exchange.html reviewed; copy shown to user and explicitly approved before any edit
- [ ] **CS-02**: All image placements in i-exchange.html confirmed by explicit user instruction before implementation; sourced from `public/assets/images/i-exchange/`
- [ ] **CS-03**: All image sizing follows rules: 60% centred (default), 40% portrait, 45% each side-by-side, full width for wide final designs; 2x exports at half pixel max-width; `object-fit: contain`

### Case Study Content — CASSI

- [ ] **CS-04**: All sections of cassi.html reviewed; copy shown to user and explicitly approved before any edit
- [ ] **CS-05**: All image placements in cassi.html confirmed by explicit user instruction before implementation; sourced from `public/assets/images/cassi/`
- [ ] **CS-06**: Same sizing rules as CS-03 applied throughout

### Case Study Content — Community

- [ ] **CS-07**: All sections of community.html reviewed; copy shown to user and explicitly approved before any edit
- [ ] **CS-08**: Three person cards (Samantha, Lee, Bonny) built using COMP-03
- [ ] **CS-09**: All image placements in community.html confirmed by explicit user instruction; sourced from `public/assets/images/community/`
- [ ] **CS-10**: Same sizing rules as CS-03 applied throughout

### UAT and QA

- [ ] **QA-01**: All navigation links work correctly on every page
- [ ] **QA-02**: Mobile bottom sheet nav opens, closes, and animates correctly; burger↔X morph animation works
- [ ] **QA-03**: Typewriter animation runs correctly on homepage
- [ ] **QA-04**: Contact form submits correctly
- [ ] **QA-05**: CV download triggers with filename `Sam-Blake-CV.pdf`
- [ ] **QA-06**: Easter egg link opens old portfolio in new tab
- [ ] **QA-07**: All case study images load with no broken images
- [ ] **QA-08**: All internal links between pages work; all external links open in new tab
- [ ] **QA-09**: Consistent nav across all pages; consistent footer across all pages
- [ ] **QA-10**: Consistent hero position and sizing across all pages; no orphaned borders or strokes; no layout shift; cards peek correctly on homepage; alternating backgrounds work on case studies; all fonts loading; colour tokens consistent
- [ ] **QA-11**: All images have descriptive alt text
- [ ] **QA-12**: All interactive elements have visible focus states; colour contrast passes WCAG 2.2 AA
- [ ] **QA-13**: Focus trap works in mobile nav; Escape key dismisses mobile nav; `prefers-reduced-motion` respected throughout; all form inputs have associated labels
- [ ] **QA-14**: All images use `loading="lazy"`; no console errors on any page; no broken asset paths
- [ ] **QA-15**: QA report lists all failures with file and line reference; all failures fixed before stage marked complete

## Future Requirements

### Content

- **CONT-F01**: Real photography or illustration for About page
- **CONT-F02**: Stories section with real published articles

### SEO

- **SEO-F01**: Per-case-study og:image thumbnails
- **SEO-F02**: Google Search Console submission (manual post-deploy step)
- **SEO-F03**: vite-plugin-sitemap auto-generation

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS or dynamic content | Static HTML only — Vite MPA constraint |
| Animation library (GSAP, Framer Motion) | Vanilla CSS/JS constraint |
| Dark mode toggle | Palette decision locked |
| Mobile app / PWA | Web-first; post-ship consideration only |
| Copy written by Claude | Copy is Sam's — never changed without explicit approval |
| Images placed without instruction | Image placement requires explicit per-section approval |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 15 | Pending |
| FOOT-01 | Phase 16 | Pending |
| FOOT-02 | Phase 16 | Pending |
| COMP-01–11 | Phase 17 | Pending |
| CS-01–03 | Phase 18 | Pending |
| CS-04–06 | Phase 19 | Pending |
| CS-07–10 | Phase 20 | Pending |
| QA-01–15 | Phase 21 | Pending |

**Coverage:**
- v5.0 requirements: 36 total
- Mapped to phases: 36
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-25*
*Last updated: 2026-05-25 after v5.0 milestone start*
