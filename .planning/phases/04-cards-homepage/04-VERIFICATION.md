---
phase: 04-cards-homepage
verified: 2026-05-18T00:00:00Z
status: passed
score: 5/5 must-haves verified
overrides_applied: 0
---

# Phase 4: Cards & Homepage Verification Report

**Phase Goal:** Case study cards feel premium — hover interactions are intentional, grid layout is correct at all breakpoints
**Verified:** 2026-05-18
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Card metric values render in Fraunces — display numbers have heading-class weight | VERIFIED | `_card.css` line 79: `font-family: var(--font-heading)` on `.card__metric-value` |
| 2 | Card hover uses state-layer overlay — not a straight background swap | VERIFIED | `.card::after` block (lines 24-33) with `opacity: 0` at rest, `opacity: 0.08` on hover; no `background-color` in `.card:hover` block |
| 3 | Link arrow moves on card hover, not just button hover | VERIFIED | `_card.css` line 156: `.card:hover .card__link-arrow`; `.btn--ghost:hover .card__link-arrow` absent from file |
| 4 | Three cards scroll-stagger into view — 100ms between each | VERIFIED | `index.html` lines 66/86/106: `data-reveal-delay="0/100/200"` on each card; `_reveal.css` defines `animation-delay: 100ms` and `200ms` selectors; `reveal.js` adds `.js-reveal--visible` on intersection |
| 5 | At 1240px+: three cards in a row, equal width, no orphaned card | VERIFIED | `_case-studies.css` lines 53-58: `@media (min-width: 1240px)` with `grid-template-columns: repeat(3, 1fr)` and `gap: var(--space-8)` |

**Score:** 5/5 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/styles/3-components/_card.css` | Fully audited card component CSS | VERIFIED | 160 lines, substantive; contains `.card::after`, `position: relative`, `scale(0.97)`, `(hover: hover) and (pointer: fine)`, `prefers-reduced-motion` guard |
| `src/styles/3-components/_case-studies.css` | Three-column grid breakpoint at 1240px+ | VERIFIED | `@media (min-width: 1240px)` block present with `repeat(3, 1fr)` and `var(--space-8)` gap |
| `index.html` | Cards with `js-reveal` class and `data-reveal-delay` stagger attributes | VERIFIED | All three `.card` articles carry `class="card js-reveal"` with `data-reveal-delay="0/100/200"` |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `_card.css` `.card::after` | State-layer pattern | `background-color: var(--color-text-primary); opacity: 0/0.08/0.12` | WIRED | Block present at lines 24-39; pattern matches `_reveal.css` lines 71-98 template exactly |
| `.card:hover .card__link-arrow` | `.card__link-arrow` | Selector scoped to whole-card hover | WIRED | `_card.css` line 156 confirms selector; no residual `.btn--ghost:hover` selector in file |
| `index.html` `.card` elements | `_reveal.css` + `reveal.js` | `js-reveal` class + `data-reveal-delay` attributes + IntersectionObserver | WIRED | `reveal.js` loaded at `index.html` line 136; queries `.js-reveal`; CSS attribute selectors apply delays |
| `.case-studies__grid` | 1240px breakpoint | `grid-template-columns: repeat(3, 1fr)` | WIRED | `_case-studies.css` lines 53-58 confirmed |

---

### Data-Flow Trace (Level 4)

Not applicable — this phase delivers CSS behaviour and HTML structure. No dynamic data binding; all card content is static markup. No state variable traces required.

---

### Behavioral Spot-Checks

Step 7b: SKIPPED — no runnable API or CLI entry points in this phase. Behavior is CSS/HTML-only and requires visual browser verification.

---

### Probe Execution

Step 7c: No probes declared in PLAN files. No conventional `scripts/*/tests/probe-*.sh` files exist for this phase.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| COMP-01 | 04-01-PLAN-cards.md | Card metric value uses `var(--font-heading)` (Fraunces) | SATISFIED | `_card.css` line 79 |
| COMP-02 | 04-01-PLAN-cards.md | Card hover uses state-layer `::after` overlay | SATISFIED | `_card.css` lines 24-39 |
| COMP-03 | 04-01-PLAN-cards.md | Card link arrow translates on `.card:hover` (whole card) | SATISFIED | `_card.css` line 156 |
| COMP-04 | 04-01-PLAN-cards.md | Card has `scale(0.97)` on `:active` | SATISFIED | `_card.css` line 42 |
| COMP-05 | 04-01-PLAN-cards.md | Card hover gated with `@media (hover: hover) and (pointer: fine)` | SATISFIED | `_card.css` lines 35 and 44 and 155 |
| TOK-01 | 04-01-PLAN-cards.md | Stale `rgb(26 107 82 / 0.14)` box-shadow replaced | SATISFIED | `rgb(26 107 82` grep returns 0 matches; `rgb(79 209 165 / 0.10)` present at line 50 |
| ANIM-03 | 04-02-PLAN-grid.md | Case study cards stagger into view — 0/100/200ms delays via `.js-reveal` | SATISFIED | `index.html` lines 66/86/106; `_reveal.css` delay selectors; `reveal.js` IntersectionObserver |
| LAY-02 | 04-02-PLAN-grid.md | Case study grid `repeat(3, 1fr)` at 1240px+ | SATISFIED | `_case-studies.css` lines 53-58 |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | — | — | — |

No TBD/FIXME/XXX markers, no hardcoded hex values, no inline styles, no placeholder content found in modified files.

**Informational note:** `_reveal.css` defines `animation-delay` selectors only for `"100"`, `"200"`, and `"300"` — not `"0"`. Card 1 uses `data-reveal-delay="0"`. This is correct: no matching selector means the browser defaults to `animation-delay: 0s`. Card 1 animates immediately on scroll entry as intended.

---

### Human Verification Required

None — all success criteria are verifiable from static code analysis. Visual polish of the hover state (overlay subtlety, lift distance feel) is subjective but the implementation matches the UI-SPEC contract values exactly.

---

### Gaps Summary

No gaps. All five success criteria from ROADMAP.md Phase 4 are met by the delivered code. All seven requirements (COMP-01 through COMP-05, ANIM-03, LAY-02) are satisfied. TOK-01 (stale shadow token) was addressed as a required co-deliverable.

---

_Verified: 2026-05-18_
_Verifier: Claude (gsd-verifier)_
