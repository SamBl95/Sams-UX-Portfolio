---
phase: 12-cv-page
plan: 01
subsystem: ui
tags: [html, cv, content, download, pdf, timeline]

# Dependency graph
requires: []
provides:
  - "cv.html with 5 work-history timeline items (Matalan, NUX, Santander PD, Santander UX Researcher rotation, Blake's Estates)"
  - "cv.html with 2 education entries (Google UX Professional Certificate, University of Liverpool)"
  - "cv.html Download CV button wired to /Samuel-Blake-CV.pdf"
  - "about.html Download CV button replacing the TODO comment placeholder"
affects: [any phase touching cv.html or about.html CTAs]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "about-timeline__item BEM pattern for work/education entries with no desc on education items"
    - "Download CV button uses btn btn--secondary + download attribute pointing to /Samuel-Blake-CV.pdf"

key-files:
  created: []
  modified:
    - src/pages/cv.html
    - src/pages/about.html

key-decisions:
  - "Blake's Estates used as org label instead of Self-employed to match roadmap success criterion wording"
  - "NUX and UX Researcher rotation entries use [PLACEHOLDER] descriptions — content authored by Sam"
  - "Google UX cert entry has no <p class=about-timeline__desc> matching the Liverpool entry convention"
  - "Download CV is the first action in both CTA rows, before Get in touch and Connect on LinkedIn"

patterns-established:
  - "Education timeline items omit <p class=about-timeline__desc> when no description is available"
  - "Download CV button: <a href=/Samuel-Blake-CV.pdf class=btn btn--secondary download>Download CV</a>"

requirements-completed: [CV-01, CV-02, CV-03, CV-04, CV-05]

# Metrics
duration: 8min
completed: 2026-05-20
---

# Phase 12 Plan 01: CV Content Fills and PDF Download Wiring Summary

**5-item work history with NUX volunteer and UX Researcher rotation, Google UX cert in education, and Download CV button wired to /Samuel-Blake-CV.pdf on both cv.html and about.html**

## Performance

- **Duration:** 8 min
- **Started:** 2026-05-20T00:00:00Z
- **Completed:** 2026-05-20T00:08:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- cv.html work history expanded from 3 to 5 items — NUX Volunteer (2023–present) and Santander UX Researcher rotation (2021–2022) added with placeholder descriptions
- Self-employed org label renamed to Blake's Estates to match the roadmap success criterion
- Google UX Professional Certificate added as the first education entry above University of Liverpool
- Download CV button (`btn btn--secondary`, `download` attribute, `/Samuel-Blake-CV.pdf`) added as the first CTA action on cv.html
- about.html TODO comment replaced with the identical Download CV button; button appears before Connect on LinkedIn

## Task Commits

1. **Task 1 + Task 2: CV content fills and Download CV wiring** - `1ac6883` (feat)

## Files Created/Modified
- `src/pages/cv.html` — 5-item work timeline, 2-item education timeline, Download CV CTA button
- `src/pages/about.html` — Download CV button replaces TODO placeholder in CTA section

## Decisions Made
- Blake's Estates chosen over Self-employed as the org label — matches the plan roadmap and makes the company name visible to recruiters scanning the CV.
- NUX and UX Researcher rotation entries intentionally use placeholder descriptions — content is Sam's to write, not invented by the executor.
- Google certificate entry has no `<p class="about-timeline__desc">` — consistent with the existing University of Liverpool entry which also has no description element.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. The PDF file `public/Samuel-Blake-CV.pdf` is already present in the repository (detected as untracked during execution).

## Next Phase Readiness

- Both pages are structurally complete and ready for visual QA
- Sam needs to author real descriptions for NUX and UX Researcher rotation entries (marked with [PLACEHOLDER])
- PDF download link is live once `public/Samuel-Blake-CV.pdf` is committed or served

## Self-Check: PASSED

- `src/pages/cv.html` — exists, 7 timeline items (5 work + 2 education), all verifications OK
- `src/pages/about.html` — exists, Download CV anchor present before LinkedIn, TODO comment removed
- Commit `1ac6883` — confirmed in git log

---
*Phase: 12-cv-page*
*Completed: 2026-05-20*
