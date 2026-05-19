---
phase: 8
plan: "01"
subsystem: hero
tags: [html, css, hero, typography, animation]
dependency_graph:
  requires: []
  provides: [hero-restructure]
  affects: [index.html, _hero.css]
tech_stack:
  added: []
  patterns: [BEM, CSS custom properties, staggered entrance animation]
key_files:
  created: []
  modified:
    - index.html
    - src/styles/3-components/_hero.css
decisions:
  - "No font-size rule added to .hero__name — h2 element size from _typography.css applies"
  - "--hero-content-max-width token retained in _variables.css (token documents old constraint, costs nothing)"
metrics:
  duration: "< 5 minutes"
  completed: 2026-05-19
---

# Phase 8 Plan 01: Hero Restructure Summary

Hero HTML and CSS updated to replace the eyebrow label with an accented "Sam Blake" h2, update the h1 prefix to "A Product Designer who", remove the subheadline paragraph, and strip the 1440px max-width constraint from hero content.

## What Was Done

### Task 1 — index.html

- Removed `<p class="hero__eyebrow">Product Designer</p>`
- Inserted `<h2 class="hero__name">Sam Blake</h2>` before the h1
- Changed h1 leading text from "The designer who" to "A Product Designer who" (typewriter span unchanged)
- Removed `<p class="hero__subheadline">...</p>` entirely
- Final element order inside `.hero__content`: h2.hero__name → h1.hero__headline → div.hero__actions

### Task 2 — _hero.css

- Added `.hero__name` CSS block (after `@keyframes hero-enter`) using only CSS custom properties: `--font-heading`, `--font-weight-semibold`, `--color-accent-accessible`, `--space-3`, `--leading-tight`, `letter-spacing: -0.02em`. No `font-size` rule — h2 element size from `_typography.css` applies.
- Updated stagger animation selector list from 5 elements (eyebrow, headline, typewriter, subheadline, actions) to 4 (name, headline, typewriter, actions)
- Updated animation-delay assignments: name 0ms, headline 80ms, typewriter 160ms, actions 240ms
- Removed `.hero__eyebrow` CSS block entirely
- Removed `.hero__subheadline` CSS block and its 905px responsive override entirely
- Removed the `@media (min-width: 1440px)` `.hero__content` block (`max-width` and `margin-inline` rules)

## Files Changed

| File | Change |
|------|--------|
| `index.html` | Eyebrow removed, h2.hero__name added, h1 text updated, subheadline removed |
| `src/styles/3-components/_hero.css` | .hero__name added, stagger updated, eyebrow/subheadline blocks removed, 1440px override removed |

## Verification Results

### index.html
- `grep -c "hero__name" index.html` → **1** (pass)
- `grep -c "hero__eyebrow" index.html` → **0** (pass)
- `grep -c "hero__subheadline" index.html` → **0** (pass)
- h1 text at line 31: `A Product Designer who` (pass)

### _hero.css
- `grep -c "hero__name" _hero.css` → **3** (selector list, delay rule, block — pass, requirement was ≥ 2)
- `grep -c "hero__eyebrow" _hero.css` → **0** (pass)
- `grep -c "hero__subheadline" _hero.css` → **0** (pass)
- `grep -c "max-width: var(--hero-content-max-width)" _hero.css` → **0** (pass)
- `.hero__name` delay → `0ms`, `.hero__actions` delay → `240ms` (pass)

## Commit

`2dfbdf7` — `feat(08-01): restructure hero — name h2, updated headline, no subheadline`

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — both files contain only structural/styling changes; no data stubs introduced.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced.
