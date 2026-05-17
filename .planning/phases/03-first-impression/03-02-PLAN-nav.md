---
phase: 03-first-impression
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/3-components/_nav.css
  - src/theme.js
autonomous: true
requirements:
  - NAV-01
  - NAV-02
  - NAV-03
  - NAV-04
  - NAV-05
  - NAV-06
  - NAV-07
  - NAV-08
  - NAV-09
  - ANIM-04

must_haves:
  truths:
    - ".nav__logo has font-family: var(--font-heading) and font-size: var(--text-xl) in _nav.css"
    - ".nav__link transition includes background-color in _nav.css"
    - "Desktop .nav__list has gap: var(--space-2) inside the 905px block"
    - ".nav__link--cta has margin-left: var(--space-3) inside the 905px block"
    - ".nav .btn has height: 36px inside the 905px block"
    - "Desktop .nav__link has border-bottom: 2px solid transparent in the 905px block"
    - ".nav__link[aria-current=page] has border-bottom: 2px solid var(--color-accent) in the 905px block"
    - ".nav--scrolled CSS rule with box-shadow exists in _nav.css"
    - "initScrollShadow function exists in theme.js with passive: true scroll listener"
    - "Nav menu animation duration is 200ms in _nav.css"
    - ".nav inner height uses var(--nav-height) — no regression"
    - ".nav--open .nav__menu top uses var(--nav-height) — no regression"
  artifacts:
    - path: src/styles/3-components/_nav.css
      contains: "font-family: var(--font-heading)"
    - path: src/styles/3-components/_nav.css
      contains: "nav--scrolled"
    - path: src/styles/3-components/_nav.css
      contains: "border-bottom: 2px solid var(--color-accent)"
    - path: src/theme.js
      contains: "initScrollShadow"
    - path: src/theme.js
      contains: "passive: true"
  key_links:
    - from: theme.js
      to: _nav.css
      via: ".nav--scrolled class toggled by initScrollShadow"
      pattern: "nav--scrolled"
    - from: _nav.css
      to: _variables.css
      via: "var(--nav-height) — must not regress"
      pattern: "var\\(--nav-height\\)"
---

<objective>
Full nav component audit: Fraunces logo wordmark, link transitions, list gap, CTA separation and height, active state accent border with height-shift prevention, scroll shadow JS + CSS, and mobile menu timing correction.

Purpose: Delivers all 10 NAV requirements (NAV-01 through NAV-09, plus ANIM-04) that make the nav component production-quality. NAV-01 and NAV-09 are verify-only (Phase 2 shipped them); all others require edits.
Output: _nav.css with all interaction contract changes; theme.js with initScrollShadow passive scroll listener.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/03-first-impression/03-UI-SPEC.md
@.planning/phases/03-first-impression/03-RESEARCH.md
@.planning/phases/03-first-impression/03-PATTERNS.md

<interfaces>
<!-- Current .nav__logo rule in _nav.css (lines 29–38) — replace for NAV-02 -->
From src/styles/3-components/_nav.css (CURRENT):
```css
.nav__logo {
  font-size:       var(--text-base);
  font-weight:     var(--font-weight-semibold);
  letter-spacing:  -0.01em;
  color:           var(--color-text-primary);
  text-decoration: none;
  transition:      color var(--transition-fast);
  flex-shrink:     0;
  margin-right:    auto;
}
```

<!-- Current .nav__link rule (lines 150–158) — edit transition and weight for NAV-03 -->
From src/styles/3-components/_nav.css (CURRENT):
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

<!-- Mobile menu animation (line 118) — edit duration for ANIM-04 -->
From src/styles/3-components/_nav.css (CURRENT):
animation: nav-menu-enter 120ms var(--ease-out) both;

<!-- Desktop 905px .nav__list (line 215) — edit gap for NAV-04 -->
From src/styles/3-components/_nav.css (CURRENT):
.nav__list { gap: var(--space-1); }

<!-- Desktop 905px .nav__link (lines 218–221) — add border-bottom reserve for NAV-07 -->
From src/styles/3-components/_nav.css (CURRENT):
```css
.nav__link {
  padding:       var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
}
```

<!-- Desktop 905px .nav__link[aria-current="page"] (lines 230–232) — add accent border for NAV-07 -->
From src/styles/3-components/_nav.css (CURRENT):
```css
.nav__link[aria-current="page"] {
  background-color: var(--color-surface);
}
```

<!-- Desktop 905px .nav__link--cta (lines 235–239) — add left margin for NAV-05 -->
From src/styles/3-components/_nav.css (CURRENT):
```css
.nav__link--cta {
  display:       inline-flex;
  margin-inline: 0;
  margin-block:  0;
}
```

<!-- Current full theme.js — append initScrollShadow after initHamburger call -->
From src/theme.js (CURRENT — full file):
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

<!-- Tokens confirmed available from Phase 2 -->
From src/styles/1-settings/_variables.css:
--font-heading: ... (Fraunces)
--text-xl: 1.25rem
--text-sm: 0.875rem
--font-weight-normal: 400
--font-weight-semibold: 600
--space-2: 16px
--space-3: 24px
--color-accent: #1a6b52
--color-surface: #ede9e3
--color-border: #d6d0c8
--transition-fast: 150ms ease
--radius-md: 6px
--nav-height: 56px (Phase 2 shipped)
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Nav CSS audit — logo, link typography, transitions, list gap, CTA, active state, scroll shadow, mobile timing (NAV-01 through NAV-09, ANIM-04)</name>
  <files>src/styles/3-components/_nav.css</files>
  <read_first>
    Read src/styles/3-components/_nav.css in full before editing. Identify line numbers for: (a) .nav__logo block, (b) .nav__link base rule, (c) mobile menu animation rule, (d) the @media (min-width: 905px) block and within it: .nav__list gap, .nav__link padding block, .nav__link[aria-current="page"] block, .nav__link--cta block. Also verify line 24 has `height: var(--nav-height)` and line 112 has `top: var(--nav-height)` — these are NAV-01/NAV-09 verify items; do not modify them.
  </read_first>
  <action>
    Make the following 9 targeted changes in order. Do not modify any rule not listed below.

    1. NAV-02 — Replace .nav__logo rule with:
       `font-family: var(--font-heading);` (new property)
       `font-size: var(--text-xl);` (was --text-base)
       `font-weight: var(--font-weight-normal);` (was --font-weight-semibold)
       `font-optical-sizing: auto;` (new property)
       `letter-spacing: -0.02em;` (was -0.01em)
       Keep: `color`, `text-decoration`, `transition`, `flex-shrink`, `margin-right` — unchanged.

    2. NAV-03 + font-weight fix — In the base .nav__link rule:
       Change `transition: color var(--transition-fast)` to `transition: background-color var(--transition-fast), color var(--transition-fast);`
       Change `font-weight: var(--font-weight-medium)` to `font-weight: var(--font-weight-normal);`
       Do NOT use `transition: all` — only list background-color and color explicitly.

    3. ANIM-04 — In the mobile menu open animation rule (the animation shorthand that currently reads `120ms var(--ease-out) both`), change `120ms` to `200ms`. Easing and fill-mode are unchanged.

    4. NAV-04 — Inside the @media (min-width: 905px) block, in the .nav__list rule, change `gap: var(--space-1)` to `gap: var(--space-2)`.

    5. NAV-07 border reserve — Inside the @media (min-width: 905px) block, in the .nav__link rule (the one with padding and border-radius), add `border-bottom: 2px solid transparent;` as a new property. This reserves the 2px height so the active link's border-bottom does not shift the flex row. Include a comment: `/* reserve 2px so active border-bottom doesn't shift row height */`

    6. NAV-07 active state — Inside the @media (min-width: 905px) block, in .nav__link[aria-current="page"], add `border-bottom: 2px solid var(--color-accent);` alongside the existing `background-color: var(--color-surface)`.

    7. NAV-05 — Inside the @media (min-width: 905px) block, in the .nav__link--cta rule, add `margin-left: var(--space-3);`.

    8. NAV-06 — Inside the @media (min-width: 905px) block, add a new rule after .nav__link--cta:
       `.nav .btn { height: 36px; }`
       Do NOT add `transition` to this selector — button transition is owned by _button.css.

    9. NAV-08 CSS — Add a new .nav--scrolled rule. Best placement: immediately after the base .nav rule (before .nav__inner or .nav__logo). The rule:
       `.nav--scrolled { box-shadow: 0 1px 0 var(--color-border), 0 4px 16px -4px rgb(0 0 0 / 0.06); }`
       The raw alpha `rgb(0 0 0 / 0.06)` is a documented exception — shadow layers may use raw alpha, do not add a token for it.

    NAV-01 verify: Confirm `height: var(--nav-height)` is present on the nav element — make no change.
    NAV-09 verify: Confirm `top: var(--nav-height)` is present on the mobile menu open state — make no change.
  </action>
  <verify>
    <automated>grep -c "font-family: var(--font-heading)" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "font-optical-sizing: auto" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "background-color var(--transition-fast)" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "gap: var(--space-2)" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "margin-left: var(--space-3)" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "height: 36px" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "border-bottom: 2px solid transparent" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "border-bottom: 2px solid var(--color-accent)" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "nav--scrolled" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "200ms var(--ease-out)" src/styles/3-components/_nav.css</automated>
    <automated>grep -c "var(--nav-height)" src/styles/3-components/_nav.css</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "font-family: var(--font-heading)" src/styles/3-components/_nav.css` returns 1
    - `grep -c "font-optical-sizing: auto" src/styles/3-components/_nav.css` returns 1
    - `grep -c "background-color var(--transition-fast)" src/styles/3-components/_nav.css` returns 1
    - `grep -c "transition: all" src/styles/3-components/_nav.css` returns 0 (no transition:all)
    - `grep -c "gap: var(--space-2)" src/styles/3-components/_nav.css` returns at least 1
    - `grep -c "gap: var(--space-1)" src/styles/3-components/_nav.css` returns 0 (old gap replaced)
    - `grep -c "margin-left: var(--space-3)" src/styles/3-components/_nav.css` returns 1
    - `grep -c "height: 36px" src/styles/3-components/_nav.css` returns 1
    - `grep -c "border-bottom: 2px solid transparent" src/styles/3-components/_nav.css` returns 1
    - `grep -c "border-bottom: 2px solid var(--color-accent)" src/styles/3-components/_nav.css` returns 1
    - `grep -c "nav--scrolled" src/styles/3-components/_nav.css` returns at least 1 (CSS rule present)
    - `grep -c "200ms var(--ease-out)" src/styles/3-components/_nav.css` returns 1 (was 120ms)
    - `grep -c "120ms" src/styles/3-components/_nav.css` returns 0 (old duration gone)
    - `grep -c "var(--nav-height)" src/styles/3-components/_nav.css` returns at least 2 (NAV-01 and NAV-09 preserved)
    - `grep -c "font-weight: var(--font-weight-medium)" src/styles/3-components/_nav.css` returns 0 (base link weight updated to normal)
  </acceptance_criteria>
  <done>
    All 9 CSS changes applied to _nav.css. NAV-01 and NAV-09 verified intact (var(--nav-height) present twice). .nav--scrolled class ready for JS activation. Active state shows accent border without flex row height shift.
  </done>
</task>

<task type="auto">
  <name>Task 2: Add initScrollShadow passive scroll listener to theme.js and aria-hidden mobile menu fix (NAV-08)</name>
  <files>src/theme.js</files>
  <read_first>
    Read src/theme.js in full. Confirm the IIFE pattern is NOT used (file uses named functions + direct calls). Note the exact last line — it will be `initHamburger();`. The new function and call are appended after this line. Confirm no existing scroll listener or initScrollShadow already exists.
  </read_first>
  <action>
    Append the following after the `initHamburger();` call at the end of the file. Do not modify any existing code in initHamburger.

    First, add initScrollShadow function:
    ```
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

    The `{ passive: true }` option is required — without it Chrome DevTools warns about scroll performance and the browser must wait for JS before scrolling. `window.scrollY` (not `pageYOffset` or `scrollTop`) is the correct modern API. The `onScroll()` call immediately after addEventListener ensures the shadow appears correctly when the page is first loaded mid-scroll (e.g. back/forward cache, anchor link navigation).

    Additionally, add aria-hidden management to the mobile menu inside the existing click handler in initHamburger. In the click handler, after `const isOpen = nav.classList.toggle('nav--open');`, add:
    ```
    const menu = nav.querySelector('.nav__menu');
    if (menu) menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    ```
    Also add `if (menu) menu.setAttribute('aria-hidden', 'false');` in the Escape keydown handler when re-opening is not the case — specifically, when nav--open is removed via Escape, set `menu.setAttribute('aria-hidden', 'true')`. Mirror the same aria-hidden reset in the outside-click handler. The pattern: whenever `nav--open` is removed, `aria-hidden="true"` on the menu; whenever `nav--open` is added, `aria-hidden="false"`.

    Do NOT use `type="module"` export syntax — the file uses direct function calls, not exports. Do NOT wrap in an IIFE — the existing file does not use IIFE at the top level.
  </action>
  <verify>
    <automated>grep -c "initScrollShadow" src/theme.js</automated>
    <automated>grep -c "passive: true" src/theme.js</automated>
    <automated>grep -c "window.scrollY" src/theme.js</automated>
    <automated>grep -c "nav--scrolled" src/theme.js</automated>
    <automated>grep -c "aria-hidden" src/theme.js</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "initScrollShadow" src/theme.js` returns 2 (function definition + call)
    - `grep -c "passive: true" src/theme.js` returns 1
    - `grep -c "window.scrollY" src/theme.js` returns 1
    - `grep -c "nav--scrolled" src/theme.js` returns 1 (classList.toggle call)
    - `grep -c "aria-hidden" src/theme.js` returns at least 2 (set true on close, false on open)
    - `grep -c "onScroll()" src/theme.js` returns 2 (function definition + immediate call)
  </acceptance_criteria>
  <done>
    initScrollShadow adds/removes .nav--scrolled class via passive scroll listener. Shadow CSS (from Task 1) activates when .nav--scrolled is present. Mobile menu aria-hidden managed correctly on open/close/escape/outside-click.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| JS scroll event → DOM | window.scrollY is a browser-controlled integer read-only value — no user string input |
| JS classList toggle | .classList.toggle('.nav--scrolled', condition) takes a literal string and a boolean derived from scrollY — no user input path |
| aria attributes | setAttribute values are string literals — no user-controlled content |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-03-03 | Spoofing | window.scrollY in initScrollShadow | accept | scrollY is a browser-read-only Number — cannot be spoofed by page content or user input; no XSS surface |
| T-03-04 | Tampering | classList.toggle with 'nav--scrolled' | accept | String literal argument — no user-controlled input reaches this call; prototype pollution not applicable to classList.toggle |
| T-03-05 | Denial of Service | Passive scroll listener | accept | { passive: true } explicitly declared — browser cannot block scrolling; listener is a single toggle on a boolean condition, zero layout-thrash |
| T-03-06 | Information Disclosure | CSS class on nav element | accept | .nav--scrolled is a visual state class — no sensitive data exposed |
| T-03-SC | Tampering | npm/pip/cargo installs | accept | This plan installs zero packages — no registry operations, no slopcheck needed |
</threat_model>

<verification>
After both tasks complete, verify end-to-end:

1. Logo font: `grep "font-family: var(--font-heading)" src/styles/3-components/_nav.css` — must return 1
2. Logo size: `grep "font-size: var(--text-xl)" src/styles/3-components/_nav.css` — must return 1 (in .nav__logo rule)
3. Transition: `grep "background-color var(--transition-fast)" src/styles/3-components/_nav.css` — must return 1
4. List gap: `grep "gap: var(--space-2)" src/styles/3-components/_nav.css` — must return at least 1
5. CTA margin: `grep "margin-left: var(--space-3)" src/styles/3-components/_nav.css` — must return 1
6. CTA height: `grep "height: 36px" src/styles/3-components/_nav.css` — must return 1
7. Border reserve: `grep "border-bottom: 2px solid transparent" src/styles/3-components/_nav.css` — must return 1
8. Active border: `grep "border-bottom: 2px solid var(--color-accent)" src/styles/3-components/_nav.css` — must return 1
9. Scroll shadow CSS: `grep "nav--scrolled" src/styles/3-components/_nav.css` — must return at least 1
10. Scroll shadow JS: `grep "initScrollShadow" src/theme.js` — must return 2
11. Passive listener: `grep "passive: true" src/theme.js` — must return 1
12. Mobile timing: `grep "200ms var(--ease-out)" src/styles/3-components/_nav.css` — must return 1
13. NAV-01 regression: `grep "height: var(--nav-height)" src/styles/3-components/_nav.css` — must return at least 1
14. NAV-09 regression: `grep "top: var(--nav-height)" src/styles/3-components/_nav.css` — must return at least 1
</verification>

<success_criteria>
- NAV-01: Nav height var(--nav-height) present — no regression
- NAV-02: Logo uses Fraunces, text-xl, font-weight-normal, font-optical-sizing:auto, -0.02em tracking
- NAV-03: Nav link transition includes background-color and color (no transition:all)
- NAV-04: Desktop list gap is var(--space-2) — was var(--space-1)
- NAV-05: .nav__link--cta has margin-left: var(--space-3) at 905px+
- NAV-06: .nav .btn has height: 36px at 905px+ — no transition added
- NAV-07: Active link has 2px solid accent border; resting link has 2px transparent reserve — no height shift
- NAV-08: .nav--scrolled CSS rule present with two-layer box-shadow; initScrollShadow in theme.js with passive:true and immediate onScroll call
- NAV-09: Mobile menu top: var(--nav-height) — no regression
- ANIM-04: Mobile menu animation duration 200ms (was 120ms)
</success_criteria>

<output>
Create .planning/phases/03-first-impression/03-02-SUMMARY.md when done.
</output>
