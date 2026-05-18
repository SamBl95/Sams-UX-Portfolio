---
phase: 07-footer-global-audit
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/3-components/_footer.css
  - src/styles/3-components/_nav.css
autonomous: true
requirements:
  - ANIM-06
  - TOK-02

must_haves:
  truths:
    - "Footer links do not trigger hover color on touch devices"
    - "Hamburger bar gap uses a design token, not a raw pixel value"
  artifacts:
    - path: "src/styles/3-components/_footer.css"
      provides: "Footer hover guard wrapped in @media (hover: hover) and (pointer: fine)"
      contains: "@media (hover: hover) and (pointer: fine)"
    - path: "src/styles/3-components/_nav.css"
      provides: "Hamburger gap using var(--space-1) instead of 5px"
      contains: "gap: var(--space-1)"
  key_links:
    - from: "src/styles/3-components/_footer.css"
      to: "src/styles/3-components/_nav.css"
      via: "replication of established @media (hover: hover) and (pointer: fine) pattern"
      pattern: "hover: hover.*pointer: fine"
---

<objective>
Fix two correctness issues in existing CSS: wrap the footer hover rule in a touch-device guard, and replace the one raw-pixel spacing value in nav with its token equivalent.

Purpose: Both fixes close audit findings before the broader global audit in Wave 2.
Output: `_footer.css` hover rule properly guarded; `_nav.css` gap token-compliant.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/07-footer-global-audit/07-CONTEXT.md
@.planning/phases/07-footer-global-audit/07-RESEARCH.md

<interfaces>
From src/styles/3-components/_nav.css (established hover guard pattern — lines 167–171):
```css
@media (hover: hover) and (pointer: fine) {
  .nav__link:hover {
    color: var(--color-text-primary);
  }
}
```

From src/styles/3-components/_footer.css (current state — lines 71–81):
```css
.footer__link {
  font-size:       var(--text-sm);
  font-weight:     var(--font-weight-medium);
  color:           var(--color-text-secondary);
  text-decoration: none;
  transition:      color var(--transition-fast);
}

.footer__link:hover {
  color: var(--color-accent-accessible);
}
```

From src/styles/3-components/_nav.css (hamburger toggle — line 63):
```css
gap: 5px;   /* VIOLATION: not on 8pt token scale */
```

Design tokens:
  --space-1: 8px
  --color-accent-accessible: #4fd1a5
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Wrap footer hover rule in touch-device guard (per D-03)</name>
  <files>src/styles/3-components/_footer.css</files>
  <read_first>
    - src/styles/3-components/_footer.css — full file; note lines 79–81 (the bare .footer__link:hover block to wrap)
    - src/styles/3-components/_nav.css — lines 167–171 (the exact @media (hover: hover) and (pointer: fine) pattern to replicate)
  </read_first>
  <action>
    In `_footer.css`, locate the bare `.footer__link:hover` rule (currently lines 79–81). Remove it from its current position and replace it with the block below, placed at the same location in the file:

    ```
    @media (hover: hover) and (pointer: fine) {
      .footer__link:hover {
        color: var(--color-accent-accessible);
      }
    }
    ```

    The `.footer__link:focus-visible` rule immediately after (lines 83–87) must NOT be touched — focus states intentionally apply to all input methods. The base `.footer__link` transition (line 76, `transition: color var(--transition-fast)`) must NOT be touched — color-only transitions are exempt per D-05. Do not alter any other rule in the file.
  </action>
  <acceptance_criteria>
    - `grep -n "hover: hover" src/styles/3-components/_footer.css` returns exactly one match containing `@media (hover: hover) and (pointer: fine)`
    - `grep -n "\.footer__link:hover" src/styles/3-components/_footer.css` returns exactly one match, and that match is inside the `@media (hover: hover) and (pointer: fine)` block (not a bare top-level rule)
    - `grep -n "focus-visible" src/styles/3-components/_footer.css` still returns a match — the focus rule is unchanged
    - `grep -n "transition:.*color" src/styles/3-components/_footer.css` still returns a match — the base transition is unchanged
  </acceptance_criteria>
  <verify>
    <automated>grep -n "hover: hover" src/styles/3-components/_footer.css</automated>
  </verify>
  <done>`.footer__link:hover` is nested inside `@media (hover: hover) and (pointer: fine)`. Focus and transition rules are untouched.</done>
</task>

<task type="auto">
  <name>Task 2: Replace nav hamburger gap: 5px with var(--space-1) (per TOK-02)</name>
  <files>src/styles/3-components/_nav.css</files>
  <read_first>
    - src/styles/3-components/_nav.css — lines 58–75 (the .nav__toggle block containing gap: 5px on line 63)
  </read_first>
  <action>
    In `_nav.css`, locate the `.nav__toggle` rule block (approximately lines 59–74). Change line 63 from:

    ```
    gap: 5px;
    ```

    to:

    ```
    gap: var(--space-1);
    ```

    `--space-1` resolves to 8px. This widens the gap between the three hamburger bars from 5px to 8px — note this change for the visual spot-check in the verify step. Do not change any other property in `.nav__toggle` or any other rule in the file.
  </action>
  <acceptance_criteria>
    - `grep -n "gap: 5px" src/styles/3-components/_nav.css` returns zero matches
    - `grep -n "gap: var(--space-1)" src/styles/3-components/_nav.css` returns exactly one match inside the `.nav__toggle` block
    - `grep -n "gap:" src/styles/3-components/_nav.css` returns no instances of `gap: [0-9]px` (raw pixel gaps) — only token-based gaps remain
  </acceptance_criteria>
  <verify>
    <automated>grep -n "gap: 5px" src/styles/3-components/_nav.css</automated>
    <human-check>Open the site at a mobile viewport (< 600px) and toggle the hamburger menu. Confirm the three bars look visually correct — not too loose. If the 8px gap looks wrong, add a comment to the SUMMARY noting it should be revisited as a documented visual exception.</human-check>
  </verify>
  <done>`gap: var(--space-1)` replaces `gap: 5px` in `.nav__toggle`. No raw pixel gaps remain in `_nav.css` (excluding border-width, outline-offset, and decorative fixed heights which are structural, not spacing).</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| None | This plan makes only CSS property changes — no user input, no network calls, no data storage |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-07-01-SC | Tampering | npm/pip/cargo installs | accept | No package installs in this plan — pure CSS file edits only |

No attack surface introduced. CSS changes affect only visual presentation in the browser.
</threat_model>

<verification>
Run after both tasks complete:

```bash
# Task 1: Footer hover guard present
grep -n "hover: hover" src/styles/3-components/_footer.css

# Task 1: No bare top-level footer hover rule
grep -n "^\.footer__link:hover" src/styles/3-components/_footer.css

# Task 2: Raw gap value removed
grep -n "gap: 5px" src/styles/3-components/_nav.css

# Task 2: Token gap present
grep -n "gap: var(--space-1)" src/styles/3-components/_nav.css
```

Expected: first two return match / zero-matches respectively; last two return zero / one match respectively.
</verification>

<success_criteria>
- `_footer.css` contains `@media (hover: hover) and (pointer: fine)` wrapping `.footer__link:hover`
- `_footer.css` has no bare top-level `.footer__link:hover` rule
- `_nav.css` contains `gap: var(--space-1)` in `.nav__toggle` — zero instances of `gap: 5px`
- `_footer.css` focus-visible and transition rules are unchanged
</success_criteria>

<output>
Create `.planning/phases/07-footer-global-audit/07-01-SUMMARY.md` when done.
</output>
