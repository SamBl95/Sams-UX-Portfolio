---
phase: 04-cards-homepage
plan: 01
subsystem: ui
tags: [css, card, hover, state-layer, animation, bem, itcss]

# Dependency graph
requires:
  - phase: 02-foundation-infrastructure
    provides: state-layer ::after pattern documented in _reveal.css lines 71-98
  - phase: 03-first-impression
    provides: pointer: fine gate pattern established for nav hover
provides:
  - Card component fully audited — 6 issues resolved across COMP-01 through COMP-05 and TOK-01
  - State-layer ::after hover overlay pattern applied to .card
  - Fraunces metric value font binding
  - Dark-palette accent glow box-shadow
  - Touch-safe hover gate (pointer: fine)
  - Active press scale feedback
  - Reduced-motion guard on card and overlay
affects:
  - 04-02-PLAN-grid (cards now have js-reveal hooks ready to receive)
  - Any future card variant work

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "State-layer ::after overlay — position: relative on parent, ::after with opacity 0/0.08/0.12 for resting/hover/active; pointer-events: none; border-radius: inherit"
    - "Pointer-fine hover gate — @media (hover: hover) and (pointer: fine) prevents ghost hover on touch devices"
    - "prefers-reduced-motion guard on component — transition: none on both .card and .card::after"

key-files:
  created: []
  modified:
    - src/styles/3-components/_card.css

key-decisions:
  - "State-layer replaces background-color swap — translucent ::after overlay (opacity 0.08) gives subtle hover feedback without a jarring color jump; consistent with _reveal.css pattern from Phase 2"
  - "background-color removed from .card transition list — no longer needed after bg-swap removal; keeps transition list minimal (border-color, box-shadow, transform only)"
  - "Card active scale uses transform: scale(0.97) without conflicting with hover translateY(-6px) — :active has higher specificity than :hover when both present; CSS specificity resolves correctly"

patterns-established:
  - "State-layer ::after pattern: copy block from _reveal.css lines 71-98 when adding overlay to new components"
  - "Hover gate pattern: always use @media (hover: hover) and (pointer: fine) — never bare @media (hover: hover) alone"

requirements-completed: [COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, TOK-01]

# Metrics
duration: 12min
completed: 2026-05-18
---

# Phase 4 Plan 01: Cards Summary

**Card component audited — Fraunces metric font, translucent state-layer hover overlay, pointer-safe media gate, 8px arrow translate on card hover, scale(0.97) press feedback, and dark-palette accent glow box-shadow**

## Performance

- **Duration:** 12 min
- **Started:** 2026-05-18T00:00:00Z
- **Completed:** 2026-05-18T00:12:00Z
- **Tasks:** 3
- **Files modified:** 1

## Accomplishments

- COMP-01: `.card__metric-value` now declares `font-family: var(--font-heading)` — metric numbers render in Fraunces display weight instead of Urbanist body weight
- COMP-02: Translucent `::after` state-layer overlay replaces background-color swap — hover feel is subtle and premium, not a jarring color jump
- COMP-03: Link arrow translate selector changed from `.btn--ghost:hover` to `.card:hover` — arrow responds to whole-card hover, not just button hover
- COMP-04: `.card:active { transform: scale(0.97) }` press feedback consistent with button press pattern
- COMP-05: `@media (hover: hover) and (pointer: fine)` gate prevents ghost hover state on touch devices
- TOK-01: Stale `rgb(26 107 82 / 0.14)` light-palette shadow replaced with `rgb(79 209 165 / 0.10)` dark-palette accent glow

## Task Commits

1. **Task 1: COMP-01 + TOK-01 — Metric font and box-shadow token fix** - `46a779f` (feat)
2. **Task 2: COMP-02 + COMP-04 + COMP-05 — State-layer hover, active press, media query gate** - `4c16095` (feat)
3. **Task 3: COMP-03 — Link arrow trigger on card hover** - `b97c10e` (feat)

## Files Created/Modified

- `src/styles/3-components/_card.css` — All 6 issues resolved (COMP-01 through COMP-05, TOK-01)

## Decisions Made

- State-layer `::after` pattern copied from `_reveal.css` lines 71–98 as documented in STATE.md Phase 2 decision. Background-color swap removed from `.card:hover`; `background-color` entry also removed from transition list since it is no longer animated.
- `transform` carries both hover lift (`translateY(-6px)`) and press feedback (`scale(0.97)`). CSS specificity naturally resolves the conflict: `:active` overrides `:hover` when both conditions are true. No composite transform needed.
- Raw alpha values (`opacity: 0.08`, `opacity: 0.12`) permitted in state-layer blocks per STATE.md accumulated decision from Phase 3 (shadow layer decision).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — this plan modifies CSS behaviour only. No data binding, no placeholder text.

## Threat Flags

None — CSS-only edits with no executable code, network endpoints, or user input vectors.

## Issues Encountered

The worktree structure required all edits to target the worktree path (`/.claude/worktrees/agent-a3f0b1ad4d402e4a3/src/...`) rather than the main project path. First Task 1 edits were applied to the main project path by mistake; these were re-applied to the correct worktree path before committing.

## Next Phase Readiness

- Card component fully polished — ready for scroll-stagger `.js-reveal` hooks (04-02-PLAN-grid.md)
- All card interaction states correct — hover, active, touch-safe
- `_card.css` is the single source of truth for card styling; no residual technical debt

---
*Phase: 04-cards-homepage*
*Completed: 2026-05-18*
