# Phase 7: Footer + Global Audit - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-18
**Phase:** 7-footer-global-audit
**Areas discussed:** Em dash replacement, Footer hover pattern, Reduced-motion scope, Typography comment fix

---

## Em Dash Replacement

| Option | Description | Selected |
|--------|-------------|----------|
| HTML entity &mdash; | Renders identically, passes grep, zero visual change | |
| Leave as-is, fix the requirement | Em dashes in body copy are correct typography; TYP-01 may have targeted a different problem | |
| En dash or hyphen | Changes visual slightly, less polished | |
| Context-aware replacement | User provided free-text: colons/hyphens in titles, omit in body copy | ✓ |

**User's choice:** Context-aware — titles and headings only; case study body prose deferred to v3
**Notes:** User flagged that AI overuse of em dashes is a telltale copy signal. The goal is genuinely better typography, not just satisfying a grep check. Body prose in case studies will be reviewed case-by-case in v3.

**Follow-up — scope clarification:**

| Option | Description | Selected |
|--------|-------------|----------|
| Claude rewrites contextually | Judgment call per instance | |
| Flag only, user rewrites | User handles all body prose rewrites | |
| Titles only for now | Fix `<title>`, `<meta description>`, `<h1>` only; skip case study body | ✓ |

**User's choice:** Titles only; "don't worry about case study copy we're going to review this on a case by case basis"

---

## Footer Hover Pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Match nav exactly — @media (hover: hover) and (pointer: fine) | Consistent with nav, prevents sticky hover on mobile | ✓ |
| Keep current .footer__link:hover | Footer is less interactive, simpler hover is fine | |

**User's choice:** Match nav exactly
**Notes:** No deviation from nav pattern.

---

## Reduced-motion Scope

**Question 1 — nav mobile menu:**

| Option | Description | Selected |
|--------|-------------|----------|
| Suppress animation, keep instant snap | animation: none on nav menu; hamburger transforms stay | |
| Suppress everything | animation: none + transition: none + transform: none | ✓ |

**User's choice:** Suppress everything for the nav mobile menu

**Question 2 — color-only transitions:**

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — suppress all transitions | Consistent rule; color fades become instant | |
| No — color transitions are safe | Reduced motion targets animation/transform; color fades are imperceptible | ✓ |

**User's choice:** Color-only transitions do not need reduced-motion blocks
**Notes:** Only 2 files actually need new blocks after this scoping: `_nav.css` (animation + transforms) and `_case-study.css` (link arrow `transition: transform`).

---

## Typography Comment Fix

| Option | Description | Selected |
|--------|-------------|----------|
| Just fix the comment | Update h1 row only (36→40px, 48→56px) | |
| Audit all heading values | Verify h2 and h3 rows also match while fixing h1 | ✓ |

**User's choice:** Audit all heading values while fixing
**Notes:** Actual discrepancies: h1 default 36→40px, h1 600px 48→56px, h1 1440px 96→80px (no rule exists at 1440px for h1 — stays at 80px from 1240px). h2 and h3 values in comment already match code.

---

## Claude's Discretion

- Exact replacement text for page title em dashes — use judgment to produce readable un-AI-sounding titles
- Whether existing `_reveal.css` prefers-reduced-motion block is complete (already has one; verify)

## Deferred Ideas

- Em dashes in case study body prose — v3 content review pass
