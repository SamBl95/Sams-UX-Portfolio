# Phase 9: Content — Research

**Researched:** 2026-05-19
**Domain:** Static HTML content population — case studies, About page, Stories article structure
**Confidence:** HIGH

---

## Summary

Phase 9 is a content-population phase, not a build phase. The component infrastructure is already complete — all three case study pages (`i-exchange.html`, `cassi.html`, `community.html`) carry full, real narrative copy right now. The About page carries a well-written personal story but is missing a structured work history section and a skills section, which CONT-04 explicitly requires. The Stories section has one article (`design-systems-and-portfolio-sites.html`) with real copy and a clean post structure; CONT-05 requires that article to have a "placeholder narrative structure ready for content" — it already exceeds that bar.

The key finding is that **CONT-01, CONT-02, and CONT-03 are already met** — the case studies have their real Webflow-sourced copy. This narrows Phase 9 to two remaining gaps: (1) adding a work history + skills section to About, and (2) confirming the Stories article structure is publication-ready.

The only genuine build work in this phase is adding two new HTML sections to `about.html` and their corresponding CSS rules in `_about.css`. No new pages, no new CSS files, no Vite config changes.

**Primary recommendation:** Treat Phase 9 as a two-task phase. Task 1: audit and confirm CONT-01/02/03/05 as already met. Task 2: add a work history timeline section and a skills/tools section to `about.html`.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | i-Exchange case study has real copy and narrative | ALREADY MET — full narrative, metrics, and retrospective present in `i-exchange.html` |
| CONT-02 | CASSI case study has real copy and narrative | ALREADY MET — full narrative, metrics, and retrospective present in `cassi.html` |
| CONT-03 | Community case study has real copy and narrative | ALREADY MET — full narrative, metrics, and retrospective present in `community.html` |
| CONT-04 | About page has work history and skills from Webflow | NOT MET — About has personal narrative but no work history timeline or skills section |
| CONT-05 | Stories section has a placeholder article structure ready for content | ALREADY MET — `design-systems-and-portfolio-sites.html` has real copy and a reusable `.post__*` component structure |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Case study copy | Static HTML | — | Content lives directly in `.html` files; no CMS, no JS |
| About work history | Static HTML | CSS (`_about.css`) | New `<section>` elements added to `about.html`; new BEM modifiers in `_about.css` |
| Stories post structure | Static HTML | CSS (`_stories.css`) | `.post__*` component already styled; structure is a content template |
| Design tokens / typography | CSS settings layer | — | All token usage goes through `_variables.css`; no inline styles |

---

## Standard Stack

No new packages. This phase is vanilla HTML + CSS only.

### Current Infrastructure (Already in Place)

| Component | File | Status |
|-----------|------|--------|
| Case study template | `_case-study.css` | Complete — shared by all three pages |
| About page sections | `_about.css` | Partial — has `.about-section` but no `.about-timeline` or `.about-skills` |
| Stories post layout | `_stories.css` | Complete — `.post__*` covers all article needs |
| Design tokens | `_variables.css` | Complete — all spacing, colour, type tokens available |

**No npm installs required. No slopcheck needed.**

---

## Package Legitimacy Audit

No external packages are installed in this phase. This section is intentionally omitted.

---

## Architecture Patterns

### Existing Case Study Structure (CONT-01/02/03 already met)

All three case study pages share an identical section sequence:

```
cs-hero          — back link, h1, lede quote, metrics strip, project meta dl
cs-summary       — project summary dl (6 Q&A items)
cs-body article  — phases: Background, Empathise, Define, Ideate, Test, Solution, Results
                   (each as .cs-phase with eyebrow, h2, .cs-phase__body, optional .cs-callout)
cs-retro         — three .cs-retro__item retrospective cards
cs-pagination    — single "Next case study" link
```

**Finding:** All narrative slots are filled with real copy drawn from Webflow. No placeholder text exists. The requirements CONT-01, CONT-02, and CONT-03 are already satisfied — the planner should open these as verification tasks only, not build tasks.

### Existing About Page Structure (CONT-04 partially met)

Current sections in `about.html`:

```
about-hero        — eyebrow, h1 ("I discovered UX while having breakfast..."), lede
about-section     — "How I got here" — personal narrative (5 paragraphs)
about-section--surface — "Giving back" — NUX volunteering (1 paragraph)
about-section     — "Beyond work" — hobbies (1 paragraph)
cta-section       — "Get in touch" — email + LinkedIn
```

**What is missing** for CONT-04:
- A structured work history section showing Sam's roles with organisation, title, dates, and brief outcome — the recruiter-facing "what did Sam do where?" overview
- A skills or tools section listing Sam's design capabilities

Both sections exist on the Webflow source but are not yet in this build. They need to be authored as new `<section>` elements within `about.html` following existing `.about-section` BEM patterns, with CSS additions in `_about.css`.

### Existing Stories Post Structure (CONT-05 already met)

The existing article (`design-systems-and-portfolio-sites.html`) uses:

```
.post.section-lg         — article wrapper
  .post__back            — "← Back to stories" link
  .post__header          — .post__date + h1.post__title
  .post__body            — h2 headings + paragraphs
```

This structure is reusable, semantic, and publication-ready. CONT-05 requires "a placeholder article structure ready for content" — this already exceeds that bar with real published copy. The planner should treat CONT-05 as a verification/confirmation task.

### Recommended New About Sections (CONT-04)

**Work History Timeline**

Pattern: A `<dl>` or `<ul>` of role entries, each with organisation, title, dates, and 1–2 sentence outcome statement. BEM modifier: `.about-timeline` in `_about.css`.

```html
<section class="about-section section-md js-reveal" aria-labelledby="about-history-heading">
  <div class="container-content">
    <h2 id="about-history-heading" class="about-section__heading">Work history</h2>
    <ul class="about-timeline" role="list">
      <li class="about-timeline__item">
        <div class="about-timeline__meta">
          <span class="about-timeline__org">Matalan</span>
          <span class="about-timeline__period">2024 – present</span>
        </div>
        <h3 class="about-timeline__role">Product Designer</h3>
        <p class="about-timeline__desc">Building a design system from scratch, leading a platform migration, and running discovery work across retail digital products.</p>
      </li>
      <!-- Santander UK, property director entries follow same structure -->
    </ul>
  </div>
</section>
```

**Skills Section**

Pattern: A two-column grid of skill categories (Craft, Process, Tools). BEM modifier: `.about-skills` in `_about.css`.

```html
<section class="about-section about-section--surface section-md js-reveal" aria-labelledby="about-skills-heading">
  <div class="container-content">
    <h2 id="about-skills-heading" class="about-section__heading">Skills &amp; tools</h2>
    <dl class="about-skills">
      <div class="about-skills__group">
        <dt class="about-skills__label">Craft</dt>
        <dd class="about-skills__items">User research, interaction design, prototyping, usability testing, design systems</dd>
      </div>
      <!-- Process, Tools groups -->
    </dl>
  </div>
</section>
```

**Placement:** Work history sits between "How I got here" and "Giving back". Skills sits between "Giving back" and "Beyond work".

### Anti-Patterns to Avoid

- **Adding hex values directly to HTML or CSS**: All colours must reference `_variables.css` tokens
- **Using `container-wide` instead of `container-content`**: About page uses `container-content` for consistent narrower reading width — do not switch
- **Inventing new spacing values**: Use `--space-*` tokens only
- **Adding a new CSS file**: Add `.about-timeline` and `.about-skills` rules to existing `_about.css` — do not create a new file
- **Adding JS**: This phase is copy/structure only — no JS touches needed

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Timeline visual connector line | Custom SVG or JS scroll tracker | CSS `::before` pseudo-element with `border-left` on `.about-timeline__item` | No JS needed; CSS handles the visual separator |
| Skills grid | Custom grid JS component | CSS Grid via `display: grid` using existing `--space-*` tokens | Already established pattern across the codebase |
| Animated counters for work stats | JS counter animation | Static numbers in HTML | Phase constraint: no new JS; animation is a phase 8 concern, not a content phase |

---

## Common Pitfalls

### Pitfall 1: Assuming case studies need copy work

**What goes wrong:** The planner creates "write copy" tasks for all three case studies before auditing the pages.

**Why it happens:** CONT-01/02/03 requirements say "has real copy pulled from Webflow" — the natural read is that Webflow copy hasn't been transferred yet.

**How to avoid:** Audit first. All three case study pages were populated with complete Webflow narrative during Phase 5/6. CONT-01/02/03 are met; plan only verification tasks for them.

**Warning signs:** Any task description that says "add copy to i-exchange.html" — the file already has full narrative content.

### Pitfall 2: Breaking About page container class

**What goes wrong:** New sections use `container` instead of `container-content`.

**Why it happens:** The `work.html` page uses `container` (full width); the About page uses `container-content` (narrower reading width).

**How to avoid:** Check `about.html` — every section uses `div class="container-content"`. Keep this consistent for new work history and skills sections.

### Pitfall 3: Adding skills section without BEM class on the section itself

**What goes wrong:** The section is styled using `about-section` only, but the inner dl/ul has no scoped BEM class, creating selector conflicts.

**How to avoid:** New inner components must have their own BEM block names (`about-timeline`, `about-skills`) that are only used inside those sections.

### Pitfall 4: Property sector missing from work history

**What goes wrong:** Work history only lists Santander and Matalan, missing the property director role that CONT-04 references ("Santander UK, Matalan, property").

**How to avoid:** REQUIREMENTS.md and ROADMAP.md both list all three sectors. Ensure the property director role appears as a timeline entry. The About page mentions "property" briefly in the personal narrative but doesn't formalise it as a role entry.

---

## Code Examples

### Existing `.about-section` pattern (from `about.html`)

```html
<section class="about-section section-md js-reveal" aria-labelledby="about-story-heading">
  <div class="container-content">
    <h2 id="about-story-heading" class="about-section__heading">How I got here</h2>
    <div class="about-section__body">
      <p>...</p>
    </div>
  </div>
</section>
```

All new About sections must follow this exact scaffold: `section.about-section.section-md.js-reveal` > `div.container-content` > `h2.about-section__heading`.

### Existing `.about-section--surface` modifier

Used on the "Giving back" section to apply `background-color: var(--color-surface)`. Reuse this on Skills if visual alternation is desired.

### Existing `.about-section` CSS (from `_about.css`)

```css
.about-section {
  border-top: 1px solid var(--color-border);
}
.about-section--surface {
  background-color: var(--color-surface);
}
.about-section__heading {
  font-weight:    var(--font-weight-bold);
  line-height:    1.1;
  letter-spacing: -0.01em;
  color:          var(--color-text-primary);
  margin-bottom:  var(--space-6);
}
```

New `.about-timeline__*` and `.about-skills__*` rules append to this file.

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| Webflow-hosted copy | Static HTML in Vite MPA | Copy is already transferred for case studies |
| Placeholder paragraphs | Real narrative | All three case studies fully populated |
| About missing work history | About needs work history + skills sections | This is the only genuine build work in Phase 9 |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Webflow portfolio (samsux.webflow.io) is the copy source for About work history and skills | Phase Requirements | If Sam has not yet drafted this copy, the planner must mark About work history tasks as "Sam provides copy, Claude adds HTML structure" |
| A2 | The property role should appear as a work history entry (not just a mention in the narrative paragraph) | Common Pitfalls | If Sam only wants Santander and Matalan as formal timeline entries, the property entry can be collapsed to a single line |
| A3 | The existing Stories article qualifies as meeting CONT-05 without changes | Phase Requirements | If Sam expects a second story stub or a specific "ready for content" placeholder format, additional work is needed |

---

## Open Questions

1. **What is Sam's copy for the About work history section?**
   - What we know: The REQUIREMENTS say "work history and skills from Webflow"; the current About has a narrative paragraph that mentions Matalan, Santander, and property but no formal timeline
   - What's unclear: Whether the Webflow site has structured work history copy that Sam can provide, or whether the planner should scaffold the structure and leave copy as Sam's task
   - Recommendation: Planner creates the HTML structure with clearly labelled placeholder entries; execution step confirms copy with Sam before shipping

2. **Does property director appear as a formal timeline entry?**
   - What we know: The ROADMAP says "Santander UK, Matalan, property" as work sectors; the About narrative says "tried a few things across property, customer service and pest control"
   - What's unclear: Whether Sam ran a property business formally (with title and dates) or whether it's background context only
   - Recommendation: Include it as a timeline entry with a question mark on dates; Sam confirms during execution

3. **Should CONT-01/02/03 verification be explicit plan tasks?**
   - What we know: The requirements are already met
   - What's unclear: Whether the planner should create explicit "verify case study copy is complete" tasks or treat them as implicit
   - Recommendation: Create one verification task per case study as a light audit step — confirms no regressions from Phase 8 work page linking

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — this phase is static HTML/CSS authoring only)

---

## Validation Architecture

`workflow.nyquist_validation` is `false` in `.planning/config.json`. This section is omitted per config.

---

## Security Domain

`security_enforcement` is `true` in config. ASVS Level 1.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static site, no auth |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | Public pages |
| V5 Input Validation | No | No user inputs in this phase |
| V6 Cryptography | No | No secrets or encryption |

This phase is read-only HTML content authoring. No security controls apply. No threat patterns are introduced.

---

## Sources

### Primary (HIGH confidence)
- Direct audit of `src/pages/case-studies/i-exchange.html` — confirmed full narrative copy present
- Direct audit of `src/pages/case-studies/cassi.html` — confirmed full narrative copy present
- Direct audit of `src/pages/case-studies/community.html` — confirmed full narrative copy present
- Direct audit of `src/pages/about.html` — confirmed work history and skills sections absent
- Direct audit of `src/pages/stories/design-systems-and-portfolio-sites.html` — confirmed real post content and `.post__*` structure in place
- Direct audit of `src/styles/3-components/_about.css` — confirmed `.about-section` pattern and available extension points
- Direct audit of `src/styles/3-components/_stories.css` — confirmed `.post__*` component coverage
- Direct audit of `.planning/REQUIREMENTS.md` — CONT-01 through CONT-05 scope confirmed
- Direct audit of `.planning/config.json` — `nyquist_validation: false`, `security_enforcement: true`

### Secondary (MEDIUM confidence)
- CLAUDE.md and `.claude/CLAUDE.md` — BEM + ITCSS conventions, token rules, container classes, page scaffold pattern [ASSUMED to be current]

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Case study content status (CONT-01/02/03): HIGH — directly audited all three HTML files
- About page gap analysis (CONT-04): HIGH — directly audited about.html and _about.css
- Stories structure status (CONT-05): HIGH — directly audited post HTML and _stories.css
- Proposed HTML/CSS patterns for About work history: HIGH — derived from existing patterns in the same file
- What Webflow copy contains for work history: LOW — [ASSUMED]; Sam must confirm or provide

**Research date:** 2026-05-19
**Valid until:** 2026-06-18 (stable — no fast-moving dependencies)
