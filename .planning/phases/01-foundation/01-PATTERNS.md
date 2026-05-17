# Phase 1: Foundation - Pattern Map

**Mapped:** 2026-05-17
**Files analyzed:** 12 (new/modified)
**Analogs found:** 12 / 12

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `vite.config.js` | config | transform | `vite.config.js` (current) | exact |
| `src/components/nav.html` | component | request-response | `src/components/nav.html` (current) + `src/pages/about.html` lines 20–51 | exact |
| `src/components/footer.html` | component | request-response | `src/components/footer.html` (current) + `src/pages/about.html` lines 177–193 | exact |
| `index.html` | page | request-response | `index.html` (current) | exact |
| `src/pages/about.html` | page | request-response | `src/pages/about.html` (current) | exact |
| `src/pages/case-studies/cassi.html` | page | request-response | `src/pages/case-studies/cassi.html` (current) | exact |
| `src/pages/contact.html` | page | request-response | `src/pages/about.html` | role-match |
| `src/pages/stories/index.html` | page | request-response | `src/pages/about.html` | role-match |
| `src/pages/stories/design-systems-and-portfolio-sites.html` | page | request-response | `src/pages/case-studies/cassi.html` | role-match |
| `src/styles/1-settings/_variables.css` | config | transform | `src/styles/1-settings/_variables.css` (current) | exact |
| `src/styles/2-base/_typography.css` | utility | transform | `src/styles/2-base/_typography.css` (current) | exact |
| `src/styles/3-components/_hero.css` | component | request-response | `src/styles/3-components/_hero.css` (current) | exact |

---

## Pattern Assignments

### `vite.config.js` (config, transform)

**Analog:** `vite.config.js` (current, lines 1–26)

**Current pattern** (lines 1–26) — full file, all changes additive:
```javascript
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  root: '.',
  publicDir: 'public',
  appType: 'mpa',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:      r('./index.html'),
        about:     r('./src/pages/about.html'),
        iexchange: r('./src/pages/case-studies/i-exchange.html'),
        cassi:     r('./src/pages/case-studies/cassi.html'),
        community: r('./src/pages/case-studies/community.html'),
      },
    },
  },
})
```

**What changes:**
- Add `import handlebars from 'vite-plugin-handlebars'` after line 1
- Add `plugins: [handlebars({ partialDirectory: r('./src/components'), helpers: { eq: (a, b) => a === b } })]` inside `defineConfig`
- Add three new `rollupOptions.input` entries: `contact`, `storiesIndex`, `storiesPost`

**After pattern** (target state from RESEARCH.md):
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

---

### `src/components/nav.html` (component, request-response)

**Analog:** `src/components/nav.html` (current, lines 8–48) + `src/pages/about.html` nav (lines 20–51)

**Current nav.html structure** (lines 8–48) — this becomes the Handlebars partial:
```html
<header class="nav">
  <div class="nav__inner container">

    <a href="/" class="nav__logo" aria-label="Sam Blake — back to home">Sam Blake</a>

    <button
      class="nav__toggle"
      aria-expanded="false"
      aria-controls="nav-menu"
      aria-label="Open navigation menu"
    >
      <span class="nav__toggle-bar"></span>
      <span class="nav__toggle-bar"></span>
      <span class="nav__toggle-bar"></span>
    </button>

    <nav id="nav-menu" class="nav__menu" aria-label="Main navigation">
      <ul class="nav__list" role="list">
        <li class="nav__item">
          <a href="#case-studies" class="nav__link">Work</a>
        </li>
        <li class="nav__item">
          <a href="#about" class="nav__link">About</a>
        </li>
        <li class="nav__item">
          <a href="#contact" class="nav__link nav__link--cta">Get in touch</a>
        </li>
      </ul>
    </nav>

  </div>
</header>
```

**DOM order to preserve:** logo → hamburger → nav menu. The hamburger comes BEFORE `<nav>` in the component file — this is intentional (screen reader focus order). The current `about.html` and `cassi.html` pages have a divergent order (logo → nav → hamburger). The partial must use the component file's order.

**aria-current pattern** from `src/pages/about.html` line 31:
```html
<a href="about.html" class="nav__link" aria-current="page">About</a>
```

**Handlebars active state pattern** — boolean flag approach (no custom helper needed):
```html
<!-- In nav.html partial — one flag per link, passed from each page -->
<a href="/#case-studies" class="nav__link{{#if navWork}} nav__link--active{{/if}}"
   {{#if navWork}}aria-current="page"{{/if}}>Work</a>

<a href="/src/pages/about.html" class="nav__link{{#if navAbout}} nav__link--active{{/if}}"
   {{#if navAbout}}aria-current="page"{{/if}}>About</a>

<a href="/src/pages/stories/index.html" class="nav__link{{#if navStories}} nav__link--active{{/if}}"
   {{#if navStories}}aria-current="page"{{/if}}>Stories</a>

<a href="/src/pages/contact.html" class="nav__link nav__link--cta{{#if navContact}} nav__link--active{{/if}}"
   {{#if navContact}}aria-current="page"{{/if}}>Get in touch</a>
```

**Usage in page HTML:**
```html
<!-- about.html — Handlebars include with boolean flag -->
{{> nav navAbout=true}}

<!-- stories/index.html -->
{{> nav navStories=true}}

<!-- contact.html -->
{{> nav navContact=true}}

<!-- index.html, case study pages — no flag (no link active) -->
{{> nav}}
```

---

### `src/components/footer.html` (component, request-response)

**Analog:** `src/components/footer.html` (current, lines 5–31) and `src/pages/about.html` (lines 177–193)

**Current footer.html** (lines 5–31) — already the correct canonical markup, becomes the Handlebars partial verbatim:
```html
<footer class="footer">
  <div class="footer__inner container">

    <div class="footer__identity">
      <p class="footer__name">Sam Blake</p>
      <p class="footer__bio">Product designer making complex things simpler for real people.</p>
    </div>

    <nav class="footer__links" aria-label="Contact links">
      <a href="https://www.linkedin.com/in/samuel-blake-224605186" class="footer__link" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href="mailto:sam.blake@outlook.com" class="footer__link">
        sam.blake@outlook.com
      </a>
    </nav>

    <p class="footer__copyright">
      &copy; 2026 Sam Blake
    </p>

  </div>
</footer>
```

**Security note:** All `target="_blank"` links must keep `rel="noopener noreferrer"` — already present on the LinkedIn link. Must not be removed when converting to a partial.

**Usage in page HTML:**
```html
{{> footer}}
```

---

### `index.html` (page, request-response) — MODIFIED

**Analog:** `index.html` (current, lines 1–17 for `<head>`, lines 80–end for hero actions and contact section)

**Head pattern** (lines 1–17) — all pages copy this `<head>` structure:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="[page-specific description]" />
    <title>[Page Title] — Sam Blake | Product Designer</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/favicon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Urbanist:wght@300;400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="/src/styles/main.css" />
  </head>
```

**CSS path:** All pages use `/src/styles/main.css` (root-relative). This replaces:
- `./src/styles/main.css` in `index.html`
- `../styles/main.css` in `src/pages/about.html`
- `../../styles/main.css` in `src/pages/case-studies/cassi.html`

**Hero actions** (lines 78–81) — update `#contact` href only:
```html
<!-- BEFORE -->
<a href="#contact" class="btn btn--secondary">Get in touch</a>

<!-- AFTER -->
<a href="/src/pages/contact.html" class="btn btn--secondary">Get in touch</a>
```

**Contact section to remove** — the entire block matching this pattern in `index.html`:
```html
<section class="cta-section section-md" id="contact">
  ...
</section>
```

**Script tag pattern** from `src/pages/about.html` line 195:
```html
<script type="module" src="../theme.js"></script>
```
After root-relative path strategy, pages at depth use `/src/theme.js`. Homepage uses `./src/theme.js` (current). All should become `/src/theme.js` for consistency — verify with Vite preview.

---

### `src/pages/about.html` (page, request-response) — MODIFIED

**Analog:** `src/pages/about.html` (current, lines 1–197) — self-referential; the file is the analog

**Changes only:**
1. `<link rel="stylesheet" href="../styles/main.css" />` → `href="/src/styles/main.css"`
2. Inline nav block (lines 20–51) → `{{> nav navAbout=true}}`
3. Inline footer block (lines 177–193) → `{{> footer}}`
4. `<script type="module" src="../theme.js"></script>` → `src="/src/theme.js"`
5. Nav logo `href="../../index.html"` → `href="/"`
6. Nav Work link `href="../../index.html#case-studies"` → `href="/#case-studies"`

**Existing page structure** (lines 53–170) — preserve exactly:
```html
<main>
  <section class="about-hero section-lg" aria-labelledby="about-heading">
    <div class="container-content">
      ...
    </div>
  </section>
  <section class="about-section section-md" aria-labelledby="...">
    <div class="container-content">
      ...
    </div>
  </section>
</main>
```

---

### `src/pages/case-studies/cassi.html` + other case study pages — MODIFIED

**Analog:** `src/pages/case-studies/cassi.html` (current, lines 1–627)

**Changes only** — same as `about.html` modifications:
1. CSS path `../../styles/main.css` → `/src/styles/main.css`
2. Inline nav (lines 20–48) → `{{> nav}}`  (no active flag — case study pages have no nav link active)
3. Inline footer (lines 606–622) → `{{> footer}}`
4. Script `../../theme.js` → `/src/theme.js`
5. Nav logo `href="../../index.html"` → `href="/"`
6. Nav Work link `href="../../index.html#case-studies"` → `href="/#case-studies"`
7. CTA link `href="../../index.html#contact"` → `href="/src/pages/contact.html"`

**`<head>` meta description** — preserve existing; do not change case study page titles.

---

### `src/pages/contact.html` (page, request-response) — NEW

**Analog:** `src/pages/about.html` — same role (standalone internal page), same data flow (static HTML, no form)

**Head pattern** — copy from analog, update title and description:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Get in touch with Sam Blake — product designer open to hybrid and remote roles in the North West of England." />
    <title>Get in touch — Sam Blake | Product Designer</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Urbanist:wght@300;400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/main.css" />
  </head>
```

**Body wrapper pattern** — copy from `src/pages/about.html` lines 18–19:
```html
  <body>
    {{> nav navContact=true}}
    <main>
```

**Main content pattern** (from RESEARCH.md contact page structure + UI-SPEC):
```html
    <main>
      <section class="contact section-lg" aria-labelledby="contact-heading">
        <div class="container-reading">
          <h1 id="contact-heading" class="contact__heading">Get in touch</h1>
          <p class="contact__intro">
            I'm open to hybrid and remote product design roles in the North West of England.
            Also happy to talk mentorship, community events, or swap notes on design.
          </p>
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

**Typography mapping:**
- `contact__heading` (h1): Display role → `font-family: var(--font-heading)` but sizing comes from the base `h1` rule in `_typography.css` (no override needed for standard sizing)
- `contact__interests-heading` (h2): Heading role → base `h2` element rule applies automatically
- `contact__intro` (p): Body role → base `p` element rule applies
- `contact__interests-list` (ul > li): Meta role — may need a CSS component rule for `--text-sm`

**Container:** `container-reading` (720px) — already exists in `_container.css` line 31–35.

**Closing pattern** from `src/pages/about.html` lines 170–196:
```html
    {{> footer}}
    <script type="module" src="/src/theme.js"></script>
  </body>
</html>
```

**Security:** `rel="noopener noreferrer"` required on the LinkedIn `target="_blank"` link.

---

### `src/pages/stories/index.html` (page, request-response) — NEW

**Analog:** `src/pages/about.html` — same role (standalone page with reading container), same data flow

**Head pattern** — copy from `src/pages/about.html`, update title/description:
```html
<meta name="description" content="Stories by Sam Blake — reflections on product design, career transitions, and building things." />
<title>Stories — Sam Blake | Product Designer</title>
```

**Body wrapper:**
```html
<body>
  {{> nav navStories=true}}
  <main>
```

**Main content pattern** (from RESEARCH.md stories index structure + UI-SPEC):
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

**Typography mapping (UI-SPEC Stories index):**
- `stories__heading` (h1): Display role — base `h1` element rule
- `stories__title` (span): Meta role, `--font-weight-semibold` 600, `--text-sm` 14px — needs CSS component rule
- `stories__date` (span): Meta role, `--font-weight-normal` 400, `--text-sm`, `--color-text-secondary` — needs CSS component rule
- `stories__summary` (p): Body role — base `p` element rule, but `--color-text-secondary` is already default on `p`

**Row separator pattern** (UI-SPEC): `1px --color-border` between items, `--space-3` top/bottom row padding. Apply as `border-bottom: 1px solid var(--color-border)` and `padding-block: var(--space-3)` on `.stories__item`.

**Hover state:** Background tint `--color-accent-light` on `.stories__link:hover` at `--transition-fast` 150ms.

**Container:** `container-reading` (720px).

**Closing:** Same as contact page — `{{> footer}}` + script tag.

---

### `src/pages/stories/design-systems-and-portfolio-sites.html` (page, request-response) — NEW

**Analog:** `src/pages/case-studies/cassi.html` — closest structural analog (long-form reading content, article body sections)

**Head pattern** — copy from cassi.html lines 1–17, update:
```html
<meta name="description" content="Design systems and portfolio sites — Sam Blake" />
<title>Design systems and portfolio sites — Sam Blake</title>
<link rel="stylesheet" href="/src/styles/main.css" />
```

**Body wrapper:**
```html
<body>
  {{> nav navStories=true}}
  <main>
```

**Article structure** (UI-SPEC post page contract):
```html
    <main>
      <article class="post section-lg" aria-labelledby="post-heading">
        <div class="container-reading">

          <header class="post__header">
            <p class="post__date">May 2026</p>
            <h1 id="post-heading" class="post__title">Design systems and portfolio sites</h1>
          </header>

          <div class="post__body">
            <p>What building this portfolio taught me about design systems in miniature.</p>
            <!-- additional paragraphs, h2 sections -->
            <h2>A heading within the post</h2>
            <p>Body copy continues here...</p>
          </div>

        </div>
      </article>
    </main>
```

**Typography mapping (UI-SPEC post page):**
- `post__title` (h1): Display role — `--text-32` → `--text-40` responsive, Fraunces, `--font-weight-semibold`, `--leading-tight`. Note: the base h1 rule sizes at `--text-40` mobile → `--text-56` at 600px. Post title uses a smaller display scale — may need a `.post__title` override in a new `_stories.css` component file.
- `post__date` (p): Meta role — `--text-sm`, `--color-text-secondary`, `--font-weight-normal`. Needs component CSS override (base `p` is `--text-base`).
- Post body `p`: Body role — base `p` element rule, `--leading-body` 1.7. Paragraph spacing: `margin-top: var(--space-3)` between paragraphs.
- Post body `h2`: Heading role — `--text-28` Fraunces `--font-weight-semibold` — base h2 rule applies.

**Container:** `container-reading` (720px) — wraps the entire article.

**Back link pattern** (from cassi.html line 60–62):
```html
<a href="../index.html" class="post__back">
  <span aria-hidden="true">←</span> Back to stories
</a>
```

**Closing:** `{{> footer}}` + `/src/theme.js` script.

---

### `src/styles/1-settings/_variables.css` (config, transform) — MODIFIED

**Analog:** `src/styles/1-settings/_variables.css` (current, lines 1–139) — self-referential

**Token block to replace** (lines 17–25 in current file) — 9 colour tokens + 1 shadow:

```css
/* BEFORE — dark palette */
--color-bg:                #0d1f1a;
--color-surface:           #152b24;
--color-border:            #1e3d32;
--color-text-primary:      #f0ede6;
--color-text-secondary:    #9db5ac;
--color-accent:            #4fd1a5;
--color-accent-accessible: #4fd1a5;
--color-text-on-accent:    #071210;
--color-accent-light:      #1a3d30;

/* shadow — line 119 */
--shadow-accent: 0 8px 24px -4px rgb(79 209 165 / 0.4);
```

```css
/* AFTER — light palette (UI-SPEC approved values) */
--color-bg:                #f5f2ed;
--color-surface:           #ede9e3;
--color-border:            #d6d0c8;
--color-text-primary:      #1a1614;
--color-text-secondary:    #6b6560;
--color-accent:            #1a6b52;
--color-accent-accessible: #1a6b52;
--color-text-on-accent:    #f5f2ed;
--color-accent-light:      #e6f0ec;

/* shadow — updated for light theme */
--shadow-accent: 0 8px 24px -4px rgb(26 107 82 / 0.18);
```

**All other tokens remain unchanged.** No new tokens introduced. Only these 10 values change.

**Comment block** (lines 9–15) — update to reflect light palette:
```css
/* ---------------------------------------------------------------------------
   COLOUR — light palette
   --color-accent-accessible  mirrors --color-accent: deep teal is dark enough
     to contrast against the light background at >4.5:1.
   --color-text-on-accent  warm white for text sitting ON the teal accent.
   --------------------------------------------------------------------------- */
```

---

### `src/styles/2-base/_typography.css` (utility, transform) — MODIFIED

**Analog:** `src/styles/2-base/_typography.css` (current, lines 1–252) — self-referential

**Changes only — 3 targeted edits:**

**Edit 1 — h1 weight** (line 24): `--font-weight-bold` → `--font-weight-semibold`
```css
/* BEFORE */
h1 { font-weight: var(--font-weight-bold); }

/* AFTER */
h1 { font-weight: var(--font-weight-semibold); }
```

**Edit 2 — h2 weight** (line 33): `--font-weight-bold` → `--font-weight-semibold`
```css
/* BEFORE */
h2 { font-weight: var(--font-weight-bold); }

/* AFTER */
h2 { font-weight: var(--font-weight-semibold); }
```

**Edit 3 — h1 responsive scale correction.** Current 1440px breakpoint sets `h1` to `--text-96` (96px). UI-SPEC caps Display at `--text-80` at 1240px with no further increase. Remove the 1440px `h1` override:

```css
/* BEFORE — lines 116–121 */
@media (min-width: 1440px) {
  h1 { font-size: var(--text-96); }    /* 96px */
  h2 { font-size: var(--text-64); }
  h3 { font-size: var(--text-5xl); }
  h4 { font-size: var(--text-4xl); }
  p  { font-size: var(--text-xl);  }
}

/* AFTER — remove h1 rule from 1440px block */
@media (min-width: 1440px) {
  /* h1 stays at --text-80 from 1240px — no further increase */
  h2 { font-size: var(--text-64); }
  h3 { font-size: var(--text-5xl); }
  h4 { font-size: var(--text-4xl); }
  p  { font-size: var(--text-xl);  }
}
```

**Also correct the h1 mobile starting size.** Current `_typography.css` line 22 sets `h1` to `--text-4xl` (36px). UI-SPEC requires Display role to start at `--text-40` (40px) on mobile:
```css
/* BEFORE — line 22 */
h1 { font-size: var(--text-4xl); }     /* 36px — mobile */

/* AFTER */
h1 { font-size: var(--text-40); }      /* 40px — mobile */
```

**And the 600px breakpoint** (currently `--text-5xl` 48px, UI-SPEC requires `--text-56` 56px):
```css
/* BEFORE — line 88 */
@media (min-width: 600px) { h1 { font-size: var(--text-5xl); } }  /* 48px */

/* AFTER */
@media (min-width: 600px) { h1 { font-size: var(--text-56); } }   /* 56px */
```

All other element rules (`h3`, `h4`, `p`, `a`, `strong`, etc.) remain unchanged.

---

### `src/styles/3-components/_hero.css` (component, request-response) — MODIFIED

**Analog:** `src/styles/3-components/_hero.css` (current, lines 1–174) — self-referential

**Single change — line 92:**
```css
/* BEFORE */
.hero__headline {
  font-weight: var(--font-weight-bold);
  ...
}

/* AFTER */
.hero__headline {
  font-weight: var(--font-weight-semibold);
  ...
}
```

All other rules are preserved exactly. No layout changes to hero CSS in this phase (layout exploration was moved to UI-SPEC direction, and the existing `.hero__inner container-wide` pattern is already correct).

---

### New CSS component files needed

Two new pages (contact, stories) introduce BEM classes that have no existing component CSS analog. These need new files added to `src/styles/3-components/` and imported in `src/styles/main.css`.

**`src/styles/3-components/_contact.css`** — new file

No close analog exists in current codebase. Closest pattern: `src/styles/3-components/_cta.css` (an existing `cta-section` with heading, body, and action buttons). Copy the structural approach:

Pattern from `_card.css` (lines 71–86) for BEM body/heading rule structure:
```css
/* Pattern to follow for .contact__* rules */
.contact__heading {
  /* h1 element rule handles font-family, size, weight — no override needed */
  margin-bottom: var(--space-4);
}

.contact__intro {
  /* p element rule handles font-family, size, line-height — override color only */
  color: var(--color-text-primary);  /* if needed — base p uses --color-text-secondary */
  margin-bottom: var(--space-6);
}

.contact__links {
  display:        flex;
  flex-direction: column;
  gap:            var(--space-3);
  margin-bottom:  var(--space-8);
}

@media (min-width: 600px) {
  .contact__links { flex-direction: row; }
}

.contact__interests-heading {
  /* h2 element rule handles font — no override needed */
  margin-bottom: var(--space-3);
}

.contact__interests-list {
  font-size:   var(--text-sm);   /* Meta role — overrides base ul which inherits p size */
  color:       var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

**`src/styles/3-components/_stories.css`** — new file

No analog exists. Closest pattern: `src/styles/3-components/_card.css` (list items with title, meta, and summary). Use `_nav.css` as the pattern for hover background tint:

```css
/* Stories index */
.stories__heading {
  /* h1 element rule applies — no override needed */
  margin-bottom: var(--space-8);
}

.stories__list {
  list-style: none;
  padding:    0;
  margin:     0;
}

.stories__item {
  border-bottom: 1px solid var(--color-border);
  padding-block: var(--space-3);
}

.stories__item:first-child {
  border-top: 1px solid var(--color-border);
}

.stories__link {
  display:         flex;
  justify-content: space-between;
  align-items:     baseline;
  gap:             var(--space-4);
  text-decoration: none;
  padding:         var(--space-2) 0;
  border-radius:   var(--radius-sm);
  transition:      background-color var(--transition-fast);
}

/* Hover: teal tint background — pattern from _nav.css line 218 */
@media (hover: hover) and (pointer: fine) {
  .stories__link:hover {
    background-color: var(--color-accent-light);
    padding-inline:   var(--space-2);
    margin-inline:    calc(var(--space-2) * -1);
  }
}

.stories__title {
  font-size:   var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color:       var(--color-text-primary);
}

.stories__date {
  font-size:   var(--text-sm);
  font-weight: var(--font-weight-normal);
  color:       var(--color-text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
}

.stories__summary {
  font-size: var(--text-base);
  color:     var(--color-text-secondary);
  margin-top: var(--space-1);
}

/* Post page */
.post__date {
  font-size:     var(--text-sm);
  font-weight:   var(--font-weight-normal);
  color:         var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.post__title {
  /* Override h1 to post display scale per UI-SPEC */
  font-size:     var(--text-32);
  margin-bottom: var(--space-6);
}

@media (min-width: 600px) {
  .post__title { font-size: var(--text-40); }
}

.post__body p + p {
  margin-top: var(--space-3);
}

.post__back {
  display:       inline-flex;
  align-items:   center;
  gap:           var(--space-1);
  font-size:     var(--text-sm);
  color:         var(--color-text-secondary);
  text-decoration: none;
  margin-bottom: var(--space-6);
  transition:    color var(--transition-fast);
}

.post__back:hover {
  color: var(--color-accent-accessible);
}
```

**`src/styles/main.css` additions** — append two new imports in `/* 3. COMPONENTS */` block:
```css
@import './3-components/_contact.css';
@import './3-components/_stories.css';
```

---

## Shared Patterns

### HTML Page Shell
**Source:** `src/pages/about.html` lines 1–17 (`<head>`) and `src/pages/case-studies/cassi.html` lines 1–17
**Apply to:** All new pages (`contact.html`, `stories/index.html`, `stories/design-systems-and-portfolio-sites.html`)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="[page description]" />
    <title>[Page] — Sam Blake | Product Designer</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Urbanist:wght@300;400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/main.css" />
  </head>
  <body>
    {{> nav [navFlag=true]}}
    <main>
      ...
    </main>
    {{> footer}}
    <script type="module" src="/src/theme.js"></script>
  </body>
</html>
```

### Section + Container Pattern
**Source:** `src/pages/about.html` lines 59–65, `src/pages/case-studies/cassi.html` lines 57–111
**Apply to:** All content sections in new pages

```html
<!-- Standard wide section (homepage, about, case studies) -->
<section class="[block-name] section-lg" aria-labelledby="[block]-heading">
  <div class="container">
    <h1 id="[block]-heading" class="[block]__heading">Heading text</h1>
    ...
  </div>
</section>

<!-- Reading section (contact, stories) — use container-reading -->
<section class="[block-name] section-lg" aria-labelledby="[block]-heading">
  <div class="container-reading">
    <h1 id="[block]-heading" class="[block]__heading">Heading text</h1>
    ...
  </div>
</section>
```

### Focus / Accessibility Pattern
**Source:** `src/styles/3-components/_nav.css` lines 44–48, `src/styles/3-components/_button.css` lines 50–53
**Apply to:** All interactive elements in new CSS component files

```css
/* Focus ring — consistent across all interactive elements */
.element:focus-visible {
  outline:        2px solid var(--color-accent-accessible);
  outline-offset: 2px;
  border-radius:  var(--radius-sm);
}
```

### Hover Media Query Pattern
**Source:** `src/styles/3-components/_nav.css` lines 160–163, `src/styles/3-components/_button.css` lines 95–102
**Apply to:** All hover states in new CSS files

```css
/* Hover states always wrapped in media query — pointer-only devices */
@media (hover: hover) and (pointer: fine) {
  .element:hover {
    /* hover style */
  }
}
```

### Transition Pattern
**Source:** `src/styles/3-components/_nav.css` line 35, `src/styles/3-components/_card.css` lines 17–21
**Apply to:** All animated properties in new CSS files

```css
/* Fast transitions: colour/opacity changes — 150ms */
transition: color var(--transition-fast);
transition: background-color var(--transition-fast);

/* Base transitions: movement/layout changes — 200ms with ease-in-out */
transition: transform 200ms var(--ease-in-out);
```

### `prefers-reduced-motion` Pattern
**Source:** `src/styles/3-components/_button.css` lines 66–75
**Apply to:** Any new CSS with transform-based animations

```css
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: background-color 150ms ease, color 150ms ease;
  }
  .element:hover,
  .element:active {
    transform: none !important;
  }
}
```

### External Link Security Pattern
**Source:** `src/components/footer.html` line 16, `src/pages/about.html` line 165
**Apply to:** All `target="_blank"` links in new pages and partials

```html
<a href="https://..." target="_blank" rel="noopener noreferrer">Label</a>
```

---

## No Analog Found

All files have analogs within the codebase. No files require falling back to RESEARCH.md patterns exclusively — though the two new CSS component files (`_contact.css`, `_stories.css`) have no exact BEM analog and are synthesised from patterns across multiple existing component files.

---

## Metadata

**Analog search scope:** All files in `src/styles/`, `src/pages/`, `src/components/`, `index.html`, `vite.config.js`, `src/theme.js`
**Files scanned:** 18 source files read directly
**Pattern extraction date:** 2026-05-17
