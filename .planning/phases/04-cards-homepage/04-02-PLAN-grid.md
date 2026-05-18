---
phase: 04-cards-homepage
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/3-components/_case-studies.css
  - index.html
autonomous: true
requirements:
  - LAY-02
  - ANIM-03

must_haves:
  truths:
    - "At 1240px+ all three cards appear in a single row with equal width — no orphaned third card"
    - "Scrolling past the case studies section causes the three cards to animate in with staggered timing"
    - "First card reveals immediately (0ms), second at 100ms, third at 200ms"
    - "Users with prefers-reduced-motion see cards immediately at full opacity — no invisible cards"
  artifacts:
    - path: "src/styles/3-components/_case-studies.css"
      provides: "Three-column grid breakpoint at 1240px+"
      contains: "@media (min-width: 1240px)"
    - path: "index.html"
      provides: "Cards with js-reveal class and data-reveal-delay stagger attributes"
      contains: "js-reveal"
  key_links:
    - from: "index.html .card elements"
      to: "src/styles/3-components/_reveal.css"
      via: ".js-reveal + .js-reveal--visible + data-reveal-delay attributes"
      pattern: "js-reveal"
    - from: ".case-studies__grid"
      to: "1240px breakpoint"
      via: "grid-template-columns: repeat(3, 1fr)"
      pattern: "repeat\\(3, 1fr\\)"
---

<objective>
Add the 1240px three-column grid breakpoint to `.case-studies__grid` (LAY-02) and wire scroll-reveal stagger on the three homepage cards (ANIM-03).

Purpose: The grid currently orphans the third card at wide viewports. The cards currently enter the viewport without animation. Both fixes are purely additive — no existing CSS is removed, only a new breakpoint block and class attributes.
Output: `_case-studies.css` with complete breakpoint ladder; `index.html` with `.js-reveal` and `data-reveal-delay` on each `.card` element.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/04-cards-homepage/04-UI-SPEC.md

<interfaces>
<!-- Key declarations the executor must know before editing. -->

From src/styles/3-components/_case-studies.css (current breakpoint ladder):
  .case-studies__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }
  @media (min-width: 600px) { gap: var(--space-3); }
  @media (min-width: 905px) { grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
  -- MISSING: @media (min-width: 1240px) block --

From src/styles/3-components/_reveal.css (stagger mechanism):
  .js-reveal { opacity: 0; }
  .js-reveal--visible { animation: reveal-enter 500ms var(--ease-out-quint) both; }
  .js-reveal[data-reveal-delay="100"] { animation-delay: 100ms; }
  .js-reveal[data-reveal-delay="200"] { animation-delay: 200ms; }
  @media (prefers-reduced-motion: reduce) { .js-reveal, .js-reveal--visible { opacity: 1; animation: none; } }

From index.html (current card markup, lines 66 / 86 / 106):
  Card 1: <article class="card">  (line 66)
  Card 2: <article class="card">  (line 86)
  Card 3: <article class="card">  (line 106)
  -- None have js-reveal or data-reveal-delay yet --
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: LAY-02 — Three-column grid at 1240px+</name>
  <files>src/styles/3-components/_case-studies.css</files>
  <read_first>
    - src/styles/3-components/_case-studies.css (full file — verify existing breakpoint ladder before appending)
    - .planning/phases/04-cards-homepage/04-UI-SPEC.md (Layout Contract: LAY-02 breakpoint table)
  </read_first>
  <action>
    Append a new breakpoint block to the end of `_case-studies.css`, after the existing `@media (min-width: 905px)` block:

      @media (min-width: 1240px) {
        .case-studies__grid {
          grid-template-columns: repeat(3, 1fr);
          gap:                   var(--space-8);
        }
      }

    `--space-8` is 64px. This is the only change to this file. Do not modify any existing rules.

    The complete breakpoint ladder after this change:
    - default: 1 column, --space-2 gap
    - 600px+: 1 column, --space-3 gap
    - 905px+: 2 columns, --space-4 gap
    - 1240px+: 3 columns, --space-8 gap
  </action>
  <verify>
    <automated>grep -n "1240px\|repeat(3" C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/src/styles/3-components/_case-studies.css</automated>
  </verify>
  <acceptance_criteria>
    - `_case-studies.css` contains `@media (min-width: 1240px)` block
    - That block contains `grid-template-columns: repeat(3, 1fr)`
    - That block contains `gap: var(--space-8)`
    - No existing breakpoint blocks were modified (905px block still has `repeat(2, 1fr)`)
  </acceptance_criteria>
  <done>Three-column grid fires at 1240px+ with 64px gap. Third card is never orphaned.</done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: ANIM-03 — Add js-reveal stagger attributes to homepage cards</name>
  <files>index.html</files>
  <read_first>
    - index.html (lines 63-125 — the .case-studies__grid and three .card articles)
    - src/styles/3-components/_reveal.css (lines 1-55 — confirm stagger delay token selectors)
    - .planning/phases/04-cards-homepage/04-UI-SPEC.md (Interaction Contract: ANIM-03)
  </read_first>
  <action>
    In `index.html`, update the opening tag of each of the three `.card` articles inside `.case-studies__grid`:

    Card 1 (line 66): change `<article class="card">` to `<article class="card js-reveal" data-reveal-delay="0">`
    Card 2 (line 86): change `<article class="card">` to `<article class="card js-reveal" data-reveal-delay="100">`
    Card 3 (line 106): change `<article class="card">` to `<article class="card js-reveal" data-reveal-delay="200">`

    These are attribute additions only — no other markup in index.html changes. The `reveal.js` IntersectionObserver (already loaded) will add `.js-reveal--visible` when each card scrolls into view, triggering the `reveal-enter` keyframe with the correct delay.

    The `data-reveal-delay="0"` on Card 1 is explicit for clarity per the UI-SPEC note.
  </action>
  <verify>
    <automated>grep -n "js-reveal" C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/index.html</automated>
  </verify>
  <acceptance_criteria>
    - `index.html` contains exactly 3 occurrences of `js-reveal` on `.card` article elements
    - First `.card` has `data-reveal-delay="0"`
    - Second `.card` has `data-reveal-delay="100"`
    - Third `.card` has `data-reveal-delay="200"`
    - No other HTML elements in index.html were modified
    - The `class` attribute on each card starts with `card` (BEM root class first)
  </acceptance_criteria>
  <done>All three cards carry js-reveal + stagger delays. IntersectionObserver will trigger staggered 0/100/200ms entrances on scroll. Reduced-motion users see cards immediately via existing _reveal.css guard.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| CSS file edit | Appending breakpoint rule to existing CSS; no external input, no user data |
| HTML attribute edit | Adding class and data attributes to static markup; no executable code, no user input |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-04-02-01 | Tampering | `_case-studies.css` | accept | Pure CSS grid declaration; no executable path; no user input surface |
| T-04-02-02 | Tampering | `index.html` data attributes | accept | `data-reveal-delay` is read by trusted first-party JS (`reveal.js`) as a numeric delay value; parseInt result is only used as `animation-delay` milliseconds — no injection vector |
| T-04-02-SC | Tampering | npm/pip/cargo installs | accept | No new packages installed in this plan — CSS and HTML edits only |
</threat_model>

<verification>
After both tasks complete:

1. `grep -c "repeat(3, 1fr)" src/styles/3-components/_case-studies.css` → returns 1 (LAY-02)
2. `grep -c "min-width: 1240px" src/styles/3-components/_case-studies.css` → returns 1
3. `grep -c "js-reveal" index.html` → returns 3 (one per card)
4. `grep -c 'data-reveal-delay="0"' index.html` → returns 1
5. `grep -c 'data-reveal-delay="100"' index.html` → returns 1
6. `grep -c 'data-reveal-delay="200"' index.html` → returns 1
</verification>

<success_criteria>
- LAY-02: At 1240px+ viewport, all three case study cards appear in a single row at equal width
- ANIM-03: Scrolling to the case studies section triggers staggered card entrance — each card fades and translates up 20px with 100ms offset between cards
- Reduced motion: Cards are immediately visible at full opacity under `prefers-reduced-motion: reduce` (handled by existing `_reveal.css` guard — no additional work needed)
</success_criteria>

<output>
Create `.planning/phases/04-cards-homepage/04-02-SUMMARY.md` when done.
</output>
