---
phase: 04-cards-homepage
plan: 02
subsystem: ui
tags: [css-grid, scroll-reveal, intersection-observer, breakpoints, animation]

# Dependency graph
requires:
  - phase: 02-foundation-infrastructure
    provides: reveal.js IntersectionObserver + _reveal.css stagger mechanism
provides:
  - Three-column CSS grid at 1240px+ for .case-studies__grid (LAY-02)
  - js-reveal stagger attributes (0/100/200ms) on all three homepage cards (ANIM-03)
affects: [05-typography-spacing, any phase editing index.html or _case-studies.css]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Breakpoint ladder: 1col default → 2col (905px) → 3col (1240px) with --space-8 gap"
    - "js-reveal stagger: card BEM root class first, then js-reveal, then data-reveal-delay"

key-files:
  created: []
  modified:
    - src/styles/3-components/_case-studies.css
    - index.html

key-decisions:
  - "data-reveal-delay=\"0\" added explicitly to Card 1 for clarity per UI-SPEC — stagger delay of zero makes the cascade contract unambiguous"
  - "gap: --space-8 (64px) at 1240px+ — generous spacing matches the visual weight of three equal columns"

patterns-established:
  - "Breakpoint ladder pattern: append @media blocks in ascending order, never modify existing blocks"
  - "Reveal stagger pattern: class=\"card js-reveal\" data-reveal-delay=\"N\" — BEM root first, reveal hook second"

requirements-completed: [LAY-02, ANIM-03]

# Metrics
duration: 12min
completed: 2026-05-18
---

# Phase 4 Plan 02: Grid & Scroll-Reveal Summary

**Three-column grid breakpoint at 1240px+ and 0/100/200ms staggered scroll-reveal wired to all three homepage case study cards**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-05-18T08:30:00Z
- **Completed:** 2026-05-18T08:42:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Completed the breakpoint ladder for `.case-studies__grid` — cards now render in a proper three-column layout at 1240px+ with 64px gap, eliminating the orphaned third card at wide viewports
- Wired `js-reveal` + `data-reveal-delay` to all three `.card` articles, activating the IntersectionObserver stagger mechanism already in `reveal.js` and `_reveal.css`
- Reduced-motion users unaffected — the existing `prefers-reduced-motion: reduce` guard in `_reveal.css` sets `opacity: 1; animation: none` without any additional work

## Task Commits

Each task was committed atomically:

1. **Task 1: LAY-02 Three-column grid at 1240px+** - `5f960b9` (feat)
2. **Task 2: ANIM-03 Wire js-reveal stagger on homepage cards** - `485e307` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/styles/3-components/_case-studies.css` — Appended `@media (min-width: 1240px)` block with `repeat(3, 1fr)` and `--space-8` gap
- `index.html` — Added `js-reveal` class and `data-reveal-delay` attribute to all three `.card` article opening tags

## Decisions Made

- `data-reveal-delay="0"` added explicitly to Card 1 for parity and clarity — the stagger contract is unambiguous when all three cards carry the attribute
- No changes to `_reveal.css` or `reveal.js` were needed; both were already wired correctly from Phase 2 Plan 01

## Deviations from Plan

None — plan executed exactly as written. Both tasks were purely additive (no existing CSS rules modified, no existing HTML markup changed other than the targeted article opening tags).

## Issues Encountered

**Worktree absolute-path routing:** The first Edit call used the main repo path (`C:/Users/sambl/.../my-portfolio-v2/src/...`) rather than the worktree path. The accidental edit was reverted from the main repo (`git checkout -- src/styles/3-components/_case-studies.css`) and the change was applied correctly to the worktree path. No committed content was affected.

## Known Stubs

None — this plan adds structural attributes only. No data, copy, or content is stubbed.

## Threat Flags

None — CSS grid declaration and HTML data attributes introduce no new security surface.

## Next Phase Readiness

- LAY-02 and ANIM-03 requirements fully met
- Homepage cards now animate in on scroll with correct 0/100/200ms stagger at all viewport widths
- Three-column layout confirmed at 1240px+ — no orphaned card
- Phase 5 (typography and spacing) can proceed without any dependency on this plan's output

---
*Phase: 04-cards-homepage*
*Completed: 2026-05-18*
