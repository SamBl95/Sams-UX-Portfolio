# Phase 2: Foundation & Infrastructure - Research

**Researched:** 2026-05-17
**Domain:** Vanilla CSS custom properties, IntersectionObserver, CSS ::after state layers, button interaction design
**Confidence:** HIGH — all findings verified directly from codebase source files; no external packages required

---

## Summary

Phase 2 is a pure CSS and vanilla JS infrastructure phase. Every requirement is a direct edit to one or two existing files — no new dependencies, no new pages, no build tooling changes. The work falls into four buckets: (1) token expansion in `_variables.css`, (2) a new scroll-reveal utility (a small JS module + CSS keyframe), (3) button system corrections (hardcoded values replaced with tokens, active-state interaction model changed from `translateY` to `scale`), and (4) two token-bug fixes (`_nav.css` height and `_card.css` stale box-shadow value).

The codebase is already well-structured for this work. ITCSS is correctly layered, the spacing/type token system is complete, and `_reset.css` already includes a global `prefers-reduced-motion` block that zero-costs all Phase 2 animations. The one architectural wrinkle is the button `:active` model — existing code uses `translateY(0)` on press, but the requirement is `scale(0.97)`. Changing this also requires removing the hover `translateY(-1px)` uplift from all three variants, since `scale` press and `translateY` lift are conflicting models.

The typewriter height reservation (ANIM-01) is already implemented in `typewriter.js` via `reserveHeight()` and `document.fonts.ready`. The requirement is already met. The plan should verify and mark it done rather than build anything new.

**Primary recommendation:** Four targeted file edits — `_variables.css`, a new `_reveal.css` + `reveal.js`, `_button.css`, `_nav.css` (token reference only), `_card.css` (box-shadow fix). Sequence: tokens first, then JS utility, then button system, then bug fixes.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Easing tokens (FOUND-01) | CSS Settings layer | — | Custom properties in `1-settings/_variables.css` — pure token definition, no output |
| Nav height token (FOUND-04) | CSS Settings layer | CSS Component layer | Token defined in `_variables.css`; consumed in `_nav.css` to fix `var(--space-16)` bug |
| Scroll-reveal utility (FOUND-02) | CSS Component/Base layer + JS | — | Keyframe in CSS; IntersectionObserver observer in a new JS module loaded per-page |
| State-layer hover pattern (FOUND-03) | CSS Component layer | — | `::after` pseudo-element pattern; defined once, consumed per-component in Phase 4 |
| Button system fixes (BTN-01–04) | CSS Component layer | — | Edits to `3-components/_button.css` only |
| Typewriter height reservation (ANIM-01) | JS (existing `typewriter.js`) | CSS fallback | Already implemented — verify, do not rebuild |
| Card box-shadow token fix (TOK-01) | CSS Component layer | — | Single line edit in `3-components/_card.css` |

---

## Standard Stack

### Core (all already in project — no installs)

| Library/API | Version | Purpose | Why Standard |
|-------------|---------|---------|--------------|
| CSS Custom Properties | Native | Token system | Zero cost, already the project foundation |
| IntersectionObserver | Native browser API | Scroll-reveal triggering | No library needed; 97%+ browser support [ASSUMED — MDN data] |
| CSS `::after` pseudo-element | Native | State layer overlay | MD3 pattern; GPU-composited, no repaint |
| CSS `@keyframes` | Native | Reveal entrance animation | Off-main-thread; respects `prefers-reduced-motion` reset already in `_reset.css` |

### No External Packages

This phase installs zero packages. All capabilities are native CSS and browser JS.

---

## Package Legitimacy Audit

No external packages are installed in this phase. This section is intentionally empty.

**Packages removed due to slopcheck verdict:** none
**Packages flagged as suspicious:** none

---

## Architecture Patterns

### Recommended File Changes

```
src/styles/1-settings/
  _variables.css           — ADD: 3 easing tokens + --nav-height token

src/styles/3-components/
  _button.css              — EDIT: token fixes (BTN-01, BTN-02, BTN-03) + active model (BTN-04)
  _nav.css                 — EDIT: replace var(--space-16) with var(--nav-height) (FOUND-04 consumer)
  _card.css                — EDIT: fix stale rgb() value in box-shadow (TOK-01)
  _reveal.css (NEW)        — ADD: .js-reveal keyframe + revealed state + prefers-reduced-motion block
  (import added to main.css)

src/
  reveal.js (NEW)          — ADD: IntersectionObserver module, loaded per-page via <script>
```

No changes needed to `vite.config.js`, `main.css` structure (except one import line), or any HTML files (ANIM-01 already done).

---

### Pattern 1: Easing Token Expansion (FOUND-01)

**What:** Three new named easing curves added to the `/* TRANSITIONS */` block in `_variables.css`.
**When to use:** `--ease-out-quint` for user-initiated entrances (scroll reveals, hero stagger); `--ease-in-out-quart` for on-screen movement; `--ease-emphasized` for Material Design 3 standard motions.

```css
/* Source: Material Design 3 motion spec + easing.dev verified curves [ASSUMED — training knowledge, curves documented below] */

/* _variables.css — add to TRANSITIONS block */
--ease-out-quint:    cubic-bezier(0.22, 1, 0.36, 1);     /* strong deceleration — entrances, reveals */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);     /* symmetric acceleration — on-screen morphs */
--ease-emphasized:   cubic-bezier(0.2, 0, 0, 1);          /* MD3 emphasized easing — standard component motion */
```

Note on `--ease-out-quint`: The existing `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` is nearly identical to a quint out. The new token uses `(0.22, 1, 0.36, 1)` which is the Emil Kowalski / Framer Motion default. [ASSUMED — easing values from training knowledge; verify against easing.dev before shipping]

---

### Pattern 2: Scroll-Reveal Utility (FOUND-02)

**What:** An IntersectionObserver that adds a `.js-reveal--visible` class when `.js-reveal` elements enter the viewport. A CSS `@keyframes` drives the entrance. The observer fires once per element.

**File: `src/reveal.js`**

```js
// Source: native IntersectionObserver API — no library [ASSUMED — pattern from training knowledge]

/**
 * reveal.js — Scroll-reveal utility.
 * Observes every [data-reveal] or .js-reveal element on the page.
 * Adds .js-reveal--visible when the element enters the viewport.
 * One observer per page. Unobserves after first trigger (once: true pattern).
 * Respects prefers-reduced-motion via CSS.
 */
(function initReveal() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Under reduced motion, mark all elements visible immediately — no animation fires
  // (CSS block in _reveal.css zeros the keyframe, so this is belt-and-suspenders)
  if (prefersReducedMotion) {
    document.querySelectorAll('.js-reveal').forEach(el => {
      el.classList.add('js-reveal--visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('js-reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  document.querySelectorAll('.js-reveal').forEach(el => observer.observe(el));
})();
```

**File: `src/styles/3-components/_reveal.css`**

```css
/* =============================================================================
   REVEAL — Scroll-reveal utility
   Apply .js-reveal to any element. JS adds .js-reveal--visible on viewport entry.
   Use data-reveal-delay="100" / "200" HTML attribute for stagger (set via CSS var).
   ============================================================================= */

@keyframes reveal-enter {
  from {
    opacity:   0;
    transform: translateY(20px);
  }
  to {
    opacity:   1;
    transform: translateY(0);
  }
}

.js-reveal {
  opacity: 0; /* hidden before JS fires */
}

.js-reveal--visible {
  animation: reveal-enter 500ms var(--ease-out-quint) both;
}

/* Stagger via inline data attribute mapped to CSS var */
.js-reveal[data-reveal-delay="100"]  { animation-delay: 100ms; }
.js-reveal[data-reveal-delay="200"]  { animation-delay: 200ms; }
.js-reveal[data-reveal-delay="300"]  { animation-delay: 300ms; }

/* prefers-reduced-motion: show content immediately, no animation */
@media (prefers-reduced-motion: reduce) {
  .js-reveal,
  .js-reveal--visible {
    opacity:   1;
    animation: none;
  }
}
```

**Important:** The global `prefers-reduced-motion` block in `_reset.css` sets `animation-duration: 0.01ms !important`. This means the `@keyframes` still fires but completes in 0.01ms — effectively instant. The explicit `animation: none` rule in `_reveal.css` is belt-and-suspenders for the `opacity: 0` initial state, which would be visible for 0.01ms without it.

**Loading:** Add `<script type="module" src="/src/reveal.js"></script>` to pages that need scroll-reveal. Do NOT add to `theme.js` (which runs on all pages) — scroll-reveal is opt-in.

---

### Pattern 3: State-Layer Hover (FOUND-03)

**What:** An `::after` pseudo-element with `pointer-events: none` and opacity 0, transitioning to 8% on hover, 12% on press. Defined as a reusable pattern — components opt in by adding the selector.

**Note:** Phase 2 defines the pattern. Phase 4 applies it to cards (COMP-02). This phase ships the CSS definition as a demonstrable pattern on a test element.

```css
/* Source: Material Design 3 state layer spec [ASSUMED — MD3 training knowledge] */

/* Pattern to add per component that needs state layer */
.card {                          /* example component */
  position: relative;            /* required — ::after is absolute */
}

.card::after {
  content:          '';
  position:         absolute;
  inset:            0;
  border-radius:    inherit;     /* matches parent's border-radius */
  background-color: var(--color-text-primary);
  opacity:          0;
  transition:       opacity 150ms var(--ease-out);
  pointer-events:   none;        /* never intercepts clicks */
}

@media (hover: hover) and (pointer: fine) {
  .card:hover::after {
    opacity: 0.08;
  }
}

.card:active::after {
  opacity: 0.12;
}
```

**Why `::after` not `background-color`:** Background-color swaps change the perceived color of all children. A semi-transparent overlay over the surface preserves the card's existing background-image, gradient, or tinted surface, applying the hover signal uniformly on top. [CITED: MD3 — m3.material.io/foundations/interaction/states]

**Constraint:** `overflow: hidden` on the card is not required but keeps the overlay within the border-radius. Currently `_card.css` has `overflow: hidden`. The `border-radius: inherit` rule is sufficient if `overflow` is absent.

---

### Pattern 4: Button System Corrections (BTN-01 to BTN-04)

**Confirmed current state (from file read):**
- Mobile padding: `0 20px` hardcoded → must become `0 var(--space-3)` (BTN-01)
- Desktop `min-height`: standard `40px`, primary `48px` → must become `36px` / `40px` (BTN-02)
- Desktop `font-size`: `15px` hardcoded → must become `var(--text-sm)` = 14px — NOTE: 15px ≠ 14px. `--text-sm` is `0.875rem` = 14px. The ROADMAP says "use a token" and BTN-03 says no hardcoded `15px`. Using `var(--text-sm)` drops 1px. This is intentional per the requirements. [VERIFIED: file read]
- `:active` model: all three variants use `translateY(0)` → must become `scale(0.97)`. The hover `translateY(-1px)` must also be removed from all three variants (scale and translateY are conflicting press models — if hover lifts and active resets translateY to 0, the scale press won't feel right).

```css
/* _button.css — corrected base (mobile) */
.btn {
  /* ... existing ... */
  padding: 0 var(--space-3);     /* was: 0 20px */
}

/* Desktop overrides */
@media (min-width: 905px) {
  .btn {
    min-height: 36px;            /* was: 40px */
    padding:    0 var(--space-3);
    font-size:  var(--text-sm);  /* was: 15px */
  }

  .btn--primary {
    min-height: 40px;            /* was: 48px */
  }
}

/* Active state — all three variants */
.btn--primary:active,
.btn--secondary:active,
.btn--ghost:active {
  transform: scale(0.97);        /* was: translateY(0) */
  /* remove hover translateY(-1px) from all hover rules */
}
```

**Hover model after change:** Remove `transform: translateY(-1px)` from all hover rules. Hover state changes only `background-color`, `border-color`, `box-shadow` — no transform. Press state is `scale(0.97)`. This matches the Emil Kowalski skill: buttons feel press-responsive via scale, not via the lift-then-reset pattern.

---

### Pattern 5: Nav Height Token Fix (FOUND-04 + nav bug)

**Confirmed current state (from file read):**
- `_nav.css` `.nav__inner` height: `var(--space-16)` with comment saying `/* 64px */` — but `--space-16` is `128px`. The comment is wrong AND the value is wrong.
- Mobile menu `top`: also `var(--space-16)` (same bug).
- Target height: `56px` (from requirements: `--nav-height: 56px`)

```css
/* _variables.css — add to SPACING block or COMPONENT TOKENS sub-block */
--nav-height: 56px;

/* _nav.css — two references to fix */
.nav__inner {
  height: var(--nav-height);   /* was: var(--space-16) */
}

.nav--open .nav__menu {
  top: var(--nav-height);      /* was: var(--space-16) */
}
```

**Note on comment:** The existing comment `/* 64px */` is incorrect — `--space-16` resolves to 128px, not 64px. The comment was likely written when a different token was intended. Both the token reference and the comment must be corrected.

---

### Pattern 6: Card Box-Shadow Token Fix (TOK-01)

**Confirmed current state (from file read):**
```css
/* Current (stale dark palette value) */
box-shadow:
  0 24px 48px -12px rgb(0 0 0 / 0.5),
  0 0 32px -8px rgb(79 209 165 / 0.14);
```

The `rgb(79 209 165 / 0.14)` value is the old dark palette accent color (`#4fd1a5` = mint teal from the dark theme). The current accent is `#1a6b52` (deep teal). The box-shadow glow should reference the current accent.

```css
/* Corrected — use CSS color-mix or direct rgb value from current accent */
box-shadow:
  0 24px 48px -12px rgb(0 0 0 / 0.08),
  0 0 32px -8px rgb(26 107 82 / 0.14);
```

Note: The black shadow opacity `0.5` is also very heavy for a light-background palette. The ROADMAP says "update to current accent" — the dark shadow value itself is not in scope for TOK-01 but worth flagging for the planner. Keeping `0.5` on a light background creates a very dark box-shadow. Recommend reducing to `0.08` in the same edit.

---

### Pattern 7: Typewriter Height Reservation (ANIM-01) — Already Done

**Confirmed:** `typewriter.js` already implements `reserveHeight()` which:
1. Waits for `document.fonts.ready`
2. Temporarily sets the longest phrase as text content
3. Measures `container.getBoundingClientRect().height`
4. Sets `container.style.minHeight` to that value
5. Re-runs on resize (debounced 150ms)

`_hero.css` already has `min-height: 2.2em` as a CSS fallback before JS runs.

**ANIM-01 is already implemented.** The plan should include a single verification task (check in DevTools that no layout shift occurs at 375px and 1240px) and mark the requirement done. No code changes needed.

---

### Anti-Patterns to Avoid

- **`translateY(-1px)` on hover + `translateY(0)` on active:** This is not a press interaction — it's a lift-and-drop. The scale model (`scale(0.97)` on active) is correct per Emil Kowalski's skill. Do not keep both.
- **Adding scroll-reveal JS to `theme.js`:** `theme.js` loads on every page. Scroll-reveal should be a separate opt-in script. Adding it globally would cause IntersectionObserver setup overhead on pages with no `.js-reveal` elements.
- **Using `opacity: 0` on `.js-reveal` without a `prefers-reduced-motion` override:** If `_reset.css` zeros the animation duration, the element would stay invisible (opacity 0) because the keyframe `to { opacity: 1 }` completes in 0.01ms — but the initial `opacity: 0` on `.js-reveal` is still applied. The explicit `@media (prefers-reduced-motion)` block in `_reveal.css` must set `opacity: 1` to prevent invisible content.
- **Naming the token `--nav-height` then also using `--space-7` (56px):** There is no `--space-7` in the existing scale (the scale jumps from `--space-6: 48px` to `--space-8: 64px`). 56px is not representable by the existing spacing scale. A semantic token is the correct approach. Do not add `--space-7`.
- **Placing `_reveal.css` outside `3-components/`:** The ITCSS architecture places utility-adjacent patterns in components. A 5-utilities layer could also work but does not exist. Following the existing pattern, place in `3-components/`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered reveal | Custom scroll event listener with `getBoundingClientRect` | `IntersectionObserver` | Scroll listeners fire on every scroll event; IntersectionObserver is async and throttled by the browser |
| Easing curves | Manually computing bezier points | Named tokens from MD3/easing.dev | Curves documented and validated; manually computed curves are prone to subtle feel issues |
| Font-load detection | Polling `document.readyState` | `document.fonts.ready` (Promise) | Already used in `typewriter.js`; correct API for font availability |
| reduced-motion detection in JS | CSS class toggling | `window.matchMedia('(prefers-reduced-motion: reduce)')` | One-liner; consistent with `typewriter.js` pattern |

**Key insight:** This entire phase has no hand-roll risk — it's CSS tokens and a 15-line IntersectionObserver. The only non-obvious implementation detail is the `opacity: 0` / reduced-motion interaction described above.

---

## Common Pitfalls

### Pitfall 1: `opacity: 0` Content Invisible Under Reduced Motion

**What goes wrong:** `.js-reveal` sets `opacity: 0` as default. The `_reset.css` global block sets `animation-duration: 0.01ms !important`. The reveal animation fires in 0.01ms, but the _initial_ `opacity: 0` on the element is still applied before the animation completes. On a slow CPU or if JS is late, elements appear invisible until the next frame.

**Why it happens:** The reset zeroes animation duration, not the pre-animation state.

**How to avoid:** Always include in `_reveal.css`:
```css
@media (prefers-reduced-motion: reduce) {
  .js-reveal,
  .js-reveal--visible {
    opacity: 1;
    animation: none;
  }
}
```

**Warning signs:** Testing with DevTools "Emulate CSS media feature prefers-reduced-motion: reduce" shows blank content areas.

---

### Pitfall 2: Button `scale` and `translateY` Conflict

**What goes wrong:** Keeping `hover: translateY(-1px)` while changing `active: translateY(0)` to `active: scale(0.97)` means the active state reverts the Y transform to 0 while also applying scale — the button jumps down 1px and shrinks at the same time.

**Why it happens:** Multiple transforms compound. `translateY(-1px)` from hover persists into the active state unless explicitly overridden.

**How to avoid:** Remove `transform: translateY(-1px)` from ALL three hover rules when switching to the scale press model. The hover state should express itself through `background-color`, `box-shadow` only.

**Warning signs:** Button appears to "drop" slightly on press rather than uniformly shrink.

---

### Pitfall 3: `--space-16` Comment Error Propagation

**What goes wrong:** The `_nav.css` comment says `/* 64px */` next to `var(--space-16)`. But `--space-16` is `128px`. The token name (`--space-N` where N = px ÷ 8, so 16×8 = 128px) makes this clear. The comment was wrong at authoring time. If the planner reads only the comment, they might target 64px, not 128px, and miss that the current render is 128px.

**Why it happens:** Comment written for a different token than what was actually used.

**How to avoid:** Always read the token value from `_variables.css`, not from inline comments in component files.

**Warning signs:** After fixing to `var(--nav-height)`, nav renders at 56px but was previously rendering at 128px — confirming the prior bug was 128px, not 64px.

---

### Pitfall 4: Stale Box-Shadow Color on Light Palette

**What goes wrong:** `rgb(79 209 165 / 0.14)` (`#4fd1a5`) was the accent color in the dark palette. The current accent is `#1a6b52` (`rgb(26 107 82)`). On the current warm off-white background (`#f5f2ed`), the mint-teal glow looks visually incorrect — too bright and cool against the warm neutral.

**Why it happens:** Palette was changed from dark to light; `_card.css` was not updated.

**How to avoid:** Verify all `rgb()` color values in component files match the current `_variables.css` palette. TOK-01 catches this specific instance; TOK-02 (Phase 7) catches the rest.

**Warning signs:** Card hover glow is noticeably cooler/brighter than the surrounding warm palette.

---

## Code Examples

### Verified patterns from codebase

### IntersectionObserver once-pattern (matching `typewriter.js` style)
```js
// Source: existing typewriter.js — same document.fonts.ready + matchMedia pattern
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

### Token reference — current spacing scale (confirmed from _variables.css)
```css
/* --space-3: 24px — correct token for button horizontal padding */
padding: 0 var(--space-3);

/* --nav-height: 56px — NEW token, does not yet exist — must be added */
height: var(--nav-height);
```

### Stagger via data attribute (reusable pattern)
```html
<!-- In HTML, applied in Phase 4 to cards per ANIM-03 -->
<article class="card js-reveal" data-reveal-delay="100">...</article>
<article class="card js-reveal" data-reveal-delay="200">...</article>
```

### State-layer — ::after approach
```css
/* Confirmed: _card.css already has position: relative (overflow: hidden) — ::after can be added directly */
.card::after {
  content:       '';
  position:      absolute;
  inset:         0;
  border-radius: inherit;
  background:    var(--color-text-primary);
  opacity:       0;
  transition:    opacity 150ms var(--ease-out);
  pointer-events: none;
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Scroll listener + `getBoundingClientRect` | `IntersectionObserver` | ~2017, widespread 2020 | No scroll event overhead |
| `background-color` hover on interactive surfaces | MD3 state-layer `::after` opacity | MD3 2021 | Preserves surface color, composited |
| `translateY(-1px)` hover lift | `box-shadow` depth + `scale(0.97)` press | Design system convergence ~2022 | Scale press is more universally understood as press feedback |
| JS font detection hacks | `document.fonts.ready` | CSS Fonts Level 3 | Promise-based, clean, already used in project |
| Hardcoded animation easings | Named tokens per use-case (`--ease-out-quint`, etc.) | MD3 motion spec 2021+ | Consistent feel system-wide |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)` — specific curve value | Pattern 1 (Easing Tokens) | Slightly different feel vs intent; verify against easing.dev |
| A2 | `--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1)` — specific curve value | Pattern 1 (Easing Tokens) | Same as A1 |
| A3 | `--ease-emphasized: cubic-bezier(0.2, 0, 0, 1)` is the MD3 emphasized easing | Pattern 1 + REQUIREMENTS.md | Requirements explicitly state this value — LOW risk |
| A4 | `IntersectionObserver` `rootMargin: '0px 0px -60px 0px'` is the right trigger offset | Pattern 2 (Scroll-Reveal) | Too early/late trigger; adjust during verification |
| A5 | Removing hover `translateY(-1px)` entirely is the correct fix for BTN-04 | Pattern 4 (Button) | If hover lift is desired by user, requires discussion; requirements say scale press only |
| A6 | Reducing black shadow opacity from `0.5` to `0.08` in TOK-01 fix is appropriate | Pattern 6 (Card fix) | `0.5` opacity may be intentional despite looking heavy; planner should note as optional |

**A3 is explicitly documented in REQUIREMENTS.md — treat as verified.**
**A4 and A6 are tunable at execution time — not blocking.**

---

## Open Questions

1. **Button desktop font-size: `var(--text-sm)` = 14px vs current hardcoded 15px**
   - What we know: BTN-03 requires token replacement; `--text-sm` is 14px, 1px smaller than current
   - What's unclear: Is the 1px intentional or just a legacy oversight?
   - Recommendation: Proceed with `var(--text-sm)` per the requirement. If user notices the 1px change, it can be raised as a discussion item post-execution.

2. **Where to place the state-layer definition in ITCSS**
   - What we know: No utilities layer exists; components layer is the current home for patterns
   - What's unclear: Should state-layer be a reusable mixin-like comment block in `_variables.css`, or a dedicated utility class?
   - Recommendation: Document as a CSS comment pattern in `_reveal.css` or a standalone `_state-layer.css` file. Phase 4 applies it to cards. Planner should decide on file placement.

3. **`reveal.js` loading strategy — per-page `<script>` tags or central inclusion**
   - What we know: `theme.js` is already included on all 8 pages via HTML; `typewriter.js` is included only on `index.html`
   - What's unclear: Should `reveal.js` be added to all 8 pages now, or only pages that will have `.js-reveal` elements?
   - Recommendation: Add to all pages now. The observer silently finds zero elements and exits. Low overhead.

---

## Environment Availability

Step 2.6: SKIPPED — this phase is purely CSS and vanilla JS edits. No external tools, CLIs, runtimes, or services required beyond a browser and the existing Vite dev server.

---

## Validation Architecture

`nyquist_validation` is set to `false` in `.planning/config.json`. This section is skipped.

---

## Security Domain

`security_enforcement: true` in config. ASVS Level 1 applies.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | — |
| V3 Session Management | No | — |
| V4 Access Control | No | — |
| V5 Input Validation | No | No user input in this phase |
| V6 Cryptography | No | — |

### Phase-Specific Security Notes

- The `IntersectionObserver` callback only adds a CSS class to observed DOM elements. No user input is processed, no data is transmitted, no authentication is touched. Security surface is zero.
- `reveal.js` should use a self-invoking function (IIFE) or ES module to avoid polluting global scope. The pattern shown uses an IIFE — correct.
- No `innerHTML`, `eval`, or `document.write` anywhere in the proposed code. XSS surface: none.

**Security verdict:** This phase has no meaningful security surface. ASVS Level 1 is trivially satisfied.

---

## Project Constraints (from CLAUDE.md)

These directives are locked and must be honored in the plan:

| Directive | Impact on Phase 2 |
|-----------|-------------------|
| Vanilla HTML + CSS only — no JS/CSS frameworks | confirm: all Phase 2 code is vanilla CSS + browser-native JS |
| No hex values outside `_variables.css` | TOK-01 fix must use `rgb(26 107 82 / 0.14)` not a new hex; or reference via `color-mix` |
| No inline styles | `reveal.js` sets `minHeight` via `element.style.minHeight` in `typewriter.js` — this is an existing, in-scope exception for JS-measured layout; do not change |
| No arbitrary spacing — must use 8pt scale tokens | `56px` is not in the spacing scale → `--nav-height` semantic token is the correct approach |
| ITCSS import order must match `main.css` exactly | New `_reveal.css` import goes inside `/* 3. COMPONENTS */` block in `main.css` |
| Every `@media (hover: hover)` should use `and (pointer: fine)` | Button hover rules already use `and (pointer: fine)` — maintain this in edits |
| No inline styles | `revealHeight()` in typewriter.js uses inline style — existing code, do not change |
| Mobile-first: breakpoints at 600 / 905 / 1240 / 1440px | Button desktop breakpoint is `905px` — correct, do not change |

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Add `--ease-out-quint`, `--ease-in-out-quart`, `--ease-emphasized` to `_variables.css` | Easing curves documented in Pattern 1; `--ease-emphasized` value confirmed in REQUIREMENTS.md |
| FOUND-02 | Scroll-reveal: IntersectionObserver + `.js-reveal` CSS class + `@keyframes` — one observer per page | Full implementation in Pattern 2; JS module + CSS file approach |
| FOUND-03 | State-layer hover: `::after` overlay, 8% hover / 12% press, per MD3 | Pattern 3 documents full CSS approach; Phase 4 applies to cards |
| FOUND-04 | `--nav-height: 56px` semantic token; used in `_nav.css` to fix `var(--space-16)` bug | Pattern 5 documents both token addition and two consumer fix locations |
| ANIM-01 | Typewriter container reserves exact rendered height — no layout shift | ALREADY IMPLEMENTED in `typewriter.js` — verify only, no new code |
| BTN-01 | Mobile button padding: `var(--space-3)` — no hardcoded `20px` | Pattern 4 — confirmed current bug from file read |
| BTN-02 | Desktop button heights: standard 36px, primary 40px | Pattern 4 — confirmed current values (40px/48px) from file read |
| BTN-03 | Desktop button font-size uses token — no hardcoded `15px` | Pattern 4 — `var(--text-sm)` = 14px |
| BTN-04 | All variants: `transform: scale(0.97)` on `:active` | Pattern 4 — requires removing `translateY(-1px)` hover from all variants |
| TOK-01 | Fix stale `rgb(79 209 165 / 0.14)` in `_card.css` box-shadow | Pattern 6 — confirmed from file read; corrected value: `rgb(26 107 82 / 0.14)` |
</phase_requirements>

---

## Sources

### Primary (HIGH confidence)

- Direct codebase file reads — `_variables.css`, `_button.css`, `_nav.css`, `_card.css`, `_hero.css`, `_reset.css`, `_root.css`, `main.css`, `theme.js`, `typewriter.js`, `vite.config.js` — all values verified from source
- `.agents/skills/emil-design-eng/SKILL.md` — button press model (`scale(0.97)`), hover without `translateY`, easing philosophy
- `.planning/REQUIREMENTS.md` — `--ease-emphasized: cubic-bezier(0.2, 0, 0, 1)` explicitly stated

### Secondary (MEDIUM confidence)

- Material Design 3 motion spec (m3.material.io) — state layer pattern, `--ease-emphasized` value [ASSUMED training knowledge, consistent with REQUIREMENTS.md explicit value]

### Tertiary (LOW confidence)

- Easing curve specific values for `--ease-out-quint` and `--ease-in-out-quart` [ASSUMED — verify against easing.dev at execution time]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no external packages; all native APIs verified in codebase
- Architecture: HIGH — all current file state verified from direct reads; every change location is specific
- Pitfalls: HIGH — derived from direct codebase analysis, not speculation
- Easing values: MEDIUM — training knowledge; functional but should be verified against easing.dev

**Research date:** 2026-05-17
**Valid until:** Stable indefinitely — vanilla CSS/JS patterns do not change rapidly. Easing values should be confirmed before shipping FOUND-01.
