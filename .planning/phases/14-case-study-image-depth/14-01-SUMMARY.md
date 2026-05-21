---
phase: 14-case-study-image-depth
plan: "01"
subsystem: case-study-pages
tags: [images, case-study, components, html]
dependency_graph:
  requires: []
  provides: [i-exchange-image-slots]
  affects: [src/pages/case-studies/i-exchange.html]
tech_stack:
  added: []
  patterns: [image-block, before-after, process-steps]
key_files:
  created: []
  modified:
    - src/pages/case-studies/i-exchange.html
decisions:
  - process-steps placed after Home ul rather than in Implementation phase — keeps visual interest in Solution section where deliverables are listed
  - saved-audience image-block placed after process-steps, before Search h3 — gives the homepage section a natural visual break
  - new-search image-block placed after Search ul — reinforces the written deliverables with direct visual evidence
metrics:
  duration: "~10 minutes"
  completed: "2026-05-21"
---

# Phase 14 Plan 01: i-Exchange Image Slots Summary

Image markup added to the i-Exchange case study using existing `.image-block`, `.before-after`, and `.process-steps` CSS components at 6 narrative-appropriate locations across Empathise, Define, Test, and Solution phases.

## What Was Built

All image slots are placeholder-ready: `src=""` with `<!-- IMAGE: path -->` comments directly above each `<img>`. No images were uploaded — the markup is structured so the user can fill in `src` attributes after uploading to `/public/assets/images/i-exchange/`.

| Location | Component | Image |
|----------|-----------|-------|
| Empathise — after heuristic analysis | `.before-after` | old-homepage.png / new-homepage.png |
| Define — after Pain point 2 body | `.image-block--contained` | old-search.png |
| Test — after NPS callout | `.image-block--contained` | search-test-results.png |
| Solution — after Home ul | `.process-steps` (4 items, no image) | n/a |
| Solution — after process-steps | `.image-block--contained` | saved-audience.png |
| Solution — after Search ul | `.image-block--contained` | new-search.png |

## Verification Results

```
grep -c "before-after" i-exchange.html  → 5  (≥ 2 required)
grep -c "image-block"  i-exchange.html  → 8  (≥ 6 required)
npm run build                           → ✓ built in 609ms
```

## Deviations from Plan

None — plan executed exactly as written. The `figure/figcaption` convention for `.image-block` and `div[role=img]` for `.before-after` were applied throughout as specified.

## Known Stubs

All `img` elements have `src=""` — intentional pre-upload placeholders. Each has a `<!-- IMAGE: /assets/images/i-exchange/... -->` comment. Once images are uploaded to `public/assets/images/i-exchange/`, the user fills in the `src` attributes. This does not prevent the plan's goal (correct markup structure in place).

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. All image paths are root-relative static references under `/assets/images/i-exchange/` — no user-controlled input involved (T-14-02 mitigation confirmed).

## Self-Check: PASSED

- `src/pages/case-studies/i-exchange.html` — modified and committed (238e556)
- Build exits 0
- All 5 `before-after` class occurrences verified
- All 8 `image-block` class occurrences verified
