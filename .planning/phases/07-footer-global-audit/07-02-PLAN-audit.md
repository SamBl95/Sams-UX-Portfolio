---
phase: 07-footer-global-audit
plan: 02
type: execute
wave: 2
depends_on:
  - 07-01
files_modified:
  - src/styles/3-components/_nav.css
  - src/styles/3-components/_case-study.css
  - src/styles/2-base/_typography.css
  - index.html
  - src/pages/about.html
  - src/pages/contact.html
  - src/pages/stories/index.html
  - src/pages/stories/design-systems-and-portfolio-sites.html
  - src/pages/case-studies/cassi.html
  - src/pages/case-studies/i-exchange.html
  - src/pages/case-studies/community.html
autonomous: true
requirements:
  - ANIM-06
  - TYP-01
  - TYP-02
  - TYP-03
  - TOK-02

must_haves:
  truths:
    - "No em dashes appear in any page title, meta description, or h1 element"
    - "Nav mobile menu and hamburger bars have no visible animation under prefers-reduced-motion: reduce"
    - "Case study pagination arrow has no transform transition under prefers-reduced-motion: reduce"
    - "The typography comment accurately describes the actual h1 breakpoint values in the code"
    - "No raw pixel spacing values exist outside _variables.css"
  artifacts:
    - path: "src/styles/3-components/_nav.css"
      provides: "prefers-reduced-motion block suppressing nav-menu-enter animation and toggle-bar transforms"
      contains: "@media (prefers-reduced-motion: reduce)"
    - path: "src/styles/3-components/_case-study.css"
      provides: "prefers-reduced-motion block suppressing cs-pagination__arrow transition: transform"
      contains: "@media (prefers-reduced-motion: reduce)"
    - path: "src/styles/2-base/_typography.css"
      provides: "Corrected header comment h1 row: 40px 56px 64px 80px 80px"
      contains: "h1           40px"
    - path: "src/pages/case-studies/cassi.html"
      provides: "h1 with colon replacing em dash: Cassi: AI Chatbot Feedback Redesign"
      contains: "Cassi: AI Chatbot Feedback Redesign"
  key_links:
    - from: "src/styles/3-components/_nav.css"
      to: "src/styles/3-components/_stories.css"
      via: "prefers-reduced-motion block structure (transition: none + state reset pattern)"
      pattern: "prefers-reduced-motion: reduce"
    - from: "src/styles/3-components/_case-study.css"
      to: ".cs-pagination__arrow transition: none"
      via: "prefers-reduced-motion block suppressing transform transition only"
      pattern: "prefers-reduced-motion: reduce"
---

<objective>
Complete the global audit pass: add prefers-reduced-motion blocks to nav and case-study CSS, replace all em dashes in page titles/meta descriptions/h1 elements, and correct the inaccurate typography comment.

Purpose: Closes all five phase requirements (ANIM-06, TYP-01, TYP-02, TYP-03, TOK-02). Depends on Wave 1 completing the footer hover fix and nav gap token.
Output: Two new reduced-motion blocks, 14 em dash replacements across 9 HTML files, one comment-line correction.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/07-footer-global-audit/07-CONTEXT.md
@.planning/phases/07-footer-global-audit/07-RESEARCH.md
@.planning/phases/07-footer-global-audit/07-01-SUMMARY.md

<interfaces>
From src/styles/3-components/_stories.css (model for reduced-motion block — transition: none + state reset):
```css
@media (prefers-reduced-motion: reduce) {
  .stories__link,
  .post__back {
    transition: none;
  }

  .stories__link::before {
    transition: none;
    clip-path:  inset(0 0 0 0);
  }
}
```

From src/styles/3-components/_reveal.css (model for animation: none + opacity override):
```css
@media (prefers-reduced-motion: reduce) {
  .js-reveal,
  .js-reveal--visible {
    opacity:   1;
    animation: none;
  }
}
```

Nav animations that need suppression (from _nav.css):
- `.nav--open .nav__menu` — `animation: nav-menu-enter 200ms var(--ease-out) both` (keyframe: opacity + translateY)
- `.nav__toggle-bar` — `transition: transform 200ms var(--ease-in-out), opacity var(--transition-base)`
- `.nav--open .nav__toggle-bar:nth-child(1)` — `transform: translateY(7px) rotate(45deg)`
- `.nav--open .nav__toggle-bar:nth-child(2)` — `opacity: 0`
- `.nav--open .nav__toggle-bar:nth-child(3)` — `transform: translateY(-7px) rotate(-45deg)`

Case study animation that needs suppression (from _case-study.css):
- `.cs-pagination__arrow` — `transition: transform 150ms` (color transition on same element is safe to keep)

Em dash replacement map (D-01 — use colon for subtitles, pipe for name separators):
  index.html meta desc:         "Sam Blake, Product Designer based in the North West..."
  about.html title:             "About Sam Blake | Product Designer"
  about.html meta desc:         "About Sam Blake: Product designer at Matalan..."
  contact.html title:           "Get in touch | Sam Blake, Product Designer"
  contact.html meta desc:       "Get in touch with Sam Blake, product designer open to..."
  stories/index.html title:     "Stories | Sam Blake"
  stories/index.html meta desc: "Writing by Sam Blake: reflections on product design..."
  stories/design-systems...html title:    "Design systems and portfolio sites | Sam Blake"
  stories/design-systems...html meta desc: "Design systems and portfolio sites, by Sam Blake"
  cassi.html title:             "Cassi: AI Chatbot Feedback Redesign | Sam Blake"
  cassi.html meta desc:         "Cassi AI Chatbot Feedback Redesign by Sam Blake..."
  cassi.html h1:                "Cassi: AI Chatbot Feedback Redesign"
  i-exchange.html title:        "i-Exchange Knowledge Base Overhaul | Sam Blake"
  i-exchange.html meta desc:    "i-Exchange Knowledge Base Overhaul by Sam Blake..."
  community.html title:         "Community Support Forum Redesign | Sam Blake"
  community.html meta desc:     "Community Support Forum Redesign by Sam Blake..."

Typography comment correction (D-07):
  Current:  h1           36px      48px     64px     80px     96px
  Correct:  h1           40px      56px     64px     80px     80px
  (no 1440px h1 rule exists — it inherits 80px from the 1240px breakpoint)
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add prefers-reduced-motion blocks to _nav.css and _case-study.css (per D-04, ANIM-06)</name>
  <files>src/styles/3-components/_nav.css, src/styles/3-components/_case-study.css</files>
  <read_first>
    - src/styles/3-components/_nav.css — full file; identify the end of the file (after the last rule block) where the new block will be appended
    - src/styles/3-components/_case-study.css — scan for `.cs-pagination__arrow` and its surrounding context to understand where to append the reduced-motion block
    - src/styles/3-components/_stories.css — lines 152–162 (model: transition: none + state reset pattern)
    - src/styles/3-components/_reveal.css — lines 49–55 (model: animation: none + opacity override)
  </read_first>
  <action>
    Append the following block to the end of `_nav.css`, after all existing rules:

    ```
    @media (prefers-reduced-motion: reduce) {
      .nav__toggle-bar {
        transition: none;
      }

      .nav--open .nav__menu {
        animation: none;
      }

      .nav--open .nav__toggle-bar:nth-child(1),
      .nav--open .nav__toggle-bar:nth-child(3) {
        transform: none;
      }

      .nav--open .nav__toggle-bar:nth-child(2) {
        opacity: 1;
      }
    }
    ```

    Rationale for each rule:
    - `transition: none` on `.nav__toggle-bar` — suppresses the 200ms transform/opacity transition on bar elements
    - `animation: none` on `.nav--open .nav__menu` — suppresses the `nav-menu-enter` keyframe (opacity + translateY slide)
    - `transform: none` on bars 1 and 3 — resets the rotate/translateY open-state transforms so they remain visible
    - `opacity: 1` on bar 2 — the middle bar hides via `opacity: 0` in open state; without this it stays invisible under reduced motion

    Do NOT add a `prefers-reduced-motion` block for the `.nav__logo:hover` or `.nav__toggle:hover` — those use `transition: color` and `transition: background-color` which are color-only transitions exempt per D-05.

    Append the following block to the end of `_case-study.css`, after all existing rules:

    ```
    @media (prefers-reduced-motion: reduce) {
      .cs-pagination__arrow {
        transition: none;
      }
    }
    ```

    Rationale: This removes the `transition: transform 150ms` that drives the arrow translateX hover effect. The existing hover media query (`@media (hover: hover)`) is not modified — only a new motion block is added. Do NOT change the `transition: color` behavior anywhere in the file (D-05).
  </action>
  <acceptance_criteria>
    - `grep -n "prefers-reduced-motion" src/styles/3-components/_nav.css` returns exactly one match
    - `grep -n "prefers-reduced-motion" src/styles/3-components/_case-study.css` returns exactly one match
    - `grep -n "animation: none" src/styles/3-components/_nav.css` returns a match inside the reduced-motion block
    - `grep -n "opacity: 1" src/styles/3-components/_nav.css` returns a match for `.nav--open .nav__toggle-bar:nth-child(2)` inside the reduced-motion block
    - `grep -n "transition: none" src/styles/3-components/_case-study.css` returns a match for `.cs-pagination__arrow` inside the reduced-motion block
    - `grep -n "@keyframes nav-menu-enter" src/styles/3-components/_nav.css` still returns a match — the keyframe definition itself is NOT removed, only suppressed
  </acceptance_criteria>
  <verify>
    <automated>grep -rn "prefers-reduced-motion" src/styles/3-components/_nav.css src/styles/3-components/_case-study.css</automated>
  </verify>
  <done>Both `_nav.css` and `_case-study.css` contain `@media (prefers-reduced-motion: reduce)` blocks. Nav block suppresses keyframe animation, toggle-bar transitions, open-state transforms, and restores middle-bar visibility. Case-study block suppresses arrow transform transition only.</done>
</task>

<task type="auto">
  <name>Task 2: Replace all em dashes in title/meta description/h1 elements across all pages (per D-01, TYP-01)</name>
  <files>
    index.html,
    src/pages/about.html,
    src/pages/contact.html,
    src/pages/stories/index.html,
    src/pages/stories/design-systems-and-portfolio-sites.html,
    src/pages/case-studies/cassi.html,
    src/pages/case-studies/i-exchange.html,
    src/pages/case-studies/community.html
  </files>
  <read_first>
    - index.html — lines 1–10 (title and meta description)
    - src/pages/about.html — lines 1–35 (title, meta description, h1)
    - src/pages/contact.html — lines 1–30 (title, meta description, h1)
    - src/pages/stories/index.html — lines 1–30 (title, meta description, h1)
    - src/pages/stories/design-systems-and-portfolio-sites.html — lines 1–35 (title, meta description, h1)
    - src/pages/case-studies/cassi.html — lines 1–40 (title, meta description, h1)
    - src/pages/case-studies/i-exchange.html — lines 1–40 (title, meta description, h1)
    - src/pages/case-studies/community.html — lines 1–40 (title, meta description, h1)
  </read_first>
  <action>
    Replace em dashes (`—`) in `<title>`, `<meta name="description" content="...">`, and `<h1>` elements ONLY. Do NOT touch `<h2>`, `<h3>`, `<p>`, `<li>`, or any other element — body prose is explicitly out of scope (D-02).

    Apply these exact replacements, reading each full sentence in context to ensure natural copy (the replacement map below is the target — adjust surrounding words where needed for readability):

    **index.html**
    - `<meta name="description">`: Change content from `Sam Blake — Product Designer based in...` to `Sam Blake, Product Designer based in the North West of England. Available for hybrid and remote roles.`

    **src/pages/about.html**
    - `<title>`: Change from `About — Sam Blake | Product Designer` to `About Sam Blake | Product Designer`
    - `<meta name="description">`: Change from `About Sam Blake — Product designer at Matalan...` to `About Sam Blake: Product designer at Matalan...` (colon replaces em dash; keep rest of sentence intact)

    **src/pages/contact.html**
    - `<title>`: Change from `Get in touch — Sam Blake | Product Designer` to `Get in touch | Sam Blake, Product Designer`
    - `<meta name="description">`: Change from `Get in touch with Sam Blake — product designer open to...` to `Get in touch with Sam Blake, product designer open to...` (comma replaces em dash; keep rest of sentence intact)

    **src/pages/stories/index.html**
    - `<title>`: Change from `Stories — Sam Blake | Product Designer` to `Stories | Sam Blake`
    - `<meta name="description">`: Change from `Stories by Sam Blake — reflections on product design...` to `Writing by Sam Blake: reflections on product design...` (colon replaces em dash; keep rest of sentence intact)

    **src/pages/stories/design-systems-and-portfolio-sites.html**
    - `<title>`: Change from `Design systems and portfolio sites — Sam Blake` to `Design systems and portfolio sites | Sam Blake`
    - `<meta name="description">`: Change from `Design systems and portfolio sites — Sam Blake` to `Design systems and portfolio sites, by Sam Blake` (remove separator; keep rest of sentence intact)

    **src/pages/case-studies/cassi.html**
    - `<title>`: Change from `Cassi — AI Chatbot Feedback Redesign — Sam Blake` to `Cassi: AI Chatbot Feedback Redesign | Sam Blake`
    - `<meta name="description">`: Remove em dash — change to `Cassi AI Chatbot Feedback Redesign by Sam Blake...` (keep rest of sentence intact)
    - `<h1>` (line 35): Change from `Cassi — AI Chatbot Feedback Redesign` to `Cassi: AI Chatbot Feedback Redesign`

    **src/pages/case-studies/i-exchange.html**
    - `<title>`: Change from `i-Exchange Knowledge Base Overhaul — Sam Blake` to `i-Exchange Knowledge Base Overhaul | Sam Blake`
    - `<meta name="description">`: Change from `i-Exchange Knowledge Base Overhaul — Sam Blake overhauled...` to `i-Exchange Knowledge Base Overhaul by Sam Blake...` (keep rest of sentence intact)

    **src/pages/case-studies/community.html**
    - `<title>`: Change from `Community Support Forum Redesign — Sam Blake` to `Community Support Forum Redesign | Sam Blake`
    - `<meta name="description">`: Change from `Community Support Forum Redesign — Sam Blake led...` to `Community Support Forum Redesign by Sam Blake...` (keep rest of sentence intact)

    After all edits, run this command to verify scope was respected:
    `grep -rn "—" src/pages/ index.html | grep -E "<title>|<meta name=\"description\"|<h1"` — must return zero matches.

    Do NOT run a global em dash replace — there are intentional em dashes in body prose throughout the pages. Only edit the specific elements listed above.
  </action>
  <acceptance_criteria>
    - `grep -rn "—" index.html src/pages/ | grep -E "<title>|<meta name=\"description\"|<h1"` returns zero matches
    - `grep -n "Cassi: AI Chatbot Feedback Redesign" src/pages/case-studies/cassi.html` returns at least two matches (title and h1)
    - `grep -n "| Sam Blake" src/pages/case-studies/i-exchange.html` returns a match in the title element
    - `grep -n "| Sam Blake" src/pages/case-studies/community.html` returns a match in the title element
    - `grep -n "About Sam Blake | Product Designer" src/pages/about.html` returns a match in the title element
    - Body prose em dashes are untouched: `grep -c "—" src/pages/case-studies/cassi.html` returns a non-zero count (body prose preserved)
  </acceptance_criteria>
  <verify>
    <automated>grep -rn "—" index.html src/pages/ | grep -E "&lt;title&gt;|meta name|&lt;h1"</automated>
  </verify>
  <done>Zero em dashes remain in `<title>`, `<meta name="description">`, or `<h1>` elements across all 9 HTML files. Body prose em dashes are untouched. All replacement text is natural and un-AI-sounding.</done>
</task>

<task type="auto">
  <name>Task 3: Fix _typography.css header comment h1 row and run final token sweep (per D-07, TYP-02, TYP-03)</name>
  <files>src/styles/2-base/_typography.css</files>
  <read_first>
    - src/styles/2-base/_typography.css — lines 1–17 (the full header comment block containing the type scale table)
  </read_first>
  <action>
    In `_typography.css`, locate the header comment type scale table (lines 7–12). The h1 row currently reads:

    ```
      h1           36px      48px     64px     80px     96px
    ```

    Change it to:

    ```
      h1           40px      56px     64px     80px     80px
    ```

    Rationale: The actual code uses `var(--text-40)` (40px) at mobile, `var(--text-56)` (56px) at 600px, `var(--text-64)` (64px) at 905px, `var(--text-80)` (80px) at 1240px, and no 1440px h1 rule — so h1 inherits 80px at 1440px too. Do NOT add a new h1 CSS rule for 1440px. Do NOT change h2, h3, body, or small rows — those already match the code.

    After the comment fix, run the following verification commands to confirm the token sweep status (TYP-03/TOK-02). These are read-only checks — take no action on their output beyond confirming the `5px` from Wave 1 is gone:

    1. `grep -rn "#[0-9a-fA-F]" src/styles/ --include="*.css" | grep -v "_variables.css"` — expected: zero matches
    2. `grep -rn "gap: [0-9]px\|padding: [0-9]\+px\|margin: [0-9]\+px" src/styles/ --include="*.css" | grep -v "_variables.css"` — expected: zero matches (confirms Wave 1 fixed the `5px`)

    If either grep returns unexpected matches, record them in the SUMMARY but do not fix them in this task (they are outside plan scope).
  </action>
  <acceptance_criteria>
    - Lines 7–12 of `_typography.css` contain the string `h1           40px` (with the corrected values)
    - `grep -n "36px.*48px.*96px" src/styles/2-base/_typography.css` returns zero matches (old wrong values gone)
    - `grep -n "40px.*56px.*64px.*80px.*80px" src/styles/2-base/_typography.css` returns one match (new correct values present)
    - `grep -n "h2" src/styles/2-base/_typography.css` still returns the original h2 row unchanged (28px 36px 48px 56px 64px)
    - No new CSS rules have been added to `_typography.css` — only the comment text changed
    - `grep -rn "#[0-9a-fA-F]" src/styles/ --include="*.css" | grep -v "_variables.css"` returns zero matches (hex values confined to _variables.css)
    - `grep -rn "gap: 5px" src/styles/ --include="*.css"` returns zero matches (Wave 1 fix confirmed)
  </acceptance_criteria>
  <verify>
    <automated>grep -n "h1" src/styles/2-base/_typography.css | head -5</automated>
  </verify>
  <done>`_typography.css` header comment h1 row reads `40px 56px 64px 80px 80px`. No new CSS rules added. Token sweep confirms zero hex values outside `_variables.css` and zero raw pixel gap/padding/margin spacing values.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| None | This plan makes only CSS and HTML text edits — no user input, no network calls, no data storage, no auth |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-07-02-SC | Tampering | npm/pip/cargo installs | accept | No package installs — pure file edits to existing CSS and HTML source files |

No attack surface introduced or modified. Changes are limited to presentation layer (CSS) and static HTML content (title/meta/h1 text). Zero new functionality, zero new inputs.
</threat_model>

<verification>
Run after all three tasks complete:

```bash
# ANIM-06: prefers-reduced-motion blocks present in both files
grep -rn "prefers-reduced-motion" src/styles/3-components/_nav.css src/styles/3-components/_case-study.css

# TYP-01: Zero em dashes in title/meta/h1 across all pages
grep -rn "—" index.html src/pages/ | grep -E "<title>|<meta name=\"description\"|<h1"

# TYP-02: Typography comment h1 row corrected
grep -n "h1" src/styles/2-base/_typography.css | head -3

# TYP-03/TOK-02: No hex values outside _variables.css
grep -rn "#[0-9a-fA-F]" src/styles/ --include="*.css" | grep -v "_variables.css"

# TOK-02: No raw pixel gap in nav
grep -n "gap: 5px" src/styles/3-components/_nav.css

# D-03 (from Wave 1): Footer hover guard in place
grep -n "hover: hover" src/styles/3-components/_footer.css
```

Expected results:
- grep 1: returns matches in both files
- grep 2: zero matches
- grep 3: h1 row contains `40px` and `56px` (not `36px` or `96px`)
- grep 4: zero matches
- grep 5: zero matches (Wave 1 confirmed)
- grep 6: returns one match (Wave 1 confirmed)
</verification>

<success_criteria>
- `grep -n "prefers-reduced-motion" src/styles/3-components/_nav.css` returns a match
- `grep -n "prefers-reduced-motion" src/styles/3-components/_case-study.css` returns a match
- `grep -rn "—" index.html src/pages/ | grep -E "<title>|<meta name=\"description\"|<h1"` returns zero matches
- `grep -n "40px.*56px.*64px.*80px.*80px" src/styles/2-base/_typography.css` returns one match
- `grep -rn "#[0-9a-fA-F]" src/styles/ --include="*.css" | grep -v "_variables.css"` returns zero matches
- `grep -n "gap: 5px" src/styles/3-components/_nav.css` returns zero matches (Wave 1)
- `grep -n "hover: hover" src/styles/3-components/_footer.css` returns a match (Wave 1)
- All five requirements (ANIM-06, TYP-01, TYP-02, TYP-03, TOK-02) have passing verification commands
</success_criteria>

<output>
Create `.planning/phases/07-footer-global-audit/07-02-SUMMARY.md` when done.
</output>
