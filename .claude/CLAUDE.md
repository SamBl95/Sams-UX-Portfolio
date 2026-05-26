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

**Annotated image system:** `src/anno-image.js` + `_annotated-image.css`
- Markup: `anno-image > anno-image__frame > img + anno-image__callout[data-pos][--positive/--negative] > anno-image__pin + anno-image__tooltip`
- Add `<script type="module" src="/src/anno-image.js">` to any page using this component
- Nine positions: `top/middle/bottom` × `left/center/right`

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
