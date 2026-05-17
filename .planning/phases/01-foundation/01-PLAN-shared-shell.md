---
phase: 01-foundation
plan: 02
type: execute
wave: 2
depends_on:
  - 01-01
files_modified:
  - package.json
  - vite.config.js
  - src/components/nav.html
  - src/components/footer.html
  - index.html
  - src/pages/about.html
  - src/pages/case-studies/cassi.html
  - src/pages/case-studies/community.html
  - src/pages/case-studies/i-exchange.html
autonomous: false
requirements:
  - NAV-01
  - NAV-02
  - NAV-03
  - NAV-04
  - NAV-05
  - PAGE-04
user_setup: []
tags:
  - vite
  - templating
  - nav
  - footer

must_haves:
  truths:
    - "Every existing page renders nav and footer from the shared partials — editing nav.html updates all pages"
    - "Nav active state is highlighted correctly on the current page via aria-current=page"
    - "No page imports CSS or JS using ../ relative paths — all references are root-relative"
    - "No #contact section exists in index.html (homepage ends after case studies)"
    - "All four #contact href links in existing pages point to /src/pages/contact.html (page itself is created in Plan 03)"
    - "npm run build succeeds and emits dist/ output containing all five registered pages"
  artifacts:
    - path: "package.json"
      provides: "vite-plugin-handlebars dependency"
      contains: "vite-plugin-handlebars"
    - path: "vite.config.js"
      provides: "Handlebars plugin registration with partialDirectory"
      contains: "vite-plugin-handlebars"
    - path: "src/components/nav.html"
      provides: "Single canonical nav markup with Handlebars active-state flags"
      contains: "navAbout"
    - path: "src/components/footer.html"
      provides: "Single canonical footer markup (unchanged from current)"
      contains: "footer__name"
  key_links:
    - from: "every existing page"
      to: "src/components/nav.html"
      via: "Handlebars partial include {{> nav ...}}"
      pattern: "\\{\\{>\\s*nav"
    - from: "every existing page"
      to: "src/components/footer.html"
      via: "Handlebars partial include {{> footer}}"
      pattern: "\\{\\{>\\s*footer"
    - from: "every existing page <head>"
      to: "/src/styles/main.css"
      via: "root-relative href"
      pattern: "href=\"/src/styles/main.css\""
---

<objective>
Establish the walking-skeleton shell: install `vite-plugin-handlebars`, wire it into `vite.config.js` with `src/components/` as the partial directory, rewrite `src/components/nav.html` to use boolean active-state flags, then convert every existing page (index, about, three case studies) to use `{{> nav navX=true}}` and `{{> footer}}`. Switch every page's CSS and JS references to root-relative paths. Remove the `#contact` section from `index.html` (D-08). Update every `href="#contact"` across the existing pages to `href="/src/pages/contact.html"` so the upcoming contact page (built in Plan 03) is the single contact destination.

Purpose: This is the structural backbone. After this plan, the existing site has the shared shell that NAV-01, NAV-02, NAV-03, NAV-04 demand. The build still ships only the existing five pages; new pages (contact, stories) arrive in Plan 03 once the shell is proven. Doing the shell as a discrete wave avoids interleaving plugin installation with new-page creation and gives a clean checkpoint where the user can confirm the existing site still works on the new partial system.

Output: Plugin installed; partial-driven nav and footer in place on every existing page; all internal links audited and fixed; `npm run build` and `npm run preview` both succeed against the existing five pages.
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
<!-- Partial include API — every page consumes these via Handlebars syntax. -->

Nav partial (src/components/nav.html) — accepts these boolean context flags:
- navWork     : true if current page is the "Work" destination (homepage with case-studies anchor)
- navAbout    : true if current page is About
- navStories  : true if current page is Stories index OR a stories post
- navContact  : true if current page is Contact

Exactly zero or one flag should be true per page. When a flag is true:
- The matching `<a>` gets class `nav__link--active` AND attribute `aria-current="page"`
- Other links do not get the active treatment

Usage from a page:
- {{> nav navAbout=true}}   — About page
- {{> nav navStories=true}} — Stories index, Stories post
- {{> nav navContact=true}} — Contact page
- {{> nav}}                 — Homepage, all case study pages (no active item)

Footer partial (src/components/footer.html) — no context flags. Usage:
- {{> footer}}

Vite config plugin registration:
- handlebars({ partialDirectory: r('./src/components') })
- No `eq` helper needed — boolean-flag approach avoids comparison helpers (per RESEARCH Pitfall 1).

Path strategy (locked):
- CSS: <link rel="stylesheet" href="/src/styles/main.css" />
- JS: <script type="module" src="/src/theme.js"></script>
- Favicon: already <link rel="icon" href="/favicon.png"> (no change)
- Nav logo: <a href="/" class="nav__logo">
- Work link: href="/#case-studies"
- About link: href="/src/pages/about.html"
- Stories link: href="/src/pages/stories/index.html"  (page doesn't exist yet — created in Plan 03)
- Contact link: href="/src/pages/contact.html"        (page doesn't exist yet — created in Plan 03)
</interfaces>
</context>

<security_notes>
Tier: Build-time HTML templating + dev dependency install.
ASVS L1:
- V14 Configuration: new dependency `vite-plugin-handlebars` 2.0.3. Package legitimacy audited in RESEARCH.md (29k/wk downloads, MIT, established 2021, real GitHub source, Vite 8 peer dep verified). [ASSUMED] verdict from RESEARCH — slopcheck was unavailable. Requires a blocking human-verify checkpoint BEFORE install per planner gate.
- V5 Input Validation: not applicable — Handlebars templates take no user input. Context flags come from compile-time literals in page HTML, never from query parameters or form data.
- External links `target="_blank"` in `src/components/footer.html` keep `rel="noopener noreferrer"` — verified in PATTERNS analog. Do not remove during the partial conversion.
Supply chain: blocking checkpoint (T-01-SS-SC) before `npm install --save-dev vite-plugin-handlebars`.
</security_notes>

<tasks>

<task type="checkpoint:human-verify" gate="blocking-human">
  <name>Task 1: Approve installation of vite-plugin-handlebars (package legitimacy gate)</name>
  <what-built>
    Nothing yet — this is the supply-chain checkpoint required before `npm install`. RESEARCH.md `## Package Legitimacy Audit` recorded `vite-plugin-handlebars` 2.0.3 as `[ASSUMED]` because slopcheck was unavailable at research time. Per the planner's package legitimacy gate, an `[ASSUMED]` package must be human-verified before install.
  </what-built>
  <how-to-verify>
    1. Visit https://www.npmjs.com/package/vite-plugin-handlebars and confirm the page loads with:
       - Latest version: `2.0.3` (or higher in the 2.x line)
       - Weekly downloads: in the tens of thousands (research recorded 29,079/week as of 2026-05-17)
       - Repository link points to `github.com/alexlafroscia/vite-plugin-handlebars`
       - License: MIT
       - Last published date is reasonably recent (research recorded "3 weeks ago" relative to 2026-05-17)
    2. Visit https://github.com/alexlafroscia/vite-plugin-handlebars and confirm:
       - Real repository (not a typosquat) with multiple commits, issues, and releases
       - README documents `partialDirectory` and helper registration
       - Peer dependencies include Vite 7/8 (or current Vite version)
    3. (Optional) Run `npm view vite-plugin-handlebars version time.modified peerDependencies` and check the output matches the research findings.
    4. If all of the above check out, approve the install. If anything looks off — wrong owner, typosquat suspicion, dead repo, peer dep mismatch — reject and we'll explore alternatives.
  </how-to-verify>
  <resume-signal>Type "approved" to proceed with `npm install --save-dev vite-plugin-handlebars` — or describe the concern that blocks approval.</resume-signal>
</task>

<task type="auto">
  <name>Task 2: Install vite-plugin-handlebars; wire plugin and update vite.config.js</name>
  <files>package.json, vite.config.js</files>

  <read_first>
    - package.json (current dependencies — confirm vite ^8.0.10 is present)
    - vite.config.js (the file being modified — current rollupOptions.input lists the 5 existing pages)
    - .planning/phases/01-foundation/01-RESEARCH.md (`vite.config.js` After Phase 1 section — full target config; note that storiesIndex/storiesPost/contact entries are added LATER in Plan 03, not in this task)
    - .planning/phases/01-foundation/01-PATTERNS.md (`vite.config.js` section — current vs. after blocks)
  </read_first>

  <action>
    First, run `npm install --save-dev vite-plugin-handlebars` from the project root. This adds `vite-plugin-handlebars` to `devDependencies` in `package.json` and updates `package-lock.json`. Do not pin to a tilde or caret manually — let npm record the resolved version.

    Then edit `vite.config.js`:
    1. After the existing `import { fileURLToPath } from 'url'` line, add `import handlebars from 'vite-plugin-handlebars'`.
    2. Inside the `defineConfig({ ... })` call, BEFORE the `build:` key (so plugin registration comes before build config), add a `plugins:` array containing a single call to `handlebars({ partialDirectory: r('./src/components') })`. Do not register an `eq` helper — the boolean-flag pattern used by the partials (next task) needs no comparison helper.
    3. Do NOT add `contact`, `storiesIndex`, or `storiesPost` entries to `rollupOptions.input` in this task. Those entries are added in Plan 03 alongside the page files themselves so a build never registers a non-existent file.
    4. Keep the existing five `rollupOptions.input` entries (main, about, iexchange, cassi, community) verbatim.
    5. Preserve the existing comment about `'mpa'` disabling SPA fallback.

    After the file is written, run `npm run build` from the project root. The build must succeed with no errors. (The build will still emit only the existing five pages — Handlebars partials won't yet be referenced from any page; that's expected at this point.)
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && node -e "const p=require('./package.json'); if(!p.devDependencies['vite-plugin-handlebars']) process.exit(1); console.log(p.devDependencies['vite-plugin-handlebars'])"</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "vite-plugin-handlebars\|partialDirectory" vite.config.js</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && npm run build</automated>
  </verify>

  <acceptance_criteria>
    - `package.json` `devDependencies` contains `vite-plugin-handlebars` with a 2.x version specifier
    - `package-lock.json` exists and was updated by the install
    - `vite.config.js` contains `import handlebars from 'vite-plugin-handlebars'`
    - `vite.config.js` contains `plugins: [` followed by `handlebars({` and `partialDirectory: r('./src/components')`
    - `vite.config.js` `rollupOptions.input` still lists exactly the 5 existing entries: main, about, iexchange, cassi, community (no contact/stories entries yet — those come in Plan 03)
    - `npm run build` exits 0 and writes `dist/index.html`, `dist/src/pages/about.html`, `dist/src/pages/case-studies/cassi.html`, `dist/src/pages/case-studies/community.html`, `dist/src/pages/case-studies/i-exchange.html`
  </acceptance_criteria>

  <done>
    Plugin installed; vite.config.js registers the Handlebars plugin with `src/components/` as partial directory; existing 5-page build still succeeds.
  </done>
</task>

<task type="auto">
  <name>Task 3: Rewrite nav.html and footer.html as canonical partials with active-state flags</name>
  <files>src/components/nav.html, src/components/footer.html</files>

  <read_first>
    - src/components/nav.html (current canonical markup — keep DOM order logo → hamburger → nav menu)
    - src/components/footer.html (current canonical markup — already correct; verify rel="noopener noreferrer" on LinkedIn link)
    - .planning/phases/01-foundation/01-PATTERNS.md (`src/components/nav.html` section — full Handlebars active-flag pattern with the four boolean flags)
    - .planning/phases/01-foundation/01-RESEARCH.md (Pattern 1 Handlebars Partial Include — context variable approach; Pitfall 1 confirms boolean-flag approach over `eq` helper)
    - .planning/phases/01-foundation/01-UI-SPEC.md (Nav structure and visual spec — Work / About / Stories / Get in touch)
    - .planning/phases/01-foundation/01-CONTEXT.md (D-04 final nav structure, D-05 Get in touch destination, D-06 Stories naming)
  </read_first>

  <action>
    Rewrite `src/components/nav.html` so the four nav links match D-04 final structure and each link uses the Handlebars boolean-flag active pattern. Preserve the DOM order logo → hamburger → nav menu (the current file already has this order — do not reorder). Preserve all existing accessibility attributes: `aria-label` on the logo and the toggle, `aria-expanded="false"` and `aria-controls="nav-menu"` on the toggle, `aria-label="Main navigation"` on `<nav>`, `role="list"` on `<ul>`. Update href values to root-relative paths.

    The four link `<li>` items become:
    1. Work: `<a href="/#case-studies" class="nav__link{{#if navWork}} nav__link--active{{/if}}"{{#if navWork}} aria-current="page"{{/if}}>Work</a>`
    2. About: `<a href="/src/pages/about.html" class="nav__link{{#if navAbout}} nav__link--active{{/if}}"{{#if navAbout}} aria-current="page"{{/if}}>About</a>`
    3. Stories: `<a href="/src/pages/stories/index.html" class="nav__link{{#if navStories}} nav__link--active{{/if}}"{{#if navStories}} aria-current="page"{{/if}}>Stories</a>`
    4. Get in touch: `<a href="/src/pages/contact.html" class="nav__link nav__link--cta{{#if navContact}} nav__link--active{{/if}}"{{#if navContact}} aria-current="page"{{/if}}>Get in touch</a>`

    Note: the Stories and Contact pages themselves don't exist until Plan 03; the hrefs are still written now because nav.html is the single source of truth and rewriting it later would defeat NAV-01. The links will 404 in dev between Plan 02 and Plan 03 — that is expected and is the natural seam between the structural wave and the new-page wave.

    Logo: keep as `<a href="/" class="nav__logo" aria-label="Sam Blake — back to home">Sam Blake</a>` (already correct).

    Update the top file comment so it accurately describes the partial: this is now the single canonical nav, included by every page via `{{> nav}}` or `{{> nav navAbout=true}}` etc. Document the four flag names (navWork, navAbout, navStories, navContact) and the rule "exactly zero or one flag may be true". State that JS for the hamburger toggle lives in `src/theme.js` and is unchanged.

    Footer: open `src/components/footer.html` and confirm it matches the canonical markup described in PATTERNS (footer__inner.container, footer__identity, footer__links nav with `aria-label="Contact links"`, two footer__link items — LinkedIn with `target="_blank" rel="noopener noreferrer"` and the mailto, plus footer__copyright). If anything in the current file differs from that canonical markup, restore it to the canonical version. Do NOT remove `rel="noopener noreferrer"` from the LinkedIn link under any circumstances. Update the top file comment to document that this is the single canonical footer, included by every page via `{{> footer}}`, no context flags.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "navWork\|navAbout\|navStories\|navContact" src/components/nav.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -nE "href=\"/(#case-studies|src/pages/about.html|src/pages/stories/index.html|src/pages/contact.html)\"" src/components/nav.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "aria-current=\"page\"" src/components/nav.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "nav__toggle\|nav__menu\|nav__logo" src/components/nav.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "rel=\"noopener noreferrer\"" src/components/footer.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "footer__name\|footer__bio\|footer__copyright" src/components/footer.html</automated>
  </verify>

  <acceptance_criteria>
    - `src/components/nav.html` contains all four boolean flag references: `navWork`, `navAbout`, `navStories`, `navContact`
    - `src/components/nav.html` contains exactly four `<a class="nav__link...` link elements with hrefs `/#case-studies`, `/src/pages/about.html`, `/src/pages/stories/index.html`, `/src/pages/contact.html` in that order
    - The "Get in touch" link uses the additional class `nav__link--cta`
    - DOM order: `nav__logo` appears before `nav__toggle`, which appears before `nav__menu`
    - `nav__toggle` button retains `aria-expanded="false"`, `aria-controls="nav-menu"`, `aria-label="Open navigation menu"`
    - `nav__menu` retains `id="nav-menu"`, `aria-label="Main navigation"`
    - `src/components/footer.html` contains `target="_blank" rel="noopener noreferrer"` on the LinkedIn link
    - `src/components/footer.html` contains the three required BEM elements: `footer__name`, `footer__bio`, `footer__copyright`
    - Both files have an updated top comment documenting their role as Handlebars partials (search for "partial" or "{{> nav" / "{{> footer" in the comment)
  </acceptance_criteria>

  <done>
    nav.html exposes four boolean active flags and the four correct root-relative hrefs; footer.html is the canonical version with security attributes intact; both files document themselves as the single source of truth.
  </done>
</task>

<task type="auto">
  <name>Task 4: Convert all five existing pages to use partials, root-relative paths, and remove the homepage #contact section</name>
  <files>index.html, src/pages/about.html, src/pages/case-studies/cassi.html, src/pages/case-studies/community.html, src/pages/case-studies/i-exchange.html</files>

  <read_first>
    - index.html (file being modified — see inline nav near top, hero CTAs near line 35 and line 80, and #contact section near line 169)
    - src/pages/about.html (file being modified — inline nav around lines 20–51, inline footer around lines 177–193, script tag, and `#contact` section around line 154)
    - src/pages/case-studies/cassi.html (file being modified — inline nav around lines 20–48, inline footer around lines 606–622, CTA href `#contact`)
    - src/pages/case-studies/community.html (file being modified — same structure as cassi.html, footer around line 625)
    - src/pages/case-studies/i-exchange.html (file being modified — same structure as cassi.html, footer around line 646)
    - src/components/nav.html (just-rewritten partial that these pages will include)
    - src/components/footer.html (canonical footer these pages will include)
    - .planning/phases/01-foundation/01-PATTERNS.md (section per existing page — `index.html`, `src/pages/about.html`, `src/pages/case-studies/cassi.html` — for the exact list of changes per page)
    - .planning/phases/01-foundation/01-RESEARCH.md (Existing Codebase Audit — about page contact section decision; Pitfall 4 — DOM order)
    - .planning/phases/01-foundation/01-CONTEXT.md (D-08 — homepage contact section removed entirely)
  </read_first>

  <action>
    For each of the five existing pages, make these targeted replacements. Do NOT touch any other content (hero copy, case study sections, about page article content, etc.). The only edits per page are: (a) head href values, (b) nav block replacement, (c) footer block replacement, (d) script tag href, and where listed, (e) `#contact` href replacement / section removal.

    ### index.html

    1. `<link rel="stylesheet" href="./src/styles/main.css" />` becomes `<link rel="stylesheet" href="/src/styles/main.css" />`
    2. Replace the entire inline nav block (the `<header class="nav">...</header>` element near the top of `<body>`) with the single line `{{> nav}}`. The homepage has no active nav item (Work scrolls to the in-page anchor — no flag set).
    3. In the hero CTA section, change `<a href="#contact" class="btn btn--primary">Get in touch</a>` (around line 35) to `<a href="/src/pages/contact.html" class="btn btn--primary">Get in touch</a>`.
    4. In the hero actions block at around line 80, change `<a href="#contact" class="btn btn--secondary">Get in touch</a>` to `<a href="/src/pages/contact.html" class="btn btn--secondary">Get in touch</a>`.
    5. REMOVE the entire `<section class="cta-section section-md" id="contact" aria-labelledby="contact-heading">...</section>` block (around line 169 through the matching `</section>` close tag). The homepage must end after the case-studies section, then go straight to footer. Per D-08.
    6. Replace the inline `<footer class="footer">...</footer>` block (the page's existing footer markup, if present) with `{{> footer}}`.
    7. If the page references the theme.js script with a relative path like `./src/theme.js`, change to `/src/theme.js`. If the page does not currently load theme.js, add `<script type="module" src="/src/theme.js"></script>` just before `</body>` so the mobile hamburger toggle works (the partial nav includes the hamburger button).
    8. Confirm the typewriter script reference is also root-relative (`/src/typewriter.js`) if it's used on this page.

    ### src/pages/about.html

    1. `<link rel="stylesheet" href="../styles/main.css" />` becomes `<link rel="stylesheet" href="/src/styles/main.css" />`.
    2. Replace the inline nav block (around lines 20–51) with `{{> nav navAbout=true}}`.
    3. In the about-hero CTA buttons section (around line 34), change `<a href="#contact" class="btn btn--primary">Get in touch</a>` to `<a href="/src/pages/contact.html" class="btn btn--primary">Get in touch</a>`. The other CTA in the same group ("See my work") should keep its href to the homepage case-studies anchor; if it currently uses a relative path like `../../index.html#case-studies`, change to `/#case-studies`.
    4. Replace the inline footer block (around lines 177–193) with `{{> footer}}`.
    5. Change `<script type="module" src="../theme.js"></script>` to `<script type="module" src="/src/theme.js"></script>`.
    6. The about page has its own inline `<section class="cta-section section-md" id="contact">...` near line 154. PRESERVE this section's markup and structure unchanged BUT update its inner CTA href: any `<a href="#contact">` or `<a href="mailto:...">` inside it should be reviewed. The decision (RESEARCH Assumption A3): the about page contact CTA section stays in place because it serves as an inline mid-page CTA, not a trailing cap like the homepage. If the about page section contains an `<a href="#contact">` button inside it (self-referential), change that href to `/src/pages/contact.html`. Do not remove the section.

    ### src/pages/case-studies/cassi.html, community.html, i-exchange.html

    Apply identical changes to all three case study pages:
    1. `<link rel="stylesheet" href="../../styles/main.css" />` becomes `<link rel="stylesheet" href="/src/styles/main.css" />`.
    2. Replace the inline nav block with `{{> nav}}` (no flag — case studies do not have an active top-nav item).
    3. Replace the inline footer block with `{{> footer}}`.
    4. Change `<script type="module" src="../../theme.js"></script>` (or similar relative path) to `<script type="module" src="/src/theme.js"></script>`.
    5. The case study pages have CTA blocks that link to `../../index.html#contact`. Change every such href to `/src/pages/contact.html`.
    6. Note: the case study pages currently have `<footer class="footer" id="contact">` — the `id="contact"` attribute on the footer element is a hack to make `#contact` anchors work. When the footer is replaced by `{{> footer}}`, this id is gone. That's correct — the partial footer has no `id="contact"`, and all `#contact` links have been replaced with the absolute contact page path.

    ### Cross-cutting rules

    - Every link from the top-level home (`<a href="/">` or `<a href="../../index.html">`) becomes `<a href="/">` (the nav logo) — but the nav logo lives in the partial now so each page's body should only need the changes listed above.
    - Do not change page `<title>` or `<meta name="description">`.
    - Do not change the case study page main content (sections, stat blocks, body copy).

    After editing all five pages, run `npm run dev` and visit each page to confirm partials render and links work. Then run `npm run build` to confirm the build still passes. The build will not yet emit contact.html or stories pages — those come in Plan 03 — but build must succeed for the existing five pages.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -L "{{> nav" index.html src/pages/about.html src/pages/case-studies/cassi.html src/pages/case-studies/community.html src/pages/case-studies/i-exchange.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -L "{{> footer" index.html src/pages/about.html src/pages/case-studies/cassi.html src/pages/case-studies/community.html src/pages/case-studies/i-exchange.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -rn "href=\"#contact\"\|href=\"\\.\\./\\.\\./index\\.html#contact\"" index.html src/pages/</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -rn "href=\"\\.\\./styles\\|href=\"\\.\\./\\.\\./styles\\|href=\"\\./src/styles" index.html src/pages/</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "id=\"contact\"" index.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "{{> nav navAbout=true}}" src/pages/about.html</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && npm run build</automated>
  </verify>

  <acceptance_criteria>
    - All five files contain the literal string `{{> nav` somewhere in `<body>`
    - All five files contain the literal string `{{> footer}}` somewhere in `<body>`
    - `src/pages/about.html` contains `{{> nav navAbout=true}}` (active flag set)
    - `index.html` and the three case study pages contain `{{> nav}}` without an active flag
    - Grep for `href="#contact"` returns zero matches across index.html and src/pages/
    - Grep for `../../index.html#contact` returns zero matches anywhere in src/pages/
    - Grep for `../styles/` and `../../styles/` returns zero matches in index.html and src/pages/ (all paths root-relative)
    - Grep for `./src/styles/` returns zero matches in index.html (the homepage path was the only relative one starting with `./`)
    - `index.html` contains zero occurrences of `id="contact"` (homepage cta-section removed entirely)
    - All five files contain `<link rel="stylesheet" href="/src/styles/main.css" />`
    - All five files contain `<script type="module" src="/src/theme.js"></script>` (or similar with the root-relative path)
    - `npm run build` exits 0 and dist/ contains the five existing page outputs
  </acceptance_criteria>

  <done>
    All five existing pages use the partial nav and footer; all hrefs are root-relative; homepage `#contact` section is gone; `#contact` hrefs all updated to `/src/pages/contact.html`; build passes.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5: Verify shared nav/footer render correctly on every existing page; verify NAV-05 cleanup status</name>
  <what-built>
    `vite-plugin-handlebars` installed and wired. `src/components/nav.html` is now the single canonical nav with four boolean active flags. `src/components/footer.html` is unchanged but documented as the canonical partial. All five existing pages (index, about, three case studies) include nav and footer via `{{> nav ...}}` / `{{> footer}}`. All paths are root-relative. The homepage no longer has a `#contact` section. All `#contact` hrefs across the site now point to `/src/pages/contact.html` (which doesn't yet exist — created in Plan 03).
  </what-built>
  <how-to-verify>
    1. Run `npm run dev`. Visit `http://localhost:5173/` and confirm:
       - Page loads with nav at the top and footer at the bottom
       - Nav contains exactly four links: Work, About, Stories, Get in touch
       - The "Get in touch" link is styled as a CTA (different visual treatment from the other three — uses `nav__link--cta`)
       - Hovering each nav link transitions to the teal accent colour
       - No `aria-current="page"` on any nav link (homepage doesn't set a flag)
       - The page ends with the case studies section followed by the footer — no "Want to work together?" cta-section between them
       - Footer contains the LinkedIn link and the mailto link, both still working
    2. Visit `http://localhost:5173/src/pages/about.html` and confirm:
       - Same nav and footer markup as the homepage
       - The "About" link in the nav is visually active and inspecting it in DevTools shows `aria-current="page"` set on it
       - No other nav link has `aria-current`
    3. Visit `http://localhost:5173/src/pages/case-studies/cassi.html`, `community.html`, and `i-exchange.html` and confirm:
       - Each renders the same shared nav and footer
       - No `aria-current` on any nav link (case study pages don't set a flag)
       - Footer is the partial — no leftover `id="contact"` attribute on it (inspect the footer element to confirm)
    4. Click "Get in touch" in the nav from each page. The link should go to `/src/pages/contact.html` which currently 404s — that's expected; Plan 03 creates that page.
    5. Click "Stories" in the nav from each page. Same — `/src/pages/stories/index.html` 404s; Plan 03 creates it.
    6. Click "Work" from each page. From the homepage, it scrolls to `#case-studies`. From any other page, it should navigate to `/` and then scroll to `#case-studies`.
    7. Verify NAV-05 cleanup status (RESEARCH says these duplicates do not exist):
       - From the project root, list `src/pages/` and confirm it contains exactly `about.html`, the `case-studies/` subdirectory, and nothing else
       - Confirm `src/pages/cassi.html`, `src/pages/community.html`, `src/pages/i-exchange.html` do NOT exist at the `src/pages/` root level
    8. Run `npm run build && npm run preview`, then visit each of the five page URLs against the preview server. All five pages must render correctly with shared nav/footer.
    9. On mobile width (resize to <905px), the hamburger button should appear. Click it. The nav menu should open (`.nav--open` class toggles, `aria-expanded` updates). Click again to close.
    10. If anything fails — partial not rendering, active state missing, broken link to an existing page, footer with leftover `id="contact"`, NAV-05 duplicates actually present — describe the failure precisely. If everything renders as described, approve.
  </how-to-verify>
  <resume-signal>Type "approved" if every existing page renders the shared nav and footer, the active state works on the About page, no `#contact` artefacts remain, and NAV-05 duplicates are confirmed absent — or describe what failed.</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| npm registry → dev dependency | Supply-chain entry point. New devDependency `vite-plugin-handlebars` 2.0.3 enters the build toolchain. |
| Handlebars template → HTML output | Build-time templating. Context flags are compile-time literals from page HTML, not runtime user input. |
| External nav/footer links → user browser | Existing `target="_blank"` on LinkedIn footer link; must preserve `rel="noopener noreferrer"`. |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-SS-SC | Tampering | npm install of `vite-plugin-handlebars` | mitigate | Blocking human checkpoint (Task 1) verifies package legitimacy at npmjs.com and the GitHub repo before install. RESEARCH `[ASSUMED]` verdict + manual checkpoint per planner gate. |
| T-01-SS-XS | Tampering (XSS) | Handlebars partial output | accept | All context values are compile-time literals authored in page HTML (e.g. `navAbout=true`). No runtime user input is ever passed to a partial. Handlebars escapes string interpolation by default (`{{var}}`); this plan uses only `{{#if flag}}` conditionals which emit hardcoded class names and attributes. No template injection surface. |
| T-01-SS-RD | Repudiation | External LinkedIn link | mitigate | Footer LinkedIn link retains `target="_blank" rel="noopener noreferrer"` — verified by acceptance criterion in Task 3. |
| T-01-SS-ID | Information Disclosure | dist/ build output | accept | Static HTML only — no secrets, no env vars, no API keys in this phase. |
| T-01-SS-DS | Denial of Service | Handlebars template recursion | accept | Partials do not include other partials. No recursion possible. |
| T-01-SS-EP | Elevation of Privilege | Build-time plugin | accept | Plugin runs only during `vite dev` / `vite build`. No production runtime presence. Sandbox = developer machine + CI. |
</threat_model>

<verification>
- Task 1: human-verified package legitimacy
- Task 2: vite-plugin-handlebars in package.json devDependencies; vite.config.js imports and registers it; `npm run build` succeeds
- Task 3: nav.html exposes four boolean flags; footer.html canonical with security attributes; both documented
- Task 4: all five existing pages use partials and root-relative paths; homepage `#contact` removed; all `#contact` hrefs updated
- Task 5: visual verification across all five pages on dev and preview servers, mobile hamburger toggle works, NAV-05 confirmed clean
</verification>

<success_criteria>
- NAV-01: nav markup is identical across all five pages (sourced from single `nav.html` partial)
- NAV-02: active state highlights correctly on the About page via the `navAbout=true` flag; other pages have no active link (or — for Plan 03 — set their own flag)
- NAV-03: footer markup is identical across all five pages (sourced from single `footer.html` partial)
- NAV-04: no broken internal links within the existing five pages; Stories and Contact links 404 until Plan 03 ships
- NAV-05: confirmed already clean — `src/pages/cassi.html`, `community.html`, `i-exchange.html` do not exist at the `src/pages/` root level; documented in summary
- PAGE-04: vite.config.js plugin pipeline ready; new pages registered in Plan 03 follow the same `r('./...')` pattern
- D-08 satisfied: homepage `#contact` section removed entirely
- All paths root-relative — adding a new page at any directory depth no longer requires recounting `../`
</success_criteria>

<output>
Create `.planning/phases/01-foundation/01-02-SUMMARY.md` when done. Summary must record:
- vite-plugin-handlebars version installed
- Files modified (9)
- Partial-include status per page
- Active-flag wiring per page (About → navAbout; others → none in this plan)
- Build output: dist/ contents
- NAV-05 cleanup status (confirmed clean)
- Visual checkpoint outcome
- Open hanging links: `/src/pages/contact.html`, `/src/pages/stories/index.html` (resolved by Plan 03)
</output>
