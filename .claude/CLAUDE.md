# Claude Code — Sam Blake Portfolio

## Project context
Product designer, 3 years. Sectors: fintech (Santander UK), retail (Matalan), property.
Target: hybrid/remote product design roles, North West England.

## Stack
- Vite MPA — all pages declared in `rollupOptions.input`
- Vanilla HTML + CSS only — no JS or CSS frameworks unless explicitly requested
- BEM · CSS custom properties · ITCSS architecture
- No inline styles · no hex values outside `_variables.css` · no arbitrary spacing

## CSS architecture

ITCSS import order — must match `main.css` exactly:

```
1-settings/   _variables.css · _breakpoints.css
2-base/       _reset.css · _root.css · _typography.css
3-components/ _button.css · _card.css · _stat-block.css · _hero.css · _nav.css
              _footer.css · _case-study.css · _case-studies.css · _about.css · _cta.css
4-layouts/    _container.css · _grid.css · _section.css
```

- Layout → `4-layouts/` only, never inside component files
- Mobile-first: 600px · 905px · 1240px · 1440px


## Design tokens

### Spacing — 8pt scale
```
--space-1: 8px    --space-2: 16px   --space-3: 24px   --space-4: 32px
--space-5: 40px   --space-6: 48px   --space-8: 64px   --space-10: 80px
--space-12: 96px  --space-16: 128px --space-20: 160px --space-24: 192px
```

### Type scale
```
--text-xs: 0.75rem    --text-sm: 0.875rem   --text-base: 1rem
--text-lg: 1.125rem   --text-xl: 1.25rem    --text-2xl: 1.5rem
--text-3xl: 1.875rem  --text-4xl: 2.25rem   --text-5xl: 3rem

Extended (5-breakpoint heading system):
--text-22: 1.375rem  --text-28: 1.75rem  --text-32: 2rem    --text-40: 2.5rem
--text-56: 3.5rem    --text-64: 4rem     --text-80: 5rem    --text-96: 6rem
```

### Line heights
```
--leading-tight: 1.25  --leading-normal: 1.5  --leading-relaxed: 1.6
--leading-body: 1.7    --leading-loose: 1.8
```

### Font weights
```
--font-weight-normal: 400  --font-weight-medium: 500
--font-weight-semibold: 600  --font-weight-bold: 700
```

### Colours
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

ALWAYS use `--color-accent-accessible` for accent foreground text and focus outlines.
ALWAYS use `--color-text-on-accent` for text on teal backgrounds.


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
Translate any Tailwind-specific guidance into BEM/custom properties.


## Nav architecture

### Mobile (< 905px) — bottom sheet app launcher
- **Toggle**: `button.nav__toggle` — `position: fixed; top: 4px; right: 16px; z-index: var(--z-modal)` (500). Contains `nav__toggle-bars` (3 bars) + `nav__toggle-label` ("Menu"). Stays in place throughout; IS the close button.
- **Sheet**: `div#nav-sheet.nav__sheet[role=dialog]` — slides up from `translateY(100%)` to `translateY(0)` over 300ms spring easing. Height 60–70dvh, rounded top corners 24px, `--color-surface` background.
- **Tiles**: 2×3 grid inside `.nav__grid`. Each tile is an `<a>` with inline SVG icon + label. Active tile has `.nav__tile--active`.
- **Overlay**: `div.nav__overlay` — dims page at 50% opacity. Tap to close.
- **JS**: `src/nav.js` — `initNav()`. Handles open/close, hamburger↔X morph, focus trap, Escape key, swipe-to-dismiss.
- **Z-index stack**: overlay (300) → sheet (400) → toggle (500 = `--z-modal`).

### Desktop (905px+) — horizontal inline nav
- `nav.nav__menu` > `ul.nav__list` > `li.nav__item` > `a.nav__link`. Toggle, sheet, and overlay are `display: none`.
- Active link: `aria-current="page"` + `nav__link--active` class (set via Handlebars flags in the partial).
- Underline indicator via `::after` pseudo-element, `transform: scaleX(0→1)`.

### Hamburger morph timing
- Open (hamburger → X): `ease-out 200ms`
- Close (X → hamburger): `ease-in 200ms`
- Bar 1: `translateY(8px) rotate(45deg)` | Bar 2: `opacity: 0` | Bar 3: `translateY(-8px) rotate(-45deg)`

### Tile stagger
CSS `@keyframes nav-tile-in` (opacity 0→1, translateY 8px→0), triggered by `.nav--open .nav__tile:nth-child(n)`. Delays: 0, 40, 80, 120, 160, 200ms. Disabled under `prefers-reduced-motion`.

### Adding a new tile destination
If a new page is added that needs a tile in the sheet, add an `<a class="nav__tile">` entry in `src/components/nav.html` and a matching Handlebars flag (`navXxx=true`). The 2-column grid layout accommodates tiles in pairs.


## Adding a new page

Every page in this site follows the same scaffold. To add a new page, do these four things in order, then ship.

1. Create the `.html` file under `src/pages/` (or `src/pages/<sub>/`). Start from the structure shown below.
2. Register the page in `vite.config.js` `rollupOptions.input` with a unique key and `r('./src/pages/...')`.
3. If the page deserves a dedicated nav active state, set the matching boolean flag when including the partial: one of `navWork`, `navAbout`, `navStories`, `navContact`. If none applies, include `{{> nav}}` with no flag.
4. If the page introduces page-specific BEM classes, add a new file `src/styles/3-components/_<page>.css` and import it in `src/styles/main.css` inside the `/* 3. COMPONENTS */` block.

### Canonical page scaffold

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="<one-sentence page description>" />
    <title><Page Title> — Sam Blake | Product Designer</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Urbanist:wght@300;400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/main.css" />
  </head>
  <body>
    {{> nav <navFlag=true if applicable>}}
    <main>
      <section class="<block> section-lg" aria-labelledby="<block>-heading">
        <div class="container">
          <h1 id="<block>-heading" class="<block>__heading"><Heading></h1>
          <!-- page content -->
        </div>
      </section>
    </main>
    {{> footer}}
    <script type="module" src="/src/theme.js"></script>
    <script type="module" src="/src/nav.js"></script>
  </body>
</html>
```

### Container choice

Use `container` for all pages — consistent full-width layout across the site.

### Active nav state

| Page type | Include |
|-----------|---------|
| Homepage / case studies | `{{> nav}}` |
| About | `{{> nav navAbout=true}}` |
| Stories index or post | `{{> nav navStories=true}}` |
| Contact | `{{> nav navContact=true}}` |

### What NOT to do

- Don't copy nav or footer markup inline — always use the partial
- Don't add hex values outside `_variables.css`
- Don't use inline `style="..."` attributes
- Don't use `../` relative paths for CSS, JS, or assets — use root-relative `/src/...`
- Don't add a page to the filesystem without registering it in `vite.config.js`


## GSD — workflow commands

GSD is installed at `.claude/` and available as `/gsd:*` slash commands.
It is NOT a read-and-apply skill — invoke only when the user triggers it.

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


## Token efficiency rules

These rules apply to every session without exception.

**Context and memory**
- Do not summarise previous conversations or recap what has been done
- Do not explain what you are about to do before doing it
- Do not confirm understanding before starting a task
- Start executing immediately when the task is clear
- Only ask a question if the task genuinely cannot proceed without an answer

**Output format**
- No preamble, no postamble
- No phrases like "Great!", "Sure!", "Certainly!" or "I'd be happy to"
- No closing summaries unless explicitly asked for
- When creating files, confirm with one line per file only
- When fixing bugs, state the fix in one line only

**Code output**
- Only output the changed lines plus minimal surrounding context
- Never reprint entire files unless explicitly asked
- Use comments to indicate unchanged sections rather than reprinting them
- Never explain code that is self-explanatory

**Conversation style**
- Responses should be as short as the task allows
- Lists only when there are genuinely multiple distinct items
- No bullet points for single items
- Technical terms without explanation unless asked

**What to never do**
- Never restate the user's prompt back to them
- Never say what you are going to do and then do it, just do it
- Never add unrequested suggestions or next steps
- Never thank the user for their question


## Working style
- One component at a time — confirm before moving on
- Explain significant architectural decisions
- Flag anything that could cause problems later
- Never add unrequested features or components
- Ask before building if anything is unclear
