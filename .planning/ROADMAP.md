# Roadmap: Sam Blake Portfolio v2

## Milestones

- **v1.0 Foundation** ✓ — [Archive](.planning/milestones/v1.0-ROADMAP.md) — Shipped 2026-05-17

## Current Milestone: v2.0 Polish & Refinement

**Goal:** Make the existing 8 pages visually exceptional — every interaction feels intentional, every layout holds at any viewport, every value earns its token.

**Phase numbering continues from v1.0 (last phase: 1).**

## Phases

**Phase Numbering:**
- Integer phases (2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 2: Interaction Polish** — Typewriter never shifts, buttons respond to press, hover fires on pointer only
- [ ] **Phase 3: Composition** — Hero and card grid hold gracefully at every breakpoint up to 2560px
- [ ] **Phase 4: Token & Content Audit** — Zero hardcoded values, zero stale refs, em dashes removed

## Phase Details

### Phase 2: Interaction Polish
**Goal:** Every interactive element feels intentional — typewriter is stable, buttons respond to press, hover only fires on pointer devices
**Mode:** polish
**Depends on:** Phase 1 (complete)
**Requirements:** ANIM-01, ANIM-02, ANIM-03, BTN-01, BTN-02, BTN-03, BTN-04
**Success Criteria** (what must be TRUE):
  1. Hero section height is stable — typewriter cycles through all 3 phrases with no vertical jump at any breakpoint
  2. Clicking any button shows visible press-down feedback — confirmed at full speed and in slow motion
  3. On a touch device (or DevTools touch simulation), cards do not trigger hover state on tap
  4. All button variants render correctly at every state: default, hover, active, focus-visible, disabled
**Plans:** 2 plans
Plans:
- [ ] 02-01-PLAN-typewriter.md — Fix height reservation: remove conflicting CSS fallback, improve JS to set height before fonts load (Wave 1)
- [ ] 02-02-PLAN-buttons.md — Reduce desktop heights, fix hardcoded padding/font-size, add scale(0.97) active state, fix card hover query (Wave 2)
**UI hint:** yes — apply frontend-design + emil-design-eng skills

### Phase 3: Composition
**Goal:** Every layout holds gracefully at every viewport — no left-hugging hero, no orphaned card
**Mode:** polish
**Depends on:** Phase 2
**Requirements:** LAY-01, LAY-02
**Success Criteria** (what must be TRUE):
  1. At 1440px+ viewport, hero heading and body text stop well before the right edge — content occupies a defined, intentional column
  2. At 1240px+ viewport, all three case study cards appear side-by-side at equal width with consistent gaps
**Plans:** 1 plan
Plans:
- [ ] 03-01-PLAN-layout.md — Hero content max-width at wide breakpoints; case study grid 3-column at 1240px+ (Wave 1)
**UI hint:** yes — apply frontend-design skill for composition decisions

### Phase 4: Token & Content Audit
**Goal:** Zero hardcoded values outside `_variables.css`, zero em dashes in HTML source, stale dark-palette refs eliminated
**Mode:** audit
**Depends on:** Phase 3
**Requirements:** TYP-01, TYP-02, TYP-03, TOK-01, TOK-02
**Success Criteria** (what must be TRUE):
  1. `grep -r "rgb(79 209 165"` in `src/styles/` returns zero matches
  2. `grep -r "—" src/pages/` returns zero matches (em dashes replaced or rewritten)
  3. All spacing in every CSS component file uses `var(--space-*)` tokens — no raw pixel values
  4. `_typography.css` header comment matches the code exactly
**Plans:** 2 plans
Plans:
- [ ] 04-01-PLAN-css-audit.md — Stale colour ref, typography comment, CSS token coherence sweep (Wave 1)
- [ ] 04-02-PLAN-html-audit.md — Em dash sweep across all 8 HTML pages; verify no other hardcoded HTML attribute values (Wave 2)
**UI hint:** no

## Progress

**Execution Order:**
Phases execute in numeric order: 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 2. Interaction Polish | 0/2 | Not started | - |
| 3. Composition | 0/1 | Not started | - |
| 4. Token & Content Audit | 0/2 | Not started | - |
