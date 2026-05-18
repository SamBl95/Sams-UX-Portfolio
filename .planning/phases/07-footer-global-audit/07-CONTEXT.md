# Phase 7: Footer + Global Audit - Context

**Gathered:** 2026-05-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Audit and correctness pass: footer hover polish, prefers-reduced-motion coverage for nav and case-study transforms, em dash cleanup in page titles and headings, and typography comment accuracy. No new features or pages. Body-copy em dashes in case study prose are explicitly out of scope.

</domain>

<decisions>
## Implementation Decisions

### Em Dash Replacement (TYP-01)
- **D-01:** Replace em dashes in `<title>`, `<meta name="description">`, and `<h1>` elements only. Use contextually appropriate alternative: colon where a subtitle follows (`Problem 1: The feedback journey`), pipe or hyphen in title separators.
- **D-02:** Em dashes in case study body prose (`<h2>`, `<h3>`, `<p>` content) are **out of scope for Phase 7** — deferred to a v3 content review pass. Do not touch them.

### Footer Hover Pattern
- **D-03:** Wrap `.footer__link:hover` in `@media (hover: hover) and (pointer: fine)` to match the nav pattern exactly. The existing `color: var(--color-accent-accessible)` hover value is correct — only the wrapper is missing.

### prefers-reduced-motion Coverage (ANIM-06)
- **D-04:** Only 2 files need new `@media (prefers-reduced-motion: reduce)` blocks:
  - `_nav.css` — suppress everything: `animation: none`, `transition: none`, `transform: none` on mobile menu and hamburger icon elements.
  - `_case-study.css` — suppress only `transition: transform` (the link-arrow `translateX` effect). The `transition: color` in that file is safe to keep.
- **D-05:** Color-only transitions (`transition: color`) do **not** require a reduced-motion block — they are imperceptible and accessible.
- **D-06:** Files `_about.css`, `_before-after.css`, `_callout.css`, `_footer.css` have no transform/keyframe animations — no changes needed to those files.

### Typography Comment (TYP-02)
- **D-07:** Update `_typography.css` header comment to match actual code. The h1 row is wrong: comment says `36 / 48 / 64 / 80 / 96px`, code has `40 / 56 / 64 / 80 / 80px` (no 1440px rule for h1 — it inherits from 1240px). **Update the comment; do not add a new h1 rule.** Audit all heading rows to confirm h2 and h3 match (they currently do).

### Claude's Discretion
- Exact replacement text for page title em dashes — use judgment to produce readable, un-AI-sounding titles.
- Whether to add `prefers-reduced-motion` to `_reveal.css`'s scroll-reveal fade-in (it already has one; verify completeness).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### CSS Architecture
- `src/styles/3-components/_nav.css` — existing hover pattern (`@media (hover: hover) and (pointer: fine)`) to replicate in footer; mobile menu animation to suppress under reduced-motion
- `src/styles/3-components/_footer.css` — current footer styles; hover wrapping needed
- `src/styles/2-base/_typography.css` — heading scale; comment needs updating to match code
- `src/styles/3-components/_case-study.css` — has `transition: transform` on link arrow that needs reduced-motion block

### Requirements
- `.planning/REQUIREMENTS.md` §ANIM-06, TYP-01, TYP-02, TYP-03, TOK-02 — acceptance criteria for this phase

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Patterns
- `@media (hover: hover) and (pointer: fine)` wrapper — established in `_nav.css`; replicate exactly in `_footer.css`
- prefers-reduced-motion block structure — established in `_reveal.css` (opacity:1 explicit) and `_stories.css` (clip-path reset); follow same pattern

### Established Conventions
- Hover state color = `var(--color-accent-accessible)` — used in both nav and footer links
- Transitions use token values (`var(--transition-fast)`, `var(--ease-out)`) — no raw ms values

### Integration Points
- `src/pages/` HTML files — `<title>` and `<meta name="description">` em dashes to update across all pages

</code_context>

<specifics>
## Specific Ideas

- User confirmed: em dashes are a visible AI-copy signal and should be removed from titles/headings — not just sanitised into `&mdash;` entities. The goal is better typography, not character encoding.
- Footer hover: match nav `@media (hover: hover)` wrapper exactly — no deviation.

</specifics>

<deferred>
## Deferred Ideas

- Em dashes in case study body prose (`<h2>`, `<h3>`, `<p>` content) — v3 content review pass, out of scope.

</deferred>

---

*Phase: 7-footer-global-audit*
*Context gathered: 2026-05-18*
