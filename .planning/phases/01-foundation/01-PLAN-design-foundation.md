---
phase: 01-foundation
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/1-settings/_variables.css
  - src/styles/2-base/_typography.css
  - src/styles/3-components/_hero.css
autonomous: false
requirements:
  - AUDIT-03
user_setup: []
tags:
  - css
  - design-tokens
  - typography

must_haves:
  truths:
    - "Site renders with warm off-white background (#f5f2ed) on every page — no dark forest green visible anywhere"
    - "Deep teal accent (#1a6b52) appears on CTA buttons, focus rings, and accent text — meets WCAG AA contrast on light bg"
    - "h1 weight is 600 semibold, not 700 bold — visible on hero headline and page h1s"
    - "h1 mobile size is 40px (--text-40), not 36px (--text-4xl) — matches UI-SPEC Display role"
    - "No hex values exist outside _variables.css"
  artifacts:
    - path: "src/styles/1-settings/_variables.css"
      provides: "Light palette colour tokens"
      contains: "--color-bg: #f5f2ed"
    - path: "src/styles/2-base/_typography.css"
      provides: "h1 weight + responsive sizing aligned to UI-SPEC Display role"
      contains: "--font-weight-semibold"
    - path: "src/styles/3-components/_hero.css"
      provides: ".hero__headline weight aligned to Display role"
      contains: "--font-weight-semibold"
  key_links:
    - from: "src/styles/1-settings/_variables.css"
      to: "every component CSS file (via var(--color-*))"
      via: "CSS custom property cascade"
      pattern: "var\\(--color-(bg|surface|border|text-primary|text-secondary|accent|accent-accessible|text-on-accent|accent-light)\\)"
    - from: "src/styles/2-base/_typography.css h1 rule"
      to: "every page h1 element"
      via: "element selector cascade"
      pattern: "h1 \\{[^}]*--font-weight-semibold"
---

<objective>
Replace the dark forest green palette with the locked light palette (D-13, UI-SPEC) by swapping ten values in `_variables.css`. Correct the typography application (D-14, UI-SPEC) so h1/h2 use `--font-weight-semibold` (600) instead of bold (700), and the responsive h1 scale matches the UI-SPEC Display role (40 → 56 → 64 → 80, capped at 80px). Update the single `.hero__headline` weight override in `_hero.css` so the hero matches the new heading weight.

Purpose: Establishes the colour and typography foundation that every other plan in this phase inherits via the token cascade. No component CSS edits are needed — all components consume `var(--color-*)` and weight tokens. This is the first vertical slice: a recruiter looking at the existing pages immediately sees the new design language before any structural work begins.

Output: Three modified CSS files; the entire existing site (homepage, about, three case studies) re-renders on the new palette with intentional heading weights and sizing.
</objective>

<execution_context>
@.claude/get-shit-done/workflows/execute-plan.md
@.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation/01-CONTEXT.md
@.planning/phases/01-foundation/01-UI-SPEC.md
@.planning/phases/01-foundation/01-RESEARCH.md
@.planning/phases/01-foundation/01-PATTERNS.md
@.planning/phases/01-foundation/01-SKELETON.md
@CLAUDE.md
@.claude/CLAUDE.md

<interfaces>
<!-- Token names that consumer CSS files reference. Do NOT rename these tokens — -->
<!-- only change their VALUES. Renaming would break every component file. -->

Colour tokens (in _variables.css, consumed throughout 3-components/):
- --color-bg
- --color-surface
- --color-border
- --color-text-primary
- --color-text-secondary
- --color-accent
- --color-accent-accessible
- --color-text-on-accent
- --color-accent-light
- --shadow-accent

Weight tokens (in _variables.css, do not change):
- --font-weight-normal: 400
- --font-weight-medium: 500
- --font-weight-semibold: 600
- --font-weight-bold: 700  (still defined; just no longer applied to h1/h2/.hero__headline)

Size tokens already defined in _variables.css (do not add new ones):
- --text-4xl: 2.25rem (36px)  — currently applied to h1 mobile, to be replaced
- --text-5xl: 3rem (48px)     — currently applied to h1 at 600px, to be replaced
- --text-40: 2.5rem (40px)    — UI-SPEC target for h1 mobile
- --text-56: 3.5rem (56px)    — UI-SPEC target for h1 at 600px
- --text-64: 4rem (64px)      — already applied at 905px, keep
- --text-80: 5rem (80px)      — already applied at 1240px, keep (this is now the cap)
- --text-96: 6rem (96px)      — currently applied at 1440px h1, to be REMOVED from h1 rule
</interfaces>
</context>

<security_notes>
Tier: CSS-only — no executable code paths, no user input, no auth, no network calls.
ASVS L1: not applicable to design token edits (V14 covers configuration; the rule "no hex values outside `_variables.css`" is the only relevant control and is preserved — all hex values continue to live exclusively in `_variables.css`).
Supply chain: no new packages installed in this plan.
</security_notes>

<tasks>

<task type="auto">
  <name>Task 1: Swap dark palette tokens to light palette in _variables.css</name>
  <files>src/styles/1-settings/_variables.css</files>

  <read_first>
    - src/styles/1-settings/_variables.css (the file being modified — see current colour block at lines 17–25 and shadow at line ~119)
    - .planning/phases/01-foundation/01-UI-SPEC.md (locked colour values, "Colour Palette — Light Theme" section)
    - .planning/phases/01-foundation/01-PATTERNS.md (token-by-token before→after table under `src/styles/1-settings/_variables.css`)
    - .planning/phases/01-foundation/01-RESEARCH.md (Pattern 3 Colour Token Swap — full before/after table)
  </read_first>

  <action>
    Replace exactly nine colour token values and one shadow token value in `src/styles/1-settings/_variables.css`. Do not add, remove, rename, or reorder any tokens. Do not touch any other token (spacing, type, weight, radius, transition). Update the existing colour comment block above the colour tokens so it reads as the light palette, not the dark forest theme. The exact target values, taken verbatim from the approved UI-SPEC:

    - `--color-bg`: #f5f2ed
    - `--color-surface`: #ede9e3
    - `--color-border`: #d6d0c8
    - `--color-text-primary`: #1a1614
    - `--color-text-secondary`: #6b6560
    - `--color-accent`: #1a6b52
    - `--color-accent-accessible`: #1a6b52
    - `--color-text-on-accent`: #f5f2ed
    - `--color-accent-light`: #e6f0ec
    - `--shadow-accent`: 0 8px 24px -4px rgb(26 107 82 / 0.18)

    The colour comment block currently labels the palette as the dark forest theme. Replace its body so it correctly describes the light palette per D-13 (warm-neutral off-white base; `--color-accent-accessible` mirrors `--color-accent` because the deep teal is dark enough to clear 4.5:1 contrast against the off-white background; `--color-text-on-accent` is warm white for text sitting on a teal-filled surface).

    Do NOT edit any component CSS file in this task — all `.btn__*`, `.nav__*`, `.card__*` and so on consume these tokens via `var()` and will pick up the new values automatically.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -E "^\s*--color-(bg|surface|border|text-primary|text-secondary|accent|accent-accessible|text-on-accent|accent-light)\s*:" src/styles/1-settings/_variables.css | grep -E "(#f5f2ed|#ede9e3|#d6d0c8|#1a1614|#6b6560|#1a6b52|#f5f2ed|#e6f0ec)"</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "0d1f1a\|152b24\|1e3d32\|f0ede6\|9db5ac\|4fd1a5\|071210\|1a3d30" src/styles/1-settings/_variables.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "shadow-accent" src/styles/1-settings/_variables.css</automated>
  </verify>

  <acceptance_criteria>
    - `src/styles/1-settings/_variables.css` contains the literal string `--color-bg:                #f5f2ed` (or equivalent spacing) for `--color-bg`
    - `src/styles/1-settings/_variables.css` contains `--color-accent: #1a6b52` and `--color-accent-accessible: #1a6b52`
    - `src/styles/1-settings/_variables.css` contains `--color-text-on-accent: #f5f2ed`
    - `src/styles/1-settings/_variables.css` contains `--color-accent-light: #e6f0ec`
    - `src/styles/1-settings/_variables.css` contains `--shadow-accent: 0 8px 24px -4px rgb(26 107 82 / 0.18)` (whitespace may differ)
    - Grep for any of `#0d1f1a`, `#152b24`, `#1e3d32`, `#f0ede6`, `#9db5ac`, `#4fd1a5`, `#071210`, `#1a3d30`, `79 209 165` in `src/styles/1-settings/_variables.css` returns zero matches
    - No other token in `_variables.css` has changed (spacing, type-size, weight, radius, transition, ease all preserved verbatim)
    - Grep for hex values (`#[0-9a-fA-F]{3,6}`) across `src/styles/3-components/**/*.css` and `src/styles/2-base/**/*.css` and `src/styles/4-layouts/**/*.css` returns zero matches — confirming no hex leaked outside `_variables.css`
  </acceptance_criteria>

  <done>
    Ten token values swapped; no other tokens or files touched; grep confirms zero dark-palette hex strings remain anywhere in `src/styles/`.
  </done>
</task>

<task type="auto">
  <name>Task 2: Correct h1/h2 weight and h1 responsive scale in _typography.css; update .hero__headline weight in _hero.css</name>
  <files>src/styles/2-base/_typography.css, src/styles/3-components/_hero.css</files>

  <read_first>
    - src/styles/2-base/_typography.css (the file being modified — h1 rule near line 22/24, h2 rule near line 33, 600px breakpoint h1 near line 88, 1440px block near lines 116–121)
    - src/styles/3-components/_hero.css (the file being modified — `.hero__headline` weight near line 92)
    - .planning/phases/01-foundation/01-UI-SPEC.md (Typography section: 4 semantic roles, 2 weights — Display h1 at 40 → 56 → 64 → 80, no 96px step)
    - .planning/phases/01-foundation/01-PATTERNS.md (`_typography.css` 3 targeted edits + `_hero.css` `.hero__headline` change)
    - .planning/phases/01-foundation/01-RESEARCH.md (Pattern 4 Typography Weight Correction — full specification of what to change and why)
  </read_first>

  <action>
    Make these exact changes — no other rules in `_typography.css` or `_hero.css` are touched.

    In `src/styles/2-base/_typography.css`:
    1. Base `h1` element rule: change `font-weight: var(--font-weight-bold)` to `font-weight: var(--font-weight-semibold)`. Keep all other h1 properties (font-family, line-height, letter-spacing) exactly as they are.
    2. Base `h1` element rule: change `font-size: var(--text-4xl)` to `font-size: var(--text-40)`. This is the mobile starting size for the Display role.
    3. Base `h2` element rule: change `font-weight: var(--font-weight-bold)` to `font-weight: var(--font-weight-semibold)`.
    4. Inside the `@media (min-width: 600px)` block, change `h1 { font-size: var(--text-5xl); }` to `h1 { font-size: var(--text-56); }`.
    5. Inside the `@media (min-width: 1440px)` block, REMOVE the `h1 { font-size: var(--text-96); }` line entirely so h1 stops scaling at `--text-80` (which is set in the 1240px block and stays). Keep the h2, h3, h4, p rules inside that 1440px block exactly as they are.
    6. Leave every other rule in this file untouched — h3, h4, p, a, strong, blockquote, ul, ol, code, etc. all keep their current properties.

    In `src/styles/3-components/_hero.css`:
    1. In the `.hero__headline` rule (near line 92), change `font-weight: var(--font-weight-bold)` to `font-weight: var(--font-weight-semibold)`. Do not touch any other property in `.hero__headline` or any other selector in `_hero.css`.

    Rationale: the UI-SPEC locks the Display and Heading roles to `--font-weight-semibold` 600 and caps h1 at `--text-80` (80px) from 1240px upward. The pre-existing 700 + 96px treatment overshoots the intentional editorial restraint described in D-14.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -nE "^\s*h1\s*\{|^\s*h2\s*\{" src/styles/2-base/_typography.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "font-weight: var(--font-weight-bold)" src/styles/2-base/_typography.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -nE "var\(--text-40\)|var\(--text-56\)" src/styles/2-base/_typography.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "var(--text-96)" src/styles/2-base/_typography.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "font-weight: var(--font-weight-bold)" src/styles/3-components/_hero.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "hero__headline" src/styles/3-components/_hero.css</automated>
  </verify>

  <acceptance_criteria>
    - The base `h1` element rule in `src/styles/2-base/_typography.css` contains `font-weight: var(--font-weight-semibold)` and `font-size: var(--text-40)`
    - The base `h2` element rule in `src/styles/2-base/_typography.css` contains `font-weight: var(--font-weight-semibold)`
    - Grep for `font-weight: var(--font-weight-bold)` in `src/styles/2-base/_typography.css` returns zero matches (no h1/h2/other element uses bold)
    - The 600px breakpoint media query in `src/styles/2-base/_typography.css` sets h1 to `var(--text-56)` — `grep -A1 "min-width: 600px" src/styles/2-base/_typography.css` shows `h1 { font-size: var(--text-56); }`
    - Grep for `var(--text-96)` in `src/styles/2-base/_typography.css` returns zero matches (96px h1 step removed)
    - The 1440px media query block still contains h2/h3/h4/p rules (count of `font-size:` declarations inside that block ≥ 4)
    - In `src/styles/3-components/_hero.css`, the `.hero__headline` rule contains `font-weight: var(--font-weight-semibold)` and grep for `font-weight: var(--font-weight-bold)` in that file returns zero matches
    - No other rules in `_typography.css` or `_hero.css` differ from their pre-edit state (line count delta ≤ 2 lines for `_typography.css` — three property edits plus one removed line; line count delta = 0 for `_hero.css` — one weight token replaced)
  </acceptance_criteria>

  <done>
    `_typography.css` h1/h2 use `--font-weight-semibold`; h1 sizes are 40 → 56 → 64 → 80 across breakpoints with no 96px step; `.hero__headline` weight is `--font-weight-semibold`; no other rules altered.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Visual verification — light palette and typography weight render correctly</name>
  <what-built>
    Light palette applied via 10 token swaps in `_variables.css`. h1/h2 weight corrected to semibold (600) in `_typography.css`, h1 mobile starting size lifted to 40px and 96px step removed. `.hero__headline` weight corrected in `_hero.css` to match. No component CSS was edited — components inherit colour and weight via tokens.
  </what-built>
  <how-to-verify>
    1. Run the dev server from the project root: `npm run dev`
    2. Visit `http://localhost:5173/` (homepage) and confirm:
       - Page background is warm off-white (cream), not dark green
       - Hero headline is dark and uses semibold weight (600) — not heavy bold (700). At desktop width the headline should look intentional and editorial, not chunky.
       - Primary CTA button "See my work" has a deep teal fill (`#1a6b52`) with warm white text — readable and high contrast
       - "Get in touch" secondary button has teal text on the light background
       - Case study cards have a slightly deeper cream surface than the page background, with subtle warm borders
    3. Visit `http://localhost:5173/src/pages/about.html` and confirm:
       - Same palette throughout
       - Page h1 is semibold, not bold
    4. Visit `http://localhost:5173/src/pages/case-studies/cassi.html` and confirm:
       - Palette is consistent
       - Stat blocks, body text, and accents follow the light theme
    5. Resize the browser:
       - Below 600px: hero h1 looks reasonable for mobile (around 40px — not the previous 36px)
       - At 600–905px: hero h1 steps up to ~56px (previously ~48px)
       - At 1240px+: hero h1 caps at ~80px and does not grow further when expanding to 1440px+ (previously stepped to 96px at 1440px)
    6. Spot-check focus rings: tab through the hero CTAs and the nav links — the focus ring should be deep teal `#1a6b52`, clearly visible against the cream background.
    7. Spot-check that no element looks unintentionally illegible (e.g. teal text on the pale teal accent-light tint, or warm-white text on light surfaces). If anything looks broken, note it precisely (selector + page + expected vs actual) before approving.
  </how-to-verify>
  <resume-signal>Type "approved" if the palette, weights, and responsive h1 scale render as described — or describe any rendering issue (page, selector, expected vs actual) for follow-up.</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| (none) | Plan touches only CSS files in `src/styles/`. No user input, no API, no auth, no network. |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-DT-01 | Tampering | `_variables.css` token values | accept | Values sourced verbatim from approved UI-SPEC. Visual checkpoint (Task 3) verifies render. No automated downstream consumer beyond the user's browser. |
| T-01-DT-02 | Information Disclosure | CSS in repo | accept | All tokens (colours, sizes) are non-sensitive design metadata — public-facing by design. |
| T-01-DT-03 | Denial of Service | CSS payload size | accept | Net change: ~10 token values swapped + ~6 lines edited. Payload delta is negligible. |
</threat_model>

<verification>
- All grep-based automated checks in Tasks 1 and 2 pass
- Manual visual verification in Task 3 approved by user
- No file outside `src/styles/1-settings/_variables.css`, `src/styles/2-base/_typography.css`, `src/styles/3-components/_hero.css` is modified by this plan
- No hex value appears outside `src/styles/1-settings/_variables.css` anywhere in the repo
</verification>

<success_criteria>
- AUDIT-03 (partial — colour and weight half): `_variables.css` is the single source of all colour values; no hex outside it. Spacing tokens unchanged.
- D-13 satisfied: dark palette fully replaced with light palette per UI-SPEC.
- D-14 satisfied: typography weight + responsive scale corrected per UI-SPEC Display/Heading roles; Fraunces and Urbanist remain.
- Foundation visually settled — Plans 02, 03, 04 can build structural work on top without re-litigating colour or type.
</success_criteria>

<output>
Create `.planning/phases/01-foundation/01-01-SUMMARY.md` when done. Summary must record:
- Tokens swapped (list with before → after)
- Files modified (3)
- Visual checkpoint outcome (approved / issues found)
- Any deviations from the UI-SPEC (expected: none)
</output>
