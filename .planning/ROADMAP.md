# Roadmap: Sam Blake Portfolio v2

## Milestones

- **v1.0 Foundation** ✓ — [Archive](.planning/milestones/v1.0-ROADMAP.md) — Shipped 2026-05-17

## Current Milestone: v2.0 Polish & Refinement

**Goal:** Maximum first impression impact, every component reviewed individually against design system quality bar (Atlassian, Material Design 3, Emil Kowalski principles), case study storytelling component library built and ready.

**Phase numbering continues from v1.0 (last phase: 1).**

## Phases

- [ ] **Phase 2: Foundation & Infrastructure** — Tokens, scroll-reveal utility, button fixes, token bugs
- [ ] **Phase 3: First Impression** — Hero entrance animation + full nav component audit
- [ ] **Phase 4: Cards & Homepage** — Card interactions, state layers, grid layout
- [ ] **Phase 5: Case Study Components** — 7 storytelling components built from scratch
- [ ] **Phase 6: Content Pages** — About, Contact, Stories — spacing, typography, interactions
- [ ] **Phase 7: Footer + Global Audit** — Footer component, scroll-reveal pass, token/motion sweep

## Phase Details

### Phase 2: Foundation & Infrastructure
**Goal:** Lay the CSS and JS infrastructure every subsequent phase depends on — easing tokens, scroll-reveal utility, state-layer pattern, nav height token, button system fixes, and token bugs cleared
**Mode:** foundation
**Depends on:** Phase 1 (complete)
**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, ANIM-01, BTN-01, BTN-02, BTN-03, BTN-04, TOK-01
**Success Criteria:**
  1. New easing tokens available in `_variables.css` — verify with browser DevTools
  2. `.js-reveal` class applied to a test element shows correct entrance animation on scroll
  3. State-layer `::after` hover pattern demonstrated on a test element
  4. All button variants render at correct sizes with `scale(0.97)` press feedback
  5. `var(--nav-height)` resolves to 56px; `--space-16` token bug in `_nav.css` corrected
**Plans:** 1 plan
Plans:
- [ ] 02-01-PLAN-foundation.md — Token expansion, scroll-reveal utility, button system overhaul, original bug fixes (Wave 1)

### Phase 3: First Impression
**Goal:** What loads in the first 3 seconds delights — hero entrance animation and nav component fully polished
**Mode:** polish
**Depends on:** Phase 2
**Requirements:** NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06, NAV-07, NAV-08, NAV-09, ANIM-02, ANIM-04, LAY-01
**Success Criteria:**
  1. Nav renders at 56px with Fraunces wordmark — logo is a brand mark, not a nav link
  2. Nav active state shows accent bottom border + background pill — active page unambiguous
  3. Scrolling down adds subtle box-shadow grounding the nav above the page
  4. Mobile menu slides in with animation; hamburger animates to X; menu closes cleanly
  5. Hero section: 5 elements stagger in on load — eyebrow first, CTAs last, 80ms between
  6. Hero content stops at ~860px on ultra-wide — no left-hugging
**Plans:** 2 plans
Plans:
- [ ] 03-01-PLAN-hero.md — Hero entrance animation, typewriter polish, wide layout (Wave 1)
- [ ] 03-02-PLAN-nav.md — Full nav audit: height fix, logo, transitions, active state, scroll shadow, mobile animation (Wave 1 parallel)

### Phase 4: Cards & Homepage
**Goal:** Case study cards feel premium — hover interactions are intentional, grid layout is correct at all breakpoints
**Mode:** polish
**Depends on:** Phase 3
**Requirements:** COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, ANIM-03, LAY-02
**Success Criteria:**
  1. Card metric values render in Fraunces — display numbers have heading-class weight
  2. Card hover uses state-layer overlay — not a straight background swap
  3. Link arrow moves on card hover, not just button hover
  4. Three cards scroll-stagger into view — 100ms between each
  5. At 1240px+: three cards in a row, equal width, no orphaned card
**Plans:** 2 plans
Plans:
- [x] 04-01-PLAN-cards.md — Card component audit: metric font, state-layer hover, link arrow, active press (Wave 1)
- [x] 04-02-PLAN-grid.md — Case study grid 3-column at 1240px+; scroll-reveal stagger on cards (Wave 1 parallel)

### Phase 5: Case Study Components
**Goal:** 7 storytelling components built, polished, and ready — case study content can drop in without further CSS work
**Mode:** build
**Depends on:** Phase 4
**Requirements:** CS-01, CS-02, CS-03, CS-04, CS-05, CS-06, CS-07, CS-08
**Success Criteria:**
  1. All 7 component CSS files exist, are imported in `main.css`, and follow ITCSS conventions
  2. Each component renders correctly at mobile (375px) and desktop (1240px)
  3. All interactive states (if any) use design tokens — no hardcoded values
  4. `_image-block.css` three layout variants confirmed: full-bleed, contained, aside
  5. `_process-steps.css` counter increments correctly; connector line visible at 905px+
  6. `_before-after.css` labels readable, stacks cleanly on mobile
**Plans:** 2 plans
Plans:
- [ ] 05-01-PLAN.md — image-block, callout, pull-quote + main.css wiring (Wave 1)
- [ ] 05-02-PLAN.md — process-steps, before-after, metrics-row, two-column + main.css wiring (Wave 1 parallel)

### Phase 6: Content Pages
**Goal:** About, Contact, and Stories pages feel considered — spacing rhythmic, typography correct, interactions present
**Mode:** polish
**Depends on:** Phase 5
**Requirements:** ANIM-05, LAY-03, LAY-04
**Success Criteria:**
  1. Contact page: email and LinkedIn CTAs sit in a ~600px column — not stretched full-width
  2. Stories index: list items have left-border accent reveal on hover
  3. Stories post and case study pages: body paragraphs have a comfortable reading width
  4. All three pages have scroll-triggered section entrances
**Plans:** 3 plans
Plans:
- [ ] 06-01-PLAN-about.md — About page spacing, typography, section entrance (Wave 1)
- [ ] 06-02-PLAN-contact.md — Contact layout column, CTA hierarchy, entrance (Wave 1 parallel)
- [ ] 06-03-PLAN-stories.md — Stories list hover interaction, post reading width, entrances (Wave 1 parallel)

### Phase 7: Footer + Global Audit
**Goal:** Footer polished; every animated element covered by prefers-reduced-motion; zero hardcoded values anywhere
**Mode:** audit
**Depends on:** Phase 6
**Requirements:** ANIM-06, TYP-01, TYP-02, TYP-03, TOK-02
**Success Criteria:**
  1. Footer links have hover states consistent with nav link pattern
  2. `grep -r "prefers-reduced-motion" src/` returns a match for every file that has animations
  3. `grep -r "—" src/pages/` returns zero matches
  4. `_typography.css` header comment matches actual code values exactly
  5. No raw pixel spacing values outside `_variables.css`
**Plans:** 2 plans
Plans:
- [ ] 07-01-PLAN-footer.md — Footer component audit: spacing, hover states, layout (Wave 1)
- [ ] 07-02-PLAN-audit.md — Global prefers-reduced-motion sweep, em dash removal, token coherence (Wave 2)

## Progress

**Execution Order:** 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 2. Foundation & Infrastructure | 0/1 | Not started | - |
| 3. First Impression | 0/2 | Not started | - |
| 4. Cards & Homepage | 0/2 | Not started | - |
| 5. Case Study Components | 0/2 | Not started | - |
| 6. Content Pages | 0/3 | Not started | - |
| 7. Footer + Global Audit | 0/2 | Not started | - |
