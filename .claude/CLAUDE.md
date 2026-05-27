# Claude Code — Sam Blake Portfolio

## Project context
Product designer, 3 years. Sectors: fintech (Santander UK), retail (Matalan), property.
Target: hybrid/remote product design roles, North West England.
10 pages: Home, About, CV, Work, 3 case studies, Contact, Stories index, Stories post.

## Stack
- Vite MPA — all pages declared in `rollupOptions.input`
- Vanilla HTML + CSS only — no JS or CSS frameworks unless explicitly requested
- BEM · CSS custom properties · ITCSS architecture
- No inline styles · no CSS hex values outside `_variables.css` · no arbitrary spacing

## CSS architecture

ITCSS layers: `1-settings/` → `2-base/` → `3-components/` → `4-layouts/`
Import order must match `main.css`. Layout rules → `4-layouts/` only, never inside component files.
Mobile-first breakpoints: 600px · 905px · 1240px · 1440px. Append `@media` blocks in ascending order, never modify existing.

## Design tokens

All tokens in `src/styles/1-settings/_variables.css`. Spacing 8pt scale: `--space-1` (8px) through `--space-24` (192px). Type scale: `--text-xs` through `--text-5xl` plus extended `--text-22` through `--text-96`.

Colours:
```
--color-bg:                #f5f2ed   warm off-white
--color-surface:           #ede9e3   light raised surface
--color-border:            #d6d0c8   subtle warm border
--color-text-primary:      #1a1614   dark warm brown
--color-text-secondary:    #635e5a   muted warm grey — 4.5:1+ on surface
--color-text-nav:          #3d3a37   nav text
--color-accent:            #1a6b52   deep teal
--color-accent-accessible: #1a6b52   deep teal — 4.5:1+ on light bg
--color-text-on-accent:    #f5f2ed   text ON teal — 10:1 contrast
--color-accent-light:      #e6f0ec   light teal surface tint
```

Use `--color-accent-accessible` for accent foreground text and focus outlines.
Use `--color-text-on-accent` for text on teal backgrounds.

Semantic feedback tokens live in `src/styles/1-settings/_variables.css`:
- Success: `--color-feedback-success-bg/border/text`
- Error: `--color-feedback-error-bg/border/text`
- Warning: `--color-feedback-warning-bg/border/text`
- Attention: `--color-feedback-attention-bg/border/text`

Use these for validation, alerts, callouts, annotations, notifications, and status UI instead of one-off colours.

## Fonts
- `--font-heading` Fraunces — h1–h4 only, optical sizing enabled
- `--font-body` Urbanist — all body and UI text
- `--font-accent` Caveat — typewriter animation only, via `.hero__typewriter-text`

## Reference sites
- joependlebury.com — outcome-led hero, case study titles lead with result
- nicolearoberts.com — metric chip card pattern, named testimonials
- adamhickey.com — quality bar for visual finish and craft

## Skills to apply
- Design and aesthetics: `.agents/skills/frontend-design/SKILL.md`
- Animation and motion: `.agents/skills/web-animation-design/SKILL.md`
- UI polish and detail: `.agents/skills/emil-design-eng/SKILL.md`
- UI baseline quality: `.agents/skills/baseline-ui/SKILL.md`
- Planning: `.agents/skills/plan-mode/SKILL.md`

For design tasks apply `frontend-design` + `emil-design-eng` together.
For animation tasks apply `web-animation-design` + `emil-design-eng` together.
For new features apply `plan-mode` before writing code.

## Nav architecture

**Mobile (< 905px):** Bottom sheet (`div#nav-sheet.nav__sheet[role=dialog]`) slides up from `translateY(100%)`. Fixed `button.nav__toggle` top-right z-500. 2×3 tile grid in `.nav__grid`. Overlay dims at 50%. JS: `src/nav.js` `initNav()`. Z-index: overlay (300) → sheet (400) → toggle (500).

**Desktop (905px+):** `nav.nav__menu > ul.nav__list > li.nav__item > a.nav__link`. Active via `aria-current="page"` + `nav__link--active`. Underline via `::after` `scaleX(0→1)`. Toggle/sheet/overlay `display:none`.

## Adding a new page

1. Create `.html` under `src/pages/`. Use root-relative paths (`/src/...`) — never `../`.
2. Register in `vite.config.js` `rollupOptions.input`.
3. Set nav flag: `navAbout` · `navStories` · `navContact` · `navWork` — or `{{> nav}}` with no flag for Home/case studies.
4. Page-specific BEM → new `src/styles/3-components/_<page>.css`, import in `main.css`.

Never copy nav or footer markup inline — always use the partial.

## Key decisions

- **State-layer hover:** `position:relative` on parent; `::after` with `background-color: var(--color-text-primary); opacity:0`; 0.08 hover / 0.12 active; `pointer-events:none; border-radius:inherit`. Template in `_reveal.css`.
- **Hover gate:** always `@media (hover: hover) and (pointer: fine)` — never bare `(hover: hover)`.
- **animation-fill-mode: both** — covers pre-delay invisibility AND post-animation hold.
- **Transparent border reserve:** resting `.nav__link` has `border-bottom: 2px solid transparent` — prevents 2px height shift.
- **Passive scroll listener:** `{ passive: true }` + immediate `onScroll()` call after `addEventListener`.
- **og:image in `public/`** — Vite fingerprints `src/` assets, breaking stable og:image URL.
- **JSON-LD inline in page head only** — Handlebars partials fire on every page; schema on index + about only.
- **Web3Forms** for contact (no backend). FormSubmit was unreachable (HTTP 522).

## Case study rules

- **Copy:** never change without explicit user approval — show copy, wait for "approved".
- **Images:** never place without explicit per-section instruction.
- **Image sizing:** 60% centred (default) · 40% portrait · 45% each side-by-side · full-width for wide designs. 2x exports at half pixel max-width. `object-fit: contain`. `loading="lazy"`.
- **Image source dirs:** `public/assets/images/i-exchange/` · `public/assets/images/cassi/` · `public/assets/images/community/`

## Case study components

**Annotated image system:** `src/cs-annotated-image.js` + `_cs-annotated-image.css`
- Markup: `figure.cs-annotated-image > .cs-annotated-image__frame > img.cs-annotated-image__img + .cs-annotated-image__callout[data-pos][--positive/--negative] > button.cs-annotated-image__pin + .cs-annotated-image__tooltip`
- Add `<script type="module" src="/src/cs-annotated-image.js">` to any page using this component
- Nine positions: `top/middle/bottom` × `left/center/right`
- Desktop 905px+: inline tooltip appears on hover or keyboard focus only; click never creates sticky state
- Mobile / burger breakpoint <905px: tap opens the shared modal, backdrop/close/Escape dismiss, focus returns to the pin
- No generated legend/key; narrative copy should reference annotation numbers directly

**Two-column editorial system:** `_cs-two-col.css`
- Markup: `.cs-two-col > .cs-two-col__content + figure.cs-two-col__media`
- Use `.cs-two-col--flip` for media-left/text-right on desktop; mobile always stacks text first, media second
- Content supports `.cs-two-col__heading`, `.cs-two-col__body`, optional `.cs-two-col__callout`; media supports image plus `.cs-two-col__caption`

**Insight list system:** `_cs-insight-list.css`
- Markup: `ol.cs-insight-list > li.cs-insight-list__item > h4.cs-insight-list__title + p.cs-insight-list__body`
- Use for research findings, pain points, workshop themes, and compact evidence-led observations
- Numbering is generated by CSS; keep list order meaningful

**Statement system:** `_cs-statement.css`
- Markup: `blockquote.cs-statement > .cs-statement__eyebrow + .cs-statement__text`
- Use for problem statements, challenge framing, constraints, and strategic design-direction pivots
- Optional `.cs-statement__note` supports attribution or context without weakening the main statement

**Feature list system:** `_cs-feature-list.css`
- Markup: `ul.cs-feature-list > li.cs-feature-list__item > h4.cs-feature-list__title + p.cs-feature-list__body`
- Use for solution sections and delivered changes where a plain bullet list feels too flat
- Two-column at 905px+, single-column on mobile; keep items concise

**Artifact grid system:** `_cs-artifact-grid.css`
- Markup: `.cs-artifact-grid > figure.cs-artifact-grid__item > img + figcaption.cs-artifact-grid__caption`
- Use for grouped research artefacts, workshop outputs, notes, diagrams, and supporting evidence
- One column on mobile, two columns at 905px+; keep related artefacts in the same grid

**Results grid system:** `_cs-results-grid.css`
- Markup: `ul.cs-results-grid > li.cs-results-grid__item > .cs-results-grid__value + .cs-results-grid__label + .cs-results-grid__body`
- Use for case study outcomes where metrics need supporting context, not just a number and label
- Single column on mobile, 2x2 at 600px+, three columns at 905px+; add `.cs-results-grid--four` for four-up desktop layouts

**Process row system:** `_cs-process-row.css`
- Markup: `ol.cs-process-row > li.cs-process-row__item > .cs-process-row__content > h3.cs-process-row__title + p.cs-process-row__body`
- Use for short numbered flows, delivery sequences, design phases, or grouped solution steps
- Vertical connected list on mobile, horizontal connected row at 905px+; add `.cs-process-row--three` for three-step flows

**Pull quote system:** `_cs-pull-quote.css`
- Markup: `blockquote.cs-pull-quote > p.cs-pull-quote__text + optional cite.cs-pull-quote__cite`
- Use for high-impact narrative statements or stakeholder quotes that should interrupt the reading rhythm
- Full-width editorial quote with accent left rule; keep concise so it remains scannable

**Before/after system:** `_cs-before-after.css`
- Markup: `.cs-before-after > figure.cs-before-after__item.cs-before-after__item--before|--after > .cs-before-after__label + img + optional figcaption`
- Use for redesign comparisons, iterations, and clear state changes where both visuals need equal weight
- Stacks on mobile, two equal columns at 905px+; use descriptive image alt text and captions when context matters

**Decorative image variants:** `_image-block.css`
- `image-block--decorative` — standard illustrations, max 48% desktop
- `image-block--decorative-wide` — landscape illustrations, max 65% desktop
- Both reset to full width inside `.two-col` layouts
- Always supply `width`, `height`, and `loading="lazy"`

**Existing components already built:**
- Pull quote: `_pull-quote.css`
- Before and after: `_before-after.css`
- Process steps: `_process-steps.css`
- Results metrics: `_metrics-row.css`
- Two column layouts: `_two-column.css`

## v5.0 — active phases

Milestone: Case Study Polish and Full Site QA

| Phase | Goal | Status |
|-------|------|--------|
| 15 | Nav/hero padding fix — About + CV H1 alignment | Done |
| 16 | Footer — consistent layout, correct content | Pending |
| 17 | Case study component library (10 BEM components) | Pending |
| 18 | i-Exchange — copy review + image placement | Pending |
| 19 | CASSI — copy review + image placement | Pending |
| 20 | Community — copy review + person cards + images | Pending |
| 21 | Full site UAT and QA | Pending |

Full requirements: `.planning/REQUIREMENTS.md`

## GSD — workflow commands

```
/gsd:plan-phase <N>     — create execution plan
/gsd:execute-phase <N>  — execute all plans in a phase
/gsd:progress           — check status and route to next action
/gsd:quick              — ad-hoc task, no full phase overhead
/gsd:fast "<task>"      — trivial inline task (≤ 3 file edits)
/gsd:debug "<issue>"    — systematic debugging
```

## Working style
- One component at a time — confirm before moving on
- Explain significant architectural decisions
- Flag anything that could cause problems later
- Never add unrequested features or components
- Ask before building if anything is unclear
