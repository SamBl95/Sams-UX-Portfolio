---
phase: 06-content-pages
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/3-components/_stories.css
  - src/pages/stories/index.html
  - src/pages/stories/design-systems-and-portfolio-sites.html
autonomous: true
requirements:
  - ANIM-05
  - LAY-04

must_haves:
  truths:
    - "Hovering a stories list item reveals a left accent border that animates in from right to left"
    - "Stories post body paragraphs do not stretch beyond comfortable reading width"
    - "The hover border animation is suppressed for users who prefer reduced motion; a static border is shown instead"
    - "Stories index heading and list animate in on scroll"
    - "Stories post header and body animate in on scroll"
  artifacts:
    - path: "src/styles/3-components/_stories.css"
      provides: "::before clip-path reveal on .stories__link, max-width: 72ch on .post__body p"
      contains: ".stories__link::before"
    - path: "src/pages/stories/index.html"
      provides: "scroll-reveal classes on heading and list"
      contains: "js-reveal"
    - path: "src/pages/stories/design-systems-and-portfolio-sites.html"
      provides: "scroll-reveal classes on post header and body"
      contains: "js-reveal"
  key_links:
    - from: ".stories__link::before"
      to: "clip-path animation"
      via: "resting state inset(0 0 0 100%) → hover inset(0 0 0 0), 200ms var(--ease-out)"
      pattern: "clip-path: inset"
    - from: "prefers-reduced-motion block"
      to: ".stories__link::before"
      via: "transition: none; clip-path: inset(0 0 0 0) — static border, not hidden"
      pattern: "prefers-reduced-motion"
---

<objective>
Implement the ANIM-05 left-border clip-path reveal on .stories__link, add reading-width constraint to .post__body p, and add scroll-reveal classes to stories index and post pages.

Purpose: The left-border reveal adds directionality and craft to the existing background-color hover. The 72ch reading width prevents post paragraphs from stretching to full container width at large viewports. Scroll-reveal classes give both stories pages the same section entrance behavior as About and Contact.

Output: _stories.css updated with ::before pseudo-element animation, max-width: 72ch on .post__body p, and reduced-motion handling. Both stories HTML pages updated with js-reveal attributes.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/ROADMAP.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/phases/06-content-pages/06-UI-SPEC.md

<interfaces>
<!-- Existing selectors and markup. Extracted from codebase. Executor uses these directly. -->

From src/styles/3-components/_stories.css — current .stories__link rule (line 32-41):
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
  -- ADD position: relative to this rule --

From src/styles/3-components/_stories.css — existing hover rule (line 43-49):
  @media (hover: hover) and (pointer: fine) {
    .stories__link:hover {
      background-color: var(--color-accent-light);
      padding-inline:   var(--space-2);
      margin-inline:    calc(var(--space-2) * -1);
    }
  }
  -- The ::before hover reveal rule goes INSIDE this same @media block, after the existing :hover rule --

From src/styles/3-components/_stories.css — existing reduced-motion block (line 131-136):
  @media (prefers-reduced-motion: reduce) {
    .stories__link,
    .post__back {
      transition: none;
    }
  }
  -- ADD .stories__link::before to selector list, with transition: none AND clip-path: inset(0 0 0 0) --

From src/styles/3-components/_stories.css — existing .post__body rules (line 100-106):
  .post__body p + p {
    margin-top: var(--space-3);
  }
  .post__body h2 {
    margin-top: var(--space-6);
  }
  -- ADD a new .post__body p rule with max-width: 72ch --

From src/pages/stories/index.html — elements to receive js-reveal:
  Line 26: <h1 id="stories-heading" class="stories__heading">Stories</h1>  → add js-reveal
  Line 27: <ul class="stories__list" role="list">                           → add js-reveal data-reveal-delay="100"

From src/pages/stories/design-systems-and-portfolio-sites.html — elements to receive js-reveal:
  Line 27: <header class="post__header">  → add class="post__header js-reveal"
  Line 31: <div class="post__body">       → add class="post__body js-reveal" data-reveal-delay="100"
  (The post__back link at line 26 is navigation, not a content section — it does not receive js-reveal)
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add ANIM-05 clip-path reveal and reading-width to _stories.css</name>
  <files>src/styles/3-components/_stories.css</files>
  <read_first>
    - src/styles/3-components/_stories.css — read in full before editing; understand existing hover and reduced-motion blocks
    - src/styles/1-settings/_variables.css — confirm --ease-out token exists (used in clip-path transition)
  </read_first>
  <action>
    Make the following four changes to _stories.css. Read the file first to understand exact line numbers and surrounding context.

    CHANGE 1 — Add position: relative to .stories__link:
    In the existing .stories__link rule (currently has display, justify-content, align-items, gap, text-decoration, padding, border-radius, transition), add:
      position: relative;
    Place it as the first property in the rule so it is visually obvious why it is there (required for ::before positioning).

    CHANGE 2 — Add .stories__link::before rule:
    Immediately after the closing brace of .stories__link and before the @media (hover: hover) block, insert:

      .stories__link::before {
        content:    '';
        position:   absolute;
        left:       calc(var(--space-2) * -1);
        top:        0;
        bottom:     0;
        width:      3px;
        background: var(--color-accent-accessible);
        clip-path:  inset(0 0 0 100%);
        transition: clip-path 200ms var(--ease-out);
      }

    This is the resting state — the border is fully clipped (invisible).

    CHANGE 3 — Add hover reveal inside the existing @media (hover: hover) block:
    The existing @media (hover: hover) and (pointer: fine) block contains only .stories__link:hover with background-color, padding-inline, and margin-inline. Add a second rule inside the same @media block, after the existing :hover rule:

      .stories__link:hover::before {
        clip-path: inset(0 0 0 0);
      }

    The full @media block after this change:
      @media (hover: hover) and (pointer: fine) {
        .stories__link:hover {
          background-color: var(--color-accent-light);
          padding-inline:   var(--space-2);
          margin-inline:    calc(var(--space-2) * -1);
        }

        .stories__link:hover::before {
          clip-path: inset(0 0 0 0);
        }
      }

    Do not add a separate @media block. Both hover rules must be inside the same media query.

    CHANGE 4 — Update the prefers-reduced-motion block:
    The existing block is:
      @media (prefers-reduced-motion: reduce) {
        .stories__link,
        .post__back {
          transition: none;
        }
      }

    Expand it to:
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

    The clip-path: inset(0 0 0 0) keeps the border visible as a static accent. Do not set clip-path: inset(0 0 0 100%) here — hiding the border entirely would remove a useful visual cue for users with reduced motion.

    CHANGE 5 — Add max-width: 72ch to .post__body p:
    After the existing .post__body p + p rule, add a new rule:

      .post__body p {
        max-width: 72ch;
      }

    This constrains prose line-length. The 72ch value is intentional (ch unit, not px). Do not add it to .post__body p + p — add a standalone .post__body p rule.

    Per ANIM-05 from UI-SPEC: transition property on the ::before pseudo-element is self-contained. The parent .stories__link transition handles only background-color. This avoids overwriting the parent transition accidentally.
  </action>
  <verify>
    grep "position: relative" src/styles/3-components/_stories.css
    grep "stories__link::before" src/styles/3-components/_stories.css
    grep "clip-path: inset(0 0 0 100%)" src/styles/3-components/_stories.css
    grep "clip-path: inset(0 0 0 0)" src/styles/3-components/_stories.css
    grep "(hover: hover) and (pointer: fine)" src/styles/3-components/_stories.css
    grep "prefers-reduced-motion" src/styles/3-components/_stories.css
    grep "max-width: 72ch" src/styles/3-components/_stories.css
  </verify>
  <done>
    - .stories__link has position: relative
    - .stories__link::before rule exists with clip-path: inset(0 0 0 100%) as resting state and transition: clip-path 200ms var(--ease-out)
    - @media (hover: hover) and (pointer: fine) block contains .stories__link:hover::before { clip-path: inset(0 0 0 0); }
    - There is exactly one @media (hover: hover) and (pointer: fine) block (not two separate ones)
    - prefers-reduced-motion block includes .stories__link::before with transition: none AND clip-path: inset(0 0 0 0)
    - .post__body p rule exists with max-width: 72ch
  </done>
</task>

<task type="auto">
  <name>Task 2: Add scroll-reveal classes to stories index and post pages</name>
  <files>src/pages/stories/index.html, src/pages/stories/design-systems-and-portfolio-sites.html</files>
  <read_first>
    - src/pages/stories/index.html — read in full before editing
    - src/pages/stories/design-systems-and-portfolio-sites.html — read in full before editing
    - src/styles/3-components/_reveal.css — confirm attribute syntax for data-reveal-delay
  </read_first>
  <action>
    In src/pages/stories/index.html:
    1. The h1 with class="stories__heading" (line 26):
       Change: class="stories__heading"
       To:     class="stories__heading js-reveal"
       (no data-reveal-delay — fires immediately as the page's primary heading)

    2. The ul with class="stories__list" (line 27):
       Change: class="stories__list" role="list"
       To:     class="stories__list js-reveal" role="list" data-reveal-delay="100"
       (100ms stagger after heading)

    In src/pages/stories/design-systems-and-portfolio-sites.html:
    3. The header with class="post__header" (line 27):
       Change: class="post__header"
       To:     class="post__header js-reveal"
       (no data-reveal-delay — first content cluster, fires immediately)

    4. The div with class="post__body" (line 31):
       Change: class="post__body"
       To:     class="post__body js-reveal" data-reveal-delay="100"
       (100ms stagger after header)

    The post__back link (line 26 in the post file) does NOT receive js-reveal — it is navigation, not a content section. Only content clusters receive the reveal treatment.

    No other attributes, copy, or structure changed on either page.
  </action>
  <verify>
    grep -c "js-reveal" src/pages/stories/index.html
    (expected: 2 — stories__heading and stories__list)
    grep "data-reveal-delay" src/pages/stories/index.html
    (expected: 1 — stories__list with delay="100")
    grep -c "js-reveal" src/pages/stories/design-systems-and-portfolio-sites.html
    (expected: 2 — post__header and post__body)
    grep "data-reveal-delay" src/pages/stories/design-systems-and-portfolio-sites.html
    (expected: 1 — post__body with delay="100")
  </verify>
  <done>
    - stories/index.html: stories__heading has js-reveal, stories__list has js-reveal and data-reveal-delay="100"
    - design-systems-and-portfolio-sites.html: post__header has js-reveal, post__body has js-reveal and data-reveal-delay="100"
    - post__back link does not have js-reveal on either page
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
| T-06-03-SC | Tampering | No new npm packages this plan | accept | No package installs; pure CSS/HTML edits only |
</threat_model>

<verification>
- _stories.css: .stories__link has position: relative
- _stories.css: .stories__link::before exists with clip-path: inset(0 0 0 100%) as resting state
- _stories.css: @media (hover: hover) and (pointer: fine) block contains both :hover and :hover::before rules
- _stories.css: only one @media (hover: hover) and (pointer: fine) block total
- _stories.css: prefers-reduced-motion block contains .stories__link::before with transition: none and clip-path: inset(0 0 0 0)
- _stories.css: .post__body p rule exists with max-width: 72ch
- stories/index.html: grep -c "js-reveal" returns 2; grep "data-reveal-delay" returns 1 (delay="100" on list)
- design-systems post html: grep -c "js-reveal" returns 2; grep "data-reveal-delay" returns 1 (delay="100" on body)
</verification>

<success_criteria>
- Stories list items show left-to-right accent border reveal on hover (clip-path: inset(0 0 0 100%) → inset(0 0 0 0), 200ms ease-out)
- Under prefers-reduced-motion, the ::before border is statically visible (clip-path: inset(0 0 0 0)) with no transition
- Stories post body paragraphs have max-width: 72ch applied
- Stories index: heading and list carry js-reveal classes for scroll entrances
- Stories post: post header and post body carry js-reveal classes for scroll entrances
- Both stories HTML pages have data-reveal-delay="100" on the second element in each page's reveal sequence
</success_criteria>

<output>
Create .planning/phases/06-content-pages/06-03-SUMMARY.md when done
</output>
