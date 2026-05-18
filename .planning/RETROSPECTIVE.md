# Retrospective: Sam Blake Portfolio v2

---

## Milestone: v2.0 — Polish & Refinement

**Shipped:** 2026-05-18
**Phases:** 6 (Phases 2–7) | **Plans:** 15 | **Duration:** ~3.5 hours

### What Was Built

- Easing tokens, scroll-reveal IntersectionObserver utility, state-layer hover pattern documented and ready for reuse
- Nav fully polished: Fraunces logo, 56px height, scroll shadow, active accent border, correct desktop spacing, mobile menu animation + aria-hidden management
- Hero: 5-element entrance stagger at 80ms steps, 860px ultra-wide constraint via token
- Button system corrected: token padding, 36/40px heights, scale(0.97) press on all three variants
- Card: Fraunces metric values, state-layer overlay, whole-card arrow translate, pointer-fine gate, 3-col grid, scroll-stagger
- 7 case study storytelling components built from scratch and wired into main.css ITCSS order
- Content pages: 72ch reading width across about/case-study/stories, 600px contact column, clip-path border reveal on stories list
- Global audit: prefers-reduced-motion in every animated file, em dashes cleared from all titles/h1s, zero hardcoded values

### What Worked

- **Wave-parallel execution** — Plans 04-01 and 04-02 ran in parallel via worktrees; same for 05-01/05-02 and 06-01/02/03. Saved meaningful wall time.
- **State-layer pattern as a documented template** — documenting the pattern as a commented-out block in `_reveal.css` rather than a separate file made it trivial to copy into Phase 4. The decision in Phase 2 unlocked clean execution in Phase 4.
- **Token-first constraint** — enforcing zero hardcoded values from the start meant the Phase 7 audit was clean with very few surprises. The constraint paid dividends.
- **Explicit reduced-motion guards from Phase 2** — building the pattern into the reveal utility early meant later phases just followed the convention.

### What Was Inefficient

- **REQUIREMENTS.md traceability not updated during execution** — all 45 requirements remained `[ ]` throughout. The archive had to be hand-updated. Future milestones should update the traceability table at phase completion.
- **VERIFICATION.md only created for Phase 4** — the GSD executor only ran the verifier for one phase. Five phases shipped with SUMMARY-only evidence. The milestone audit was consequently scored at 8/45 by strict 3-source cross-reference despite full delivery.
- **SUMMARY frontmatter `requirements-completed:` missing in Phases 5–7** — Phase 2/3/4 summaries included this field; Phases 5/6/7 did not. Creates traceability inconsistency.
- **ROADMAP.md progress table diverged** — Phases 2/3/4 showed "Not started" in the progress table while their plans were checked `[x]` and SUMMARY files existed. Minor but confusing.

### Patterns Established

- **State-layer `::after` pattern:** `position: relative` on parent; `::after` with `background-color: var(--color-text-primary); opacity: 0`; opacity 0.08 on hover, 0.12 on active; `pointer-events: none; border-radius: inherit`. Copy from `_reveal.css`.
- **Hover gate:** always `@media (hover: hover) and (pointer: fine)` — never bare `(hover: hover)`.
- **Passive scroll listener:** `{ passive: true }` + immediate `onScroll()` call after `addEventListener` — handles pre-scrolled page state and Chrome performance warnings.
- **Transparent border reserve:** resting `.nav__link` gets `border-bottom: 2px solid transparent` — prevents 2px height shift in flex row when active border is applied.
- **Breakpoint ladder:** append `@media` blocks in ascending order (905px → 1240px → 1440px), never modify existing blocks.

### Key Lessons

- The audit scoring (8/45) looked alarming but reflected a tracking gap, not a delivery gap. The lesson: run `/gsd:verify-work` after each phase, not just phase 4. The verifier produces the VERIFICATION.md that satisfies the 3-source audit gate.
- Pre-documenting patterns as copy-paste blocks (state-layer in `_reveal.css`) is worth the overhead — it removes decision friction in later phases.
- A one-line footer fix (prefers-reduced-motion) was the only code gap found by the milestone audit — a good sign that the individual phase summaries were thorough.
- Parallel worktree execution introduces path-routing risk (both phase 4 worktrees accidentally edited the main repo path first). Worth a note in the executor to double-check the worktree path before applying edits.

### Cost Observations

- Model: Claude Sonnet 4.6 throughout
- Sessions: 2 primary sessions (2026-05-17, 2026-05-18)
- Notable: All 15 plans completed in ~3.5 hours. Phase 5 (7 components) took ~20 min total — CSS-only build phases are fast. The audit + complete-milestone overhead was roughly equal to one execution phase.

---

## Cross-Milestone Trends

| Milestone | Phases | Plans | Duration | Gap Rate |
|-----------|--------|-------|----------|----------|
| v1.0 Foundation | 1 | 4 | ~2 hours | — |
| v2.0 Polish & Refinement | 6 | 15 | ~3.5 hours | 1 code gap (footer a11y) |
