# Phase 2: Foundation & Infrastructure - Pattern Map

**Mapped:** 2026-05-17
**Files analyzed:** 7 (5 modified, 2 new)
**Analogs found:** 7 / 7

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/styles/1-settings/_variables.css` | config | transform | self (existing tokens block) | exact |
| `src/styles/3-components/_nav.css` | component | request-response | self (existing `var()` token references) | exact |
| `src/styles/3-components/_button.css` | component | request-response | self (existing hover/active blocks) | exact |
| `src/styles/3-components/_card.css` | component | request-response | self (existing box-shadow line) | exact |
| `src/styles/3-components/_reveal.css` | utility/component | event-driven | `src/styles/3-components/_nav.css` (`@keyframes nav-menu-enter`) | role-match |
| `src/scripts/reveal.js` (NEW at `src/reveal.js`) | utility | event-driven | `src/typewriter.js` (matchMedia + IIFE/init pattern) | role-match |
| All 8 HTML pages | config | request-response | `index.html` script loading pattern | exact |

---

## Pattern Assignments

### `src/styles/1-settings/_variables.css` (config, token expansion)

**Analog:** self — existing `/* TRANSITIONS */` block (lines 128–134)

**Existing TRANSITIONS block to extend** (lines 127–134):
```css
/* ---------------------------------------------------------------------------
   TRANSITIONS
   --------------------------------------------------------------------------- */

--transition-fast: 150ms ease;
--transition-base: 200ms ease;

/* Easing curves — use instead of bare `ease` on transform/movement */
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);          /* user-initiated: button press, hover scale */
--ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);    /* on-screen movement: card lift, bar morph */
```

**Pattern to copy — add three easing tokens immediately after line 134:**
```css
--ease-out-quint:    cubic-bezier(0.22, 1, 0.36, 1);     /* strong deceleration — entrances, scroll reveals */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);     /* symmetric acceleration — on-screen morphs */
--ease-emphasized:   cubic-bezier(0.2, 0, 0, 1);          /* MD3 emphasized easing — standard component motion */
```

**Pattern to copy — add nav-height semantic token in SPACING block, after line 104:**
```css
/* Component tokens — semantic values outside the 8pt scale */
--nav-height: 56px;    /* nav bar height; also used for mobile menu top offset */
```

**Rule:** No hex values — token values use `cubic-bezier()` or `px` literals only. No references to other tokens inside token definitions.

---

### `src/styles/3-components/_nav.css` (component, bug fix)

**Analog:** self — two `var(--space-16)` references with incorrect comment

**Current broken pattern** (lines 24 and 112):
```css
/* line 24 */
height: var(--space-16); /* 64px */   /* BUG: --space-16 = 128px, not 64px */

/* line 112 */
top: var(--space-16); /* flush below the 64px header */   /* BUG: same */
```

**Corrected pattern — copy this exactly:**
```css
/* line 24 */
height: var(--nav-height);   /* 56px — matches --nav-height token in _variables.css */

/* line 112 */
top: var(--nav-height);      /* flush below nav header */
```

**Note:** The `/* 64px */` comment was wrong (token resolves to 128px). Remove the incorrect comment in both locations. Replace with the corrected comment shown above.

---

### `src/styles/3-components/_button.css` (component, interaction system fix)

**Analog:** self — existing base, primary, secondary, ghost blocks

**Current broken pattern — base mobile** (line 23):
```css
padding: 0 20px;   /* hardcoded — must use token */
```

**Corrected pattern (BTN-01):**
```css
padding: 0 var(--space-3);   /* was: 0 20px */
```

**Current broken pattern — desktop block** (lines 42–48):
```css
@media (min-width: 905px) {
  .btn {
    min-height: 40px;         /* BTN-02: must be 36px */
    padding:    0 var(--space-3);
    font-size:  15px;         /* BTN-03: must use var(--text-sm) */
  }
}

/* Primary desktop */
@media (min-width: 905px) {
  .btn--primary {
    min-height: 48px;         /* BTN-02: must be 40px */
  }
}
```

**Corrected pattern (BTN-02, BTN-03):**
```css
@media (min-width: 905px) {
  .btn {
    min-height: 36px;
    padding:    0 var(--space-3);
    font-size:  var(--text-sm);
  }
}

@media (min-width: 905px) {
  .btn--primary {
    min-height: 40px;
  }
}
```

**Current broken active + hover pattern — all three variants** (lines 95–109, 122–133, 145–155):
```css
/* primary hover */
@media (hover: hover) and (pointer: fine) {
  .btn--primary:hover {
    /* ... */
    transform: translateY(-1px);   /* REMOVE — conflicts with scale press model */
  }
}
.btn--primary:active {
  /* ... */
  transform: translateY(0);        /* REPLACE with scale(0.97) */
}

/* secondary hover */
@media (hover: hover) and (pointer: fine) {
  .btn--secondary:hover {
    /* ... */
    transform: translateY(-1px);   /* REMOVE */
  }
}
.btn--secondary:active {
  /* ... */
  transform: translateY(0);        /* REPLACE */
}

/* ghost hover */
@media (hover: hover) and (pointer: fine) {
  .btn--ghost:hover {
    /* ... */
    transform: translateY(-1px);   /* REMOVE */
  }
}
.btn--ghost:active {
  /* ... */
  transform: translateY(0);        /* REPLACE */
}
```

**Corrected pattern (BTN-04) — apply to all three variants:**
```css
/* Remove transform: translateY(-1px) from ALL three hover rules. */
/* Replace transform: translateY(0) in ALL three active rules: */

.btn--primary:active,
.btn--secondary:active,
.btn--ghost:active {
  transform: scale(0.97);
}
```

**Rule:** `@media (hover: hover) and (pointer: fine)` guard is already on all hover rules — maintain it on every hover block. Never remove the `pointer: fine` qualifier.

**Rule:** The `@media (prefers-reduced-motion: reduce)` block at lines 66–75 already sets `transform: none !important` on hover/active — do not touch it.

---

### `src/styles/3-components/_card.css` (component, token bug fix)

**Analog:** self — existing hover box-shadow (lines 23–32)

**Current broken pattern** (lines 28–31):
```css
.card:hover {
  /* ... */
  box-shadow:
    0 24px 48px -12px rgb(0 0 0 / 0.5),
    0 0 32px -8px rgb(79 209 165 / 0.14);   /* BUG: stale dark-palette accent */
}
```

**Corrected pattern (TOK-01):**
```css
box-shadow:
  0 24px 48px -12px rgb(0 0 0 / 0.08),
  0 0 32px -8px rgb(26 107 82 / 0.14);
```

**Note:** `rgb(79 209 165)` = `#4fd1a5` (old dark palette mint teal). `rgb(26 107 82)` = `#1a6b52` (current `--color-accent`). The black shadow opacity also drops from `0.5` → `0.08` — the dark palette value was far too heavy on the current light off-white background.

**Note on `@media (hover: hover)`:** The current guard on line 23 is `@media (hover: hover)` — missing `and (pointer: fine)`. This is a pre-existing issue noted in REQUIREMENTS.md as COMP-05. Do not fix it in Phase 2 (COMP-05 is a Phase 4 requirement) — leave the guard as-is in this edit.

---

### `src/styles/3-components/_reveal.css` (NEW — utility, event-driven)

**Analog for `@keyframes` pattern:** `src/styles/3-components/_nav.css` lines 97–106

```css
/* _nav.css — existing @keyframes to copy structure from */
@keyframes nav-menu-enter {
  from {
    opacity:   0;
    transform: translateY(-8px);
  }
  to {
    opacity:   1;
    transform: translateY(0);
  }
}

/* _nav.css — existing animation invocation pattern */
animation: nav-menu-enter 120ms var(--ease-out) both;
```

**Analog for prefers-reduced-motion block:** `src/styles/2-base/_reset.css` lines 101–110

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Critical constraint:** `_reset.css` zeros animation duration globally via `!important`. This means `.js-reveal--visible` animation fires in 0.01ms — but the initial `opacity: 0` on `.js-reveal` is NOT cancelled by the reset. The `_reveal.css` reduced-motion block MUST explicitly set `opacity: 1` and `animation: none` to prevent invisible content.

**Full pattern for new file:**
```css
/* =============================================================================
   REVEAL — Scroll-reveal utility
   Apply .js-reveal to any element. JS adds .js-reveal--visible on viewport entry.
   Use data-reveal-delay="100" / "200" / "300" for stagger (100ms steps).
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
  opacity: 0;   /* hidden before JS fires */
}

.js-reveal--visible {
  animation: reveal-enter 500ms var(--ease-out-quint) both;
}

/* Stagger via data attribute */
.js-reveal[data-reveal-delay="100"] { animation-delay: 100ms; }
.js-reveal[data-reveal-delay="200"] { animation-delay: 200ms; }
.js-reveal[data-reveal-delay="300"] { animation-delay: 300ms; }

/* prefers-reduced-motion: show content immediately, no animation.
   Required because _reset.css only zeros duration — it does NOT cancel
   the opacity: 0 initial state. Without this block, content stays invisible. */
@media (prefers-reduced-motion: reduce) {
  .js-reveal,
  .js-reveal--visible {
    opacity:   1;
    animation: none;
  }
}
```

**Import placement in `main.css`:** Add inside `/* 3. COMPONENTS */` block, after `_cta.css` and before the closing of the components section. Match the existing `@import './3-components/_xxx.css';` pattern exactly.

---

### `src/reveal.js` (NEW — utility, event-driven)

**Analog:** `src/typewriter.js` — same file structure conventions:
- Named function called immediately at bottom of file (or IIFE)
- `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check at top
- `document.querySelector` / `document.querySelectorAll` for DOM access
- No `type="module"` export syntax needed — loaded as `type="module"` from HTML

**JS conventions to copy from `src/typewriter.js`:**

File header comment (lines 1–9):
```js
/**
 * typewriter.js — Hero typewriter animation.
 * Vanilla JS, no dependencies. Respects prefers-reduced-motion.
 * ...
 */
```

matchMedia pattern (line 26):
```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Early-exit guard pattern (lines 28–30):
```js
if (prefersReducedMotion) {
  // ...handle reduced motion case...
  return; // implicit in IIFE structure
}
```

**Full pattern for new file:**
```js
/**
 * reveal.js — Scroll-reveal utility.
 * Observes .js-reveal elements; adds .js-reveal--visible on viewport entry.
 * One observer per page. Unobserves after first trigger.
 * Vanilla JS, no dependencies. Respects prefers-reduced-motion.
 */

(function initReveal() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

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

**File location:** `src/reveal.js` (sibling to `src/theme.js` and `src/typewriter.js`)

---

### All 8 HTML pages — script loading (config)

**Analog:** `index.html` lines 135–137

```html
<script type="module" src="/src/theme.js"></script>
<script type="module" src="/src/typewriter.js"></script>
```

**Pattern to copy — add after theme.js on all 8 pages:**
```html
<script type="module" src="/src/reveal.js"></script>
```

**The 8 pages are:**
1. `index.html` (root)
2. `src/pages/about.html`
3. `src/pages/contact.html`
4. `src/pages/stories/index.html`
5. `src/pages/stories/design-systems-and-portfolio-sites.html`
6. `src/pages/case-studies/i-exchange.html`
7. `src/pages/case-studies/cassi.html`
8. `src/pages/case-studies/community.html`

**Rule:** `typewriter.js` appears only on `index.html`. `theme.js` and `reveal.js` appear on all 8 pages. Insert `reveal.js` script tag immediately after the `theme.js` script tag — maintain consistent ordering.

---

## Shared Patterns

### Token naming convention
**Source:** `src/styles/1-settings/_variables.css` lines 1–5 header comment
```css
/* All primitive values live here. No hex values, font names, or numbers
   should appear anywhere else in the codebase except this file. */
```
**Apply to:** Every value change in Phase 2. No raw px or rgb() values introduced into component files — `_card.css` box-shadow fix uses `rgb()` literals because CSS custom properties cannot represent color channels in a way compatible with the existing `/ 0.14` alpha syntax.

### Hover guard
**Source:** `src/styles/3-components/_button.css` lines 95–96
```css
@media (hover: hover) and (pointer: fine) {
```
**Apply to:** All hover rules in `_button.css` edits. The `pointer: fine` qualifier is already present on all button hover rules — maintain it. Do not use bare `@media (hover: hover)` for any new hover rules in Phase 2.

### prefers-reduced-motion
**Source:** `src/styles/2-base/_reset.css` lines 101–110 (global zero via `!important`) + `src/styles/3-components/_button.css` lines 66–75 (component-level override)

The reset zeros duration but does NOT prevent `opacity: 0` initial states from persisting. Component-level `@media (prefers-reduced-motion: reduce)` blocks must explicitly reset opacity to visible and set `animation: none` when the component starts hidden.

**Apply to:** `_reveal.css` — mandatory. `_button.css` reduced-motion block already correct — do not modify.

### Script loading order
**Source:** `index.html` lines 135–137
```html
<script type="module" src="/src/theme.js"></script>
<script type="module" src="/src/typewriter.js"></script>
```
All scripts use `type="module"` and root-relative `/src/...` paths. No relative `../` paths. Load order: `theme.js` first, `reveal.js` second (where applicable), `typewriter.js` only on index.html.

---

## No Analog Found

All Phase 2 files have close codebase analogs. No file requires falling back to RESEARCH.md patterns exclusively.

---

## Metadata

**Analog search scope:** `src/styles/`, `src/*.js`, `index.html`, `src/pages/`
**Files read:** `_variables.css`, `_button.css`, `_nav.css`, `_card.css`, `_reset.css`, `main.css`, `theme.js`, `typewriter.js`, `index.html`, `src/pages/about.html`
**Pattern extraction date:** 2026-05-17
