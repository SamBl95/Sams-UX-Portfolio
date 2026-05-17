---
phase: 02-foundation-infrastructure
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/1-settings/_variables.css
  - src/styles/3-components/_button.css
  - src/styles/3-components/_nav.css
  - src/styles/3-components/_card.css
  - src/styles/3-components/_reveal.css
  - src/styles/main.css
  - src/reveal.js
  - index.html
  - src/pages/about.html
  - src/pages/contact.html
  - src/pages/stories/index.html
  - src/pages/stories/design-systems-and-portfolio-sites.html
  - src/pages/case-studies/i-exchange.html
  - src/pages/case-studies/cassi.html
  - src/pages/case-studies/community.html
autonomous: true
requirements:
  - FOUND-01
  - FOUND-02
  - FOUND-03
  - FOUND-04
  - ANIM-01
  - BTN-01
  - BTN-02
  - BTN-03
  - BTN-04
  - TOK-01

must_haves:
  truths:
    - "Three new easing tokens (--ease-out-quint, --ease-in-out-quart, --ease-emphasized) resolve in browser DevTools"
    - "An element with class js-reveal is invisible on page load and becomes visible with a translateY(0) + opacity(1) entrance when scrolled into view"
    - "Under prefers-reduced-motion: reduce, js-reveal elements are immediately visible — no invisible content"
    - "A ::after state-layer CSS pattern is documented and demonstrable on a test element"
    - "All button variants press visually with scale(0.97) — no translateY jump on press"
    - "Nav renders at 56px tall (not 128px)"
    - "Card hover box-shadow glow uses rgb(26 107 82 / 0.14) — warm teal, not the stale mint-teal"
    - "Typewriter container shows no layout shift at 375px and 1240px across font-load states"
  artifacts:
    - path: "src/styles/1-settings/_variables.css"
      provides: "Easing tokens and --nav-height semantic token"
      contains: "--ease-out-quint"
    - path: "src/styles/3-components/_reveal.css"
      provides: "Scroll-reveal utility CSS — @keyframes + .js-reveal + reduced-motion block"
      contains: "@keyframes reveal-enter"
    - path: "src/reveal.js"
      provides: "IntersectionObserver module — adds .js-reveal--visible on viewport entry"
      contains: "IntersectionObserver"
    - path: "src/styles/3-components/_button.css"
      provides: "Corrected button system — token padding, correct heights, scale press"
      contains: "scale(0.97)"
    - path: "src/styles/3-components/_nav.css"
      provides: "Nav height bug fix — var(--nav-height) replaces var(--space-16)"
      contains: "var(--nav-height)"
    - path: "src/styles/3-components/_card.css"
      provides: "Corrected card hover box-shadow using current accent rgb value"
      contains: "rgb(26 107 82 / 0.14)"
  key_links:
    - from: "src/reveal.js"
      to: "src/styles/3-components/_reveal.css"
      via: "classList.add('js-reveal--visible')"
      pattern: "js-reveal--visible"
    - from: "src/styles/3-components/_reveal.css"
      to: "src/styles/1-settings/_variables.css"
      via: "var(--ease-out-quint)"
      pattern: "--ease-out-quint"
    - from: "src/styles/3-components/_nav.css"
      to: "src/styles/1-settings/_variables.css"
      via: "var(--nav-height)"
      pattern: "--nav-height"
---

<objective>
Lay the CSS and JS infrastructure every subsequent phase depends on. This plan delivers: three new easing tokens, a reusable scroll-reveal utility, a documented state-layer pattern, a nav-height semantic token (fixing the 128px bug), button system corrections (token values + scale press), and the stale card box-shadow fix.

Purpose: Phases 3–7 all consume these foundations. Easing tokens are referenced in hero, nav, and card animations. Scroll-reveal is used on cards (Phase 4), content pages (Phase 6), and the global sweep (Phase 7). The state-layer pattern is applied to cards in Phase 4. The button system and nav height are visually broken until this plan ships.

Output: 2 new files (_reveal.css, reveal.js), 5 edited files (_variables.css, _button.css, _nav.css, _card.css, main.css), reveal.js script tag added to all 8 HTML pages.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/ROADMAP.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/REQUIREMENTS.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/phases/02-foundation-infrastructure/02-RESEARCH.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/phases/02-foundation-infrastructure/02-PATTERNS.md

<interfaces>
<!-- Key patterns extracted from codebase. Use these directly — no exploration needed. -->

From src/styles/1-settings/_variables.css — TRANSITIONS block (lines 127–134), extend after line 134:
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
  /* ADD HERE: --ease-out-quint, --ease-in-out-quart, --ease-emphasized */

From src/styles/1-settings/_variables.css — SPACING block, after the main scale, add a sub-block:
  /* Component tokens — semantic values outside the 8pt scale */
  --nav-height: 56px;

From src/styles/3-components/_nav.css — two bug locations:
  Line 24: height: var(--space-16); /* 64px */   → height: var(--nav-height); /* 56px */
  Line 112: top: var(--space-16);                 → top: var(--nav-height);

From src/styles/3-components/_button.css — broken values to correct:
  Line 23: padding: 0 20px                        → padding: 0 var(--space-3)
  Line 44: min-height: 40px                       → min-height: 36px
  Line 46: font-size: 15px                        → font-size: var(--text-sm)
  Primary desktop (separate media block): min-height: 48px → min-height: 40px
  All three hover rules: remove transform: translateY(-1px)
  All three active rules: transform: translateY(0) → transform: scale(0.97)

From src/styles/3-components/_card.css — box-shadow hover bug (inside @media (hover: hover) block):
  0 0 32px -8px rgb(79 209 165 / 0.14)           → rgb(26 107 82 / 0.14)
  0 24px 48px -12px rgb(0 0 0 / 0.5)             → rgb(0 0 0 / 0.08)

From src/styles/main.css — components section (lines 23–35), add after line 35:
  @import './3-components/_reveal.css';

From index.html — script loading pattern (already present):
  <script type="module" src="/src/theme.js"></script>
  Add after: <script type="module" src="/src/reveal.js"></script>

From src/typewriter.js — JS conventions to match in reveal.js:
  File header JSDoc block describing module purpose
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Early return if prefersReducedMotion (after adding .js-reveal--visible to all elements)
  IIFE pattern: (function initReveal() { ... })();
  No ES module exports — loaded as type="module" from HTML
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Token expansion and nav-height bug fix</name>
  <files>
    src/styles/1-settings/_variables.css,
    src/styles/3-components/_nav.css
  </files>
  <read_first>
    - src/styles/1-settings/_variables.css (read the full file — find the TRANSITIONS block around line 127–134 and the SPACING block around line 95–110 to identify exact insertion points)
    - src/styles/3-components/_nav.css (read the full file — find line 24 and line 112 where var(--space-16) appears)
  </read_first>
  <action>
    In _variables.css TRANSITIONS block: after the last existing easing token (--ease-in-out), add three new tokens on consecutive lines with matching comment style:
      --ease-out-quint:    cubic-bezier(0.22, 1, 0.36, 1);    with comment "strong deceleration — entrances, scroll reveals"
      --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);    with comment "symmetric acceleration — on-screen morphs"
      --ease-emphasized:   cubic-bezier(0.2, 0, 0, 1);         with comment "MD3 emphasized easing — standard component motion"

    In _variables.css SPACING block: after the main 8pt scale, add a comment sub-block then the semantic token:
      /* Component tokens — semantic values outside the 8pt scale */
      --nav-height: 56px;    /* nav bar height; also used for mobile menu top offset */

    In _nav.css line 24: replace "height: var(--space-16);" (and its incorrect "64px" comment) with "height: var(--nav-height); /* 56px — matches --nav-height token */"

    In _nav.css line 112: replace "top: var(--space-16);" (and its comment) with "top: var(--nav-height); /* flush below nav header */"

    Do not change any other properties in either file. Do not add hex values. The 56px value belongs only in --nav-height, not written inline in _nav.css.
  </action>
  <verify>
    Run: grep "ease-out-quint\|ease-in-out-quart\|ease-emphasized\|nav-height" "src/styles/1-settings/_variables.css"
    Expected: 4 lines returned — one per new token.

    Run: grep "nav-height" "src/styles/3-components/_nav.css"
    Expected: 2 lines returned — height and top.

    Run: grep "space-16" "src/styles/3-components/_nav.css"
    Expected: 0 lines returned — the bug is fully removed.
  </verify>
  <acceptance_criteria>
    - _variables.css contains --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)
    - _variables.css contains --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1)
    - _variables.css contains --ease-emphasized: cubic-bezier(0.2, 0, 0, 1)
    - _variables.css contains --nav-height: 56px
    - _nav.css contains no occurrences of var(--space-16) — zero grep matches
    - _nav.css contains exactly 2 occurrences of var(--nav-height) — one on the height line, one on the top line
    - No hex values appear in _nav.css as a result of this edit
  </acceptance_criteria>
  <done>Four new tokens in _variables.css. _nav.css references --nav-height in both locations. var(--space-16) is fully removed from _nav.css.</done>
</task>

<task type="auto">
  <name>Task 2: Button system corrections — tokens, sizing, and scale press</name>
  <files>
    src/styles/3-components/_button.css
  </files>
  <read_first>
    - src/styles/3-components/_button.css (read the full file — identify the base .btn block, desktop @media block, and all three variant hover/active rules for primary, secondary, ghost)
  </read_first>
  <action>
    Make these four targeted corrections to _button.css:

    BTN-01 — Mobile base padding: In the .btn base rule, change "padding: 0 20px" to "padding: 0 var(--space-3)". (--space-3 = 24px per the spacing scale.)

    BTN-02 and BTN-03 — Desktop sizing and font: In the @media (min-width: 905px) block for .btn, change:
      - min-height from 40px to 36px
      - font-size from 15px to var(--text-sm)
    In the @media (min-width: 905px) block for .btn--primary, change min-height from 48px to 40px.

    BTN-04 — Active press model (all three variants): For the :active rules on .btn--primary, .btn--secondary, and .btn--ghost — change "transform: translateY(0)" to "transform: scale(0.97)" on each.
    Simultaneously, for the @media (hover: hover) and (pointer: fine) hover rules on all three variants — remove the "transform: translateY(-1px)" line entirely. The hover state must not set any transform. Hover expresses only background-color, border-color, and box-shadow changes.

    Do not touch the @media (prefers-reduced-motion: reduce) block at lines 66–75 — it already sets transform: none !important and is correct.
    Do not remove or change the "and (pointer: fine)" qualifier from any hover media query.
    Do not change any color, border, or box-shadow values — only transform, min-height, font-size, and padding values change.
  </action>
  <verify>
    Run: grep "20px" "src/styles/3-components/_button.css"
    Expected: 0 lines returned (no hardcoded padding).

    Run: grep "15px" "src/styles/3-components/_button.css"
    Expected: 0 lines returned (no hardcoded font-size).

    Run: grep "scale(0.97)" "src/styles/3-components/_button.css"
    Expected: at least 3 matches — one per variant active rule.

    Run: grep "translateY(-1px)" "src/styles/3-components/_button.css"
    Expected: 0 lines returned — lift removed from all hover rules.
  </verify>
  <acceptance_criteria>
    - .btn base rule contains "padding: 0 var(--space-3)" — no "0 20px"
    - Desktop @media .btn block contains "min-height: 36px" and "font-size: var(--text-sm)" — no "40px" or "15px"
    - Desktop @media .btn--primary block contains "min-height: 40px" — no "48px"
    - "transform: scale(0.97)" appears in all three variant :active rules (primary, secondary, ghost)
    - "transform: translateY(-1px)" appears zero times in the file
    - "and (pointer: fine)" still present on all hover media queries — not removed
    - The prefers-reduced-motion block is unchanged
  </acceptance_criteria>
  <done>All four BTN requirements satisfied in _button.css. Scale press consistent across variants. No hardcoded spacing or font-size values remain.</done>
</task>

<task type="auto">
  <name>Task 3: Scroll-reveal utility, state-layer pattern, card token fix, and script wiring</name>
  <files>
    src/styles/3-components/_reveal.css,
    src/reveal.js,
    src/styles/main.css,
    src/styles/3-components/_card.css,
    index.html,
    src/pages/about.html,
    src/pages/contact.html,
    src/pages/stories/index.html,
    src/pages/stories/design-systems-and-portfolio-sites.html,
    src/pages/case-studies/i-exchange.html,
    src/pages/case-studies/cassi.html,
    src/pages/case-studies/community.html
  </files>
  <read_first>
    - src/styles/3-components/_nav.css (lines 97–106 — read the @keyframes nav-menu-enter block to copy the keyframe structure)
    - src/typewriter.js (read the full file — copy the matchMedia check pattern, IIFE structure, and JSDoc header convention)
    - src/styles/main.css (lines 23–35 — read the components import block to find the exact insertion point for _reveal.css)
    - src/styles/3-components/_card.css (read the full file — find the box-shadow inside the hover block)
    - index.html (read lines 130–140 — find the script tags at the bottom to establish insertion point for reveal.js)
    - src/pages/about.html (read bottom 10 lines — confirm script tag pattern for adding reveal.js)
  </read_first>
  <action>
    Step A — Create src/styles/3-components/_reveal.css as a new file.
    The file must contain exactly:
    - A file header comment block: "REVEAL — Scroll-reveal utility" with instructions for use (apply .js-reveal to any element; JS adds .js-reveal--visible on viewport entry; use data-reveal-delay="100"/"200"/"300" for stagger)
    - @keyframes reveal-enter: from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); }
    - .js-reveal { opacity: 0; } — hidden before JS fires
    - .js-reveal--visible { animation: reveal-enter 500ms var(--ease-out-quint) both; }
    - Three stagger delay rules: .js-reveal[data-reveal-delay="100"] { animation-delay: 100ms; }, "200" → 200ms, "300" → 300ms
    - A prefers-reduced-motion block with a comment explaining WHY it is required (the global reset only zeros duration, not initial opacity):
        @media (prefers-reduced-motion: reduce) { .js-reveal, .js-reveal--visible { opacity: 1; animation: none; } }

    Step B — Also add the state-layer pattern as a documented comment block at the bottom of _reveal.css (FOUND-03). This is a pattern definition for Phase 4 to apply to cards. Write it as a clearly labelled CSS comment section:
        /* STATE-LAYER HOVER PATTERN (FOUND-03)
           Phase 4 applies this to .card. Copy the ::after block into any component that needs state-layer hover.
           Requires: position: relative on the component root.
           ... */
    Then write the full pattern as commented-out CSS (not live rules): position relative on the component, the ::after block with content:'', position:absolute, inset:0, border-radius:inherit, background-color:var(--color-text-primary), opacity:0, transition:opacity 150ms var(--ease-out), pointer-events:none; the @media (hover: hover) and (pointer: fine) block setting hover ::after opacity to 0.08; and the :active ::after block setting opacity to 0.12.

    Step C — Create src/reveal.js as a new file matching typewriter.js conventions:
    - JSDoc header comment describing the module
    - IIFE: (function initReveal() { ... })();
    - First line inside IIFE: const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    - If prefersReducedMotion: querySelectorAll('.js-reveal').forEach(el => el.classList.add('js-reveal--visible')); then return;
    - Create IntersectionObserver with options { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    - Callback: if entry.isIntersecting, add class js-reveal--visible, then observer.unobserve(entry.target)
    - Observe all .js-reveal elements

    Step D — In src/styles/main.css, in the /* 3. COMPONENTS */ block, add the import "@import './3-components/_reveal.css';" as the last import in the components section (after _stories.css on line 35).

    Step E — In src/styles/3-components/_card.css, find the box-shadow inside the hover block (the one currently containing "rgb(79 209 165 / 0.14)"). Change:
      "0 24px 48px -12px rgb(0 0 0 / 0.5)" → "0 24px 48px -12px rgb(0 0 0 / 0.08)"
      "0 0 32px -8px rgb(79 209 165 / 0.14)" → "0 0 32px -8px rgb(26 107 82 / 0.14)"
    Do not change the rest of the card file. Do not add the COMP-05 pointer:fine fix — that is a Phase 4 requirement.

    Step F — Add <script type="module" src="/src/reveal.js"></script> to all 8 HTML pages. Insert immediately after the existing <script type="module" src="/src/theme.js"></script> line on each page. Use root-relative path /src/reveal.js — not a relative path. The 8 pages are: index.html (root), src/pages/about.html, src/pages/contact.html, src/pages/stories/index.html, src/pages/stories/design-systems-and-portfolio-sites.html, src/pages/case-studies/i-exchange.html, src/pages/case-studies/cassi.html, src/pages/case-studies/community.html.

    ANIM-01 verification only — typewriter.js already implements reserveHeight() with document.fonts.ready. Do NOT modify typewriter.js. The requirement is already met.
  </action>
  <verify>
    Run: ls "src/styles/3-components/_reveal.css" && ls "src/reveal.js"
    Expected: both files exist.

    Run: grep "reveal-enter" "src/styles/3-components/_reveal.css"
    Expected: at least 2 matches (keyframe definition and animation shorthand).

    Run: grep "prefers-reduced-motion" "src/styles/3-components/_reveal.css"
    Expected: 1 match — the media query block.

    Run: grep "opacity: 1" "src/styles/3-components/_reveal.css"
    Expected: 1 match — inside the reduced-motion block.

    Run: grep "IntersectionObserver" "src/reveal.js"
    Expected: 1 match.

    Run: grep "_reveal.css" "src/styles/main.css"
    Expected: 1 match.

    Run: grep -l "reveal.js" index.html src/pages/about.html src/pages/contact.html src/pages/stories/index.html src/pages/stories/design-systems-and-portfolio-sites.html src/pages/case-studies/i-exchange.html src/pages/case-studies/cassi.html src/pages/case-studies/community.html
    Expected: 8 file paths returned — all 8 pages.

    Run: grep "79 209 165" "src/styles/3-components/_card.css"
    Expected: 0 lines returned — stale value fully removed.

    Run: grep "26 107 82" "src/styles/3-components/_card.css"
    Expected: 1 match — the corrected box-shadow.
  </verify>
  <acceptance_criteria>
    - src/styles/3-components/_reveal.css exists and contains @keyframes reveal-enter with from { opacity: 0; transform: translateY(20px); }
    - _reveal.css contains @media (prefers-reduced-motion: reduce) block setting .js-reveal and .js-reveal--visible to opacity: 1; animation: none
    - _reveal.css contains the STATE-LAYER HOVER PATTERN documentation as a commented-out code block (FOUND-03)
    - src/reveal.js exists and contains IntersectionObserver with rootMargin: '0px 0px -60px 0px'
    - src/reveal.js contains the prefersReducedMotion early-exit guard that adds js-reveal--visible to all elements before returning
    - src/styles/main.css contains @import './3-components/_reveal.css' inside the components section
    - _card.css box-shadow contains rgb(26 107 82 / 0.14) — zero occurrences of rgb(79 209 165)
    - _card.css box-shadow black shadow reads rgb(0 0 0 / 0.08) — not 0.5
    - All 8 HTML pages contain <script type="module" src="/src/reveal.js"></script>
    - typewriter.js is unchanged
  </acceptance_criteria>
  <done>Scroll-reveal utility ships. State-layer pattern documented. Card token fixed. reveal.js wired to all 8 pages. ANIM-01 confirmed already implemented — no code change required.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| DOM → reveal.js | The observer reads element classes from the DOM; no user input is processed |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02-01 | Tampering | reveal.js DOM class manipulation | accept | Observer only adds a fixed CSS class string ("js-reveal--visible") to elements it found via querySelectorAll — no user-supplied data is used. No XSS surface. |
| T-02-02 | Denial of Service | IntersectionObserver setup | accept | Observer is created once, observes only elements present at DOM-ready, then unobserves after each trigger. No memory leak pattern. Browsers throttle IntersectionObserver callbacks natively. |
| T-02-SC | Tampering | npm/pip/cargo installs | accept | This phase installs zero packages. No supply-chain surface exists. |
</threat_model>

<verification>
After all three tasks complete, run the following to confirm the full phase:

1. Token presence:
   grep "ease-out-quint\|ease-in-out-quart\|ease-emphasized\|nav-height" src/styles/1-settings/_variables.css
   Expected: 4 lines.

2. Nav bug removed:
   grep "space-16" src/styles/3-components/_nav.css
   Expected: 0 lines.

3. Button scale press:
   grep "scale(0.97)" src/styles/3-components/_button.css
   Expected: 3+ lines (one per variant).

4. No button lift on hover:
   grep "translateY(-1px)" src/styles/3-components/_button.css
   Expected: 0 lines.

5. Reveal utility wired to all pages:
   grep -rl "reveal.js" index.html src/pages/ | wc -l
   Expected: 8.

6. Stale card color gone:
   grep "79 209 165" src/styles/3-components/_card.css
   Expected: 0 lines.

7. Visual sanity — open index.html in Vite dev server (npm run dev) and confirm:
   - Nav renders at 56px (inspect .nav__inner height in DevTools)
   - Add class js-reveal to a div in index.html temporarily — confirm it's invisible on load, then visible after scrolling
   - Press any button — confirm scale(0.97) press with no Y-axis jump
   - Typewriter text area has no layout shift on load (observe at 375px mobile size)
</verification>

<success_criteria>
Phase 2 complete when:
1. var(--ease-out-quint), var(--ease-in-out-quart), var(--ease-emphasized), and var(--nav-height) are all defined in _variables.css and resolve correctly in the browser
2. An element with .js-reveal class is hidden on load and animates in (translateY 20px → 0, opacity 0 → 1) when scrolled into view using reveal.js
3. Under prefers-reduced-motion: reduce (DevTools emulation), .js-reveal elements are immediately visible — no invisible content
4. The state-layer ::after pattern is documented as a commented code block in _reveal.css for Phase 4 reference
5. All three button variants (primary, secondary, ghost) show scale(0.97) press feedback with no translateY jump
6. Button desktop heights are 36px (standard) and 40px (primary)
7. Nav renders at 56px height (was 128px)
8. Card hover box-shadow glow uses rgb(26 107 82 / 0.14) — verified visually and by grep
9. reveal.js is loaded on all 8 pages via type="module" script tag
10. typewriter.js is unmodified — ANIM-01 verified as already complete
</success_criteria>

<output>
Create `.planning/phases/02-foundation-infrastructure/02-01-SUMMARY.md` when done.
</output>
