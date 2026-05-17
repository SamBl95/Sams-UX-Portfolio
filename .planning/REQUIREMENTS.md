# Requirements: Sam Blake Portfolio v2

**Defined:** 2026-05-17
**Milestone:** v2.0 Polish & Refinement
**Core Value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and the structure is solid enough to build content on top of.

## v2 Requirements

Requirements for UI delight and polish. Goal: maximum first impression impact, every component reviewed individually against design system quality bar, case study storytelling component library built and ready.

### Foundation & Infrastructure

- [ ] **FOUND-01:** Easing tokens expanded: `--ease-out-quint`, `--ease-in-out-quart`, `--ease-emphasized` (MD3: `cubic-bezier(0.2, 0, 0, 1)`) added to `_variables.css`
- [ ] **FOUND-02:** Scroll-reveal utility: `IntersectionObserver` + `.js-reveal` CSS class + `@keyframes` — one observer for the whole page, reusable across all pages
- [ ] **FOUND-03:** State-layer hover pattern available in CSS — semi-transparent `::after` overlay (8% opacity on hover, 12% on press) rather than background-color swap, per MD3
- [ ] **FOUND-04:** `--nav-height: 56px` semantic token in `_variables.css` — single source of truth for nav height and mobile menu offset

### Navigation

- [ ] **NAV-01:** Nav height fixed to `var(--nav-height)` = 56px — was rendering at 128px due to `var(--space-16)` token bug
- [ ] **NAV-02:** Logo "Sam Blake" uses Fraunces 400 at `var(--text-xl)` (20px) with `font-optical-sizing: auto` and `-0.02em` tracking — editorial serif wordmark contrasts with sans-serif nav links
- [ ] **NAV-03:** Nav link `transition` includes `background-color` — hover state no longer snaps in without transition
- [ ] **NAV-04:** Nav list item gap increased to `var(--space-2)` (16px) — links at 14px with 8px gap reads as crowded
- [ ] **NAV-05:** CTA visually separated from text links via `margin-left: var(--space-3)` — "Get in touch" is distinct from navigation
- [ ] **NAV-06:** CTA height overridden to 36px within nav context — nav CTA is secondary access; hero CTA remains the primary conversion moment
- [ ] **NAV-07:** Active state adds `2px solid var(--color-accent)` bottom border alongside the background pill — active page is unambiguous
- [ ] **NAV-08:** `.nav--scrolled` class added by JS after `scrollY > 8`; CSS applies `box-shadow: 0 1px 0 var(--color-border), 0 4px 16px -4px rgb(0 0 0 / 0.06)` — nav anchored visually when scrolled
- [ ] **NAV-09:** Mobile menu `top` offset uses `var(--nav-height)` — was using the same `var(--space-16)` bug

### Animation & Delight

- [ ] **ANIM-01:** Typewriter container reserves exact rendered height of the longest phrase — no layout shift at any breakpoint before or after fonts load
- [ ] **ANIM-02:** Hero entrance stagger: eyebrow (0ms) → headline (80ms) → typewriter (160ms) → subheadline (240ms) → CTAs (320ms), `--ease-out-quint`
- [ ] **ANIM-03:** Case study cards stagger into view on scroll — 0 / 100 / 200ms delays via `.js-reveal`
- [ ] **ANIM-04:** Nav mobile menu has slide+fade open animation — `translateY(-8px)` → `translateY(0)` + opacity, 200ms `--ease-out` (already in CSS, needs timing verified and mobile close animation confirmed)
- [ ] **ANIM-05:** Stories index list items: left border accent `clip-path` reveal on hover — `inset(0 0 0 100%)` → `inset(0 0 0 0)`, 200ms `--ease-out`
- [ ] **ANIM-06:** Every animated element has a matching `prefers-reduced-motion: reduce` block — zero animations fire under reduced motion

### Button System

- [ ] **BTN-01:** Mobile button padding uses `var(--space-3)` — no hardcoded `20px`
- [ ] **BTN-02:** Desktop button heights: standard 36px, primary 40px (down from 40/48px)
- [ ] **BTN-03:** Desktop button font-size uses a token — no hardcoded `15px`
- [ ] **BTN-04:** All variants (primary, secondary, ghost) have `transform: scale(0.97)` on `:active` — press feedback visible on every interactive element

### Card Component

- [ ] **COMP-01:** Card metric value uses `var(--font-heading)` (Fraunces) — display numbers are heading-class, not body-class
- [ ] **COMP-02:** Card hover uses state-layer `::after` overlay — softer, more intentional than a straight background swap
- [ ] **COMP-03:** Card link arrow translates `4px` right on `.card:hover` — currently only triggers on direct button hover, not the whole card
- [ ] **COMP-04:** Card has `scale(0.97)` on `:active` — press feedback consistent with buttons
- [ ] **COMP-05:** Card hover gated with `@media (hover: hover) and (pointer: fine)` — currently missing `pointer: fine`

### Layout & Composition

- [ ] **LAY-01:** Hero content max-width `860px` at 1440px+ — text doesn't hug the left edge on ultra-wide screens
- [ ] **LAY-02:** Case study grid `repeat(3, 1fr)` at 1240px+ — no orphaned third card
- [ ] **LAY-03:** Contact page content constrained to a ~600px column — full-viewport-width email CTA reads as accidental, not designed
- [ ] **LAY-04:** Case study body and stories post body have `max-width: 72ch` on `.body p` — reading line-length without changing the page container

### Case Study Storytelling Components

- [ ] **CS-01:** `_image-block.css` — `<figure>` + `<figcaption>`, full/contained/aside layout variants, responsive, accessible
- [ ] **CS-02:** `_callout.css` — three semantic variants: insight (teal), warning (amber tone), quote (italic). Accessible `role`
- [ ] **CS-03:** `_pull-quote.css` — Fraunces at `--text-3xl` → `--text-4xl` (905px+), `--leading-tight`, teal accent
- [ ] **CS-04:** `_process-steps.css` — CSS `counter-increment` numbering, connector line desktop, stacked mobile
- [ ] **CS-05:** `_before-after.css` — two-column with "Before" / "After" label chips, stacked mobile, no JS dependency
- [ ] **CS-06:** `_metrics-row.css` — horizontal 2–3 stat blocks, Fraunces metric values, token-based dividers
- [ ] **CS-07:** `_two-column.css` — responsive layout utility, `gap: var(--space-8)`, stacks correctly on mobile
- [ ] **CS-08:** All 7 components imported in `main.css` under the `/* 3. COMPONENTS */` block, following ITCSS order

### Typography & Token Audit

- [ ] **TYP-01:** No em dashes (`—`) in any of the 8 HTML source pages
- [ ] **TYP-02:** `_typography.css` header comment matches code (h1: 40/56/64/80px — not 36/48 as documented)
- [ ] **TYP-03:** All spacing uses 8pt scale tokens — no hardcoded pixel values outside `_variables.css`
- [ ] **TOK-01:** Stale `rgb(79 209 165 / 0.14)` dark-palette value in `_card.css` box-shadow updated to current accent
- [ ] **TOK-02:** Zero hardcoded values outside `_variables.css` — no raw hex, no raw px spacing

## v3 Requirements

Deferred to content phase.

### Case Study Pages

- Detailed content audit of i-exchange, cassi, community pages — layout, section spacing, CTA hierarchy
- Case study body prose line-length (may supersede LAY-04 above)

### Content

- Case study imagery and full copy
- Blog/Stories posts (real articles)
- About page detailed work history
- Contact form with email integration
- SEO meta tags and Open Graph

## Out of Scope

| Feature | Reason |
|---------|--------|
| Case study page content audit | Deferred to v3.0 — content comes after polish |
| New pages | Foundation complete |
| Animation library (GSAP, Framer Motion) | Vanilla CSS/JS constraint |
| Dark mode toggle | Palette decision locked |
| CMS or dynamic content | Static HTML only — Vite MPA constraint |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 2 | Pending |
| FOUND-02 | Phase 2 | Pending |
| FOUND-03 | Phase 2 | Pending |
| FOUND-04 | Phase 2 | Pending |
| NAV-01 | Phase 3 | Pending |
| NAV-02 | Phase 3 | Pending |
| NAV-03 | Phase 3 | Pending |
| NAV-04 | Phase 3 | Pending |
| NAV-05 | Phase 3 | Pending |
| NAV-06 | Phase 3 | Pending |
| NAV-07 | Phase 3 | Pending |
| NAV-08 | Phase 3 | Pending |
| NAV-09 | Phase 3 | Pending |
| ANIM-01 | Phase 2 | Pending |
| ANIM-02 | Phase 3 | Pending |
| ANIM-03 | Phase 4 | Pending |
| ANIM-04 | Phase 3 | Pending |
| ANIM-05 | Phase 6 | Pending |
| ANIM-06 | Phase 7 | Pending |
| BTN-01 | Phase 2 | Pending |
| BTN-02 | Phase 2 | Pending |
| BTN-03 | Phase 2 | Pending |
| BTN-04 | Phase 2 | Pending |
| COMP-01 | Phase 4 | Pending |
| COMP-02 | Phase 4 | Pending |
| COMP-03 | Phase 4 | Pending |
| COMP-04 | Phase 4 | Pending |
| COMP-05 | Phase 4 | Pending |
| LAY-01 | Phase 3 | Pending |
| LAY-02 | Phase 4 | Pending |
| LAY-03 | Phase 6 | Pending |
| LAY-04 | Phase 6 | Pending |
| CS-01 | Phase 5 | Pending |
| CS-02 | Phase 5 | Pending |
| CS-03 | Phase 5 | Pending |
| CS-04 | Phase 5 | Pending |
| CS-05 | Phase 5 | Pending |
| CS-06 | Phase 5 | Pending |
| CS-07 | Phase 5 | Pending |
| CS-08 | Phase 5 | Pending |
| TYP-01 | Phase 7 | Pending |
| TYP-02 | Phase 7 | Pending |
| TYP-03 | Phase 7 | Pending |
| TOK-01 | Phase 2 | Pending |
| TOK-02 | Phase 7 | Pending |

**Coverage:**
- v2 requirements: 45 total
- Mapped to phases: 45
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-17*
*Last updated: 2026-05-17 — expanded scope: full UI audit, delight focus, case study component library, detailed nav spec*
