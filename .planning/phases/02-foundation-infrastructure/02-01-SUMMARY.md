---
phase: 02-foundation-infrastructure
plan: 01
subsystem: ui
tags: [css-custom-properties, itcss, scroll-reveal, intersection-observer, easing-tokens, button-system, nav-fix]

# Dependency graph
requires: []
provides:
  - Three new easing tokens (--ease-out-quint, --ease-in-out-quart, --ease-emphasized) in _variables.css
  - --nav-height semantic token fixing the 56px nav bar height
  - Scroll-reveal utility (_reveal.css + reveal.js) wired to all 8 pages
  - STATE-LAYER HOVER PATTERN documented in _reveal.css for Phase 4 consumption
  - Button system corrections: token padding, correct heights, scale(0.97) press
  - Card hover box-shadow corrected to warm teal rgb(26 107 82 / 0.14)
affects: [03-homepage-hero, 04-work-section-cards, 05-case-studies, 06-content-pages, 07-global-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "IIFE pattern for vanilla JS modules (matching typewriter.js convention)"
    - "IntersectionObserver with unobserve-after-trigger for one-shot scroll reveals"
    - "prefersReducedMotion early-exit guard: show content immediately, then return"
    - "data-reveal-delay attribute for CSS-driven stagger without JS"
    - "STATE-LAYER ::after pattern for hover/active tinting without background-color changes"

key-files:
  created:
    - src/styles/3-components/_reveal.css
    - src/reveal.js
  modified:
    - src/styles/1-settings/_variables.css
    - src/styles/3-components/_button.css
    - src/styles/3-components/_nav.css
    - src/styles/3-components/_card.css
    - src/styles/main.css
    - index.html
    - src/pages/about.html
    - src/pages/contact.html
    - src/pages/stories/index.html
    - src/pages/stories/design-systems-and-portfolio-sites.html
    - src/pages/case-studies/i-exchange.html
    - src/pages/case-studies/cassi.html
    - src/pages/case-studies/community.html

key-decisions:
  - "reveal.js uses IIFE (not ES module exports) to match typewriter.js convention — loaded via type=module in HTML"
  - "State-layer pattern documented as commented-out CSS in _reveal.css rather than a separate file — Phase 4 copies the block when applying to .card"
  - "Reduced-motion block explicitly sets opacity:1 in _reveal.css rather than relying on global reset — the global reset only zeros duration, not initial opacity"

patterns-established:
  - "JS utility modules: IIFE + prefersReducedMotion early-exit + IntersectionObserver unobserve pattern"
  - "Scroll-reveal: .js-reveal class + data-reveal-delay for stagger — no JS changes needed per page"
  - "Easing token usage: --ease-out-quint for entrances/reveals, --ease-in-out-quart for morphs, --ease-emphasized for MD3 component motion"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, FOUND-04, ANIM-01, BTN-01, BTN-02, BTN-03, BTN-04, TOK-01]

# Metrics
duration: 25min
completed: 2026-05-17
---

# Phase 2 Plan 01: Foundation Summary

**Easing tokens, scroll-reveal IntersectionObserver utility, state-layer pattern doc, nav 56px fix, button scale press, and card shadow correction shipped across 2 new files and 13 modified files**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-05-17
- **Completed:** 2026-05-17
- **Tasks:** 3
- **Files modified:** 15 (2 created, 13 edited)

## Accomplishments

- Token infrastructure: 4 new tokens (`--ease-out-quint`, `--ease-in-out-quart`, `--ease-emphasized`, `--nav-height`) extend the existing design token system in `_variables.css`
- Nav height bug fully resolved: `var(--space-16)` (128px) replaced with `var(--nav-height)` (56px) in both the `.nav__inner` height and `.nav--open .nav__menu` top offset
- Scroll-reveal utility ships: `_reveal.css` + `reveal.js` with IntersectionObserver, `rootMargin: '0px 0px -60px 0px'`, one-shot unobserve, prefersReducedMotion guard, and CSS stagger via `data-reveal-delay`
- STATE-LAYER HOVER PATTERN (FOUND-03) documented as a ready-to-copy commented block at the bottom of `_reveal.css` — Phase 4 applies it to `.card`
- Button corrections: hardcoded `20px` padding → `var(--space-3)`, `15px` font-size → `var(--text-sm)`, desktop heights corrected (36px standard, 40px primary), all three variant `:active` rules use `scale(0.97)`, all `translateY(-1px)` hover lifts removed
- Card glow shadow corrected from stale mint-teal `rgb(79 209 165 / 0.14)` to warm teal `rgb(26 107 82 / 0.14)`; black shadow opacity corrected from 0.5 to 0.08

## Task Commits

Each task was committed atomically:

1. **Task 1: Token expansion and nav-height bug fix** — `907b25f` (feat)
2. **Task 2: Button system corrections** — `4bcd811` (feat)
3. **Task 3: Scroll-reveal utility, state-layer pattern, card fix, script wiring** — `b2280b9` (feat)

## Files Created/Modified

- `src/styles/1-settings/_variables.css` — Added 3 easing tokens + --nav-height semantic token
- `src/styles/3-components/_nav.css` — Replaced var(--space-16) with var(--nav-height) in height and top
- `src/styles/3-components/_button.css` — Token padding, corrected heights, scale(0.97) active press, removed hover lift
- `src/styles/3-components/_card.css` — Corrected box-shadow colors in hover block
- `src/styles/3-components/_reveal.css` — NEW: scroll-reveal keyframes, utility classes, reduced-motion guard, state-layer pattern doc
- `src/reveal.js` — NEW: IntersectionObserver module with prefersReducedMotion guard and IIFE structure
- `src/styles/main.css` — Added @import for _reveal.css
- `index.html` + 7 pages — reveal.js script tag added after theme.js on all 8 pages

## Decisions Made

- IIFE pattern (not ES module default export) used in `reveal.js` to match `typewriter.js` project convention — both loaded via `type="module"` HTML script tags
- State-layer pattern documented in `_reveal.css` rather than a standalone file — keeps the pattern co-located with the reveal utility, and Phase 4 simply copies the block
- Reduced-motion `opacity: 1` set explicitly in `_reveal.css` because the global reset only zeroes `animation-duration`, not the `opacity: 0` initial state on `.js-reveal`
- ANIM-01 (typewriter layout shift fix via `document.fonts.ready`) confirmed already implemented in `typewriter.js` — no code change required

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All Phase 3 animation primitives are available: `--ease-out-quint`, `--ease-in-out-quart`, `--ease-emphasized`
- Scroll-reveal is wired and ready to use on all pages — Phase 4 adds `.js-reveal` to card elements
- State-layer pattern is documented and available in `_reveal.css` for Phase 4 card hover
- Nav renders at 56px — hero section layout in Phase 3 can rely on the correct offset
- Button scale press is live — no regression risk from Phase 3 CTA button work

## Self-Check: PASSED

- `src/styles/3-components/_reveal.css` — FOUND
- `src/reveal.js` — FOUND
- Commit `907b25f` — FOUND
- Commit `4bcd811` — FOUND
- Commit `b2280b9` — FOUND

---
*Phase: 02-foundation-infrastructure*
*Completed: 2026-05-17*
