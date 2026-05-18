---
gsd_state_version: 1.0
milestone: v3.0
milestone_name: Content & SEO
status: planning
stopped_at: ""
last_updated: "2026-05-19T00:00:00.000Z"
last_activity: "2026-05-19 — Roadmap created for v3.0 (Phases 8-11)"
progress:
  total_phases: 4
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-18)

**Core value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and every component is polished enough that adding content is the only remaining task.
**Current focus:** v3.0 Content & SEO

## Current Position

Phase: 8 — UI Polish (next to execute)
Plan: —
Status: Roadmap defined, ready for planning
Last activity: 2026-05-19 — Roadmap created for v3.0 (Phases 8-11)

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**

- Total plans completed: 15
- Average duration: ~15 min/plan
- Total execution time: ~3.5 hours

**By Phase:**

| Phase | Plans | Approx Duration |
|-------|-------|-----------------|
| 02-foundation-infrastructure | 1 | 25 min |
| 03-first-impression | 2 | 26 min |
| 04-cards-homepage | 2 | 24 min |
| 05-case-study-components | 2 | ~20 min |
| 06-content-pages | 3 | ~30 min |
| 07-footer-global-audit | 2 | ~20 min |

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

- FormSubmit chosen over EmailJS — no SDK, no account cap, plain HTML form action
- og:image placed in public/ (not src/) — Vite fingerprints src/ assets, breaking stable og:image URL
- JSON-LD Person schema goes inline in page head only — not in Handlebars partials (fires on every page)
- FormSubmit honeypot must use opacity:0 + position:absolute, not display:none — display:none silently bypasses spam protection
- SEO phase (11) depends on Content phase (9) — meta descriptions must reflect real copy
- vercel.json clean URL rewrites are part of Phase 11 (SEO), not standalone
- No new npm dependencies for this milestone — FormSubmit is a plain form action; all SEO is static HTML

### Pending Todos

None.

### Blockers/Concerns

- Production URL structure (samsux.co.uk) must be confirmed before writing canonical tags and sitemap — confirm at start of Phase 11
- FormSubmit endpoint requires a one-click activation email on first POST — this is an activation step, not a code bug

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Content | Per-case-study og:image thumbnails | Future | v3.0 planning |
| SEO | og:type article on Stories post pages | Future | v3.0 planning |
| SEO | vite-plugin-sitemap auto-generation | Future | v3.0 planning |
| SEO | Google Search Console submission | Post-deploy step | v3.0 planning |
| Verification | VERIFICATION.md for phases 2, 3, 5, 6, 7 | Skip | v2.0 close |
| Tracking | Nyquist VALIDATION.md files | Skip | v2.0 close |

## Session Continuity

Last session: 2026-05-19
Stopped at: v3.0 roadmap created (Phases 8-11).
Resume with: /gsd:plan-phase 8
