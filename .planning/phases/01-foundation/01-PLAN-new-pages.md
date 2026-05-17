---
phase: 01-foundation
plan: 03
type: execute
wave: 3
depends_on:
  - 01-01
  - 01-02
files_modified:
  - vite.config.js
  - src/styles/main.css
  - src/styles/3-components/_contact.css
  - src/styles/3-components/_stories.css
  - src/pages/contact.html
  - src/pages/stories/index.html
  - src/pages/stories/design-systems-and-portfolio-sites.html
autonomous: false
requirements:
  - PAGE-01
  - PAGE-02
  - PAGE-03
  - PAGE-04
user_setup: []
tags:
  - pages
  - css
  - vite

must_haves:
  truths:
    - "User can visit /src/pages/contact.html and see the editorial contact page with email + LinkedIn + interests list"
    - "User can visit /src/pages/stories/index.html and see at least one post listed with title, date, summary"
    - "User clicking the listed post navigates to /src/pages/stories/design-systems-and-portfolio-sites.html and reads it"
    - "Stories nav link shows aria-current=page on both the stories index and the stories post"
    - "Contact nav link shows aria-current=page on the contact page"
    - "All three new pages render the shared nav and footer via Handlebars partials"
    - "npm run build emits dist/src/pages/contact.html and the two stories pages"
  artifacts:
    - path: "src/pages/contact.html"
      provides: "Editorial contact page — email + LinkedIn + interests"
      contains: "contact__heading"
    - path: "src/pages/stories/index.html"
      provides: "Stories index — date/title list of posts"
      contains: "stories__list"
    - path: "src/pages/stories/design-systems-and-portfolio-sites.html"
      provides: "First Stories post — article reading layout"
      contains: "post__title"
    - path: "src/styles/3-components/_contact.css"
      provides: "Contact page BEM rules (.contact__*)"
      contains: ".contact__links"
    - path: "src/styles/3-components/_stories.css"
      provides: "Stories index + post page BEM rules (.stories__*, .post__*)"
      contains: ".stories__list"
    - path: "vite.config.js"
      provides: "Registration of contact + stories index + stories post entries"
      contains: "storiesPost"
    - path: "src/styles/main.css"
      provides: "Imports of _contact.css and _stories.css"
      contains: "_stories.css"
  key_links:
    - from: "src/pages/contact.html"
      to: "src/components/nav.html"
      via: "{{> nav navContact=true}}"
      pattern: "\\{\\{>\\s*nav\\s+navContact=true\\}\\}"
    - from: "src/pages/stories/index.html"
      to: "src/components/nav.html"
      via: "{{> nav navStories=true}}"
      pattern: "\\{\\{>\\s*nav\\s+navStories=true\\}\\}"
    - from: "src/pages/stories/index.html"
      to: "src/pages/stories/design-systems-and-portfolio-sites.html"
      via: "stories__link href"
      pattern: "href=\"./design-systems-and-portfolio-sites.html\""
    - from: "src/styles/main.css"
      to: "_contact.css, _stories.css"
      via: "@import in 3-components block"
      pattern: "@import './3-components/_(contact|stories)\\.css'"
---

<objective>
Build the three new pages required by the v1 milestone: the editorial contact page (D-07), the Stories index (D-10), and one Stories post example (D-11, D-12) that proves the article reading layout works. Author two new BEM component CSS files (`_contact.css`, `_stories.css`) that hold the page-specific rules — all other styling comes from existing tokens and base typography. Wire the three new pages into `vite.config.js` and the two new CSS files into `src/styles/main.css`.

Purpose: Completes the page inventory promised in PAGE-01, PAGE-02, PAGE-03. After this plan ships, the broken nav links from Plan 02 (Stories, Get in touch) resolve to real pages, and the site is end-to-end walkable. This is the vertical slice that delivers actual reachable destinations — a recruiter clicking "Get in touch" arrives at a page with email and LinkedIn, not a 404.

Output: Three new HTML pages, two new CSS component files, updated vite.config.js, updated main.css. All three pages render the shared nav/footer with correct active state.
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
<!-- Inherited from Plan 02: nav and footer partials. New pages must use the active flag matching their identity. -->

Partial usage in these new pages:
- contact.html               → {{> nav navContact=true}}  +  {{> footer}}
- stories/index.html         → {{> nav navStories=true}}  +  {{> footer}}
- stories/[slug].html        → {{> nav navStories=true}}  +  {{> footer}}

<!-- BEM class names introduced by these pages — must match what _contact.css and _stories.css implement. -->

Contact page classes (in _contact.css):
- .contact (section block)
- .contact__heading           (h1, Heading role per UI-SPEC)
- .contact__intro             (p, Body role)
- .contact__links             (flex container for the two action buttons)
- .contact__interests         (wrapper for the interests subsection)
- .contact__interests-heading (h2, Heading role)
- .contact__interests-list    (ul, Meta role — --text-sm, --color-text-secondary)

Stories index classes (in _stories.css):
- .stories (section block)
- .stories__heading  (h1, Display role)
- .stories__list     (ul)
- .stories__item     (li with border-bottom + border-top:first-child + padding-block)
- .stories__link     (a, flex row title↔date with hover tint)
- .stories__title    (span, Meta role semibold)
- .stories__date     (span, Meta role normal, text-secondary)
- .stories__summary  (p, Body role, text-secondary)

Stories post classes (in _stories.css — sharing the file):
- .post (article block)
- .post__header
- .post__date    (Meta role)
- .post__title   (override h1 to --text-32 → --text-40 per UI-SPEC post page contract)
- .post__body
- .post__back    (back-to-stories link)

Existing layout classes used (already in 4-layouts/_container.css):
- container-reading  (720px max-width — used on all three new pages)

Existing section spacing class (4-layouts/_section.css):
- section-lg
</interfaces>
</context>

<security_notes>
Tier: Static HTML + CSS. No forms (D-07 locks editorial-only contact page). No user input. No backend.
ASVS L1:
- V5 Input Validation: not applicable — zero user input surfaces in this phase.
- V14 Configuration: continue enforcing "no hex outside `_variables.css`" — both new CSS files must use tokens only.
- External links: contact page links to LinkedIn with `target="_blank"` — must include `rel="noopener noreferrer"`. Mailto link does not require it.
Supply chain: no new packages installed in this plan.
</security_notes>

<tasks>

<task type="auto">
  <name>Task 1: Author _contact.css and _stories.css with all BEM rules; import both in main.css</name>
  <files>src/styles/3-components/_contact.css, src/styles/3-components/_stories.css, src/styles/main.css</files>

  <read_first>
    - src/styles/main.css (file being modified — current import order; new imports go at the end of the `/* 3. COMPONENTS */` block, after `_cta.css`)
    - src/styles/1-settings/_variables.css (token names available — confirm --text-sm, --text-32, --text-40, --leading-tight, --color-accent-light, --transition-fast, --radius-sm, --ease-in-out all exist)
    - src/styles/3-components/_nav.css (hover-state and focus-visible patterns to mirror; the `_nav.css line 218` hover tint reference)
    - src/styles/3-components/_button.css (focus-visible and prefers-reduced-motion patterns; lines 50–53 focus ring, lines 66–75 reduced-motion)
    - src/styles/3-components/_card.css (BEM structure pattern for component CSS)
    - src/styles/4-layouts/_container.css (confirm `.container-reading` exists at 720px max-width)
    - .planning/phases/01-foundation/01-PATTERNS.md (`New CSS component files needed` section — full rule listings for both files)
    - .planning/phases/01-foundation/01-UI-SPEC.md (Stories layout contract, Contact page layout contract, Interaction contract)
  </read_first>

  <action>
    Create `src/styles/3-components/_contact.css`. The file holds rules for the contact page block: `.contact__heading`, `.contact__intro`, `.contact__links`, `.contact__interests`, `.contact__interests-heading`, `.contact__interests-list`. Use only design tokens (no hex). Specifics per UI-SPEC Contact page layout contract:

    - `.contact__heading`: rely on the base h1 element rule for font-family/size/weight (the typography corrections from Plan 01 already set Display role at 40 → 56 → 64 → 80 with semibold). Add only `margin-bottom: var(--space-4)` so the next element has clear separation.
    - `.contact__intro`: rely on base `p` element rule for size, line-height, family. Override `color: var(--color-text-primary)` since the intro should read as primary body content, not secondary muted text. Add `margin-bottom: var(--space-6)` before the action buttons.
    - `.contact__links`: flex container, `flex-direction: column`, `gap: var(--space-3)`, `margin-bottom: var(--space-8)`. Inside a `@media (min-width: 600px)` block, switch to `flex-direction: row` so the two buttons sit side by side on tablet+.
    - `.contact__interests-heading`: rely on base h2 element rule. Add `margin-bottom: var(--space-3)`.
    - `.contact__interests-list`: Meta role override — `font-size: var(--text-sm)`, `color: var(--color-text-secondary)`, `line-height: var(--leading-relaxed)`. Use `padding-left: var(--space-3)` (or similar) if needed for list bullets, otherwise rely on the reset.

    The buttons inside `.contact__links` already inherit `.btn`, `.btn--primary`, `.btn--secondary` styles from `_button.css` — do not override button styles in `_contact.css`.

    Create `src/styles/3-components/_stories.css`. The file holds rules for BOTH the stories index (`.stories__*`) and the stories post (`.post__*`). Specifics per UI-SPEC Stories layout contract:

    Stories index rules:
    - `.stories__heading`: rely on base h1. Add `margin-bottom: var(--space-8)`.
    - `.stories__list`: `list-style: none; padding: 0; margin: 0;`
    - `.stories__item`: `border-bottom: 1px solid var(--color-border)`, `padding-block: var(--space-3)`. Add `.stories__item:first-child { border-top: 1px solid var(--color-border); }`
    - `.stories__link`: `display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-4); text-decoration: none; padding: var(--space-2) 0; border-radius: var(--radius-sm); transition: background-color var(--transition-fast);`
    - Hover state for `.stories__link` wrapped in `@media (hover: hover) and (pointer: fine)` — background `var(--color-accent-light)`, padding-inline `var(--space-2)`, margin-inline `calc(var(--space-2) * -1)` so the tint extends slightly beyond the text edge per UI-SPEC hover tint pattern.
    - `.stories__title`: `font-size: var(--text-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary);`
    - `.stories__date`: `font-size: var(--text-sm); font-weight: var(--font-weight-normal); color: var(--color-text-secondary); white-space: nowrap; flex-shrink: 0;`
    - `.stories__summary`: `font-size: var(--text-base); color: var(--color-text-secondary); margin-top: var(--space-1);`
    - Add `:focus-visible` rule for `.stories__link` mirroring the project's focus pattern: `outline: 2px solid var(--color-accent-accessible); outline-offset: 2px; border-radius: var(--radius-sm);`

    Stories post rules (same file):
    - `.post__date`: `font-size: var(--text-sm); font-weight: var(--font-weight-normal); color: var(--color-text-secondary); margin-bottom: var(--space-3);`
    - `.post__title`: this is the Display-role override for the post page. UI-SPEC sets post h1 at `--text-32` mobile → `--text-40` from 600px. Implement as:
      - `.post__title { font-size: var(--text-32); margin-bottom: var(--space-6); }`
      - `@media (min-width: 600px) { .post__title { font-size: var(--text-40); } }`
    - `.post__body p + p`: `margin-top: var(--space-3);` (sibling combinator gives natural paragraph rhythm)
    - `.post__body h2`: rely on base h2 element rule — no override needed. Add `margin-top: var(--space-6)` to give heading-after-paragraph breathing room.
    - `.post__back`: `display: inline-flex; align-items: center; gap: var(--space-1); font-size: var(--text-sm); color: var(--color-text-secondary); text-decoration: none; margin-bottom: var(--space-6); transition: color var(--transition-fast);` plus a hover state changing `color` to `var(--color-accent-accessible)`.
    - Add `prefers-reduced-motion` block per `_button.css` pattern: collapse all transitions in this file to instant when reduced-motion is requested.

    No hex values in either new file. No inline styles. All values come from existing tokens in `_variables.css`.

    Then edit `src/styles/main.css`. Inside the `/* 3. COMPONENTS */` block, immediately AFTER the existing `@import './3-components/_cta.css';` line, append two new lines:
    `@import './3-components/_contact.css';`
    `@import './3-components/_stories.css';`

    Do NOT reorder the existing imports; do not change any other block in main.css.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && test -f src/styles/3-components/_contact.css && test -f src/styles/3-components/_stories.css && echo OK</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "contact__heading\|contact__intro\|contact__links\|contact__interests-heading\|contact__interests-list" src/styles/3-components/_contact.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "stories__heading\|stories__list\|stories__item\|stories__link\|stories__title\|stories__date\|stories__summary\|post__date\|post__title\|post__body\|post__back" src/styles/3-components/_stories.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -E "#[0-9a-fA-F]{3,6}" src/styles/3-components/_contact.css src/styles/3-components/_stories.css | grep -v "^[^:]*:\s*\(\*\|/\*\)" ; echo "exit=$?"</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "_contact.css\|_stories.css" src/styles/main.css</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "prefers-reduced-motion" src/styles/3-components/_stories.css</automated>
  </verify>

  <acceptance_criteria>
    - `src/styles/3-components/_contact.css` exists and contains rules for all six contact BEM classes listed in the action
    - `src/styles/3-components/_stories.css` exists and contains rules for all seven stories BEM classes and all five post BEM classes listed in the action
    - Grep for hex values matching `#[0-9a-fA-F]{3,6}` in `_contact.css` and `_stories.css` returns zero non-comment matches (token-only)
    - `_stories.css` includes a `@media (prefers-reduced-motion: reduce)` block
    - `_stories.css` `.stories__link` hover state is inside `@media (hover: hover) and (pointer: fine)`
    - `_stories.css` `.post__title` has a 600px media query stepping size up to `var(--text-40)`
    - `src/styles/main.css` contains both `@import './3-components/_contact.css';` and `@import './3-components/_stories.css';`, both after the `_cta.css` import line
    - The component imports appear inside the `/* 3. COMPONENTS */` block (line position: before `/* 4. LAYOUTS */`)
    - `npm run build` still exits 0 (the new CSS imports don't break compilation even though the new HTML files don't exist yet — CSS imports don't depend on HTML)
  </acceptance_criteria>

  <done>
    Two new component CSS files exist with token-only rules covering all required BEM classes for contact, stories index, and stories post. Both files imported in main.css inside the components block.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create contact.html, stories/index.html, and the stories post page; register all three in vite.config.js</name>
  <files>src/pages/contact.html, src/pages/stories/index.html, src/pages/stories/design-systems-and-portfolio-sites.html, vite.config.js</files>

  <read_first>
    - src/pages/about.html (analog for HTML page shell — head structure, body wrapper, partial includes, script tag)
    - src/components/nav.html (rewritten partial; confirms the four flag names available)
    - src/components/footer.html (canonical partial)
    - vite.config.js (file being modified — current rollupOptions.input lists 5 entries after Plan 02; three new entries are added here)
    - .planning/phases/01-foundation/01-PATTERNS.md (`src/pages/contact.html`, `src/pages/stories/index.html`, `src/pages/stories/design-systems-and-portfolio-sites.html` sections — full markup patterns)
    - .planning/phases/01-foundation/01-UI-SPEC.md (Contact page layout contract, Stories index/post contracts, Copywriting contract)
    - .planning/phases/01-foundation/01-CONTEXT.md (D-07, D-10, D-11, D-12 for content/layout decisions; specifics section for contact copy)
    - .planning/phases/01-foundation/01-RESEARCH.md (Code Examples section: Stories Index Page Structure, Contact Page Structure; Pitfall 5 — Stories index must have at least one listed post)
  </read_first>

  <action>
    Create `src/pages/contact.html` using the established page shell pattern. The HTML structure:

    - `<!doctype html>` + `<html lang="en">`
    - `<head>` with: `<meta charset="UTF-8">`, viewport meta, `<meta name="description" content="Get in touch with Sam Blake — product designer open to hybrid and remote roles in the North West of England." />`, `<title>Get in touch — Sam Blake | Product Designer</title>`, favicon links, Google Fonts preconnect + Fraunces+Urbanist+Caveat link (copy verbatim from `src/pages/about.html` head — same font subset), and `<link rel="stylesheet" href="/src/styles/main.css" />`.
    - `<body>` begins with `{{> nav navContact=true}}`.
    - `<main>` contains a single section: `<section class="contact section-lg" aria-labelledby="contact-heading">` wrapping `<div class="container-reading">` which contains:
      - `<h1 id="contact-heading" class="contact__heading">Get in touch</h1>`
      - `<p class="contact__intro">I'm open to hybrid and remote product design roles in the North West of England. Also happy to talk mentorship, community events, or swap notes on design.</p>`
      - `<div class="contact__links">` with two `<a class="btn btn--primary">` elements: one `<a href="mailto:sam.blake@outlook.com" class="btn btn--primary">Email me</a>` and one `<a href="https://www.linkedin.com/in/samuel-blake-224605186" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>`
      - `<div class="contact__interests">` containing `<h2 class="contact__interests-heading">What I'm interested in hearing about</h2>` and a `<ul class="contact__interests-list">` with four bullet items: "Product design roles — hybrid or remote, North West England", "Mentorship conversations for career changers", "Community events: NUX, design meetups", "Interesting problems in fintech, retail, or property".
    - Close `</main>`, then `{{> footer}}`, then `<script type="module" src="/src/theme.js"></script>`, then `</body></html>`.

    Create `src/pages/stories/index.html`:

    - Same head shell pattern. Description: "Stories by Sam Blake — reflections on product design, career transitions, and building things." Title: "Stories — Sam Blake | Product Designer".
    - Body begins with `{{> nav navStories=true}}`.
    - `<main>` contains `<section class="stories section-lg" aria-labelledby="stories-heading">` wrapping `<div class="container-reading">` which contains:
      - `<h1 id="stories-heading" class="stories__heading">Stories</h1>`
      - `<ul class="stories__list" role="list">` containing ONE `<li class="stories__item">` for the seeded post. That `<li>` contains:
        - `<a href="./design-systems-and-portfolio-sites.html" class="stories__link">` wrapping `<span class="stories__title">Design systems and portfolio sites</span>` and `<span class="stories__date">May 2026</span>`
        - `<p class="stories__summary">What building this portfolio taught me about design systems in miniature.</p>`
    - Close `</main>`, `{{> footer}}`, theme.js script, close html.

    Note: the empty-state copy from UI-SPEC ("Nothing here yet", "Posts will appear here — check back soon.") is NOT used because one post exists from the start. Per RESEARCH Pitfall 5, the post listing renders by default; the empty state is a future fallback only.

    Create `src/pages/stories/design-systems-and-portfolio-sites.html`:

    - Same head shell. Description: "Design systems and portfolio sites — Sam Blake". Title: "Design systems and portfolio sites — Sam Blake".
    - Body begins with `{{> nav navStories=true}}`.
    - `<main>` contains `<article class="post section-lg" aria-labelledby="post-heading">` wrapping `<div class="container-reading">`:
      - At the top of the container: `<a href="./index.html" class="post__back"><span aria-hidden="true">←</span> Back to stories</a>`
      - Then `<header class="post__header">` containing `<p class="post__date">May 2026</p>` and `<h1 id="post-heading" class="post__title">Design systems and portfolio sites</h1>`
      - Then `<div class="post__body">` containing structural placeholder copy that exercises the typography: one opening paragraph, an `<h2>` sub-heading, two more paragraphs, another `<h2>`, and one final paragraph. The placeholder copy can be loose draft reflecting on what building a token-driven portfolio teaches about design systems — five to seven sentences total, written by Claude in a plain editorial voice. This is structural copy to validate the reading layout; real content is deferred to v2 per the requirements doc.
    - Close `</article>`, `</main>`, `{{> footer}}`, theme.js script.

    Then edit `vite.config.js`. Inside `rollupOptions.input`, ADD three new entries to the existing object (do not remove or reorder the existing five). The full list becomes, in this order to match RESEARCH:
    - main, about, contact, iexchange, cassi, community, storiesIndex, storiesPost
    Where:
    - `contact: r('./src/pages/contact.html')`
    - `storiesIndex: r('./src/pages/stories/index.html')`
    - `storiesPost: r('./src/pages/stories/design-systems-and-portfolio-sites.html')`

    Run `npm run build` after writing all four files. The build must emit dist/src/pages/contact.html, dist/src/pages/stories/index.html, and dist/src/pages/stories/design-systems-and-portfolio-sites.html alongside the existing five pages.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && test -f src/pages/contact.html && test -f src/pages/stories/index.html && test -f src/pages/stories/design-systems-and-portfolio-sites.html && echo OK</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "{{> nav navContact=true}}" src/pages/contact.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "{{> nav navStories=true}}" src/pages/stories/index.html src/pages/stories/design-systems-and-portfolio-sites.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "{{> footer}}" src/pages/contact.html src/pages/stories/index.html src/pages/stories/design-systems-and-portfolio-sites.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "rel=\"noopener noreferrer\"" src/pages/contact.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "contact:\|storiesIndex:\|storiesPost:" vite.config.js</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "href=\"./design-systems-and-portfolio-sites.html\"" src/pages/stories/index.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "container-reading" src/pages/contact.html src/pages/stories/index.html src/pages/stories/design-systems-and-portfolio-sites.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && npm run build</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && test -f dist/src/pages/contact.html && test -f dist/src/pages/stories/index.html && test -f dist/src/pages/stories/design-systems-and-portfolio-sites.html && echo BUILT</automated>
  </verify>

  <acceptance_criteria>
    - `src/pages/contact.html` exists, includes `{{> nav navContact=true}}` and `{{> footer}}`, references `/src/styles/main.css` and `/src/theme.js`, wraps content in `<div class="container-reading">`, and contains the four required BEM blocks: `.contact__heading`, `.contact__intro`, `.contact__links`, `.contact__interests`
    - The LinkedIn link on contact page has `target="_blank" rel="noopener noreferrer"`
    - `src/pages/stories/index.html` exists, includes `{{> nav navStories=true}}` and `{{> footer}}`, wraps content in `container-reading`, contains at least one `<li class="stories__item">` with the seeded post (title, date, summary)
    - The seeded post link in stories/index.html uses `href="./design-systems-and-portfolio-sites.html"` (relative within the stories/ directory)
    - `src/pages/stories/design-systems-and-portfolio-sites.html` exists, includes `{{> nav navStories=true}}` and `{{> footer}}`, wraps content in `container-reading`, contains `.post__back`, `.post__header` with `.post__date` and `.post__title`, and `.post__body` with at least one h2 inside
    - `vite.config.js` `rollupOptions.input` contains exactly 8 entries: main, about, contact, iexchange, cassi, community, storiesIndex, storiesPost
    - `npm run build` exits 0 and `dist/src/pages/contact.html`, `dist/src/pages/stories/index.html`, `dist/src/pages/stories/design-systems-and-portfolio-sites.html` all exist
  </acceptance_criteria>

  <done>
    Three new pages exist with shared partials, root-relative paths, correct active flags, and `container-reading` wrappers; all three registered in vite.config.js; build emits dist outputs for all eight pages.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Verify all three new pages render correctly with shared shell, correct typography, and reachable links</name>
  <what-built>
    Two new CSS component files (`_contact.css`, `_stories.css`) imported in `main.css`. Three new HTML pages: contact.html, stories/index.html, stories/design-systems-and-portfolio-sites.html — each using the shared nav and footer partials, root-relative paths, and `container-reading` 720px wrappers. vite.config.js registers all three new entries. All four post links from the nav (Stories, Get in touch) now resolve to real pages.
  </what-built>
  <how-to-verify>
    1. Run `npm run dev`. Visit `http://localhost:5173/src/pages/contact.html` and confirm:
       - Shared nav at top, shared footer at bottom
       - The "Get in touch" nav link is visually active and has `aria-current="page"` (inspect to confirm)
       - h1 reads "Get in touch", uses Fraunces semibold, sized per UI-SPEC (40px mobile → 56px at 600px, larger at desktop)
       - Below the h1, the intro paragraph is in Urbanist body size with the project line-height
       - Two buttons: "Email me" (primary teal fill) and "Connect on LinkedIn" (secondary). On mobile they stack vertically; on tablet+ they sit side-by-side
       - Click "Email me" — opens email client to `sam.blake@outlook.com`
       - Click "Connect on LinkedIn" — opens LinkedIn profile in a new tab; the link should have `noopener noreferrer` (inspect)
       - Below the buttons, an h2 "What I'm interested in hearing about" plus a four-item list in `--text-sm` muted text
       - Content is constrained to the `container-reading` 720px max — verify by widening the browser; the text column does not exceed roughly 720px
    2. Visit `http://localhost:5173/src/pages/stories/index.html` and confirm:
       - Shared nav and footer, "Stories" nav link active with `aria-current="page"`
       - h1 reads "Stories" using Display role
       - One list item appears showing the post title "Design systems and portfolio sites" (semibold, 14px), the date "May 2026" (regular, 14px, muted) aligned right, and below the link a summary paragraph in body size, muted colour
       - Hovering the list item (on a pointer device, desktop) tints the row background with the pale teal accent-light token. The hover should NOT trigger on touch devices.
       - Keyboard tab into the list link: focus ring appears in the teal accent colour
       - Click the post link — navigates to the post page
    3. On the post page (`/src/pages/stories/design-systems-and-portfolio-sites.html`) confirm:
       - "Stories" nav link still active (`aria-current="page"`)
       - "Back to stories" link at top (with ← arrow). Click it — returns to the stories index
       - Post date appears above the title in small muted text
       - Post title h1 is sized per UI-SPEC post page contract: 32px mobile → 40px from 600px (smaller than the homepage Display scale)
       - Body paragraphs flow at the body size, ~1.7 line-height, with comfortable spacing between paragraphs
       - At least one h2 appears in the body, sized at the Heading role (~28px mobile)
       - Content is constrained to 720px — line length is comfortable, not stretched edge-to-edge on desktop
       - Tab through the page: back link gets a visible focus ring
    4. From the homepage and from About, click "Get in touch" in the nav — both arrive at `/src/pages/contact.html` (the contact page from Task 2)
    5. From the homepage hero CTAs, click "Get in touch" — same destination
    6. Run `npm run build && npm run preview`. Visit each of the three new page URLs against the preview server. Confirm CSS loads (light palette visible), nav and footer render, and links work.
    7. View source on any of the new pages and confirm `{{> nav` / `{{> footer` are NOT present in the rendered HTML — Handlebars must have compiled them into real markup at build time.
    8. Reduced-motion check: in DevTools, set "prefers-reduced-motion: reduce" emulation. Hover the stories list item — the background-tint hover should still apply (it's a colour transition, not motion) but any transform-based motion in the file should be disabled per the prefers-reduced-motion block.
    9. If anything fails (partial not rendering, active state missing, broken link, container too wide, hover misbehaving, build emits wrong files), describe the failure precisely. Otherwise approve.
  </how-to-verify>
  <resume-signal>Type "approved" if the three new pages render with shared shell, correct active state, correct typography roles, reachable internal links, and pass the preview build — or describe what failed.</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| External link → LinkedIn | `target="_blank"` on contact page LinkedIn link. Must include `rel="noopener noreferrer"`. |
| Email link → user mail client | `mailto:` link. No user input; static string. |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-NP-RD | Repudiation (reverse tabnabbing) | Contact page LinkedIn `target="_blank"` | mitigate | `rel="noopener noreferrer"` enforced by acceptance criterion in Task 2 (grep check). |
| T-01-NP-XS | Tampering (XSS via partial context) | Handlebars partial flags | accept | Context flags are compile-time literals (`navContact=true`). No user input ever passed to partials. No template injection possible. |
| T-01-NP-EM | Information Disclosure (email harvesting) | mailto:sam.blake@outlook.com in plaintext | accept | Email is intentionally public-facing per D-07 (this is a portfolio contact page). Spam risk acknowledged; no obfuscation required for foundation phase. |
| T-01-NP-IV | Input Validation | none | n/a | D-07 locks contact page to editorial only; no form, no input surface. |
| T-01-NP-DT | Tampering (configuration drift) | vite.config.js entry list | mitigate | Acceptance criterion enforces exact 8-entry list; build output confirms all 8 pages emit. |
</threat_model>

<verification>
- Task 1: both new CSS files exist, contain all required BEM rules, use only tokens (no hex), and are imported in main.css
- Task 2: three new HTML pages exist with correct partials, root-relative paths, container-reading wrappers, and security attributes; vite.config.js has 8 input entries; `npm run build` succeeds and emits all eight outputs
- Task 3: human-verified visual rendering across all three new pages on dev + preview; active state, link reachability, reduced-motion behaviour confirmed
</verification>

<success_criteria>
- PAGE-01: contact.html exists with complete section structure (nav → main with contact section → footer) and renders the editorial layout per D-07
- PAGE-02: stories/index.html exists with the date/title list layout per D-10
- PAGE-03: stories/design-systems-and-portfolio-sites.html exists with the article reading layout per D-11; serves as the one working post example per D-12
- PAGE-04: all three new pages registered in vite.config.js rollupOptions.input; build emits all 8 dist outputs
- D-07, D-08, D-09 wiring fully connected: contact page is the sole contact destination; homepage cleared in Plan 02; footer links remain
- D-10, D-11, D-12 satisfied
</success_criteria>

<output>
Create `.planning/phases/01-foundation/01-03-SUMMARY.md` when done. Summary must record:
- Files created (5: two CSS + three HTML)
- Files modified (2: vite.config.js, main.css)
- Build output: full dist/ inventory after Plan 03
- Active-flag wiring confirmation for the three new pages
- Visual checkpoint outcome
- Any deviations from UI-SPEC or PATTERNS (expected: none)
</output>
