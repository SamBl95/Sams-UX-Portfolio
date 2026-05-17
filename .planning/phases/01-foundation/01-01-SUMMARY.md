---
plan: 01-01
phase: 01-foundation
status: complete
completed: 2026-05-17
---

# Plan 01-01 Summary — Design Foundation

## Tokens swapped (before → after)

| Token | Before | After |
|-------|--------|-------|
| `--color-bg` | `#0d1f1a` | `#f5f2ed` |
| `--color-surface` | `#152b24` | `#ede9e3` |
| `--color-border` | `#1e3d32` | `#d6d0c8` |
| `--color-text-primary` | `#f0ede6` | `#1a1614` |
| `--color-text-secondary` | `#9db5ac` | `#6b6560` |
| `--color-accent` | `#4fd1a5` | `#1a6b52` |
| `--color-accent-accessible` | `#4fd1a5` | `#1a6b52` |
| `--color-text-on-accent` | `#071210` | `#f5f2ed` |
| `--color-accent-light` | `#1a3d30` | `#e6f0ec` |
| `--shadow-accent` | `0 8px 24px -4px rgb(79 209 165 / 0.25)` | `0 8px 24px -4px rgb(26 107 82 / 0.18)` |

## Files modified

- `src/styles/1-settings/_variables.css` — 9 colour token values + 1 shadow value swapped
- `src/styles/2-base/_typography.css` — h1/h2 weights to semibold; h1 scale: 40→56→64→80 (96px step removed)
- `src/styles/3-components/_hero.css` — `.hero__headline` weight to semibold

## Visual checkpoint

**Outcome:** Approved by user

Confirmed across homepage, about page, and cassi case study:
- Warm off-white background visible on all pages
- Deep teal accent (#1a6b52) on CTAs and focus rings
- Hero headline semibold (not bold) — editorial weight
- h1 responsive scale: ~40px mobile → ~56px at 600px → caps at ~80px at 1240px+

## Deviations from UI-SPEC

None — all 10 token values match the UI-SPEC exactly.
