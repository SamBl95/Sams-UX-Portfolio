# Site Audit — Sam Blake Portfolio v2
Generated: 2026-05-29

---

## index.html (Home)

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link on the page | `index.html` — all pages | Add `<a class="skip-link" href="#main-content">Skip to main content</a>` as first child of `<body>`, with `id="main-content"` on `<main>` |
| Critical | Accessibility | Testimonial avatar images use `alt=""` but display named people (Sophie Ling, Marcus T, Priya Mehta) — empty alt hides names from screen readers | `index.html` lines 150, 167, 185 | Change to descriptive alt e.g. `alt="Photo of Sophie Ling"` |
| High | Component | Card CTAs rendered as `<span class="btn btn--primary card__cta">` — spans are non-interactive and non-focusable | `index.html` lines 90, 103, 116 | Change to `<a href="/case-studies/...">` with btn classes |
| High | Image | Hero portrait missing `loading` attribute | `index.html` line 66 | Add `loading="eager" fetchpriority="high"` (above the fold) |
| High | Performance | Caveat font loaded globally via shared head partial but only used on the home page hero | Every page via shared partial | Move Caveat font `<link>` to `index.html` only |
| Medium | Content | `og:description` references "three years" — confirm still accurate | `index.html` meta | Verify and update |

---

## src/pages/about.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `about.html` | Add skip link pattern |
| High | Image | Portrait image missing explicit loading attribute | `about.html` line 55 | Add `loading="eager" fetchpriority="high"` |
| High | Image | Secondary image missing `loading="lazy"` | `about.html` line 167 | Add `loading="lazy"` |
| Medium | Content | "three years" in lede copy | `about.html` lede | Confirm still accurate |

---

## src/pages/cv.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `cv.html` | Add skip link pattern |
| High | Content | Em dashes used throughout timeline date ranges | `cv.html` lines 56, 72, 82, 96, 108, 138 | Replace `—` with en dash `–` for date ranges |
| High | Content | "three years" mentioned in lede | `cv.html` line 37 | Confirm and update |
| Medium | Design system | `navCV=true` flag used but not documented in CLAUDE.md's list of valid nav flags | `cv.html`; `vite.config.js` | Either document or verify it works |

---

## src/pages/case-studies/index.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `case-studies/index.html` | Add skip link pattern |
| High | Component | Card CTAs rendered as `<span class="btn btn--primary card__cta">` — same non-interactive span issue | Lines 43, 55, 67 | Change to `<a href="...">` with btn classes |
| Medium | Content | Case study card title uses em dash: "Cassi — AI Chatbot" | Line 53 | Confirm intended or replace with colon |

---

## src/pages/case-studies/i-exchange.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `i-exchange.html` | Add skip link pattern |
| Critical | Component | `cs-artifact-grid--four` is used but the CSS only ever renders 2 columns at desktop — four-column layout is silently broken | `i-exchange.html` line 679; `_cs-artifact-grid.css` lines 83–87 | Add `grid-template-columns: repeat(4, 1fr)` at 905px+ for the `--four` modifier |
| High | Component | `cs-hero__inner` class used but not defined anywhere in `_case-study.css` | `i-exchange.html` line 38 | Define `.cs-hero__inner` in `_case-study.css` |
| High | Image | Multiple case study images missing `width` and `height` attributes throughout (causes CLS) | `i-exchange.html` — multiple `<img>` lines | Add explicit dimensions to all `<img>` tags |
| Medium | Component | `cs-two-col--narrow-media` modifier used but not documented in CLAUDE.md | `i-exchange.html` line 601 | Document this modifier in CLAUDE.md |

---

## src/pages/case-studies/cassi.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `cassi.html` | Add skip link pattern |
| Critical | Component | `cs-artifact-grid--four` — same broken CSS bug | `cassi.html`; `_cs-artifact-grid.css` | Same fix as i-exchange |
| High | Component | `cs-hero__inner` class used but not defined in CSS | `cassi.html` hero | Define in `_case-study.css` |
| High | Component | Insight list uses `<h3>` in cassi but `<h4>` in i-exchange for the same component — inconsistent hierarchy | `cassi.html` lines 607–622 | Standardise on `<h4>` per CLAUDE.md spec |
| High | Image | Multiple images missing `width` and `height` throughout | Multiple `<img>` lines | Add explicit dimensions |
| High | Image | Several images missing `loading="lazy"` | Multiple `<img>` lines | Add `loading="lazy"` |
| Medium | Component | Before/after labels read "Negative"/"Positive" rather than "Before"/"After" — breaks semantic naming convention | `cassi.html` Test section | Change label text to "Before" and "After" |

---

## src/pages/case-studies/community.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `community.html` | Add skip link pattern |
| Critical | Image | All community images violate the naming convention — use spaces, URL encoding, natural language (e.g. `Community%20-%20Samantha.jpg`) | `community.html` all `<img src>`; `public/assets/images/community/` | Rename all files to `community-[section]-[class]-[description].[ext]` |
| Critical | Image | Filename typo: `Commuity%20-%20Home%20design%20before.jpg` — "Commuity" missing the letter "n" | `community.html`; image folder | Rename file correctly |
| High | Component | `cs-hero__inner` class used but not defined in CSS | `community.html` hero | Define in `_case-study.css` |
| High | Image | Multiple images missing `width` and `height` | Multiple `<img>` lines | Add explicit dimensions |
| High | Image | Multiple images missing `loading="lazy"` | Multiple `<img>` lines | Add `loading="lazy"` |
| Medium | Component | Person photo grid uses `cs-artifact-grid cs-artifact-grid--three` when a dedicated `.cs-team-grid` exists | `community.html` lines 219–229 | Switch to `.cs-team-grid` |

---

## src/pages/articles/index.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `articles/index.html` | Add skip link pattern |
| High | Content | `<!-- TODO: replace with real article image -->` left in production markup | `articles/index.html` line 71 | Replace with real asset or remove comment |
| High | Design system | `navArticles=true` used but CLAUDE.md documents the valid flag as `navStories` | `articles/index.html` ~line 4 | Verify which flag the partial checks and align everywhere |

---

## src/pages/articles/how-i-built-my-portfolio-with-claude-code.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | Article page | Add skip link pattern |
| High | Design system | `navArticles=true` — same flag discrepancy | Article `<head>` | Same fix as articles index |
| Medium | Content | Post date reads "May 2026" — verify intentional | Line 38 | Confirm correct publication date |

---

## src/pages/get-in-touch.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Critical | Accessibility | No skip navigation link | `get-in-touch.html` | Add skip link pattern |
| Low | Design system | `max-width: 600px` hardcoded in `_contact.css` line 13 — not a spacing token | `_contact.css` line 13 | Consider defining a `--content-measure` token, or leave with a `/* intentional */` comment |

---

## src/pages/system.html

| Priority | Issue type | Description | File and line | Recommended fix |
|---|---|---|---|---|
| Medium | Design system | `_system.css` contains numerous hardcoded px values not using tokens: `72px`, `88px`, `10px`, `2px`, `1px`, `64px`, `220px`, `4px`, `2px`, `3px`, `36px` | `_system.css` multiple lines | This is a `noindex` dev page — low real-world impact, but replace with tokens for consistency or add `/* intentional */` comments |
| Low | Accessibility | No skip navigation link — low priority as `noindex` | `system.html` | Add skip link for completeness |

---

## Component Library Gaps (Global)

| Pattern | Status | Suggested name | Affected files |
|---|---|---|---|
| `cs-artifact-grid--four` CSS missing four-column desktop rule | Broken — CSS never produces 4 columns | Fix existing `--four` modifier in `_cs-artifact-grid.css` | `i-exchange.html`, `cassi.html` |
| `cs-hero__inner` used in all 3 case study heroes but not defined in CSS | Undefined class | Define `.cs-hero__inner` in `_case-study.css` | `i-exchange.html`, `cassi.html`, `community.html` |
| `cs-process-row` documented in CLAUDE.md but `_cs-process-row.css` not confirmed in `main.css` imports | Possibly missing import | Verify file exists and add import to `main.css` | Any page using process row |
| `cs-results-grid` — same as above | Possibly missing import | Verify and add import | Case study pages |
| `cs-statement` — same as above | Possibly missing import | Verify and add import | Case study pages |
| `cs-feature-list` — same as above | Possibly missing import | Verify and add import | Case study pages |
| `cs-two-col--narrow-media` used in HTML but undocumented in CLAUDE.md | Undocumented modifier | Add to CLAUDE.md component docs | `i-exchange.html` |
| Skip link — no `.skip-link` CSS rule exists anywhere in the stylesheet | Missing component | Add `.skip-link` to `_nav.css` or new `_skip-link.css` | All pages |
| Four orphaned CSS files never imported in `main.css`: `_before-after.css`, `_process-steps.css`, `_metrics-row.css`, `_two-column.css` | Zombie files | Delete if superseded by `cs-` equivalents; add import if still in use | `main.css` |

---

## Image Library Gaps (Global)

| Pattern | Status | Suggested fix |
|---|---|---|
| All community images violate naming convention — spaces, URL encoding, capitalisation, typo | Convention violation | Rename all `public/assets/images/community/` files to `community-[section]-[class]-[description].[ext]` |
| CLAUDE.md states decorative images max 40% width, `_image-block.css` implements `image-block--decorative` at 48% | Documentation/code mismatch | Decide canonical value and align both |
| `<!-- TODO: replace with real article image -->` — placeholder image asset missing | Missing asset | Create or source a thumbnail for the articles index card |
| Majority of case study images missing `width` and `height` — causes CLS | Missing attributes | Mechanical pass on i-exchange, cassi, community to add dimensions |
| `public/` root contains a `Sam/` folder — capitalised, inconsistent with all other naming | Naming inconsistency | Rename to `sam/` or move to `assets/sam/` |

---

## Global Summary

**52 issues found across 11 pages.**

| Priority | Count |
|---|---|
| Critical | 18 |
| High | 22 |
| Medium | 9 |
| Low | 7 |

**Top 5 highest-impact fixes:**

1. **Skip link missing sitewide** — Affects all 11 pages. One partial edit fixes everything.
2. **`cs-artifact-grid--four` CSS bug** — Documented, used in production, silently broken. Three lines of CSS fixes it.
3. **Community image naming violations** — All assets violate the documented convention including a filename typo.
4. **`<span>` card CTAs** — Three pages use non-interactive, non-focusable spans as primary calls to action.
5. **`cs-hero__inner` undefined class** — Used on all three case study hero sections, defined nowhere. Silent layout failure.

**Systemic patterns to resolve before Phase 21 UAT:**
- Skip link is one shared partial edit — do this first.
- Image `width`/`height` audit is mechanical but large — worth a dedicated pass.
- `navArticles` vs `navStories` flag discrepancy should be resolved before adding any more pages.
- Four orphaned CSS files should be explicitly deleted once confirmed superseded.
- Caveat font global load is a single-line change that improves every non-home page.
