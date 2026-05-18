---
phase: 04-cards-homepage
reviewed: 2026-05-18T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - src/styles/3-components/_card.css
  - src/styles/3-components/_case-studies.css
  - index.html
findings:
  critical: 1
  warning: 3
  info: 2
  total: 6
status: issues_found
---

# Phase 4: Code Review Report

**Reviewed:** 2026-05-18
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Three files reviewed: the card component stylesheet, the case-studies section stylesheet, and the homepage. The reveal plumbing (`.js-reveal` + `reveal.js` + `_reveal.css`) is internally consistent and the reduced-motion path is handled correctly in both CSS and JS. The case-studies grid breakpoints are clean and follow the mobile-first pattern.

The primary blocker is a hardcoded `rgb()` colour value in `_card.css` that encodes the accent colour directly as `79 209 165`, diverging from the dark-mode palette defined in `_variables.css` (accent is `#1a6b52`). Three warnings cover: the `data-reveal-delay` attribute being read by CSS attribute selectors but never parsed or applied by `reveal.js` (the delay is silently ignored at runtime), a stale colour description in the CLAUDE.md documentation that does not match the variables file, and an `animation-delay` rule on `.js-reveal[data-reveal-delay]` that fires regardless of whether `.js-reveal--visible` has been added (the delay counts down even before intersection). Two info items cover a comment/reality mismatch on missing sector-tag styles and a magic number in the `rootMargin` inside `reveal.js`.

---

## Critical Issues

### CR-01: Hardcoded accent RGB in box-shadow violates token constraint

**File:** `src/styles/3-components/_card.css:50`
**Issue:** The glow layer of the hover `box-shadow` is written as `rgb(79 209 165 / 0.10)`. The value `79 209 165` is the RGB decomposition of the **old** accent colour (`#4fd1a5`) documented in the `.claude/CLAUDE.md` colour palette comment block. The live `_variables.css` accent is `#1a6b52` (26 107 82), which is a dark forest green — not a mint teal. The hardcoded value therefore (a) violates the "no hex/colour values outside `_variables.css`" constraint and (b) renders an incorrect glow colour that does not match the actual accent token. On a dark background the glow will appear mint-teal while the accent border is dark green, producing a visible colour mismatch on hover.

**Fix:** CSS does not yet expose a way to decompose a custom property into R/G/B channels for `rgb()` unless the token is defined in space-separated channel form. Define a companion channel token in `_variables.css` and reference it:

```css
/* _variables.css — add alongside --color-accent */
--color-accent-rgb: 26 107 82;
```

```css
/* _card.css line 49–51 */
box-shadow:
  0 24px 48px -12px rgb(0 0 0 / 0.08),
  0 0 32px -8px rgb(var(--color-accent-rgb) / 0.15);
```

Adjust the opacity to taste for the new darker accent; 0.10 on a near-black mint was subtle, but 0.15 on a dark forest green against a dark background will likely need to be higher (0.25–0.35) to remain visible.

---

## Warnings

### WR-01: reveal.js never reads `data-reveal-delay` — stagger is silently broken at runtime

**File:** `src/reveal.js:40-42` / `src/styles/3-components/_reveal.css:34-36`

**Issue:** `_reveal.css` wires stagger delays via attribute selectors:

```css
.js-reveal[data-reveal-delay="100"] { animation-delay: 100ms; }
```

These rules set `animation-delay` unconditionally on every `.js-reveal` element that carries the attribute — including ones that have **not yet received `.js-reveal--visible`**. The `animation-delay` countdown begins the moment the page loads (CSS animations start their delay timer when the `animation-name` is first applied). However, `animation-name` is only applied via `.js-reveal--visible`, so the delay is added to the element **at the moment the class lands**, not at page-load. This is mostly correct in isolation.

The real problem: `reveal.js` never reads `dataset.revealDelay` at all. The observer callback fires, adds `.js-reveal--visible`, and the CSS `animation-delay` takes over — but only because the CSS attribute selector is doing the work. If the `data-reveal-delay` values are ever set programmatically (e.g. `el.dataset.revealDelay = "150"`) they will have no effect because no CSS rule covers `150`. The coupling is entirely implicit and fragile: the JS attribute and the CSS selector are an undocumented contract with no enforcement. Any delay value not in `{100, 200, 300}` is silently ignored.

Additionally, `reveal.js` adds `js-reveal--visible` to all three cards in one `entries.forEach` loop tick when they are all in the viewport simultaneously (likely, since all three cards are above the fold on a desktop viewport). In that case the delays do apply, but if only some cards are in the viewport, cards that enter later lose the stagger offset entirely because their delay timer only starts when their class is added.

**Fix:** Either (a) have `reveal.js` read `data-reveal-delay` and apply it as an inline `style.animationDelay` when adding the class, removing the CSS attribute selectors (makes the delay dynamic and not constrained to three hard values); or (b) document explicitly that only `100 | 200 | 300` are valid values and add an assertion in `reveal.js`:

```js
// Option A — apply delay in JS
const delay = parseInt(el.dataset.revealDelay, 10) || 0;
el.style.animationDelay = delay + 'ms';
el.classList.add('js-reveal--visible');
```

### WR-02: `card:active` press feedback fires on touch devices without the hover guard

**File:** `src/styles/3-components/_card.css:39` and `card.css:42`

**Issue:** The `::after` active-state overlay (line 39) and the `transform: scale(0.97)` press (line 42) are **not** wrapped in `@media (hover: hover) and (pointer: fine)`, unlike the hover rules. This means both fire on touch/pointer-coarse devices. On a phone, tapping a card will trigger `scale(0.97)` plus a `0.12` opacity overlay — which is intentional for touch feedback — but the card also has `transition: transform 200ms var(--ease-in-out)` applied unconditionally. On a slow device the scale-in and scale-out will animate during the tap, potentially causing the card to feel laggy or to remain scaled during navigation if the tap triggers a link follow before the `transitionend` fires.

More critically: the `card:active` overlay (`opacity: 0.12`) is not subject to `pointer: fine` gating. On a touch device there is no `:hover` state to precede it, so the overlay goes `0 → 0.12` on tap without ever showing the `0.08` hover state. This is intentional touch feedback and the design decision may be deliberate — but it should be explicit. If it IS intended only for pointer-fine devices (consistent with the hover gating), wrap it:

**Fix (if touch feedback is intentional — keep as-is but comment it):**
```css
/* Active press — intentionally ungated: fires on both pointer:fine hover
   and touch/pointer:coarse tap to give haptic-like visual feedback. */
.card:active::after { opacity: 0.12; }
.card:active { transform: scale(0.97); }
```

**Fix (if touch feedback is NOT intended):**
```css
@media (hover: hover) and (pointer: fine) {
  .card:hover::after  { opacity: 0.08; }
  .card:active::after { opacity: 0.12; }
  .card:active        { transform: scale(0.97); }
}
```

### WR-03: `line-height: 1.1` is a magic number, not a design token

**File:** `src/styles/3-components/_case-studies.css:26`

**Issue:** `.case-studies__heading` sets `line-height: 1.1`. The project's token system defines `--leading-tight: 1.25` as the tightest line-height. `1.1` is tighter still and appears nowhere in `_variables.css`. Using a bare number violates the design-token constraint ("no arbitrary spacing") and makes this heading diverge from the typographic scale silently. If the heading font is changed or the token values are adjusted, this rule will not be updated.

**Fix:** Either use `--leading-tight: 1.25` (closest token), or if `1.1` is intentional for a display heading, add it to `_variables.css`:

```css
/* _variables.css */
--leading-display: 1.1;   /* display-size headings only */
```

```css
/* _case-studies.css */
.case-studies__heading {
  line-height: var(--leading-display);
}
```

---

## Info

### IN-01: Card comment references sector tags — no styles or markup exist

**File:** `src/styles/3-components/_card.css:3–4`

**Issue:** The file-header comment lists "sector tags" as a card element. No `.card__tags` or `.card__tag` styles exist in `_card.css` and no tag markup appears in `index.html`. The comment creates a false expectation about what the component supports. This is low risk now but will cause confusion when another developer (or a future session) tries to add tags and assumes the styling already exists.

**Fix:** Remove "sector tags" from the file-header comment until the feature is built, or add a `/* TODO: sector tags — see card spec */` note.

### IN-02: `reveal.js` is wrapped in an IIFE but loaded as `type="module"`

**File:** `index.html:137` / `src/reveal.js:12`

**Issue:** `reveal.js` is loaded with `<script type="module">` (line 137 of `index.html`), which means it already runs in strict mode in its own module scope. The outer `(function initReveal() { ... })()` IIFE on line 12 is redundant — module scripts are not evaluated in the global scope, so there is no pollution risk to guard against. The IIFE adds a nesting level and a named function call that serve no purpose in a module context.

**Fix:** Remove the IIFE wrapper and export nothing (module scripts are private by default):

```js
// reveal.js — no IIFE needed, module scope is already isolated
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// ...rest of code at top level
```

---

_Reviewed: 2026-05-18_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
