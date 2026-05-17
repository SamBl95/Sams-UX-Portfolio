# Phase 1: Foundation - Context

**Gathered:** 2026-05-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a fully-linked, structurally consistent site with a confident design foundation. All pages exist, nav and footer are identical across every page via a shared include mechanism, no broken internal links, and the colour palette, type application, and layout are settled and intentional. Content and copy are out of scope — design foundation and structure only.

</domain>

<decisions>
## Implementation Decisions

### Component Consistency

- **D-01:** Nav and footer will be implemented using a **Vite HTML include plugin** (e.g., `vite-plugin-html-include` or equivalent). `src/components/nav.html` and `src/components/footer.html` become the single source of truth. Every page includes them — no manual copying.
- **D-02:** Mobile hamburger toggle uses a **small JS script** (toggles `.nav--open` on `.nav`, `aria-expanded` on the button). This matches the intent already documented in `src/components/nav.html`.
- **D-03:** Active nav states — Claude's discretion. Use whatever is cleanest given the existing `_nav.css`. At minimum, `aria-current="page"` on the active link.

### Navigation Links

- **D-04:** Final nav structure: **Work** → `#case-studies` (homepage scroll anchor) / **About** → `/src/pages/about.html` / **Stories** → `/src/pages/stories/index.html` / **Get in touch** → `/src/pages/contact.html`
- **D-05:** "Get in touch" links to the **contact page** (`/src/pages/contact.html`), not a homepage anchor.
- **D-06:** Blog section is named **"Stories"** throughout — in the nav, on the page, in the URL path.

### Contact Page

- **D-07:** Contact page is an editorial "reach me" page — **email link + LinkedIn link + what Sam is interested in hearing about**. No contact form, no backend.
- **D-08:** **Homepage contact section is removed entirely.** The homepage ends with the case studies section. Contact page is the sole contact destination.
- **D-09:** Footer retains email + LinkedIn links (they serve discovery, the contact page serves intent).

### Stories (Blog) Structure

- **D-10:** Stories **index page** uses a **date/title list** layout — post title, date, one-line summary. Minimal, editorial, fast to scan.
- **D-11:** Stories **post page** layout — Claude's discretion. Should be appropriate for long-form reading (comfortable line length, good vertical rhythm). Reuse existing CSS custom properties and spacing tokens.
- **D-12:** URL structure: `/src/pages/stories/index.html` for the listing, `/src/pages/stories/[slug].html` for individual posts. At least one working post example required.

### Design Foundation

- **D-13:** **Colour palette: go light.** Replace the dark forest green theme with a light/neutral palette. All tokens in `_variables.css` are in scope for replacement. Direction: clean, warm-neutral or off-white base — not pure white, not dark.
- **D-14:** **Typography: keep Fraunces + Urbanist, fix the application.** The typefaces are right. The sizing, weight, and hierarchy across h1–h4, body, and UI text needs to feel intentional rather than default. This is a type scale and weight audit, not a font swap.
- **D-15:** **Layout: to be explored.** Sam couldn't pinpoint the issue without seeing options. The UI design contract (`/gsd:ui-phase 1`) should present layout directions — section proportions, container widths, vertical rhythm — before locking anything.

### Claude's Discretion

- Active nav state visual treatment (minimum: `aria-current="page"`; Claude may add `.nav__link--active` if it's clean in context of existing CSS)
- Blog post page layout (article-style reading layout, reusing existing tokens — no new design decisions needed)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `src/styles/main.css` — ITCSS import order; all layers and component files
- `src/styles/1-settings/_variables.css` — all design tokens (spacing, colour, type scale)
- `.claude/CLAUDE.md` — project conventions: BEM, no inline styles, no hex outside variables, 8pt spacing scale

### Existing Components
- `src/components/nav.html` — canonical nav markup (single source of truth after include plugin)
- `src/components/footer.html` — canonical footer markup
- `src/styles/3-components/_nav.css` — nav styles, existing active/CTA link patterns

### Page Structure References
- `index.html` — homepage: existing section structure, case-studies section ID, contact section to be removed
- `src/pages/about.html` — existing page with correct relative CSS path and aria-current pattern
- `src/pages/case-studies/cassi.html` — existing case study page structure (nav, main, footer pattern)

### Build Config
- `vite.config.js` — rollupOptions.input: all new pages must be registered here

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/nav.html` — complete nav markup ready to become the include source
- `src/components/footer.html` — complete footer markup ready to become the include source
- `src/components/case-study-card.html` — card component (not needed for Stories list, but available)
- `src/styles/3-components/_card.css` — card styles if needed for Stories index

### Established Patterns
- CSS paths vary by nesting depth (`./src/styles/main.css` at root, `../styles/main.css` one level deep, `../../styles/main.css` two levels deep). The Vite include plugin must not break this — or a root-relative path strategy should be confirmed
- BEM naming throughout: `.nav__link`, `.nav__item`, `.footer__link` etc.
- `aria-current="page"` already used on About page — extend consistently

### Integration Points
- `vite.config.js` rollupOptions.input — contact + stories/index + stories/[post] must be added
- Homepage `#case-studies` and `#contact` anchors — `#contact` section to be removed from `index.html`
- Nav and footer includes go at the top and bottom of `<body>` on every page

</code_context>

<specifics>
## Specific Ideas

- Contact page: email as `mailto:` link, LinkedIn URL, and a short editorial section — "what I'm interested in hearing about" (types of roles, projects, conversations)
- Stories section name: "Stories" not "Blog" or "Writing" — carries the career-narrative tone the user described
- Homepage ends cleanly after case studies — no trailing contact block

</specifics>

<deferred>
## Deferred Ideas

- Dedicated `/work` index page listing case studies (separate from homepage scroll) — could be a future phase if the site grows
- Contact form with real email delivery (Formspree, EmailJS) — requires JS dependency, out of scope for foundation
- SEO meta tags, Open Graph, structured data — content refinement phase
- Mobile menu detailed animation/transition polish — foundation gets it functional, polish is later

</deferred>

---

*Phase: 1-Foundation*
*Context gathered: 2026-05-17*
