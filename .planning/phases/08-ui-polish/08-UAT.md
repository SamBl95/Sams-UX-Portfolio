---
status: diagnosed
phase: 08-ui-polish
source: 08-01-SUMMARY.md, 08-02-SUMMARY.md, 08-03-SUMMARY.md
started: 2026-05-19T00:00:00Z
updated: 2026-05-19T00:00:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Hero Name + Headline
expected: On the homepage, "Sam Blake" appears as a heading above the h1. The h1 reads "A Product Designer who" followed by the typewriter animation. No "Product Designer" eyebrow label or subheadline paragraph visible.
result: pass

### 2. Hero Stagger Animation
expected: On page load/refresh, four elements animate in sequence — name, headline, typewriter text, then the action buttons — each staggered ~80ms apart.
result: pass

### 3. Nav: Home Link (no logo)
expected: The nav shows "Home" as the first link on the left. There is no "Sam Blake" logo text. Clicking Home navigates to the homepage.
result: pass

### 4. Nav: Work Link Goes to /work
expected: Clicking "Work" in the nav goes to a /work page (not an anchor link like /#case-studies).
result: pass

### 5. Nav: Hover Underline Animation (desktop)
expected: On desktop, hovering a nav link shows a thin underline that animates in from left to right. Removing hover reverses it.
result: pass

### 6. Nav: Active State
expected: The current page's nav link has a persistent underline and appears bolder than the others.
result: issue
reported: "The underline is correct on the elements that have it. Home does not, nor does get in touch, that is still a button but should be a tab item"
severity: major

### 7. Nav: No Bottom Border
expected: The nav bar has no visible horizontal divider line below it.
result: issue
reported: "no — border is still visible"
severity: minor

### 8. Work Page Loads
expected: Navigating to /work shows a page titled "Selected work" with a subheading referencing Santander UK, followed by three case study rows.
result: pass

### 9. Work Page: Feature Row Content
expected: Each of the three case study rows contains: a rectangular image placeholder, a small metric chip, an h2 title, a description paragraph, and a ghost-style CTA button.
result: issue
reported: "can't see a chip — it does have the stats in a big header section"
severity: minor

### 10. Work Page: Desktop Layout
expected: At a wide viewport (905px+), each feature row shows the image on the left and the copy (chip + title + description + CTA) on the right, side by side.
result: pass

### 11. Paragraph Width Unconstrained
expected: On the About page, a case study page, and a Stories post, body paragraphs stretch to fill the full container width — no 72-character cap causing them to stop short in the middle of wide screens.
result: pass

## Summary

total: 11
passed: 8
issues: 3
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "Home nav link shows active underline + semibold when on the homepage"
  status: failed
  reason: "User reported: Home does not have the active underline"
  severity: major
  test: 6
  root_cause: "index.html uses {{> nav}} without navHome=true flag, so Home link never receives aria-current='page' or nav__link--active class"
  artifacts:
    - path: "index.html"
      issue: "{{> nav}} missing navHome=true"
  missing:
    - "Add navHome=true to nav partial include in index.html"
  debug_session: ""

- truth: "'Get in touch' is a plain nav link item styled like Home/Work/About/Stories"
  status: failed
  reason: "User reported: Get in touch is still a button but should be a tab item"
  severity: major
  test: 6
  root_cause: "nav.html line 54 uses class='btn btn--primary nav__link--cta' — btn classes override nav__link styling, rendering it as a filled button"
  artifacts:
    - path: "src/components/nav.html"
      issue: "Get in touch anchor uses btn btn--primary instead of nav__link"
    - path: "src/styles/3-components/_nav.css"
      issue: ".nav__link--cta and .nav__list .btn rules exist for old button treatment"
  missing:
    - "Change Get in touch anchor class to nav__link (remove btn btn--primary nav__link--cta)"
    - "Remove .nav__link--cta and .nav__list .btn CSS rules (no longer needed)"
  debug_session: ""

- truth: "Nav bar has no bottom border line"
  status: failed
  reason: "User reported: border is still visible"
  severity: minor
  test: 7
  root_cause: ".nav--scrolled box-shadow uses '0 1px 0 var(--color-border)' as first layer, rendering a solid 1px line identical to a border whenever window.scrollY > 8"
  artifacts:
    - path: "src/styles/3-components/_nav.css"
      issue: ".nav--scrolled box-shadow first value creates a visible border-like line"
  missing:
    - "Remove or soften the '0 1px 0 var(--color-border)' layer from .nav--scrolled box-shadow"
  debug_session: ""

- truth: "Each work__feature row has a small metric chip element"
  status: failed
  reason: "User reported: can't see a chip — it does have the stats in a big header section"
  severity: minor
  test: 9
  root_cause: "work.html uses card__metric-chip which is a full-width stat block (padding: 40px 48px, text-3xl heading, teal top border) — not a small inline chip. Wrong component reused."
  artifacts:
    - path: "src/pages/work.html"
      issue: "card__metric-chip used where a small inline chip is expected"
    - path: "src/styles/3-components/_card.css"
      issue: "card__metric-chip is a large stat panel, not a small chip"
  missing:
    - "Replace card__metric-chip markup in work.html with a proper small chip element (e.g. work__feature-chip)"
    - "Add .work__feature-chip styles to _work.css — small pill, compact padding, small text"
  debug_session: ""
