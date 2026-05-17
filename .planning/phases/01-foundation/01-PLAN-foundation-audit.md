---
phase: 01-foundation
plan: 04
type: execute
wave: 4
depends_on:
  - 01-01
  - 01-02
  - 01-03
files_modified:
  - .planning/STATE.md
  - .claude/CLAUDE.md
autonomous: false
requirements:
  - NAV-04
  - NAV-05
  - AUDIT-01
  - AUDIT-02
  - AUDIT-03
  - AUDIT-04
user_setup: []
tags:
  - audit
  - quality
  - documentation

must_haves:
  truths:
    - "Every internal link in the built site resolves to a real file (no 404s)"
    - "Every page has the section structure nav → content → footer"
    - "No hex value exists anywhere in src/ outside src/styles/1-settings/_variables.css"
    - "No inline style attribute exists in any .html file in the repo"
    - "Adding a new page follows a documented, repeatable pattern"
  artifacts:
    - path: ".claude/CLAUDE.md"
      provides: "Documented 'Adding a new page' pattern under conventions"
      contains: "Adding a new page"
    - path: ".planning/STATE.md"
      provides: "Phase 1 completion record with NAV-05 false-alarm closure note"
      contains: "Phase 1: Foundation"
  key_links:
    - from: "every page in dist/"
      to: "every internal href target in dist/"
      via: "link audit script"
      pattern: "audit confirms zero 404s"
    - from: ".claude/CLAUDE.md adding-a-page block"
      to: "vite.config.js + src/pages/ + src/components/nav.html"
      via: "documented workflow"
      pattern: "register in vite.config.js"
---

<objective>
Close out the foundation phase with an audit that proves the four Phase 1 success criteria are true: every page exists with shared shell, every link works, structural consistency holds across the site, and CSS architecture is coherent. Document the "adding a new page" pattern so future work has a clear template. Update `STATE.md` to mark Phase 1 complete and record the NAV-05 false-alarm resolution.

Purpose: This is the verification slice. The site is now end-to-end functional — this plan certifies that fact and writes down the conventions that emerged so future phases inherit them rather than rediscover them. Without an audit pass, the "every link works, every page exists" claim is unverified and the foundation isn't proven.

Output: Three audits (link audit, structural audit, CSS coherence audit) pass with documented results; `.claude/CLAUDE.md` Conventions section gains an "Adding a new page" sub-section; `.planning/STATE.md` updated to record Phase 1 done.
</objective>

<execution_context>
@.claude/get-shit-done/workflows/execute-plan.md
@.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/STATE.md
@.planning/phases/01-foundation/01-CONTEXT.md
@.planning/phases/01-foundation/01-RESEARCH.md
@.planning/phases/01-foundation/01-PATTERNS.md
@.planning/phases/01-foundation/01-SKELETON.md
@CLAUDE.md
@.claude/CLAUDE.md

<interfaces>
<!-- Audit invariants — every audit task asserts one or more of these holds. -->

Link audit invariant:
- For every <a href="..."> in every file under dist/, where the href is internal (starts with /, ./, ../, or a bare path), the target resolves to a real file in dist/ or a real fragment within the page

Structural audit invariant:
- Every HTML page in src/ contains exactly one {{> nav...}} include AND exactly one {{> footer}} include
- Every HTML page in dist/ contains exactly one <header class="nav"> AND exactly one <footer class="footer">

CSS coherence invariant:
- Zero hex values (#xxxxxx) outside src/styles/1-settings/_variables.css
- Zero inline style="..." attributes in any .html file
- Zero arbitrary spacing values (e.g. magic numbers like `padding: 17px`) — all spacing comes from --space-* tokens

Page inventory after Phase 1:
- /                                                       (index.html)
- /src/pages/about.html
- /src/pages/contact.html
- /src/pages/case-studies/cassi.html
- /src/pages/case-studies/community.html
- /src/pages/case-studies/i-exchange.html
- /src/pages/stories/index.html
- /src/pages/stories/design-systems-and-portfolio-sites.html

Eight pages total. Every one of them must be reachable from at least one other page via the shared nav, and every internal link must resolve.
</interfaces>
</context>

<security_notes>
Tier: Audit — read-only inspection plus two documentation updates. No code execution risk introduced.
ASVS L1:
- V4 Access Control: link audit verifies no internal page is accidentally orphaned or accidentally exposes a non-existent path that could be misinterpreted as a missing route
- V14 Configuration: CSS coherence audit enforces the "no hex outside `_variables.css`" project rule
External link audit: confirm every `target="_blank"` link has `rel="noopener noreferrer"`.
</security_notes>

<tasks>

<task type="auto">
  <name>Task 1: Run link audit and structural audit across the built site; record results</name>
  <files>(read-only inspection — no source files modified in this task; results recorded in the plan summary)</files>

  <read_first>
    - src/components/nav.html (single source of truth for nav links; confirms which 4 hrefs must exist)
    - src/components/footer.html (confirms 2 external links — LinkedIn + mailto — and their security attributes)
    - dist/ output from Plan 03 (the audit reads this; run `npm run build` first if dist/ is stale)
    - .planning/phases/01-foundation/01-SKELETON.md (page inventory — 8 pages expected)
    - .planning/REQUIREMENTS.md (NAV-04, AUDIT-01, AUDIT-02)
  </read_first>

  <action>
    First, run `npm run build` from the project root to ensure `dist/` reflects the current source. The build must succeed.

    Then perform three audits using shell tooling. Record the exact commands and output in the plan summary (`01-04-SUMMARY.md`).

    AUDIT A — Page inventory + structural consistency:
    1. List every `.html` file under `dist/`. There must be exactly 8: dist/index.html, dist/src/pages/about.html, dist/src/pages/contact.html, dist/src/pages/case-studies/{cassi,community,i-exchange}.html, dist/src/pages/stories/index.html, dist/src/pages/stories/design-systems-and-portfolio-sites.html.
    2. For each of the 8 files, confirm it contains exactly one occurrence of `<header class="nav">` and exactly one occurrence of `<footer class="footer">`. (Use `grep -c` per file; expected count = 1 per page per element.)
    3. For each page, confirm `<main>` or `<article>` appears between the nav and footer (i.e. the page has the canonical structure nav → content → footer).
    4. Also confirm `{{> nav` and `{{> footer` literals do NOT appear in any dist/ file (Handlebars must have been compiled out).

    AUDIT B — Internal link audit:
    1. Extract every `href="..."` value from every HTML file under `dist/`. For internal hrefs (starting with `/`, `./`, `../`, or `#`):
       - Anchor-only hrefs (`#case-studies`, `#post-heading`, etc.) must match an `id="..."` on an element within the same page
       - Path hrefs (`/src/pages/contact.html`, `./design-systems-and-portfolio-sites.html`, `/#case-studies`, `/`) must resolve to a real file (or anchor within a real file) in `dist/`. The root path `/` resolves to `dist/index.html`. Path-with-fragment hrefs like `/#case-studies` must resolve to a file AND the fragment must match an id on that page.
    2. Build a list of (source-file, href, resolved-target, exists?) tuples. Any "exists=false" row is a broken link.
    3. Report: total links checked, broken count. Required result: broken count = 0.

    AUDIT C — External link security:
    1. Extract every `<a ... target="_blank" ...>` from every HTML file under `src/pages/`, `src/components/`, `index.html`, and `dist/`. For each, confirm the same anchor tag also contains `rel="noopener noreferrer"`.
    2. Report any anchor that has `target="_blank"` without the rel attribute. Required result: zero such anchors.

    Suggested approach for AUDIT B if a link-checker is not available: write a small Node script that uses fs + a regex over dist/ files to extract hrefs and check filesystem existence. Or do it manually in a controlled way for the 8 known pages.

    The audit task ENDS with a written record of all three audit results in the eventual `01-04-SUMMARY.md`. If any check fails, halt and surface the failure — do not auto-fix. Failures must be triaged before Plan 04 can complete. (Expected outcome: all three audits pass on the first run, because Plans 01–03 have already done the work.)
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && npm run build</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && find dist -name "*.html" | wc -l</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && for f in dist/index.html dist/src/pages/about.html dist/src/pages/contact.html dist/src/pages/case-studies/cassi.html dist/src/pages/case-studies/community.html dist/src/pages/case-studies/i-exchange.html dist/src/pages/stories/index.html dist/src/pages/stories/design-systems-and-portfolio-sites.html; do nav=$(grep -c '<header class="nav">' "$f"); foot=$(grep -c '<footer class="footer">' "$f"); echo "$f nav=$nav footer=$foot"; done</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -rln "{{> nav\|{{> footer" dist/ ; echo "exit=$?"</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && node -e "const fs=require('fs'),path=require('path');function walk(d){return fs.readdirSync(d).flatMap(f=>{const p=path.join(d,f);return fs.statSync(p).isDirectory()?walk(p):p.endsWith('.html')?[p]:[]})}const files=walk('dist');let broken=[],checked=0;for(const f of files){const html=fs.readFileSync(f,'utf8');const hrefs=[...html.matchAll(/href=\"([^\"]+)\"/g)].map(m=>m[1]);for(const h of hrefs){if(h.startsWith('http')||h.startsWith('mailto:')||h.startsWith('tel:'))continue;checked++;const [pathPart,frag]=h.split('#');let resolved;if(pathPart==='')resolved=f;else if(pathPart.startsWith('/'))resolved=path.join('dist',pathPart==='/'?'index.html':pathPart);else resolved=path.resolve(path.dirname(f),pathPart);if(resolved&&!resolved.endsWith('.html')&&!resolved.endsWith('.png')&&!resolved.endsWith('.css')&&!resolved.endsWith('.js')&&!resolved.endsWith('.ico'))resolved=path.join(resolved,'index.html');if(resolved&&!fs.existsSync(resolved))broken.push({src:f,href:h,resolved})}}console.log('checked',checked,'broken',broken.length);broken.forEach(b=>console.log(' BROKEN',b.src,'->',b.href));process.exit(broken.length===0?0:1)"</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && node -e "const fs=require('fs'),path=require('path');function walk(d){return fs.readdirSync(d).flatMap(f=>{const p=path.join(d,f);return fs.statSync(p).isDirectory()?walk(p):p.endsWith('.html')?[p]:[]})}const dirs=['src/components','src/pages','dist'];const files=dirs.flatMap(d=>fs.existsSync(d)?walk(d):[]).concat(['index.html']);let bad=[];for(const f of files){const html=fs.readFileSync(f,'utf8');const anchors=html.match(/<a [^>]*target=\"_blank\"[^>]*>/g)||[];for(const a of anchors){if(!a.includes('noopener')||!a.includes('noreferrer'))bad.push({file:f,anchor:a.slice(0,120)})}}console.log('target_blank anchors checked, missing rel:',bad.length);bad.forEach(b=>console.log(' MISSING',b.file,b.anchor));process.exit(bad.length===0?0:1)"</automated>
  </verify>

  <acceptance_criteria>
    - `npm run build` exits 0
    - `find dist -name "*.html" | wc -l` outputs `8`
    - For each of the 8 dist/ HTML files: `<header class="nav">` count = 1 AND `<footer class="footer">` count = 1
    - Grep for `{{> nav` or `{{> footer` in dist/ returns zero files (i.e. exits 1 / "no matches")
    - The Node link-audit script reports `broken 0` and exits 0
    - The Node `target="_blank"` security audit script reports `missing rel: 0` and exits 0
    - All audit commands and their output are recorded verbatim in `01-04-SUMMARY.md` (creating the summary is part of Plan 04 wrap-up; this task produces the data that feeds it)
  </acceptance_criteria>

  <done>
    Three audits run, all pass; broken-link count is zero; every page has the canonical nav → content → footer structure; every `target="_blank"` link has `rel="noopener noreferrer"`; data captured for the summary.
  </done>
</task>

<task type="auto">
  <name>Task 2: Run CSS coherence audit; document the "adding a new page" pattern in CLAUDE.md</name>
  <files>.claude/CLAUDE.md</files>

  <read_first>
    - .claude/CLAUDE.md (file being modified — see existing Conventions and Stack sections; new sub-section is appended/integrated near the end of the Stack section)
    - CLAUDE.md (project root — confirm constraint phrasing matches: "no inline styles, no hex values outside `_variables.css`, no arbitrary spacing")
    - src/styles/main.css (current import order — the documented pattern must list this order)
    - vite.config.js (current rollupOptions.input — the documented pattern shows the registration step)
    - src/components/nav.html (the four boolean flag names that future page authors will use)
    - .planning/phases/01-foundation/01-SKELETON.md (page inventory — 8 pages; nav active-flag table)
  </read_first>

  <action>
    First, run a CSS coherence audit (read-only — record results in the plan summary):

    1. Grep for `#[0-9a-fA-F]{3}\b` and `#[0-9a-fA-F]{6}\b` (hex literals) across `src/styles/2-base/`, `src/styles/3-components/`, `src/styles/4-layouts/`, and the new pages' inline `<style>` blocks (there should be none — no inline styles allowed). Required result: zero matches outside `src/styles/1-settings/_variables.css`.
    2. Grep for `style="` across all `.html` files in `src/` and `index.html`. Required result: zero inline style attributes.
    3. Spot-check for arbitrary spacing values. Grep for `padding:` and `margin:` and `gap:` declarations in the new files (`_contact.css`, `_stories.css`) and confirm every value uses a `var(--space-*)` token or `0`. Record any non-token values (expected: none).

    Then update `.claude/CLAUDE.md` to add an "Adding a new page" pattern. Find an appropriate location near the existing "Stack" and "CSS architecture" sections (towards the top of the file but after design tokens). Insert a new heading `## Adding a new page` followed by the documented pattern. The content of the section:

    A short prose intro: "Every page in this site follows the same scaffold. To add a new page, do these four things in order, then ship."

    A numbered step list:
    1. Create the `.html` file under `src/pages/` (or `src/pages/<sub>/`). Start from the structure shown below.
    2. Register the page in `vite.config.js` `rollupOptions.input` with a unique key and `r('./src/pages/...')`.
    3. If the page deserves a dedicated nav active state, set the matching boolean flag when including the partial: one of `navWork`, `navAbout`, `navStories`, `navContact`. If none applies, include `{{> nav}}` with no flag.
    4. If the page introduces page-specific BEM classes, add a new file `src/styles/3-components/_<page>.css` and import it in `src/styles/main.css` inside the `/* 3. COMPONENTS */` block.

    Below the steps, include the canonical page scaffold (verbatim) so future page authors can copy it. Mark the placeholders in angle brackets so they're easy to spot:

    ```
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
            <div class="<container-wide or container-reading>">
              <h1 id="<block>-heading" class="<block>__heading"><Heading></h1>
              <!-- page content -->
            </div>
          </section>
        </main>
        {{> footer}}
        <script type="module" src="/src/theme.js"></script>
      </body>
    </html>
    ```

    Below the scaffold, add a "Container choice" guideline: use `container-wide` for editorial pages (homepage, about, case studies) and `container-reading` (720px) for long-form pages (contact, stories index, stories posts).

    Below that, a "Active nav state" guideline pointing at the four boolean flag names with a one-line example for each.

    Below that, a "What NOT to do" reminder bullet list:
    - Don't copy the nav or footer markup inline — always use the partial
    - Don't add hex values outside `_variables.css`
    - Don't use inline `style="..."` attributes
    - Don't use `../` relative paths for CSS, JS, or asset references — use root-relative `/src/...`
    - Don't add a page to the filesystem without registering it in `vite.config.js`

    This new section sits before the "GSD — workflow commands" section. Do not edit any other part of `.claude/CLAUDE.md`. Preserve all existing content verbatim.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -E "#[0-9a-fA-F]{3,6}\b" src/styles/2-base/*.css src/styles/3-components/*.css src/styles/4-layouts/*.css ; echo "exit=$?"</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -rln "style=\"" index.html src/ ; echo "exit=$?"</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "Adding a new page" .claude/CLAUDE.md</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "container-reading\|navStories\|navContact\|rollupOptions" .claude/CLAUDE.md</automated>
  </verify>

  <acceptance_criteria>
    - Grep for hex literals across `src/styles/2-base/`, `src/styles/3-components/`, `src/styles/4-layouts/` returns zero matches (no hex outside `_variables.css`)
    - Grep for `style="` in `index.html` and recursively under `src/` returns zero matches (no inline styles anywhere)
    - `.claude/CLAUDE.md` contains a new section titled exactly `## Adding a new page`
    - That section contains the four-step list mentioning `src/pages/`, `vite.config.js`, `rollupOptions.input`, the four flag names (`navWork`, `navAbout`, `navStories`, `navContact`), and `src/styles/main.css`
    - That section includes a canonical page scaffold code block with `{{> nav` and `{{> footer}}` and `/src/styles/main.css`
    - That section mentions `container-wide` and `container-reading` and explains which to use when
    - The new section appears BEFORE the `## GSD — workflow commands` heading and AFTER the existing `## CSS architecture` or `## Design tokens` section
    - No other section of `.claude/CLAUDE.md` is modified (existing content preserved verbatim)
  </acceptance_criteria>

  <done>
    CSS coherence audit passes: zero hex outside `_variables.css`, zero inline styles, token-only spacing. `.claude/CLAUDE.md` now documents the four-step scaffold for adding a new page, including the canonical HTML shell, container guidance, active-flag table, and don'ts.
  </done>
</task>

<task type="auto">
  <name>Task 3: Update STATE.md to mark Phase 1 complete and record NAV-05 false-alarm closure</name>
  <files>.planning/STATE.md</files>

  <read_first>
    - .planning/STATE.md (file being modified — Current Position, Decisions, Blockers/Concerns sections will be updated)
    - .planning/ROADMAP.md (Phase 1 success criteria — confirm wording for the completion note)
    - .planning/REQUIREMENTS.md (confirm v1 requirement IDs for the completion summary)
    - .planning/phases/01-foundation/01-RESEARCH.md (NAV-05 status section — "Already Clean" finding to record)
  </read_first>

  <action>
    Edit `.planning/STATE.md`:

    1. In the `## Current Position` section:
       - Change `Phase: 1 of 1 (Foundation)` so the Status line reflects completion: `Status: Complete — all 4 plans shipped`
       - Update `Plan: 0 of ? in current phase` to `Plan: 4 of 4 in current phase`
       - Update the progress bar `Progress: [░░░░░░░░░░] 0%` to `Progress: [██████████] 100%`
       - Update `Last activity:` to today's date with note `Phase 1 audit passed`

    2. In the `## Performance Metrics` block, leave velocity figures alone — those are populated by the GSD tooling on each plan completion, not by this audit task.

    3. In the `## Accumulated Context` -> `### Decisions` section, append two entries reflecting Phase 1 outcomes:
       - `[Phase 1]: Light palette locked — warm off-white base (#f5f2ed) with deep teal accent (#1a6b52). Tokens in src/styles/1-settings/_variables.css are the single source.`
       - `[Phase 1]: Page scaffold pattern documented in .claude/CLAUDE.md — Vite MPA + Handlebars partials + ITCSS + 4 active-state flags. Future pages follow this pattern.`

    4. In the `## Accumulated Context` -> `### Blockers/Concerns` section, REMOVE the existing line about "Duplicate page files exist at `src/pages/` root..." since RESEARCH.md confirmed those duplicates were never there at this commit (false alarm). Replace it with a single resolved-issue note:
       - `[Phase 1, resolved]: NAV-05 was a false alarm — duplicate page files at src/pages/ root did not exist at the start of Phase 1; the three case study pages were already correctly located at src/pages/case-studies/. NAV-05 closed by inspection, no cleanup work needed.`

    5. In the `## Session Continuity` section:
       - Update `Last session:` to today
       - Update `Stopped at:` to `Phase 1 complete — foundation shipped; site is end-to-end walkable; ready for Phase 2 (content) when defined`
       - Update `Resume file:` to `.planning/phases/01-foundation/01-04-SUMMARY.md`

    Do NOT modify the `## Performance Metrics` table values (those belong to the GSD tooling). Do NOT touch the `## Deferred Items` table — those items remain deferred to v2.
  </action>

  <verify>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -n "Phase 1 audit passed\|Complete — all 4 plans shipped\|Plan: 4 of 4\|██████████" .planning/STATE.md</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "NAV-05 was a false alarm\|NAV-05 closed by inspection" .planning/STATE.md</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "Light palette locked\|Page scaffold pattern documented" .planning/STATE.md</automated>
    <automated>cd "C:/Users/sambl/OneDrive/Documents/my-portfolio-v2" && grep -c "Duplicate page files exist at .src/pages/. root" .planning/STATE.md</automated>
  </verify>

  <acceptance_criteria>
    - `.planning/STATE.md` Current Position shows `Status: Complete`, `Plan: 4 of 4`, `Progress: [██████████] 100%`, and an updated `Last activity` date
    - The Decisions list contains both new Phase 1 entries (light palette and page scaffold pattern)
    - The Blockers/Concerns section no longer contains the original "Duplicate page files exist at `src/pages/` root" wording (grep returns 0 matches for the original phrasing) and instead contains the NAV-05 false-alarm resolution note
    - Session Continuity points at `01-04-SUMMARY.md` as the resume file
    - `## Deferred Items` table unchanged from before this task
    - `## Performance Metrics` table values unchanged from before this task (still placeholder dashes — GSD tooling populates these)
  </acceptance_criteria>

  <done>
    STATE.md reflects Phase 1 completion, records the two new Phase 1 decisions, closes the NAV-05 false alarm with a documented note, and points future session continuity at the Plan 04 summary.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 4: Final walkthrough — verify the four Phase 1 success criteria are TRUE</name>
  <what-built>
    Phase 1 is structurally complete. Plans 01–03 built the design foundation (light palette + typography), shared shell (handlebars partials + page conversions), and the three new pages (contact, stories index, stories post). Plan 04 audits the result and documents the scaffold pattern.
  </what-built>
  <how-to-verify>
    Walk through the four Phase 1 success criteria from `ROADMAP.md` against the running site (`npm run build && npm run preview` recommended, or `npm run dev`):

    Criterion 1: "A visitor can navigate to any page (Home, About, I-Exchange, CASSI, Community, Contact, Blog) and see the same nav and footer — no missing links, no dead ends."
    - Start at `/`. Click each top-level nav link in turn: Work (scrolls to case studies), About, Stories, Get in touch. From each destination, confirm the same nav and footer markup appear.
    - From the homepage, click each case study card. Each case study page should also show the same nav and footer.
    - From the Stories index, click the seeded post. Use the "Back to stories" link to return. Confirm seamless navigation.
    - There should be no point in the walk where a nav link returns 404 or where a page is missing the nav or footer.

    Criterion 2: "Contact page and Blog (index + one post example) exist with complete structure: nav, content section, footer."
    - Visit `/src/pages/contact.html` — confirm nav → main with `<section class="contact">` → footer
    - Visit `/src/pages/stories/index.html` — confirm nav → main with `<section class="stories">` → footer
    - Visit `/src/pages/stories/design-systems-and-portfolio-sites.html` — confirm nav → main with `<article class="post">` → footer
    - Use DevTools to confirm each page's `<main>` (or `<article>`) sits between the partial-injected `<header class="nav">` and `<footer class="footer">`

    Criterion 3: "No broken internal links anywhere in the site — every anchor href resolves to a real page."
    - This was machine-verified by Task 1's Node script. Spot-check by clicking 5–10 random links across the site (nav links, footer links, hero CTAs, case study back-to-home links, stories post back-to-stories link). None should produce a 404.
    - Confirm the Task 1 audit script reported `checked N broken 0` and the `target="_blank"` security audit reported `missing rel: 0`.

    Criterion 4: "The CSS is coherent: no inline styles, no raw hex values, spacing tokens used throughout — adding a new page follows the same pattern as existing ones."
    - CSS coherence machine-checked by Task 2 (zero hex outside `_variables.css`, zero inline styles).
    - Open `.claude/CLAUDE.md` and confirm the `## Adding a new page` section is present with the four-step scaffold, canonical HTML, container guidance, and don'ts.
    - Optionally: mentally walk through adding a hypothetical new page (`/src/pages/work/dedicated-work-index.html`). The four steps in CLAUDE.md should suffice — no other docs needed.

    Also confirm:
    - STATE.md shows Phase 1 complete with the two new decisions recorded
    - NAV-05 false-alarm resolution note is present in STATE.md Blockers/Concerns
    - All four requirement IDs grouped under AUDIT pass: AUDIT-01 (holistic review done by walkthrough), AUDIT-02 (every page has nav → content → footer), AUDIT-03 (CSS coherence verified), AUDIT-04 (scalable pattern documented in CLAUDE.md)

    If everything checks out, approve. If any criterion fails — broken link discovered manually, missing nav/footer on a page, an inline style attribute lurking somewhere — describe exactly what failed and which file/page. Do NOT silently auto-fix during this checkpoint; surface the issue.
  </how-to-verify>
  <resume-signal>Type "approved" if the four Phase 1 success criteria hold against the running site and the documented foundation is complete — or describe what failed.</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Audit script → dist/ filesystem | Read-only filesystem traversal. No mutation. Risk: script bug producing a false-clear. |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-AU-RD | Repudiation (audit miss) | Link audit script | mitigate | Script is short and inline (printed in `<action>` for review); supplemented by Task 4 human walkthrough that clicks links manually. Two independent confirmations. |
| T-01-AU-XS | Tampering | `target="_blank"` external links | mitigate | Task 1 acceptance criterion: zero `target="_blank"` anchors lacking `rel="noopener noreferrer"`. Verified by Node script across src/, dist/, and components. |
| T-01-AU-CF | Configuration | `.claude/CLAUDE.md` page-add docs | accept | Documentation update is non-executable. Risk if doc is wrong: future page authors deviate from convention. Mitigation: scaffold is copy-pasted verbatim from a working page (PATTERNS.md analog). |
| T-01-AU-DR | Denial (drift) | STATE.md hand-edits | accept | Hand-editing STATE.md risks GSD tooling overwrite later. Risk acknowledged; STATE.md is intended for human-editable session continuity per its own structure. |
</threat_model>

<verification>
- Task 1: page inventory = 8; per-page structural counts (nav=1, footer=1) all correct; broken-link audit returns 0; target="_blank" security audit returns 0 missing rel
- Task 2: CSS coherence audit returns zero hex outside `_variables.css` and zero inline styles; `.claude/CLAUDE.md` gains the documented page-add pattern
- Task 3: STATE.md reflects Phase 1 completion with the right Decisions, Blockers/Concerns, Session Continuity entries
- Task 4: human walkthrough confirms all four Phase 1 success criteria hold against the running site
</verification>

<success_criteria>
- NAV-04: link audit script reports 0 broken internal links across all 8 dist/ pages
- NAV-05: false-alarm resolution recorded in STATE.md; no actual cleanup was required
- AUDIT-01: holistic review of all 8 pages completed via Task 1 + Task 4 walkthrough
- AUDIT-02: every page confirmed to have nav → content → footer structure (1 nav + 1 footer per page)
- AUDIT-03: CSS audit returns zero hex outside `_variables.css`, zero inline styles in any HTML, spacing tokens used throughout (new component files token-only by acceptance in Plan 03)
- AUDIT-04: `.claude/CLAUDE.md` documents the four-step scaffold; future page additions follow the same pattern as the contact and stories pages
- All four Phase 1 ROADMAP success criteria confirmed TRUE
</success_criteria>

<output>
Create `.planning/phases/01-foundation/01-04-SUMMARY.md` when done. Summary must record:
- All three audit outputs verbatim (Task 1 commands + results)
- CSS coherence audit results (Task 2)
- STATE.md update diff summary (Task 3)
- Final walkthrough outcome (Task 4)
- Phase 1 closure note: which requirement IDs are now satisfied (all 13 phase requirements from the original ID list) and which design requirements (DESIGN-01, DESIGN-02, DESIGN-03 — implicitly satisfied by Plan 01 since they sit under Design Foundation in REQUIREMENTS.md though not in the planner-supplied 13)
- Resume pointer for any follow-up phases
</output>
