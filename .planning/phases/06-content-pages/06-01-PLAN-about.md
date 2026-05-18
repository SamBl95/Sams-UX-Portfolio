---
phase: 06-content-pages
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/3-components/_about.css
  - src/styles/3-components/_case-study.css
  - src/pages/about.html
autonomous: true
requirements:
  - LAY-04

must_haves:
  truths:
    - "About page prose paragraphs do not stretch beyond comfortable reading width"
    - "Case study body paragraphs do not stretch beyond comfortable reading width"
    - "About hero, lede, and each content section animate in on scroll"
  artifacts:
    - path: "src/styles/3-components/_about.css"
      provides: "max-width: 72ch on .about-section__body p"
      contains: "max-width: 72ch"
    - path: "src/styles/3-components/_case-study.css"
      provides: "max-width: 72ch on .cs-phase__body p"
      contains: "max-width: 72ch"
    - path: "src/pages/about.html"
      provides: "scroll-reveal classes on hero section and content sections"
      contains: "js-reveal"
  key_links:
    - from: "src/pages/about.html"
      to: "src/styles/3-components/_reveal.css"
      via: "js-reveal class triggers IntersectionObserver animation"
      pattern: "js-reveal"
    - from: "src/styles/3-components/_about.css"
      to: ".about-section__body p"
      via: "max-width constrains paragraph line-length"
      pattern: "max-width: 72ch"
---

<objective>
Add prose reading-width constraint to About and case study body paragraphs, and add scroll-reveal entrance classes to the About page sections.

Purpose: Prose at full container width (up to 1440px) produces uncomfortably long line-lengths. The 72ch ceiling is component-scoped — it constrains only paragraph elements, not the container. Case study pages share the same reading-width need via .cs-phase__body p (the confirmed selector in _case-study.css).

Output: _about.css and _case-study.css updated with max-width: 72ch on prose p selectors. about.html updated with js-reveal and data-reveal-delay attributes on hero section and each content section.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/ROADMAP.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/phases/06-content-pages/06-UI-SPEC.md

<interfaces>
<!-- Existing selectors to modify. Extracted from codebase. Executor uses these directly. -->

From src/styles/3-components/_about.css (line 70-75):
  .about-section__body p {
    font-size:     var(--text-base);
    line-height:   var(--leading-body);
    color:         var(--color-text-secondary);
    margin-bottom: var(--space-5);
  }
  -- ADD max-width: 72ch to this rule --

From src/styles/3-components/_case-study.css (line 278-283):
  .cs-phase__body p {
    font-size:     var(--text-base);
    line-height:   var(--leading-relaxed);
    color:         var(--color-text-secondary);
    margin-bottom: var(--space-5);
  }
  -- ADD max-width: 72ch to this rule --
  NOTE: The confirmed selector is .cs-phase__body p, NOT .case-study__body p.
  The UI-SPEC lists .case-study__body p as an alias — ignore that; the actual
  codebase selector is .cs-phase__body p.

From src/pages/about.html — sections to receive js-reveal:
  Line 28:  <section class="about-hero section-lg" ...>  → add class="about-hero section-lg js-reveal"
  Line 35:  <p class="about-hero__lede">                 → add class="about-hero__lede js-reveal" data-reveal-delay="100"
  Line 41:  <section class="about-section section-md" aria-labelledby="about-story-heading">     → add js-reveal
  Line 88:  <section class="about-section about-section--surface section-md" ...>                → add js-reveal
  Line 106: <section class="about-section section-md" aria-labelledby="about-personal-heading">  → add js-reveal
  (The cta-section at line 123 is not in scope — it is a shared CTA component, not an About section)
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add max-width: 72ch to About and case study prose selectors</name>
  <files>src/styles/3-components/_about.css, src/styles/3-components/_case-study.css</files>
  <read_first>
    - src/styles/3-components/_about.css — read in full before editing; locate the .about-section__body p rule
    - src/styles/3-components/_case-study.css — read in full before editing; locate the .cs-phase__body p rule (line ~278)
    - src/styles/1-settings/_variables.css — confirm no existing 72ch token (there is none; use the literal value)
  </read_first>
  <action>
    In _about.css: add max-width: 72ch to the existing .about-section__body p rule. Place it after font-size and before line-height (or at the end of the declaration block — either is acceptable). Do not create a new rule block; add the property to the existing one.

    In _case-study.css: add max-width: 72ch to the existing .cs-phase__body p rule (around line 278). Same approach — add to the existing declaration block, do not create a new rule. The selector is .cs-phase__body p, not .case-study__body p.

    Per LAY-04 from UI-SPEC: max-width is 72ch (ch unit, not px). This is intentional — ch is proportional to the font size, giving ~65-70 characters per line at body text sizes. No token exists for this; use the literal value directly.
  </action>
  <verify>
    grep "max-width: 72ch" src/styles/3-components/_about.css
    grep "max-width: 72ch" src/styles/3-components/_case-study.css
  </verify>
  <done>
    - _about.css: .about-section__body p rule contains max-width: 72ch
    - _case-study.css: .cs-phase__body p rule contains max-width: 72ch
    - Neither file has a new standalone rule block for this; the property is added to existing selectors
  </done>
</task>

<task type="auto">
  <name>Task 2: Add scroll-reveal classes to About page sections</name>
  <files>src/pages/about.html</files>
  <read_first>
    - src/pages/about.html — read in full before editing
    - src/styles/3-components/_reveal.css — understand how js-reveal and data-reveal-delay attributes work
    - src/reveal.js — understand what class IntersectionObserver adds (js-reveal--visible) to confirm js-reveal is the correct hook
  </read_first>
  <action>
    Add js-reveal and data-reveal-delay attributes to the following elements in about.html. Do not change any other attributes, copy, or structure.

    1. The about-hero section (line 28):
       Change: class="about-hero section-lg"
       To:     class="about-hero section-lg js-reveal"
       (no data-reveal-delay — hero fires immediately)

    2. The about-hero__lede paragraph (line 35):
       Change: class="about-hero__lede"
       To:     class="about-hero__lede js-reveal" data-reveal-delay="100"
       (100ms stagger after hero)

    3. The "How I got here" section (line 41):
       Change: class="about-section section-md"
       To:     class="about-section section-md js-reveal"

    4. The "Giving back" section (line 88):
       Change: class="about-section about-section--surface section-md"
       To:     class="about-section about-section--surface section-md js-reveal"

    5. The "Beyond work" section (line 106):
       Change: class="about-section section-md"
       To:     class="about-section section-md js-reveal"

    The cta-section at the bottom of the page (line 123) does NOT receive js-reveal — it is a shared CTA component, not scoped to the About page.

    Each .about-section is its own viewport trigger — IntersectionObserver will fire individually as each section scrolls into view, producing a natural stagger without needing data-reveal-delay on sections.
  </action>
  <verify>
    grep -c "js-reveal" src/pages/about.html
    (expected: 5 — hero section, lede paragraph, and 3 about-sections)
    grep "data-reveal-delay" src/pages/about.html
    (expected: 1 line — the about-hero__lede with delay="100")
  </verify>
  <done>
    - about.html has exactly 5 elements with class js-reveal
    - about-hero__lede has data-reveal-delay="100"
    - No other elements have data-reveal-delay
    - The cta-section does not have js-reveal
    - No other HTML attributes, copy, or structure changed
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| static file → browser | HTML/CSS served as static assets; no user input, no dynamic data |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-06-01-SC | Tampering | No new npm packages this plan | accept | No package installs; pure CSS/HTML edits only |
</threat_model>

<verification>
- src/styles/3-components/_about.css: grep confirms max-width: 72ch inside .about-section__body p rule
- src/styles/3-components/_case-study.css: grep confirms max-width: 72ch inside .cs-phase__body p rule
- src/pages/about.html: grep -c "js-reveal" returns 5
- src/pages/about.html: grep "data-reveal-delay" returns exactly 1 match (the lede paragraph with delay="100")
- No hex values introduced; no inline styles; no new CSS files
</verification>

<success_criteria>
- About page prose paragraphs have max-width: 72ch applied at component level
- Case study .cs-phase__body p paragraphs have max-width: 72ch applied at component level
- About hero, lede, and three content sections carry js-reveal class for scroll entrances
- About lede has data-reveal-delay="100" for 100ms stagger after the hero fires
</success_criteria>

<output>
Create .planning/phases/06-content-pages/06-01-SUMMARY.md when done
</output>
