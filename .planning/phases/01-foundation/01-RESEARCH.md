# Phase 1: Foundation - Research

**Researched:** 2026-05-17
**Domain:** Vite MPA — HTML includes, CSS token migration, page scaffolding, nav/footer consistency
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Nav and footer use a Vite HTML include plugin. `src/components/nav.html` and `src/components/footer.html` are the single source of truth. Every page includes them.
- **D-02:** Mobile hamburger toggle uses the small JS script already in `src/theme.js` (toggles `.nav--open`, `aria-expanded`). Existing logic is correct — no rewrite.
- **D-04:** Final nav structure: **Work** → `#case-studies` / **About** → `/src/pages/about.html` / **Stories** → `/src/pages/stories/index.html` / **Get in touch** → `/src/pages/contact.html`
- **D-05:** "Get in touch" links to the contact page, not a homepage anchor.
- **D-06:** Section is named "Stories" throughout — nav label, page title, URL path.
- **D-07:** Contact page is an editorial "reach me" page — email link + LinkedIn link + what Sam is interested in hearing about. No form, no backend.
- **D-08:** Homepage contact section (`#contact` section) is removed entirely. Homepage ends after case studies.
- **D-09:** Footer retains email + LinkedIn links.
- **D-10:** Stories index uses a date/title list layout — post title, date, one-line summary.
- **D-11:** Stories post page layout — Claude's discretion (article reading layout, reuse existing tokens).
- **D-12:** URL structure `/src/pages/stories/index.html` and `/src/pages/stories/[slug].html`. At least one working post example required.
- **D-13:** Colour palette: go light. Replace dark forest green tokens in `_variables.css`. Direction: warm-neutral off-white base.
- **D-14:** Typography: keep Fraunces + Urbanist, fix the application (sizing, weight, hierarchy audit).
- **D-15:** Layout: use UI-SPEC directions (Full-Width Editorial mode, container-wide / container-reading split).

### Claude's Discretion

- Active nav state visual treatment (minimum `aria-current="page"`; may add `.nav__link--active` class if clean in context of existing `_nav.css`)
- Blog post page layout (article-style reading layout, reusing existing tokens)

### Deferred Ideas (OUT OF SCOPE)

- Dedicated `/work` index page listing case studies
- Contact form with real email delivery (Formspree, EmailJS)
- SEO meta tags, Open Graph, structured data
- Mobile menu detailed animation/transition polish
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Nav component is consistent across all pages (same markup, same links) | Include plugin makes `nav.html` the single source of truth |
| NAV-02 | Nav active state correctly highlights the current page | `aria-current="page"` + `.nav__link--active` in each page's nav include context |
| NAV-03 | Footer component is consistent across all pages | Include plugin makes `footer.html` the single source of truth |
| NAV-04 | No broken internal links anywhere in the site | All hrefs audited and mapped; root-relative paths confirmed strategy |
| NAV-05 | Duplicate page files cleaned up (`src/pages/cassi.html` etc.) | STATE.md confirms these exist; glob confirms they do NOT exist at `src/pages/` root — confirmed moved to `case-studies/` subfolder already |
| PAGE-01 | Contact page exists with complete structure | New file: `src/pages/contact.html` registered in vite.config.js |
| PAGE-02 | Blog/Stories index page exists at Stories URL | New file: `src/pages/stories/index.html` registered in vite.config.js |
| PAGE-03 | Blog/Stories post template exists with at least one working example | New file: `src/pages/stories/[slug].html` registered in vite.config.js |
| PAGE-04 | All new pages registered in `vite.config.js` rollupOptions.input | vite.config.js must be updated with contact, stories/index, stories/[post] |
| AUDIT-01 | Holistic review of all existing pages for structural consistency | All 5 existing pages audited in this research |
| AUDIT-02 | Every page has complete structure: nav → content → footer | Include plugin enforces this; existing pages confirmed to have this structure |
| AUDIT-03 | CSS architecture coherent — no inline styles, no hex outside `_variables.css`, tokens throughout | `_variables.css` token swap is the primary action; `_typography.css` weight audit needed |
| AUDIT-04 | Site is demonstrably scalable — adding a new page follows a clear, repeatable pattern | Template established by contact + stories pages; documented in PLAN |
</phase_requirements>

---

## Summary

Phase 1 is a walking-skeleton delivery: get every page live, every link working, and the design foundation settled before any content work begins. The codebase is already well-structured — ITCSS architecture is in place, design tokens exist in `_variables.css`, BEM naming is consistent throughout, and `src/theme.js` already implements the hamburger toggle. The main work is additive (new pages, include plugin, token swap) with one significant subtractive action (remove the `#contact` section from `index.html`).

The single most impactful architectural decision is the HTML include plugin for nav and footer. Without it, the nav markup is duplicated across five existing pages and will diverge over time. `vite-plugin-handlebars` (v2.0.3, updated 3 weeks ago, supports Vite 8 via peer deps) is the best-fit option: it uses Handlebars partials which map naturally to the existing `src/components/nav.html` / `src/components/footer.html` files and supports context variables needed for per-page `aria-current` state.

The design token swap (D-13) requires updating 9 colour tokens in `_variables.css` and regenerating `--shadow-accent`. All values are fully specified in the UI-SPEC. The typography audit (D-14) means aligning `_typography.css` to the 4 semantic roles and 2 weights defined in the UI-SPEC (replacing the current `--font-weight-bold` 700 usage on h1/h2 with `--font-weight-semibold` 600, and correcting the responsive scale breakpoints to match the UI-SPEC values).

**Primary recommendation:** Install `vite-plugin-handlebars`, convert nav/footer to partials, add 3 new pages, update `vite.config.js`, swap colour tokens, and audit typography in one coherent wave.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Nav/footer consistency | Frontend (HTML build) | — | Include plugin bakes shared markup at build time; no JS framework needed |
| Page routing | Vite build config | — | All pages registered in `rollupOptions.input`; Vite MPA serves directly |
| Active nav state | Frontend (HTML + CSS) | JS (minor) | `aria-current="page"` set in each page's include context; CSS reads the attribute |
| Mobile hamburger toggle | JS (theme.js — existing) | CSS (`.nav--open` class) | Script already implemented and correct |
| Design tokens | CSS (`_variables.css`) | — | All tokens in one file; no runtime needed |
| Colour palette | CSS (`_variables.css`) | All component CSS (token consumers) | Swap tokens once; all components pick up change automatically via custom properties |
| Typography hierarchy | CSS (`_typography.css`) | Component CSS (overrides) | Base element rules drive headings; component CSS overrides only where needed |
| New page creation | HTML + CSS | vite.config.js | Repeatable: create file, register in config, inherit global CSS |
| Contact page content | HTML (static) | — | Editorial copy only; no backend or form needed |
| Stories list/post structure | HTML + CSS | — | Static HTML pages; no CMS or dynamic rendering |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 8.0.11 (installed) | Build/dev server, MPA routing | Already installed; `appType: 'mpa'` configured |
| vite-plugin-handlebars | 2.0.3 | HTML partials (nav, footer includes) | Vite 8 peer dep confirmed; 29k downloads/week; active maintenance (updated 3 weeks ago) |

[VERIFIED: npm registry — `npm view vite-plugin-handlebars version time.modified peerDependencies`]

### No Additional Libraries

All other work — new pages, CSS token swap, typography audit — requires zero new packages. Vanilla HTML + CSS only, consistent with project constraint.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `vite-plugin-handlebars` | `vite-plugin-html` | vite-plugin-html (871k/wk, last modified 2024-01) is larger, focused on HTML minification and EJS templating — overkill for partials, and stale relative to Vite 8 |
| `vite-plugin-handlebars` | Inline `@@include` syntax plugin | Most `vite-plugin-html-include` packages are unmaintained or non-existent on npm; the named one does not exist on the registry |
| Handlebars partials | Manual copy-paste | Creates divergence: each page would have its own copy of nav markup, breaking NAV-01 immediately |

**Installation:**
```bash
npm install --save-dev vite-plugin-handlebars
```

**Version verification:** `npm view vite-plugin-handlebars version` → `2.0.3` (confirmed 2026-05-17)

---

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| vite-plugin-handlebars | npm | ~4 yrs (2021-02-03) | 29,079/week | github.com/alexlafroscia/vite-plugin-handlebars | [ASSUMED] — slopcheck unavailable | Approved — established age, active maintenance, real source repo, Vite 8 peer dep confirmed |

**Packages removed due to slopcheck [SLOP] verdict:** none

**Packages flagged as suspicious [SUS]:** none identified

*slopcheck was unavailable at research time. The package has been manually verified: published 2021-02-03, 17 versions, MIT license, single dependency (handlebars ^4.7.9), confirmed Vite 8 peer dep, updated 3 weeks ago, real GitHub repo. Risk is low. Planner may add a `checkpoint:human-verify` before install if preferred.*

---

## Architecture Patterns

### System Architecture Diagram

```
vite.config.js (rollupOptions.input)
        |
        | registers all .html entry points
        v
+---------------------------+
|   Handlebars Plugin       |
|   resolvePartials()       |
+---------------------------+
    |               |
    v               v
nav.html        footer.html
(src/components/) (src/components/)
    |               |
    +-------+-------+
            |
            | injected into every page at build/dev time
            v
+------------------------------------------+
|   Page HTML (index, about, case-studies, |
|   contact, stories/index, stories/post)  |
|                                          |
|   Each page passes context:              |
|   { activeNav: 'about' }                 |
|   Nav partial reads context to set       |
|   aria-current="page" on correct link    |
+------------------------------------------+
            |
            v
+---------------------------+
|   src/styles/main.css     |
|   (ITCSS layers)          |
|   _variables.css          |  <-- single token source
|   _typography.css         |  <-- heading + body rules
|   _nav.css                |  <-- reads tokens, aria-current
|   _footer.css             |  <-- reads tokens
|   _container.css          |  <-- container-reading 720px
|   _section.css            |  <-- section-sm/md/lg/xl
+---------------------------+
            |
            v
    Browser renders page
    JS: theme.js (hamburger toggle)
    JS: typewriter.js (homepage only)
```

### Recommended Project Structure (after Phase 1)

```
src/
├── components/
│   ├── nav.html          # Handlebars partial — single source of truth
│   └── footer.html       # Handlebars partial — single source of truth
├── pages/
│   ├── about.html
│   ├── contact.html      # NEW
│   ├── case-studies/
│   │   ├── cassi.html
│   │   ├── community.html
│   │   └── i-exchange.html
│   └── stories/
│       ├── index.html    # NEW
│       └── design-systems-and-portfolio-sites.html  # NEW (one example post)
├── styles/
│   ├── 1-settings/
│   │   └── _variables.css    # MODIFIED — 9 colour tokens swapped
│   ├── 2-base/
│   │   └── _typography.css   # MODIFIED — weight 700 → 600, responsive scale aligns to UI-SPEC
│   ├── 3-components/         # MODIFIED where dark-palette assumptions exist
│   └── 4-layouts/
│       └── _container.css    # Already has container-reading 720px
├── theme.js              # UNCHANGED — hamburger logic is correct
└── typewriter.js         # UNCHANGED
index.html                # MODIFIED — remove #contact section, update nav links, add include directives
vite.config.js            # MODIFIED — add contact, stories/index, stories/post entries
```

### Pattern 1: Handlebars Partial Include

**What:** Each page uses `{{> nav activeNav="about"}}` to include the nav partial. The nav partial reads the `activeNav` context variable to set `aria-current="page"` on the correct link.

**When to use:** Every HTML page, in the `<body>` immediately before `<main>`.

**Example:**
```html
<!-- In any page HTML -->
{{> nav activeNav="stories"}}

<main>
  ...
</main>

{{> footer}}
```

```javascript
// In vite.config.js
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: r('./src/components'),
    }),
  ],
  // ...
})
```

```html
<!-- In src/components/nav.html -->
<header class="nav">
  <div class="nav__inner container">
    <a href="/" class="nav__logo" aria-label="Sam Blake — back to home">Sam Blake</a>
    <nav id="nav-menu" class="nav__menu" aria-label="Main navigation">
      <ul class="nav__list" role="list">
        <li class="nav__item">
          <a href="/#case-studies" class="nav__link{{#if (eq activeNav 'work')}} nav__link--active{{/if}}"
             {{#if (eq activeNav 'work')}}aria-current="page"{{/if}}>Work</a>
        </li>
        <li class="nav__item">
          <a href="/src/pages/about.html" class="nav__link{{#if (eq activeNav 'about')}} nav__link--active{{/if}}"
             {{#if (eq activeNav 'about')}}aria-current="page"{{/if}}>About</a>
        </li>
        <li class="nav__item">
          <a href="/src/pages/stories/index.html" class="nav__link{{#if (eq activeNav 'stories')}} nav__link--active{{/if}}"
             {{#if (eq activeNav 'stories')}}aria-current="page"{{/if}}>Stories</a>
        </li>
        <li class="nav__item">
          <a href="/src/pages/contact.html" class="nav__link nav__link--cta{{#if (eq activeNav 'contact')}} nav__link--active{{/if}}"
             {{#if (eq activeNav 'contact')}}aria-current="page"{{/if}}>Get in touch</a>
        </li>
      </ul>
    </nav>
    <button class="nav__toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open navigation menu">
      <span class="nav__toggle-bar"></span>
      <span class="nav__toggle-bar"></span>
      <span class="nav__toggle-bar"></span>
    </button>
  </div>
</header>
```

[CITED: https://github.com/alexlafroscia/vite-plugin-handlebars — partialDirectory API and context variable passing]

**Note on `eq` helper:** Handlebars does not have a built-in `eq` comparison helper. The `vite-plugin-handlebars` plugin allows registering custom helpers. The plan must include registering an `eq` helper in `vite.config.js`:

```javascript
handlebars({
  partialDirectory: r('./src/components'),
  helpers: {
    eq: (a, b) => a === b,
  },
})
```

Alternatively, use a simpler approach: pass a boolean flag per link, e.g. `{{> nav navAbout=true}}`, and in the partial use `{{#if navAbout}}aria-current="page"{{/if}}`. This avoids a custom helper entirely and is safer.

### Pattern 2: CSS Path Strategy — Root-Relative

**What:** All pages use root-relative CSS paths (`/src/styles/main.css`) rather than relative paths. This eliminates depth-dependent `../` counting and removes the risk of path errors when new pages are added at new directory depths.

**When to use:** All pages after Phase 1 refactor.

**Current state (before):**
```html
<!-- index.html -->        <link rel="stylesheet" href="./src/styles/main.css" />
<!-- src/pages/about.html --> <link rel="stylesheet" href="../styles/main.css" />
<!-- src/pages/case-studies/cassi.html --> <link rel="stylesheet" href="../../styles/main.css" />
```

**After:**
```html
<!-- ALL pages -->
<link rel="stylesheet" href="/src/styles/main.css" />
```

Vite dev server serves from the project root, so `/src/styles/main.css` resolves correctly. The same applies to JS script tags and favicon hrefs (already root-relative: `/favicon.png`). [ASSUMED — Vite root-relative paths work in dev; verify in build output for sub-directory pages]

### Pattern 3: Colour Token Swap

**What:** 9 colour tokens in `_variables.css` are replaced with light-palette values from the UI-SPEC. All component CSS uses `var(--color-*)` — no component file needs editing for colours. Only `_variables.css` changes.

**When to use:** Single task, all 9 tokens replaced together.

**Before → After:**

| Token | Before | After |
|-------|--------|-------|
| `--color-bg` | `#0d1f1a` | `#f5f2ed` |
| `--color-surface` | `#152b24` | `#ede9e3` |
| `--color-border` | `#1e3d32` | `#d6d0c8` |
| `--color-text-primary` | `#f0ede6` | `#1a1614` |
| `--color-text-secondary` | `#9db5ac` | `#6b6560` |
| `--color-accent` | `#4fd1a5` | `#1a6b52` |
| `--color-accent-accessible` | `#4fd1a5` | `#1a6b52` |
| `--color-text-on-accent` | `#071210` | `#f5f2ed` |
| `--color-accent-light` | `#1a3d30` | `#e6f0ec` |
| `--shadow-accent` | `0 8px 24px -4px rgb(79 209 165 / 0.4)` | `0 8px 24px -4px rgb(26 107 82 / 0.18)` |

### Pattern 4: Typography Weight Correction

**What:** The base typography in `_typography.css` currently sets `h1` and `h2` to `--font-weight-bold` (700). The UI-SPEC locks this to `--font-weight-semibold` (600) for all headings. The hero component also has `font-weight: var(--font-weight-bold)` in `_hero.css`. Both must be updated.

**Responsive scale correction needed:** The UI-SPEC defines Display/h1 at `--text-40` (mobile) → `--text-56` (600px) → `--text-64` (905px) → `--text-80` (1240px). The current `_typography.css` uses `--text-4xl` (36px) → `--text-5xl` (48px) → `--text-64` → `--text-80` → `--text-96`. The UI-SPEC caps Display at `--text-80` at 1240px — the 1440px step to 96px should be removed from the base element rule (it may remain available as a token but should not be applied to h1 in this phase).

### Anti-Patterns to Avoid

- **Per-page nav copy:** Duplicating nav markup in each HTML file defeats NAV-01. Every page must use the include system.
- **Relative CSS paths at depth:** Using `../../styles/main.css` breaks when pages move directory. Use root-relative `/src/styles/main.css` consistently.
- **Hex values in component CSS:** Any colour changes during the theme swap must go into `_variables.css` only. No hex values in component files.
- **Inline styles for layout adjustments:** Stories and Contact pages need `container-reading` — apply via the existing `.container-reading` class in HTML, not inline `max-width` styles.
- **Registering pages in rollupOptions but not building the file:** vite.config.js must be updated at the same time as the page file is created, not as a separate step.
- **`aria-current="page"` on every page's nav link for the same item:** Each page should only have one nav link with `aria-current="page"` — the one matching the current page. Using the Handlebars context variable approach ensures this is correct by construction.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTML partial includes | Custom preprocessor, server-side includes, copy-paste | `vite-plugin-handlebars` | Vite 8 native integration, partialDirectory API, context variables for active state |
| CSS custom properties | Runtime JS token management, inline variables | `_variables.css` (already exists) | Single-file token source, zero runtime cost, already the project standard |
| Responsive type scale | JS-based font resizing | CSS media queries in `_typography.css` (already exists) | No JS needed; CSS media queries are the right tool |
| Mobile nav toggle | Full JS navigation library | `src/theme.js` (already exists, 36 lines) | Script is correct and complete — no rewrite needed |

---

## Existing Codebase Audit

### NAV-05 Status: Already Clean

The STATE.md blocker noted "Duplicate page files exist at `src/pages/` root". File system scan shows `src/pages/` contains only `about.html` and a `case-studies/` subdirectory. The three case study pages (`cassi.html`, `community.html`, `i-exchange.html`) are already correctly located at `src/pages/case-studies/`. NAV-05 is a false alarm — no cleanup needed.

### Current Nav State (Before Phase 1)

All 5 existing pages have nav markup copied inline (not from a partial). Links vary by page:

| Page | CSS path | Work link | About link | CTA link | Hamburger |
|------|----------|-----------|------------|----------|-----------|
| `index.html` | `./src/styles/main.css` | `#case-studies` | `./src/pages/about.html` | `#contact` (btn--primary) | missing |
| `src/pages/about.html` | `../styles/main.css` | `../../index.html#case-studies` | `about.html` (aria-current) | `#contact` (btn--primary) | present |
| `src/pages/case-studies/cassi.html` | `../../styles/main.css` | `../../index.html#case-studies` | `../about.html` | `../../index.html#contact` (btn--primary) | present |

All pages need nav markup replaced with the Handlebars include. The `index.html` is also missing the hamburger button from its inline nav (it exists in the template but was removed from the page).

### Contact Section Removal from index.html

`index.html` has a `<section class="cta-section section-md" id="contact">` between case-studies and the footer. This entire section must be removed (D-08). Any link `href="#contact"` across the site must be updated to `href="/src/pages/contact.html"`.

### Hero CTA Button

`index.html` hero has two CTA buttons: `See my work` → `#case-studies` (keep) and `Get in touch` → `#contact` (update to `/src/pages/contact.html`).

### About Page Contact Section

`src/pages/about.html` has a `<section class="cta-section section-md" id="contact">` near the bottom. D-08 removes the homepage contact section but is silent on the about page. The about page contact section serves as an inline CTA within an internal page — this is a different pattern from the homepage's trailing CTA. **Leave the about page contact section in place** unless D-08 is explicitly expanded. Flag this for planner decision.

### CSS Audit — Components That Assume Dark Palette

After the token swap in `_variables.css`, all component CSS automatically picks up the new values via `var()`. However, several rules use `color-mix` to derive hover/active states relative to the dark palette:

- `_button.css` `.btn--primary:hover` — `color-mix(in srgb, var(--color-accent) 88%, white)` — on light theme, this lightens an already-light teal correctly
- `_button.css` `.btn--primary:active` — `color-mix(in srgb, var(--color-accent) 85%, black)` — darkens teal, correct for light theme
- `_button.css` `.btn--secondary:active` — `color-mix(in srgb, var(--color-accent-light) 70%, black)` — will produce a dark result on a pale teal; may need review

The `color-mix` rules use token references, not hex values directly, so they adapt to the new token values. Visual review after token swap is the correct check — not pre-emptive CSS changes.

---

## Common Pitfalls

### Pitfall 1: Handlebars Plugin — Missing `eq` Helper

**What goes wrong:** `{{#if (eq activeNav 'about')}}` syntax requires a registered `eq` helper. Without it, Handlebars silently treats the expression as falsy — no `aria-current` is ever set, no active state appears.

**Why it happens:** Handlebars does not ship comparison helpers by default.

**How to avoid:** Either register `eq: (a, b) => a === b` in vite.config.js `helpers` option, or use the boolean flag approach (`navAbout=true`) which needs no helper. The boolean flag approach is simpler and self-documenting.

**Warning signs:** Nav active state never highlights on any page.

### Pitfall 2: Root-Relative Paths Break in Build Output

**What goes wrong:** Vite dev server resolves `/src/styles/main.css` correctly. In the build output, paths are rewritten. If a page is at `dist/src/pages/about.html`, the path `/src/styles/main.css` may resolve differently depending on the `base` config.

**Why it happens:** Vite rewrites asset paths during build. For MPA builds, the `base` setting affects how root-relative paths are resolved.

**How to avoid:** Test `npm run build && npm run preview` after switching to root-relative paths. If paths break, the Handlebars plugin allows injecting the correct relative path as a context variable, or the `base: './'` config option can be set. [ASSUMED — verify in preview build]

**Warning signs:** CSS not loading on `npm run preview` for pages in subdirectories.

### Pitfall 3: Vite Config Not Updated When Page Files Are Created

**What goes wrong:** A new `.html` file is created but not added to `rollupOptions.input`. The dev server may serve it directly, masking the issue. The production build will silently exclude it.

**Why it happens:** Vite MPA requires explicit registration of every entry point. Unlike webpack, it does not glob HTML files automatically.

**How to avoid:** Update `vite.config.js` in the same task as creating the page file. Never create a page in one task and register it in another.

**Warning signs:** Page works in dev, returns 404 after `npm run build`.

### Pitfall 4: Nav Link Ordering and `nav__toggle` Button Position

**What goes wrong:** The current `index.html` nav has the hamburger button AFTER the `<nav>` element. The `about.html` and case study pages have it AFTER the `<nav>` too. `nav.html` (component) has it BEFORE the `<nav>`. The existing `_nav.css` styles work regardless of order (flex layout), but screen reader focus order depends on DOM order.

**Why it happens:** The component template and page implementations diverged during development.

**How to avoid:** The canonical Handlebars partial must establish the correct order: logo → hamburger → nav menu (hamburger before nav menu in DOM ensures focus order: logo → hamburger → links when menu is open). This is the order in the component file.

**Warning signs:** On mobile, keyboard focus jumps to hamburger after last nav link instead of leaving the menu.

### Pitfall 5: Stories Index Empty State

**What goes wrong:** If the Stories index page has no posts listed, an empty `<ul>` with no items looks broken.

**Why it happens:** Phase 1 requires only one post example. The index page needs to render with content, not an empty list.

**How to avoid:** The one post example (`design-systems-and-portfolio-sites.html` or similar) should also appear in the Stories index list. The "nothing here yet" copy in the UI-SPEC is a future fallback, not required for Phase 1 since a post exists.

---

## Code Examples

### vite.config.js After Phase 1

```javascript
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import handlebars from 'vite-plugin-handlebars'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  root: '.',
  publicDir: 'public',
  appType: 'mpa',

  plugins: [
    handlebars({
      partialDirectory: r('./src/components'),
      helpers: {
        eq: (a, b) => a === b,
      },
    }),
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:         r('./index.html'),
        about:        r('./src/pages/about.html'),
        contact:      r('./src/pages/contact.html'),
        iexchange:    r('./src/pages/case-studies/i-exchange.html'),
        cassi:        r('./src/pages/case-studies/cassi.html'),
        community:    r('./src/pages/case-studies/community.html'),
        storiesIndex: r('./src/pages/stories/index.html'),
        storiesPost:  r('./src/pages/stories/design-systems-and-portfolio-sites.html'),
      },
    },
  },
})
```

### Stories Index Page Structure

```html
<main>
  <section class="stories section-lg" aria-labelledby="stories-heading">
    <div class="container-reading">
      <h1 id="stories-heading" class="stories__heading">Stories</h1>
      <ul class="stories__list" role="list">
        <li class="stories__item">
          <a href="./design-systems-and-portfolio-sites.html" class="stories__link">
            <span class="stories__title">Design systems and portfolio sites</span>
            <span class="stories__date">May 2026</span>
          </a>
          <p class="stories__summary">What building this portfolio taught me about design systems in miniature.</p>
        </li>
      </ul>
    </div>
  </section>
</main>
```

### Contact Page Structure

```html
<main>
  <section class="contact section-lg" aria-labelledby="contact-heading">
    <div class="container-reading">
      <h1 id="contact-heading" class="contact__heading">Get in touch</h1>
      <p class="contact__intro">I'm open to hybrid and remote product design roles in the North West of England. Also happy to talk mentorship, community events, or swap notes on design.</p>
      <div class="contact__links">
        <a href="mailto:sam.blake@outlook.com" class="btn btn--primary">Email me</a>
        <a href="https://www.linkedin.com/in/samuel-blake-224605186" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
      </div>
      <div class="contact__interests">
        <h2 class="contact__interests-heading">What I'm interested in hearing about</h2>
        <ul class="contact__interests-list">
          <li>Product design roles — hybrid or remote, North West England</li>
          <li>Mentorship conversations for career changers</li>
          <li>Community events: NUX, design meetups</li>
          <li>Interesting problems in fintech, retail, or property</li>
        </ul>
      </div>
    </div>
  </section>
</main>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual nav copy-paste per page | Handlebars partial includes | Phase 1 | Edits to nav propagate to all pages automatically |
| Dark forest green palette | Warm off-white light palette | Phase 1 | Design system values in `_variables.css` only |
| `--font-weight-bold` (700) on h1/h2 | `--font-weight-semibold` (600) | Phase 1 | Intentional, restrained heading weight for editorial feel |
| Relative CSS paths per directory depth | Root-relative `/src/styles/main.css` | Phase 1 | Eliminates path errors for any new page at any depth |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Root-relative paths (`/src/styles/main.css`) work correctly in `npm run build` output for sub-directory pages | Pattern 2, Pitfall 2 | CSS fails to load in preview/production for pages in `src/pages/` subdirectories; fallback: use relative paths or set `base: './'` |
| A2 | `vite-plugin-handlebars` `partialDirectory` option accepts the `src/components/` directory and auto-registers all `.html` files as partials | Standard Stack, Pattern 1 | Partials not found; fallback: specify each partial manually in `partials` option |
| A3 | The `about.html` contact CTA section should be left in place (D-08 removes homepage contact only) | Existing Codebase Audit | If D-08 was intended to remove all inline contact sections, the about page needs its CTA removed too |
| A4 | One Stories post example is sufficient for PAGE-03 (at least one working post example) | Phase Requirements | If multiple posts are expected, more post files and index entries needed |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Vite build, npm install | ✓ | v24.15.0 | — |
| npm | Package install | ✓ | bundled with Node 24 | — |
| Vite | Build/dev server | ✓ | 8.0.11 (installed) | — |
| vite-plugin-handlebars | Include system | ✗ (not installed) | — | Manual nav copy-paste (defeats NAV-01) |

**Missing dependencies with no fallback:**
- `vite-plugin-handlebars` — must be installed. First task in the plan.

---

## Security Domain

`security_enforcement: true`, `security_asvs_level: 1` in config.json.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this phase |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No restricted routes |
| V5 Input Validation | No | No forms in this phase (D-07: no contact form) |
| V6 Cryptography | No | No secrets or encryption |
| V7 Error Handling | No | Static pages only |
| V14 Configuration | Minimal | No hex values outside `_variables.css`; no inline styles |

### Relevant Considerations for This Phase

- `target="_blank"` links must include `rel="noopener noreferrer"` — already present in footer links and contact CTA links. Must be verified on any new `target="_blank"` links added in Phase 1.
- No user input, no backend, no auth — ASVS coverage is minimal. The main security surface is external links.

---

## Sources

### Primary (HIGH confidence)
- `package.json` — Vite 8.0.11 installed version confirmed
- `npm view vite-plugin-handlebars version time.modified peerDependencies` — v2.0.3, modified 2026-04-21, peerDeps `vite ^5||^6||^7||^8` (Vite 8 confirmed)
- `npm view vite-plugin-html version time.modified` — v3.2.2, modified 2024-01-17 (stale)
- All codebase files read directly: `vite.config.js`, `src/styles/main.css`, `_variables.css`, `_typography.css`, `_nav.css`, `_footer.css`, `_button.css`, `_container.css`, `_section.css`, `_hero.css`, `src/components/nav.html`, `src/components/footer.html`, `index.html`, `src/pages/about.html`, `src/pages/case-studies/cassi.html`, `src/theme.js`, `src/typewriter.js`
- `.planning/phases/01-foundation/01-CONTEXT.md` — locked decisions
- `.planning/phases/01-foundation/01-UI-SPEC.md` — approved design contract (colour tokens, typography roles, layout contract, interaction contract)

### Secondary (MEDIUM confidence)
- npmjs.org weekly download API: `vite-plugin-handlebars` 29,079/week (confirmed 2026-05-17)
- `vite-plugin-handlebars` GitHub repository: github.com/alexlafroscia/vite-plugin-handlebars — real repo, active

### Tertiary (LOW confidence)
- Root-relative path behaviour in Vite MPA build output — training knowledge, not verified against Vite 8 docs [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Vite version confirmed from installed package; vite-plugin-handlebars npm metadata confirmed; Vite 8 peer dep confirmed
- Architecture: HIGH — entire codebase read; all existing pages audited; patterns derived from direct code inspection
- Pitfalls: HIGH — derived from direct codebase audit and known Vite MPA behaviour; one LOW-confidence item (root-relative paths in build) flagged
- Design token changes: HIGH — all values specified verbatim in the approved UI-SPEC

**Research date:** 2026-05-17
**Valid until:** 2026-06-17 (stable stack; vite-plugin-handlebars is active but a minor version bump within 30 days is possible)
