---
gsd_state_version: 1.0
milestone: v3.0
milestone_name: Content & SEO
status: in progress
stopped_at: Phase 11 executed — ready to verify
last_updated: "2026-05-19T00:00:00.000Z"
last_activity: 2026-05-19 — Phase 11 SEO executed (2/2 plans complete, build passing)
progress:
  total_phases: 4
  completed_phases: 2
  total_plans: 11
  completed_plans: 7
  percent: 75
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-18)

**Core value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and every component is polished enough that adding content is the only remaining task.
**Current focus:** v3.0 Content & SEO

## Current Position

Phase: 11 — SEO (EXECUTED)
Plan: 2/2 plans executed
Status: Ready to verify
Last activity: 2026-05-19 — Phase 11 executed (both waves complete, build passing)

Progress: [███████░░░] 75%

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

### Pending Todos

None.

### Blockers/Concerns

- Production URL confirmed as https://www.samsux.co.uk — used in all canonical tags and sitemap in Phase 11 plans
- public/og-image.png must exist before deploying — plans include a preflight check; create a placeholder if absent

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

Last session: 2026-05-19T14:00:00.000Z
Stopped at: Phase 9 executed
Resume with: /gsd:verify-work 10
