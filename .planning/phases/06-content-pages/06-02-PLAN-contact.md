---
phase: 06-content-pages
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - src/styles/1-settings/_variables.css
  - src/styles/3-components/_contact.css
  - src/pages/contact.html
autonomous: true
requirements:
  - LAY-03

must_haves:
  truths:
    - "Contact page heading, intro, and CTAs are constrained to ~600px — not stretched full-width"
    - "The interests list sits outside the column constraint and is not width-limited"
    - "Contact column and interests section animate in on scroll"
  artifacts:
    - path: "src/styles/1-settings/_variables.css"
      provides: "--contact-column-max-width: 600px token in Component tokens block"
      contains: "--contact-column-max-width: 600px"
    - path: "src/styles/3-components/_contact.css"
      provides: ".contact__column rule referencing the token"
      contains: ".contact__column"
    - path: "src/pages/contact.html"
      provides: ".contact__column wrapper around heading, intro, and .contact__links"
      contains: "contact__column"
  key_links:
    - from: "src/styles/3-components/_contact.css"
      to: "src/styles/1-settings/_variables.css"
      via: "var(--contact-column-max-width) references the new token"
      pattern: "var(--contact-column-max-width)"
    - from: "src/pages/contact.html"
      to: "src/styles/3-components/_contact.css"
      via: ".contact__column class applies the max-width constraint"
      pattern: "contact__column"
---

<objective>
Add a 600px column constraint to the Contact page CTA group and add scroll-reveal entrance classes.

Purpose: The email CTA at full viewport width reads as accidental, not designed. A BEM element .contact__column scopes the constraint to the heading, intro, and CTA buttons — the interests list remains full-width. A new component token --contact-column-max-width: 600px is added to _variables.css, consistent with the --hero-content-max-width pattern.

Output: New token in _variables.css. New .contact__column rule in _contact.css. contact.html updated with the wrapper div and js-reveal attributes.
</objective>

<execution_context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/ROADMAP.md
@C:/Users/sambl/OneDrive/Documents/my-portfolio-v2/.planning/phases/06-content-pages/06-UI-SPEC.md

<interfaces>
<!-- Existing code and markup. Extracted from codebase. Executor uses these directly. -->

From src/styles/1-settings/_variables.css — the Component tokens block already contains:
  --hero-content-max-width: ...
  Add --contact-column-max-width: 600px immediately after it.

From src/styles/3-components/_contact.css — current full file:
  .contact__heading { margin-bottom: var(--space-4); }
  .contact__intro { color: var(--color-text-primary); margin-bottom: var(--space-6); }
  .contact__links { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-8); }
  -- ADD new rule: .contact__column { max-width: var(--contact-column-max-width); }
  -- Place this BEFORE .contact__heading so the file reads: column constraint → heading → intro → links

From src/pages/contact.html — current markup inside .container:
  <h1 id="contact-heading" class="contact__heading">Get in touch</h1>
  <p class="contact__intro">...</p>
  <div class="contact__links">...</div>
  <div class="contact__interests">...</div>

  After edit, the structure must be:
  <div class="contact__column js-reveal">
    <h1 id="contact-heading" class="contact__heading">Get in touch</h1>
    <p class="contact__intro">...</p>
    <div class="contact__links">...</div>
  </div>
  <div class="contact__interests js-reveal" data-reveal-delay="100">
    ...
  </div>

  The aria-labelledby="contact-heading" is on the outer <section> — the h1 moving
  inside .contact__column does not break this because aria-labelledby resolves the
  id="contact-heading" regardless of nesting depth.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add --contact-column-max-width token and .contact__column CSS rule</name>
  <files>src/styles/1-settings/_variables.css, src/styles/3-components/_contact.css</files>
  <read_first>
    - src/styles/1-settings/_variables.css — read the Component tokens block to find where --hero-content-max-width is declared and confirm the insertion point
    - src/styles/3-components/_contact.css — read in full before editing
  </read_first>
  <action>
    In _variables.css: In the Component tokens block, add the following line immediately after the --hero-content-max-width declaration:
      --contact-column-max-width: 600px;   /* contact page CTA column constraint */
    Do not add it anywhere else. Do not modify other tokens.

    In _contact.css: Add a new rule at the top of the file (before .contact__heading):
      .contact__column {
        max-width: var(--contact-column-max-width);
      }
    This positions the layout-constraint rule before the child element rules, consistent with how containers are ordered before their contents.

    Per LAY-03 from UI-SPEC: 600px is the constraint. The token name is --contact-column-max-width. The CSS property is max-width (not width) so the column naturally narrows on smaller viewports without needing a media query.
  </action>
  <verify>
    grep "contact-column-max-width" src/styles/1-settings/_variables.css
    grep "contact__column" src/styles/3-components/_contact.css
    grep "var(--contact-column-max-width)" src/styles/3-components/_contact.css
  </verify>
  <done>
    - _variables.css contains --contact-column-max-width: 600px in the Component tokens block
    - _contact.css contains .contact__column { max-width: var(--contact-column-max-width); }
    - No hex values introduced; no inline styles
  </done>
</task>

<task type="auto">
  <name>Task 2: Add .contact__column wrapper and scroll-reveal classes to contact.html</name>
  <files>src/pages/contact.html</files>
  <read_first>
    - src/pages/contact.html — read in full before editing; note the current flat structure inside .container
    - src/styles/3-components/_reveal.css — confirm js-reveal and data-reveal-delay="100" attribute syntax
  </read_first>
  <action>
    Wrap the h1, p.contact__intro, and div.contact__links in a new div. The div.contact__interests must remain outside this wrapper.

    The new structure inside div.container must be:

      <div class="contact__column js-reveal">
        <h1 id="contact-heading" class="contact__heading">Get in touch</h1>
        <p class="contact__intro">I'm open to hybrid and remote product design roles...</p>
        <div class="contact__links">
          <a href="mailto:sam.blake@outlook.com" class="btn btn--primary">Email me</a>
          <a href="https://www.linkedin.com/in/samuel-blake-224605186" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
        </div>
      </div>
      <div class="contact__interests js-reveal" data-reveal-delay="100">
        <h2 class="contact__interests-heading">What I'm interested in hearing about</h2>
        <ul class="contact__interests-list">
          ...
        </ul>
      </div>

    Changes from current markup:
    1. New opening <div class="contact__column js-reveal"> before h1
    2. Closing </div> for contact__column after </div> of contact__links
    3. class="contact__interests" becomes class="contact__interests js-reveal" data-reveal-delay="100"
    4. All existing copy, href values, and attributes on child elements are preserved exactly

    The aria-labelledby="contact-heading" on the outer section element does not need to change — the id="contact-heading" on h1 remains valid regardless of wrapper depth.
  </action>
  <verify>
    grep "contact__column" src/pages/contact.html
    grep -c "js-reveal" src/pages/contact.html
    (expected: 2 — contact__column and contact__interests)
    grep "data-reveal-delay" src/pages/contact.html
    (expected: 1 line — contact__interests with delay="100")
  </verify>
  <done>
    - contact.html has a div.contact__column wrapping h1, p.contact__intro, and div.contact__links
    - div.contact__interests is a sibling of div.contact__column, not nested inside it
    - div.contact__column has class js-reveal (no delay)
    - div.contact__interests has class js-reveal and data-reveal-delay="100"
    - All existing href, copy, and aria attributes preserved unchanged
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
| T-06-02-SC | Tampering | No new npm packages this plan | accept | No package installs; pure CSS/HTML edits only |
</threat_model>

<verification>
- _variables.css: grep confirms --contact-column-max-width: 600px is in the Component tokens block
- _contact.css: grep confirms .contact__column rule with var(--contact-column-max-width)
- contact.html: grep confirms contact__column div exists and wraps h1 + intro + links
- contact.html: grep -c "js-reveal" returns 2
- contact.html: grep "data-reveal-delay" returns 1 match (contact__interests with delay="100")
- No hex values introduced; no inline styles
</verification>

<success_criteria>
- Contact heading, intro, and CTA buttons are constrained to max-width: 600px via .contact__column
- The --contact-column-max-width: 600px token is declared in the Component tokens block of _variables.css
- The interests list remains outside the column constraint
- .contact__column and .contact__interests carry js-reveal classes for scroll entrances
- .contact__interests has data-reveal-delay="100" for a 100ms stagger
</success_criteria>

<output>
Create .planning/phases/06-content-pages/06-02-SUMMARY.md when done
</output>
