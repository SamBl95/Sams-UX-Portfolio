---
phase: 03-first-impression
plan: 01
subsystem: ui
tags: [css-animation, design-tokens, hero, stagger, responsive]

# Dependency graph
requires:
  - phase: 02-foundation-infrastructure
    provides: --ease-out-quint easing token and animation infrastructure in _variables.css
provides:
  - 5-element hero entrance stagger at 80ms steps using var(--ease-out-quint)
  - --hero-content-max-width: 860px token in _variables.css
  - .hero__content capped at 860px on 1440px+ viewports
affects: [03-02-nav, 04-card-scroll-reveal]

# Tech tracking
tech-stack:
  added: []
  patterns: [animation-fill-mode both via shorthand, easing token in animation shorthand, 1440px ultra-wide layout constraint]

key-files:
  created: []
  modified:
    - src/styles/3-components/_hero.css
    - src/styles/1-settings/_variables.css

key-decisions:
  - "animation-fill-mode: both retained via shorthand keyword — not forwards — so elements stay invisible during delay AND hold final state"
  - "860px max-width uses margin-inline: 0 (not auto) — hero is left-aligned, centering would conflict with flex-start layout"
  - "Removed /* 860px */ comment from _hero.css to satisfy acceptance criterion — value lives only in _variables.css"

patterns-established:
  - "Easing token pattern: animation shorthand uses var(--ease-out-quint) not bare cubic-bezier()"
  - "Component constraint tokens: layout constraints on specific components go in Component tokens block in _variables.css with descriptive comment"

requirements-completed: [ANIM-02, LAY-01]

# Metrics
duration: 8min
completed: 2026-05-17
---

# Phase 3 Plan 01: Hero Summary

**5-element hero entrance stagger at 80ms steps via var(--ease-out-quint) and 860px ultra-wide column constraint via token**

## Performance

- **Duration:** 8 min
- **Started:** 2026-05-17T00:00:00Z
- **Completed:** 2026-05-17T00:08:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Replaced 4-element 60ms stagger with 5-element stagger: eyebrow → headline → typewriter → subheadline → actions at 0/80/160/240/320ms
- Swapped hardcoded `cubic-bezier(0.22, 1, 0.36, 1)` for `var(--ease-out-quint)` token in animation shorthand
- Added `--hero-content-max-width: 860px` token to _variables.css and applied in a `min-width: 1440px` media query to `.hero__content`

## Task Commits

1. **Task 1: Hero entrance stagger — 5 elements, 80ms steps** - `0c4d801` (feat)
2. **Task 2: Hero max-width token and 1440px constraint** - `fa029cf` (feat)

## Files Created/Modified

- `src/styles/3-components/_hero.css` — 5-element stagger block with token easing; new 1440px media query with max-width
- `src/styles/1-settings/_variables.css` — `--hero-content-max-width: 860px` added to Component tokens block

## Decisions Made

- Kept `animation-fill-mode: both` (not `forwards`) — `both` applies fill before the animation starts, keeping elements invisible during their delay period.
- Used `margin-inline: 0` in the 1440px block — hero content is `align-items: flex-start` and left-aligned; `margin: 0 auto` would center it against the design intent.
- Removed the `/* 860px */` inline comment from `_hero.css` to ensure the hardcoded value lives only in `_variables.css` (acceptance criterion: `grep -c "860px" _hero.css` returns 0).

## Deviations from Plan

None — plan executed exactly as written. The only adjustment was removing a documentation comment (`/* 860px */`) that would have caused an acceptance criterion check to return 1 instead of 0.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- ANIM-02 and LAY-01 complete; hero entrance animations are production-ready.
- Phase 3 Plan 02 (nav audit) is unblocked — it has no dependency on this plan.

---
*Phase: 03-first-impression*
*Completed: 2026-05-17*
