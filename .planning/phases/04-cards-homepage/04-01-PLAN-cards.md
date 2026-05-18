---
phase: 04-cards-homepage
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/3-components/_card.css
autonomous: true
requirements:
  - COMP-01
  - COMP-02
  - COMP-03
  - COMP-04
  - COMP-05
  - TOK-01

must_haves:
  truths:
    - "Card metric values render in Fraunces — display numbers look heading-class, not body-class"
    - "Card hover uses a translucent state-layer overlay, not a background-color swap"
    - "Link arrow translates 8px right when the whole card is hovered, not just the button"
    - "Pressing a card produces scale(0.97) feedback consistent with button press"
    - "Card hover is only triggered on devices with a true pointer (no ghost hover on touch)"
    - "Card box-shadow uses current dark-palette alpha values, not the stale light-palette value"
  artifacts:
    - path: "src/styles/3-components/_card.css"
      provides: "Fully audited card component CSS"
      contains: ".card::after"
  key_links:
    - from: "src/styles/3-components/_card.css"
      to: "src/styles/3-components/_reveal.css"
      via: "State-layer ::after pattern copied from documented block at _reveal.css lines 71-98"
      pattern: "\\.card::after"
    - from: ".card:hover .card__link-arrow"
      to: ".card__link-arrow"
      via: "Selector change from .btn--ghost:hover to .card:hover"
      pattern: "\\.card:hover \\.card__link-arrow"
---

<objective>
Audit and fix all five card component requirements: metric font (COMP-01), state-layer hover overlay (COMP-02), link arrow trigger scope (COMP-03), active press scale (COMP-04), hover media query gate (COMP-05), and the stale box-shadow token (TOK-01).

Purpose: Cards are the primary conversion surface — a recruiter decides whether to click a case study based on how the card feels. Intentional hover, correct typography, and consistent press feedback make the component feel premium.
Output: `src/styles/3-components/_card.css` with all six issues resolved.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/04-cards-homepage/04-UI-SPEC.md

<interfaces>
<!-- Key declarations the executor must know before editing _card.css. -->

From src/styles/3-components/_card.css (current state):

.card { transition: border-color, box-shadow, background-color, transform 200ms var(--ease-in-out); }
@media (hover: hover) { .card:hover { background-color: var(--color-surface); border-color: var(--color-accent); box-shadow: 0 24px 48px -12px rgb(0 0 0 / 0.08), 0 0 32px -8px rgb(26 107 82 / 0.14); } }
.card__metric-value { font-size: var(--text-3xl); font-weight: var(--font-weight-bold); /* NO font-family declaration */ }
.card__link-arrow { transition: transform 150ms var(--ease-out); }
@media (hover: hover) and (pointer: fine) { .btn--ghost:hover .card__link-arrow { transform: translateX(var(--space-1)); } }

From src/styles/3-components/_reveal.css (state-layer template, lines 71-98):
Pattern to adapt:
  .card { position: relative; }
  .card::after { content: ''; position: absolute; inset: 0; border-radius: inherit;
    background-color: var(--color-text-primary); opacity: 0;
    transition: opacity 150ms var(--ease-out); pointer-events: none; }
  @media (hover: hover) and (pointer: fine) { .card:hover::after { opacity: 0.08; } }
  .card:active::after { opacity: 0.12; }
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: COMP-01 + TOK-01 — Metric font and box-shadow token fix</name>
  <files>src/styles/3-components/_card.css</files>
  <read_first>
    - src/styles/3-components/_card.css (full file — see current state of .card__metric-value and .card:hover box-shadow)
    - .planning/phases/04-cards-homepage/04-UI-SPEC.md (Typography section: COMP-01 contract; Color section: TOK-01 fix)
  </read_first>
  <action>
    In `_card.css`:

    1. COMP-01 — Add `font-family: var(--font-heading)` to `.card__metric-value`. Insert after the existing `font-size` declaration. No other properties on this selector change.

    2. TOK-01 — In the `.card:hover` box-shadow declaration, replace the stale value `rgb(26 107 82 / 0.14)` with `rgb(79 209 165 / 0.10)` (accent glow for dark palette). The ambient shadow layer `rgb(0 0 0 / 0.08)` is already correct — leave it untouched.

    These are two isolated property additions with no structural changes to the file.
  </action>
  <verify>
    <automated>grep -n "font-family" C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/src/styles/3-components/_card.css</automated>
  </verify>
  <acceptance_criteria>
    - `_card.css` contains `.card__metric-value` block with `font-family: var(--font-heading)`
    - `_card.css` box-shadow on `.card:hover` contains `rgb(79 209 165 / 0.10)` — no occurrence of `rgb(26 107 82` remains in the file
  </acceptance_criteria>
  <done>`.card__metric-value` declares Fraunces via `--font-heading`; stale box-shadow value replaced with dark-palette accent glow.</done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: COMP-02 + COMP-04 + COMP-05 — State-layer hover, active press, and media query gate</name>
  <files>src/styles/3-components/_card.css</files>
  <read_first>
    - src/styles/3-components/_card.css (full file — current hover block, transition list, position property)
    - src/styles/3-components/_reveal.css (lines 71-98 — state-layer template to adapt)
    - .planning/phases/04-cards-homepage/04-UI-SPEC.md (Interaction Contract: COMP-02, COMP-04, COMP-05; Reduced Motion Contract)
  </read_first>
  <action>
    In `_card.css`, make the following changes in this order:

    1. COMP-05 — Change the existing `@media (hover: hover)` wrapper around `.card:hover` to `@media (hover: hover) and (pointer: fine)`. No other change to this block yet.

    2. COMP-02 — Add `position: relative` to the `.card` rule (after `overflow: hidden`). Then insert a new `::after` block immediately after the `.card` rule:

       ```
       .card::after {
         content:          '';
         position:         absolute;
         inset:            0;
         border-radius:    inherit;
         background-color: var(--color-text-primary);
         opacity:          0;
         transition:       opacity 150ms var(--ease-out);
         pointer-events:   none;
       }

       @media (hover: hover) and (pointer: fine) {
         .card:hover::after { opacity: 0.08; }
       }

       .card:active::after { opacity: 0.12; }
       ```

       Remove `background-color: var(--color-surface)` from the `.card:hover` block (state-layer replaces the bg swap). Retain `transform: translateY(-6px)` and `border-color: var(--color-accent)` in the hover block.

       Also remove `background-color` from the `.card` transition list — it is no longer needed. The transition list should retain `border-color`, `box-shadow`, and `transform`.

    3. COMP-04 — Add `.card:active { transform: scale(0.97); }` after the `::after` active block. This uses the existing `transform` transition declared on `.card`.

    4. Reduced motion — Add at the end of the hover/interaction section:
       ```
       @media (prefers-reduced-motion: reduce) {
         .card,
         .card::after {
           transition: none;
         }
       }
       ```

    Do not use fenced code blocks in this action — the snippets above are reference patterns. Emit each block as standalone CSS in the correct ITCSS position within the existing file structure.
  </action>
  <verify>
    <automated>grep -n "pointer: fine\|::after\|scale(0.97)\|prefers-reduced-motion" C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/src/styles/3-components/_card.css</automated>
  </verify>
  <acceptance_criteria>
    - `_card.css` contains `@media (hover: hover) and (pointer: fine)` (not bare `@media (hover: hover)`) wrapping the `.card:hover` block
    - `_card.css` contains `.card::after {` block with `background-color: var(--color-text-primary)` and `opacity: 0`
    - `_card.css` contains `@media (hover: hover) and (pointer: fine)` block with `.card:hover::after { opacity: 0.08; }`
    - `_card.css` contains `.card:active::after { opacity: 0.12; }`
    - `_card.css` contains `.card:active { transform: scale(0.97); }`
    - `_card.css` does NOT contain `background-color: var(--color-surface)` in the hover block
    - `_card.css` contains `@media (prefers-reduced-motion: reduce)` block covering `.card` and `.card::after`
    - `.card` rule contains `position: relative`
  </acceptance_criteria>
  <done>State-layer ::after overlay replaces background swap; hover gate includes pointer: fine; press scale added; reduced-motion guard in place.</done>
</task>

<task type="auto" tdd="false">
  <name>Task 3: COMP-03 — Link arrow trigger on card hover</name>
  <files>src/styles/3-components/_card.css</files>
  <read_first>
    - src/styles/3-components/_card.css (lines 121-131 — existing .card__link-arrow and .btn--ghost:hover selector)
    - .planning/phases/04-cards-homepage/04-UI-SPEC.md (Interaction Contract: COMP-03)
  </read_first>
  <action>
    In `_card.css`, find the existing selector:

      `.btn--ghost:hover .card__link-arrow`

    Replace it with:

      `.card:hover .card__link-arrow`

    The media query wrapper `@media (hover: hover) and (pointer: fine)` is already correct on this block (Task 2 ensures COMP-05 is applied). The `transform: translateX(var(--space-1))` value and the `transition` on `.card__link-arrow` are unchanged.

    This is a single selector string replacement. No other properties change.
  </action>
  <verify>
    <automated>grep -n "card__link-arrow" C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/src/styles/3-components/_card.css</automated>
  </verify>
  <acceptance_criteria>
    - `_card.css` contains `.card:hover .card__link-arrow { transform: translateX(var(--space-1)); }` inside a `@media (hover: hover) and (pointer: fine)` block
    - `_card.css` does NOT contain `.btn--ghost:hover .card__link-arrow`
  </acceptance_criteria>
  <done>Link arrow translate fires on whole-card hover, not button hover only. Touch devices unaffected (pointer: fine gate).</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| CSS file edit | Planner modifies existing CSS file; no external input, no user data |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-04-01 | Tampering | `_card.css` | accept | CSS-only change; no executable code path; no user input vectors; no XSS surface |
| T-04-SC | Tampering | npm/pip/cargo installs | accept | No new packages installed in this plan — CSS edits only |
</threat_model>

<verification>
After all three tasks complete, run these checks against the final `_card.css`:

1. `grep -c "font-family: var(--font-heading)" src/styles/3-components/_card.css` → returns 1 (COMP-01)
2. `grep -c "rgb(26 107 82" src/styles/3-components/_card.css` → returns 0 (TOK-01 cleared)
3. `grep -c "pointer: fine" src/styles/3-components/_card.css` → returns at least 2 (hover gate + arrow gate)
4. `grep -c "\.card::after" src/styles/3-components/_card.css` → returns at least 1 (COMP-02)
5. `grep -c "scale(0.97)" src/styles/3-components/_card.css` → returns 1 (COMP-04)
6. `grep -c "\.card:hover \.card__link-arrow" src/styles/3-components/_card.css` → returns 1 (COMP-03)
7. `grep -c "prefers-reduced-motion" src/styles/3-components/_card.css` → returns at least 1 (reduced motion guard)
</verification>

<success_criteria>
- COMP-01: `.card__metric-value` renders in Fraunces on any modern browser
- COMP-02: Hovering a card shows translucent overlay tint, not a background-color jump
- COMP-03: Arrow translates right when any part of the card is hovered
- COMP-04: Pressing a card compresses to scale(0.97)
- COMP-05: No ghost hover state fires on touch devices
- TOK-01: No stale `rgb(26 107 82` value remains in `_card.css`
</success_criteria>

<output>
Create `.planning/phases/04-cards-homepage/04-01-SUMMARY.md` when done.
</output>
