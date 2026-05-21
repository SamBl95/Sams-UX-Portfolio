# Roadmap: Sam Blake Portfolio v2

## Milestones

- ✅ **v1.0 Foundation** — Phases 1 (shipped 2026-05-17) — [Archive](.planning/milestones/v1.0-ROADMAP.md)
- ✅ **v2.0 Polish & Refinement** — Phases 2–7 (shipped 2026-05-18) — [Archive](.planning/milestones/v2.0-ROADMAP.md)
- ✅ **v3.0 Content & SEO** — Phases 8–11 (shipped 2026-05-19) — [Archive](.planning/milestones/v3.0-ROADMAP.md)
- 🚧 **v4.0 Content & Visuals** — Phases 12–14 (in progress)

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

### 🚧 v4.0 Content & Visuals (In Progress)

**Milestone Goal:** Fill the remaining content gaps — CV copy, PDF download buttons, and real images across every visual placeholder in the site.

- [x] **Phase 12: CV Page** — Work history complete, education updated, PDF download wired on CV and About pages
- [x] **Phase 13: Above-Fold Images** — Homepage cards and /work feature rows display real images
- [ ] **Phase 14: Case Study Image Depth** — I-Exchange, CASSI, and Community visual components filled with real images

## Phase Details

### Phase 8: UI Polish
**Goal**: Nav and hero feel intentional and complete; the /work page exists and is linked from the nav
**Depends on**: Phase 7
**Requirements**: UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-07, UI-08, UI-09, UI-10, UI-11
**Success Criteria** (what must be TRUE):
  1. Hero shows "Sam Blake" as an accented h2 with "A Product Designer who..." as the subhead, and the one-liner below the typewriter is gone
  2. Nav has a "Home" link as the first item, no designer name on the left, no bottom stroke, and links animate left-to-right underline on hover with the active link bolded
  3. A /work page exists with a feature section layout and is reachable from the "Work" nav link
  4. Hero content and body copy paragraphs expand to fill available width — no fixed pixel or character-count constraints
**Plans**: 3 plans
Plans:
- [x] 08-01-PLAN.md — Hero restructure: h2.hero__name, revised h1, subheadline removal, 1440px width fix
- [x] 08-02-PLAN.md — Nav redesign: Home link, logo removal, border removal, underline hover animation
- [x] 08-03-PLAN.md — Work page creation + 72ch paragraph width removal
**UI hint**: yes

### Phase 9: Content
**Goal**: All three case studies and the About page carry real copy pulled from Webflow; Stories has a placeholder article ready for content
**Depends on**: Phase 8
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. I-Exchange, CASSI, and Community case study pages each have their real narrative, problem statement, and outcome copy in place
  2. The About page shows Sam's full work history (Santander UK, Matalan, property) and skills section
  3. The Stories section contains at least one article page with a real or placeholder narrative structure ready for copy
**Plans**: 2 plans
Plans:
- [x] 09-01-PLAN.md — About page: add work history timeline and skills/tools sections to about.html and _about.css
- [x] 09-02-PLAN.md — Content audit: verify CONT-01/02/03/05 are met across case studies and Stories
**UI hint**: yes

### Phase 10: Contact Form
**Goal**: The contact form submits without a page redirect, delivers email to sam.blake@outlook.com, and shows visible success and error feedback
**Depends on**: Phase 8
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05
**Success Criteria** (what must be TRUE):
  1. Submitting the contact form with valid data shows a success message in the page without navigating away from the site
  2. A network failure or FormSubmit error shows a visible error message in the page
  3. The form includes a honeypot field hidden via opacity and position (not display:none) with tabindex=-1 and aria-hidden=true
  4. The FormSubmit endpoint is activated and delivers submitted messages to sam.blake@outlook.com
**Plans**: 2 plans
Plans:
- [x] 10-01-PLAN.md — Form markup, CSS, and AJAX JS: contact.html form, _form.css, form.js (FORM-01/02/03/04)
- [x] 10-02-PLAN.md — FormSubmit activation: trigger endpoint, click confirmation email, verify delivery (FORM-05)

### Phase 11: SEO
**Goal**: Every page is discoverable — correct titles, meta descriptions, Open Graph tags, canonical URLs, JSON-LD schema, sitemap, robots.txt, and clean URL rewrites are all in place
**Depends on**: Phase 9, Phase 8
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10
**Success Criteria** (what must be TRUE):
  1. Every page tab shows a unique, accurate title; pasting any page URL into LinkedIn or Slack unfurls with correct title, description, and og:image
  2. Every page head contains a canonical URL pointing to its clean https://www.samsux.co.uk path and a theme-color meta tag
  3. index.html and about.html contain valid JSON-LD Person schema, verifiable via Google Rich Results Test
  4. public/sitemap.xml lists all pages with clean Vercel-rewritten URLs; public/robots.txt allows all crawlers and points to the sitemap
  5. vercel.json is present with clean URL rewrites so /about serves the page without a .html extension in the address bar
**Plans**: 2 plans
Plans:
- [x] 11-01-PLAN.md — SEO head block for all 10 pages: title, description, canonical, OG tags, theme-color (SEO-01/02/03/04/05/06)
- [x] 11-02-PLAN.md — JSON-LD Person schema + sitemap.xml + robots.txt + vercel.json (SEO-07/08/09/10)

### Phase 12: CV Page
**Goal**: The CV page presents a complete and accurate employment history, updated education, and a working PDF download; the About page CTA also links to the PDF
**Depends on**: Phase 11
**Requirements**: CV-01, CV-02, CV-03, CV-04, CV-05
**Success Criteria** (what must be TRUE):
  1. The CV page lists all 5 roles (Matalan, NUX Volunteer, Santander PD/BA, Santander UX Researcher rotation, Blake's Estates) with correct titles, dates, and descriptions
  2. NUX Volunteer and UX Researcher (rotation) appear as distinct timeline entries alongside the existing 3 roles
  3. Google UX Professional Certificate is visible in the education section of the CV page
  4. Clicking "Download CV" on the CV page opens or downloads /Samuel-Blake-CV.pdf
  5. Clicking "Download CV" on the About page CTA opens or downloads /Samuel-Blake-CV.pdf
**Plans**: 1 plan
Plans:
- [x] 12-01-PLAN.md — Update cv.html (work history, education, Download CV button) and about.html (Download CV button)
**UI hint**: yes

### Phase 13: Above-Fold Images
**Goal**: Every above-fold visual placeholder on the homepage and /work page is replaced with a real image sourced from samsux.webflow.io
**Depends on**: Phase 12
**Requirements**: IMG-01, IMG-02
**Success Criteria** (what must be TRUE):
  1. Homepage case study cards each display a real thumbnail image — no placeholder or empty image slot visible
  2. /work page feature rows each display a real case study image — no placeholder or empty image slot visible
  3. All images render at correct aspect ratios across mobile (375px), tablet (600px), and desktop (1240px+) breakpoints
**Plans**: 2 plans
Plans:
- [ ] 13-01-PLAN.md — Download images + /work feature row wiring (IMG-02)
- [ ] 13-02-PLAN.md — Homepage card images: .card__image HTML + CSS (IMG-01)
**UI hint**: yes

### Phase 14: Case Study Image Depth
**Goal**: Every image-block, before-after, and process-steps component inside the three case study pages contains real visual content sourced from samsux.webflow.io
**Depends on**: Phase 13
**Requirements**: IMG-03, IMG-04, IMG-05
**Success Criteria** (what must be TRUE):
  1. I-Exchange case study page has real images in every image-block, before-after, and/or process-steps component that was previously empty
  2. CASSI case study page has real images in every image-block, before-after, and/or process-steps component that was previously empty
  3. Community case study page has real images in every image-block, before-after, and/or process-steps component that was previously empty
  4. No empty or broken image slots remain across all three case study pages
**Plans**: 3 plans
Plans:
- [ ] 14-01-PLAN.md — i-Exchange: image-block, before-after, and process-steps across Empathise/Define/Test/Solution phases (IMG-03)
- [ ] 14-02-PLAN.md — Cassi: image-block and before-after across Empathise/Define/Solution phases (IMG-04)
- [ ] 14-03-PLAN.md — Community: process-steps, image-block, and before-after across Background/Empathise/Solution phases (IMG-05)
**UI hint**: yes

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
| 13. Above-Fold Images | v4.0 | 0/2 | Not started | - |
| 14. Case Study Image Depth | v4.0 | 0/3 | Not started | - |
