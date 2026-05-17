---
phase: 03-first-impression
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/3-components/_hero.css
  - src/styles/1-settings/_variables.css
autonomous: true
requirements:
  - ANIM-02
  - LAY-01

must_haves:
  truths:
    - ".hero__eyebrow has animation-delay 0ms and .hero__actions has animation-delay 320ms in _hero.css"
    - ".hero__typewriter is a named target in the stagger selector group in _hero.css"
    - "animation shorthand uses var(--ease-out-quint) not a hardcoded cubic-bezier"
    - "--hero-content-max-width token exists in _variables.css"
    - ".hero__content has max-width rule inside a min-width: 1440px media query in _hero.css"
  artifacts:
    - path: src/styles/3-components/_hero.css
      contains: "animation-delay: 320ms"
    - path: src/styles/3-components/_hero.css
      contains: "--ease-out-quint"
    - path: src/styles/3-components/_hero.css
      contains: "--hero-content-max-width"
    - path: src/styles/1-settings/_variables.css
      contains: "--hero-content-max-width"
  key_links:
    - from: _hero.css
      to: _variables.css
      via: "var(--hero-content-max-width)"
      pattern: "var\\(--hero-content-max-width\\)"
    - from: _hero.css
      to: _variables.css
      via: "var(--ease-out-quint)"
      pattern: "var\\(--ease-out-quint\\)"
---

<objective>
Update the hero entrance stagger to 5 elements at 80ms steps with --ease-out-quint token, and add the --hero-content-max-width layout constraint for ultra-wide screens.

Purpose: Delivers ANIM-02 (correct stagger timing, correct element count, token easing) and LAY-01 (hero content column constraint at 1440px+) — the two hero-side requirements for Phase 3.
Output: _hero.css with 5-element stagger and 1440px max-width rule; _variables.css with --hero-content-max-width token.
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
<!-- Current stagger block in _hero.css (lines 64–75) — replace entirely for ANIM-02 -->
From src/styles/3-components/_hero.css (CURRENT — to be replaced):
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

<!-- .hero__content block in _hero.css (lines 57–62) — append max-width for LAY-01 -->
From src/styles/3-components/_hero.css (CURRENT):
```css
.hero__content {
  display:        flex;
  flex-direction: column;
  align-items:    flex-start;
  width:          100%;
}
```

<!-- Component tokens block in _variables.css (lines 106–107) — add token for LAY-01 -->
From src/styles/1-settings/_variables.css (CURRENT):
```css
  /* Component tokens — semantic values outside the 8pt scale */
  --nav-height: 56px;   /* nav bar height; also used for mobile menu top offset */
```

<!-- Keyframe in _hero.css — keep unchanged -->
From src/styles/3-components/_hero.css (lines 14–23, DO NOT MODIFY):
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

<!-- .hero__typewriter rule — preserve display: block -->
From src/styles/3-components/_hero.css (line 133):
.hero__typewriter already has display: block — this is required for transform animation on inline elements. Do NOT remove it.

<!-- Phase 2 easing token — confirmed available -->
From src/styles/1-settings/_variables.css (line 139):
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update hero entrance stagger to 5 elements at 80ms steps with token easing (ANIM-02)</name>
  <files>src/styles/3-components/_hero.css</files>
  <read_first>
    Read src/styles/3-components/_hero.css in full before editing. Locate the stagger block at lines 64–75 (the selector group beginning ".hero__eyebrow, .hero__headline"). Also confirm line 133 still has display: block on .hero__typewriter — do not modify it.
  </read_first>
  <action>
    Replace the stagger block (the selector group + four animation-delay rules) with the 5-element version. The new selector group adds .hero__typewriter between .hero__headline and .hero__subheadline. The animation shorthand changes from `0.6s cubic-bezier(0.22, 1, 0.36, 1)` to `600ms var(--ease-out-quint)`. The five delay values are: .hero__eyebrow 0ms, .hero__headline 80ms, .hero__typewriter 160ms, .hero__subheadline 240ms, .hero__actions 320ms. The `both` fill-mode keyword in the shorthand is kept — do NOT change it to `forwards`. Do NOT animate .hero__typewriter-text or .hero__typewriter-cursor — they are inline spans inside .hero__typewriter and adding animation there would double-animate. The @keyframes hero-enter block is untouched.
  </action>
  <verify>
    <automated>grep -c "animation-delay: 320ms" src/styles/3-components/_hero.css</automated>
    <automated>grep -c "hero__typewriter" src/styles/3-components/_hero.css</automated>
    <automated>grep -c "var(--ease-out-quint)" src/styles/3-components/_hero.css</automated>
    <automated>grep -c "cubic-bezier(0.22" src/styles/3-components/_hero.css</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "animation-delay: 320ms" src/styles/3-components/_hero.css` returns 1
    - `grep -c "hero__typewriter" src/styles/3-components/_hero.css` returns at least 2 (one in selector group, one for delay rule)
    - `grep -c "var(--ease-out-quint)" src/styles/3-components/_hero.css` returns at least 1
    - `grep -c "cubic-bezier(0.22" src/styles/3-components/_hero.css` returns 0 (hardcoded cubic-bezier replaced by token)
    - `grep -c "animation-delay: 180ms" src/styles/3-components/_hero.css` returns 0 (old 60ms-step delays gone)
    - `grep -c "display: block" src/styles/3-components/_hero.css` returns at least 1 (display:block on .hero__typewriter preserved)
  </acceptance_criteria>
  <done>
    Hero stagger covers 5 elements (eyebrow, headline, typewriter, subheadline, actions) with delays 0/80/160/240/320ms using var(--ease-out-quint). Old 4-element 60ms-step stagger is removed. animation-fill-mode: both retained via shorthand.
  </done>
</task>

<task type="auto">
  <name>Task 2: Add --hero-content-max-width token and apply 1440px hero layout constraint (LAY-01)</name>
  <files>src/styles/1-settings/_variables.css, src/styles/3-components/_hero.css</files>
  <read_first>
    Read src/styles/1-settings/_variables.css lines 104–115 to locate the "Component tokens" comment and the --nav-height line. Read src/styles/3-components/_hero.css lines 55–65 to see the full .hero__content rule and what follows it. Check whether a @media (min-width: 1440px) block already exists in the hero file — if so, add to it rather than creating a duplicate.
  </read_first>
  <action>
    In _variables.css: Add `--hero-content-max-width: 860px;` on the line immediately after `--nav-height: 56px;` in the "Component tokens" block. Include the comment `/* hero content column constraint at 1440px+ */` on the same line. Do not touch any other token.

    In _hero.css: After the .hero__content rule block (the flex column block), add a new media query:
    ```
    @media (min-width: 1440px) {
      .hero__content {
        max-width: var(--hero-content-max-width); /* 860px */
        margin-inline: 0; /* left-align within the container — no centering */
      }
    }
    ```
    If a @media (min-width: 1440px) block already exists in _hero.css, add the .hero__content rule inside it rather than creating a second 1440px block. Use `margin-inline: 0` not `margin: 0 auto` — the hero content is left-aligned by design (flex-start), centering it would conflict with the existing layout. Do NOT add a margin-inline: auto or margin: auto rule.
  </action>
  <verify>
    <automated>grep -c "\-\-hero-content-max-width" src/styles/1-settings/_variables.css</automated>
    <automated>grep -c "\-\-hero-content-max-width" src/styles/3-components/_hero.css</automated>
    <automated>grep -c "1440px" src/styles/3-components/_hero.css</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "\-\-hero-content-max-width" src/styles/1-settings/_variables.css` returns 1
    - `grep -c "\-\-hero-content-max-width" src/styles/3-components/_hero.css` returns 1
    - `grep -c "1440px" src/styles/3-components/_hero.css` returns at least 1
    - `grep -c "860px" src/styles/1-settings/_variables.css` returns 1 (token value present, not hardcoded in _hero.css)
    - `grep -c "860px" src/styles/3-components/_hero.css` returns 0 (860px only in _variables.css, not hardcoded in hero file)
  </acceptance_criteria>
  <done>
    --hero-content-max-width: 860px token exists in _variables.css. _hero.css applies max-width: var(--hero-content-max-width) to .hero__content inside a min-width: 1440px media query. No hardcoded 860px value in _hero.css.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| CSS rendering | Browser consumes _hero.css and _variables.css — no user input crosses this boundary |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-03-01 | Tampering | CSS animation values | accept | Values are static CSS compiled at build time — no runtime user input; no injection surface |
| T-03-02 | Denial of Service | Large translateY animation | accept | 24px translateY + opacity — GPU-composited, zero layout-thrash risk; `animation-fill-mode: both` does not cause reflow |
| T-03-SC | Tampering | npm/pip/cargo installs | accept | This plan installs zero packages — no registry operations, no slopcheck needed |
</threat_model>

<verification>
After both tasks complete, verify end-to-end:

1. Token present: `grep "hero-content-max-width" src/styles/1-settings/_variables.css` — must return 1 match with value 860px
2. Token used: `grep "hero-content-max-width" src/styles/3-components/_hero.css` — must return 1 match inside a 1440px media query
3. Stagger correct: `grep "animation-delay" src/styles/3-components/_hero.css` — must return 5 lines (0ms, 80ms, 160ms, 240ms, 320ms)
4. Easing tokenised: `grep "cubic-bezier" src/styles/3-components/_hero.css` — must return 0 in the stagger block (only the @keyframes may have none; the animation shorthand uses var(--ease-out-quint))
5. Typewriter in stagger: `grep "hero__typewriter" src/styles/3-components/_hero.css` — must return at least 2 matches (selector group + delay rule)
6. display:block preserved: `grep "display: block" src/styles/3-components/_hero.css` — must return at least 1 match
</verification>

<success_criteria>
- ANIM-02: 5 hero elements stagger in on page load at 0/80/160/240/320ms delays using var(--ease-out-quint), animation-fill-mode: both
- LAY-01: At 1440px+ viewport, .hero__content stops at 860px width (verified by --hero-content-max-width token)
- Zero hardcoded cubic-bezier values remain in the stagger block
- Zero hardcoded 860px values appear in _hero.css (token-only)
- @keyframes hero-enter unchanged (translateY 24px, opacity 0→1)
</success_criteria>

<output>
Create .planning/phases/03-first-impression/03-01-SUMMARY.md when done.
</output>
