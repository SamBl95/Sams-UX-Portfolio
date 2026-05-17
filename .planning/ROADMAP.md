# Roadmap: Sam Blake Portfolio v2

## Overview

A single focused sprint to establish a consistent, fully-linked site structure. Nav, footer, new pages, and structural cleanup are all tightly coupled — they ship together as one coherent foundation that a recruiter can navigate end-to-end.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Consistent structure, all pages present, no broken links

## Phase Details

### Phase 1: Foundation
**Goal**: Every page exists, every link works, nav and footer are consistent across the site
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, PAGE-01, PAGE-02, PAGE-03, PAGE-04, AUDIT-01, AUDIT-02, AUDIT-03, AUDIT-04
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to any page (Home, About, I-Exchange, CASSI, Community, Contact, Blog) and see the same nav and footer — no missing links, no dead ends
  2. Contact page and Blog (index + one post example) exist with complete structure: nav, content section, footer
  3. No broken internal links anywhere in the site — every anchor href resolves to a real page
  4. The CSS is coherent: no inline styles, no raw hex values, spacing tokens used throughout — adding a new page follows the same pattern as existing ones
**Plans:** 4 plans
Plans:
- [ ] 01-PLAN-design-foundation.md — Light palette token swap + h1/h2 weight + responsive scale correction (Plans wave 1)
- [ ] 01-PLAN-shared-shell.md — Install vite-plugin-handlebars; rewrite nav/footer as partials; convert 5 existing pages; remove homepage #contact (wave 2)
- [ ] 01-PLAN-new-pages.md — Create contact.html, stories/index.html, stories/[post].html; add _contact.css and _stories.css; register in vite.config.js (wave 3)
- [ ] 01-PLAN-foundation-audit.md — Link audit, structural audit, CSS coherence audit; document "adding a new page" in CLAUDE.md; update STATE.md (wave 4)
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/4 | Not started | - |
