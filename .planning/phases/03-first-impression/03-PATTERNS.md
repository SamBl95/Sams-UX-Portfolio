# Phase 3: First Impression — Pattern Map

**Mapped:** 2026-05-17
**Files analyzed:** 4 modified files (no new files)
**Analogs found:** 4 / 4 — all files are self-referential (executor modifies the actual file)

---

## File Classification

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------|------|-----------|----------------|---------------|
| `src/styles/3-components/_hero.css` | component | transform (CSS animation stagger) | self — executor edits existing stagger rules | exact |
| `src/styles/3-components/_nav.css` | component | request-response (scroll + hover states) | self — executor edits existing nav rules | exact |
| `src/styles/1-settings/_variables.css` | config | token definition | self — executor adds one token to existing block | exact |
| `src/theme.js` | utility / event-driven | event-driven (scroll listener) | self — executor adds function alongside existing `initHamburger` | exact |

All four files already exist. No new files. Pattern extraction is the **current code the executor will read before editing**.

---

## Pattern Assignments

### `src/styles/3-components/_hero.css` (component, CSS animation)

**Plan:** 01 — Hero
**Requirements:** ANIM-02 (stagger), LAY-01 (max-width)

**Current stagger block** (lines 64–75) — replace entirely for ANIM-02:
```css
/* Stagger children — each element enters 60ms after the previous */
.hero__eyebrow,
.hero__headline,
.hero__subheadline,
.hero__actions {
  animation: hero-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero__eyebrow    { animation-delay:   0ms; }
.hero__headline   { animation-delay:  60ms; }
.hero__subheadline{ animation-delay: 120ms; }
.hero__actions    { animation-delay: 180ms; }
```

**Required replacement** (ANIM-02 — 5 elements, 80ms steps, token easing):
```css
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

**Key constraints:**
- `animation-fill-mode: both` (via `both` shorthand) — elements invisible during delay AND hold final state. Do NOT use `forwards`.
- `.hero__typewriter` has `display: block` at line 133 — animation will work. Preserve this.
- Do NOT animate `.hero__typewriter-text` or `.hero__typewriter-cursor` — they are inline `<span>` children and would double-animate.
- `var(--ease-out-quint)` is valid as a CSS easing value in animation shorthand.

**`.hero__content` rule** (lines 57–62) — add max-width for LAY-01:
```css
.hero__content {
  display:        flex;
  flex-direction: column;
  align-items:    flex-start;
  width:          100%;
}
```

**Required addition** (LAY-01 — append after `.hero__content` block):
```css
@media (min-width: 1440px) {
  .hero__content {
    max-width: var(--hero-content-max-width); /* 860px */
  }
}
```

**Keyframe** (lines 14–23) — keep unchanged:
```css
@keyframes hero-enter {
  from {
    opacity:   0;
    transform: translateY(24px);
  }
  to {
    opacity:   1;
    transform: translateY(0);
  }
}
```

---

### `src/styles/3-components/_nav.css` (component, request-response)

**Plan:** 02 — Nav
**Requirements:** NAV-01 through NAV-09, ANIM-04

**`.nav__logo` rule** (lines 29–38) — replace for NAV-02:
```css
.nav__logo {
  font-size:       var(--text-base);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  -0.01em;
  color:           var(--color-text-primary);
  text-decoration: none;
  transition:      color var(--transition-fast);
  flex-shrink:     0;
  margin-right:    auto; /* pushes all remaining items to the right */
}
```

**Required replacement** (NAV-02):
```css
.nav__logo {
  font-family:         var(--font-heading);
  font-size:           var(--text-xl);
  font-weight:         var(--font-weight-normal);
  font-optical-sizing: auto;
  letter-spacing:      -0.02em;
  color:               var(--color-text-primary);
  text-decoration:     none;
  transition:          color var(--transition-fast);
  flex-shrink:         0;
  margin-right:        auto;
}
```

**`.nav__link` rule** (lines 150–158) — edit transition for NAV-03 and weight for open question:
```css
.nav__link {
  display:         block;
  font-size:       var(--text-sm);
  font-weight:     var(--font-weight-medium);
  color:           var(--color-text-secondary);
  text-decoration: none;
  padding:         var(--space-3) var(--space-5);
  transition:      color var(--transition-fast);
}
```

**Required changes** (NAV-03 — add `background-color` to transition; open question — weight to `normal`):
- `transition: background-color var(--transition-fast), color var(--transition-fast);`
- `font-weight: var(--font-weight-normal);`

**Mobile menu animation** (line 118) — edit duration for ANIM-04:
```css
animation: nav-menu-enter 120ms var(--ease-out) both;
```

**Required replacement** (ANIM-04 — duration only):
```css
animation: nav-menu-enter 200ms var(--ease-out) both;
```

**Desktop 905px block — `.nav__list` gap** (line 215) — edit for NAV-04:
```css
.nav__list {
  flex-direction: row;
  align-items:    center;
  gap:            var(--space-1);
}
```

**Required change** (NAV-04): `gap: var(--space-2);`

**Desktop 905px block — `.nav__link`** (lines 218–221) — add border reserve for NAV-07:
```css
.nav__link {
  padding:       var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
}
```

**Required addition** (NAV-07 — border reserve, prevents height shift):
```css
.nav__link {
  padding:       var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border-bottom: 2px solid transparent; /* reserve space — prevents active link height shift */
}
```

**Desktop 905px block — `.nav__link[aria-current="page"]`** (lines 230–232) — add accent border for NAV-07:
```css
.nav__link[aria-current="page"] {
  background-color: var(--color-surface);
}
```

**Required replacement** (NAV-07):
```css
.nav__link[aria-current="page"] {
  background-color: var(--color-surface);
  border-bottom:    2px solid var(--color-accent);
}
```

**Desktop 905px block — `.nav__link--cta`** (lines 235–239) — add margin for NAV-05:
```css
.nav__link--cta {
  display:       inline-flex;
  margin-inline: 0;
  margin-block:  0;
}
```

**Required addition** (NAV-05): `margin-left: var(--space-3);`

**Desktop 905px block — new rule needed for NAV-06** (add after `.nav__link--cta`):
```css
.nav .btn {
  height: 36px;
}
```

Do NOT add `transition` to this selector — button transition is owned by `_button.css`.

**New CSS rule needed for NAV-08** (add to `.nav` block at top of file, after existing `.nav` rule):
```css
.nav--scrolled {
  box-shadow: 0 1px 0 var(--color-border), 0 4px 16px -4px rgb(0 0 0 / 0.06);
}
```

The `rgb(0 0 0 / 0.06)` alpha value is a documented exception — shadow layers may use raw alpha. Do not add a token for it.

**NAV-01 and NAV-09 — verify, no edit needed:**
- Line 24: `height: var(--nav-height);` — confirmed correct, no change.
- Line 112: `top: var(--nav-height);` — confirmed correct, no change.

---

### `src/styles/1-settings/_variables.css` (config, token definition)

**Plan:** 01 — Hero
**Requirements:** LAY-01 (add `--hero-content-max-width`)

**Component tokens block** (lines 106–107) — add new token after `--nav-height`:
```css
  /* Component tokens — semantic values outside the 8pt scale */
  --nav-height: 56px;   /* nav bar height; also used for mobile menu top offset */
```

**Required addition** (LAY-01):
```css
  /* Component tokens — semantic values outside the 8pt scale */
  --nav-height:             56px;   /* nav bar height; also used for mobile menu top offset */
  --hero-content-max-width: 860px;  /* hero content column constraint at 1440px+ */
```

All other tokens in `_variables.css` are unchanged. Do not touch any other line.

---

### `src/theme.js` (utility, event-driven)

**Plan:** 02 — Nav
**Requirements:** NAV-08 (scroll listener for `.nav--scrolled`)

**Existing full file** (lines 1–35) — executor appends after `initHamburger()`:
```js
/**
 * theme.js — Hamburger nav toggle.
 * Vanilla JS, no dependencies.
 */

function initHamburger() {
  const nav    = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  document.addEventListener('click', e => {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target)) {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      toggle.focus();
    }
  });
}

initHamburger();
```

**Required addition** (NAV-08 — append after `initHamburger()` call):
```js
function initScrollShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // handle initial scroll position (back/forward cache, anchor links)
}

initScrollShadow();
```

**Key constraints:**
- `{ passive: true }` is required — omitting it triggers Chrome DevTools scroll performance warning.
- `onScroll()` called immediately on load handles pages that start mid-scroll.
- `if (!nav) return;` guard makes this safe on any page without a nav element.
- `window.scrollY` (not `pageYOffset` or `scrollTop`) — modern standard.
- Do not modify `initHamburger` at all — it is already correct.

**Open question from RESEARCH.md (aria-hidden on mobile menu):** RESEARCH.md flags that `menu.setAttribute('aria-hidden', ...)` is not yet in `initHamburger`. This is within Plan 02 scope. If the plan includes this fix, the executor adds to the `click` toggle handler inside `initHamburger`:
```js
const menu = document.querySelector('.nav__menu');
// inside click handler, after nav.classList.toggle:
if (menu) menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
```

---

## Shared Patterns

### Token usage
**Source:** `src/styles/1-settings/_variables.css`
**Apply to:** All CSS edits in both plans

All values must use tokens. The relevant tokens for this phase:
- Easing: `var(--ease-out-quint)`, `var(--ease-out)` (lines 139, 136)
- Spacing: `var(--space-1)` through `var(--space-8)` (lines 93–104)
- Color: `var(--color-accent)`, `var(--color-surface)`, `var(--color-border)`, `var(--color-text-primary)`, `var(--color-text-secondary)`, `var(--color-accent-accessible)` (lines 19–27)
- Transitions: `var(--transition-fast)` = `150ms ease`, `var(--transition-base)` = `200ms ease` (lines 132–133)
- Nav height: `var(--nav-height)` = 56px (line 107)
- Fonts: `var(--font-heading)` = Fraunces (line 35)
- Weights: `var(--font-weight-normal)` = 400, `var(--font-weight-semibold)` = 600 (lines 81–83)

**Shadow exception:** `rgb(0 0 0 / 0.06)` in `.nav--scrolled` box-shadow — raw alpha is permitted for shadow layers per UI-SPEC. Do not tokenise.

### CSS ITCSS file order
**Source:** `.claude/CLAUDE.md` and `src/styles/main.css`
- No new CSS files in this phase — all edits are to existing files.
- `_variables.css` is in `1-settings/` — token additions go there only.

### Mobile-first breakpoints
**Source:** `.claude/CLAUDE.md`
All media queries are `min-width`: 600px, 905px, 1240px, 1440px. No `max-width` queries.

---

## No Analog Found

Not applicable — all files exist. No new files are created in this phase.

---

## Metadata

**Analog search scope:** All 4 modified files read in full.
**Files scanned:** 4 (`_hero.css`, `_nav.css`, `_variables.css`, `theme.js`)
**Pattern extraction date:** 2026-05-17
