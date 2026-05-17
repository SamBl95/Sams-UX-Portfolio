# Phase 3: First Impression — Research

**Researched:** 2026-05-17
**Domain:** CSS animation, nav polish, JS scroll listener — vanilla HTML/CSS/JS
**Confidence:** HIGH

---

## Summary

Phase 3 delivers the first-3-seconds experience: a five-element hero entrance stagger, a
fully polished nav component, and a wide-screen layout constraint. Every requirement in this
phase is a targeted surgical change to existing files — no new CSS files, no new JS modules.
The Phase 2 foundation (easing tokens, `--nav-height`, button corrections, reduced-motion
global reset) is confirmed shipped and available.

The current codebase is close but not there. The hero stagger uses 60ms steps (needs 80ms)
and animates only 4 elements (needs 5, with `.hero__typewriter` as a separate staggered
block). The nav logo uses the wrong font family, wrong size, and wrong weight. The nav list
gap is still `--space-1` (8px, needs `--space-2` 16px). The mobile menu animation runs at
120ms (needs 200ms). The nav CTA has no left-margin separation, no height override, and the
active state lacks an accent bottom border. The scroll shadow JS listener does not yet exist.
`--hero-content-max-width` does not yet exist in `_variables.css`.

**Primary recommendation:** Two parallel plans are the right shape. Plan 01 (hero) touches
`_hero.css` and `_variables.css` only. Plan 02 (nav) touches `_nav.css` and `theme.js`
only. No file is touched by both plans — true parallel execution with zero merge conflicts.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Hero entrance stagger | Browser / Client (CSS) | — | Pure CSS animation-delay on existing elements; no JS needed |
| Hero wide-screen constraint | Browser / Client (CSS) | — | max-width at 1440px+ breakpoint on `.hero__content` |
| Nav logo typography | Browser / Client (CSS) | — | Font family/size/weight/tracking change in `_nav.css` |
| Nav link transitions | Browser / Client (CSS) | — | Add `background-color` to existing transition property list |
| Nav active state | Browser / Client (CSS) | — | Bottom border rule on `[aria-current="page"]` |
| Nav mobile menu animation | Browser / Client (CSS) | — | Duration change on existing keyframe animation |
| Nav scroll shadow | Frontend (JS event) | Browser / Client (CSS) | JS adds `.nav--scrolled` class; CSS applies box-shadow |
| Hamburger aria attributes | Browser / Client (JS) | — | Already handled in `theme.js` |

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Nav height fixed to `var(--nav-height)` = 56px | CONFIRMED DONE in Phase 2 — `_nav.css` line 24 uses `var(--nav-height)`. Verify no regression. |
| NAV-02 | Logo "Sam Blake" Fraunces 400, `--text-xl`, `font-optical-sizing: auto`, `-0.02em` tracking | NEEDS WORK — current logo is `--text-base`, `--font-weight-semibold`, `-0.01em`, font-family inherits body (Urbanist). Three changes required. |
| NAV-03 | Nav link transition includes `background-color` | NEEDS WORK — current transition is `color var(--transition-fast)` only. Add `background-color var(--transition-fast)`. |
| NAV-04 | Nav list gap increased to `var(--space-2)` (16px) | NEEDS WORK — current desktop gap is `var(--space-1)` (8px) at line 215. |
| NAV-05 | CTA `margin-left: var(--space-3)` separating it from nav links | NEEDS WORK — no left margin on `.nav__link--cta` at desktop. |
| NAV-06 | CTA height overridden to 36px within nav context | NEEDS WORK — no `.nav .btn { height: 36px; }` rule exists. |
| NAV-07 | Active state adds 2px solid accent bottom border alongside background pill | NEEDS WORK — `.nav__link[aria-current="page"]` at desktop sets `background-color` only, no border-bottom. |
| NAV-08 | `.nav--scrolled` added by JS after `scrollY > 8`; CSS applies box-shadow | NEEDS WORK — scroll listener does not exist in `theme.js`; no `.nav--scrolled` CSS rule exists. |
| NAV-09 | Mobile menu `top` uses `var(--nav-height)` | CONFIRMED DONE in Phase 2 — `_nav.css` line 112 uses `var(--nav-height)`. Verify no regression. |
| ANIM-02 | Hero entrance stagger: 0/80/160/240/320ms, `--ease-out-quint` | NEEDS WORK — current delays are 0/60/120/180ms across 4 elements. Needs 5 elements (`.hero__typewriter` added) at 80ms steps, easing hardcoded as cubic-bezier (already matches `--ease-out-quint`). |
| ANIM-04 | Nav mobile menu slide+fade: translateY(-8px)→0, 200ms `--ease-out` | NEEDS WORK — keyframe values correct but duration is 120ms; needs update to 200ms. |
| LAY-01 | Hero content max-width 860px at 1440px+ | NEEDS WORK — no max-width constraint on `.hero__content`. `--hero-content-max-width` token does not yet exist. |
</phase_requirements>

---

## Standard Stack

### Core (this phase — no new packages)

| File | Role | Status |
|------|------|--------|
| `src/styles/3-components/_nav.css` | Nav component styles | Modify |
| `src/styles/3-components/_hero.css` | Hero entrance styles | Modify |
| `src/styles/1-settings/_variables.css` | Design tokens | Modify (add `--hero-content-max-width`) |
| `src/theme.js` | Nav JS (hamburger + scroll listener) | Modify |

No new files. No new packages. No registry operations.

### Phase 2 Dependencies (confirmed available)

| Token / Asset | Value | Confirmed |
|---------------|-------|-----------|
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | `_variables.css` line 139 |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | `_variables.css` line 136 |
| `--nav-height` | `56px` | `_variables.css` line 107 |
| `--transition-fast` | `150ms ease` | `_variables.css` line 132 |
| `--space-2` / `--space-3` | `16px` / `24px` | `_variables.css` lines 96–97 |
| `--color-accent` | `#1a6b52` | `_variables.css` line 24 |
| `--color-border` | `#d6d0c8` | `_variables.css` line 22 |
| `--color-surface` | `#ede9e3` | `_variables.css` line 20 |
| `--radius-md` | `6px` | `_variables.css` line 116 |

---

## Package Legitimacy Audit

Not applicable — this phase installs no external packages. Vanilla CSS/JS only.

---

## Architecture Patterns

### System Architecture Diagram

```
Browser loads index.html
       |
       +--> CSS (main.css) evaluates immediately
       |      _variables.css  → tokens available
       |      _nav.css        → nav renders at 56px, logo styled
       |      _hero.css       → hero-enter keyframe declared, animation-delay assigned
       |
       +--> JS modules (type="module", deferred by default)
              theme.js        → initHamburger() + initScrollShadow()
                                  |
                                  +--> scroll event → adds/removes .nav--scrolled
                                  +--> .nav--scrolled → CSS box-shadow activates
              typewriter.js   → 800ms delay then typing begins
              reveal.js       → IntersectionObserver for scroll sections (not hero)
```

Hero entrance is pure CSS — no JS needed. The 5 elements animate via `animation-delay`
declared directly on the selectors. No class toggle, no setTimeout stagger required.

The scroll shadow is the only new JS — a single `window.addEventListener('scroll', ...)` block
added to `theme.js` alongside the existing `initHamburger()`.

### Pattern 1: Pure CSS Entrance Stagger

**What:** CSS `animation-delay` values assigned to individual BEM elements. No JS.
**When to use:** Page-load animations where all elements are in the DOM at parse time.
**Why not JS:** JS adds a class on DOMContentLoaded which causes a flash of invisible content
if the script is slow. CSS animations run before JS executes on cold load.

```css
/* Source: existing _hero.css pattern, extended */
.hero__eyebrow,
.hero__headline,
.hero__typewriter,
.hero__subheadline,
.hero__actions {
  animation: hero-enter 600ms var(--ease-out-quint) both;
}

.hero__eyebrow    { animation-delay:   0ms; }
.hero__headline   { animation-delay:  80ms; }
.hero__typewriter { animation-delay: 160ms; }
.hero__subheadline{ animation-delay: 240ms; }
.hero__actions    { animation-delay: 320ms; }
```

`animation-fill-mode: both` (via `both` shorthand) ensures elements start invisible even
before their delay fires, and hold their final state after. This is critical for the stagger
to look correct — without it, all elements flash visible at time 0.

**Note on `.hero__typewriter`:** The typewriter container is a `<span>` inside `<h1>` with
`display: block`. It can independently receive `animation`. The typewriter JS has an 800ms
initial delay before first character appears — this naturally places typing well after the
headline animation completes (600ms + 160ms = 760ms). No timing conflict.

### Pattern 2: Passive Scroll Listener for Nav Shadow

**What:** A passive `scroll` event listener adds/removes a CSS class on the nav element.
**When to use:** Any sticky element that needs a visual state change tied to scroll position.

```js
/* Source: [ASSUMED] — standard vanilla JS pattern */
function initScrollShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page starts scrolled
}

initScrollShadow();
```

The `{ passive: true }` flag is required — it tells the browser this listener will not call
`preventDefault()`, allowing the browser to scroll without waiting for JS. Without it,
Chrome DevTools warns and scroll performance degrades on low-end devices.

Running `onScroll()` immediately handles the edge case where the user navigates to a page
that is already scrolled (back/forward cache, anchor link).

### Pattern 3: Nav Logo Fraunces Wordmark

**What:** Override `.nav__logo` to use `--font-heading` (Fraunces) at `--text-xl` with
optical sizing and tighter tracking.
**When to use:** Serif wordmarks contrasting with a sans-serif nav — creates brand hierarchy.

```css
/* Source: UI-SPEC.md — NAV-02 */
.nav__logo {
  font-family:         var(--font-heading);
  font-size:           var(--text-xl);       /* 20px */
  font-weight:         var(--font-weight-normal); /* 400 — not semibold */
  font-optical-sizing: auto;
  letter-spacing:      -0.02em;
  color:               var(--color-text-primary);
  text-decoration:     none;
  transition:          color var(--transition-fast);
  flex-shrink:         0;
  margin-right:        auto;
}
```

**Weight note:** The current logo uses `--font-weight-semibold` (600). The spec requires
`--font-weight-normal` (400). Fraunces at 400 with optical sizing has a more refined, less
aggressive feel appropriate for a wordmark.

### Pattern 4: Nav Active State with Accent Border

**What:** Active nav link combines background pill with 2px teal bottom border.
**When to use:** When a background pill alone is ambiguous (it could be a hover state).

```css
/* Source: UI-SPEC.md — NAV-07 */
/* Desktop only — inside @media (min-width: 905px) */
.nav__link[aria-current="page"] {
  background-color: var(--color-surface);
  border-bottom:    2px solid var(--color-accent);
}
```

**Pitfall:** The `border-bottom` adds 2px height to the element. To prevent the link from
shifting the surrounding flex row, the resting `.nav__link` should have
`border-bottom: 2px solid transparent` so the height is reserved. Without this, the active
link is 2px taller than its siblings and the nav row shifts.

### Pattern 5: Nav CTA Height Override

**What:** Scope a height override to the nav context only, without touching `_button.css`.
**When to use:** When a component appears in multiple contexts at different sizes.

```css
/* Source: UI-SPEC.md — NAV-06 */
/* Desktop only — inside @media (min-width: 905px) */
.nav .btn {
  height: 36px;
}
```

This scopes to `.nav .btn`, leaving all other `.btn` instances at their `_button.css`-defined
heights. Consistent with Phase 2 button height tokens (36px for standard, 40px for primary).

### Pattern 6: LAY-01 Hero Max-Width

**What:** Constrain `.hero__content` to 860px at 1440px+ while leaving narrower viewports
full-width.
**When to use:** Multi-column or ultra-wide screens where long heading lines become hard to
read.

```css
/* Source: UI-SPEC.md — LAY-01 */
/* In _hero.css, add to existing 1440px breakpoint or create one */
@media (min-width: 1440px) {
  .hero__content {
    max-width: var(--hero-content-max-width); /* 860px */
  }
}
```

Add `--hero-content-max-width: 860px` to the "Component tokens" section in `_variables.css`
(after `--nav-height`, same pattern).

### Anti-Patterns to Avoid

- **Animating `.hero__typewriter-text` or `.hero__typewriter-cursor`:** These are inline
  `<span>` elements inside the animated `.hero__typewriter` block. They inherit the parent
  animation. Applying `animation` directly to them creates double-animation artifacts.
- **Using `transition: all` on `.nav__link`:** This would animate `border-bottom` during
  hover on resting links (where there is no border). Be explicit: `background-color` and
  `color` only.
- **Active border causing height shift:** Without a transparent `border-bottom` on resting
  `.nav__link` at desktop, the 2px border on `[aria-current="page"]` will push the row
  height. Reserve the space on all links.
- **Omitting `{ passive: true }` on scroll listener:** Required for Chrome scroll performance.
  Without it, scroll janks on low-end devices and DevTools flags a warning.
- **Forgetting `onScroll()` on load:** If page is rendered mid-scroll (back/forward cache,
  anchor link), the shadow will not appear until the user next scrolls.
- **Using `animation-fill-mode: forwards` instead of `both`:** `forwards` holds the end state
  but the element is visible at `opacity: 1` before its delay fires. `both` keeps it at
  `opacity: 0` during the delay, which is what the stagger needs.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Passive scroll detection | Manual `setTimeout` polling | `window.addEventListener('scroll', fn, { passive: true })` | Native event, zero cost when not scrolling |
| Stagger without JS | JS `setTimeout` chain | CSS `animation-delay` per selector | Pure CSS runs before JS, no flash risk |
| Scroll position state | Custom state manager | `window.scrollY > 8` inline | Direct DOM read, no abstraction needed |

**Key insight:** Every mechanism in this phase has a zero-dependency CSS/vanilla-JS solution.
The right answer is always the CSS primitive or a direct DOM API — not a wrapper around it.

---

## Common Pitfalls

### Pitfall 1: Transparent Border Reserve for Active State
**What goes wrong:** `.nav__link[aria-current="page"]` gets `border-bottom: 2px solid accent`.
All other links have no bottom border. The active link is 2px taller, the flex row shifts,
and desktop nav is 2px taller on pages with an active link.
**Why it happens:** Border-bottom adds to box height in `box-sizing: border-box` only if not
pre-reserved.
**How to avoid:** Add `border-bottom: 2px solid transparent` to the base `.nav__link` rule
at 905px+. The height is always reserved; only the color changes for the active state.
**Warning signs:** Inspect the nav in browser DevTools — if the active link's bounding box
height differs from an adjacent link's height, the reserve is missing.

### Pitfall 2: `.hero__typewriter` is a `<span>`, Not a Block
**What goes wrong:** Adding `animation` to `.hero__typewriter` does nothing because `<span>`
defaults to `display: inline`.
**Why it happens:** CSS `animation` with `translateY` on an inline element has no effect
in most browsers (transforms require a formatting context).
**How to avoid:** The existing `.hero__typewriter` rule already has `display: block` — this
is correct and must be preserved. The stagger animation will work correctly.
**Warning signs:** If the typewriter row does not animate separately from the headline, check
that `display: block` is still on `.hero__typewriter`.

### Pitfall 3: `animation-fill-mode: both` Suppression by Global Reduced-Motion Reset
**What goes wrong:** `_reset.css` sets `animation-duration: 0.01ms !important` under
`prefers-reduced-motion: reduce`. This does NOT affect `opacity: 0` set by
`animation-fill-mode: both`. So under reduced motion, hero elements stay invisible at
`opacity: 0` after the 0.01ms animation fires... but actually `fill-mode: both` resolves
to the "from" keyframe state (opacity: 0) and "to" keyframe state (opacity: 1) in sequence
so fast the user never sees it. The global reset handles this correctly.
**Confirmation:** `_reset.css` line 101–110 — sets `animation-duration: 0.01ms !important`.
Hero elements will flash from opacity:0 to opacity:1 in 0.01ms. Effectively instant. No
additional per-element reduced-motion block needed for the entrance animation.
**The `reveal.js` pattern is different:** reveal.js explicitly adds `js-reveal--visible`
immediately under reduced motion because `.js-reveal` starts at `opacity: 0` via CSS and
the IntersectionObserver would never fire for off-screen elements. Hero elements are always
in the viewport on load, so the global reset handles them correctly.

### Pitfall 4: Nav Scroll Listener vs. Existing `initHamburger` Pattern
**What goes wrong:** Adding a second top-level function call in `theme.js` that calls
`document.querySelector('.nav')` before DOM is ready.
**Why it happens:** `theme.js` is loaded as `type="module"` which defers automatically, so
DOM is ready when it runs. But if `initScrollShadow` is called before `initHamburger`,
there is no issue — both are safe.
**How to avoid:** Add `initScrollShadow()` as a new function in `theme.js`, call it after
`initHamburger()`. Pattern:
```js
initHamburger();
initScrollShadow();
```
The `if (!nav) return;` guard in `initScrollShadow` makes it safe on pages without a nav.

### Pitfall 5: `--ease-out-quint` Token vs. Hardcoded Cubic-Bezier in Hero
**What goes wrong:** The existing hero animation uses the literal cubic-bezier value
`cubic-bezier(0.22, 1, 0.36, 1)` rather than the token `var(--ease-out-quint)`.
**Why it matters:** CSS `animation` shorthand accepts an easing value. CSS custom properties
can be used as the easing value: `animation: hero-enter 600ms var(--ease-out-quint) both;`.
**Current state (to verify):** Line 69 in `_hero.css` uses `cubic-bezier(0.22, 1, 0.36, 1)`
directly. This should be updated to `var(--ease-out-quint)` for token consistency.
**Confirmed equivalent:** `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)` — same curve.

### Pitfall 6: CTA Transition Inheritance
**What goes wrong:** Adding `transition` to `.nav .btn` for the height override context
accidentally overrides the button's own transition defined in `_button.css`.
**How to avoid:** The `.nav .btn { height: 36px; }` rule adds only the height. Do not add
`transition` to this selector — button transition comes from `_button.css` and should not
be duplicated or overridden.

---

## Code Examples

### Nav Scroll Shadow (full pattern)

```js
// Source: [ASSUMED] — standard passive scroll listener pattern
function initScrollShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // handle initial scroll position
}
```

```css
/* Source: UI-SPEC.md NAV-08 */
.nav--scrolled {
  box-shadow: 0 1px 0 var(--color-border), 0 4px 16px -4px rgb(0 0 0 / 0.06);
}
```

The first shadow layer (`0 1px 0 var(--color-border)`) draws a fine separator line below
the nav using the border color token. The second layer (`0 4px 16px -4px rgb(0 0 0 / 0.06)`)
is a soft ambient shadow that grounds the nav visually. The `rgb(0 0 0 / 0.06)` value is a
shadow layer (not a surface color) — using raw alpha here is the documented exception in
the UI-SPEC.

### Hero Stagger (complete update)

```css
/* Source: UI-SPEC.md ANIM-02 */
.hero__eyebrow,
.hero__headline,
.hero__typewriter,
.hero__subheadline,
.hero__actions {
  animation: hero-enter 600ms var(--ease-out-quint) both;
}

.hero__eyebrow    { animation-delay:   0ms; }
.hero__headline   { animation-delay:  80ms; }
.hero__typewriter { animation-delay: 160ms; }
.hero__subheadline{ animation-delay: 240ms; }
.hero__actions    { animation-delay: 320ms; }
```

### Nav Active State with Border Reserve

```css
/* Source: UI-SPEC.md NAV-07 — inside @media (min-width: 905px) */
/* Reserve border space on all links */
.nav__link {
  border-bottom: 2px solid transparent;
}

/* Active state — pill + accent underline */
.nav__link[aria-current="page"] {
  background-color: var(--color-surface);
  border-bottom:    2px solid var(--color-accent);
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `animation-fill-mode: forwards` | `both` shorthand in `animation` shorthand | Always correct — clarified here | Elements invisible during delay, then hold final state |
| `window.addEventListener('scroll', fn)` | `{ passive: true }` flag | Modern browsers (Chrome 51+, all current) | Scroll performance — browser doesn't wait for JS |
| `scrollTop` (jQuery era) | `window.scrollY` | Modern browsers — always use | Direct, no jQuery dependency |
| Hardcoded cubic-bezier | `var(--ease-out-quint)` token | Phase 2 shipped tokens | Token consistency — change in one place |

---

## Exact Current State vs. Required (Gap Analysis)

This table is the precise delta the planner needs to generate tasks.

| Req | File | Current | Required | Change Type |
|-----|------|---------|----------|-------------|
| NAV-01 | `_nav.css` | `height: var(--nav-height)` | Same | Verify only — DONE |
| NAV-02 | `_nav.css` | `font-size: --text-base`, weight 600, letter-spacing -0.01em, font-family inherits body | `font-family: --font-heading`, `font-size: --text-xl`, weight 400, `font-optical-sizing: auto`, letter-spacing -0.02em | Edit `.nav__logo` rule |
| NAV-03 | `_nav.css` | `transition: color var(--transition-fast)` | `transition: background-color var(--transition-fast), color var(--transition-fast)` | Edit `.nav__link` transition |
| NAV-04 | `_nav.css` line 215 | `gap: var(--space-1)` | `gap: var(--space-2)` | Edit 905px `.nav__list` |
| NAV-05 | `_nav.css` | No left margin on `.nav__link--cta` at 905px+ | `margin-left: var(--space-3)` | Add to 905px `.nav__link--cta` |
| NAV-06 | `_nav.css` | No height override | `.nav .btn { height: 36px; }` | Add rule inside 905px block |
| NAV-07 | `_nav.css` | `background-color: --color-surface` only | + `border-bottom: 2px solid var(--color-accent)` + transparent reserve on base | Add border rules inside 905px |
| NAV-08 | `theme.js` + `_nav.css` | No scroll listener; no `.nav--scrolled` rule | `initScrollShadow()` + `.nav--scrolled { box-shadow: ... }` | New function + new CSS rule |
| NAV-09 | `_nav.css` | `top: var(--nav-height)` | Same | Verify only — DONE |
| ANIM-02 | `_hero.css` | 4 elements, 60ms steps, hardcoded cubic-bezier | 5 elements (add `--typewriter`), 80ms steps, use `var(--ease-out-quint)` | Edit stagger rules |
| ANIM-04 | `_nav.css` | `120ms var(--ease-out)` | `200ms var(--ease-out)` | Duration only |
| LAY-01 | `_variables.css` + `_hero.css` | No `--hero-content-max-width` token; no max-width on `.hero__content` | Add token; add 1440px media query | 2 edits across 2 files |

---

## Open Questions

1. **`.nav__link` font-weight at desktop**
   - What we know: Mobile links are `font-weight: medium` (500). Desktop nav spec says links use `--font-weight-normal` (400) per the UI-SPEC typography table.
   - What's unclear: The current `_nav.css` sets `font-weight: var(--font-weight-medium)` on `.nav__link` globally — there is no desktop override. The UI-SPEC says "Nav link / UI: `--font-weight-normal` (400)".
   - Recommendation: Update `.nav__link` base weight to `--font-weight-normal` (400) or add a desktop override. The current `--font-weight-medium` (500) is a minor deviation from spec — planner should include this as part of NAV-02 / NAV-03 work.

2. **`aria-hidden` on mobile menu**
   - What we know: The UI-SPEC accessibility contract says "Mobile menu: `aria-hidden="true"` when closed — must be verified or added in `theme.js`".
   - What's unclear: `theme.js` does not currently set `aria-hidden` on `.nav__menu`.
   - Recommendation: Plan 02 (nav) should add `menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true')` to `initHamburger()` alongside `aria-expanded`. This is a small accessibility correctness fix within the NAV scope.

3. **`--ease-out-quint` in animation shorthand**
   - What we know: CSS custom properties work as easing values in `animation` shorthand in all modern browsers. [ASSUMED] — not verified via official CSS spec docs, but consistent with CSS spec behavior for `<timing-function>`.
   - Recommendation: Use `var(--ease-out-quint)` in the animation rule. If there are browser compatibility concerns, the literal cubic-bezier is identical — either works.

---

## Environment Availability

Step 2.6: SKIPPED — this phase is purely CSS/JS changes to existing files. No external
tools, runtimes, CLIs, or services are required beyond the existing Vite dev server.

---

## Validation Architecture

`workflow.nyquist_validation` is explicitly `false` in `.planning/config.json`. This section
is omitted.

---

## Security Domain

`security_enforcement: true`, `security_asvs_level: 1` in config.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Not applicable — no auth in this phase |
| V3 Session Management | No | Not applicable |
| V4 Access Control | No | Not applicable |
| V5 Input Validation | No | No user input in this phase |
| V6 Cryptography | No | Not applicable |

**Threat patterns relevant to this phase:**

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via `scrollY` manipulation | Spoofing | Not applicable — `window.scrollY` is a browser-controlled number, not user input |
| Prototype pollution via classList | Tampering | Not applicable — `.classList.toggle()` with a string literal is safe |

This phase has no security surface. All changes are CSS styling and a read-only scroll
listener. ASVS Level 1 is satisfied trivially.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | CSS `animation` shorthand accepts `var(--ease-out-quint)` as the easing argument in all current browsers | Code Examples | If wrong, use literal cubic-bezier instead — functionally identical |
| A2 | `{ passive: true }` flag in `addEventListener` is supported by all browsers in scope (Chrome, Firefox, Safari, Edge modern) | Pattern 2 | If unsupported (very old browser), scroll still works — passive is a hint not a requirement |
| A3 | `window.scrollY` (vs `pageYOffset`) is safe in all current browsers | Pattern 2 | `pageYOffset` is an alias — either works |
| A4 | `display: block` is already on `.hero__typewriter` so transform animation works | Pattern 1 | Confirmed in `_hero.css` line 134 — this is [VERIFIED] not assumed |
| A5 | Standard passive scroll listener pattern (initScrollShadow) is the right architecture for NAV-08 | Pattern 2 | No alternative considered — the requirement is simple enough that any JS scroll listener works |

---

## Sources

### Primary (HIGH confidence)
- `src/styles/3-components/_nav.css` — read directly; exact current state documented
- `src/styles/3-components/_hero.css` — read directly; exact current stagger delays confirmed
- `src/styles/1-settings/_variables.css` — read directly; all tokens confirmed present
- `src/theme.js` — read directly; IIFE vs module pattern, existing handlers confirmed
- `src/typewriter.js` — read directly; 800ms initial delay confirmed
- `src/styles/2-base/_reset.css` — read directly; global reduced-motion rule confirmed
- `.planning/phases/03-first-impression/03-UI-SPEC.md` — authoritative design contract
- `.planning/phases/02-foundation-infrastructure/02-01-SUMMARY.md` — Phase 2 deliverables confirmed

### Secondary (MEDIUM confidence)
- `.agents/skills/web-animation-design/SKILL.md` — animation timing and easing guidance
- `.agents/skills/emil-design-eng/SKILL.md` — UI polish principles

### Tertiary (LOW confidence / ASSUMED)
- Passive scroll listener `{ passive: true }` browser support — training knowledge, not
  verified against MDN in this session (A2 above)
- CSS custom property as animation easing value — training knowledge (A1 above)

---

## Metadata

**Confidence breakdown:**
- Gap analysis (what's done vs. needed): HIGH — read directly from source files
- Implementation patterns: HIGH — derived from existing codebase conventions
- Browser compatibility of patterns used: MEDIUM — training knowledge, well-established APIs
- Animation timing values: HIGH — all values from locked UI-SPEC

**Research date:** 2026-05-17
**Valid until:** 2026-06-17 (stable domain — CSS/vanilla JS, no fast-moving ecosystem)
