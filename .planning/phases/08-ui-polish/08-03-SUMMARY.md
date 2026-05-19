---
phase: 08-ui-polish
plan: "03"
subsystem: ui
tags: [work-page, feature-layout, css-cleanup, vite-registration]
dependency_graph:
  requires: ["08-01", "08-02"]
  provides: ["work-page", "72ch-removal"]
  affects: ["src/pages/work.html", "src/styles/3-components/_work.css", "src/styles/main.css", "vite.config.js", "src/styles/3-components/_about.css", "src/styles/3-components/_case-study.css", "src/styles/3-components/_stories.css"]
tech_stack:
  added: []
  patterns: ["BEM feature-section layout", "flexbox responsive pattern (column → row at 905px)", "aspect-ratio placeholder image"]
key_files:
  created:
    - src/pages/work.html
    - src/styles/3-components/_work.css
  modified:
    - src/styles/main.css
    - vite.config.js
    - src/styles/3-components/_about.css
    - src/styles/3-components/_case-study.css
    - src/styles/3-components/_stories.css
decisions:
  - "Empty .post__body p ruleset removed entirely from _stories.css after max-width was the only declaration — cleaner than retaining an empty block"
  - "_work.css imported after _case-studies.css in ITCSS component block — maintains logical grouping of work-related component styles"
metrics:
  duration: "~10 minutes"
  completed: "2026-05-19"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 08 Plan 03: Work Page and 72ch Cleanup Summary

Removed 72ch paragraph max-width constraints from three component files and created the /work page with a feature-section layout showcasing all three Santander case studies.

## Tasks Completed

### Task 1: Remove 72ch max-width from paragraph selectors

Removed `max-width: 72ch` from the following rulesets:

- `_about.css` — `.about-section__body p` (line 75, property removed, remaining 4 properties intact)
- `_case-study.css` — `.cs-phase__body p` (line 283, property removed, remaining 4 properties intact)
- `_stories.css` — `.post__body p` (entire empty ruleset removed; max-width was the only declaration)

No other max-width values were touched (`.card__subtitle` 24ch and chip constraints are unchanged).

**Verification:** `grep -rn "max-width.*72ch" src/styles/3-components/` — zero matches.

**Commit:** `2bd2f90` — feat(08-03): remove 72ch paragraph max-width from about, case study, stories css

### Task 2: Create /work page, _work.css, and register both

**src/pages/work.html** — Created with canonical scaffold per CLAUDE.md. Two sections:
1. Hero section with h1 "Selected work" and subheading "Three case studies from Santander UK"
2. Feature cases section with three `<article class="work__feature">` elements, each containing: 16:9 image placeholder, metric chip, Fraunces h2 title, description paragraph, ghost CTA button

**src/styles/3-components/_work.css** — Created with:
- `.work__heading` / `.work__subheading` section header styles
- Mobile-first flex column layout for `.work__feature`
- `.work__feature-image` with `aspect-ratio: 16 / 9` and surface background
- `.work__feature-copy` flex column with `--space-4` gap
- `@media (min-width: 905px)` breakpoint: flex-direction row, image `flex: 0 0 40%`, copy `flex: 1`

**src/styles/main.css** — `@import './3-components/_work.css'` added after `_case-studies.css`

**vite.config.js** — `work: r('./src/pages/work.html')` added after `storiesPost` entry

**Verification:**
- `grep -c 'class="work__feature"' src/pages/work.html` → 3
- `grep -c "_work.css" src/styles/main.css` → 1
- `grep -c "work.*work.html" vite.config.js` → 1

**Commit:** `5d53185` — feat(08-03): create /work page with three feature rows; register in vite + main.css

## Deviations from Plan

**1. [Rule 1 - Cleanup] Empty .post__body p block removed from _stories.css**
- Found during: Task 1
- Issue: After removing `max-width: 72ch`, the `.post__body p {}` block had zero declarations — an empty ruleset
- Fix: Removed the entire empty block; the adjacent `.post__body p + p` selector is unaffected
- Files modified: `src/styles/3-components/_stories.css`
- Commit: `2bd2f90`

## Known Stubs

The three `work__feature-image` divs are intentional surface-colored placeholder rectangles with no actual images wired. These are documented in the phase plan as image placeholders — real imagery will be added in a future content phase.

## Threat Flags

None. Static HTML/CSS page creation with no new trust boundaries.

## Self-Check: PASSED

- [x] `src/pages/work.html` exists
- [x] `src/styles/3-components/_work.css` exists
- [x] `src/styles/main.css` contains `_work.css` import
- [x] `vite.config.js` contains `work: r('./src/pages/work.html')`
- [x] Zero 72ch matches in component CSS
- [x] Three `work__feature` articles in work.html
- [x] Commits `2bd2f90` and `5d53185` exist in git log
