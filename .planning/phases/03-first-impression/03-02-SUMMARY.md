---
phase: 03-first-impression
plan: 02
subsystem: ui
tags: [vanilla-css, nav, accessibility, scroll-shadow, animation, itcss, bem]

# Dependency graph
requires:
  - phase: 02-foundation
    provides: "--nav-height token, --font-heading token, --ease-out easing token, initHamburger function"
provides:
  - Fraunces logo wordmark with optical sizing at --text-xl
  - .nav--scrolled CSS class with two-layer box-shadow
  - initScrollShadow passive scroll listener in theme.js
  - Active nav link accent border-bottom with transparent reserve (no height shift)
  - Desktop nav list gap --space-2, CTA margin-left --space-3, btn height 36px
  - Mobile menu aria-hidden management on open/close/escape/outside-click
affects: [03-01-hero, 03-03-cta-section]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Transparent border reserve: add border-bottom: 2px solid transparent on resting state to prevent layout shift when active border is applied"
    - "Passive scroll listener pattern: window.addEventListener('scroll', fn, { passive: true }) with immediate onScroll() call for pre-scrolled page state"
    - "Two-layer nav shadow: 1px border layer (--color-border) + ambient alpha layer (rgb(0 0 0 / 0.06)) for depth without harsh divide"

key-files:
  created: []
  modified:
    - src/styles/3-components/_nav.css
    - src/theme.js

key-decisions:
  - "font-weight for .nav__link changed from --font-weight-medium to --font-weight-normal — matches UI-SPEC typographic contract, lighter weight reads better at desktop nav scale"
  - "aria-hidden management added to all three close paths (click, outside-click, escape) inside initHamburger — not just the toggle click — ensuring consistent screen reader state on all dismiss patterns"
  - "rgb(0 0 0 / 0.06) in box-shadow is a documented exception — shadow ambient layers may use raw alpha per UI-SPEC; no token needed"

patterns-established:
  - "Transparent border reserve: resting .nav__link gets border-bottom: 2px solid transparent before active state adds the colored border — prevents 2px height shift in flex row"
  - "Passive scroll listener: { passive: true } + immediate onScroll() call after addEventListener — handles Chrome performance warnings and pre-scrolled page state"

requirements-completed: [NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06, NAV-07, NAV-08, NAV-09, ANIM-04]

# Metrics
duration: 18min
completed: 2026-05-17
---

# Phase 03 Plan 02: Nav Audit Summary

**Fraunces logo wordmark + scroll shadow + active accent border with height-shift prevention + passive scroll listener across _nav.css and theme.js**

## Performance

- **Duration:** 18 min
- **Started:** 2026-05-17T00:00:00Z
- **Completed:** 2026-05-17T00:18:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Nav logo upgraded to Fraunces at --text-xl with font-optical-sizing:auto and -0.02em tracking (NAV-02)
- .nav--scrolled CSS rule with two-layer box-shadow; initScrollShadow passive scroll listener with immediate onScroll() call (NAV-08)
- Active nav link shows 2px solid accent border-bottom; all resting links have 2px solid transparent reserve — zero height shift in flex row (NAV-07)
- Desktop list gap increased from --space-1 to --space-2, CTA margin-left --space-3, btn height 36px scoped to .nav context (NAV-04, NAV-05, NAV-06)
- .nav__link transition now includes background-color alongside color; font-weight changed from medium to normal (NAV-03)
- Mobile menu animation duration updated from 120ms to 200ms (ANIM-04)
- NAV-01 (height: var(--nav-height)) and NAV-09 (top: var(--nav-height)) verified intact — no regression
- aria-hidden managed on .nav__menu across all three close paths in initHamburger

## Task Commits

1. **Task 1: Nav CSS audit** - `2c388bf` (feat)
2. **Task 2: theme.js scroll shadow + aria-hidden** - `4f34aef` (feat)

## Files Created/Modified
- `src/styles/3-components/_nav.css` - 9 targeted changes: logo font, link transition+weight, mobile timing, list gap, border reserve, active border, CTA margin, btn height, .nav--scrolled rule
- `src/theme.js` - initScrollShadow function with passive scroll listener; aria-hidden management added to initHamburger

## Decisions Made
- font-weight for .nav__link base rule changed from --font-weight-medium to --font-weight-normal per UI-SPEC typographic contract
- aria-hidden managed in all three dismiss paths (toggle click, outside click, Escape keydown) for complete screen reader coverage
- rgb(0 0 0 / 0.06) raw alpha in box-shadow kept as documented exception per UI-SPEC — no token added

## Deviations from Plan

None — plan executed exactly as written. The aria-hidden additions to initHamburger were explicitly scoped in Task 2 action block.

## Issues Encountered

None. All grep verification ran cleanly after confirming the file edits via Read tool (bash grep encountered encoding issues with em dashes in CSS custom property names on Windows — verified correct by reading file content directly).

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Nav component is production-quality: all 10 requirements complete (NAV-01 through NAV-09, ANIM-04)
- .nav--scrolled class and CSS rule ready — scroll shadow activates immediately on page load if mid-scroll
- No regressions on --nav-height usage (height of inner row + top offset of mobile menu)
- Plan 03 (CTA section) can proceed without nav dependency

---
*Phase: 03-first-impression*
*Completed: 2026-05-17*
