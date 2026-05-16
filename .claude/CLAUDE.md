# Claude Code — Sam Blake Portfolio

## Project context
Product designer, 3 years. Sectors: financial services (Santander UK), retail (Matalan),
property (runs investment property business). Target: hybrid/remote product design roles,
North West of England.

## Stack
- Vite (MPA mode — `appType: 'mpa'`, all HTML pages declared in `rollupOptions.input`)
- Vanilla HTML, vanilla CSS only
- No JS or CSS frameworks unless explicitly requested
- BEM for all CSS classes
- CSS custom properties for all design tokens
- No inline styles under any circumstances
- No hex values outside _variables.css
- No arbitrary spacing — every margin/padding/gap must use a spacing token


## CSS architecture

ITCSS layer order — must match exactly in main.css imports:

```
1-settings/   _variables.css · _breakpoints.css
2-base/       _reset.css · _root.css · _typography.css
3-components/ _button.css · _badge.css · _tag.css · _card.css
              _stat-block.css · _hero.css · _nav.css · _footer.css
              _case-study.css · _about.css
4-layouts/    _container.css · _grid.css · _section.css
5-utilities/  _spacing.css · _text.css · _visibility.css
main.css      imports only — no styles written directly here
```

- Layout styles → 4-layouts/ only, never inside component files
- Utility classes are last-resort overrides, never doing heavy lifting
- Every component is self-contained
- Mobile-first: default styles for 375px, scale up at 768px and 1280px


## Design tokens

### Spacing — 4pt scale, px values only (no rem)
```
--space-1:  4px    --space-2:  8px    --space-3:  12px   --space-4:  16px
--space-5:  20px   --space-6:  24px   --space-8:  32px   --space-10: 40px
--space-12: 48px   --space-16: 64px   --space-20: 80px   --space-24: 96px
--space-32: 128px  --space-40: 160px  --space-64: 256px
```

### Type scale
```
--text-xs: 0.75rem    --text-sm: 0.875rem   --text-base: 1rem
--text-lg: 1.125rem   --text-xl: 1.25rem    --text-2xl:  1.5rem
--text-3xl: 1.875rem  --text-4xl: 2.25rem   --text-5xl:  3rem
```

### Line heights
```
--leading-tight: 1.25   --leading-normal: 1.5
--leading-relaxed: 1.6  --leading-loose: 1.8
```

### Font weights
```
--font-weight-normal: 400   --font-weight-medium: 500
--font-weight-semibold: 600  --font-weight-bold: 700
```

### Colours — single dark palette (no theme switching)
```
--color-bg:                #0d1f1a   deep forest
--color-surface:           #152b24   raised surface
--color-border:            #1e3d32   subtle border
--color-text-primary:      #f0ede6   warm white
--color-text-secondary:    #9db5ac   muted teal-grey
--color-accent:            #4fd1a5   mint teal — decorative, backgrounds, icons
--color-accent-accessible: #4fd1a5   same as accent (teal ≈ 9:1 on bg — no darkened variant needed)
--color-text-on-accent:    #071210   near-black for text ON teal surfaces (≈ 10:1)
--color-accent-light:      #1a3d30   dark teal — chip and surface tints
```

WCAG rules for this palette — apply without exception:
- `--color-accent` (#4fd1a5) on `--color-bg` (#0d1f1a) ≈ 9:1 — passes AA and AAA
- `--color-text-on-accent` (#071210) on `--color-accent` (#4fd1a5) ≈ 10:1 — passes AA and AAA
- ALWAYS use `--color-accent-accessible` for accent-coloured foreground text (same value as accent on dark)
- ALWAYS use `--color-text-on-accent` for text sitting on top of the teal accent background
- ALWAYS use `--color-accent-accessible` for focus outlines

There is no theme switching. The theme switcher has been removed from nav and JS.
All colour tokens live in `:root` in `_variables.css`. No `[data-theme]` overrides anywhere.


## Typography

### Font roles
- `--font-heading` Fraunces (Google Fonts, weights 300/400/600, optical sizing enabled) — h1–h4 only
- `--font-body` Urbanist (Google Fonts, weights 300/400/500) — all body and UI text
- `--font-accent` Caveat (Google Fonts, weight 400) — hero typewriter animation exclusively, via `.hero__typewriter-text` in `_hero.css`

### Rules
- Never mix font roles — Fraunces is for headings, Urbanist is for everything else, Caveat is for the typewriter phrase and nothing else
- All sizes reference type scale tokens
- Body minimum 16px, line-height minimum 1.6
- `_typography.css` uses element selectors only — no classes
- Font-accent (Caveat) applied via `.hero__typewriter-text` in `_hero.css`, not in `_typography.css`


## Accessibility — WCAG 2.2 AA minimum, non-negotiable

### Contrast requirements
- Normal text (< 18px regular or < 14pt bold): 4.5:1
- Large text (≥ 18px regular or ≥ 14pt bold): 3:1
- UI components and focus indicators: 3:1
- Verify every token combination against the dark palette before marking complete

### Rules
- Every interactive element must have a visible focus indicator
- Logical focus order, no keyboard traps
- Semantic HTML: correct elements, logical heading hierarchy — never skip levels
- All images: descriptive alt or aria-hidden="true" if decorative
- Icon-only buttons: must have aria-label
- `<section>` elements: must have aria-label or aria-labelledby to expose as landmarks
- Never rely on colour alone to communicate state
- prefers-reduced-motion: handled globally in _reset.css — no per-component overrides needed

### Pre-completion checklist
1. Contrast passes in the dark palette
2. Keyboard navigable in logical order
3. Screen reader announces content correctly
4. Renders correctly at 200% zoom
5. prefers-reduced-motion respected


## Components
HTML files in src/components/. Markup and BEM classes only — no inline styles, no embedded CSS.
Built: nav.html · hero.html · stat-row.html · case-study-card.html · footer.html

## Pages
- `index.html` (root) — homepage with typewriter hero, stat row, case study cards, contact CTA
- `src/pages/about.html` — about page with narrative sections and CV/LinkedIn CTA

## Typewriter animation
- JS: `src/typewriter.js` (vanilla, no libraries)
- Timing: 50ms type · 1500ms pause · 30ms delete · straight to next phrase
- Respects `prefers-reduced-motion`: shows first phrase statically, no cursor
- Accessibility: visual span is `aria-hidden="true"`; `.hero__typewriter-sr` (visually hidden) holds the current phrase for screen readers
- To add/edit phrases: update the `phrases` array in `src/typewriter.js`


## Copy and voice
- Conversational and honest — never corporate
- Lead with outcomes and metrics, never process or tools
- Headlines specific and descriptive — not vague, not clever
- Never lorem ipsum — flag missing copy with a HTML comment
- Never undersell or apologise

### Sam's background (use for bio and case study copy — do not invent details)
- Current: Product Designer at Matalan Retail (September 2025 – present)
  - Built design system from scratch: 300+ components, Atomic Design, adopted by design/CRO/trading
  - Leading end-to-end discovery project for new website (8-phase plan)
  - Platform migration with THG: audited 55 widgets, raised 70 accessibility tickets
  - Rebuilt UX research practice from the ground up, embedded at executive level
  - Mobile app widgets with Apadmi in Agile refinement process
- Previous: Product Designer / Business Analyst at Santander UK (September 2023 – September 2025)
  - i-Exchange knowledge base overhaul (5M annual searches, +12% NPS, 200+ hrs/month saved)
  - Cassi AI chatbot feedback redesign (+30% feedback rate, 3 weeks, £0 dev cost)
  - Community support forum redesign (team of 3, −50% load time, 97 hrs/month saved)
  - Redesigned fraud and scam reporting: 18 processes consolidated to 2
  - Audited and resolved 34 usability bugs, ensured WCAG 2.2 compliance
- UX Researcher rotation at Santander central UX team (March–April 2025)
  - Mobile balance display research (surveys + interviews); naming recommendations for clarity
- Director, Blake's Estates (property investment business, August 2020 – present)
  - 30% ROI on first project; full lifecycle: financing, refurb, contractor management, compliance
- Key skills: Design systems, Stakeholder management, AI workflow, Information architecture,
  UX Research, Figma, Workshop facilitation, WCAG, HTML & CSS, Agile
- Education: Google UX Design Professional Certificate (2022);
  Biological Sciences Hons 2.1, University of Liverpool (2016–2019)
- Community: volunteer + speaker at NUX Manchester and Liverpool (July 2025–present);
  active in Natter, Digital Liverpool; mentors career-switchers into UX
- Personal: completed first marathon, gym training, Cockapoo named Pax, travelling


## Source URLs — check before writing any copy or metrics
```
Homepage:   https://samsux.webflow.io/
i-Exchange: https://samsux.webflow.io/work/i-exchange
Cassi:      https://samsux.webflow.io/work/ai-colleague-assistant
Community:  https://samsux.webflow.io/work/community-forum
About:      https://samsux.webflow.io/about
```

## Reference sites
- joependlebury.com — gold standard: outcome-led hero, case study titles lead with result
- nicolearoberts.com — metric chip card pattern, named testimonials
- adamhickey.com — quality bar for visual finish and craft


## Skills to apply

Before any task, read and apply the relevant skills:

- Design and aesthetics: `.agents/skills/frontend-design/SKILL.md`
- Animation and motion: `.agents/skills/web-animation-design/SKILL.md`
- UI polish and detail: `.agents/skills/emil-design-eng/SKILL.md`
- UI baseline quality: `.agents/skills/baseline-ui/SKILL.md`
- Planning: `.agents/skills/plan-mode/SKILL.md`

For design tasks apply `frontend-design` and `emil-design-eng` together.
For animation tasks apply `web-animation-design` and `emil-design-eng` together.
For new features apply `plan-mode` before writing any code.

Note: this project uses a fixed design system (tokens, BEM, ITCSS, vanilla CSS). Apply each skill's quality bar within those constraints — never override the palette, fonts, or spacing tokens. Translate any Tailwind-specific guidance from `baseline-ui` into BEM/custom properties.


## GSD — workflow commands

GSD (Get Shit Done) is installed at `.claude/` and available as `/gsd:*` slash commands.
It is NOT a read-and-apply skill — it is a project planning and execution framework invoked by the user.

Key commands:
```
/gsd:help               — full command reference
/gsd:new-project        — initialise project: research → requirements → roadmap
/gsd:plan-phase <N>     — create a detailed execution plan for a phase
/gsd:execute-phase <N>  — execute all plans in a phase
/gsd:progress           — check status and route to next action
/gsd:quick              — ad-hoc task with GSD guarantees, no full phase overhead
/gsd:fast "<task>"      — trivial inline task (≤ 3 file edits), no planning files
/gsd:debug "<issue>"    — systematic debugging with persistent state
/gsd:sketch "<idea>"    — rapid UI exploration with HTML mockups
/gsd:capture            — capture a todo, note, or idea mid-conversation
/gsd:resume-work        — restore context from a previous session
```

Do not invoke GSD commands autonomously — wait for the user to trigger them.


## Working style
- One component or section at a time — confirm before moving on
- Explain significant architectural decisions
- Flag anything that could cause problems later
- Never add unrequested features or components
- Ask before building if anything is unclear
