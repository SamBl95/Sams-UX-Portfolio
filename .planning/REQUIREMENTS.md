# Requirements: Sam Blake Portfolio v2

**Defined:** 2026-05-17
**Core Value:** A recruiter or hiring manager can understand Sam's work and reach out — every page exists, every link works, and the structure is solid enough to build content on top of.

## v1 Requirements

Requirements for the foundation milestone. Goal: a scalable, consistent, fully-linked site structure.

### Structure & Navigation

- [ ] **NAV-01**: Nav component is consistent across all pages (same markup, same links)
- [ ] **NAV-02**: Nav active state correctly highlights the current page
- [ ] **NAV-03**: Footer component is consistent across all pages
- [ ] **NAV-04**: No broken internal links anywhere in the site
- [ ] **NAV-05**: Duplicate page files cleaned up (`src/pages/cassi.html`, `community.html`, `i-exchange.html`)

### New Pages

- [ ] **PAGE-01**: Contact page exists with complete section structure (header, content, footer)
- [ ] **PAGE-02**: Blog index page exists at `/blog` with proper section structure
- [ ] **PAGE-03**: Blog post template exists with complete section structure (at least one working example)
- [ ] **PAGE-04**: All new pages registered in `vite.config.js` rollupOptions.input

### Foundation Audit

- [ ] **AUDIT-01**: Holistic review of all existing pages for structural consistency
- [ ] **AUDIT-02**: Every page has a complete, consistent section structure (nav → content → footer)
- [ ] **AUDIT-03**: CSS architecture is coherent — no rogue inline styles, no hex values outside `_variables.css`, spacing tokens used throughout
- [ ] **AUDIT-04**: Site is demonstrably scalable — adding a new page follows a clear, repeatable pattern

## v2 Requirements

Deferred to content refinement phase.

### Content

- Blog post content (real articles, not placeholder)
- Contact form with backend/email integration
- Case study content and imagery
- SEO meta tags and Open Graph

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS or dynamic content | Static HTML only — Vite MPA constraint |
| Content strategy & copywriting | Separate phase after structure is solid |
| Design token changes | System already established |
| Analytics / third-party integrations | Post-foundation |
| Mobile-specific layout changes | ITCSS breakpoints in place, detailed responsive polish is later |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| NAV-03 | Phase 1 | Pending |
| NAV-04 | Phase 1 | Pending |
| NAV-05 | Phase 1 | Pending |
| PAGE-01 | Phase 1 | Pending |
| PAGE-02 | Phase 1 | Pending |
| PAGE-03 | Phase 1 | Pending |
| PAGE-04 | Phase 1 | Pending |
| AUDIT-01 | Phase 1 | Pending |
| AUDIT-02 | Phase 1 | Pending |
| AUDIT-03 | Phase 1 | Pending |
| AUDIT-04 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-17*
*Last updated: 2026-05-17 after initial definition*
