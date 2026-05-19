# Milestones — Sam Blake Portfolio v2

---

## v1.0 Foundation — Shipped 2026-05-17

**Phases:** 1 | **Plans:** 4

Delivered the complete site scaffold: all 8 pages registered in Vite, Handlebars nav/footer partials, ITCSS architecture, BEM component structure, dark palette with mint teal accent, and Fraunces/Urbanist/Caveat font stack.

[Archive →](.planning/milestones/v1.0-ROADMAP.md)

---

## v2.0 Polish & Refinement — Shipped 2026-05-18

**Phases:** 2–7 | **Plans:** 13

Delivered CSS animation infrastructure (scroll-reveal, 3 easing tokens, state-layer pattern), complete nav and hero polish, card/metric component system, 7 case study storytelling components, content page layout, footer, and a full global audit. Zero hardcoded values.

[Archive →](.planning/milestones/v2.0-ROADMAP.md)

---

## v3.0 Content & SEO — Shipped 2026-05-19

**Phases:** 8–11 | **Plans:** 9 | **Commits:** ~45

### Delivered

- **Hero redesign:** "Sam Blake" h2 accent heading, updated subhead, removed eyebrow and one-liner, staggered 4-element entrance animation
- **Nav redesign:** Home link, logo removed, left-to-right underline animation, flat tab style, no bottom border
- **/work page:** Feature-row layout with measurable outcome chips for all 3 Santander case studies
- **About page:** Work history timeline (Matalan → Santander UK → Self-employed) + Skills & tools sections
- **Contact form:** Web3Forms AJAX, in-page success/error states, JS validation, honeypot spam protection
- **Full SEO suite:** Unique titles and meta descriptions across all 10 pages, canonical URLs, OG tags, theme-color
- **Structured data:** JSON-LD Person schema on homepage and About; sitemap.xml (10 entries); robots.txt; clean URL rewrites via vercel.json

### Key Decisions

| Decision | Outcome |
|----------|---------|
| Web3Forms over FormSubmit | FormSubmit unreachable (HTTP 522); Web3Forms: no activation needed |
| og:image in public/ | Vite fingerprints src/ assets — would break stable og:image URL |
| cleanUrls removed from vercel.json | Conflicted with rewrites, causing 404s on Vercel |
| Metric chips over lede outcomes | Better visual treatment — wont_fix |

### Deferred

- Per-case-study og:image thumbnails
- Real imagery for /work feature rows
- Google Search Console submission (post-deploy manual step)

[Archive →](.planning/milestones/v3.0-ROADMAP.md)

---
