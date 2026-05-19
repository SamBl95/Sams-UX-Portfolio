---
gsd_state_version: 1.0
milestone: v4.0
milestone_name: Content & Visuals
status: executing
stopped_at: v4.0 roadmap defined
last_updated: "2026-05-19T23:08:30.090Z"
last_activity: 2026-05-19 -- Phase 12 planning complete
progress:
  total_phases: 7
  completed_phases: 0
  total_plans: 1
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-19)

**Core value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and every component is polished enough that adding content is the only remaining task.
**Current focus:** v4.0 — roadmap complete, ready to plan Phase 12

## Current Position

Phase: 12 (CV Page) — not started
Plan: —
Status: Ready to execute
Last activity: 2026-05-19 -- Phase 12 planning complete

```
v4.0 Progress: [░░░░░░░░░░░░░░░░░░░░] 0% — 0/3 phases complete
```

## Performance Metrics

**Velocity:**

- Total plans completed: 18
- Average duration: ~15 min/plan
- Total execution time: ~4 hours

**By Phase:**

| Phase | Plans | Approx Duration |
|-------|-------|-----------------|
| 02-foundation-infrastructure | 1 | 25 min |
| 03-first-impression | 2 | 26 min |
| 04-cards-homepage | 2 | 24 min |
| 05-case-study-components | 2 | ~20 min |
| 06-content-pages | 3 | ~30 min |
| 07-footer-global-audit | 2 | ~20 min |
| 08-ui-polish | 3 | ~30 min |
| 09-content | 2 | ~15 min |

## Accumulated Context

### Decisions (from v2.0)

- IIFE pattern for reveal.js — matches typewriter.js project convention
- State-layer `::after` overlay documented in _reveal.css — copy the block when applying to new components
- animation-fill-mode: both covers pre-delay invisibility AND post-animation hold
- Hero 1440px max-width uses margin-inline: 0 — hero is left-aligned, not centered
- Transparent border reserve: add 2px solid transparent to resting nav links — prevents height shift
- Passive scroll listener with immediate onScroll() call — handles bfcache + Chrome perf warnings
- Two-layer shadow: 1px border + ambient alpha; raw alpha in shadow layers is permitted
- Hover gate: always (hover: hover) and (pointer: fine) — never bare (hover: hover)

### Decisions (from v3.0 planning)

- Web3Forms chosen for contact form (FormSubmit was unreachable — HTTP 522 site-wide on 2026-05-19); Web3Forms has proper CORS, no activation step, boolean success response
- og:image placed in public/ (not src/) — Vite fingerprints src/ assets, breaking stable og:image URL
- JSON-LD Person schema goes inline in page head only — not in Handlebars partials (fires on every page)
- Contact form honeypot uses opacity:0 + position:absolute, not display:none — display:none silently bypasses spam protection
- SEO phase (11) depends on Content phase (9) — meta descriptions must reflect real copy
- vercel.json clean URL rewrites are part of Phase 11 (SEO), not standalone
- No new npm dependencies for this milestone — FormSubmit is a plain form action; all SEO is static HTML

### Decisions (from v4.0 planning)

- Images sourced from samsux.webflow.io — execution requires crawling the site to discover available image assets
- Above-fold images (homepage cards + /work feature rows) split into their own phase (13) from case study image depth (14) — different discovery and execution risk profiles
- PDF file (Samuel-Blake-CV.pdf) already exists in public/ — Phase 12 only wires the button, not the file

### Pending Todos

None.

### Blockers/Concerns

- Image availability from samsux.webflow.io is unverified — Phase 13 and 14 execution must begin with a crawl to identify available assets before editing HTML
- CV page current structure needs reading before Phase 12 execution to understand existing timeline markup

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Content | Per-case-study og:image thumbnails | Future | v3.0 planning |
| SEO | og:type article on Stories post pages | Future | v3.0 planning |
| SEO | vite-plugin-sitemap auto-generation | Future | v3.0 planning |
| SEO | Google Search Console submission | Post-deploy step | v3.0 planning |
| Verification | VERIFICATION.md for phases 2, 3, 5, 6, 7 | Skip | v2.0 close |
| Tracking | Nyquist VALIDATION.md files | Skip | v2.0 close |
| Images | Real photography or illustration for About page | Future | v4.0 planning |
| Content | Stories section with real articles | Future | v4.0 planning |

## Session Continuity

Last session: 2026-05-19T00:00:00.000Z
Stopped at: v4.0 roadmap defined
Resume with: /gsd:plan-phase 12
