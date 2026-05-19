---
phase: 8
plan: "02"
subsystem: nav
tags: [nav, animation, css, html, underline, hover]
dependency_graph:
  requires: []
  provides: [nav-underline-animation, nav-home-link, nav-no-logo]
  affects: [all pages using nav partial]
tech_stack:
  added: []
  patterns: [::after pseudo-element scaleX animation, transform-origin: left center]
key_files:
  created: []
  modified:
    - src/components/nav.html
    - src/styles/3-components/_nav.css
decisions:
  - "Consolidated duplicate .nav__menu block inside 905px media query rather than leaving two separate blocks"
  - "Comment mentioning nav__logo removed from margin-left declaration to keep grep verification clean"
metrics:
  duration: ~10min
  completed: 2026-05-19
---

# Phase 8 Plan 02: Nav Redesign Summary

One-liner: Nav logo replaced with inline Home link; desktop hover/active state replaced with left-to-right ::after underline animation using scaleX(0→1) at 200ms ease-out.

## What Was Done

### Task 1 — nav.html

- Removed `<a class="nav__logo">Sam Blake</a>` anchor entirely
- Added Home as first `<li>` in `.nav__list` with `navHome` flag support and `aria-current="page"` conditional
- Updated Work href from `/#case-studies` to `/src/pages/work.html`
- Updated usage comment block to document `navHome=true` flag

Final nav order: Home → Work → About → Stories → Get in touch

### Task 2 — _nav.css

- Removed `border-bottom: 1px solid var(--color-border)` from `.nav` block
- Removed all `.nav__logo`, `.nav__logo:hover`, `.nav__logo:focus-visible` rules and `/* Logo */` comment
- Added `margin-left: auto` to `.nav__menu` inside 905px media query (replaces logo's margin-right: auto role)
- Added `position: relative` to `.nav__link` base block
- Removed `border-radius: var(--radius-md)` and `border-bottom: 2px solid transparent` from `.nav__link` at 905px+
- Removed `background-color: var(--color-surface)` hover rule at 905px+
- Removed `.nav__link[aria-current="page"]` background-color + border-bottom rules at 905px+
- Added `.nav__link::after` pseudo-element block inside 905px query: scaleX(0), transform-origin: left center, 2px accent underline
- Added `@media (prefers-reduced-motion: no-preference)` guard for the ::after transition
- Added hover trigger inside `(hover: hover) and (pointer: fine)` media query
- Added `.nav__link[aria-current="page"]::after { transform: scaleX(1) }` and `font-weight: var(--font-weight-semibold)`
- Added `.nav__link::after { transition: none }` in existing `@media (prefers-reduced-motion: reduce)` block
- Mobile active state unchanged: color + font-weight-semibold on `[aria-current="page"]`

## Files Changed

| File | Change |
|------|--------|
| `src/components/nav.html` | Remove logo anchor, add Home li, update Work href |
| `src/styles/3-components/_nav.css` | Remove border-bottom + logo rules; add underline animation system |

## Verification Results

| Check | Expected | Result |
|-------|----------|--------|
| `grep -c "nav__logo" nav.html` | 0 | 0 PASS |
| nav.html contains `href="/"` as first li | present | PASS |
| nav.html contains `navHome` flag | present | PASS (2 occurrences) |
| nav.html contains `href="/src/pages/work.html"` | present | PASS |
| `grep -c "nav__link::after" _nav.css` | 3+ | 3 PASS |
| `border-bottom: 1px solid var(--color-border)` absent from .nav | 0 | 0 PASS |
| `.nav__logo` absent from _nav.css | 0 | 0 PASS |
| `transform: scaleX(0)` present | present | PASS (line 223) |
| `transform-origin: left center` present | present | PASS (line 224) |
| `margin-left: auto` on .nav__menu at 905px+ | present | PASS (line 192) |
| `position: relative` on .nav__link base | present | PASS (line 133) |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Duplicate .nav__menu block inside 905px media query**
- **Found during:** Task 2 implementation
- **Issue:** My insertion of `margin-left: auto` created a second `.nav__menu` block inside the 905px query (the original block at lines 186–192 plus a new block at lines 200–202)
- **Fix:** Merged `margin-left: auto` into the existing `.nav__menu` block and removed the duplicate
- **Files modified:** `src/styles/3-components/_nav.css`

**2. [Rule 1 - Bug] Comment text contained "nav__logo" string**
- **Found during:** Verification step
- **Issue:** The comment `/* pushes nav cluster right now that .nav__logo is removed */` caused `grep -c nav__logo` to return 1 instead of 0
- **Fix:** Rewrote comment to `/* pushes nav cluster right — no logo anchor */`
- **Files modified:** `src/styles/3-components/_nav.css`

## Commit

`dd29264` — feat(08-02): nav redesign — home link, no logo, underline hover animation

## Self-Check

- [x] `src/components/nav.html` exists and modified
- [x] `src/styles/3-components/_nav.css` exists and modified
- [x] Commit `dd29264` exists in git log
- [x] All verification checks pass

## Self-Check: PASSED
