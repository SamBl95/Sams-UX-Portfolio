# Requirements: Sam Blake Portfolio v2

**Defined:** 2026-05-19
**Core Value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and every component is polished enough that adding content is the only remaining task.

## v3.0 Requirements

### UI Polish

- [ ] **UI-01**: Hero shows "Sam Blake" as h2 in accent colour with "A Product Designer who..." as subhead
- [ ] **UI-02**: One-liner between typewriter animation and CTA buttons is removed from the hero
- [ ] **UI-03**: Hero content width uses flex/available-space layout, no fixed pixel constraint
- [ ] **UI-04**: Paragraph elements on content pages use available-space width, no fixed character-count constraint
- [ ] **UI-05**: Nav includes a "Home" link as the first navigation option
- [ ] **UI-06**: Designer name/logo is removed from the left side of the nav
- [ ] **UI-07**: Nav bottom border stroke is removed so the nav floats
- [ ] **UI-08**: Nav links use flat tab style with left-to-right underline animation on hover
- [ ] **UI-09**: Active nav link appears bold
- [ ] **UI-10**: Dedicated case studies page exists at /work with a feature section layout
- [ ] **UI-11**: "Work" nav link navigates to the /work page

### Content

- [ ] **CONT-01**: I-Exchange case study has real copy and narrative pulled from samsux.webflow.io
- [ ] **CONT-02**: CASSI (AI Colleague Assistant) case study has real copy and narrative from Webflow
- [ ] **CONT-03**: Community Forum case study has real copy and narrative from Webflow
- [ ] **CONT-04**: About page has work history and skills from Webflow
- [ ] **CONT-05**: Stories section has a placeholder article structure ready for content

### Contact Form

- [ ] **FORM-01**: Contact form submits via FormSubmit.co without page reload (AJAX mode)
- [ ] **FORM-02**: Contact form shows visible in-page success state after submission
- [ ] **FORM-03**: Contact form shows visible in-page error state if submission fails
- [ ] **FORM-04**: Contact form includes hidden honeypot field (opacity:0/position:absolute, not display:none)
- [ ] **FORM-05**: FormSubmit endpoint is activated and delivers to sam.blake@outlook.com

### SEO

- [ ] **SEO-01**: Every page has a unique, accurate title tag
- [ ] **SEO-02**: Every page has a unique meta description, 150–160 characters
- [ ] **SEO-03**: Every page has a canonical URL tag using https://www.samsux.co.uk clean paths
- [ ] **SEO-04**: Every page has og:title, og:description, og:url, og:type, og:site_name "Sam Blake | Product Designer", og:locale en_GB
- [ ] **SEO-05**: Every page has og:image tag (pointing to placeholder path until asset created)
- [ ] **SEO-06**: Every page has meta theme-color: #f5f2ed
- [ ] **SEO-07**: index.html and about.html include JSON-LD Person schema (name, jobTitle, url, email, sameAs LinkedIn)
- [ ] **SEO-08**: sitemap.xml in public/ listing all pages with correct Vercel clean-path URLs
- [ ] **SEO-09**: robots.txt in public/ allowing all crawlers, pointing to sitemap
- [ ] **SEO-10**: vercel.json includes clean URL rewrites for all pages

## Future Requirements

### Content

- **CONT-F01**: Per-case-study og:image thumbnails for rich link previews
- **CONT-F02**: og:image 1200×630 branded design asset (currently placeholder)
- **CONT-F03**: Additional Stories articles beyond placeholder

### SEO

- **SEO-F01**: Submit sitemap to Google Search Console (post-deploy step)
- **SEO-F02**: og:type article on Stories post pages
- **SEO-F03**: vite-plugin-sitemap auto-generation

## Out of Scope

| Feature | Reason |
|---------|--------|
| EmailJS | FormSubmit chosen — simpler, no SDK, no monthly cap |
| Per-page og:image thumbnails | Creative asset deferred to future milestone |
| Google Search Console submission | Post-deploy manual step, not a code task |
| Blog CMS or dynamic content | Static HTML constraint |
| Dark mode toggle | Palette decision locked at light theme (D-13) |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| UI-01 | Phase 8 | Pending |
| UI-02 | Phase 8 | Pending |
| UI-03 | Phase 8 | Pending |
| UI-04 | Phase 8 | Pending |
| UI-05 | Phase 8 | Pending |
| UI-06 | Phase 8 | Pending |
| UI-07 | Phase 8 | Pending |
| UI-08 | Phase 8 | Pending |
| UI-09 | Phase 8 | Pending |
| UI-10 | Phase 8 | Pending |
| UI-11 | Phase 8 | Pending |
| CONT-01 | Phase 9 | Pending |
| CONT-02 | Phase 9 | Pending |
| CONT-03 | Phase 9 | Pending |
| CONT-04 | Phase 9 | Pending |
| CONT-05 | Phase 9 | Pending |
| FORM-01 | Phase 10 | Pending |
| FORM-02 | Phase 10 | Pending |
| FORM-03 | Phase 10 | Pending |
| FORM-04 | Phase 10 | Pending |
| FORM-05 | Phase 10 | Pending |
| SEO-01 | Phase 11 | Pending |
| SEO-02 | Phase 11 | Pending |
| SEO-03 | Phase 11 | Pending |
| SEO-04 | Phase 11 | Pending |
| SEO-05 | Phase 11 | Pending |
| SEO-06 | Phase 11 | Pending |
| SEO-07 | Phase 11 | Pending |
| SEO-08 | Phase 11 | Pending |
| SEO-09 | Phase 11 | Pending |
| SEO-10 | Phase 11 | Pending |

**Coverage:**
- v3.0 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-19*
*Last updated: 2026-05-19 after roadmap creation*
