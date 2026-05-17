---
plan: 01-02
phase: 01-foundation
status: complete
completed: 2026-05-17
---

# Plan 01-02 Summary — Shared Shell

## What shipped

`vite-plugin-handlebars` installed and wired. `src/components/nav.html` is now the single canonical nav with four boolean active-state flags. All five existing pages use `{{> nav ...}}` and `{{> footer}}` partials with root-relative paths. Homepage `#contact` section removed (D-08). All `#contact` hrefs updated to `/src/pages/contact.html`.

## vite-plugin-handlebars version

`^2.0.3` (resolved from `package.json` devDependencies)

## Files modified (10)

- `package.json` — devDependency added
- `package-lock.json` — updated by npm install
- `vite.config.js` — Handlebars plugin registered with `partialDirectory: r('./src/components')`
- `src/components/nav.html` — rewritten as canonical partial with 4 boolean flags
- `src/components/footer.html` — verified canonical; no changes needed
- `src/styles/3-components/_nav.css` — added `.nav__link--cta` positioning rules; nav CTA changed to use `btn btn--primary` classes
- `index.html` — partial includes, root-relative paths, #contact section removed
- `src/pages/about.html` — partial includes, root-relative paths
- `src/pages/case-studies/cassi.html` — partial includes, root-relative paths
- `src/pages/case-studies/community.html` — partial includes, root-relative paths
- `src/pages/case-studies/i-exchange.html` — partial includes, root-relative paths

## Active-flag wiring

| Page | Partial include |
|------|----------------|
| index.html | `{{> nav}}` (no flag) |
| about.html | `{{> nav navAbout=true}}` |
| cassi.html | `{{> nav}}` (no flag) |
| community.html | `{{> nav}}` (no flag) |
| i-exchange.html | `{{> nav}}` (no flag) |

## Build output

`npm run build` emits 5 pages: dist/index.html, dist/src/pages/about.html, dist/src/pages/case-studies/{cassi,community,i-exchange}.html

## NAV-05 cleanup status

Confirmed clean — `src/pages/cassi.html`, `src/pages/community.html`, `src/pages/i-exchange.html` do not exist at the `src/pages/` root level. No cleanup required.

## Visual checkpoint

**Outcome:** Approved by user

Confirmed across all 5 pages:
- Shared nav and footer render via partials
- "About" link active on about.html with `aria-current="page"`
- No `aria-current` on case study pages
- Nav "Get in touch" uses `btn btn--primary` classes — visually consistent with hero CTAs
- Homepage ends at case studies → footer; no `#contact` section
- Mobile hamburger toggle works (`aria-expanded` updates)

## Issues found during verification

1. `.nav__link--cta` CSS rule was missing — class applied in HTML but never styled. Fixed by adding positioning rules and changing the link to use `btn btn--primary` for visual styles.
2. Nav CTA hover was going black (used `--color-text-primary` as background). Fixed to match `.btn--primary` hover pattern (`color-mix` lighten).

## Open hanging links (resolved by Plan 03)

- `/src/pages/contact.html` — 404 until Plan 03
- `/src/pages/stories/index.html` — 404 until Plan 03
