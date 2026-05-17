# Requirements: Sam Blake Portfolio v2

**Defined:** 2026-05-17
**Milestone:** v2.0 Polish & Refinement
**Core Value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and the structure is solid enough to build content on top of.

## v2 Requirements

Requirements for UI polish and refinement. Goal: every interaction feels intentional, every layout holds at any viewport width, every value earns its token.

### Animation & Interaction

- [ ] **ANIM-01:** Typewriter container reserves the exact rendered height of the longest phrase before animation starts — no layout shift at any breakpoint, including before and after fonts load
- [ ] **ANIM-02:** All buttons have `transform: scale(0.97)` on `:active` — press feedback is instant and visible on every variant
- [ ] **ANIM-03:** Card hover is gated behind `@media (hover: hover) and (pointer: fine)` — no false hover on touch

### Button System

- [ ] **BTN-01:** Mobile button padding uses 8pt scale token (`var(--space-3)`) — no hardcoded `20px`
- [ ] **BTN-02:** Desktop button heights reduced: standard `36px`, primary `40px`
- [ ] **BTN-03:** Desktop button font-size uses a token — no hardcoded `15px`
- [ ] **BTN-04:** All three variants (primary, secondary, ghost) have complete, verified states: default · hover · active · focus-visible · disabled

### Layout & Composition

- [ ] **LAY-01:** Hero content has a max-width cap at 1440px+ — left-aligned text doesn't hug the edge on ultra-wide displays
- [ ] **LAY-02:** Case study grid uses `repeat(3, 1fr)` at 1240px+ — no orphaned third card

### Typography & Token Audit

- [ ] **TYP-01:** No em dashes (`—`) in any of the 8 HTML source pages
- [ ] **TYP-02:** `_typography.css` header comment accurate to the actual code (h1: 40/56/64/80px, not 36/48)
- [ ] **TYP-03:** All spacing across 8 pages uses 8pt scale tokens — no hardcoded pixel values outside `_variables.css`
- [ ] **TOK-01:** Stale `rgb(79 209 165 / 0.14)` dark-palette value in `_card.css` box-shadow updated to current accent
- [ ] **TOK-02:** Zero hardcoded values outside `_variables.css` — no raw hex, no raw px spacing

## v3 Requirements

Deferred to content phase.

### Content

- Case study imagery, detailed copy and process documentation
- Blog/Stories posts (real articles beyond the seeded example)
- About page detailed work history and skill profile
- Contact form with email integration
- SEO meta tags and Open Graph images

## Out of Scope

| Feature | Reason |
|---------|--------|
| New pages | Foundation complete — content phase comes after polish |
| Animation library (GSAP, Framer Motion) | Vanilla CSS/JS constraint |
| Dark mode toggle | Not requested; palette decision locked |
| CMS or dynamic content | Static HTML only — Vite MPA constraint |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ANIM-01 | Phase 2 | Pending |
| ANIM-02 | Phase 2 | Pending |
| ANIM-03 | Phase 2 | Pending |
| BTN-01 | Phase 2 | Pending |
| BTN-02 | Phase 2 | Pending |
| BTN-03 | Phase 2 | Pending |
| BTN-04 | Phase 2 | Pending |
| LAY-01 | Phase 3 | Pending |
| LAY-02 | Phase 3 | Pending |
| TYP-01 | Phase 4 | Pending |
| TYP-02 | Phase 4 | Pending |
| TYP-03 | Phase 4 | Pending |
| TOK-01 | Phase 4 | Pending |
| TOK-02 | Phase 4 | Pending |

**Coverage:**
- v2 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-17*
*Last updated: 2026-05-17 — milestone v2.0 initialized*
