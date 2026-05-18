# Phase 7: Footer + Global Audit - Research

**Researched:** 2026-05-18
**Domain:** CSS audit — hover patterns, prefers-reduced-motion, em dash cleanup, token coherence
**Confidence:** HIGH (all findings are direct codebase reads, zero external dependencies)

## Summary

Phase 7 is a pure audit-and-correctness pass with no new features. All five requirements (ANIM-06, TYP-01, TYP-02, TYP-03, TOK-02) have been fully mapped to specific file locations and line numbers through direct codebase inspection.

The scope is tight and well-bounded by the CONTEXT.md decisions. The largest surface area is TYP-01 (em dashes): every `<title>` and `<meta name="description">` in `src/pages/` contains at least one em dash and needs replacement. The one `<h1>` with an em dash is in `cassi.html`. The homepage `index.html` has an em dash in its `<meta name="description">` only.

The reduced-motion gap is exactly as CONTEXT.md predicted: `_nav.css` has animations but no `@media (prefers-reduced-motion: reduce)` block; `_case-study.css` has a `transition: transform` on the pagination arrow with no reduced-motion block. All other animated files already carry correct blocks (`_reset.css` global, `_reveal.css`, `_button.css`, `_card.css`, `_stories.css`). The `_hero.css` animations are already covered by the `_reset.css` global reset (zeroes `animation-duration`), but there is a specific opacity concern — unlike `_reveal.css`, hero elements do not start at `opacity: 0`, so the global reset is sufficient.

**Primary recommendation:** Work in file order: (1) _footer.css hover wrap, (2) _nav.css reduced-motion block, (3) _case-study.css reduced-motion block, (4) em dash sweep across all pages, (5) _typography.css comment fix. No package installs, no new files, no structural changes.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Replace em dashes in `<title>`, `<meta name="description">`, and `<h1>` elements only. Use contextually appropriate alternative: colon where a subtitle follows, pipe or hyphen in title separators.
- **D-02:** Em dashes in case study body prose (`<h2>`, `<h3>`, `<p>` content) are out of scope for Phase 7 — deferred to v3 content review pass. Do not touch them.
- **D-03:** Wrap `.footer__link:hover` in `@media (hover: hover) and (pointer: fine)` to match the nav pattern exactly. The existing `color: var(--color-accent-accessible)` hover value is correct — only the wrapper is missing.
- **D-04:** Only 2 files need new `@media (prefers-reduced-motion: reduce)` blocks: `_nav.css` and `_case-study.css`.
- **D-05:** Color-only transitions (`transition: color`) do not require a reduced-motion block — they are imperceptible and accessible.
- **D-06:** `_about.css`, `_before-after.css`, `_callout.css`, `_footer.css` have no transform/keyframe animations — no changes needed to those files for ANIM-06.
- **D-07:** Update `_typography.css` header comment to match actual code. The h1 row is wrong: comment says `36 / 48 / 64 / 80 / 96px`, code has `40 / 56 / 64 / 80 / 80px` (no 1440px rule for h1 — it inherits from 1240px). Update the comment; do not add a new h1 rule.

### Claude's Discretion
- Exact replacement text for page title em dashes — use judgment to produce readable, un-AI-sounding titles.
- Whether to add `prefers-reduced-motion` to `_reveal.css`'s scroll-reveal fade-in (it already has one; verify completeness).

### Deferred Ideas (OUT OF SCOPE)
- Em dashes in case study body prose (`<h2>`, `<h3>`, `<p>` content) — v3 content review pass.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANIM-06 | Every animated element has a matching `prefers-reduced-motion: reduce` block — zero animations fire under reduced motion | Gap confirmed in `_nav.css` (keyframe + transform) and `_case-study.css` (transition: transform). All other files verified covered. |
| TYP-01 | No em dashes (`—`) in any of the 8 HTML source pages | 9 pages scanned (incl. index.html). Em dashes found in title/meta/h1 elements across all pages except contact.html h1 and stories/index.html h1. Full inventory below. |
| TYP-02 | `_typography.css` header comment matches code (h1: 40/56/64/80px — not 36/48 as documented) | Comment confirmed wrong (says 36/48/96px). Code confirmed correct (40/56/80px, no 1440px h1 rule). |
| TYP-03 | All spacing uses 8pt scale tokens — no hardcoded pixel values outside `_variables.css` | One exception found: `_nav.css` line 63 `gap: 5px` (hamburger bar gap). All other px values are structural (border-width, outline-offset, width/height of decorative elements). Full analysis below. |
| TOK-02 | Zero hardcoded values outside `_variables.css` — no raw hex, no raw px spacing | All hex values confirmed inside `_variables.css` only. The `5px` in `_nav.css` is the only non-token spacing. Two `rgb()` alpha values in `_card.css` and `_nav.css` are permitted per project convention (shadow layers). |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Footer hover pattern | CSS Component | — | Pure presentational; no JS interaction |
| prefers-reduced-motion coverage | CSS Component (per file) | CSS Base (_reset.css global) | Global reset handles duration; component blocks handle opacity/transform edge cases |
| Em dash removal | HTML source | — | Static content in markup; no CSS involvement |
| Typography comment accuracy | CSS Base (_typography.css) | — | Comment-only fix; no style rule changes |
| Token coherence audit | CSS Settings (_variables.css) | CSS Components (all) | Violations live in component files; definitions live in settings |

---

## Findings by Requirement

### ANIM-06: prefers-reduced-motion Coverage

#### Global baseline — `_reset.css` (COVERED)
Lines 101–110: global `@media (prefers-reduced-motion: reduce)` block zeroes `animation-duration: 0.01ms`, `transition-duration: 0.01ms` on `*`. This covers all files passively.

**Why component-level blocks are still needed:**
The global reset zeroes durations but does NOT reset initial `opacity: 0` states or explicit `transform` values. A component with `opacity: 0` as its pre-animation state will remain invisible. A component relying on a transform for layout shift suppression needs explicit `transform: none`.

#### Full animation inventory by file:

| File | Animations / Transforms | Reduced-Motion Block | Status |
|------|------------------------|---------------------|--------|
| `_reset.css` | Global `animation-duration: 0.01ms` | IS the block | COVERED (baseline) |
| `_reveal.css` | `@keyframes reveal-enter` (opacity + translateY), `animation:` on `.js-reveal--visible` | Lines 49–55: explicit `opacity: 1; animation: none` on `.js-reveal` and `.js-reveal--visible` | COVERED — handles opacity:0 initial state correctly |
| `_hero.css` | `@keyframes hero-enter` (opacity + translateY), `animation:` on 5 hero children; `@keyframes cursor-blink` on typewriter cursor | No component block | COVERED BY GLOBAL — hero elements do not start at `opacity: 0`; global duration zeroing suppresses animations without leaving invisible elements |
| `_button.css` | `transition: transform 150ms` on `.btn`; `:active` `transform: scale(0.97)` | Lines 66–75: removes `transform` from transition, sets `transform: none !important` on hover/active | COVERED |
| `_card.css` | `transition: transform 200ms` on `.card`; `transform: translateY(-6px)` on hover; `transform: scale(0.97)` on active; `transition: opacity 150ms` on `::after` | Lines 55–60: `transition: none` on `.card` and `.card::after` | COVERED |
| `_nav.css` | `@keyframes nav-menu-enter` (opacity + translateY on mobile menu); `animation:` on `.nav--open .nav__menu`; `transition: transform 200ms` on `.nav__toggle-bar`; `transform: rotate/translateY` on open hamburger bars | **NO BLOCK** | **GAP — needs new block** |
| `_case-study.css` | `transition: transform 150ms` on `.cs-pagination__arrow`; `transform: translateX` on hover | **NO BLOCK** | **GAP — needs new block** |
| `_stories.css` | `transition: clip-path 200ms` on `.stories__link::before`; `transition:` on `.stories__link` and `.post__back` | Lines 152–162: `transition: none` on link/back; `clip-path: inset(0 0 0 0)` reset (shows border fully) | COVERED |
| `_about.css` | Color transitions only | N/A (D-06) | NOT NEEDED |
| `_before-after.css` | No transitions/animations | N/A | NOT NEEDED |
| `_callout.css` | No transitions/animations | N/A | NOT NEEDED |
| `_footer.css` | `transition: color` on `.footer__link` | N/A (D-05) | NOT NEEDED (color-only) |

#### Required new blocks:

**`_nav.css` — what to suppress:**
- `animation: none` on `.nav--open .nav__menu` (suppresses `nav-menu-enter` keyframe)
- `transform: none` on `.nav--open .nav__toggle-bar:nth-child(1)` and `:nth-child(3)` (suppresses rotate transforms)
- `opacity: 1` on `.nav--open .nav__toggle-bar:nth-child(2)` (the middle bar hides via `opacity: 0`; without this it stays invisible under reduced motion)
- `transition: none` on `.nav__toggle-bar` (suppresses the 200ms transform transition)

**`_case-study.css` — what to suppress:**
- `transition: none` on `.cs-pagination__arrow` (removes the `transform 150ms` transition)
- The `transform: translateX` on hover is already gated by `@media (hover: hover)` but the transition itself fires under any hover event — still needs suppression

Note: `.cs-pagination__link` hover uses `@media (hover: hover)` without `and (pointer: fine)` (line 473). This is a minor inconsistency vs. the established pattern (`_nav.css`, `_card.css`, `_stories.css` all use the full `and (pointer: fine)` guard). The planner should note this but it is outside ANIM-06 scope.

---

### TYP-01: Em Dash Inventory

**Scope:** `<title>`, `<meta name="description">`, `<h1>` elements only. Body prose is out of scope (D-02).

**Method:** Grep for `—` across all `src/pages/` HTML files + `index.html`.

#### Em dashes requiring replacement:

| File | Element | Line | Current content | Scope |
|------|---------|------|-----------------|-------|
| `index.html` | `<meta name="description">` | 6 | `Sam Blake — Product Designer based in...` | IN SCOPE |
| `index.html` | `<title>` | 7 | `Sam Blake \| Product Designer` | **NO EM DASH** — clean |
| `src/pages/about.html` | `<meta name="description">` | 6 | `About Sam Blake — Product designer at Matalan...` | IN SCOPE |
| `src/pages/about.html` | `<title>` | 7 | `About — Sam Blake \| Product Designer` | IN SCOPE |
| `src/pages/about.html` | `<h1>` | 31 | `I discovered UX while having breakfast in a Wetherspoons.` | **NO EM DASH** — clean |
| `src/pages/contact.html` | `<meta name="description">` | 6 | `Get in touch with Sam Blake — product designer open to...` | IN SCOPE |
| `src/pages/contact.html` | `<title>` | 7 | `Get in touch — Sam Blake \| Product Designer` | IN SCOPE |
| `src/pages/contact.html` | `<h1>` | 27 | `Get in touch` | **NO EM DASH** — clean |
| `src/pages/stories/index.html` | `<meta name="description">` | 6 | `Stories by Sam Blake — reflections on product design...` | IN SCOPE |
| `src/pages/stories/index.html` | `<title>` | 7 | `Stories — Sam Blake \| Product Designer` | IN SCOPE |
| `src/pages/stories/index.html` | `<h1>` | 26 | `Stories` | **NO EM DASH** — clean |
| `src/pages/stories/design-systems-and-portfolio-sites.html` | `<meta name="description">` | 6 | `Design systems and portfolio sites — Sam Blake` | IN SCOPE |
| `src/pages/stories/design-systems-and-portfolio-sites.html` | `<title>` | 7 | `Design systems and portfolio sites — Sam Blake` | IN SCOPE |
| `src/pages/stories/design-systems-and-portfolio-sites.html` | `<h1>` | 29 | `Design systems and portfolio sites` | **NO EM DASH** — clean |
| `src/pages/case-studies/cassi.html` | `<meta name="description">` | 6 | `Cassi AI Chatbot Feedback Redesign — Sam Blake fixed...` | IN SCOPE |
| `src/pages/case-studies/cassi.html` | `<title>` | 7 | `Cassi — AI Chatbot Feedback Redesign — Sam Blake` | IN SCOPE |
| `src/pages/case-studies/cassi.html` | `<h1>` | 35 | `Cassi — AI Chatbot Feedback Redesign` | **IN SCOPE** (only h1 with em dash) |
| `src/pages/case-studies/i-exchange.html` | `<meta name="description">` | 6 | `i-Exchange Knowledge Base Overhaul — Sam Blake overhauled...` | IN SCOPE |
| `src/pages/case-studies/i-exchange.html` | `<title>` | 7 | `i-Exchange Knowledge Base Overhaul — Sam Blake` | IN SCOPE |
| `src/pages/case-studies/i-exchange.html` | `<h1>` | 35 | `i-Exchange Knowledge Base Overhaul` | **NO EM DASH** — clean |
| `src/pages/case-studies/community.html` | `<meta name="description">` | 6 | `Community Support Forum Redesign — Sam Blake led...` | IN SCOPE |
| `src/pages/case-studies/community.html` | `<title>` | 7 | `Community Support Forum Redesign — Sam Blake` | IN SCOPE |
| `src/pages/case-studies/community.html` | `<h1>` | 35 | `Community Support Forum Redesign` | **NO EM DASH** — clean |

**Summary:** 14 em dashes to replace across 9 pages. 1 is in an `<h1>` (cassi.html). The rest are in `<title>` or `<meta name="description">`.

**Pattern observed:** The em dash in titles is almost always a name separator (`— Sam Blake`). The appropriate replacement is a pipe `|` (already the pattern in `index.html` title: `Sam Blake | Product Designer`) or a hyphen. For subtitle structures (e.g. `Cassi — AI Chatbot Feedback Redesign`) a colon works better.

**Suggested replacements (Claude's discretion, D-01):**

| File | Element | Suggested replacement |
|------|---------|----------------------|
| `index.html` | meta description | `Sam Blake, Product Designer based in the North West...` (remove separator entirely) |
| `about.html` | title | `About Sam Blake \| Product Designer` |
| `about.html` | meta description | `About Sam Blake: Product designer at Matalan...` |
| `contact.html` | title | `Get in touch \| Sam Blake, Product Designer` |
| `contact.html` | meta description | `Get in touch with Sam Blake, product designer open to...` |
| `stories/index.html` | title | `Stories \| Sam Blake` |
| `stories/index.html` | meta description | `Writing by Sam Blake: reflections on product design...` |
| `stories/design-systems...html` | title | `Design systems and portfolio sites \| Sam Blake` |
| `stories/design-systems...html` | meta description | `Design systems and portfolio sites, by Sam Blake` |
| `cassi.html` | title | `Cassi: AI Chatbot Feedback Redesign \| Sam Blake` |
| `cassi.html` | meta description | `Cassi AI Chatbot Feedback Redesign by Sam Blake...` |
| `cassi.html` | h1 | `Cassi: AI Chatbot Feedback Redesign` |
| `i-exchange.html` | title | `i-Exchange Knowledge Base Overhaul \| Sam Blake` |
| `i-exchange.html` | meta description | `i-Exchange Knowledge Base Overhaul by Sam Blake...` |
| `community.html` | title | `Community Support Forum Redesign \| Sam Blake` |
| `community.html` | meta description | `Community Support Forum Redesign by Sam Blake...` |

These are starting points — the implementer should read each full sentence in context and produce natural copy, not mechanical substitution.

---

### TYP-02: Typography Comment Accuracy

**File:** `src/styles/2-base/_typography.css` lines 7–15 (the header comment table)

**Current comment (wrong):**
```
               default   600px    905px    1240px   1440px
  h1           36px      48px     64px     80px     96px
```

**Actual code (correct):**
- Default: `var(--text-40)` = 40px (line 23)
- 600px: `var(--text-56)` = 56px (line 88)
- 905px: `var(--text-64)` = 64px (line 97)
- 1240px: `var(--text-80)` = 80px (line 107)
- 1440px: **no rule** — h1 inherits 80px from 1240px breakpoint (lines 115–120 have h2, h3, h4, p only)

**Correct comment row:**
```
  h1           40px      56px     64px     80px     80px
```
(or `—` for 1440px to signal no override, matching the pattern of leaving the cell empty)

**h2 and h3 — verified correct:**
- h2: 28/36/48/56/64px — comment matches code
- h3: 22/28/32/40/48px — comment matches code
- body (p): 16/16/18/18/20px — comment matches code
- small: 14/14/16/16/16px — comment matches code

**Action:** Change h1 comment row only. No code rule changes.

---

### TYP-03 / TOK-02: Hardcoded Value Audit

**Hex values:** All hex values (`#...`) confirmed exclusively in `_variables.css` lines 19–28. No other CSS file contains a hex value. [VERIFIED: direct grep]

**RGB alpha values (permitted exception):** Two files use raw `rgb()` for shadow layers:
- `_card.css`: `rgb(0 0 0 / 0.08)` and `rgb(79 209 165 / 0.10)` in box-shadow (line 49–51)
- `_nav.css`: `rgb(0 0 0 / 0.06)` in `.nav--scrolled` box-shadow (line 21)

Per project convention documented in STATE.md (`[03-02]`): "raw alpha permitted in shadow layers per UI-SPEC, no token needed." These are NOT violations.

**Raw pixel spacing values — the one genuine exception:**

| File | Line | Value | Context | Verdict |
|------|------|-------|---------|---------|
| `_nav.css` | 63 | `gap: 5px` | Hamburger toggle-bar spacing (`.nav__toggle`) | **VIOLATION** — not on 8pt scale, no token |

All other `px` values in component files are:
- `border-width` (1px, 2px, 3px) — structural, not spacing, conventional in CSS
- `outline-offset` (2px, 3px) — accessibility/visual convention, no token for these
- `height: 2px` on decorative lines (stat-block dividers, process-step connectors) — structural
- `width: 1px / 3px` on decorative elements — structural
- `min-height: 44px / 36px / 40px` in `_button.css` — these are intentional design-spec values; the button file's own comment documents the WCAG rationale

**Decision for planner:** The `5px` gap in `_nav.css` is the only spacing token violation. Fix: change to `var(--space-1)` (8px) or leave at `5px` and document as an intentional visual exception (hamburger bars at 5px gap is a tight visual packing decision). CONTEXT.md D-03 only covers the hover wrapper; this `5px` finding needs a judgement call. Given TYP-03/TOK-02 acceptance criteria ("no raw pixel spacing values outside `_variables.css`"), it should be addressed.

---

### Footer Hover: Current State vs. Required State

**Current `_footer.css` (lines 79–81):**
```css
.footer__link:hover {
  color: var(--color-accent-accessible);
}
```
No `@media (hover: hover) and (pointer: fine)` wrapper. This fires on touch devices.

**Nav pattern to replicate (lines 167–169 of `_nav.css`):**
```css
@media (hover: hover) and (pointer: fine) {
  .nav__link:hover {
    color: var(--color-text-primary);
  }
}
```

**Required change — wrap, do not alter the value:**
```css
@media (hover: hover) and (pointer: fine) {
  .footer__link:hover {
    color: var(--color-accent-accessible);
  }
}
```

The `.footer__link:focus-visible` rule (lines 83–87) needs no change — focus states apply to all input methods by design.

The `.footer__link` base `transition: color var(--transition-fast)` (line 77) stays in place — this is not a violation (D-05: color transitions are fine).

---

## Standard Stack

No external packages. This phase modifies only existing CSS and HTML files.

| Tool | Purpose | Available |
|------|---------|-----------|
| Text editor / Write tool | Direct file edits | Yes |
| `grep -r "—" src/pages/` | Verify em dash removal | Yes |
| `grep -r "prefers-reduced-motion" src/styles/` | Verify motion coverage | Yes |

---

## Architecture Patterns

### Pattern 1: Nav Hover Guard (established, replicate in footer)
```css
/* Source: src/styles/3-components/_nav.css lines 167–169 */
@media (hover: hover) and (pointer: fine) {
  .nav__link:hover {
    color: var(--color-text-primary);
  }
}
```

### Pattern 2: Reduced-Motion Block (stories model — transition: none + state reset)
```css
/* Source: src/styles/3-components/_stories.css lines 152–162 */
@media (prefers-reduced-motion: reduce) {
  .stories__link,
  .post__back {
    transition: none;
  }

  .stories__link::before {
    transition: none;
    clip-path:  inset(0 0 0 0); /* show border fully — no animation */
  }
}
```

### Pattern 3: Reduced-Motion Block (reveal model — animation: none + opacity override)
```css
/* Source: src/styles/3-components/_reveal.css lines 49–55 */
@media (prefers-reduced-motion: reduce) {
  .js-reveal,
  .js-reveal--visible {
    opacity:   1;
    animation: none;
  }
}
```

### Pattern 4: Reduced-Motion Block (button model — targeted property removal)
```css
/* Source: src/styles/3-components/_button.css lines 66–75 */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
  }

  .btn:hover,
  .btn:active {
    transform: none !important;
  }
}
```

### Required New Block for `_nav.css`

The nav block needs to address:
1. Mobile menu `animation` (keyframe suppression)
2. Toggle bar `transition: transform` (transition suppression)
3. Toggle bar `transform` open-state values (reset to identity so bars remain visible)
4. Middle bar `opacity: 0` open-state (restore to 1 so it stays visible)

```css
@media (prefers-reduced-motion: reduce) {
  .nav__toggle-bar {
    transition: none;
  }

  .nav--open .nav__menu {
    animation: none;
  }

  .nav--open .nav__toggle-bar:nth-child(1),
  .nav--open .nav__toggle-bar:nth-child(3) {
    transform: none;
  }

  .nav--open .nav__toggle-bar:nth-child(2) {
    opacity: 1;
  }
}
```

### Required New Block for `_case-study.css`

```css
@media (prefers-reduced-motion: reduce) {
  .cs-pagination__arrow {
    transition: none;
  }
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Em dash detection | Custom script | Direct `grep -r "—" src/pages/` — simple enough |
| Token audit | Custom linter | Manual grep for `#[0-9a-f]` outside `_variables.css` (already done in research) |

---

## Common Pitfalls

### Pitfall 1: Touching body prose em dashes (D-02)
**What goes wrong:** Grepping for `—` in `src/pages/` returns hundreds of matches in body prose. Replacing them all is out of scope and could break intentional punctuation.
**How to avoid:** Scope replacements strictly to lines inside `<title>`, `<meta name="description" content="...">`, and `<h1>` tags only.
**Warning signs:** If you see the em dash in a `<p>`, `<h2>`, `<h3>`, or `<li>` — stop, that is body prose, out of scope.

### Pitfall 2: `@media (hover: hover)` without `and (pointer: fine)` inconsistency
**What goes wrong:** `_case-study.css` line 473 uses `@media (hover: hover)` without `and (pointer: fine)`. The project pattern is the full double guard. Do not replicate the incomplete guard; do not "fix" it in this phase either (out of scope).
**How to avoid:** When writing the new reduced-motion block for `_case-study.css`, do not alter the existing hover media query. Write the motion block as a separate `@media (prefers-reduced-motion: reduce)` block.

### Pitfall 3: Adding an h1 rule at 1440px for typography comment fix
**What goes wrong:** The instinct to make the comment accurate by matching `36/48/96` would mean adding a new 1440px h1 rule. D-07 explicitly forbids this.
**How to avoid:** Change only the comment text. The actual scale (inheriting 80px at 1440px) is the intended behaviour.

### Pitfall 4: Nav `gap: 5px` — confusing structural px with spacing tokens
**What goes wrong:** `5px` in `_nav.css` is the visual gap between the three hamburger bars. Changing it to `var(--space-1)` (8px) changes the visual appearance of the hamburger. Test visually if changed.
**How to avoid:** Change to `var(--space-1)` and do a visual spot-check at mobile viewport. If the hamburger looks too loose, this may warrant keeping `5px` as a documented exception.

---

## Validation Strategy

Each requirement maps directly to a shell command the implementer can run to confirm completion.

| Requirement | Validation Command | Expected Result |
|------------|-------------------|-----------------|
| TYP-01 (em dashes) | `grep -rn "—" src/pages/ index.html \| grep -E "<title>|<meta name=\"description\"|<h1"` | Zero matches |
| TYP-02 (comment fix) | Read `_typography.css` lines 7–11 | h1 row reads `40px 56px 64px 80px 80px` |
| TYP-03 / TOK-02 (tokens) | `grep -rn "#[0-9a-fA-F]" src/styles/ --include="*.css" \| grep -v "_variables.css"` | Zero matches |
| TOK-02 spacing | `grep -rn "gap: [0-9]\+px\|padding: [0-9]\+px\|margin: [0-9]\+px" src/styles/ --include="*.css" \| grep -v "_variables.css"` | Only `5px` in `_nav.css` (or zero if fixed) |
| ANIM-06 | `grep -rn "prefers-reduced-motion" src/styles/ --include="*.css"` | Returns matches in: `_reset.css`, `_reveal.css`, `_button.css`, `_card.css`, `_stories.css`, `_nav.css` (new), `_case-study.css` (new) |
| D-03 footer hover | `grep -n "hover: hover" src/styles/3-components/_footer.css` | Returns the new wrapper line |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `_hero.css` animations are safely covered by the `_reset.css` global reset because hero elements don't start at `opacity: 0` | ANIM-06 inventory | If hero elements do have opacity:0 in JS-driven state, they could get stuck invisible. Low risk — hero elements are rendered immediately on load. |
| A2 | `gap: 5px` in `_nav.css` is the only non-token spacing violation | TOK-02 | Other small literal values (border-width, outline-offset, decorative heights) are classified as structural, not spacing. This classification is reasonable but could be argued differently. |

---

## Environment Availability

Step 2.6: SKIPPED — no external tools, services, or runtimes required. All changes are file edits to existing CSS and HTML.

---

## Validation Architecture

**No test framework in use.** This is a vanilla HTML/CSS project with no test runner.

Validation is manual shell commands (listed in Validation Strategy section above) plus browser visual inspection.

| Req ID | Behavior | Test Type | Command |
|--------|----------|-----------|---------|
| ANIM-06 | prefers-reduced-motion blocks present in nav + case-study | Manual: grep | `grep -rn "prefers-reduced-motion" src/styles/` |
| TYP-01 | No em dashes in title/meta/h1 elements | Manual: grep | `grep -rn "—" src/pages/ index.html` scoped to relevant elements |
| TYP-02 | Comment row matches h1 breakpoint values | Manual: read | Open `_typography.css`, verify header comment |
| TYP-03 / TOK-02 | No raw hex outside `_variables.css` | Manual: grep | `grep -rn "#[0-9a-fA-F]" src/styles/ \| grep -v "_variables.css"` |

---

## Sources

### Primary (HIGH confidence — direct codebase reads)
- `src/styles/3-components/_footer.css` — full file read
- `src/styles/3-components/_nav.css` — full file read
- `src/styles/2-base/_typography.css` — full file read
- `src/styles/3-components/_case-study.css` — full file read
- `src/styles/3-components/_reveal.css` — full file read
- `src/styles/3-components/_stories.css` — full file read
- `src/styles/3-components/_card.css` — full file read
- `src/styles/3-components/_hero.css` — full file read
- `src/styles/3-components/_button.css` — full file read
- `src/styles/2-base/_reset.css` — full file read
- `src/styles/1-settings/_variables.css` — grep verified (hex values confined here)
- All 9 HTML files — grep for `—`, `<title>`, `<meta name="description">`, `<h1>`

---

## Metadata

**Confidence breakdown:**
- ANIM-06 coverage map: HIGH — read every animated file, confirmed gaps
- TYP-01 em dash inventory: HIGH — grep across all pages, line numbers confirmed
- TYP-02 comment fix: HIGH — code and comment both read directly
- TYP-03/TOK-02 token audit: HIGH — grep for hex confirmed; `5px` finding is the only spacing exception

**Research date:** 2026-05-18
**Valid until:** Phase 7 execution only — no external dependencies, no version drift risk
