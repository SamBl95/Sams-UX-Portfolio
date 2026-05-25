# Roadmap: Sam Blake Portfolio v2

## Milestones

- ✅ **v1.0 Foundation** — Phases 1 (shipped 2026-05-17) — [Archive](.planning/milestones/v1.0-ROADMAP.md)
- ✅ **v2.0 Polish & Refinement** — Phases 2–7 (shipped 2026-05-18) — [Archive](.planning/milestones/v2.0-ROADMAP.md)
- ✅ **v3.0 Content & SEO** — Phases 8–11 (shipped 2026-05-19) — [Archive](.planning/milestones/v3.0-ROADMAP.md)
- ✅ **v4.0 Content & Visuals** — Phases 12–14 (shipped 2026-05-21) — [Archive](.planning/milestones/v4.0-ROADMAP.md)
- 🚧 **v5.0 Case Study Polish and Full Site QA** — Phases 15–21 (in progress)

## Phases

<details>
<summary>✅ v1.0 Foundation — SHIPPED 2026-05-17</summary>

- [x] Phase 1: Foundation (4/4 plans) — completed 2026-05-17

</details>

<details>
<summary>✅ v2.0 Polish & Refinement — SHIPPED 2026-05-18</summary>

- [x] Phase 2: Foundation & Infrastructure (1/1 plans) — completed 2026-05-17
- [x] Phase 3: First Impression (2/2 plans) — completed 2026-05-17
- [x] Phase 4: Cards & Homepage (2/2 plans) — completed 2026-05-18
- [x] Phase 5: Case Study Components (2/2 plans) — completed 2026-05-18
- [x] Phase 6: Content Pages (3/3 plans) — completed 2026-05-18
- [x] Phase 7: Footer + Global Audit (2/2 plans) — completed 2026-05-18

</details>

<details>
<summary>✅ v3.0 Content & SEO — SHIPPED 2026-05-19</summary>

- [x] Phase 8: UI Polish (3/3 plans) — completed 2026-05-19
- [x] Phase 9: Content (2/2 plans) — completed 2026-05-19
- [x] Phase 10: Contact Form (2/2 plans) — completed 2026-05-19
- [x] Phase 11: SEO (2/2 plans) — completed 2026-05-19

</details>

<details>
<summary>✅ v4.0 Content & Visuals — SHIPPED 2026-05-21</summary>

- [x] Phase 12: CV Page (1/1 plans) — completed 2026-05-20
- [x] Phase 13: Above-Fold Images (2/2 plans) — completed 2026-05-21
- [x] Phase 14: Case Study Image Depth (3/3 plans) — completed 2026-05-21

</details>

### 🚧 v5.0 Case Study Polish and Full Site QA (In Progress)

**Milestone Goal:** Fix nav and footer consistency issues, build a reusable case study component library, fill all three case studies with approved copy and images, then run a comprehensive UAT/QA pass to ship the site completely finished.

- [ ] **Phase 15: Nav Hero Padding Fix** — Hero H1 sits at the same vertical position on About and CV as on Case Studies
- [ ] **Phase 16: Footer Audit and Fix** — Footer consistent and correctly laid out across all pages
- [ ] **Phase 17: Case Study Component Library** — 10 reusable BEM components in `_case-study-components.css`
- [ ] **Phase 18: i-Exchange Case Study** — Section-by-section copy review and image placement
- [ ] **Phase 19: CASSI Case Study** — Section-by-section copy review and image placement
- [ ] **Phase 20: Community Case Study** — Section-by-section copy review, person cards, image placement
- [ ] **Phase 21: Full Site UAT and QA** — Functional, visual, accessibility, and performance audit; fix all failures

## Phase Details

### Phase 15: Nav Hero Padding Fix
**Goal**: Hero H1 sits at the same vertical position on About and CV pages as on the Case Studies page
**Depends on**: Phase 14
**Requirements**: NAV-01
**Success Criteria** (what must be TRUE):
  1. The H1 on about.html appears at the same vertical position below the nav as on cassi.html, i-exchange.html, and community.html
  2. The H1 on cv.html appears at the same vertical position as on the case study pages
  3. No other page spacing or nav bar dimensions are changed
  4. Fix uses design tokens only — no arbitrary pixel values
**Plans**: 1 plan
Plans:
- [ ] 15-01-PLAN.md — Audit hero section structure across all pages; identify and fix extra top padding on About and CV
**UI hint**: yes

### Phase 16: Footer Audit and Fix
**Goal**: Footer is visually consistent, correctly laid out, and contains exactly the right elements on every page
**Depends on**: Phase 15
**Requirements**: FOOT-01, FOOT-02
**Success Criteria** (what must be TRUE):
  1. Footer contains: site nav links, Easter egg link (very low opacity), LinkedIn link, Get in touch link
  2. Footer contains no copyright notice and no tagline
  3. Nav links are horizontal on desktop and stacked on mobile
  4. Padding and spacing use design tokens and are consistent across all pages
  5. Footer partial is the single source of truth — no inline footer markup on any page
**Plans**: 1 plan
Plans:
- [ ] 16-01-PLAN.md — Audit footer partial and all pages; fix layout, remove copyright/tagline, standardise spacing
**UI hint**: yes

### Phase 17: Case Study Component Library
**Goal**: 10 reusable case study components exist in `_case-study-components.css`, imported in `main.css`, each documented with a usage comment
**Depends on**: Phase 16
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09, COMP-10, COMP-11
**Success Criteria** (what must be TRUE):
  1. All 10 components exist as BEM blocks in `_case-study-components.css`
  2. Each component is imported and renders correctly at 375px, 600px, 905px, and 1240px+
  3. All components use only design tokens from `_variables.css` — no hardcoded values
  4. All images use `loading="lazy"` and `object-fit: contain`
  5. All components respect `prefers-reduced-motion`
  6. All components pass WCAG 2.2 AA colour contrast
  7. Each component has a usage comment in the CSS
**Plans**: 2 plans
Plans:
- [ ] 17-01-PLAN.md — Layout components: COMP-01 (two-col text/image), COMP-02 (two-col heading/body), COMP-03 (person cards), COMP-09 (process steps)
- [ ] 17-02-PLAN.md — Media components: COMP-04 (single image+caption), COMP-05 (two images), COMP-06 (full-width image), COMP-07 (results display), COMP-08 (pull quote), COMP-10 (image with overlay)
**UI hint**: yes

### Phase 18: i-Exchange Case Study
**Goal**: i-exchange.html is complete — every section has approved copy and confirmed image placement using components from Phase 17
**Depends on**: Phase 17
**Requirements**: CS-01, CS-02, CS-03
**Success Criteria** (what must be TRUE):
  1. Every section of i-exchange.html has been shown to the user and copy explicitly approved
  2. Every image in i-exchange.html was placed only after explicit user instruction
  3. All images sourced from `public/assets/images/i-exchange/`
  4. Sizing rules applied: 60% centred default, 40% portrait, 45% side-by-side, full width for wide designs; 2x exports at half pixel max-width; `object-fit: contain`
  5. All image components from Phase 17 are used correctly
  6. No empty or broken image slots remain
**Plans**: 1 plan per section group (to be refined at plan time based on section count)
Plans:
- [ ] 18-01-PLAN.md — i-Exchange: section-by-section review and implementation (interactive, copy-first)
**UI hint**: yes

### Phase 19: CASSI Case Study
**Goal**: cassi.html is complete — every section has approved copy and confirmed image placement using components from Phase 17
**Depends on**: Phase 17
**Requirements**: CS-04, CS-05, CS-06
**Success Criteria** (what must be TRUE):
  1. Every section of cassi.html has been shown to the user and copy explicitly approved
  2. Every image in cassi.html was placed only after explicit user instruction
  3. All images sourced from `public/assets/images/cassi/`
  4. Same sizing rules as Phase 18 applied throughout
  5. No empty or broken image slots remain
**Plans**: 1 plan per section group (to be refined at plan time)
Plans:
- [ ] 19-01-PLAN.md — CASSI: section-by-section review and implementation (interactive, copy-first)
**UI hint**: yes

### Phase 20: Community Case Study
**Goal**: community.html is complete — every section has approved copy, person cards built for Samantha, Lee, and Bonny, and all image placements confirmed
**Depends on**: Phase 17
**Requirements**: CS-07, CS-08, CS-09, CS-10
**Success Criteria** (what must be TRUE):
  1. Every section of community.html has been shown to the user and copy explicitly approved
  2. Person cards for Samantha, Lee, and Bonny built using COMP-03 from Phase 17
  3. Every image in community.html was placed only after explicit user instruction
  4. All images sourced from `public/assets/images/community/`
  5. Same sizing rules as Phase 18 applied throughout
  6. No empty or broken image slots remain
**Plans**: 1 plan per section group (to be refined at plan time)
Plans:
- [ ] 20-01-PLAN.md — Community: section-by-section review and implementation (interactive, copy-first)
**UI hint**: yes

### Phase 21: Full Site UAT and QA
**Goal**: Every page passes all functional, visual, accessibility, and performance checks; a QA report is produced and all failures fixed
**Depends on**: Phase 18, Phase 19, Phase 20
**Requirements**: QA-01, QA-02, QA-03, QA-04, QA-05, QA-06, QA-07, QA-08, QA-09, QA-10, QA-11, QA-12, QA-13, QA-14, QA-15
**Success Criteria** (what must be TRUE):
  1. All navigation links work on every page; mobile nav opens/closes/animates correctly; burger↔X morph works
  2. Typewriter, contact form, CV download, Easter egg, case study images, internal and external links all verified
  3. Nav, footer, hero position, fonts, colours, cards, alternating backgrounds all visually consistent across pages
  4. All images have descriptive alt text; all interactive elements have visible focus states; WCAG 2.2 AA contrast passes everywhere
  5. Focus trap and Escape key work in mobile nav; prefers-reduced-motion respected; form labels present
  6. All images use loading="lazy"; no console errors; no broken asset paths on any page
  7. QA report produced; zero open failures before phase is marked complete
**Plans**: 2 plans
Plans:
- [ ] 21-01-PLAN.md — Functional and visual audit across all 10 pages; produce QA report with file/line references
- [ ] 21-02-PLAN.md — Fix all QA failures from 21-01 report; re-verify; mark phase complete
**UI hint**: no

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 4/4 | Complete | 2026-05-17 |
| 2. Foundation & Infrastructure | v2.0 | 1/1 | Complete | 2026-05-17 |
| 3. First Impression | v2.0 | 2/2 | Complete | 2026-05-17 |
| 4. Cards & Homepage | v2.0 | 2/2 | Complete | 2026-05-18 |
| 5. Case Study Components | v2.0 | 2/2 | Complete | 2026-05-18 |
| 6. Content Pages | v2.0 | 3/3 | Complete | 2026-05-18 |
| 7. Footer + Global Audit | v2.0 | 2/2 | Complete | 2026-05-18 |
| 8. UI Polish | v3.0 | 3/3 | Complete | 2026-05-19 |
| 9. Content | v3.0 | 2/2 | Complete | 2026-05-19 |
| 10. Contact Form | v3.0 | 2/2 | Complete | 2026-05-19 |
| 11. SEO | v3.0 | 2/2 | Complete | 2026-05-19 |
| 12. CV Page | v4.0 | 1/1 | Complete | 2026-05-20 |
| 13. Above-Fold Images | v4.0 | 2/2 | Complete | 2026-05-21 |
| 14. Case Study Image Depth | v4.0 | 3/3 | Complete | 2026-05-21 |
| 15. Nav Hero Padding Fix | v5.0 | 0/1 | Not started | - |
| 16. Footer Audit and Fix | v5.0 | 0/1 | Not started | - |
| 17. Case Study Component Library | v5.0 | 0/2 | Not started | - |
| 18. i-Exchange Case Study | v5.0 | 0/1 | Not started | - |
| 19. CASSI Case Study | v5.0 | 0/1 | Not started | - |
| 20. Community Case Study | v5.0 | 0/1 | Not started | - |
| 21. Full Site UAT and QA | v5.0 | 0/2 | Not started | - |
